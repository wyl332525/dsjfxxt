package com.kmzc.utils;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageInfo;
import com.kmzc.common.DateJsonValueProcessor;

import net.sf.json.JSONArray;
import net.sf.json.JsonConfig;
/**
 * 描述：处理数据库操作相关的工具类
 * 
 * 2018年4月8日 上午10:27:18
 */
public class DbUtils {
	private static Logger log=Logger.getLogger(DbUtils.class);
	/**
	 * 描述：处理共用查询、操作数据库的sql及相关参数
	 * @param request
	 * @return 返回是一个map，其中sqlKey表示的是一个sql语句的key，args表示该sql语句的参数
	 *
	 * 
	 * 2018年4月4日 上午10:27:45
	 */
	public static Map<String,Object> getArgs(HttpServletRequest request){
		Enumeration<String> params=request.getParameterNames();
		Map<String,Object> ret=new HashMap<String,Object>();//处理后返回的结果
		String sqlKey="";//sql语句key（namespace+“。”+<select>标签的id）com.kmzc.entity.test.XtyhPojo.countYh
		Map<String,Object> args=new HashMap<String,Object>();//sql的参数
		while(params.hasMoreElements()){
			String p=params.nextElement();
			String v=request.getParameter(p);
			if("sqlKey".equals(p)){
				sqlKey=v;
			}else{
				String[] temps=v.split("#",2);//只分为两个，也就是 只按第一个#分割
				if(temps.length==2){
					args.put(p, dealArgs(temps[0],temps[1]));
				}else{//否则默认就是字符串
					args.put(p,v);
				}
			}
		}
		ret.put("sqlKey", sqlKey);
		ret.put("args", args);
		return ret;
	}
	/**
	 * 描述：根据对象的类型（字符串表示），将值转换为对象
	 * @param type  数据的类型
	 * @param v1             数据的字符串表示
	 * @return      转换后的数据对象
	 *
	 * 
	 * 2018年4月4日 上午10:38:21
	 */
	public static Object dealArgs(String type,String v1){
		Object ret=v1;
		try{
			if("String".equalsIgnoreCase(type)){//处理字符串，不用处理，直接赋值
				ret=v1;
			}else if("Integer".equalsIgnoreCase(type) || "int".equalsIgnoreCase(type)){//处理整型数据
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=0;
				}else{
					ret=Integer.parseInt(v1);
				}
			}else if("Double".equalsIgnoreCase(type)){//处理double的数据
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=0;
				}else{
					ret=Double.parseDouble(v1);
				}
			}else if("Date".equalsIgnoreCase(type)){ //处理日期型数据
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=null;
				}else{
					ret=DateUtils.parseDate(v1,"yyyy-MM-dd");
				}
			}else if("Datetime".equalsIgnoreCase(type)){//处理日期时间型数据
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=null;
				}else{
					ret=DateUtils.parseDate(v1,"yyyy-MM-dd HH:mm:ss");
				}
			}else if("Long".equalsIgnoreCase(type)){
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=0;
				}else{
					ret=Long.parseLong(v1);
				}
			}else if("Boolean".equalsIgnoreCase(type)){
				if(v1==null || "".equals(v1) || "null".equalsIgnoreCase(v1)){
					ret=null;
				}else{
					ret=Boolean.parseBoolean(v1);
				}
			}else{//如果type都不是以上数据类型，则说明是字符串省略了String，而字符串本身中又包含有#号，因此还原源字符串返回
				ret=type+"#"+v1;
			}
		}catch(Exception e){
			log.error("处理sql参数时出现异常："+e.getMessage(),e);
		}
		return ret;
	}
	/**
	 * 描述：将list<map>转成json格式数据
	 * 返回的数据格式：{"total":总条数,"rows":[{"a":"12","b":"22","c":"dd"},{"a":"22","b":"33","c":"ee"},{...}]},注意key都是用小写字母表示
	 * 注意如有分页，则返回格式：{"total":当前总条数,totalAll:符合条件的总数,pageNum:当前页码，pageSize:每页条数，pageAll:所有页数,"rows":[{"a":"12","b":"22","c":"dd"},{"a":"22","b":"33","c":"ee"},{...}]},注意key都是用小写字母表示
	 * 
	 * 2018年4月4日 下午1:27:34
	 */
	public static String result2json(List<Object> result){
		StringBuffer ret=new StringBuffer();
		ret.append("{\"total\":").append(result.size());
		if(result instanceof Page<?>){
			@SuppressWarnings({ "unchecked", "rawtypes" })
			PageInfo page = new PageInfo(result);
			ret.append(",\"totalAll\":").append(page.getTotal())
			   .append(",\"pageNum\":").append(page.getPageNum())
			   .append(",\"pageSize\":").append(page.getPageSize())
			   .append(",\"pageAll\":").append(page.getPages());
		}
		ret.append(",\"rows\":");
		if(result.size()>0){
			Object obj1=result.get(0);
			if(obj1 instanceof Map<?,?>){//首先看结果是否是Map形式，如果是，则按Map来处理
				ret.append("[");
				for(Object tempObj:result){
					@SuppressWarnings("unchecked")
					Map<String,Object> m=(Map<String,Object>)tempObj;
					ret.append("{");
					for(String key:m.keySet()){
						ret.append("\"").append(key.toLowerCase()).append("\":\"").append(m.get(key)).append("\",");
					}
					ret.deleteCharAt(ret.length()-1).append("},");
				}
				ret.deleteCharAt(ret.length()-1).append("]");
			}else{//如果不是Map则按照对象来处理
				//需要特殊处理一下日期
				JsonConfig jsonConfig = new JsonConfig();
				jsonConfig.registerJsonValueProcessor(java.util.Date.class, new DateJsonValueProcessor("yyyy-MM-dd HH:mm:ss"));
				ret.append(JSONArray.fromObject(result,jsonConfig));
			}
		}else{
			ret.append("[]");
		}
		ret.append("}");
		return ret.toString();
	}
}
