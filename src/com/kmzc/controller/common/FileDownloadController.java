package com.kmzc.controller.common;

	import java.io.File;
	import java.io.FileInputStream;
	import java.io.IOException;
	import java.io.PrintWriter;
	import javax.servlet.ServletOutputStream;
	import javax.servlet.http.HttpServletResponse;

	import org.springframework.context.annotation.Scope;
	import org.springframework.stereotype.Controller;
	import org.springframework.web.bind.annotation.RequestMapping;
	import org.springframework.web.bind.annotation.RequestParam;
	/**
	 * 描述：提供文件下载功能
	 */
	@Controller
	@RequestMapping("/zc")
	@Scope("prototype")
	public class FileDownloadController {
		/** 
		 * 描述：
		 * @param response
		 * @param zkytDownloadFileName 需要下载的文件名
		 * @param zkytDownloadSaveName 需要保存的文件名
		 *
		 */
		@RequestMapping("/download")
		public void execute(HttpServletResponse response,@RequestParam(value="zkytDownloadFileName") String zkytDownloadFileName,
				@RequestParam(value="zkytDownloadSaveName") String zkytDownloadSaveName){
			File f=new File(zkytDownloadFileName);
			if(zkytDownloadSaveName==null || "".equals((zkytDownloadSaveName.trim()))){
				zkytDownloadSaveName=zkytDownloadFileName.substring(zkytDownloadFileName.replace("\\", "/").lastIndexOf("/")+1);
			}else{
				//先得到到需要下载文件的后缀
				String suffix=zkytDownloadFileName.substring(zkytDownloadFileName.lastIndexOf("."));
				if(!zkytDownloadSaveName.endsWith(suffix)){
					if(zkytDownloadSaveName.indexOf(".")>0){
						zkytDownloadSaveName=zkytDownloadSaveName.substring(0,zkytDownloadSaveName.indexOf("."))+suffix;
					}else{
						zkytDownloadSaveName=zkytDownloadSaveName+suffix;
					}
				}
			}
			
			String err="";
			if(!f.exists()){
				err="“"+zkytDownloadFileName+"文件不存在，无法下载！";
			}else{
				if(f.isFile()){
					FileInputStream fis=null;
					ServletOutputStream out=null;
					try {
						fis=new FileInputStream(f);
						zkytDownloadSaveName=new String(zkytDownloadSaveName.getBytes("UTF-8"),"ISO-8859-1");
						response.setHeader("Content-Disposition", "attachment; filename="+zkytDownloadSaveName);
						response.setContentType("application/octet-stream; charset=UTF-8");   

						out=response.getOutputStream();
						byte[] temp=new byte[4096];
						int len=0;
						while((len=fis.read(temp))>0){
							out.write(temp, 0, len);
						}
						out.flush();
					} catch (Exception e) {
						err="异常："+e.getMessage();
						e.printStackTrace();
					}finally{
						if(fis!=null)
							try {
								fis.close();
							} catch (IOException e) {
								fis=null;
								e.printStackTrace();
							}
						if(out!=null)
							try {
								out.close();
							} catch (IOException e) {
								out=null;
								e.printStackTrace();
							}
					}
				}else{
					err="“"+zkytDownloadFileName+"”是一个路径，不是文件无法下载！";
				}
			}
			if(!"".equals(err)){
				throw new RuntimeException(err);
			}
		}
		
		/**
		 * 描述：判断要下载的文件是否存在，存在返回空的字符串，否则返回相关错误信息，在下载之前调用
		 * @param response
		 * @param fileName
		 *
		 */
		@RequestMapping("/fileExist")
		public void fileExist(HttpServletResponse response,@RequestParam(value="fileName") String fileName){
			File file = new File(fileName);
			String err="";
			if(!file.exists()){
				err="“"+fileName+"”文件不存在，无法下载！";
			}else{
				if(file.isDirectory()){
					err="“"+fileName+"”是一个路径，不是文件无法下载！";
				}
			}
			response.setContentType("text/html;charset=UTF-8");
			try {
				PrintWriter pw=response.getWriter();
				pw.print(err);
				pw.flush();
				pw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
}
