package com.kmzc.mapper.redis;

import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class RedisListDaoImpl implements RedisListDao{
	
	@Resource
	private RedisTemplate<String,Object> jedis;
	
	@Override
	public String getCache(String key) {
		// TODO Auto-generated method stub
		return isEmpty(jedis.opsForValue().get(key));
	}

	@Override
	public void addCache(String key, List<Map<String,Object>> value) {
		// TODO Auto-generated method stub
		jedis.opsForValue().set(key, value);
	}

	@Override
	public void addCache(String key, String value) {
		jedis.opsForValue().set(key, value);
	}
	
	@Override
	public void clearCache(String key) {
		// TODO Auto-generated method stub
		jedis.delete(key);
	}

	@Override
	public void clearAllCache() {
		// TODO Auto-generated method stub
		Set<String> keys = jedis.keys("*");
		jedis.delete(keys);
	}
	
	/*将对象转化为字符串*/
	public String isEmpty(Object obj){
		return obj!=null?obj.toString():"";
	}

}
