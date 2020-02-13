<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="../common/common.jsp"%>
		<title></title>
	    <!--2、echart4组件引用-->
	    <script src="<%=rootPath %>/js/jxh/echarts.js" type="text/javascript"></script>
	    <!--3、滑块插件-->
	     <link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
		<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
		<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
		
	    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
		<!--4、页面自编辑文件的引用-->
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/yzyd.css"/>
		<script src="<%=rootPath %>/js/jQuery.fontFlex.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/yzyd.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/countUp.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/map.js" type="text/javascript"></script>
		<style type="text/css">
			.BMap_cpyCtrl {
	            display: none;
	        }
	 
	        .anchorBL {
	            display: none;
	        }
		</style>
		
		<script type="text/javascript" src="http://developer.baidu.com/map/custom/stylelist.js"></script>
		<%
	    	String stationPkid = request.getParameter("stationPkid");
	    	System.out.println(stationPkid);
	     %>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=GWRZs1s8TPOzB0qN3O5OxXBfQZd1VT1n"></script>
		<script type="text/javascript">
			var stationPkid ='<%=stationPkid %>';
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
					<div class="title">
						机构检测概况
					</div>
					<div id="textSum">
						<div class="textSumDiv textSumDiv1">
							检测线条数
						</div>
						<div class="textSumDiv textSumDiv2">
							总检测数量
						</div>
						<div class="textSumDiv textSumDiv5">
							当日检测数
						</div>
						<div id="jcxnums" class="textSumDiv textSumDiv3">
						</div>
						<div id="carsnums" class="textSumDiv textSumDiv4">
						</div>
						<div id="drjcnums" class="textSumDiv textSumDiv6">
						</div>
					</div>
					
					<div id="yield">
						<table id="yieldTable" border="0" cellspacing="0" cellpadding="0">
						</table>
					</div>
				</div>
				<div id="mainLeftBottom">
					<div class="title">
						检验机构基本信息
					</div>
					<div id="textMessage">
						<table id="textMessageTable" border="" cellspacing="" cellpadding="">
						</table>
					</div>
				</div>
			</div>
			<div id="mainMiddle">
				<div id="chart3">
					<div id="chart3C">
						
					</div>
					<div id="chart3zhou">
					</div>
				</div>
				<div id="ycydMainMessage">
					<div id="yccllb" class="title2">
					</div>
					<div id="ycMessage">
						<table id="ycMessageTable" border="" cellspacing="" cellpadding="">
						</table>
					</div>
				</div>
			</div>
			<div id="mainRight">
				<div id="mainRightTop">
					<div id="jcffDiv" class="title2">
					</div>
					<div id="yzydChartUp">
					</div>
				</div>
				<div id="mainRightMiddle">
					<div id="jcxDiv" class="title2">
					</div>
					<div id="yzydChartMiddle">
					</div>
				</div>
				<div id="mainRightBottom">
					<div id="pfbzDiv" class="title2">
					</div>
					<div id="yzydChartBottom">
						
					</div>
				</div>
				<!-- 
				<div id="alarmMessage">
					<table id="alarmMessageTable" border="0" cellspacing="0" cellpadding="0">
					</table>
				</div> -->
			</div>
		</div>

	</body>
</html>
