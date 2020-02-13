package com.kmzc.security.token;

import org.springframework.security.core.AuthenticationException;

public class TokenSecurityException extends AuthenticationException {

	/**
	 * 作用：app登录和验证时可能出现的异常
	 */
	private static final long serialVersionUID = 1L;

	public TokenSecurityException(String msg) {
		super(msg);
	}

}
