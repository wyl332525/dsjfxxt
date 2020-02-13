package com.kmzc.cache;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Component;

/**
 * 描述：缓存设备ID
 * 
 * 2018年5月6日 下午10:19:27
 */
@Component
public class DevicesIdCache implements Cache{
	private static ConcurrentMap<String,Map<String,String>> sbids;
	
	/** 
	 * 描述：重新加载数据到内存中，如果相关数据有改变，则需要执行该静态方法重新初始化。
	 * 
	 * 2018年5月6日 下午10:20:26
	 */
	public void init(){/*
		if("myself".equalsIgnoreCase(StaticVar.cacheType)){
			//自己写缓存
			SqlSession sqlSession=StaticVar.sqlSessionFactory.openSession();
			List<Map<String,String>> lists=sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.selectDevicesAll");
			ConcurrentMap<String,Map<String,String>> s=new ConcurrentHashMap<String,Map<String,String>>();
			for(Map<String,String> m:lists){
				s.put(m.get("sbid"), m);
			}
			sbids=s;
		}else if("redis".equalsIgnoreCase(StaticVar.cacheType)){
			//采用redis缓存
		}
	*/}
	/**
	 * 描述：根据用户id返回用户的所有角色ID集合
	 * @param userId
	 * @return
	 * 
	 * 2018年5月2日 下午2:22:17
	 */
	public static boolean exists(String sbid){
		boolean ret=false;
		if(sbid!=null){
			if("myself".equalsIgnoreCase(StaticVar.cacheType)){
				ret=sbids.containsKey(sbid);
			}else{
				
			}
		}
		return ret;
	}
	
}
