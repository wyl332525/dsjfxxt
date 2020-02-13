package com.kmzc.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class SpringUtils {
	private static ApplicationContext applicationContext=null;
	private static JdbcTemplate jdbcTemplate=null;
	private static List<String> readJdbcTemplateName=new ArrayList<String>();
	private static int readJdbcIndex=0;
	/**
	 * @param context
	 * 功能描述: 设置Spring的ApplicationContext 
	 * 
	 * @date 2016-7-22 下午2:21:42
	 */
	public static void setApplicationContext(ApplicationContext context){
		applicationContext=context;
		String[] jdbcName=context.getBeanNamesForType(JdbcTemplate.class);
		for(String name:jdbcName){
			if(!"jdbcTemplate".equals(name)){//把其中写入的jdbcTemplate给去掉
				readJdbcTemplateName.add(name);
			}
		}
	}
	/**
	 * @return
	 * 功能描述: 得到Spring的ApplicationContext 
	 * 
	 * @date 2016-7-22 下午2:22:13
	 */
	public static ApplicationContext getApplicationContext(){
		return applicationContext;
	}
	/**
	 * @param jdbc
	 * 功能描述:设置Spring JdbcTemplate，在SysInitServlet中设置的
	 * 
	 * @date 2016-7-22 下午2:22:16
	 */
	public static void setJdbcTemplate(JdbcTemplate jdbc){
		jdbcTemplate=jdbc;
	}
	/**
	 * @return
	 * 功能描述:得到 Spring JdbcTemplate
	 * 
	 * @date 2016-7-22 下午2:22:23
	 */
	public static JdbcTemplate getJdbcTemplate(){
		return jdbcTemplate;
	}
	
	/**
	 * 
	 * @return
	 * 功能描述: 获取读取数据的jdbcTemplate,如果有多个则按顺序返回
	 * 
	 * @date 2016-12-13 下午1:44:48
	 */
	public static JdbcTemplate getReadJdbcTemplate(){
		JdbcTemplate jdbc=null;
		if(readJdbcTemplateName.size()==0){
			jdbc=(JdbcTemplate)applicationContext.getBean("jdbcTemplate");
		}else{
			synchronized(SpringUtils.class){
				if(readJdbcIndex>=readJdbcTemplateName.size()){
					readJdbcIndex=0;
				}
				System.out.println("---------getReadJdbcTemplate------------"+readJdbcTemplateName.get(readJdbcIndex));
				jdbc=(JdbcTemplate)applicationContext.getBean(readJdbcTemplateName.get(readJdbcIndex++));
			}
		}
		return jdbc;
	}
	/**
	 * 
	 * @return
	 * 功能描述:从多个读取的jdbcTemplate中随机返回一个jdbcTemplate
	 * 
	 * @date 2016-12-13 下午4:29:47
	 */
	public static JdbcTemplate getReadJdbcTemplateRandom(){
		JdbcTemplate jdbc=null;
		if(readJdbcTemplateName.size()==0){
			jdbc=(JdbcTemplate)applicationContext.getBean("jdbcTemplate");
		}else{
			int sx=new Random().nextInt(100)%readJdbcTemplateName.size();
			jdbc=(JdbcTemplate)applicationContext.getBean(readJdbcTemplateName.get(sx));
			System.out.println("----------getReadJdbcTemplateRandom-----------"+readJdbcTemplateName.get(sx));
		}
		return jdbc;
	}
}
