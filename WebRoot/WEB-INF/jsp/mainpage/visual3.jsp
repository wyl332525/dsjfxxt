<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<title></title>
		<%@ include file="../common/common.jsp"%>
		<!--1、Jquery组件引用-->
	    <script src="<%=rootPath %>/js/jxh/jquery.min.js" type="text/javascript" charset="utf-8"></script>
	    <!--2、echart4组件引用-->
	    <script src="<%=rootPath %>/js/jxh/echarts.js" type="text/javascript" charset="utf-8"></script>
	    <!--3、滚动条的引入-->
	    <script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
		<!--4、页面自编辑文件的引用-->
		
		<script src="<%=rootPath %>/js/jxh/jQuery.fontFlex.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=rootPath %>/js/jxh/visual3.js" type="text/javascript" charset="utf-8"></script>
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/visual3.css"/>
		<%
	    	String stationPkid = request.getParameter("stationPkid");
	     %>
	     <script type="text/javascript">
	     	var stationPkid ='<%=stationPkid %>';
	     </script>
	</head>
	<body>
		<div id="header">
			<i class="logo"></i>
		</div>
		<div id="main">
			<div id="mainLeft">
				<div id="ssjcsjDiv" class="title">

				</div>
				<div id="realTime" style="overflow-y:auto;overflow-x:auto;width:276px;height:152px;">
					<table id="realTimeTable" border="0" cellspacing="0" cellpadding="0">
						
					</table>
				</div>
				<div id="jcsjlDiv" class="title">

				</div>
				<div id="chart4">
					
				</div>	
				<div id="chart4Nub">
					
				</div>
				<div id="jcxxxdtDiv" class="title">
					
				</div>
			</div>
			<div id="mainMiddle">
				<div id="chart3">
					
				</div>
				<div id="gisMessage">
					<div id="tableHeader">
						<div>
							检测线名称
						</div>
						<div>
							检测线合格数
						</div>
						<div>
							检测总数
						</div>
						<div>
							合格率
						</div>
					</div>
					<div id="tableroll" style="overflow-y:auto;overflow-x:auto;width:440px;height:228px;">
						<table id="gisMessageTable" class="scroll" border="0" cellspacing="0" cellpadding="0">
							
						</table>
					</div>
				</div>
			    <div id="toolsleft">
					<div id="toolsleft1">
						
					</div>
					<div id="toolsleft2">
						
					</div>	
					<div id="toolsleft3">
						
					</div>	
					<div id="toolsleft4">
						
					</div>	
				</div>
				<div id="toolsleftbot">
					<div id="toolsleft5">
						
					</div>	
				</div>
			    <div id="timeline">

				</div>
				
			</div>
			<div id="mainRight">
				<div id="jcffhglDiv" class="title2">
					
				</div>
				<div id="chart1">
					
				</div>
				<div id="chart1Nub">
					
				</div>
		
				<div id="jcxhglDiv" class="title2">
					
				</div>
				<div id="chart2">
					
				</div>
			</div>
		</div>
		<div id="footer">
			<div id="dynamic" style="overflow-y:auto;overflow-x:auto;width:1349px;height:152px;">
				<table id="dynamicTable" border="0" cellspacing="0" cellpadding="0">
					
				</table>
			</div>
		</div>
	</body>
</html>
