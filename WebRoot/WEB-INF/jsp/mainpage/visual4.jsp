<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="../common/common.jsp"%>
	<title>案例库</title>
	<!--2、echart4组件引用-->
	<script src="<%=rootPath%>/js/jxh/echarts.js" type="text/javascript"></script>
	<!--3、滑块插件-->
	<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>
	<!--4、页面自编辑文件的引用-->
	<link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/jxh/visual4.css" />
	<link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
	<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
	<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
	<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
	<script src="<%=rootPath%>/js/jxh/visual4.js" type="text/javascript"></script>
	<script type="text/javascript" src="<%=rootPath%>/js/jxh/ckplayer.js"></script>
	<script type="text/javascript" src="<%=rootPath%>/js/jxh/players.js"></script>
<%
	String wgpkid = request.getParameter("wgpkid");
%>
<script type="text/javascript">
	var wgpkid = '<%=wgpkid%>';
</script>
</head>
<body>
	<div id="header">
		<div class="rqk" id="curTime"></div>
		<div class="ywxtBg" onclick="aaaaa();">返回主页</div>
	</div>
	<div id="main">
		<div id="mainLeft">
			<div id="mainLeftTop">
				<div class="title">车辆基本信息</div>
				<div id="carMessage">
					<table id="carMessageTable" border="" cellspacing="" cellpadding="">
	
					</table>
				</div>
			</div>
			<div id="mainLeftBottom">
				<div class="title">违规信息</div>
				<div id="textMessage">
					<table id="carTextTable" border="" cellspacing="" cellpadding="">
						
					</table>
				</div>
			</div>
		</div>
		<div id="mainMiddle">
			<div id="chart3bg">
				<div class="title">检测过程视频</div>
				<div id="chart3">
				</div>
			</div>
			<div id="mainMiddleBottom">
				<div class="title" >车辆检测记录</div>
				<div id="wgtp">
					<table id="carTextTable1" border="" cellspacing="" cellpadding="">
						
					</table>
				</div>
			</div>
		</div>
		<div id="mainRight">
			<div id="chart3bg1">
				<div id="jcbg">
				</div>
				
			</div>
		</div>
	</div>
</body>
</html>
