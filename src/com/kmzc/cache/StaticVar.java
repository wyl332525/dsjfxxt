package com.kmzc.cache;

import javax.servlet.ServletContext;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.context.ApplicationContext;

/**
 * 描述：静态常用变量
 * 
 * 2018年5月6日 上午10:35:43
 */
public class StaticVar {
	/**缓存类型 redis和mysql*/
	public static final String cacheType=Config.getConfig("cacheType","myself");
	/**Servlet上下文 在SysInitServlet中进行初始化*/
	public static ServletContext servletContext;
	/**Spring应用上下文 在SysInitServlet中进行初始化*/
	public static ApplicationContext applicationContext;
	/**sqlSession工厂 在SysInitServlet中进行初始化*/
	public static SqlSessionFactory sqlSessionFactory;
	/**应用上下文路径，也就是访问的跟路径   在SysInitServlet中进行初始化*/
	public static String contextPath;
	/**应用的真实路径（绝对路径）， 在SysInitServlet中进行初始化*/
	public static String realPath;
}
