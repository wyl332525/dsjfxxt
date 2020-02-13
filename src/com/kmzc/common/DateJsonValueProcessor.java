package com.kmzc.common;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;
/**
 * 描述：json处理Date类型的实现
 * 
 * 2018年4月4日 下午5:14:53
 */
public class DateJsonValueProcessor implements JsonValueProcessor {
	private String format ="yyyy-MM-dd hh:mm:ss";
	public  DateJsonValueProcessor(){
		super();
	}
	public DateJsonValueProcessor(String format){
		super();
		this.format=format;
	}
	@Override
	public Object processArrayValue(Object paramObject, JsonConfig paramJsonConfig) {
		return process(paramObject);
	}

	@Override
	public Object processObjectValue(String paramString, Object paramObject, JsonConfig paramJsonConfig) {
		return process(paramObject);
	}

	 private Object process(Object value){  
	        if(value instanceof Date){    
	            SimpleDateFormat sdf = new SimpleDateFormat(format,Locale.CHINA);    
	            return sdf.format(value);  
	        }    
	        return value == null ? "" : value.toString();    
	 }  
}
