package com.kmzc.security.token;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.user.ZcUserDetails;

import net.sf.json.JSONObject;
/**
 * 描述：配置Token登录成功处理的handler
 * 
 * 2018年5月6日 下午9:36:05
 */
public class TokenAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	private static Logger logger=Logger.getLogger(TokenAuthenticationSuccessHandler.class);
	private static ConcurrentMap<TokenPojo,ConcurrentMap <String,Map<String,Object>>> tokenInfo=
			new ConcurrentHashMap<TokenPojo,ConcurrentMap <String,Map<String,Object>>>();
	TokenPojo tokenPojo;
	ZcUserDetails userDetails;
	public TokenAuthenticationSuccessHandler(TokenPojo tokenPojo,ZcUserDetails userDetails) {
		this.tokenPojo=tokenPojo;
		this.userDetails=userDetails;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		response.setContentType("application/json;charset=UTF-8");
		Map<String,Object> token=new HashMap<String,Object>();
		token.put("token", UUID.randomUUID().toString());
		token.put("validTime", tokenPojo.getTokenValidTime());
		token.put("timestamp", System.currentTimeMillis());
		token.put("userId", userDetails.getUsername());
		if(tokenPojo.isCheckInvokeId()){
			token.put("sbid",request.getParameter(tokenPojo.getInvokeArgName()));
		}
		token.put("authentication",authentication);
		putToken(token);
		
		JSONObject json=new JSONObject();
		Map<String,String> tkInfo=new HashMap<String,String>();
		tkInfo.put("regionCode", token.get("token").toString());
		tkInfo.put("userId",userDetails.getUsername());
		tkInfo.put("userName", userDetails.getUserShowName());
		json.put("flag", "1");
		json.put("message", "登录成功");
		json.put("result", tkInfo);
		
		response.getWriter().write(json.toString());
	}

	private void putToken(Map<String,Object> tokenMap){
		ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tokenPojo);
		if(map==null){
			map=new ConcurrentHashMap <String,Map<String,Object>>();
		}else if(map.containsKey(tokenMap.get("userId"))){
			Map<String,Object> tInfo=map.get(tokenMap.get("userId"));
			if(tInfo!=null){
				map.remove(tInfo.get("token"));
			}
		}
		map.put(tokenMap.get("userId").toString(), tokenMap);
		map.put(tokenMap.get("token").toString(), tokenMap);
		tokenInfo.put(tokenPojo, map);
	}
	
	public static boolean removeToken(TokenPojo tokenPojo,String token){
		ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tokenPojo);
		if(map!=null && map.containsKey(token)){
			map.remove(tokenInfo.get(token).get("userId"));
			map.remove(token);
		}
		return true;
	}
	
	public static boolean removeToken(String token){
		for(TokenPojo tPojo:tokenInfo.keySet()){
			ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tPojo);
			if(map.containsKey(token)){
				map.remove(tokenInfo.get(token).get("userId"));
				map.remove(token);
				break;
			}
		}
		return true;
	}
	/**
	 * 描述：根据tokenPojo、token和sbid验证token是否过期
	 * @param token
	 * @param sbid
	 * @return
	 *
	 * 
	 * 2018年5月13日 下午3:13:24
	 */
	public static String checkToken(TokenPojo tokenPojo,String token,String sbid){
		if(token==null){return "令牌为空";}
		ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tokenPojo);
		if(map==null){
			return "登录类型为空";
		}
		Map<String,Object> tInfo=map.get(token);
		String ret="";
		if(tInfo!=null){//如果token相关信息存在，则进行继续判断
			//验证设备ID是否正确，配置如果不验证设备ID，或者验证设备ID通过，则继续下面验证
			if(!tokenPojo.isCheckInvokeId() || sbid.equals(tInfo.get("sbid"))){
				long timestamp=(long) tInfo.get("timestamp");//开始时间戳
				long validTime=(Integer) tInfo.get("validTime")*1000;//有效时间 毫秒
				long current=System.currentTimeMillis();//当前时间戳
				if((timestamp+validTime)>=current){//如果没有超期
					ret="";
					tInfo.put("timestamp", current);//如果没有超期则把当天时间戳赋值给开始时间戳，重新刷新token的有效时间
					SecurityContextHolder.getContext().setAuthentication((Authentication) tInfo.get("authentication"));
				}else{//如果超期，则从缓存中移除
					map.remove(token);
					map.remove(tInfo.get("userId"));
					ret="登录已超时";
				}
			}else{
				ret="设备ID和令牌不匹配";
			}
		}else{
			ret="用户未登录或登录已经超时";
		}
		return ret;
	}
	
	/**
	 * 描述：根据token和sbid验证token是否过期
	 * @param token
	 * @param sbid
	 * @return
	 *
	 * 
	 * 2018年5月13日 下午3:13:24
	 */
	public static String checkToken(String token,String sbid){
		if(token==null){return "令牌为空";}
		String ret="用户未登录或登录已经超时";
		for(TokenPojo tPojo:tokenInfo.keySet()){
			ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tPojo);
			Map<String,Object> tInfo=map.get(token);
			if(tInfo!=null){//如果token相关信息存在，则进行继续判断
				ret=checkToken(tPojo,token,sbid);
				break;
			}else{
				ret="用户未登录或登录已经超时";
			}
		}
		return ret;
	}
	/**
	 * 描述：清理已经过期的token
	 * 
	 * 2018年5月14日 上午10:33:31
	 */
	public static void clearOverdurToken(){
		for(TokenPojo tPojo:tokenInfo.keySet()){
			ConcurrentMap <String,Map<String,Object>> map=tokenInfo.get(tPojo);
			//首先利用set不能重复的特性进行去重复，然后进行遍历，因为同时又token和userId指向同一个tokenInfo
			Set<Map<String,Object>> temp=new HashSet<Map<String,Object>>();
			temp.addAll(map.values());
			for(Map<String,Object> tInfo:temp){
				long timestamp=(long) tInfo.get("timestamp");//开始时间戳
				long validTime=(Integer) tInfo.get("validTime")*1000;//有效时间 毫秒
				long current=System.currentTimeMillis();//当前时间戳
				if((timestamp+validTime)<current){//如果超期,则移除
					TokenAuthenticationSuccessHandler.removeToken((String) tInfo.get("token"));
					logger.info("类型："+tPojo.getType()+" 超时token"+tInfo.get("token")+" 用户Id"+tInfo.get("userId")+"已经清理。");
				}
			}
		}
	}
	
	static{
		//如果配置需要起到定时器，则启动定时器
		if("1".equals(SecurityConfig.getConfig("isClearOverdueToken"))){
			Timer timer=new Timer();
			long t=SecurityConfig.getConfig("appTokenValidTime", 7200, Integer.class)*1000;
			timer.schedule(
				new TimerTask(){//清理的定时任务
					@Override
					public void run() {
						clearOverdurToken();
					}
				}, t,t);
		}
	}
}

