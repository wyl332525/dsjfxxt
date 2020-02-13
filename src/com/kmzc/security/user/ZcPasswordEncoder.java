package com.kmzc.security.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.kmzc.security.authentication.LoginAuthenticationException;
import com.kmzc.utils.Base64Util;
/**
 * 描述：字符串加解密（用于用户登录密码），采用spring Security 的BCryptPasswordEncoder进行加密，同一个字符串加密的密文是不一样的
 * 注意会自动起效果，不需要其他配置
 * 
 * 2018年4月23日 上午10:48:57
 */
@Component
public class ZcPasswordEncoder implements PasswordEncoder {
	/**
	 * 加密
	 */
	@Override
	public String encode(CharSequence password) {
		return new BCryptPasswordEncoder().encode(password);
	}
	/**
	 * 进行密码匹配，匹配成功返回true，否则返回false
	 */
	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		String ysmm=rawPassword.toString();
		try{
			ysmm=Base64Util.decode(ysmm);//原始密码
		}catch(Exception e){
			throw new LoginAuthenticationException("密码解密时出现异常");
		}
		return new BCryptPasswordEncoder().matches(ysmm, encodedPassword);
	}

}
