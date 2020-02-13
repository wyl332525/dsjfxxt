package com.kmzc.controller.system;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.security.user.ZcUserDetails;


@Controller
@RequestMapping("/system/onlineUsers")
@Scope(value="prototype")
public class OnlineUsersController {
	/**
	 * 日志读写
	 */
	private static Logger logger=Logger.getLogger(OnlineUsersController.class);
	@Autowired
	private SessionRegistry sessionRegistry;
	@RequestMapping("/getOnline")
	public void getOnline(HttpServletRequest request,HttpServletResponse response){
		List<ZcUserDetails> usersList = getAllLoginUsers();
		int rowAll=usersList.size();
		StringBuffer retJson=new StringBuffer();
		retJson.append("{\"total\":").append(rowAll);
		retJson.append(",\"rows\":[");
		for(int i=0;i<usersList.size();i++){
			retJson.append("{");
			retJson.append("\"").append("id").append("\":\"").append(usersList.get(i).getHttpSession().getId()).append("\",");
			retJson.append("\"").append("userId").append("\":\"").append(usersList.get(i).getUsername()).append("\",");
			retJson.append("\"").append("userName").append("\":\"").append(usersList.get(i).getUserShowName()).append("\",");
			retJson.append("\"").append("time").append("\":\"").append(usersList.get(i).getLoginTime()).append("\",");
			retJson.append("\"").append("ip").append("\":\"").append(usersList.get(i).getIp()).append("\",");
			retJson.deleteCharAt(retJson.length()-1).append("},");
		}
		retJson.deleteCharAt(retJson.length()-1).append("]}");
		response.setContentType("application/json;charset=GBK");
		PrintWriter out1;
		try {
			out1 = response.getWriter();
			out1.print(retJson.toString());
			out1.flush();
			out1.close();
		} catch (IOException e) {
			e.printStackTrace();
			logger.error(e.getMessage());
		}
	}
	
	
	/**
	 * 描述：强制退出登录用户
	 * @return
	 * 
	 * 2018年6月21日 下午5:28:07
	 */
	@RequestMapping("logout")
	public void LogoutUser(HttpServletRequest  request,HttpServletResponse respone){
		String sessionId=request.getParameter("sessionId");
		String msg=request.getParameter("msg"); 
		List<ZcUserDetails> usersList = getAllLoginUsers();
		for(ZcUserDetails u:usersList){
			if(u.getHttpSession().getId().equals(sessionId)){
				HttpSession s=u.getHttpSession();
				if(s!=null){
					String logoutWay ="";
					if(msg.equals("1")){
						logoutWay="管理员强制退出";
					}
					s.setAttribute("logoutWay",logoutWay);
					s.invalidate();
				}
				break;
			}
		}
		
	}
	/**
	 * 描述：得到所有的已经登录的用户信息
	 * @return
	 * 
	 * 2018年6月21日 下午5:28:07
	 */
	private List<ZcUserDetails> getAllLoginUsers(){
		List<Object> principals = sessionRegistry.getAllPrincipals(); 
		List<ZcUserDetails> usersList = new ArrayList<ZcUserDetails>();  
		for (Object principal: principals) {  
			
			if (principal instanceof ZcUserDetails) {  
				usersList.add((ZcUserDetails) principal);  
			}
		}  
		return usersList;
	}
}
