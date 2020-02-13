<%@page import="sun.misc.BASE64Decoder"%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" import="java.io.PrintWriter" %>
<%@ page contentType="text/html;charset=UTF-8" import="java.io.File"%>
<%@ page contentType="text/html;charset=UTF-8" import="jxl.Workbook"%>
<%@ page contentType="text/html;charset=UTF-8" import="jxl.write.Label"%>
<%@ page contentType="text/html;charset=UTF-8" import="jxl.write.Number"%>
<%@ page contentType="text/html;charset=UTF-8" import="jxl.write.WritableSheet"%>
<%@ page contentType="text/html;charset=UTF-8" import="jxl.write.WritableWorkbook"%>
<%
	
	//设置下载头信息
	response.setCharacterEncoding("ISO8859-1");
	response.setContentType("application/vnd.ms-excel;charset=ISO8859-1");
	String filename = request.getParameter("filename")+".xls";
	String downloadFileName = "";
	if(request.getHeader("User-Agent").toLowerCase().indexOf("firefox")>0){
		//downloadFileName = "=?UTF-8?B?"+(new String(com.sun.org.apache.xerces.internal.impl.dv.util.Base64.encode(filename.getBytes("UTF-8"))))+"?=";
	}else{
		downloadFileName=java.net.URLEncoder.encode(filename, "ISO8859-1");
	}
	response.setHeader("Content-Disposition", "attachment; filename="+downloadFileName);
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "No-cache");
	response.setDateHeader("Expires", 0);
	
	String title = new String(request.getParameter("titles").getBytes("ISO-8859-1"),"UTF-8");
	String content = request.getParameter("contents");
	System.out.println(title);
	//创建excel文件流
	WritableWorkbook book = Workbook.createWorkbook(response.getOutputStream());
	//下标第一页
	WritableSheet sheet = book.createSheet("第一页", 0);
	//写入第一行标题行
	String[] tit = title.split(",");
	for(int i=0; i<tit.length; i++){
		sheet.addCell(new Label(i,0,tit[i]));
	}
	//写入Excel主体
	String[] cont = content.split("\r\n");
	for(int i=0; i<cont.length; i++){
		String[] cell = cont[i].split(",");
		for(int m=0; m<cell.length; m++){
			if(!"".equals(cell[m]) && null != cell[m]){
				sheet.addCell(new Label(m,i+1,cell[m]));
			}else{
				sheet.addCell(new Label(m,i+1,"0.0"));
			}
		}
	}
	out.clear();
	out = pageContext.pushBody();
	book.write();
	book.close();
%>