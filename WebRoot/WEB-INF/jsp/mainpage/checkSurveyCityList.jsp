<%@ page language="java" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	System.out.print("test");
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<%@ include file="../common/common.jsp"%>

<title></title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">


<!--2、echart4组件引用-->
<script src="<%=rootPath%>/js/jxh/echarts.js" type="text/javascript"></script>
<!--3、滑块插件-->
<link rel="stylesheet" href="<%=rootPath%>/css/jxh/powerange.css" />
<script src="<%=rootPath%>/js/jxh/powerange.js"></script>
<script src="<%=rootPath%>/js/jxh/my_scrollbar.js"
	type="text/javascript" charset="utf-8"></script>

<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>
<!--4、页面自编辑文件的引用-->
<link rel="stylesheet" type="text/css"
	href="<%=rootPath%>/css/jxh/dshgltj.css" />
<script src="<%=rootPath%>/js/jxh/checkSurveyCityList.js"
	type="text/javascript"></script>

<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<%
	String City = request.getParameter("City");
%>
<script type="text/javascript">
	var City = '<%=City%>';
</script>
</head>
<body style="overflow: hidden;">

	<div style="text-align:center;font-size:30px;font-weight:bold;margin-top:15px;">
		
		各站点按复检次数统计合格率折线图
	</div>

	<div style="margin-top:30px;color:#00cffd">
		 <input class="Wdate" id="kssjxx" type="text" onclick="WdatePicker()" />
		 &nbsp;至&nbsp;
		 <input class="Wdate" id="jssj" type="text" onclick="WdatePicker()" />
		 <div class="amorecxxx" onclick="getValueDate()">查询</div>
	</div>

	<div id="main"></div>
</body>
</html>
