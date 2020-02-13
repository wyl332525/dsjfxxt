package com.kmzc.security.token.webservice;

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
public class WebserviceSecurityFilter extends TokenSecurityFilter{

	public WebserviceSecurityFilter() {
		TokenPojo tokenPojo=new TokenPojo();
		 tokenPojo.setLoginUrl(SecurityConfig.getConfig("webserviceLoginUrl", "/zc/loginout/webserviceLogin.do"));
		 tokenPojo.setAccessUrls(SecurityConfig.getConfig("webserviceLoginAccessUrls", "/services/**"));
		 tokenPojo.setCheckInvokeId(SecurityConfig.getConfig("webserviceIsCheckSbid", true,Boolean.class));
		 tokenPojo.setInvokeArgName(SecurityConfig.getConfig("webserviceSbidArgName", "sbid"));
		 tokenPojo.setLoginUserName(SecurityConfig.getConfig("webserviceLoginUserName", "userName"));
		 tokenPojo.setPasswordName(SecurityConfig.getConfig("webserviceLoginPasswordName", "password"));
		 tokenPojo.setTokenArgName(SecurityConfig.getConfig("webserviceTokenArgName", "token"));
		 tokenPojo.setTokenValidTime(SecurityConfig.getConfig("webserviceTokenValidTime", 7200, Integer.class));
		 tokenPojo.setType("webservice");
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
