package com.kmzc.controller.common;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.kmzc.redis.service.RedisOperService;

import net.sf.json.JSONArray;

@Controller
@RequestMapping("/redis")
@Scope(value="prototype")
public class QueryDataCacheController {
	private static Logger log=Logger.getLogger(QueryDataCacheController.class);
	@Resource
	private RedisOperService redisService;
	
	/**
	 * 根据键从redis缓存中获取数据
	 * 返回结果json串:{'result':'0','errorInfo':'没有找与该键相符的值','cache':'{'123':'123'}'}
	 * @param key
	 */
	@RequestMapping("/getCache")
	public void getCacheByKey(@RequestParam("key") String key,HttpServletRequest request,HttpServletResponse response){
		JSONObject json = new JSONObject();
		String errorInfo = "";	//错误信息
		String result = "0";	//状态码  1 没有取到缓存  0  取到缓存
		String value = "";
		try{
			//判断从前台传来的键值是否为空
			if(key!=null && !key.equals("")){
				//调用redis业务类
				value = redisService.getValue(key);
				if(value!=null && value!=""){
					result = "1";
				}else{
					errorInfo+="通过该键值无法取到缓存数据！";
					result = "0";
					log.error("通过该键值无法取到缓存数据！");
				}
			}else{
				errorInfo+="键值为空，无法进行缓存的读取！";
				result = "0";
				log.error("键值为空，无法进行缓存的读取！");
			}
			
			JSONArray array = JSONArray.fromObject(value);
			json.accumulate("result", result);
			json.accumulate("errorInfo","");
			json.accumulate("cache", array);
			
			//输出到前台
			response.setContentType("application/html;charset=UTF-8");
			response.getWriter().print(json.toString());
		}catch(Exception e){
			log.error(e.getMessage(),e);
		}
		
	}

}
