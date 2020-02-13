package com.kmzc.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
	/**
	 * 描述：
	 * @param date     日期基数，就是需要加减的日期
	 * @param numDays 日期加减，负数是减，正数是加
	 * @return 加减之后的日期
	 *
	 * 
	 * 2018年3月27日 下午1:56:21
	 */
	public static Date dateAddDays(Date date,int numDays){
		Calendar rightNow = Calendar.getInstance();
        rightNow.setTime(date);
        rightNow.add(Calendar.DAY_OF_YEAR,numDays);//日期加减，负数是减，正数是加
        return rightNow.getTime();
	}
	
	/**
	 * 
	 * @param date
	 * @param sdf
	 * @return
	 * 功能描述:格式化一个日期
	 * 
	 * @date 2018年3月27日 下午1:58:21
	 */
	public static String formatDate(Date date,String sdf){
		return new SimpleDateFormat(sdf).format(date);
	}
	/**
	 * 
	 * @param date
	 * @param sdf
	 * @return
	 * 功能描述:将字符串格式化为一个日期
	 * 
	 * @throws ParseException 
	 * @date 2018年3月27日 下午1:58:21
	 */
	public static Date parseDate(String dateStr,String sdf) throws ParseException{
		return new SimpleDateFormat(sdf).parse(dateStr);
	}
}
