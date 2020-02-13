<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="../common/common.jsp"%>
<title></title>

<!--2、echart4组件引用-->
<script src="<%=rootPath%>/js/jxh/echarts.js" type="text/javascript"></script>
<!--3、滑块插件-->
<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>
<!--4、页面自编辑文件的引用-->
<link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/jxh/checkCarList.css" />
<link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />
<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/yzyd2.js" type="text/javascript"></script>
<%
	String areacode = request.getParameter("areacode");
	String area = request.getParameter("area");
%>
<script type="text/javascript">
	var areacode = '<%=areacode%>';
	var area = '<%=area%>';
</script>

</head>

<body style="overflow: hidden;">
	<div style="margin-top:20px;float:left;">
		<!-- 行政区：<input type="text" id="carnumber" placeholder="请输入行政区查询" >
		&nbsp;&nbsp;&nbsp;&nbsp; -->
		检测站：<input id="stationname" type="text" placeholder="请输入检测站查询">
		<label class="label-btn" onclick="getyzyd()">查询</label>
	</div>
	<br /><br />
	<div id="dataTable" style="height:500px;width:100%;margin-top:20px;">
			<table id='gridTable' class="easyui-datagrid" style="height:100%"></table>
		</div>
</body>
</html>
