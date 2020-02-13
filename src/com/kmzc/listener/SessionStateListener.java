package com.kmzc.listener;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.ibatis.session.SqlSession;

import com.kmzc.cache.StaticVar;


@WebListener
public class SessionStateListener implements HttpSessionListener {
	private static SqlSession sqlSession=null;

    public SessionStateListener() {
    }

    public void sessionCreated(HttpSessionEvent arg0)  { 
    	
    }

    public void sessionDestroyed(HttpSessionEvent arg0)  { 
    	if(sqlSession==null){
    		sqlSession=StaticVar.sqlSessionFactory.openSession(true);
    	}
    	HttpSession session=arg0.getSession();
    	System.out.println("sessionDestroyed");
		Map<String,Object> args=new HashMap<String,Object>();
		args.put("pkid", session.getId());
		Object logoutType=session.getAttribute("logoutType");
		args.put("tcfs", logoutType==null?"超时退出":logoutType.toString());
		args.put("tcsj", new Date());
		sqlSession.update("com.kmzc.dao.xt.sysrz.logoutRz", args);
    }
	
}
