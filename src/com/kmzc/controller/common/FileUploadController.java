package com.kmzc.controller.common;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
/**
 * 功能描述:文件下载
 */
@Controller
@RequestMapping("/fileUpload")
@Scope("prototype")
public class FileUploadController {
	private static Logger logger=Logger.getLogger(FileUploadController.class);
	@RequestMapping("/upload")
	public void Upload(HttpServletResponse response,@RequestParam(value="saveRoot") String saveRoot,
			@RequestParam(value = "fileUploadName") MultipartFile... fileUploadName){
		StringBuffer sb=new StringBuffer();
		sb.append("[");
		if(fileUploadName.length>0){
			String root=com.kmzc.cache.Config.getConfig("uploadFileRoot");
			if(root==null || "".equals(root) ||"null".equalsIgnoreCase(root)){
				root="C:/zcptFileUpload";
				logger.error("系统没有配置上传的文件保存的根目录，默认保存在："+root+"下，请从config。properties中配置熟悉“uploadFileRoot”。");
			}
			
			if(!root.endsWith("/")){
				root+="/";
			}
			if(saveRoot==null || "".equals(saveRoot) || "null".equalsIgnoreCase(saveRoot)){
				saveRoot="commonUpload";
			}else{
				try {
					saveRoot=new String (saveRoot.getBytes("ISO-8859-1"),"UTF-8");
				} catch (UnsupportedEncodingException e) {
					e.printStackTrace();
				}
			}
			String uploadOutPut=root+saveRoot+"/"+new SimpleDateFormat("yyyy/MM/dd").format(new Date());
			File fSave=new File(uploadOutPut);
			if(!fSave.exists())fSave.mkdirs();

			for (MultipartFile f : fileUploadName) {
				if (f.getSize() > 0) {
					String uuid = UUID.randomUUID().toString();
					// 后缀名
					String subfix = f.getOriginalFilename().substring(f.getOriginalFilename().lastIndexOf(".") + 1);
					String saveFileName= uuid + "." + subfix;//保存的名称(英文)
					File targetFile = new File(fSave,saveFileName);
					String oldName=f.getOriginalFilename();
					try {
						oldName=new String (oldName.getBytes("ISO-8859-1"),"UTF-8");
					} catch (UnsupportedEncodingException e1) {
						e1.printStackTrace();
					}
					sb.append("{\"fileName\":\"").append( oldName).append("\",\"savePath\":\"")
						.append(targetFile.getAbsolutePath().replaceAll("\\\\", "/"))
						.append("\",\"size\":\"").append(Math.ceil(f.getSize()/1024d))
						.append("\",\"isSuccess\":\"");					
					try {
						f.transferTo(targetFile);
						sb.append("1\",\"errInfo\":\"\"},");
					} catch (Exception e) {
						sb.append("0\",\"errInfo\":\"").append(e.getMessage()).append("\"},");
						e.printStackTrace();
					}//写入目标文件
				}
			}
			sb.deleteCharAt(sb.length()-1).append("]");
		}else{
			sb.append("]");
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			response.getWriter().print(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 描述：获取上传进度，进度情况已经写到用户的session中，直接从session中取值就可以了
	 * @param session
	 * @param response
	 *
	 */
	@RequestMapping("getProcess")
	public void getProcess(HttpSession session,HttpServletResponse response){
		Enumeration<String> keys =session.getAttributeNames();
		while(keys.hasMoreElements()){
			String k=keys.nextElement();
			System.out.println(k+"="+session.getAttribute(k));
		}
		Object obj=session.getAttribute("uploadFileProcess");
		if(obj==null){
			obj="{}";
		}
		response.setContentType("text/html;charset=UTF-8");
		try {
			response.getWriter().print(obj.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	 
}
