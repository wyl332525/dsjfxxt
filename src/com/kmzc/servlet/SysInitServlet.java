package com.kmzc.servlet;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.kmzc.cache.Cache;
import com.kmzc.cache.StaticVar;
//import com.kmzc.service.thread.ClearYuyueInfoThread;
//import com.kmzc.service.thread.SyncWechatUserThread;
/**
 * 功能描述: 系统进行初始化的操作
 * 
 * @date 2018-3-27 下午2:12:16
 */
@WebServlet(name="SysInitServlet",urlPatterns="/sysInit",loadOnStartup=1)
public class SysInitServlet extends HttpServlet {
	private static final long serialVersionUID = 1924646752401174434L;
	public static String contextPath="";// /zx
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		ServletContext servletContext=config.getServletContext();
		StaticVar.servletContext=config.getServletContext();
		contextPath=servletContext.getContextPath();
		/**
		 * 从ServletContext域中获取到Spring的ApplicationContext
		 */
		StaticVar.applicationContext=WebApplicationContextUtils.getWebApplicationContext(StaticVar.servletContext);
		try {
			StaticVar.sqlSessionFactory=StaticVar.applicationContext.getBean(SqlSessionFactoryBean.class).getObject();
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		StaticVar.contextPath=StaticVar.servletContext.getContextPath();
		StaticVar.realPath=StaticVar.servletContext.getRealPath("/");

		/**初始化所有缓存*/
		Map<String, Cache> caches=StaticVar.applicationContext.getBeansOfType(Cache.class);
		if(caches!=null){
			for(Cache c:caches.values()){
				try {
					c.init();
					System.out.println("-------------------完成："+c.getClass().getName()+"的缓存初始化--------------------");					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		//启动定时器
		Timer timer=new Timer();
		Date cur=new Date();
		int year=cur.getYear();
		int month=cur.getMonth();
		int day=cur.getDate();
		int hour = cur.getHours();
		int minute = cur.getMinutes();
		int seconds = cur.getSeconds();
		Date startDate = new Date(year,month,day,cur.getHours()+1,0,0);//开始执行的日期
		Date clearYuyueDate = new Date(year,month,day,0,1,0);
		Date resetDate = new Date(year,month,day,00,00,00);

		try{
//			//定时执行接口，每隔1小时调用一次
//			timer.schedule(new SyncWechatUserTask(), startDate , 60*60*1000);
//			//定时每天夜里12点，进行清理当天以及之前预约了但是未检测的预约数据
//			timer.schedule(new ClearYuyueInfoTask(), clearYuyueDate , 24*60*60*1000);
//			//定时每个月1号零点重置优图账号的使用次数
//			timer.schedule(new ResetYoutuUseNumThread(), resetDate , 24*60*60*1000);
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
//	private class SyncWechatUserTask extends TimerTask{
//		@Override
//		public void run() {
//			new Thread(new SyncWechatUserThread()).start();
//		}
//	}
//	
//	private class ClearYuyueInfoTask extends TimerTask{
//		@Override
//		public void run() {
//			new Thread(new ClearYuyueInfoThread()).start();
//		}
//	}
//	
//	private class ResetYoutuUseNumThread extends TimerTask{
//		@Override
//		public void run() {
//			new Thread(new ResetYoutuUseNumThread()).start();
//		}
//	}
}
