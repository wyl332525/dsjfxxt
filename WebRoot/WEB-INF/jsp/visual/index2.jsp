<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<%@ include file="../common/common.jsp"%>
		<title>机动车大数据分析可视化系统</title>
	    <!--css引用-->
	    <link rel="stylesheet" href="<%=rootPath %>/css/visual/common.css">
	    <link rel="stylesheet" href="<%=rootPath %>/css/visual/index.css">
	    <!--3、滑块插件-->
	    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
	    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />
	    
		<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
		<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
	    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
		
	    <script>
			$(window).load(function(){  
				$(".loading").fadeOut();
            });
				
			$(document).ready(function(){
				var whei=$(window).width();
				$("html").css({fontSize:whei/20});
				$(window).resize(function(){
					var whei=$(window).width();
					$("html").css({fontSize:whei/20});
				});
			});
		</script>
		<script src="<%=rootPath %>/js/plugins/echarts/echarts.min.js" type="text/javascript"></script>
	    <script src="<%=rootPath %>/js/visual/index.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/countUp.js" type="text/javascript"></script>
	</head>
	
	<body>
		<div class="canvas" style="opacity: .2">
			<iframe frameborder="0" src="<%=rootPath %>/js/visual/index.html" style="width: 100%; height: 100%"></iframe>
		</div>
		<div class="loading">
		<div class="loadbox"> <img src="<%=rootPath %>/img/picture/loading.gif"> 页面加载中... </div>
		</div>
		<div class="head">
			<h1 style="color:#D0E5FE">机动车大数据分析可视化系统</h1>
			<ul style="height: 30px; margin-bottom: 0px;">
	            <li class="l_left total_chose_fr nav_active">实时监测</li>
	            <li class="l_left total_chose_pl" >统计分析一</li>
	            <li class="l_left total_chose_pl">统计分析二</li>
	            <li class="r_right total_chose_pl">统计分析三</li>
	            <li class="r_right total_chose_pl">统计分析四</li>
	            <li class="r_right total_chose_pl">统计分析五</li>
	        </ul>
			<div class="weather"><span id="showTime"></span></div>
			<script>
				var t = null;
    			t = setTimeout(time,1000);
    			function time(){
	       			clearTimeout(t);
					var dateStr = '';	
					var curDate = new Date();
					var year = curDate.getFullYear();		//获取年
					var month = curDate.getMonth()+1;		//获取月份
					month = month>=10?month:"0"+month;
					var daysOfMonth = curDate.getDate();	//获取日期
					daysOfMonth = daysOfMonth>=10?daysOfMonth:"0"+daysOfMonth;
					
					var hours = curDate.getHours();			//获取小时
					var minute = curDate.getMinutes();		//获取分钟
					var seconds = curDate.getSeconds();		//获取秒
					
					var daysOfWeek = curDate.getDay();		//获取星期
					
					hours=hours>=10?hours:"0"+hours;
					minute = minute>=10?minute:"0"+minute;
					seconds = seconds>=10?seconds:"0"+seconds;
					
					var weeks = ['周日','周一','周二','周三','周四','周五','周六'];		//下标0刚好与获取星期几相同  代表周日
					dateStr = year+"年"+month+"月"+daysOfMonth+"日"+" "+weeks[daysOfWeek]+" "+hours+":"+minute+":"+seconds;
		
				    document.getElementById("showTime").innerHTML = dateStr;
				    t = setTimeout(time,1000);
				}//设定定时器，循环运行     
			</script>
		</div>
		
		<div class="mainbox">
			<ul class="clearfix">
				<li>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<!-- <div class="titleleft"><img src="<%=rootPath %>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
							<div class="titleMiddle">
								<a style="text-decoration:none;color:#94CBFF;" href="#" onclick="toQualifieList();">近一个月机动车检测量</a>
							</div>
							<!-- <div class="titleright"><img src="<%=rootPath %>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
						</div>
						<div class="allnav" id="echart1"></div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<!-- <div class="titleleft"><img src="<%=rootPath %>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
							<div class="titleMiddle">
								<a style="text-decoration:none;color:#94CBFF;" href="#" onclick="toQualifieList();">全年柴油车检测量</a>
							</div>
							<!-- <div class="titleright"><img src="<%=rootPath %>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
						</div>
						<div class="allnav" id="echart2"></div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div style="height:100%; width: 100%;">
							<div class="sy" id="fb1"></div>
							<div class="sy" id="fb2"></div>
							<div class="sy" id="fb3"></div>
						</div>
						<div class="boxfoot">
			
						</div>
					</div>
				</li>
				<li>
					<div class="bar">
						<div class="barbox2">
							<ul class="clearfix">
								<li class="pulll_left">总检测次数</li>
								<li class="pulll_left">当日检测数</li>
								<li class="pulll_left">异常数据</li>
							</ul>
						</div>
						<div class="barbox">
							<ul class="clearfix">
								<li class="pulll_left counter"><span id="carsnums"></span></li>
								<li class="pulll_left counter"><span id="jcxnums"></span></li>
								<li class="pulll_left counter">0</li>
							</ul>
						</div>
						
					</div>
					<div class="map">
						<div class="map1"><img src="<%=rootPath %>/img/picture/lbx.png"></div>
						<div class="map2"><img src="<%=rootPath %>/img/picture/jt.png"></div>
						<div class="map3"><img src="<%=rootPath %>/img/picture/map.png"></div>
						<div class="map4" id="map_1"></div>
					</div>
				</li>
				<li>
					<div class="boxall" style="height:3.4rem">
						<div class="alltitle">
							<!-- <div class="titleleft"><img src="<%=rootPath %>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
							<div class="titleMiddle">
								<a style="text-decoration:none;color:#94CBFF;" href="#" onclick="toQualifieList();">实时检测车辆</a>
							</div>
							<!-- <div class="titleright"><img src="<%=rootPath %>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
						</div>
						<div class="allnav" id="echart4">
								<marquee id="gdnr" direction="up" scrollamount="2" loop="-1" behavior="scroll" onMouseOver="this.stop()" onMouseOut="this.start()" style="height:100%;">
									<table id="gdnr1" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
									</table>
								</marquee>
						</div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3.2rem">
						<div class="alltitle">
							<!-- <div class="titleleft"><img src="<%=rootPath %>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
							<div class="titleMiddle">
								<a style="text-decoration:none;color:#94CBFF;" href="#" onclick="toQualifieList();">复检合格率统计</a>
							</div>
							<!-- <div class="titleright"><img src="<%=rootPath %>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
						</div>
						<div class="allnav" id="echart5">
							<table id="yieldTable" border="0" cellspacing="0" cellpadding="0">
							</table>
						</div>
						<div class="boxfoot"></div>
					</div>
					<div class="boxall" style="height: 3rem">
						<div class="alltitle">
							<!-- <div class="titleleft"><img src="<%=rootPath %>/img/visual/zjt.png" style="height:.2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div> -->
							<div class="titleMiddle">
								<a style="text-decoration:none;color:#94CBFF;" href="#" onclick="toQualifieList();">检测方法合格率分布</a>
							</div>
							<!-- <div class="titleright"><img src="<%=rootPath %>/img/visual/yjt.png" style="height:.2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div> -->
						
						</div>
						<div class="allnav" id="echart6"></div>
						<div class="boxfoot"></div>
					</div>
				</li>
			</ul>
		</div>
		
		<div class="back"></div>
		<script src="<%=rootPath %>/js/visual/china.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/visual/area_echarts.js" type="text/javascript"></script>
	</body>
</html>
