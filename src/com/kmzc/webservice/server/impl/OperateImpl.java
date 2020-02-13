package com.kmzc.webservice.server.impl;

import java.util.List;
import java.util.Map;

import javax.jws.WebService;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.kmzc.webservice.server.iface.OperateIface;

import net.sf.json.JSONObject;

@WebService()
public class OperateImpl implements OperateIface {
	@Override
	public String getData(String type,String datas) {
	
		return null;
	}

	@Override
	public String setData(String type,String datas) {
		return null;
	}
}
