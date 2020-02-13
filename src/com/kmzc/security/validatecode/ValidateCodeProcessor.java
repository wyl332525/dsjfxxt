package com.kmzc.security.validatecode;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;

import com.kmzc.cache.SecurityConfig;


public class ValidateCodeProcessor {
	//保存在session中的图片的key
	public static final String validatecodeSessionKey="validatecodeSessionImage";
	private HttpSession session;

	public void validate(HttpServletRequest request) {
		session=request.getSession();
		ImageCode icode=(ImageCode)session.getAttribute(validatecodeSessionKey);
		if(icode==null){
			throw new ValidateCodeException("验证码不存在或是已经过期");
		}
		
		String codeInRequest=request.getParameter(SecurityConfig.getConfig("validateCodeName","validateCode"));//得到输入的验证码
		
		if (StringUtils.isBlank(codeInRequest)) {
			throw new ValidateCodeException("验证码的值不能为空");
		}

		if (icode.isExpried()) {
			session.removeAttribute(validatecodeSessionKey);
			throw new ValidateCodeException("验证码已过期");
		}
		//如果validateCodeType有3或4说明需要有中文，然后对请求的授权码进行转码操作
		if("34".indexOf(SecurityConfig.getConfig("validateCodeType"))>=0){
			try {
				codeInRequest=new String(codeInRequest.getBytes("ISO8859-1"),"UTF-8");
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		if (!icode.getValidatecode().equalsIgnoreCase(codeInRequest)) {
			throw new ValidateCodeException("验证码不匹配");
		}

		session.removeAttribute(validatecodeSessionKey);
	}
}
