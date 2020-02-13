package com.kmzc.security.authorization.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.authorization.AuthorizeConfigProvider;

@Component
@Order(2)
public class WebserviceAuthorizeConfigProvider  implements AuthorizeConfigProvider{

	@Override
	public void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		String[] urls=StringUtils.splitByWholeSeparatorPreserveAllTokens(SecurityConfig.getConfig("webserviceLoginAccessUrls", "/services/**"), ",");
		config.antMatchers(urls).permitAll();//因为该部分已经在 WebserviceSecurityFilter中验证过了，直接通过即可
	}

}
