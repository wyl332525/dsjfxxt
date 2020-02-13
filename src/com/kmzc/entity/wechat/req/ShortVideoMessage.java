package com.kmzc.entity.wechat.req;
/** 
 * С��Ƶ��Ϣ 
 *  
 * @author baixg 
 * @date 2016-08-12 
 */  
public class ShortVideoMessage extends BaseMessage {
	private String Meliald;
	private String ThumbMediaId;
	public String getMeliald() {
		return Meliald;
	}
	public void setMeliald(String meliald) {
		Meliald = meliald;
	}
	public String getThumbMediaId() {
		return ThumbMediaId;
	}
	public void setThumbMediaId(String thumbMediaId) {
		ThumbMediaId = thumbMediaId;
	}
}
