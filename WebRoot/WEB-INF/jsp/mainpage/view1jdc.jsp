<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="../common/common.jsp"%>
		<title></title>
		<!--1、Jquery组件引用-->
	    <script src="<%=rootPath %>/js/jxh1/jquery.min.js" type="text/javascript"></script>
	    <!--2、echart4组件引用-->
	    <script src="<%=rootPath %>/js/jxh1/echarts.min.js" type="text/javascript"></script>
	    <%-- <script src="<%=rootPath %>/js/jxh1/index.js" type="text/javascript" charset="utf-8"></script> --%>
	    <link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/jdc1.css"/>
	    <!--3、滑块插件-->
		<!--4、页面自编辑文件的引用-->
		<%
    	String stationPkid = request.getParameter("stationPkid");
     %>
     <script type="text/javascript">
     	var stationPkid ='<%=stationPkid %>';
     </script>
	<script type="text/javascript">
		$(function(){
		        
		   });
	</script>
	<script src="<%=rootPath %>/js/jxh/view1jdc.js" type="text/javascript"></script>
	</head>
	<body><!-- <div class="header">
			车辆可视化视图  <span class="close"><img src="img/guanbi.png"/></span>
		</div> -->
		<!--主体-->
		<div class="main">
			<div class="mainLeft">
				<div class="surveyCon modelComment">
					<div class="modelTitle"><i></i>检测概况</div>
					<div class="jcshow">
						<div class="showTitle"><span>总监测数（辆）</span><span>监测线数（条）</span></div>
						<div class="showCon"><span id="carsnums"></span><span id="jcxnums"></span></div>
					</div>
					<ul  id="yieldTable" class="passLists">
					</ul>
				</div>
				<div class="jcBasiscMsg modelComment">
					<div class="modelTitle"><i></i>监测站基本信息</div>
					<table id="textMessageTable"  cellspacing="0" cellpadding="0" class="tableBasisLists">
					</table>
				</div>
			</div>
			<div class="mainRight">
				<div class="allAmount">
					<div class="modelComment">
						<div class="modelTitle"><i></i>检测数量</div>
						<div id="piechart"></div>
						<!--时间轴-->
						<div class="timer">
						    <div class="prev btntab"></div>
						    <ul id="sjz">
						    </ul>
						    <div class="next btntab"></div>
						    <div class="zanting btntab">
						    </div>
						</div>
					</div>
					<div class="vehicleType modelComment">
						<table class="vehicleTypeTable" id="mainMessageTable">
						</table>
					</div>
				</div>
				<div class="PercentOfPass">
					<div class="modelComment">
						<div class="modelTitle" id="jcffDiv"><i></i></div>
						<div id="chartOne" style="width: 100%;"></div>
					</div>
					<div class="zhlPass modelComment">
						<div class="modelTitle" id="jcxDiv"><i></i></div>
						<div id="chartTwo" style="width: 100%;"></div>
					</div>
					<div class="zhlPass modelComment" style="overflow-y:auto;overflow-x:auto;width:100%;height:190px;">
						<div class="modelTitle" id="bjDiv"><i></i></div>
						<table border="0" class="tableAlarmMsg" id="alarmMessageTable">
						</table>
					</div>
				</div>
			</div>
			
		</div>
	</body>
</html>
