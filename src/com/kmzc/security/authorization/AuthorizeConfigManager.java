package com.kmzc.security.authorization;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

@Component
public class AuthorizeConfigManager {
	@Autowired
	private List<AuthorizeConfigProvider> providers;
	public void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		for(AuthorizeConfigProvider p: providers){
			p.config(config);
		}
	}
}
