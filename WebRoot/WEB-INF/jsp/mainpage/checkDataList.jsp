<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String jcbgPkid = request.getParameter("jcbgPkid");
	String jcff = request.getParameter("jcff");
%>
<!DOCTYPE html>
<html style="height:96%">
  <head>
    <%@ include file="../common/common.jsp"%>
    <link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/main.css">
    <script type="text/javascript" src="<%=rootPath %>/js/jxh/checkDataList.js"></script>
    <title>过程数据列表</title>
    <script type="text/javascript">
    	var jcbgPkid ='<%=jcbgPkid %>';
    	var jcff ='<%=jcff %>';
    </script>
  </head>
  
<body style="height:100%;">
	<div style="height:100%;">
		<div id="dataTable" style="height:90%;width:100%;">
		     <table id='gridTable' class="eaysui-datagrid"></table>
	  	</div>
	</div>
	<div style="display:none">
		<iframe src="" name="export2csvIframe" id="showCurveIframe"></iframe>
		<form action="checkLog2csv.yt" id="export2csvForm" target="export2csvIframe" method="post">
			<input type="hidden" name="titles" id="titles"/>
			<input type="hidden" name="contents" id="contents"/>
			<input type="hidden" name="filename" id="filename"/>
		</form>
	</div>
</body>
</html>
