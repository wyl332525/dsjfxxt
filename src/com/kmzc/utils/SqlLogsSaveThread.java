package com.kmzc.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.apache.ibatis.session.SqlSession;

import com.kmzc.cache.Config;
import com.kmzc.cache.StaticVar;
/**
 * 
 * 描述：将执行的sql语句保存到文件中或数据库中
 * 
 * 2018年3月27日 下午1:28:35
 */
public class SqlLogsSaveThread implements Runnable{
	private static ConcurrentLinkedQueue<Map<String,String>> sqlsInfo=new ConcurrentLinkedQueue<Map<String,String>>();
	
	private static SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
	private static int saveDays=90;//保存sql执行日志文件的存储天数
	private static String sqlLogsRoot="c:/sqlLogs";//sql语句保存的跟目录
	private static boolean sqlLogs2db =false;//sql执行的日志是否插入到数据库；true表示写数据库
	private static String sqlLogs2DbType="1";//1表示只插入增删改的语句，2表示全部语句，包括查询的语句
	private static SqlSession sqlSession;

	static{
		//初始化sql语句记录日志的相关参数（从配置文件中获取）；
		String sqlRoot =Config.getConfig("sqlLogsRoot");
		if(sqlRoot!=null){sqlLogsRoot=sqlRoot;}
		String sqlLogs2dbStr =Config.getConfig("sqlLogs2db");
		if("0".equals(sqlLogs2dbStr)){sqlLogs2db=false;}else{sqlLogs2db=true;}
		String sqlLogs2DbTypeStr =Config.getConfig("sqlLogs2DbType");
		if("2".equals(sqlLogs2DbTypeStr)){sqlLogs2DbType="2";}else{sqlLogs2DbType="1";}
		try{
			String sqlLogsSaveDays=Config.getConfig("sqlLogsSaveDays");
			if(sqlLogsSaveDays!=null){saveDays=Integer.valueOf(sqlLogsSaveDays);}
		}catch(Exception e){
			e.printStackTrace();
		}
		try {
			sqlSession=StaticVar.sqlSessionFactory.openSession(true);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//启动sql日志记录线程
		new Thread(new SqlLogsSaveThread()).start();
	}
	@Override
	public void run() {
		String dateStr=sdf.format(new Date());
		FileOutputStream fos=createLogFileOutputStream(dateStr);
		StringBuffer sql=new StringBuffer();
		while(true){
			if(sqlsInfo.isEmpty()){//如果待处理的为空，则休眠3秒
				try {fos.flush();} catch (IOException e1) {e1.printStackTrace();}
				String curDate=DateUtils.formatDate(new Date(),"yyyyMMdd");
				if(!dateStr.equals(curDate)){//如果原来的日期和现在的不同则重新打开文件
					if(fos!=null){//先关闭原来的
						try {fos.close();} catch (IOException e) {e.printStackTrace();}
					}
					dateStr=curDate;
					fos=createLogFileOutputStream(dateStr);
				}
				try {Thread.sleep(3000);} catch (InterruptedException e) {e.printStackTrace();}
			}else{
				Map<String,String> sqlInfo=sqlsInfo.poll();
				sql.setLength(0);
				sql.append("sql:[").append(sqlInfo.get("sql")).append("],参数:[")
					.append(sqlInfo.get("args")).append("],执行开始时间:[").append(sqlInfo.get("startTime"))
					.append("],执行时间:[").append(sqlInfo.get("exeTime")).append("ms],执行人[").append(sqlInfo.get("userId")).append("]\n\r");
				byte[] temByte=sql.toString().getBytes();
				try {
					fos.write(temByte,0,temByte.length);
				} catch (IOException e) {
					e.printStackTrace();
				}
				//如果需要写入数据库，则写到数据库中
				if(sqlLogs2db){
					//如果配置是1，则表示只插入增删改的语句，也就是非select开头的语句，如果配置是2则全部都插入
					if(("1".equals(sqlLogs2DbType) && !sqlInfo.get("sql").toLowerCase().startsWith("select "))
							|| "2".equals(sqlLogs2DbType)){
						try{
							sqlSession.insert("com.kmzc.dao.xt.sysrz.sqlRz", sqlInfo);
						}catch(Exception e){
							e.printStackTrace();
						}
					}
				}
			}
		}
	}
	
	/**
	 * 描述：将已经执行过的sql语句及相关信息加入到待保存的队列中
	 * @param sqlInfo
	 *
	 * 
	 * 2018年3月27日 下午5:34:10
	 */
	public static void addSqlInfo(Map<String,String> sqlInfo){
		sqlsInfo.add(sqlInfo);
	}
	
	/**
	 * 描述：创建日志输出流文件
	 * @param dateStr
	 * @return
	 *
	 * 
	 * 2018年3月27日 下午1:29:20
	 */
	private FileOutputStream createLogFileOutputStream(String dateStr){
		File f=new File(sqlLogsRoot+"/"+new SimpleDateFormat("yyyy/MM").format(new Date())+"/"+dateStr+".txt");
		if(!f.getParentFile().exists()){
			f.getParentFile().mkdirs();
		}
		if(!f.exists()){
			try {
				f.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		FileOutputStream fos=null;
		try {
			fos=new FileOutputStream(f,true);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		//创建一次sql的日志文件，就启动线程清理一次过期的日志文件
		new Thread(
				new Runnable(){
					@Override
					public void run() {
						Date jzrqDate=DateUtils.dateAddDays(new Date(), -saveDays);//截止日期
						int jzrq=Integer.valueOf(DateUtils.formatDate(jzrqDate, "yyyyMMdd"));
						clearSqlLogs(new File(sqlLogsRoot),jzrq);
					}
					
					/**
					 * 功能描述: 递归清理已经过期是sql日志文件 
					 * @param f         sql日志保留的跟目录
					 * @param jzrq		sql过期的截止日期，例如20160610
					 * 
					 * @date 2016-12-13 上午9:42:15
					 */
					private void clearSqlLogs(File f,int jzrq){
						if(f.isDirectory()){
							File[] fs=f.listFiles();
							if(fs==null || fs.length==0){
								f.delete();
							}else{
								for(File file:fs){
									clearSqlLogs(file,jzrq);
								}
							}
						}else{
							if(f.exists()){
								String fName=f.getName();
								if(Integer.valueOf(fName.substring(0,8))<jzrq){
									f.delete();
								}
							}
						}
					}
				}
			).start();
		return fos;
	}
}
