package com.kmzc.utils;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.kmzc.entity.wechat.pojo.JsConfig;

public class JsSignUtil {
	
	public static JsConfig createSignBySha1(String url) {
		//首先获取jsTicket
		String jsapi_ticket = WechatUtils.getJsapiTicket().getTicket();
		System.out.println("获取jsticket是:"+jsapi_ticket);
		//获取noncestr(随机字符串)
		String noncestr = getNonceStr();
		//获取timestamp
		String timestamp = getTimestamp();
		//获取URL ，需要传入
		
        StringBuffer sb = new StringBuffer();
        sb.append("jsapi_ticket=").append(jsapi_ticket)
        .append("&noncestr=").append(noncestr)
        .append("&timestamp=").append(timestamp)
        .append("&url=").append(url);
        
        System.out.println("获取signature的字符串是："+sb.toString());
        MessageDigest md = null;  
        String signature = null;  
        try {  
            md = MessageDigest.getInstance("SHA-1");  
            byte[] digest = md.digest(sb.toString().getBytes());  
            signature = SignUtil.byteToStr(digest);  
        } catch (NoSuchAlgorithmException e) {  
            e.printStackTrace();  
        }  
        
        JsConfig jc = new JsConfig();
        jc.setNoncestr(noncestr);
        jc.setTimestamp(Long.valueOf(timestamp));
        jc.setSignature(signature);
        System.out.println("noncestr是："+noncestr);
        System.out.println("timestamp是："+timestamp);
        System.out.println("signature是："+signature);
        return jc;
    }

	
    /**
     * 获取时间戳(秒)
     */
    public static String getTimestamp() {
        return String.valueOf(System.currentTimeMillis() / 1000);
    }

    /** 
     * 取出一个指定长度大小的随机正整数. 
     * @param length 
     *            int 设定所取出随机数的长度。length小于11 
     * @return int 返回生成的随机数。 
     */  
    public static int buildRandom(int length) {  
        int num = 1;  
        double random = Math.random();  
        if (random < 0.1) {  
            random = random + 0.1;  
        }  
        for (int i = 0; i < length; i++) {  
            num = num * 10;  
        }  
        return (int) ((random * num));  
    }  

    /** 
     * 获取当前时间 yyyyMMddHHmmss 
     */  
    public static String getCurrTime() {  
        Date now = new Date();  
        SimpleDateFormat outFormat = new SimpleDateFormat("yyyyMMddHHmmss");  
        String s = outFormat.format(now);  
        return s;  
    }  

    /**
     * 生成随机字符串
     */ 
    public static String getNonceStr() {
        String currTime = getCurrTime();  
        String strTime = currTime.substring(8, currTime.length());  
        String strRandom = buildRandom(4) + "";  
        return strTime + strRandom;
	}
}
