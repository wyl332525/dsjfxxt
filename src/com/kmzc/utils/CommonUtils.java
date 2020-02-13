package com.kmzc.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 
 * 描述：通用的工具类
 * 
 * 2018年3月27日 下午1:56:07
 */
public class CommonUtils {
	/**
	 * 
	 * @param obj
	 * @return
	 * 功能描述:判断传入的参数是否为null或为空的字符串，如果未空则返回true否则返回false
	 * 
	 * @date 2016-7-24 上午10:39:01
	 */
	public static boolean isEmpty(Object obj){
		if(obj==null || "".equals(obj)){
			return true;
		}else{
			if("null".equalsIgnoreCase(obj.toString())){
				return true;
			}else{
				return false;
			}
		}
	}
	/**
	 * 
	 * @param date
	 * @param sdf
	 * @return
	 * 功能描述:格式化一个日期
	 * 
	 * @date 2016-12-1 下午3:04:15
	 */
	public static String formatDate(Date date,String sdf){
		return new SimpleDateFormat(sdf).format(date);
	}
	public static Date parseDate(String date,String sdf) throws ParseException{
		return new SimpleDateFormat(sdf).parse(date);
	}
	public static Date parseDate(String date) throws ParseException{
		return new SimpleDateFormat("yyyy-MM-dd").parse(date);
	}
	public static Date parseDateTime(String date) throws ParseException{
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date);
	}
	public static String formatDate(Date date){
		return new SimpleDateFormat("yyyy-MM-dd").format(date);
	}
	public static String formatDateTime(Date date){
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
	}
	public static String getCurrentDate(){
		return formatDate(new Date());
	}
	public static String getCurrentDateTiem(){
		return formatDateTime(new Date());
	}
	/**
	 * 
	 * @param date		日期基数，就是需要加减的日期
	 * @param numMonth  日期加减，负数是减，正数是加
	 * @return
	 * 功能描述:
	 * 
	 * @date 2016-12-13 上午10:43:57
	 */
	public static Date dateAddDays(Date date,int numMonth){
		Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(date);
        rightNow.add(Calendar.DAY_OF_YEAR,numMonth);//日期加减，负数是减，正数是加
        return rightNow.getTime();
	}
}
