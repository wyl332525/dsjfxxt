<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<%@ include file="../common/common.jsp"%>
<title>机动车大数据分析统计分析</title>
<!--css引用-->
<link rel="stylesheet" href="<%=rootPath%>/css/visual/common.css">
<link rel="stylesheet" href="<%=rootPath%>/css/visual/index.css">
<!--3、滑块插件-->
<link rel="stylesheet" href="<%=rootPath%>/css/jxh/powerange.css" />
<link rel="stylesheet" href="<%=rootPath%>/css/jxh/bk.css" />
<script src="<%=rootPath%>/js/jxh/powerange.js"></script>
<script src="<%=rootPath%>/js/jxh/my_scrollbar.js"
	type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="<%=rootPath%>/js/jxh/jqmeter.min.js"></script>

<script>
	var areaPrefix = "<%=areaPrefix%>";
	$(window).load(function() {
		$(".loading").fadeOut();
	});

	$(document).ready(function() {
		var whei = $(window).width();
		$("html").css({
			fontSize : whei / 20
		});
		$(window).resize(function() {
			var whei = $(window).width();
			$("html").css({
				fontSize : whei / 20
			});
		});
	});
</script>
<script src="<%=rootPath%>/js/plugins/echarts/echarts.min.js"
	type="text/javascript"></script>
<script src="<%=rootPath%>/js/sjtj/dataCalculation.js"
	type="text/javascript"></script>
<script src="<%=rootPath%>/js/jxh/countUp.js" type="text/javascript"></script>
</head>
<body>
	<div class="canvas" style="opacity: .2">
		<iframe frameborder="0" src="<%=rootPath%>/js/visual/index.html"
			style="width: 100%; height: 100%"></iframe>
	</div>
	<div class="loading">
		<div class="loadbox">
			<img src="<%=rootPath%>/img/picture/loading.gif"> 页面加载中...
		</div>
	</div>
	<div class="head">
		<h1 style="color:#D0E5FE">机动车大数据分析统计分析</h1>
		<div class="weather">
			<span id="showTime"></span>
		</div>
		<script>
			var t = null;
			t = setTimeout(time, 1000);
			function time() {
				clearTimeout(t);
				var dateStr = '';
				var curDate = new Date();
				var year = curDate.getFullYear(); //获取年
				var month = curDate.getMonth() + 1; //获取月份
				month = month >= 10 ? month : "0" + month;
				var daysOfMonth = curDate.getDate(); //获取日期
				daysOfMonth = daysOfMonth >= 10 ? daysOfMonth : "0" + daysOfMonth;
		
				var hours = curDate.getHours(); //获取小时
				var minute = curDate.getMinutes(); //获取分钟
				var seconds = curDate.getSeconds(); //获取秒
		
				var daysOfWeek = curDate.getDay(); //获取星期
		
				hours = hours >= 10 ? hours : "0" + hours;
				minute = minute >= 10 ? minute : "0" + minute;
				seconds = seconds >= 10 ? seconds : "0" + seconds;
		
				var weeks = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ]; //下标0刚好与获取星期几相同  代表周日
				dateStr = year + "年" + month + "月" + daysOfMonth + "日" + " " + weeks[daysOfWeek] + " " + hours + ":" + minute + ":" + seconds;
		
				document.getElementById("showTime").innerHTML = dateStr;
				t = setTimeout(time, 1000);
			} //设定定时器，循环运行     
		</script>
	</div>
	<div class="mainbox">
		<ul class="clearfix">
			<li>
				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<div class="titleMiddle">
							<a style="text-decoration:none;color:#94CBFF;" href="#">检测方法统计</a>
						</div>
					</div>
					<div class="allnav" id="areaHglByMethod"></div>
					<div class="boxfoot"></div>
				</div>

				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<div class="titleMiddle">
							<!-- 标题 -->
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">燃料类型统计</a>
						</div>
					</div>
					<!-- 图表容器 -->
					<div class="allnav" id="areaHglByfuelType"></div>
					<div class="boxfoot"></div>
				</div>
				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<div class="titleMiddle">
							<!-- 标题 -->
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">汽油/柴油工况率统计</a>
						</div>
					</div>
					<div class="allnav" id="AreaGklByMethod"></div>
					<div class="boxfoot"></div>
				</div>
			</li>
			<li>
				<div class="component">
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<div class="titleMiddle">
								<!-- 标题 -->
								<a style="text-decoration:none;color:#94CBFF;" href="#"
									onclick="toQualifieList();">里程数首检合格率统计</a>
							</div>
						</div>
						<div class="allnav" id="MileAgeNumFjhgl"></div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<div class="titleMiddle">
								<!-- 标题 -->
								<a style="text-decoration:none;color:#94CBFF;" href="#"
									onclick="toQualifieList();">车辆年限首检合格率统计</a>
							</div>
						</div>
						<div class="allnav" id="OutfactoryDateFjhgl"></div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<div class="titleMiddle">
								<!-- 标题 -->
								<a style="text-decoration:none;color:#94CBFF;" href="#"
									onclick="toQualifieList();">近一年周汽油工况率/合格率统计</a>
							</div>
						</div>
						<div class="allnav" id="gasHglSituationOfWeeks"></div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<div class="titleMiddle">
								<!-- 标题 -->
								<a style="text-decoration:none;color:#94CBFF;" href="#"
									onclick="toQualifieList();">近一年周柴油工况率/合格率统计</a>
							</div>
						</div>
						<div class="allnav" id="dieselHglSituationOfWeeks"></div>
						<div class="boxfoot"></div>
					</div>
				</div>
			</li>
			<li>
				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<div class="titleMiddle">
							<!-- 标题 -->
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">每月检测量统计</a>
						</div>
					</div>
					<!-- 图表容器 -->
					<div class="allnav" id="monthJclWithArea"></div>
					<div class="boxfoot"></div>
				</div>

				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<!-- <div class="titleleft"><img src="<%=rootPath%>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
						<div class="titleMiddle">
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">柴油车/机动车检测量统计</a>
						</div>
						<!-- <div class="titleright"><img src="<%=rootPath%>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
					</div>
					<div class="allnavs">
						<div class="allnav_one" id="areaCyslByMethod"></div>
						<div class="allnav_two" id="areaQyslByMethod"></div>
					</div>
					<div class="boxfoot"></div>
				</div>
				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<!-- <div class="titleleft"><img src="<%=rootPath%>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
						<div class="titleMiddle">
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">每月每日检测量/合格率统计</a>
						</div>
					</div>
					<div class="allnav" id="areaMyMrJclHglByMethod"></div>
					<div class="boxfoot"></div>
				</div>

				<div class="boxall" style="height: 3.2rem">
					<div class="alltitle">
						<div class="titleMiddle">
							<!-- 标题 -->
							<a style="text-decoration:none;color:#94CBFF;" href="#"
								onclick="toQualifieList();">每天每时检测量/合格率最高的时间段</a>
						</div>
					</div>
					<!-- 图表容器 -->
					<div class="allnav" id="areaMtMsJclHglByMethod"></div>
					<div class="boxfoot"></div>
				</div>

				<div class="bar">
					<div class="barbox2">
						<ul class="clearfix">
							<li class="pulll_left" style="width:50%">检测总量</li>
							<li class="pulll_left" style="width:50%"
								onclick="loadJczlDayjclByTimer()">当日检测</li>
						</ul>
					</div>
					<div class="barbox">
						<ul class="clearfix">
							<li class="pulll_left counter" style="width:50%"><span
								id="jczlNums">0</span></li>
							<li class="pulll_left counter" style="width:50%" id='drjclNums'>0</li>
						</ul>
					</div>
				</div>

			</li>
		</ul>
	</div>
	<div class="back"></div>
	<script src="<%=rootPath%>/js/sjtj/qualifiedCharts.js"
		type="text/javascript"></script>
</body>
</html>
