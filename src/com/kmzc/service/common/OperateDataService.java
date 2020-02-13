package com.kmzc.service.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.apache.ibatis.session.SqlSession;

@Transactional
@Service
/**
 * 描述：具体执行sql语句的服务
 * 
 * 2018年4月8日 下午5:49:55
 */
public class OperateDataService {
	@Autowired
	private SqlSession sqlSession;
	/**
	 * 描述：在同一个事务中，一次执行多个sql语句
	 * @param sqlKeys sql语句的数组
	 * @param args    对应sql语句的参数
	 * @return
	 *
	 * 
	 * 2018年4月8日 下午5:50:23
	 */
	public List<Integer> operateSqls(String[] sqlKeys,List<Map<String,Object>> args){
		List<Integer> result=new ArrayList<Integer>();
		for(int i=0;i<sqlKeys.length;i++){
			//sqlSession的delete、insert和update方法，在底层实现是一样的，因此不论是增、删、改都调用update方法即可
			if(args.get(i).isEmpty()){
				result.add(i,sqlSession.update(sqlKeys[i]));
			}else{
				result.add(i,sqlSession.update(sqlKeys[i],args.get(i)));
			}
		}
		return result;
	}
	/**
	 * 描述：执行一个sql语句
	 * @param sqlKeys sql语句
	 * @param args    对应sql语句的参数
	 * @return
	 *
	 * 
	 * 2018年4月8日 下午5:51:14
	 */
	public Integer operateSql(String sqlKey,Map<String,Object> args){
		Integer result=-1;
		//sqlSession的delete、insert和update方法，在底层实现是一样的，因此不论是增、删、改都调用update方法即可
		if(args==null || args.isEmpty()){
			result=sqlSession.update(sqlKey);
		}else{
			result=sqlSession.update(sqlKey, args);
		}
		return result;
	}
}
