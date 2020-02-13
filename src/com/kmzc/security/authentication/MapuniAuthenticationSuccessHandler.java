package com.kmzc.security.authentication;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Component;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.cache.StaticVar;
import com.kmzc.security.user.ZcUserDetails;
import com.kmzc.utils.CommonUtils;

import net.sf.json.JSONObject;
/**
 * 描述：配置自己的登录成功处理的handler，如果是ajax登录的则返回json成功数据，否则就进行登录成功页面跳转(一般是首页或请求的页面)
 * 
 * 2018年4月24日 下午5:09:37
 */
@Component
public class MapuniAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	private static SqlSession sqlSession=null;
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		//ajax登录，就返回json的数据，如果是form就跳转到成功页面(一般是首页或请求的页面)
		saveLogin2db(request,authentication,"正常登录");//将登录信息写到数据库中
		if("ajax".equalsIgnoreCase(SecurityConfig.getConfig("loginPageType"))){
			response.setContentType("application/json;charset=UTF-8");
			JSONObject json=new JSONObject();
			json.put("isAuthenticated", authentication.isAuthenticated());
			json.put("userInfo", authentication.getPrincipal());
			response.getWriter().write(json.toString());
		}else{//form登录，调用父类的跳转
			super.onAuthenticationSuccess(request, response, authentication);
		}
	}

	public static void saveLogin2db(HttpServletRequest request,Authentication authentication,String loginType){
		if(sqlSession==null){
			sqlSession=StaticVar.sqlSessionFactory.openSession(true);
		}
		String userId=authentication.getName();
		Object detailsObj=authentication.getDetails();
		Object userObj=authentication.getPrincipal();
		String ip="";
		if(detailsObj instanceof WebAuthenticationDetails){
			WebAuthenticationDetails details=(WebAuthenticationDetails) detailsObj;
			ip=details.getRemoteAddress();
			
		}
		ZcUserDetails user= null;
		if(userObj instanceof ZcUserDetails){
			user=(ZcUserDetails) userObj;
		}else{
			user=new ZcUserDetails(userId);
		}
		HttpSession session=request.getSession();
		session.setAttribute("userId", userId);
		session.setAttribute("userName", user.getUserShowName());
		Date dlsj=new Date();//登录时间
		user.setIp(ip);
		user.setHttpSession(session);;
		user.setLoginTime(CommonUtils.formatDateTime(dlsj));
		
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("pkid", session.getId());
		args.put("dldnip",ip);
		args.put("ssjg", user.getSsjg());
		args.put("yhlx", user.getYhlx());
		args.put("dlzh", userId);
		args.put("dlmc", user.getUserShowName());
		args.put("dlfs", loginType);
		args.put("dlsj", dlsj);
		if(detailsObj instanceof WebAuthenticationDetails){
			WebAuthenticationDetails details=(WebAuthenticationDetails) detailsObj;
			args.put("dldnip", details.getRemoteAddress());
		}
		try{
			sqlSession.insert("com.kmzc.dao.xt.YhJsCdMapper.userUpdateLoginSucess", userId);
			sqlSession.insert("com.kmzc.dao.xt.sysrz.loginRz", args);
		}catch(Exception e){
			//发生异常时，一般是主键冲突，更多的时候是因为访问有些禁用的资源，导致重复跳转登录，不用去处理就可以
			Logger.getLogger(MapuniAuthenticationSuccessHandler.class).error(e.getMessage(),e);
		}
	}
}
