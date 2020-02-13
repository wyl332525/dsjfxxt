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
	<link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />
<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/lwqk.js" type="text/javascript"></script>
<%
	String areacode = request.getParameter("areacode");
%>
<script type="text/javascript">
	var areacode = '<%=areacode%>';
</script>

</head>

<body style="overflow: hidden;">
	<div id="mainbottom">
		<div id="lwtitle">
			<div class="lw"></div>
			代表联网正常<br />
			<div class="wlw"></div>
			代表30分钟内未上传数据
		</div>
		<div id="contrast2">
			<div class="tableJC">检测站联网情况</div>
			<div id="carText"
				style="overflow-y:auto;overflow-x:auto;width:98.81%;height:99.7%;">
				<table id="carTextTable" border="" cellspacing="" cellpadding="">

				</table>
			</div>
		</div>
	</div>
</body>
</html>
