package com.kmzc.security.authentication;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.cache.StaticVar;
/**
 * 描述：配置自己的登录错误处理的handler，如果是ajax登录的则返回json错误数据，否则就进行错误页面跳转
 */
@Component
public class MapuniAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {
		//ajax登录，就返回json的数据，如果是form就跳转到成功页面(一般是首页或请求的页面)
		if("ajax".equalsIgnoreCase(SecurityConfig.getConfig("loginPageType"))){
			response.setContentType("application/json;charset=UTF-8");
			response.getWriter().write("{\"errInfo\":\""+exception.getMessage()+"\"}");
		}else{//form登录，调用父类的跳转
			String errs=exception.getMessage();
			if(errs.indexOf("坏的凭证")>=0){//说明是密码错误，则更新数据库
				StaticVar.sqlSessionFactory.openSession(true).update("com.kmzc.dao.xt.YhJsCdMapper.userUpdateLoginErrInfo", request.getParameter("username"));
				errs="密码错误，注意连续输错 "+SecurityConfig.getConfig("loginErrNum","4")+" 次，账号将被锁定 "+SecurityConfig.getConfig("loginErrTime","30")+" 分钟。";
			}
			returnLoginPage(response,errs);
			//super.onAuthenticationFailure(request, response, exception);
		}
	}
	
	public static void returnLoginPage(HttpServletResponse response,String errs){
		String loginUrl=StaticVar.contextPath+SecurityConfig.getConfig("loginPage");
		response.setContentType("text/html;charset=UTF-8");
		try {
			String str="alert('"+errs+"');";
			if(loginUrl!=null&&"/dsj/view/loginout/login.do".equals(loginUrl)&&errs!=null&&"1".equals(errs))
				str="";
			response.getWriter().write("<script type='text/javascript'>"+"window.location.href='"+loginUrl+"';"+str+"</script>");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
