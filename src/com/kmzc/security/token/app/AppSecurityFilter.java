package com.kmzc.security.token.app;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.token.TokenPojo;
import com.kmzc.security.token.TokenSecurityException;
import com.kmzc.security.token.TokenSecurityFilter;

@Component
/**
 * 描述：处理APP的登录和访问资源的过滤器，是在WebSecurityConfig中加入到过滤器链中的
 * 
 * 2018年5月11日 下午4:04:16
 */
public class AppSecurityFilter extends TokenSecurityFilter{

	public AppSecurityFilter() {
		TokenPojo tokenPojo=new TokenPojo();
		 tokenPojo.setLoginUrl(SecurityConfig.getConfig("appLoginUrl", "/zc/loginout/appLogin.do"));
		 tokenPojo.setAccessUrls(SecurityConfig.getConfig("appLoginAccessUrls", "/android/**"));
		 tokenPojo.setCheckInvokeId(SecurityConfig.getConfig("appIsCheckSbid", true,Boolean.class));
		 tokenPojo.setInvokeArgName(SecurityConfig.getConfig("appSbidArgName", "sbid"));
		 tokenPojo.setLoginUserName(SecurityConfig.getConfig("appLoginUserName", "userName"));
		 tokenPojo.setPasswordName(SecurityConfig.getConfig("appLoginPasswordName", "password"));
		 tokenPojo.setTokenArgName(SecurityConfig.getConfig("appTokenArgName", "token"));
		 tokenPojo.setTokenValidTime(SecurityConfig.getConfig("appTokenValidTime", 7200, Integer.class));
		 tokenPojo.setType("app");
		 super.setTokenPojo(tokenPojo);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		Authentication authentication=super.attemptAuthentication(request, response);
		//写业务逻辑
		if(true){
			throw new TokenSecurityException("2"+SecurityConfig.getConfig("appAutoUpdateUrl"));
		}
		return authentication;
	}
	
}
