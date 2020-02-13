package com.kmzc.security.csrf;

import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

import com.kmzc.cache.SecurityConfig;
/**
 * 描述：提供CSRF（跨站请求伪造）保护地址匹配
 * 启用用csrf则需要添加令牌
 * 		form提交：<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
 * 		ajax提交：beforeSend:function(xhr){xhr.setRequestHeader("${_csrf.headerName}", "${_csrf.token}");}
 * 
 * 2018年4月26日 下午5:02:22
 */
@Component
public class MapuniCsrfRequestMatcher implements RequestMatcher{
	//需要保护的地址
	private static Set<String> urlSet=new HashSet<String>();
	//需要保护的方法，默认有POST
	private static Set<String> methodSet=new HashSet<String>();
	static{
		String urlString=SecurityConfig.getConfig("csrfProtectionUrls","");
		if (StringUtils.isNotBlank(urlString)) {
			String[] urls = StringUtils.splitByWholeSeparatorPreserveAllTokens(urlString, ",");
			for (String url : urls) {
				urlSet.add(url);
			}
		}
		
		String methodString=SecurityConfig.getConfig("csrfProtectionMethod","");
		if (StringUtils.isNotBlank(methodString)) {
			String[] methods = StringUtils.splitByWholeSeparatorPreserveAllTokens(methodString, ",");
			for (String method : methods) {
				methodSet.add(method.toUpperCase());
			}
		}
		//如果为空，则默认增加post
		if(methodSet.isEmpty()){
			methodSet.add("POST");
		}
	}
	@Override
	public boolean matches(HttpServletRequest request) {
		AntPathMatcher pathMatcher = new AntPathMatcher();
		boolean result = false;
			//请求的uri，需要把开头的ContextPath去掉
		String reqUrl=request.getRequestURI().substring(request.getContextPath().length());
		String reqMethod=request.getMethod().toUpperCase();
		if(methodSet.contains(reqMethod)){
			for (String url : urlSet) {
				if (pathMatcher.match(url,reqUrl)) {
					result=true;
					break;
				}
			}
		}
		return result;
	}

}
