<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    	<meta name="renderer” content=”webkit|ie-comp|ie-stand" />
		<%@ include file="../common/common.jsp"%>
		<title></title>
		<script src="<%=rootPath %>/js/jxh/jquery.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="<%=rootPath %>/js/jxh/echarts.min.js" type="text/javascript" charset="utf-8"></script>
		<!--3、滑块插件-->
	    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/jdc2.css"/>
		<script src="<%=rootPath %>/js/jxh/view2-JDC.js" type="text/javascript"></script>
   	 	<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/initStyle.css"/>
    	<script src="<%=rootPath %>/js/common/initStyle.js" type="text/javascript" charset="utf-8"></script>
		<%
	    	String carPkid = request.getParameter("carPkid");
	     %>
	     <script type="text/javascript">
	     	var carPkid ='<%=carPkid %>';
	     </script>
	</head>
	<body>
		<!--头部
		<div class="header">
			车辆可视化视图  
        	<span class="close"><img src="<%=rootPath %>/img/jxh/guanbi.png"/></span>
		</div>-->
		<!--主体-->
		<div class="main">
			<div class="mainLeft">
				<!--车辆基本信息-->
				<div class="jcBasiscMsg modelComment">
					<div class="modelTitle"><i></i>车辆基本信息</div>
					<table class="basicMsgListsTable tableComment">
						
					</table>
				</div>
				<!--车辆检测记录-->
				<div class="vehicleRecord modelComment" style="overflow-y:auto;height:175px;">
					<div class="modelTitle"><i></i>车辆检测记录</div>
					<table class="vehicleRecordTable tableComment">
						
					</table>
				</div>
				<!--信息修改记录-->
				<div class="modifyInfo modelComment" style="overflow-y:auto;height:145px;">
					<div class="modelTitle"><i></i>信息修改记录</div>
					<table class="modifyInfoTable tableComment">
						
					</table>
				</div>
			</div>
			<div class="mainRight">
				<div class="vehicleTestProcess modelComment">
					<div class="modifyInfoTitle modelTitle"><i></i></div>
					<div id="echart">
						
					</div>
				</div>
				
				<div class="testAnalysisBox">
					<!--监测结果对比分析-->
					<div class="resultAnalysis modelComment">
						<div class="resultAnalysisTitle modelTitle"><i></i>监测结果对比分析</div>
						<ul class="resultAnalysiList">
						
						</ul>
					</div>
					<!--报警信息展示-->
					<div class="resultShow modelComment" style="overflow-y:auto;height:243px;">
						<div class="modelTitle resultShowTitle"><i></i>报警信息展示（过程数据分析）</div>
						<table class="msgShowlists tableComment" style="width:100%;table-layout:fixed;white-space:nowrap;">
							
						</table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
