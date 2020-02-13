package com.kmzc.websocket.config;

import java.util.Set;

import javax.websocket.Endpoint;
import javax.websocket.server.ServerApplicationConfig;
import javax.websocket.server.ServerEndpointConfig;
/**
 * 
 * 功能描述:配置websocket启动，只用实现ServerApplicationConfig这个接口就可以了
 * 
 * @date 2016-8-23 上午9:58:47
 */
public class WebsocketMainConfig implements ServerApplicationConfig {

	@Override
	public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> endPoints) {
		System.out.println("getAnnotatedEndpointClasses "+endPoints.size());
		return endPoints;
	}

	@Override
	public Set<ServerEndpointConfig> getEndpointConfigs(
			Set<Class<? extends Endpoint>> endPoints) {
		System.out.println("getEndpointConfigs "+endPoints.size());
		return null;
	}

}
