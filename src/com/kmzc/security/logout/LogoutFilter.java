package com.kmzc.security.logout;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.kmzc.cache.SecurityConfig;

@Component
public class LogoutFilter extends OncePerRequestFilter {
	/**
	 * 验证请求url与配置的url是否匹配的工具类
	 */
	private AntPathMatcher pathMatcher = new AntPathMatcher();
	
		@Override
		protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)throws ServletException, IOException {
			if(isLogoutUrl(request)){
				Authentication auth = SecurityContextHolder.getContext().getAuthentication(); 
				HttpSession s=request.getSession();
		        String userId="";
			    if (auth != null){    
			        s.setAttribute("logoutType", "正常退出");
			    	SecurityContextLogoutHandler securityContext=new SecurityContextLogoutHandler();
			    	securityContext.logout(request, response, auth);
			    	securityContext.setInvalidateHttpSession(true);  
			        userId=auth.getName();		
			    }  
			    response.setContentType("text/html;charset=UTF-8");
				try {
					//response.getWriter().print("登录人："+userId+"登录的sessionId："+s.getId()+"退出成功！");
					response.getWriter().print("恭喜您,"+userId+"退出成功!");
				} catch (IOException e) {
					e.printStackTrace();
				}
				return;
			}
			chain.doFilter(request, response);

		}
		
		/**
		 * 描述：判断是不是注销（退出）的url
		 * @param request
		 * @return
		 *
		 * 
		 * 2018年5月28日 下午3:14:16
		 */
		private boolean isLogoutUrl(HttpServletRequest request){
			//请求的uri，需要把开头的ContextPath去掉
			String reqUrl=request.getRequestURI().substring(request.getContextPath().length());
			return pathMatcher.match(SecurityConfig.getConfig("logoutPage", "/logout.do"), reqUrl);
			
		}
}
