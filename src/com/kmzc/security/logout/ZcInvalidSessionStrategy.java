package com.kmzc.security.logout;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.session.InvalidSessionStrategy;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.cache.StaticVar;
import com.kmzc.security.authentication.MapuniAuthenticationFailureHandler;

public class ZcInvalidSessionStrategy implements InvalidSessionStrategy {

	@Override
	public void onInvalidSessionDetected(HttpServletRequest request, HttpServletResponse response)
			throws IOException, ServletException {
		String reqUrl = request.getRequestURI().substring(request.getContextPath().length());
		System.out.println(reqUrl);
		if(reqUrl.contains("wechat") || reqUrl.contains("getViewImg") || reqUrl.contains("db")){
			System.out.println(123);
			request.getSession();
			response.setContentType("text/html;charset=UTF-8");
			try {
				response.getWriter().write("<script type='text/javascript'>"+"window.location.href='"+request.getRequestURI()+"?code="+request.getParameter("code")+"';</script>");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}else{
			System.out.println(223);
			String alertInfo=request.getParameter("alertInfo");
			request.getSession();
			System.out.println(alertInfo);
			if(alertInfo!=null&&"1".equals(alertInfo))//正常退出
				alertInfo="退出成功";
			else{
				alertInfo="您登录已超时，请重新登录！";
			}
			//MapuniAuthenticationFailureHandler.returnLoginPage(response, alertInfo);
		}
//		原来session已经失效，用request.getSession()产生新的session，否则会死循环
		request.getSession();
		
	}

}
