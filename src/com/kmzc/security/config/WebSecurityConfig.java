package com.kmzc.security.config;

import javax.sql.DataSource;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.security.authentication.MapuniAuthenticationFailureHandler;
import com.kmzc.security.authentication.MapuniAuthenticationSuccessHandler;
import com.kmzc.security.authentication.RememberMeAuthenticationSuccessHandler;
import com.kmzc.security.authorization.AuthorizeConfigManager;
import com.kmzc.security.csrf.MapuniCsrfRequestMatcher;
import com.kmzc.security.logout.LogoutFilter;
import com.kmzc.security.logout.ZcInvalidSessionStrategy;
import com.kmzc.security.logout.ZcLogoutSuccesHandler;
import com.kmzc.security.logout.ZcSessionExpiredStrategy;
import com.kmzc.security.token.app.AppSecurityFilter;
import com.kmzc.security.token.app.WgcySecurityFilter;
import com.kmzc.security.token.webservice.WebserviceSecurityFilter;
import com.kmzc.security.token.wechat.WechatSecurityFilter;
import com.kmzc.security.user.ZcUserDetialsService;
import com.kmzc.security.validatecode.ValidateCodeFilter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	ZcUserDetialsService kmzcUserDetialsService;
	@Autowired
	MapuniAuthenticationSuccessHandler kmzcAuthenticationSuccessHandler;
	@Autowired
	MapuniAuthenticationFailureHandler kmzcAuthenticationFailureHandler;
	@Autowired
	private DataSource dataSource;
	@Autowired
	ValidateCodeFilter validateCodeFilter;
	@Autowired
	WechatSecurityFilter wechatSecurityFilter;
	@Autowired
	WebserviceSecurityFilter webserviceSecurityFilter;
	@Autowired
	AppSecurityFilter appSecurityFilter;
	@Autowired
	WgcySecurityFilter wgcySecurityFilter;
	@Autowired
	LogoutFilter logoutFilter;
	@Autowired
	MapuniCsrfRequestMatcher kmzcCsrfRequestMatcher;
	@Autowired
	AuthorizeConfigManager authorizeConfigManager;
	@Autowired
	ZcLogoutSuccesHandler kmzcLogoutSuccesHandler;
	@Autowired
	SessionRegistry sessionRegistry;
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.addFilterBefore(wechatSecurityFilter, UsernamePasswordAuthenticationFilter.class)//添加app的登录和资源权限处理过滤器
		//.addFilterBefore(wgcySecurityFilter, UsernamePasswordAuthenticationFilter.class)//添加外观查的登录和资源权限处理过滤器
		//.addFilterBefore(webserviceSecurityFilter, AppSecurityFilter.class)//添加webservice的登录和资源权限处理过滤器
		//.addFilterBefore(wechatSecurityFilter, WebserviceSecurityFilter.class)//添加wechat的登录和资源权限处理过滤器
		.addFilterBefore(validateCodeFilter, WechatSecurityFilter.class)//在验证用户名密码filter之前增加验证码验证的filter
		.addFilterBefore(logoutFilter, WechatSecurityFilter.class)//添加 用户退出过滤器，用来处理用户退出
		.formLogin()//登录配置
			.loginPage(SecurityConfig.getConfig("loginPage"))//自定义的登录页面
			.successHandler(kmzcAuthenticationSuccessHandler)//登录成功的自己实现的处理器
			.failureHandler(kmzcAuthenticationFailureHandler)//登录失败的处理器
			.and()
		.headers()//配置只允许同源的iframe
			.frameOptions()
			.sameOrigin()
			.and();
		if("1".equals(SecurityConfig.getConfig("userLoginSingle","1"))){
			if("1".equals(SecurityConfig.getConfig("userLoginSingleType","1"))){
				http.sessionManagement().invalidSessionStrategy(new ZcInvalidSessionStrategy())
					.maximumSessions(1).expiredSessionStrategy(new ZcSessionExpiredStrategy())
					.sessionRegistry(sessionRegistry);
			}else{
				http.sessionManagement().invalidSessionStrategy(new ZcInvalidSessionStrategy())
					.maximumSessions(1).maxSessionsPreventsLogin(true).sessionRegistry(sessionRegistry);
			}
		}
		//启用CSRF保护
		if("1".equals(SecurityConfig.getConfig("isCsrfProtection"))){
			http.csrf().requireCsrfProtectionMatcher(kmzcCsrfRequestMatcher);
		}else{//不启用CSRF保护
			http.csrf().disable();
		}
		
		//如果启用了 记住我功能 ，则进行相关初始化
		if("1".equals(SecurityConfig.getConfig("isRememberMe"))){
			/**创建表语句：
			 * CREATE TABLE persistent_logins (username VARCHAR(64) NOT NULL,
								series VARCHAR(64) PRIMARY KEY,
								token VARCHAR(64) NOT NULL,
								last_used TIMESTAMP NOT NULL)
			 */
			http.rememberMe()//启用记住我功能
				.tokenRepository(persistentTokenRepository())//令牌存储机制，这里使用的数据库存储
				.authenticationSuccessHandler(new RememberMeAuthenticationSuccessHandler())
				.tokenValiditySeconds(SecurityConfig.getConfig("rememberMeTime",7,Integer.class)*86400)//令牌有效的时间，将配置的天数转换成秒
				.userDetailsService(kmzcUserDetialsService);//设置用户service
		}else{//如果不 启用 记住我 功能，则清空数据库中的数据
			try{//因为有可能表不存在，没有创建，因此try起来，出了问题不用处理即可
				((JdbcTokenRepositoryImpl)persistentTokenRepository()).getJdbcTemplate().execute("delete from persistent_logins");
			}catch(Exception e){}
		}
		//处理授权内容
		authorizeConfigManager.config(http.authorizeRequests());
		super.configure(http);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		super.configure(web);
	}
	
	/**
	 * 这里需要提供UserDetailsService的原因是RememberMeServices需要用到
	 * @return
	 */
	@Override
	protected UserDetailsService userDetailsService() {
		return kmzcUserDetialsService;
	}
	/**
	 * 描述：记住我的token的存储方式，目前采用的是数据库存储
	 * @return
	 * 
	 * 2018年4月26日 下午2:54:24
	 */
	private PersistentTokenRepository persistentTokenRepository(){
		JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
		tokenRepository.setDataSource(dataSource);
		return tokenRepository;
	}
	
	@Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
