package com.kmzc.security.authorization.impl;

import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

import com.kmzc.security.authorization.AuthorizeConfigProvider;

@Component
@Order(Integer.MAX_VALUE)
public class CheckAuthorizeConfigProvider  implements AuthorizeConfigProvider{

	@Override
	public void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		config.antMatchers("/**").access("@rbacService.check(authentication,request)");//其他的路径需要进行自定义的身份认证
		
	}

}
