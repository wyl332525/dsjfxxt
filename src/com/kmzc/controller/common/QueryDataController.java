package com.kmzc.controller.common;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.redis.service.RedisOperService;
import com.kmzc.utils.DbUtils;

import net.sf.json.JSONArray;

/**
 * 描述：通用的查询controller
 * 
 * 2018年4月4日 上午9:51:41
 */
@Controller
@RequestMapping("/db")
@Scope(value="prototype")
public class QueryDataController {
	private static Logger log=Logger.getLogger(QueryDataController.class);
	@Autowired
	private SqlSession sqlSession;
	
	@Resource
	private RedisOperService redisService;
	
	public QueryDataController(){}
	
	@RequestMapping("/count")
	/**
	 * @param request
	 * @param response
	 */
	public void countSql(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> params=DbUtils.getArgs(request);
		String sqlKey=(String)params.get("sqlKey");//sql语句key（namespace+“。”+<select>标签的id）com.kmzc.entity.test.XtyhPojo.countYh
		@SuppressWarnings("unchecked")
		Map<String,Object> args=(Map<String, Object>) params.get("args");//sql的参数		
		String err="";
		long result=0l;
		if(sqlKey!=null && !"".equals(sqlKey)){
			try{
				if(args.isEmpty()){
					result=sqlSession.selectOne(sqlKey);
				}else{
					result=sqlSession.selectOne(sqlKey, args);
				}
			}catch(Exception e){
				err=e.getMessage();
				log.error(e.getMessage(),e);
			}
		}else{
			err="参数“sqlKey”为空，查询失败！";
			log.error("参数“sqlKey”为空，查询失败！");
		}
		if("".equals(err)){
			response.setContentType("text/html;charset=UTF-8");
			try {
				response.getWriter().print(result);
			} catch (IOException e) {
				log.error(e.getMessage(),e);
			}
		}else{
			throw new RuntimeException(err);
		}
	}
	@RequestMapping("/query")
	/**
	 * 返回的数据格式：{"total":总条数,"rows":[{"a":"12","b":"22","c":"dd"},{"a":"22","b":"33","c":"ee"},{...}]},注意key都是用小写字母表示
	 * 注意如有分页，则返回格式：{"total":当前总条数,totalAll:符合条件的总数,pageNum:当前页码，pageSize:每页条数，pageAll:所有页数,"rows":[{"a":"12","b":"22","c":"dd"},{"a":"22","b":"33","c":"ee"},{...}]},注意key都是用小写字母表示
	 * @param request
	 * @param response
	 * 
	 * 2018年4月8日 上午10:34:58
	 */
	public void selectDatas(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> params=DbUtils.getArgs(request);
		String sqlKey=(String)params.get("sqlKey");//sql语句key（namespace+“。”+<select>标签的id）com.kmzc.entity.test.XtyhPojo.countYh
		@SuppressWarnings("unchecked")
		Map<String,Object> args=(Map<String, Object>) params.get("args");//sql的参数	
		String err="";
		List<Object> result=null;
		if(sqlKey!=null && !"".equals(sqlKey)){
			try{
				if(args.isEmpty()){
					result=sqlSession.selectList(sqlKey);
					System.out.println("list="+result);
					JSONArray array = JSONArray.fromObject(result);
					redisService.saveToCache(sqlKey, array.toString());
				}else{
					result=sqlSession.selectList(sqlKey, args);
				}
			}catch(Exception e){
				err=e.getMessage();
				log.error(e.getMessage(),e);
			}
		}else{
			err="参数“sqlKey”为空，查询失败！";
			log.error("参数“sqlKey”为空，查询失败！");
		}
		if("".equals(err)){
			response.setContentType("text/html;charset=UTF-8");
			try {
				response.getWriter().print(DbUtils.result2json(result));
			} catch (IOException e) {
				log.error(e.getMessage(),e);
			}
		}else{
			throw new RuntimeException(err);
		}
	}	
}
