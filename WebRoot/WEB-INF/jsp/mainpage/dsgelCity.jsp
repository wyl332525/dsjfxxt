<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="../common/common.jsp"%>
<title></title>
<!--2、echart4组件引用-->
<script src="<%=rootPath%>/js/jxh/echarts.js" type="text/javascript"></script>

<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>
<!--4、页面自编辑文件的引用-->
<link rel="stylesheet" type="text/css"
	href="<%=rootPath%>/css/jxh/dshgltj.css" />
<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/dsgelCity.js" type="text/javascript"></script>
<%
	String City = request.getParameter("City");
%>
<script type="text/javascript">
	var City = '<%=City%>';
</script>
</head>



<body style="overflow: hidden;">
	<div
		style="text-align:center;font-size:30px;font-weight:bold;margin-top:15px;">
		<lable id="CityName"></lable>按检测方法统计合格率折线图</div>

	<div style="margin-top:30px;color:#00cffd">
		 <input class="Wdate" id="kssjxx" type="text" onclick="WdatePicker()" />
		 &nbsp;至&nbsp;
		 <input class="Wdate" id="jssj" type="text" onclick="WdatePicker()" />
		 <div class="amorecxxx" onclick="getValueDate()">查询</div>
	</div>
	<div id="main"></div>
</body>
</html>
