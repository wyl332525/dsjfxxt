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
public class WgcySecurityFilter extends TokenSecurityFilter{

	public WgcySecurityFilter() {
		TokenPojo tokenPojo=new TokenPojo();
		 tokenPojo.setLoginUrl(SecurityConfig.getConfig("wgcyLoginUrl", "/zc/loginout/appLogin.do"));
		 tokenPojo.setAccessUrls(SecurityConfig.getConfig("wgcyLoginAccessUrls", "/wgcy/**"));
		 tokenPojo.setCheckInvokeId(SecurityConfig.getConfig("wgcyIsCheckSbid", true,Boolean.class));
		 tokenPojo.setInvokeArgName(SecurityConfig.getConfig("wgcySbidArgName", "sbid"));
		 tokenPojo.setLoginUserName(SecurityConfig.getConfig("wgcyLoginUserName", "userName"));
		 tokenPojo.setPasswordName(SecurityConfig.getConfig("wgcyLoginPasswordName", "password"));
		 tokenPojo.setTokenArgName(SecurityConfig.getConfig("wgcyTokenArgName", "token"));
		 tokenPojo.setTokenValidTime(SecurityConfig.getConfig("wgcyTokenValidTime", 7200, Integer.class));
		 tokenPojo.setType("wgcy");
		 super.setTokenPojo(tokenPojo);
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		Authentication authentication=super.attemptAuthentication(request, response);
		//写业务逻辑
		if(false){
			throw new TokenSecurityException("2"+SecurityConfig.getConfig("wgcyAutoUpdateUrl"));
		}
		return authentication;
	}
	
}
