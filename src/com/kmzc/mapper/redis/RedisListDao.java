package com.kmzc.mapper.redis;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

/**
 * redis  值类型操作
 * @author 80487
 *
 */


public interface RedisListDao {
	
	//获取缓存中的结果集
	public String getCache(String key);
	
	//增加查询的结果集到缓存
	public void addCache(String key,List<Map<String,Object>> value);

	
	public void addCache(String key,String value);
	
	//清除缓存数据
	public void clearCache(String key);
	
	//清除所有缓存
	public void clearAllCache();
}
