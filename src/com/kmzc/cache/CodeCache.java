package com.kmzc.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.session.SqlSession;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.kmzc.dao.xt.CacheMapper;

/**
 * 描述：缓存系统代码表
 * @author baixg
 */
@Component
public class CodeCache implements Cache{
	private static Map<String,List<Map<String,Object>>> codes=new HashMap<String,List<Map<String,Object>>>();

	/** 
	 * 描述：重新加载数据到内存中，如果相关数据有改变，则需要执行该静态方法重新初始化。
	 * 
	 */
	public void init(){
		if("myself".equalsIgnoreCase(StaticVar.cacheType)){
//			initCodes();
//			initCodeBySql();
		}else if("redis".equalsIgnoreCase(StaticVar.cacheType)){
			//采用redis缓存
		}
		//System.out.println(codes.toString());
	}
	/**
	 * 
	 * @param tName
	 * @return
	 * 功能描述: 根据一个表名，将缓存的数据返回
	 * @author baixg
	 * @date 
	 */
	public static List<Map<String,Object>> getCode(String tName){
		return codes.get(tName);
	}
	/**
	 * 
	 * @param tName
	 * @param isLoad  为true如果不在缓存中则，先将数据查询出缓存到数据库中
	 * @return
	 * 功能描述: 根据一个表名，将缓存的数据返回,如果isLoad为true，则表示，如果不在缓存中，就去数据库查询
	 * 
	 * @date 2017-1-6 下午3:51:16
	 */
	public static List<Map<String,Object>> getCode(String tName,boolean isLoad){
		if(!codes.containsKey(tName)){
			initCode(tName);
		}
		return getCode(tName);
	}
	/**
	 * 
	 * @param tName  表名
	 * @param pkidV  主键值
	 * @param colums 需要返回的列名
	 * @return
	 * 功能描述: 根据主键值返回需要查找的列名（colums）的值，如果不存在 在返回空
	 * 
	 * @date 2016-12-15 下午2:55:15
	 */
	public static Object getCodeColum(String tName,String pkidV,String colum){
		Object ret=null;
		List<Map<String,Object>> list=codes.get(tName);
		if(list==null){
			return null;
		}else{
			for(Map<String,Object> m:list){
				if(pkidV.equals(m.get("pkid"))){
					ret=m.get(colum);
					break;
				}
			}
		}
		return ret;
	}
	
	/**
	 * 
	 * 
	 * 功能描述: 初始化所有表，并缓存在内存中
	 * 
	 * @date 2016-12-15 下午2:56:53
	 */
	public static void initCodes(){
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		List<Map<String,Object>> lists = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getAllCacheTable");
		for(Map<String,Object> m:lists){
			initCode(m.get("pkid").toString());
		}
	}
	/**
	 * 
	 * @param tName
	 * 功能描述:  根据一个表名，将该表的内容缓存在内存中
	 * 
	 * @date 2016-12-15 下午2:57:30
	 */
	public static void initCode(String tName){
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		List<Map<String,Object>> codeList = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getCodeCache",tName);
		List<Map<String,Object>> newList = new ArrayList<Map<String,Object>>();
		for(Map<String,Object> m : codeList){
			Map<String,Object> newMap = transformUpperCase(m);
			newList.add(newMap);
		}
		codes.put(tName.toLowerCase(), newList);
	}
	
	
	//处理map里面的key转换为小写
	public static Map<String, Object> transformUpperCase(Map<String, Object> orgMap){
        Map<String, Object> resultMap = new HashMap<>();
        if (orgMap == null || orgMap.isEmpty()){
            return resultMap;
        }
        Set<String> keySet = orgMap.keySet();
        for(String key : keySet){
            String newKey = key.toLowerCase();
            //newKey = newKey.replace("_", "");
            resultMap.put(newKey, orgMap.get(key));
        }
        return resultMap;
	}
	
	/**
	 * 
	 * @param tName
	 * 功能描述:  根据sql语句，将该语句的内容缓存在内存中(未带参数的sql语句) sql语句写在mapper中，
	 * mapper配置到数据库dm_gy_hcdmb表，flag为2
	 * 
	 * @author baixg
	 * @date 2018-6-13
	 */
	public static void initCodeBySql(){
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		List<Map<String,Object>> lists = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper.getAllCacheMapper");
		for(Map<String,Object> m:lists){
			String pkid = m.get("pkid").toString();
			List<Map<String,Object>> mapperList = sqlSession.selectList("com.kmzc.dao.xt.CacheMapper."+pkid);
			codes.put(pkid, mapperList);
		}
	}
}
