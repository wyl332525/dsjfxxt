<%@ page language="java" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%@ include file="../common/common.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
	<link rel="stylesheet" type="text/css" href="styles.css">
	<meta name="renderer" content="webkit" /> 
  	<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/dsjIndex.css"/>
    <!--3、滑块插件-->
    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />

	<script type="text/javascript">
		var areaPrefix = "<%=areaPrefix%>";
	</script>
  </head>
  
  <body>
  	<!-- 根据检测方法统计各州市合格率 -->
  	<div class="areaHgl" id="areaHglByMethod"></div>
  	<!-- 根据柴油、汽油统计各州市合格率 -->
  	<div class="areaHgl" id="areaHglByfuelType"></div>
  	<div class="areaHgl" id="HglByMileAgeNum"></div>
  </body>
  
    <!--2、echart4组件引用-->
    <script src="<%=rootPath %>/js/jxh/echarts.js" type="text/javascript"></script>
    <script src="<%=rootPath %>/js/jxh/echarts-auto-tooltip.js" type="text/javascript"></script>
 	<script src="<%=rootPath %>/js/jxh/RedisGetValue.js" type="text/javascript"></script>
 	<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
	<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
	
    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
	<!--4、页面自编辑文件的引用-->
	<script src="<%=rootPath %>/js/jQuery.fontFlex.js" type="text/javascript"></script>
	<script src="<%=rootPath %>/js/jxh/countUp.js" type="text/javascript"></script>
	<script src="<%=rootPath %>/js/jxh/map.js" type="text/javascript"></script>
</html>
