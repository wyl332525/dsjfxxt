package com.kmzc.service.jsxx;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

//import com.kmzc.webservice.client.jczsjjk.JczSjjkIface;
//import com.kmzc.webservice.client.jczsjjk.JczSjjkImplService;
import com.kmzc.websocket.server.ChatWebsocket;

import net.sf.json.JSONObject;

@Scope("prototype")
@Service
public class JsxxService {
	public void wsTz(List<Map<String,Object>> list,String xxlb){
		Map<String,Set<String>> jczInfo=new HashMap<String,Set<String>>();

		String jczbh="";
		for(Map<String,Object> m:list){
			if("1".equals(m.get("yhlx"))){//检测站用户
				jczbh=m.get("ssjg").toString();
				if(jczInfo.containsKey(jczbh)){//已经存在的，直接向里面增加
					jczInfo.get(jczbh).add(m.get("yhid").toString());
				}else{//没有存在该检测站，则先创建，再增加
					Set<String> set=new HashSet<String>();
					set.add(m.get("yhid").toString());
					jczInfo.put(jczbh, set);
				}
			}else if("2".equals(m.get("yhlx"))){//中心端用户
				ChatWebsocket.sendXx((String)m.get("yhid"), "{\"type\":\"jsxx\",\"xxlb\":\""+xxlb+"\"}");
			}
		}
		if(!jczInfo.isEmpty()){//如果向检测站发送的信息不为空，则调用接口发送
			for(String jcz_bh:jczInfo.keySet()){
				JSONObject json=new JSONObject();
				json.accumulate("users", jczInfo.get(jcz_bh));
				json.accumulate("xxlb", xxlb);
				new WsThread(jcz_bh,json.toString()).start();
			}
		}
	}
	/**
	 * 描述：发送一个短消息通知到用户登录的浏览器端
	 * 
	 * @date 2017年8月25日 下午3:24:48
	 * @param userId	用户ID
	 * @param userType	用户类型 1检测站端 2中心端
	 * @param ssjg		所属机构，如果是检测站端用户，则表示是检测站编号
	 * @param xxlb		信息类别
	 */
	public void wsTz(String userId,String userType,String ssjg,String xxlb){
		if("2".equals(userType)){//中心端用户
			ChatWebsocket.sendXx(userId, "{\"type\":\"jsxx\",\"xxlb\":\""+xxlb+"\"}");
		}else if("1".equals(userType)){//检测站用户
			new WsThread(ssjg,"{\"users\":\"["+userId+"]\",\"xxlb\":\""+xxlb+"\"}").start();
		}
	}
	/**
	 * 描述：通过线程向检测站端发送信息
	 * 
	 * @date 2017年8月25日 下午3:14:25
	 */
	class WsThread extends Thread{
		private String jczbh;//检测站编号
		private String commond;//需要执行的命令数据，json格式
		public WsThread(String jczbh,String commond){
			this.jczbh=jczbh;
			this.commond=commond;
		}
		@Override
		public void run() {
//			JczSjjkImplService jczSjjk=new JczSjjkImplService(jczbh);
//			JczSjjkIface sjjk=jczSjjk.getJczSjjkImplPort();
//			sjjk.execute("ZxSend2JczXx", commond);
		}
	}
}
