package com.kmzc.security.authorization.impl;

import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.authorization.AuthorizeConfigProvider;

@Component
@Order(Integer.MIN_VALUE)
public class PermitAllAuthorizeConfigProvider  implements AuthorizeConfigProvider{

	@Override
	public void config(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.ExpressionInterceptUrlRegistry config) {
		config.antMatchers(
				SecurityConfig.getConfig("loginPage"),//登录页面
				"/validate/image.do",//验证码页面
				"/css/**/**/**/**/**/**",
				"/**/**/**/**/**/**",
				"/img/**/**/**/**/**/**",
				"/xtfg/**/**/**/**/**/**",
				"/jsp/common/**",
				"/js/plugins/**",
				"/js/login/**",
				"/wechat/**",
				"/wechat/**/**",
				"/db/query.do",
				"/db/operSql.do",
				SecurityConfig.getConfig("appLoginUrl","/zc/loginout/appLogin.do"),//app登录页面
				SecurityConfig.getConfig("webserviceLoginUrl", "/zc/loginout/webserviceLogin.do")//webservice登录页面
				).permitAll();//匹配到的这个路径，不用身份认证
	}

}
