<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String jcff = request.getParameter("jcff");
	String fields = request.getParameter("fields");
	String jcbgPkid = request.getParameter("jcbgPkid");
%>
<!DOCTYPE html>
<html style="height:100%;width: 100%;">
  <head>
    <%@ include file="../common/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/main.css">
    <script type="text/javascript" src="<%=rootPath %>/js/jxh/amplification.js"></script>
    <script type="text/javascript">
    	var jcff = "<%=jcff%>";
    	var fields = "<%=fields%>";
    	var jcbgPkid = "<%=jcbgPkid%>";
    </script>
    <title>放大倍数</title>
  </head>
  
  <body style="height:100%;width:100%;">
	<div id="fdPanel" class="easyui-panel" title="" style="height:70%;width:99%;" data-options="collapsible:true,"></div>
    <div id="add" style='text-align: center;margin-top: 20px;'>
  		<a id="saveBtn" style="width:80px;height:40px;" href="javascript:save();" class="easyui-linkbutton" data-options="iconCls:'icon-save'">确  定</a>
  		<a id="closeBtn" style="width:80px;height:40px;" href="javascript:closeWin();" class="easyui-linkbutton" data-options="iconCls:'icon-back'">取  消</a>
  	</div>
  </body>
</html>
