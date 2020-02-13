package com.kmzc.security.authorization;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;

/**
 * 描述：权限访问控制
 * 
 * 2018年5月2日 上午11:45:38
 */
public interface AuthorizeCheckService {
	/**
	 * 描述：判断用户是否有访问资源的许可
	 * @param authenrication
	 * @param request
	 * @return
	 * 
	 * 2018年5月2日 上午11:54:31
	 */
	public boolean check(Authentication authenrication,HttpServletRequest request);
}
