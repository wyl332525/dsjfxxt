package com.kmzc.entity.wechat.req;

/** 
 * @author baixg 
 * @date 2016-08-12 
 */  
public class ImageMessage extends BaseMessage {
    private String PicUrl;  
    private String MediaId;
  
    public String getPicUrl() {  
        return PicUrl;  
    }  
  
    public void setPicUrl(String picUrl) {  
        PicUrl = picUrl;  
    }

	public String getMediaId() {
		return MediaId;
	}

	public void setMediaId(String mediaId) {
		MediaId = mediaId;
	} 
}
