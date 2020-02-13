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
<link rel="stylesheet" type="text/css"
	href="<%=rootPath%>/css/jxh/spjk.css" />
	<link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />
<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/spjk.js" type="text/javascript"></script>
<%
	String stationid = request.getParameter("stationid");
%>
<script type="text/javascript">
	var stationid = '<%=stationid%>';
</script>

</head>

<body style="overflow: hidden;">
	<div id="mainbottom">
		<div id="lwtitle">
			<div class="lw"></div>
			代表摄像头联网正常<br />
			<div class="wlw"></div>
			代表摄像头连接异常
			<div>如果未显示数据表示该检测站还未上传检测线摄像头信息</div>
		</div>
		<div id="contrast2">
			<div class="tableJC">检测站摄像头连接情况</div>
			<div id="carText"
				style="overflow-y:auto;overflow-x:auto;width:98.81%;height:99.7%;">
				<table id="carTextTable" border="" cellspacing="" cellpadding="">

				</table>
			</div>
		</div>
	</div>
</body>
</html>
