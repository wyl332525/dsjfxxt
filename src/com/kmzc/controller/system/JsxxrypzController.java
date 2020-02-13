package com.kmzc.controller.system;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.cache.StaticVar;


/**
 * 
 * @author yehm
 * @data 2017-10-19
 * 接收信息人员配置
 */
@Controller
@RequestMapping("/jsxxrypz")
@Scope("prototype")
public class JsxxrypzController {
	private static Logger log=Logger.getLogger(JsxxrypzController.class);
	
	/*
	 * 查询指定角色的
	 */
	@RequestMapping("/Queryyh")
	public void Queryyh(HttpServletResponse response,HttpServletRequest request){
		SqlSession sqlSession = StaticVar.sqlSessionFactory.openSession();
		String  wh = request.getParameter("addWhere"); //获取查询条件
		if(wh !=""&& wh !=null){
		}else{
			wh="";
		}
		Map<String,Object> arg=new HashMap<String, Object>();
		arg.put("wh", wh);
		List<Map<String,Object>> lists=sqlSession.selectList("com.kmzc.dao.xt.YhJsCdMapper.getJsXxRyPz",arg);
		StringBuffer ret=new StringBuffer();
		ret.append("{\"total\":").append(lists.size()).append(",\"rows\":[");
		if(lists.size()>0){
			for(Map<String,Object> m:lists){
				ret.append("{");
				for(String key:m.keySet()){
					if(!key.equalsIgnoreCase("ROWNUM_COL")){//该字段是用来处理分页的字段，不用去处理
						ret.append("\"").append(key.toLowerCase()).append("\":\"").append(m.get(key)).append("\",");
					}
				}
				ret.deleteCharAt(ret.length()-1).append("},");
			}
			ret.deleteCharAt(ret.length()-1).append("]}");
		}else{
			ret.append("]}");
		}
	
		ret.toString();
		
		response.setContentType("application/json;charset=UTF-8");
		try {
			response.getWriter().print(ret);
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}

}
