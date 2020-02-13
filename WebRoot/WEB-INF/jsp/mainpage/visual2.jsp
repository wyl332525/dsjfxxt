<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
<head>
<%@ include file="../common/common.jsp"%>
	<title>一车一档</title>
	<!--2、echart4组件引用-->
	<script src="<%=rootPath%>/js/jxh/echarts.js" type="text/javascript"></script>
	<!--3、滑块插件-->
	<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>
	<!--4、页面自编辑文件的引用-->
	<link rel="stylesheet" type="text/css" href="<%=rootPath%>/css/jxh/visual2.css" />
	<link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
	<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
	<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
	<script src="<%=rootPath%>/js/jQuery.fontFlex.js" type="text/javascript"></script>
	<script src="<%=rootPath%>/js/jxh/visual2.js" type="text/javascript"></script>
<%
	String carPkid = request.getParameter("carPkid");
%>
<script type="text/javascript">
	var carPkid = '<%=carPkid%>';
</script>
</head>
<body style="overflow: hidden;">
	<div id="header">
		<i class="logo">
		<div class="ywxtBg" onclick="aaaaa();">返回主页</div>
		</i>
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
			<!-- 
				<div class="title">
					车辆修改记录
				</div>
				<div id="InforChanges" style="overflow-y:auto;overflow-x:auto;width:100%;height:108px;">
					<table id="InforChangesTable" border="" cellspacing="" cellpadding="">
						
					</table>
				</div>
				 -->
		</div>
		<div id="mainMiddle">
			<div id="chart3bg">
				<!--  <div class="title">检测过程数据</div>-->
				<div id="chart3"></div>
			</div>

			<!-- 
				<div id="alarmInfor" style="overflow-y:auto;overflow-x:auto;width:35%;height:180px;">
					<div class="tableHeader2">报警信息展示（过程数据分析）</div>
					<table id="alarmInforTable" border="" cellspacing="" cellpadding="">
						
					</table>
				</div>
				 -->
		</div>
		<div id="mainbottom">
			<div id="contrast">
				<div class="title">检测结果对比分析</div>
				<table id="contrastTable" border="" cellspacing="" cellpadding="">

				</table>
			</div>
			<div id="contrast1">
				<!-- <div class="title" >车辆检测记录<lable id='carTestXQ'style="float:right;margin-right:20px;" onclick="toCartest()">详情</lable></div> -->
				<div class="title" >车辆检测记录<a class="amore" href="#" style="float:right;margin-right:20px;" onclick="toCartest();">更多</a></div>
					<table id="carTextTable" border="" cellspacing="" cellpadding="">

					</table>
					<table id="carTextTable1" border="" cellspacing="" cellpadding="">

					</table>
			</div>
		</div>
	</div>
</body>
</html>
