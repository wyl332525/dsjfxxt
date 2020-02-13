/**
 * 
 */
package com.kmzc.security.validatecode;

import org.springframework.security.core.AuthenticationException;

/**
 * 描述：验证码验证异常
 * 
 * 2018年4月25日 下午2:06:09
 */
public class ValidateCodeException extends AuthenticationException {

	private static final long serialVersionUID = -7285211528095468156L;

	public ValidateCodeException(String msg) {
		super(msg);
	}

}
