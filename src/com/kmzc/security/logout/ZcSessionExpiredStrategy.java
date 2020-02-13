package com.kmzc.security.logout;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.session.SessionInformationExpiredEvent;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;

public class ZcSessionExpiredStrategy implements SessionInformationExpiredStrategy {

	@Override
	public void onExpiredSessionDetected(SessionInformationExpiredEvent event) throws IOException, ServletException {
		HttpServletResponse response=event.getResponse();
		System.out.println("33333333333333");
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write("该账号在其他地方登录，本次登录已退出。");
	}

}
