package com.kmzc.controller.common;

import java.io.PrintWriter;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.service.common.DataGridService;
import com.kmzc.utils.DbUtils;

@Controller
@RequestMapping("/dg")
public class DataGridController {
	Logger log=Logger.getLogger(DataGridController.class);
	@Autowired
	private DataGridService service;
	/**
	 * 描述：处理datagrid查询的controller
	 * @param request
	 * @param response
	 * 返回值的json格式为：
	 * {"total":240,"rows":[
	 * 		{"fr":"任予以","lxrdh":"22222222","lxr":"万维网"},
	 * 		{"fr":"","lxrdh":"13600326756","lxr":"赵文波"},
	 * 		{"fr":"张XX","lxrdh":"26606199","lxr":"张才海"}
	 * 	  ]
	 * }
	 * 
	 * 2018年4月9日 下午2:41:29
	 */
	@RequestMapping("/getData")
	public void getDataByParam(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> params=DbUtils.getArgs(request);
		String sqlKey=(String)params.get("sqlKey");//sql语句key（namespace+“。”+<select>标签的id）com.kmzc.entity.test.XtyhPojo.countYh
		@SuppressWarnings("unchecked")
		Map<String,Object> args=(Map<String, Object>) params.get("args");//sql的参数	
		if(sqlKey==null){
			log.error("sqlKey参数为空，无法查询！");
			return;
		}
		try {
			response.setContentType("application/json;charset=UTF-8");
			PrintWriter pw=response.getWriter();
			pw.print(service.getJsonDatas(sqlKey, args));
			pw.flush();
			pw.close();
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}
}
