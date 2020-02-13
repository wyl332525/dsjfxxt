package com.kmzc.webservice.server.iface;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

import org.springframework.context.annotation.Scope;

@Scope("prototype")
@WebService(targetNamespace="http://iface.server.webservice.kmzc.com")
@SOAPBinding(style=Style.DOCUMENT)
public interface OperateIface {
	
	@WebMethod
	public String getData(@WebParam(name="type")String type,@WebParam(name="datas")String datas);
	
	@WebMethod
	public String setData(@WebParam(name="type")String type,@WebParam(name="datas")String datas);
	
}
