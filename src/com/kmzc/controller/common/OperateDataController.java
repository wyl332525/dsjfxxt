package com.kmzc.controller.common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.kmzc.service.common.OperateDataService;
import com.kmzc.utils.DbUtils;

import net.sf.json.JSONArray;

/**
 * 描述：功能描述:通用的操作数据库controller
 * 
 * 2018年4月8日 上午11:43:40
 */
@Controller
@RequestMapping("/db")
@Scope(value="prototype")
public class OperateDataController {

	private static Logger log=Logger.getLogger(OperateDataController.class);
	@Autowired
	private OperateDataService service;
	
	@RequestMapping("/operSql")
	/**
	 * 描述：执行单条sql语句，返回执行成功的条数
	 * @param request
	 * @param response
	 * @return 返回结果json字符串：{err:"错误信息，如果执行成功则为空",result:执行成功的条数}
	 * 
	 * 2018年4月8日 上午11:44:10
	 * 
	 * $.ajax({
				url:rootPath+"/db/operSql.do",
				data:{
						sqlKey:"test_insert",
						paramX:"String#congif1"
					},
					async:false,type:"post",
				success:function(data){	
					$.messager.alert("执行成功条数：",data);
				},
				error:function(data){
					$.messager.alert("错误提示：","操作时出现未知错误！！");
				}
			});
	 */
	public void operBySql(HttpServletRequest request,HttpServletResponse response){
		Map<String,Object> params=DbUtils.getArgs(request);
		String sqlKey=(String)params.get("sqlKey");//sql语句key（namespace+“。”+<select>标签的id）com.kmzc.entity.test.XtyhPojo.countYh
		@SuppressWarnings("unchecked")
		Map<String,Object> args=(Map<String, Object>) params.get("args");//sql的参数		
		String err="";
		Integer result=-1;
		if(sqlKey!=null && !"".equals(sqlKey)){
			try{
				result=service.operateSql(sqlKey, args);
			}catch(Exception e){
				err="执行操作失败："+e.getMessage();
				log.error(err,e);
			}
		}else{
			err="参数“sqlKey”为空，无法执行！";
			log.error("参数“sqlKey”为空，无法执行！");
		}
			response.setContentType("text/html;charset=UTF-8");
		try {
			response.getWriter().print("{\"err\":\""+err+"\",\"result\":"+result+"}");
		} catch (IOException e) {
			log.error(e.getMessage(),e);
		}
	}
	/**
	 * 描述：在同一个事务中，执行多条sql语句
	 * @return 返回结果json字符串：{err:"错误信息，如果执行成功则为空",result:[每个sql操作的条数，如果执行失败则为空的字符串]}
	 * @param request
	 * @param response
	 *
	 * 
	 * 2018年4月8日 上午11:45:07
	 * 
	 * 注意sqlKey必须有，多个sql中间用逗号隔开
	 * sql参数的key（也就是参数名）的格式为：key$sql的顺序号，省略$num表示是第1个sql语句的参数,例如：name$2:"lxl",表示是第2个sql语句的参数name的值为lxl
	 * $.ajax({
				url:rootPath+"/db/operSqls.do",
				data:{
					sql:"TEST_DEL,Test_update",//表示执行2条sql语句
						id$1:"5",    //第1个sql语句的参数id是5
						name:"String#lxl",  //省略$num表示是第1个sql语句的参数name是lxl
						id$2:"int#6",    //第2个sql语句的参数id是整型的6
						name$2:"zf"  //第2个sql语句的name是zf
					},
					async:false,type:"post",
				success:function(data){	
					$.messager.alert("执行结果：",data);
				},
				error:function(data){
					$.messager.alert("错误提示：","操作时出现未知错误！！");
				}
			});
	 */
	@RequestMapping("/operSqls")
	public void oparBySqls(HttpServletRequest request,HttpServletResponse response){
		String sqlKey=request.getParameter("sqlKey");
		String err="";
		List<Integer> result=null;
		if(sqlKey!=null && !"".equals(sqlKey)){
			String[] sqlKeys=sqlKey.split(",");
			List<Map<String,Object>> args=dealParams(request,sqlKeys.length);
			try{
				result=service.operateSqls(sqlKeys, args);
			}catch(Exception e){
				err="执行语句错误："+e.getMessage();
				log.error(err,e);
			}
		
		}else{
			err="参数“sqlKey”为空，无法执行！";
			log.error("参数“configName”或“sql”为空，查询失败！");
		}
		
		response.setContentType("application/html;charset=UTF-8");
		try {
			response.getWriter().print("{\"err\":\""+err+"\",\"result\":"+(result==null?"[]":JSONArray.fromObject(result))+"}");
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
	}
	/**
	 * 描述：处理sql的参数
	 * @param request  HttpServletRequest
	 * @param num      sql语句的条数
	 * @return         按sql的顺序返回sql对应的参数
	 *
	 * 
	 * 2018年4月8日 上午11:40:14
	 */
	private static List<Map<String,Object>> dealParams(HttpServletRequest request,int num){
		Enumeration<String> params=request.getParameterNames();
		List<Map<String,Object>> args=new ArrayList<Map<String,Object>>();//处理后返回的结果，也就是sql对应的参数
		for(int i=0;i<num;i++){//初始化各个sql语句对应的参数
			args.add(new HashMap<String,Object>());
		}
		while(params.hasMoreElements()){
			String p=params.nextElement();
			String v=request.getParameter(p);
			if(!"sqlKey".equals(p)){
				String[] temps=v.split("#",2);//只分为两个，也就是 只按第一个#分割
				String[] keys=p.split("\\$");//参数名的格式是：key#顺序号，如果没有顺序号，默认就是滴1个sql语句的参数
				int index=0;
				if(keys.length>1){
					index=Integer.valueOf(keys[1])-1;
				}
				if(temps.length==2){
					args.get(index).put(keys[0], DbUtils.dealArgs(temps[0],temps[1]));
				}else{//否则默认就是字符串
					args.get(index).put(keys[0],v);
				}
			}
		}
		return args;
	}
}
