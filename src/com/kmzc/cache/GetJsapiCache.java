package com.kmzc.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

import com.kmzc.entity.wechat.pojo.JsConfig;
import com.kmzc.entity.wechat.pojo.JsapiTicket;
import com.kmzc.utils.JsSignUtil;

/**
 * 
 * 功能描述:得到数据库里面的系统配置值
 * 
 * @date 2016-7-22 下午2:10:48
 */
@Component
public class GetJsapiCache implements Cache{
	private static Logger log=Logger.getLogger(GetJsapiCache.class);
	private static Map<String,JsConfig> jsConfigMap = new HashMap<String,JsConfig>();
	private static String urlQ = Config.getConfig("AppUrl");
	@Override
	public void init() {
		
	}
	
	/**
	 * 获取签名
	 */
	public static JsConfig getJsConfig(String key,String url){
//		JsConfig jc = null;
//		//首先看map里是否包含这个key 的签名
//		if(jsConfigMap.containsKey(key)){
//			jc = jsConfigMap.get(key);
//			long now = System.currentTimeMillis() /1000;
//	    	long lasttime = now - jc.getTimestamp();   //这里的时间戳是秒
//			//取出后看下是否过期了
//			if(lasttime >= 7200){//说明过期了，重新获取
//				jc = JsSignUtil.createSignBySha1(url);
//				jsConfigMap.put(key, jc);
//			}
//		}else{
//			//重新获取
//			jc = JsSignUtil.createSignBySha1(url);
//			jsConfigMap.put(key, jc);
//		}
		JsConfig jc = JsSignUtil.createSignBySha1(url);
		return jc;
	}
	
}
