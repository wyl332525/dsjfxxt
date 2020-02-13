package com.kmzc.websocket.server;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;

@ServerEndpoint("/chat")
public class ChatWebsocket {
	private static Logger log=Logger.getLogger(ChatWebsocket.class);
	private static ConcurrentMap<String,Session> wsMap=new ConcurrentHashMap<String,Session>();
	@OnOpen
    public void start(Session session) {//有新来的客户端连接
		String userId=session.getQueryString();
		if(userId!=null && !"".equals(userId)){
			//先将该session保存起来
			wsMap.put(userId, session);
			//然后向该session发送消息
		}
		
    }

    @OnClose
    public void end(Session session) {
    	wsMap.remove(session.getPathParameters().get("userId"));
    }

    @OnMessage
    public void incoming(Session session,String message) {
       try {
    	   sendXx(session,"你发给服务器的信息是："+message);
		} catch (Exception e) {
			e.printStackTrace();
		}
    }

    @OnError
    public void onError(Throwable t) throws Throwable {
        log.error("Chat Error: " + t.toString(), t);
    }
   /**
    * 
    * @param userId
    * @param info
    * @return true 表示发送成功
    * 功能描述:向该用户发送信息
    * 
    * @date 2017-1-5 下午2:41:59
    */
    public static boolean sendXx(String userId,String info){
    	Session session=wsMap.get(userId);
    	boolean flag=sendXx(session,info);
    	return flag;
    }
    /**
     * 
     * @param session
     * @param info
     * @return true 表示发送成功
     * 功能描述: 向该session发送信息
     * 
     * @date 2017-1-5 下午2:41:55
     */
    public static boolean sendXx(Session session,String info){
    	boolean flag=true;
    	if(session!=null){
    		try {
    			session.getBasicRemote().sendText(info);
    		} catch (IOException e) {
    			flag=false;
    			log.error("Chat Error: " + e.getMessage(), e);
    		}
    	}else{
    		flag=false;
    	}
    	return flag;
    }
}
