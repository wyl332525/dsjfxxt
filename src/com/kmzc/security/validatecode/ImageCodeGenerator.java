package com.kmzc.security.validatecode;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;

import com.kmzc.cache.SecurityConfig;

public class ImageCodeGenerator {
	private static Logger logger=Logger.getLogger(ImageCodeGenerator.class);
	/**
	 * 描述：根据参数 生成验证码图片
	 * @param session HttpSession
	 * @param width 验证码图片的宽度
	 * @param height 验证码图片的高度
	 * @param length 验证码的长度
	 * @param expire 验证码有效时间 单位是秒
	 * @param type 验证码中是否包含数字字母汉字，0纯数字，1纯字母，2数字和字母组合，3纯汉字，4数字字母汉字组合
	 * @return
	 *
	 * 
	 * 2018年4月25日 下午12:04:44
	 */
	public static BufferedImage generate(HttpSession session,int width,int height,int length,int expire,int fontSize,String type) {
		BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
		Graphics g = image.getGraphics();
		Random random = new Random();
		//产生干扰背景
		g.setColor(getRandColor(200, 250));
		g.fillRect(0, 0, width, height);
		g.setFont(new Font("Times New Roman", Font.ITALIC, 20));
		g.setColor(getRandColor(160, 200));
		for (int i = 0; i < 155; i++) {
			int x = random.nextInt(width);
			int y = random.nextInt(height);
			int xl = random.nextInt(12);
			int yl = random.nextInt(12);
			g.drawLine(x, y, x + xl, y + yl);
		}
		String numCode="0123456789";//数字
		String wordCode="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";//字母
		String chinese="********************";//用于处理生成汉字
		String useCode=numCode;
		if("0".equals(type)){
			useCode=numCode;
		}else if("1".equals(type)){
			useCode=wordCode;
		}else if("2".equals(type)){
			useCode=numCode+wordCode;
		}else if("3".equals(type)){
			useCode=chinese;
		}else if("4".equals(type)){
			useCode=numCode+wordCode+chinese;
		}
		String sRand = "";
		String rand="";
		for (int i = 0; i < length; i++) {
			rand = String.valueOf(useCode.charAt(random.nextInt(useCode.length())));
			if("*".equals(rand)){
				rand=getRandomChar();
			}
			sRand += rand;
		}
		
		Font f = new Font("宋体", Font.ITALIC, fontSize);    
		FontMetrics fm = sun.font.FontDesignMetrics.getMetrics(f);  
		int sWidth=fm.stringWidth(sRand); //整个字符串的宽度 
		int sHeight=fm.getHeight(); //字符的高度     
		int space=0;//每个字符的间隔
		//首先计算出y值
		int y=(height-sHeight)/2+sHeight-5;
		int x=(width-sWidth)/(sRand.length()+1);//第一个x的坐标
		if(x>0){
			space=x;
		}else{
			space=0;
			x=0;
		}
		g.setFont(f);
		for(int i=0;i<sRand.length();i++){
			g.setColor(new Color(20 + random.nextInt(110), 20 + random.nextInt(110), 20 + random.nextInt(110)));
			g.drawString(sRand.substring(i, i+1),fm.stringWidth(sRand.substring(0,i))+space*(i+1), y);
		}
		g.dispose();
		ImageCode imageCode=new ImageCode(sRand, expire);
		session.setAttribute(ValidateCodeProcessor.validatecodeSessionKey, imageCode);
		return image;
	}
	/**
	 * 描述：按配置文件中的配置项生成验证码图片
	 * @return
	 *
	 * 
	 * 2018年4月25日 下午12:06:29
	 */
	public static BufferedImage generate(HttpSession session) {
		int width = getConfig("validateCodeWidth",70);//默认生成的验证码图片的宽度
		int height =getConfig("validateCodeHeight",30);//默认生成的验证码图片的高度
		int length=getConfig("validateCodeLength",4);//验证码的长度
		int expire=getConfig("validateCodeExpire",60);//验证码有效时间，默认是60秒
		int fontSize=getConfig("validateCodeFontSize",20);//字体大小
		//验证码中是否包含数字小写字母大写字母汉字，0纯数字，1纯字母，2数字和字母组合，3纯汉字，4数字字母汉字组合
		String type=SecurityConfig.getConfig("validateCodeType", "0");
		
		return generate(session,width,height,length,expire,fontSize,type);
	}
	/**
	 * 描述：从配置文件中加载配置
	 * @param key  
	 * @param defaultValue 如果key的值不存在，或者不能转换为int则返回该值
	 * @return
	 *
	 * 
	 * 2018年4月25日 下午5:22:50
	 */
	private static int getConfig(String key,int defaultValue){
		int ret=defaultValue;
		try{
			ret=Integer.valueOf(SecurityConfig.getConfig(key));
		}catch(Exception e){
			logger.error("生成验证码图片时加载默认配置("+key+")出现异常："+e.getMessage()+"采用默认值："+ret,e);
		}
		return ret;
	}
	/**
	 * 生成随机背景条纹
	 */
	private static Color getRandColor(int fc, int bc) {
		Random random = new Random();
		if (fc > 255) {
			fc = 255;
		}
		if (bc > 255) {
			bc = 255;
		}
		int r = fc + random.nextInt(bc - fc);
		int g = fc + random.nextInt(bc - fc);
		int b = fc + random.nextInt(bc - fc);
		return new Color(r, g, b);
	}
	/**
	 * 描述：随机生成常见的汉字
	 */
	private static String getRandomChar() {
        String str = "";
        int hightPos; 
        int lowPos;

        Random random = new Random();

        hightPos = (176 + Math.abs(random.nextInt(39)));
        lowPos = (161 + Math.abs(random.nextInt(93)));

        byte[] b = new byte[2];
        b[0] = (Integer.valueOf(hightPos)).byteValue();
        b[1] = (Integer.valueOf(lowPos)).byteValue();

        try {
            str = new String(b, "GBK");
        } catch (UnsupportedEncodingException e) {
        	logger.error("汉字生成出现异常："+e.getMessage(),e);
        }

        return str;
    }
}
