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
	href="<%=rootPath%>/css/jxh/checkCarList.css" />
<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/checkCarList.js"
	type="text/javascript"></script>
<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->

</head>

<body style="overflow: hidden;">
	<div id="mainbottom">
		<div id="contrast1"
			>
			<div class="tableJC">
				车辆检测记录
			</div>
			<div id="carText"
				style="overflow-y:auto;overflow-x:auto;width:99.81%;height:99.7%;">
				<table id="carTextTable" border="" cellspacing="" cellpadding="">

					</table>
			</div>
		</div>
	</div>
</body>
</html>
