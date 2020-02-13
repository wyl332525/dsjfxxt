package com.kmzc.entity.wechat.req;

/**
 * @author baixg
 * @date 2016-08-12
 */
public class VoiceMessage extends BaseMessage {
    private String MediaId;  
    private String Format;  
  
    public String getMediaId() {  
        return MediaId;  
    }  
  
    public void setMediaId(String mediaId) {  
        MediaId = mediaId;  
    }  
  
    public String getFormat() {  
        return Format;  
    }  
  
    public void setFormat(String format) {  
        Format = format;  
    }
}
