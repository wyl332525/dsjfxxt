package com.kmzc.security.token;
/**
 * 描述：采用token登录认证方式的实体类
 * 
 * 2018年5月13日 下午4:26:30
 */
public class TokenPojo {
	//登录的url地址
	private String loginUrl;
	//是否验证设备id或是应用ID
	private boolean isCheckInvokeId;
	//登录成功后token的有效时间，单位是秒
	private int tokenValidTime;
	//调用者设备ID或应用ID的参数名称
	private String invokeArgName="sbid";
	//登录成功后可以访问的资源，多个用逗号隔开
	private String accessUrls;
	//token的参数名称
	private String tokenArgName="token";
	//登录时用户名的参数名称
	private String loginUserName="userName";
	//登录时用户密码的参数名称
	private String passwordName="password";
	//应用的类型
	private String type="";
	public String getLoginUrl() {
		return loginUrl;
	}
	public void setLoginUrl(String loginUrl) {
		this.loginUrl = loginUrl;
	}
	
	public boolean isCheckInvokeId() {
		return isCheckInvokeId;
	}
	public void setCheckInvokeId(boolean isCheckInvokeId) {
		this.isCheckInvokeId = isCheckInvokeId;
	}
	public int getTokenValidTime() {
		return tokenValidTime;
	}
	public void setTokenValidTime(int tokenValidTime) {
		this.tokenValidTime = tokenValidTime;
	}
	public String getInvokeArgName() {
		return invokeArgName;
	}
	public void setInvokeArgName(String invokeArgName) {
		this.invokeArgName = invokeArgName;
	}
	public String getAccessUrls() {
		return accessUrls;
	}
	public void setAccessUrls(String accessUrls) {
		this.accessUrls = accessUrls;
	}
	public String getTokenArgName() {
		return tokenArgName;
	}
	public void setTokenArgName(String tokenArgName) {
		this.tokenArgName = tokenArgName;
	}
	public String getLoginUserName() {
		return loginUserName;
	}
	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}
	
	public String getPasswordName() {
		return passwordName;
	}
	public void setPasswordName(String passwordName) {
		this.passwordName = passwordName;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
}
