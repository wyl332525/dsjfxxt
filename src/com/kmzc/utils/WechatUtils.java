package com.kmzc.utils;

import org.apache.log4j.Logger;

import com.kmzc.cache.Config;
import com.kmzc.entity.wechat.pojo.AccessToken;
import com.kmzc.entity.wechat.pojo.HtmlAccessToken;
import com.kmzc.entity.wechat.pojo.JsapiTicket;
import com.kmzc.entity.wechat.pojo.MiniAccessToken;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;  
import java.io.InputStreamReader;  
import java.io.OutputStream;  
import java.io.UnsupportedEncodingException;
import java.net.ConnectException;  
import java.net.URL;  
  
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import javax.net.ssl.HttpsURLConnection;  
import javax.net.ssl.SSLContext;  
import javax.net.ssl.SSLSocketFactory;  
import javax.net.ssl.TrustManager;  


import net.sf.json.JSONException;
import net.sf.json.JSONObject;  

public class WechatUtils {
	private static Logger logger =Logger.getLogger(WechatUtils.class);  
	public final static String appId = Config.getConfig("AppId");
	public final static String appSecret = Config.getConfig("AppSecret");
	public final static String miniAppId = Config.getConfig("MiniAppId");
	public final static String miniAppSecret = Config.getConfig("MiniAppSecret");
	// 获取access_token的接口地址（GET） 限1000（次/天）  
	public final static String access_token_url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=SECRET";  
    public final static String access_token_html = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code";
    public final static String get_ticket_url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
	private static AccessToken actoken;
	private static MiniAccessToken minitoken;
	private static JsapiTicket jsapiTicket;
	private static long expires;
	private static long ticketTime;
    /** 
     * 发起https请求并获取结果 
     *  
     * @param requestUrl 请求地址 
     * @param requestMethod 请求方式（GET、POST） 
     * @param outputStr 提交的数据 
     * @return JSONObject(通过JSONObject.get(key)的方式获取json对象的属性值) 
     */  
    public static JSONObject httpRequest(String requestUrl, String requestMethod, String outputStr) {  
        JSONObject jsonObject = null;  
        StringBuffer buffer = new StringBuffer();  
        try {  
            // 创建SSLContext对象，并使用我们指定的信任管理器初始化  
            TrustManager[] tm = { new MyX509TrustManager() };  
            SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");  
            sslContext.init(null, tm, new java.security.SecureRandom());  
            // 从上述SSLContext对象中得到SSLSocketFactory对象  
            SSLSocketFactory ssf = sslContext.getSocketFactory();  
  
            URL url = new URL(requestUrl);  
            HttpsURLConnection httpUrlConn = (HttpsURLConnection) url.openConnection();  
            httpUrlConn.setSSLSocketFactory(ssf);  
  
            httpUrlConn.setDoOutput(true);  
            httpUrlConn.setDoInput(true);  
            httpUrlConn.setUseCaches(false);  
            // 设置请求方式（GET/POST）  
            httpUrlConn.setRequestMethod(requestMethod);  
  
            if ("GET".equalsIgnoreCase(requestMethod))  
                httpUrlConn.connect();  
  
            // 当有数据需要提交时  
            if (null != outputStr) {  
                OutputStream outputStream = httpUrlConn.getOutputStream();  
                // 注意编码格式，防止中文乱码  
                outputStream.write(outputStr.getBytes("UTF-8"));  
                outputStream.close();  
            }  
  
            // 将返回的输入流转换成字符串  
            InputStream inputStream = httpUrlConn.getInputStream();  
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");  
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);  
  
            String str = null;  
            while ((str = bufferedReader.readLine()) != null) {  
                buffer.append(str);  
            }  
            bufferedReader.close();  
            inputStreamReader.close();  
            // 释放资源  
            inputStream.close();  
            inputStream = null;  
            httpUrlConn.disconnect();  
            jsonObject = JSONObject.fromObject(buffer.toString());  
        } catch (ConnectException ce) {  
            logger.error("Weixin server connection timed out.");  
        } catch (Exception e) {  
        	logger.error("https request error:{}", e);  
        }  
        return jsonObject;  
    }
    
    public static AccessToken getAccessToken(){
    	long now = System.currentTimeMillis();
    	long lasttime = now - expires;
    	//expires是第一次，lasttime小于0指的是token已经超期
    	if(expires == 0  || lasttime >= 7200000){
            actoken = getAccessTokenOnce();
    	}
    	System.out.println("现在实时的Token是："+actoken.getToken());
		return actoken;
    }
    
    public static MiniAccessToken getMiniAccessToken(){
    	long now = System.currentTimeMillis();
    	long lasttime = now - expires;
    	//expires是第一次，lasttime小于0指的是token已经超期
    	if(expires == 0  || lasttime >= 7200000){
    		minitoken = getMiniAccessTokenOnce();
    	}
    	System.out.println("现在实时的小程序Token是："+minitoken.getToken());
		return minitoken;
    }
    
    //获取缓存的js ticket
    public static JsapiTicket getJsapiTicket(){
    	long now = System.currentTimeMillis();
    	long lasttime = now - ticketTime;
    	//expires是第一次，lasttime小于0指的是token已经超期
    	if(ticketTime == 0  || lasttime >= 7200000){
    		jsapiTicket = getJsapiTicketOnce();
    	}
		return jsapiTicket;
    }
    /** 
     * 获取access_token （基础秘钥）
     *  
     * @param appid 凭证 
     * @param appsecret 密钥 
     * @return 
     */  
    public static AccessToken getAccessTokenOnce() {  
        AccessToken accessToken = null;  
        String requestUrl = access_token_url;
        requestUrl  = requestUrl.replace("APPID", appId).replace("SECRET", appSecret);
        System.out.println("获取token的Url是："+requestUrl);
        JSONObject jsonObject = httpRequest(requestUrl, "GET", null);  
        // 如果请求成功  
        if (null != jsonObject) {  
            try {  
                accessToken = new AccessToken();  
                accessToken.setToken(jsonObject.getString("access_token"));  
                accessToken.setExpiresIn(jsonObject.getInt("expires_in"));  
                expires = System.currentTimeMillis();
            } catch (JSONException e) {  
                accessToken = null;  
                // 获取token失败  
                logger.error("获取token失败 errcode:{} errmsg:{}"+jsonObject.getInt("errcode")+jsonObject.getString("errmsg"));  
            }  
        }  
        return accessToken;  
    }
    
    /** 
     * 获取access_token （基础秘钥）
     *  
     * @param appid 凭证 
     * @param appsecret 密钥 
     * @return 
     */  
    public static MiniAccessToken getMiniAccessTokenOnce() {  
        MiniAccessToken accessToken = null;  
        String requestUrl = access_token_url;
        requestUrl  = requestUrl.replace("APPID", miniAppId).replace("SECRET", miniAppSecret);
        System.out.println("获取token的Url是："+requestUrl);
        JSONObject jsonObject = httpRequest(requestUrl, "GET", null);  
        // 如果请求成功  
        if (null != jsonObject) {  
            try {  
                accessToken = new MiniAccessToken();  
                accessToken.setToken(jsonObject.getString("access_token"));  
                accessToken.setExpiresIn(jsonObject.getInt("expires_in"));  
                expires = System.currentTimeMillis();
            } catch (JSONException e) {  
                accessToken = null;  
                // 获取token失败  
                logger.error("获取token失败 errcode:{} errmsg:{}"+jsonObject.getInt("errcode")+jsonObject.getString("errmsg"));  
            }  
        }  
        return accessToken;  
    }
    
    //获取js调用票据ticket
    public static JsapiTicket getJsapiTicketOnce() { 
    	JsapiTicket ticket = null;
        String requestUrl = get_ticket_url;
        String token = getAccessToken().getToken();
        System.out.println("Token是："+token);
        //"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi";
        requestUrl  = requestUrl.replace("ACCESS_TOKEN", token);
        System.out.println("获取JsTicket的Url是："+requestUrl);
        JSONObject jsonObject = httpRequest(requestUrl, "GET", null);  
        // 如果请求成功  
        if (null != jsonObject) {  
            try {  
            	ticket = new JsapiTicket();
            	ticket.setTicket(jsonObject.getString("ticket"));
            	ticket.setExpires_in(jsonObject.getString("expires_in"));
            	ticketTime = System.currentTimeMillis();
            } catch (JSONException e) {  
                // 获取token失败  
                logger.error("获取token失败 errcode:{} errmsg:{}"+jsonObject.getInt("errcode")+jsonObject.getString("errmsg"));  
            }  
        }  
        return ticket;  
    }
    
    //获取微信网页授权AccessToken
    public static HtmlAccessToken getHtmlAccessToken(String code) {  
    	HtmlAccessToken accessToken = null;  
        String requestUrl = access_token_html;
        requestUrl = requestUrl.replace("APPID", appId).replace("SECRET", appSecret).replace("CODE", code);  
        System.out.println(requestUrl);
        JSONObject jsonObject = httpRequest(requestUrl, "GET", null);  
        // 如果请求成功  
        if (null != jsonObject) {  
            try {  
                accessToken = new HtmlAccessToken();  
                accessToken.setToken(jsonObject.getString("access_token"));  
                accessToken.setExpiresIn(jsonObject.getInt("expires_in"));
                accessToken.setRefresh_token(jsonObject.getString("refresh_token"));
                accessToken.setOpenid(jsonObject.getString("openid"));
                accessToken.setScope(jsonObject.getString("scope"));
            } catch (JSONException e) {  
                accessToken = null;  
                // 获取token失败  
                logger.error("获取token失败 errcode:{} errmsg:{}"+jsonObject.getString("errcode")+jsonObject.getString("errmsg"));  
            }  
        }  
        return accessToken;  
    }
    
    public static String getEncodeHtml(String redirect_uri,String state){
    	String url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    	url = url.replace("APPID", appId);
    	try {
    		redirect_uri = URLEncoder.encode(redirect_uri,"utf-8");
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	url = url.replace("REDIRECT_URI", redirect_uri);
    	url = url.replace("STATE", state);
    	return url;
    }
    
    public static File getFile(String requestUrl) throws Exception {  
        //String path=System.getProperty("user.dir")+"/img//1.png";
        // 创建SSLContext对象，并使用我们指定的信任管理器初始化  
        TrustManager[] tm = { new MyX509TrustManager() };  
        SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");  
        sslContext.init(null, tm, new java.security.SecureRandom());  
        // 从上述SSLContext对象中得到SSLSocketFactory对象  
        SSLSocketFactory ssf = sslContext.getSocketFactory();  

        URL url = new URL(requestUrl);  
        HttpsURLConnection httpUrlConn = (HttpsURLConnection) url.openConnection();  
        httpUrlConn.setSSLSocketFactory(ssf);  

        httpUrlConn.setDoOutput(true);  
        httpUrlConn.setDoInput(true);  
        httpUrlConn.setUseCaches(false);  
        // 设置请求方式（GET/POST）  
        httpUrlConn.setRequestMethod("GET");  

        httpUrlConn.connect();  

        //获取文件扩展名
        System.out.println(httpUrlConn.getContentType());
        String ext = getExt(httpUrlConn.getContentType());
        String saveRoot = Config.getConfig("FileSaveRoot");
		if(!saveRoot.endsWith("/")){
			saveRoot += "/";
		}
		File f = new File(saveRoot);
		if(!f.exists())f.mkdirs();
		String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        String savePath = saveRoot + uuid + ext;
        System.out.println("savePath"+savePath);
        //下载文件到f文件
        File file = new File(savePath);
        // 获取微信返回的输入流
        InputStream in = httpUrlConn.getInputStream(); 
        //输出流，将微信返回的输入流内容写到文件中
        FileOutputStream out = new FileOutputStream(file);
        int length=100*1024;
        byte[] byteBuffer = new byte[length]; //存储文件内容
        int byteread =0;
        int bytesum=0;
        while (( byteread=in.read(byteBuffer)) != -1) {  
            bytesum += byteread; //字节数 文件大小 
            out.write(byteBuffer,0,byteread);  
        }  
        System.out.println("字节数: "+bytesum);
        in.close();  
        // 释放资源  
        out.close();  
        in = null;  
        out=null;
        httpUrlConn.disconnect();  
        return file;
    }
    
    private static String getExt(String contentType){
        if("image/jpeg".equals(contentType)){
            return ".jpg";
        }else if("image/jpg".equals(contentType)){
            return ".jpg";
        }else if("image/png".equals(contentType)){
            return ".png";
        }else if("image/gif".equals(contentType)){
            return ".gif";
        }
        
        return null;
    }
}
