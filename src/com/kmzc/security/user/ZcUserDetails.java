package com.kmzc.security.user;

import java.util.Collection;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.kmzc.cache.SecurityConfig;
import com.kmzc.cache.StaticVar;
import com.kmzc.security.authentication.LoginAuthenticationException;

public class ZcUserDetails implements UserDetails {
	/**
	 * 作用：
	 */
	private static final long serialVersionUID = 1L;
	private String userId;
	private String userShowName;
	private String ssjg;
	private String yhlx;
	private String sfgly;
	private String yhmm;
	//以下3个属性赋值，是在MapuniAuthenticationSuccessHandler中的saveLogin2db方法中
	private String ip;//登录电脑ip，在登录成功后通过setter赋值
	private HttpSession httpSession;//登录的httpSession，在登录成功后通过setter赋值
	private String loginTime;//登录时间，在登录成功后通过setter赋值
	private SqlSession sqlSession;
	private Map<String,Object> userInfo;
	public ZcUserDetails(String userId){
		this.userId=userId;
		sqlSession=StaticVar.sqlSessionFactory.openSession(true);
		userInfo=sqlSession.selectOne("com.kmzc.dao.xt.YhJsCdMapper.selectUserById", userId);
		if(userInfo!=null){
			this.ssjg=userInfo.get("ssjg").toString();
			this.yhlx=userInfo.get("yhlx").toString();
			this.userShowName=userInfo.get("yhmc").toString();
			this.setSfgly(userInfo.get("sfgly").toString());
			this.yhmm=userInfo.get("yhmm").toString();
		}
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getPassword() {
		//String p=new MapuniPasswordEncoder().encode("123456"); 
		return yhmm;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		if(userInfo==null){//验证用户是否存在
			throw new LoginAuthenticationException("该用户不存在");
		}
		//下面是验证用户是否被锁定，是否还可以进行登录
		int num=SecurityConfig.getConfig("loginErrNum",4,Integer.class);//允许连续尝试输入密码的次数，超过该次数账号将被锁定一段时间
		int time=SecurityConfig.getConfig("loginErrTime",30,Integer.class)*60*1000;//账号一旦被锁定时 锁定的时间，从分钟转换为毫秒
		Object errNumObj=userInfo.get("dllxsbcs");//登录连续失败次数
		int errs=0;//已经登录失败的次数
		if(errNumObj!=null){
			errs=(int)userInfo.get("dllxsbcs");//登录连续失败次数
		}
		if(num<errs){
			Object lastTimeObj=userInfo.get("zhycdlsj");//最后一次登录时间 OBJECT
			Date lastTime=null;//最后一次登录时间
			if(lastTimeObj!=null){
				lastTime=(Date)lastTimeObj;
			}else{
				lastTime=new Date();
			}
			long jgsj=System.currentTimeMillis()-lastTime.getTime();//上次登录时间，距离现在的间隔时间
			if(jgsj<time){
				throw new LoginAuthenticationException("您已经连续输错密码达到 "+num+" 次，该账号已经被锁定，请 "+((time-jgsj)/1000/60+1)+" 分钟后在进行尝试。");
			}
		}
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	@Override
	public String getUsername() {
		
		return userId;
	}
	
	public String getUserShowName() {
		return userShowName;
	}

	public void setUserShowName(String userShowName) {
		this.userShowName = userShowName;
	}

	public String getSsjg() {
		return ssjg;
	}

	public void setSsjg(String ssjg) {
		this.ssjg = ssjg;
	}

	public String getYhlx() {
		return yhlx;
	}

	public void setYhlx(String yhlx) {
		this.yhlx = yhlx;
	}
	
	
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public HttpSession getHttpSession() {
		return httpSession;
	}

	public void setHttpSession(HttpSession httpSession) {
		this.httpSession = httpSession;
	}

	public String getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public Map<String, Object> getUserInfo() {
		return userInfo;
	}

	public void setUserInfo(Map<String, Object> userInfo) {
		this.userInfo = userInfo;
	}

	@Override
    public String toString() {
        return this.userId;
    }

    @Override
    public int hashCode() {
        return userId.hashCode();
    }
    
	@Override
    public boolean equals(Object obj) {
        return this.toString().equals(obj.toString());
    }
	/**
	 * 描述：获取当前登录的用户ID
	 * @return
	 *
	 * 
	 * 2018年5月23日 上午10:14:07
	 */
	public static String getCurrentUserId(){
		Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
		String userId="";
		if(authentication!=null){
			Object principal = authentication.getPrincipal();
			if (principal instanceof UserDetails) {
				userId= ((UserDetails)principal).getUsername();
			} else {
				userId = principal.toString();
			}
		}
		return userId;
	}
	/**
	 * 描述：获取当前登录的用户对象
	 * @return
	 *
	 * 
	 * 2018年5月23日 上午10:14:26
	 */
	public static UserDetails getCurrentUser(){
		Authentication authentication =SecurityContextHolder.getContext().getAuthentication();
		UserDetails user=null;
		if(authentication!=null){
			Object principal = authentication.getPrincipal();
			if (principal instanceof UserDetails) {
				user = (UserDetails)principal;
			}else{
				user = new ZcUserDetails(principal.toString());
			}
		}	
		return user;
	}
	/**
	 * 描述：返回当前登录的Authentication对象
	 * @return
	 *
	 * 
	 * 2018年5月23日 上午10:17:44
	 */
	public static Authentication getCurrentAuthentication(){
		return SecurityContextHolder.getContext().getAuthentication();
	}

	public String getSfgly() {
		return sfgly;
	}

	public void setSfgly(String sfgly) {
		this.sfgly = sfgly;
	}
}
