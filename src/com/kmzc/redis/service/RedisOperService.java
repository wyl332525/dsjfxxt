package com.kmzc.redis.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.kmzc.mapper.redis.RedisListDao;
/**
 * redis 业务类
 * @author 80487
 *
 */
@Service
public class RedisOperService {
	@Resource
	private RedisListDao redisOper;
	
	public String getValue(String key){
		return redisOper.getCache(key);
	}
	
	public void saveToCache(String key,String value){
		redisOper.addCache(key, value);
	}
	
	public void saveToCache(String key,List<Map<String,Object>> value){
		redisOper.addCache(key, value);
	}
	
	public void flushCacheByKey(String key){
		redisOper.clearCache(key);
	}
	
	public void flushCache(){
		redisOper.clearAllCache();
	}
}
