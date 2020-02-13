package com.kmzc.security.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.kmzc.cache.StaticVar;

public class RememberMeAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		Object sessionRegistry=StaticVar.applicationContext.getBean("sessionRegistry");
		//将登录信息注册到session管理中，否则在获取在线用户时，获取不到通过 记住我 的功能登录的用户
		SessionRegistryImpl sri= (SessionRegistryImpl) sessionRegistry;
		sri.registerNewSession(request.getSession().getId(), authentication.getPrincipal());
		//将登录信息写到数据库中
		MapuniAuthenticationSuccessHandler.saveLogin2db(request,authentication,"记住我登录");
		super.onAuthenticationSuccess(request, response, authentication);
	}

}
