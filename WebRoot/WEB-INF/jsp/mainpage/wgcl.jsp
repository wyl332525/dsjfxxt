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
<script src="<%=rootPath%>/js/jxh/wgcl.js" type="text/javascript"></script>
<%
	String area = request.getParameter("area");
%>
<script type="text/javascript">
	var area = '<%=area%>';
</script>

</head>

<body style="overflow: hidden;">
	<div style="margin-top:20px;float:left;">
		车牌号：<select class="FormSelect" id="carnumberstrat">
		<option value="云A">云A</option>
		<option value="云C">云C</option>
		<option value="云D">云D</option>
		<option value="云E">云E</option>
		<option value="云F">云F</option>
		<option value="云G">云G</option>
		<option value="云H">云H</option>
		<option value="云J">云J</option>
		<option value="云K">云K</option>
		<option value="云M">云M</option>
		<option value="云N">云N</option>
		<option value="云P">云P</option>
		<option value="云Q">云Q</option>
		<option value="云R">云R</option>
		<option value="云S">云S</option>
		</select>
		<input type="text" id="carnumber" placeholder="车牌号" >
		&nbsp;&nbsp;&nbsp;&nbsp;
		检测站：<input id="stationname" type="text" placeholder="请输入检测站查询" list="autos">
		<datalist id="autos" >
		</datalist>
		
		<label class="label-btn" onclick="getwgcl()">查询</label>
	</div>
	<br /><br />
	<div id="dataTable" style="height:500px;width:100%;margin-top:20px;">
			<table id='gridTable' class="easyui-datagrid" style="height:100%"></table>
		</div>
</body>
</html>
