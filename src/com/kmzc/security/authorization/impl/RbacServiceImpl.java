package com.kmzc.security.authorization.impl;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import com.kmzc.cache.YhJsCdCache;
import com.kmzc.security.authorization.AuthorizeCheckService;

@Component("rbacService")
public class RbacServiceImpl implements AuthorizeCheckService {
	private static Logger logger=Logger.getLogger(RbacServiceImpl.class);
	AntPathMatcher antPathMatcher =new AntPathMatcher();
	
	@Override
	public boolean check(Authentication authenrication,HttpServletRequest request) {
		Object principal=authenrication.getPrincipal();
		boolean permission=false;//最终的授权结果
		if(principal instanceof UserDetails){
			String userId=((UserDetails)principal).getUsername();
			Set<String> urls=YhJsCdCache.getCdUrlByYh(userId);
			String reqUrl=request.getRequestURI().substring(request.getContextPath().length());
			if("/".equals(reqUrl)){
				permission=true;
			}else{
				for(String url:urls){
					if(antPathMatcher.match(url, reqUrl)){
						permission=true;
						break;
					}
				}
			}
			if(!permission){
				logger.info("URL:"+request.getRequestURI().substring(request.getContextPath().length())+" 被拒绝访问！用户："+userId);
			}
		}
		String reqUrl = request.getRequestURI().substring(request.getContextPath().length());
		System.out.println(request.getRequestURI()+">>>>"+reqUrl+">>>>>"+permission);
		if(reqUrl.contains("wechat") || reqUrl.contains("getViewImg") || reqUrl.contains("db")){
			permission = true;
		}
		
		return permission;
	}

}
