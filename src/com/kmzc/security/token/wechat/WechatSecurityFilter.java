package com.kmzc.security.token.wechat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.token.TokenPojo;
import com.kmzc.security.token.TokenSecurityFilter;

@Component
/**
 * 描述：处理WebService的登录和访问资源的过滤器，是在WebSecurityConfig中加入到过滤器链中的
 * 
 * 2018年5月14日 下午1:50:24
 */
public class WechatSecurityFilter extends TokenSecurityFilter{

	public WechatSecurityFilter() {
		TokenPojo tokenPojo=new TokenPojo();
		 tokenPojo.setLoginUrl(SecurityConfig.getConfig("wechatLoginUrl", "/zc/wechat/**"));
		 tokenPojo.setAccessUrls(SecurityConfig.getConfig("wechatLoginAccessUrls", "/zc/wechat/**"));
		 tokenPojo.setCheckInvokeId(SecurityConfig.getConfig("wechatIsCheckSbid", false,Boolean.class));
		 tokenPojo.setInvokeArgName(SecurityConfig.getConfig("wechatSbidArgName", "sbid"));
		 tokenPojo.setLoginUserName(SecurityConfig.getConfig("wechatLoginUserName", "userName"));
		 tokenPojo.setPasswordName(SecurityConfig.getConfig("wechatLoginPasswordName", "password"));
		 tokenPojo.setTokenArgName(SecurityConfig.getConfig("wechatTokenArgName", "token"));
		 tokenPojo.setTokenValidTime(SecurityConfig.getConfig("wechatTokenValidTime", 7200, Integer.class));
		 tokenPojo.setType("wechat");
		 super.setTokenPojo(tokenPojo);
	}

	@Override
	/**
	 * 父类验证用户登录的方法，可以进行覆盖
	 */
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		return super.attemptAuthentication(request, response);
	}
	
}
