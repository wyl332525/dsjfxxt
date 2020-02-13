package com.kmzc.controller.common;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
/**
 * 描述：获取图片数据，并返回到前端
 * 
 * 2018年4月2日 下午5:14:15
 */
@Controller
@RequestMapping("/getimg")
@Scope("prototype")
public class GetViewImgController {
	@RequestMapping("/getViewImg")
	public void execute(HttpServletResponse response,@RequestParam(value="imgPath") String imgPath){
		File imgFile=new File(imgPath);
		if(imgFile.exists()){//如果图片存在就返回图片资源
			response.setContentType("image/jpeg");
			FileInputStream fis=null;
			try {
				fis=new FileInputStream(imgFile);
				ServletOutputStream out=response.getOutputStream();
				byte[] content=new byte[2048];
				while(fis.read(content)>0){
					out.write(content);
				}
				out.flush();
				out.close();
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				if(fis!=null){
					try {
						fis.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
	}
}
