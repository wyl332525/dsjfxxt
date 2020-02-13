package com.kmzc.security.validatecode;

import java.io.Serializable;
/**
 * 描述：图片验证码对象，包含生成的图片，图片上面的字符，和有效期限
 * 
 * 2018年4月25日 下午1:16:33
 */
public class ImageCode implements Serializable{
	/**
	 * 作用：
	 */
	private static final long serialVersionUID = 5100521205403513880L;
	private String validatecode;
	private long expireTime;
	public ImageCode(String validatecode, int expire) {
		this.validatecode=validatecode;
		expireTime=System.currentTimeMillis()+expire*1000;
	}
	/**
	 * 描述：判断该验证码是否已经过期，返回true表示过期，否则不过期
	 * @return
	 *
	 * 
	 * 2018年4月25日 下午2:11:54
	 */
	public boolean isExpried(){
		return expireTime<System.currentTimeMillis();
	}
	
	public String getValidatecode() {
		return validatecode;
	}
	public void setValidatecode(String validatecode) {
		this.validatecode = validatecode;
	}
	public long getExpireTime() {
		return expireTime;
	}
	public void setExpireTime(long expireTime) {
		this.expireTime = expireTime;
	}
}
