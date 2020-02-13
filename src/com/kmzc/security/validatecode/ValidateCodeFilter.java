package com.kmzc.security.validatecode;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

import javax.imageio.ImageIO;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.authentication.MapuniAuthenticationFailureHandler;

@Component
public class ValidateCodeFilter extends OncePerRequestFilter {
	private static Logger logger=Logger.getLogger(ValidateCodeFilter.class);
	/**
	 * 验证码校验失败处理器
	 */
	@Autowired
	private MapuniAuthenticationFailureHandler kmzcAuthenticationFailureHandler;
	
	/**
	 * 存放所有需要校验验证码的url
	 */
	private Set<String> urlSet = new HashSet<String>();
	/**
	 * 验证请求url与配置的url是否匹配的工具类
	 */
	private AntPathMatcher pathMatcher = new AntPathMatcher();
	
	    /**
		 * 初始化要拦截的url配置信息
		 */
		@Override
		public void afterPropertiesSet() throws ServletException {
			super.afterPropertiesSet();
			if("1".equals(SecurityConfig.getConfig("validateCodeLogin"))){//如果是1则说明验证登录
				urlSet.add(SecurityConfig.getConfig("loginPage"));
			}
			addUrlToMap(SecurityConfig.getConfig("validateCodeUrls",""));
		}

		/**
		 * 将系统中配置的需要校验验证码的URL根据校验的类型放入set中
		 * 
		 * @param urlString
		 */
		protected void addUrlToMap(String urlString) {
			if (StringUtils.isNotBlank(urlString)) {
				String[] urls = StringUtils.splitByWholeSeparatorPreserveAllTokens(urlString, ",");
				for (String url : urls) {
					urlSet.add(url);
				}
			}
		}

		
		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)throws ServletException, IOException {
			//判断该请求是否必须要验证 验证码
			if(isValidateCode(request)){
				logger.info("校验请求(" + request.getRequestURI() + ")中的验证码");
				try {
					new ValidateCodeProcessor().validate(request);
					logger.info("验证码校验通过");
				} catch (ValidateCodeException exception) {
					kmzcAuthenticationFailureHandler.onAuthenticationFailure(request, response, exception);
					return;
				}
			//判断是否是获取验证码的地址，如果是则创建验证码并返回
			}else if(isGetYzmImgUrl(request)){
				BufferedImage image=ImageCodeGenerator.generate(request.getSession());
				try {
					ImageIO.write(image, "JPEG", response.getOutputStream());
				} catch (IOException e) {
					logger.error("生成验证码时出现异常："+e.getMessage(),e);
				}
				return;
			}
			chain.doFilter(request, response);

		}
		/**
		 * 描述：判断当天请求的url是否需要进行 验证码验证
		 * @param request
		 * @return
		 *
		 * 
		 * 2018年4月25日 下午2:42:49
		 */
		private boolean isValidateCode(HttpServletRequest request) {
			boolean result = false;
			if (!StringUtils.equalsIgnoreCase(request.getMethod(), "get")) {
				//请求的uri，需要把开头的ContextPath去掉
				String reqUrl=request.getRequestURI().substring(request.getContextPath().length());
				for (String url : urlSet) {
					if (pathMatcher.match(url,reqUrl)) {
						result=true;
						break;
					}
				}
			}
			return result;
		}
		/**
		 * 描述：判断是不是获取验证码图片
		 * @param request
		 * @return
		 *
		 * 
		 * 2018年5月28日 下午2:54:22
		 */
		private boolean isGetYzmImgUrl(HttpServletRequest request){
			//请求的uri，需要把开头的ContextPath去掉
			String reqUrl=request.getRequestURI().substring(request.getContextPath().length());
			return pathMatcher.match(SecurityConfig.getConfig("validateCodeImgUrl", "/validate/image.do"), reqUrl);
			
		}
}
