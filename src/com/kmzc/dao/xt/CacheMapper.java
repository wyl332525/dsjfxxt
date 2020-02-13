package com.kmzc.dao.xt;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface CacheMapper {

	/**
	 * 获取所有的需要缓存的代码表
	 */
	
	public List<Map<String,Object>> getAllCacheTable();
	
	public List<Map<String,Object>> getCodeCache(@Param(value="tablename")String tablename);
}