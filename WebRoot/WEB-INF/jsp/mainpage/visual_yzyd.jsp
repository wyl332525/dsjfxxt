<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="../common/common.jsp"%>
		<title></title>
		<!--1、Jquery组件引用-->
	    <script src="<%=rootPath %>/js/jxh/jquery.min.js" type="text/javascript"></script>
	    <!--2、echart4组件引用-->
	    <script src="<%=rootPath %>/js/jxh/echarts.js" type="text/javascript"></script>
	    <!--3、滑块插件-->
	     <link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
		<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
		<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
		
	    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
		<!--4、页面自编辑文件的引用-->
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/dsjIndex.css"/>
		<script src="<%=rootPath %>/js/jQuery.fontFlex.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/dsjIndex.js" type="text/javascript"></script>
		<%
    	String stationPkid = request.getParameter("stationPkid");
     %>
     <script type="text/javascript">
     	var stationPkid ='<%=stationPkid %>';
     </script>
	</head>
	<body><!-- <div id="header">
			<i class="logo"></i>
		</div> -->
		<div id="main">
			<div id="mainLeft">
				<div class="title">
					检测概况
				</div>
				<div id="textSum">
					<div class="textSumDiv textSumDiv1">
						总检测数（辆）
					</div>
					<div class="textSumDiv textSumDiv2">
						检测线数（条）
					</div>
					<div id="carsnums" class="textSumDiv textSumDiv3">
					</div>
					<div id="jcxnums" class="textSumDiv textSumDiv4">
					</div>
				</div>
				<div id="yield">
					<table id="yieldTable" border="0" cellspacing="0" cellpadding="0">
					</table>
				</div>
				<div class="title">
					检测站基本信息
				</div>
				<div id="textMessage">
					<table id="textMessageTable" border="" cellspacing="" cellpadding="">
					</table>
				</div>
			</div>
			<div id="mainMiddle">
				<div id="chart3">
					<div id="chart3C">
					</div>
					<div id="chart3zhou">
					</div>
				</div>
				<div id="mainMessage">
					<table id="mainMessageTable"  border="0" cellspacing="0" cellpadding="0">
					</table>
				</div>
			</div>
			<div id="mainRight">
				<div id="jcffDiv" class="title2">
				</div>
				<div id="chart1">
				</div>
				<div id="jcxDiv" class="title2">
				</div>
				<div id="chart2">
					
				</div>
				<div id="alarmMessage">
					<table id="alarmMessageTable" border="0" cellspacing="0" cellpadding="0">
					</table>
				</div>
			</div>
		</div>
	</body>
</html>
