package com.kmzc.security.authentication;

import org.springframework.security.core.AuthenticationException;

public class LoginAuthenticationException extends AuthenticationException {

	/**
	 * 作用：
	 */
	private static final long serialVersionUID = 2585934196831306739L;

	public LoginAuthenticationException(String msg) {
		super(msg);
	}

}
