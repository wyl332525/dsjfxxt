package com.kmzc.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

/**
 * 
 * 功能描述:得到数据库里面的系统配置值
 */
@Component
public class SysConfigCache implements Cache{
	private static Logger log=Logger.getLogger(SysConfigCache.class);
	private static Map<String,String> sysConfig1 = new HashMap<String,String>();
	private static Map<String,String> sysConfig2 = new HashMap<String,String>();
	private static Map<String,String> sysConfig3 = new HashMap<String,String>();
	private static Map<String,String> sysConfig4 = new HashMap<String,String>();
	private static Map<String, HashMap<String, String>> jczpzMap = new HashMap<String,HashMap<String,String>>();
	@Override
	public void init() {
		if("myself".equalsIgnoreCase(StaticVar.cacheType)){
			SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
			List<Map<String,Object>> configs = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getSysConfigCache");
			if(configs!=null && configs.size()>0){
				String key="";
				for(Map<String,Object> m:configs){
					key=(String)m.get("PKID");
					sysConfig1.put(key, m.get("CS1").toString());
					Object config2=m.get("CS2");
					sysConfig2.put(key, config2==null?"":config2.toString());
					Object config3=m.get("CS3");
					sysConfig3.put(key, config3==null?"":config3.toString());
					Object config4=m.get("CS4");
					sysConfig4.put(key, config4==null?"":config4.toString());
				}
			}else{
				log.error("没有加载到配置的系统参数，请确实是否没有进行配置！！！");
			}
			
			
		}else if("redis".equalsIgnoreCase(StaticVar.cacheType)){
			//采用redis缓存
		}
	}
	
	/**
	 * @param key
	 * @return
	 * 功能描述:得到该系统参数的第一个配置值
	 * 
	 * @date 2016-7-22 下午3:02:47
	 */
	public static String getSysConfig1(String key){
		return sysConfig1.get(key);
	}
	/**
	 * @param key
	 * @return
	 * 功能描述: 得到该系统参数的第二个配置值
	 * 
	 * @date 2016-7-22 下午3:03:20
	 */
	public static String getSysConfig2(String key){
		return sysConfig2.get(key);
	}
	/**
	 * 
	 * @param key
	 * @return
	 * 功能描述:得到该系统参数的第3个配置值
	 * 
	 * @date 2016-11-30 下午1:29:56
	 */
	public static String getSysConfig3(String key){
		return sysConfig3.get(key);
	}
	/**
	 * 
	 * @param key
	 * @return
	 * 功能描述:得到该系统参数的第4个配置值
	 * 
	 * @date 2016-11-30 下午1:30:00
	 */
	public static String getSysConfig4(String key){
		return sysConfig4.get(key);
	}
	
	public static HashMap<String,String> getjczpzMap(String key){
		return jczpzMap.get(key);
	}
	
	public static void reloadSysConfig(){
		sysConfig1.clear();
		sysConfig2.clear();
		sysConfig3.clear();
		sysConfig4.clear();
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		List<Map<String, Object>> configs = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getSysConfigCache");
		if(configs!=null && configs.size()>0){
			String key="";
			for(Map<String,Object> m:configs){
				key=(String)m.get("PKID");
				sysConfig1.put(key, m.get("CS1").toString());
				Object config2=m.get("CS2");
				sysConfig2.put(key, config2==null?"":config2.toString());
				Object config3=m.get("CS3");
				sysConfig3.put(key, config3==null?"":config3.toString());
				Object config4=m.get("CS4");
				sysConfig4.put(key, config4==null?"":config4.toString());
			}
		}else{
			log.error("没有加载到配置的系统参数，请确实是否没有进行配置！！！");
		}
	}
	
}
