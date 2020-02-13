package com.kmzc.common;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.FileItemFactory;
import org.apache.commons.fileupload.FileUpload;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
/**
 * 描述：apache的通用多文件上传解析器，在spring的配置文件中进行配置
 * 
 * 2018年4月2日 上午11:27:27
 */
public class CommonsMultipartResolverMapuni extends CommonsMultipartResolver {
	private HttpServletRequest request;
	@Override
	protected  FileUpload newFileUpload(FileItemFactory fileItemFactory){
		ServletFileUpload upload = new ServletFileUpload(fileItemFactory); //创建上传组件
		if(request!=null){
			HttpSession session = request.getSession();
			//创建监听器并设置参数
			FileUploadListener uploadProgressListener = new FileUploadListener(session);
			upload.setProgressListener(uploadProgressListener);//上传组件设置文件上传进度监听器
		}
		return upload;
	}
	@Override
	public MultipartHttpServletRequest resolveMultipart(HttpServletRequest request) throws MultipartException {
	      this.request=request;//获取到request,要用到session
	      return super.resolveMultipart(request);
	 }
}
