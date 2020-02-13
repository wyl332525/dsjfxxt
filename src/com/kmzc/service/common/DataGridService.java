package com.kmzc.service.common;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kmzc.utils.DbUtils;

import net.sf.json.JSONObject;
/**
 * 描述：执行datagrid数据查询，参数处理及返回值处理
 * 
 * 2018年4月9日 下午2:35:34
 */
@Service
public class DataGridService {
	private static Logger log=Logger.getLogger(DataGridService.class);
	@Autowired
	private SqlSession sqlSession;
	/**
	 * 描述：执行datagrid数据查询，参数处理及返回值处理
	 * @param sqlKey     sql语句的key
	 * @param parameter  sql语句的参数
	 * @return           返回的json格式为：
	 * {"total":240,"rows":[
	 * 		{"fr":"任予以","lxrdh":"22222222","lxr":"万维网"},
	 * 		{"fr":"","lxrdh":"13600326756","lxr":"赵文波"},
	 * 		{"fr":"张XX","lxrdh":"26606199","lxr":"张才海"}
	 * 	  ]
	 * }
	 *
	 * 
	 * 2018年4月9日 下午2:36:34
	 */
	public String getJsonDatas(String sqlKey,Map<String,Object> parameter) {
		//处理分页参数，datagrid的分也参数是page（页码），rows（页大小），需要分别处理为pageNum和pageSize
		Integer pageInt=1;
		if(parameter.containsKey("page")){//页码
			try{
				pageInt=Integer.parseInt(parameter.get("page").toString());
			}catch(Exception e){
				log.error(e.getMessage(), e);
			}
			parameter.remove("page");//datagrid默认页码参数是page，需要去掉，修改为pageNum
		}
		parameter.put("pageNum", pageInt);
		
		Integer rowsInt=10;
		if(parameter.containsKey("rows")){//每页数量
			try{
				rowsInt=Integer.parseInt(parameter.get("rows").toString());
			}catch(Exception e){
				log.error(e.getMessage(), e);
			}
			parameter.remove("rows");//datagrid默认页码参数是rows，需要去掉，修改为pageSize
		}
		parameter.put("pageSize", rowsInt);
		
		//处理排序字段，datagrid默认排序参数为sort和order
		if(parameter.containsKey("sort")){
			String orderBy=parameter.get("sort").toString();
			parameter.remove("sort");
			if(parameter.containsKey("order")){
				orderBy+=" "+parameter.get("order");
				parameter.remove("order");
			}
			parameter.put("orderBy", orderBy);
		}
		//执行查询操作
		List<Object> result=null;
		if(parameter==null || parameter.isEmpty()){
			result=sqlSession.selectList(sqlKey);
		}else{
			result=sqlSession.selectList(sqlKey, parameter);
		}
		//处理结果集
		String resultJson=DbUtils.result2json(result);
		JSONObject json=JSONObject.fromObject(resultJson);
		if(json.containsKey("totalAll")){
			json.put("total", json.getLong("totalAll"));
			json.discard("totalAll");
		}
		if(json.containsKey("pageNum")){
			json.discard("pageNum");
		}
		if(json.containsKey("pageSize")){
			json.discard("pageSize");
		}
		if(json.containsKey("pageAll")){
			json.discard("pageAll");
		}
		
		return json.toString().replace("\"null\"", "\"\"");
	}
}
