package com.kmzc.security.token;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import com.kmzc.cache.SecurityConfig;

/**
 * 描述：配置App登录错误处理的handler
 * 
 * 2018年5月6日 下午9:36:27
 */
public class TokenAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		response.setContentType("application/json;charset=UTF-8");
		String errInfo=exception.getMessage();
		String flag="0";
		String autoUpdateUrl="";
		if(errInfo.startsWith("2")){//2开头表示是版本不一致，0表示登录认证失败，1表示成功
			flag="2";
			autoUpdateUrl=errInfo.substring(1);
			errInfo="版本不一致";
		}
		response.getWriter().write("{\"flag\":\""+flag+"\",\"message\":\""+errInfo+"\",\"result\":{\"autoUpdateUrl\":\""+autoUpdateUrl+"\"}}");	
	}
}
