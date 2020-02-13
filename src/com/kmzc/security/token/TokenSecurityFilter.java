package com.kmzc.security.token;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kmzc.cache.DevicesIdCache;
import com.kmzc.security.user.ZcPasswordEncoder;
import com.kmzc.security.user.ZcUserDetails;
import com.kmzc.security.user.ZcUserDetialsService;
import com.kmzc.utils.Base64Util;

@Component
/**
 * 描述：处理Token形式的登录和访问资源的过滤器
 * 
 * 2018年5月11日 下午4:04:16
 */
public class TokenSecurityFilter extends OncePerRequestFilter{
	protected TokenPojo tokenPojo;
	public TokenPojo getTokenPojo() {
		return tokenPojo;
	}
	public void setTokenPojo(TokenPojo tokenPojo) {
		this.tokenPojo = tokenPojo;
	}
	@Autowired
	protected ZcUserDetialsService kmzcUserDetialsService;
	@Autowired
	protected ZcPasswordEncoder kmzcPasswordEncoder;
	
	private ZcUserDetails userDetails;
	public TokenSecurityFilter(){}
	public TokenSecurityFilter(TokenPojo tokenPojo){
		this.tokenPojo=tokenPojo;
	}
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		if (requiresAuthentication(request)) {//判断如果是Token形式的登录，则进行token登录认证流程
			Authentication authResult;
			try {
				authResult = attemptAuthentication(request, response);//登录认证处理
			}catch (InternalAuthenticationServiceException failed) {
				logger.error("尝试验证用户时发生了内部错误。",failed);
				unsuccessfulAuthentication(request, response, failed);
				return;
			}catch (AuthenticationException failed) {
				unsuccessfulAuthentication(request, response, failed);
				return;
			}
			//成功处理器
			AuthenticationSuccessHandler successHandler = new TokenAuthenticationSuccessHandler(tokenPojo,userDetails);
			successHandler.onAuthenticationSuccess(request, response, authResult);
		}else{//非登录，则判断是否token的资源请求
			if(appRequestUrl(request)){//是APP资源请求，则进行令牌验证
				String token=request.getHeader(tokenPojo.getTokenArgName());
				if(token==null){
					token=request.getParameter(tokenPojo.getTokenArgName());
				}

				String sbid=request.getHeader(tokenPojo.getInvokeArgName());
				if(sbid==null){
					sbid=request.getParameter(tokenPojo.getInvokeArgName());
				}
				//String permission=TokenAuthenticationSuccessHandler.checkToken(token,sbid);//最终的授权结果
				String permission="";//最终的授权结果
				if("".equals(permission)){//说明权限验证通过
					chain.doFilter(request, response);
				}else{
					response.setContentType("application/json;charset=UTF-8");
					response.getWriter().write("{\"errInfo\":\""+permission+"\"}");
				}
			}else{//非token登录，又非token资源请求，则直接继续下去
				chain.doFilter(request, response);
			}
		}
	}
	/**
	 * 描述：判断当前请求是否 为token形式的登录
	 * @param request
	 * @return
	 *
	 */
	private boolean requiresAuthentication(HttpServletRequest request) {
		AntPathMatcher pathMatcher = new AntPathMatcher();
		boolean isAppLogin=false;
		//下面两行是处理掉上下文路径，有可能是一个“/”，当时“/”时则不用处理
		int len=request.getContextPath().length();
		String reqUrl=request.getRequestURI().substring(len>1?len:0);
		if(pathMatcher.match(tokenPojo.getLoginUrl(), reqUrl)){
			isAppLogin=true;
		}
		return isAppLogin;
	}
	/**
	 * 描述：判断请求的资源，是否是配置的应用请求资源资源
	 * @param request
	 * @return
	 *
	 * 
	 * 2018年5月11日 下午3:48:36
	 */
	private boolean appRequestUrl(HttpServletRequest request) {
		AntPathMatcher pathMatcher = new AntPathMatcher();
		boolean isAppAccess=false;
		//下面两行是处理掉上下文路径，有可能是一个“/”，当时“/”时则不用处理
		int len=request.getContextPath().length();
		String reqUrl=request.getRequestURI().substring(len>1?len:0);
		String[] urls=StringUtils.splitByWholeSeparatorPreserveAllTokens(tokenPojo.getAccessUrls(),",");
		for(String url:urls){
			if(pathMatcher.match(url, reqUrl)){
				isAppAccess=true;
				break;
			}
		}
		return isAppAccess;
	}
	/**
	 * 描述：token登录认证处理，子类可以重新该方法
	 * @param request
	 * @param response
	 * @return
	 * @throws AuthenticationException
	 *
	 * 
	 * 2018年5月11日 下午3:44:28
	 */
	public Authentication attemptAuthentication(HttpServletRequest request,
			HttpServletResponse response) throws AuthenticationException {
		/**是否验证设备Id*/
		if(tokenPojo.isCheckInvokeId()){
			String sbid = request.getParameter(tokenPojo.getInvokeArgName());
			if(sbid==null){
				throw new TokenSecurityException("应用或设备Id为空");
			}else if(!DevicesIdCache.exists(sbid)){
				throw new TokenSecurityException("应用或设备Id："+sbid+"未注册");
			}
		}
		
		String username = request.getParameter(tokenPojo.getLoginUserName());
		String password = request.getParameter(tokenPojo.getPasswordName());
		if (username == null) {
			username = "";
		}
		if (password == null) {
			password = "";
		}
		//密码不用处理，因为密码在验证里面会自动处理，只用处理用户id就可以了
		try{
			username=Base64Util.decode(username);
		}catch(Exception e){
			throw new TokenSecurityException("解密账号时出现异常");
		}
		UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
		AuthenticationDetailsSource<HttpServletRequest, ?> authenticationDetailsSource = new WebAuthenticationDetailsSource();
		authRequest.setDetails(authenticationDetailsSource.buildDetails(request));
		UserDetails userInfo=kmzcUserDetialsService.loadUserByUsername(username);
		if(userInfo==null){
			throw new TokenSecurityException("用户名不存在");
		}else{
			userDetails=(ZcUserDetails) userInfo;
		}
		if(!kmzcPasswordEncoder.matches(password, userDetails.getPassword())){
			throw new TokenSecurityException("用户名或密码错误");
		}
		return authRequest;
	}
	/**
	 * 描述：token登录认证失败处理器
	 * @param request
	 * @param response
	 * @param failed
	 * @throws IOException
	 * @throws ServletException
	 * 
	 * 2018年5月11日 下午3:43:47
	 */
	protected void unsuccessfulAuthentication(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException failed)
			throws IOException, ServletException {
		//失败处理
		SecurityContextHolder.clearContext(); new TokenAuthenticationFailureHandler()
			.onAuthenticationFailure(request, response, failed);
	}
}
