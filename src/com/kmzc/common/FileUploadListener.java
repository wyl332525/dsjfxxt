package com.kmzc.common;

import javax.servlet.http.HttpSession;

import org.apache.commons.fileupload.ProgressListener;

/**
 * 描述：文件上传进度监听器
 * 
 * 2018年4月2日 上午11:13:21
 */
public class FileUploadListener implements ProgressListener {

	private HttpSession session;
	private long timemer =System.currentTimeMillis();
	int a=0;

	public FileUploadListener(HttpSession session) {
		this.session=session;
	}
	/**
	 * @bytesRead表示已经上传到服务器的字节数
	 * @contentLength表示所有文件的总大小
	 * @items表示正在上传第几个文件：
	 */
	@Override
	public void update(long bytesRead, long contentLength, int items) {
		if(bytesRead<contentLength){//不需要太快设置值到session中，每隔500毫秒才设置一次，主要是考虑到用redis时，提高效率
			long cur=System.currentTimeMillis();
			if(cur-timemer<500){
				return;
			}else{
				timemer=cur;
			}
		}
		double percentDone = 0;
		if (contentLength>0) {//计算已经上传的百分比
			percentDone =  Math.round(10000.0 * bytesRead / contentLength)/100.0;
		}
		StringBuffer process=new StringBuffer();
		process.append("{\"theBytesRead\":").append(bytesRead)//已经上传到服务器的字节数
			   .append(",\"theContentLength\":").append(contentLength)//所有文件的总大小
			   .append(",\"percentDone\":").append(percentDone)//已经上传的百分比
			   .append(",\"whichItem\":").append(items).append("}");//正在上传第几个文件
		
		session.setAttribute("uploadFileProcess", process.toString());//将当前数据设置到session中
	}

	
}
