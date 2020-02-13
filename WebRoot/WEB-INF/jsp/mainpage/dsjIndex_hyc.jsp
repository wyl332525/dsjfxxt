<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<html>
	<head>
		<meta name="renderer" content="webkit" /> 
		<%@ include file="../common/common.jsp"%>
		<title></title>
	    <!--2、echart4组件引用-->
	    <script src="<%=rootPath %>/js/jxh/echarts.js" type="text/javascript"></script>
	    <!--3、滑块插件-->
	    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/powerange.css" />
	    <link rel="stylesheet" href="<%=rootPath %>/css/jxh/bk.css" />
		<script src="<%=rootPath %>/js/jxh/powerange.js"></script>
		<script src="<%=rootPath %>/js/jxh/my_scrollbar.js" type="text/javascript" charset="utf-8"></script>
		
	    <script type="text/javascript" src="<%=rootPath %>/js/jxh/jqmeter.min.js"></script>
		<!--4、页面自编辑文件的引用-->
		<link rel="stylesheet" type="text/css" href="<%=rootPath %>/css/jxh/dsjIndex.css"/>
		<script src="<%=rootPath %>/js/jQuery.fontFlex.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/dsjIndex.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/countUp.js" type="text/javascript"></script>
		<script src="<%=rootPath %>/js/jxh/map.js" type="text/javascript"></script>
		<%
			String area = request.getParameter("area");
		%>
		<script type="text/javascript">
			var area = '<%=area%>';
		</script>
		<style type="text/css">
			.BMap_cpyCtrl {
	            display: none;
	        }
	 
	        .anchorBL {
	            display: none;
	        }
		</style>
		
		<!--<script type="text/javascript" src="http://developer.baidu.com/map/custom/stylelist.js"></script> -->
		<%
    	String stationPkid = request.getParameter("stationPkid");
     %>
     <!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=GWRZs1s8TPOzB0qN3O5OxXBfQZd1VT1n"></script> -->
     <script type="text/javascript">
     	var stationPkid ='<%=stationPkid %>';
     </script>
	</head>
	<body>
		<div id="header">
			<div class="rqk" id="curTime">
			</div>
			<label class="mainText"><%=xt_title %></label>
			<div class="ywxtBg" onclick="aaaaa();">进入业务系统</div>
		</div>
		<div id="main">
			<div id="mainLeft">
				<div id="mainLeftTop">
					<div class="maintitle">
						<div class="titleleft"><img src="<%=rootPath %>/img/jxh/zjt.png" style="height:2rem;float:right;cursor:pointer;" onclick="leftClick1();"></img></div>
						<div class="titleMiddle">
							<a style="text-decoration:none;color:#00cffd;" href="#" onclick="toQualifieList();">综合检测概况</a>
						</div>
						<div class="titleright"><img src="<%=rootPath %>/img/jxh/yjt.png" style="height:2rem;float:left;cursor:pointer;" onclick="rightClick1();"></img></div>
					</div>
					
					<div id="textSum_l0">
						<div class="staticeNumber">
							<label class="leftText">近一月机动车检测</label>
		                    <div class="NumberDiv" id="aa0">
		                       
		                    </div>
		                    <label class="rightText">辆</label>
	                    </div>
					</div>
					
					<div id="yield_l0">
					</div>
					
					<div id="textSum_l1">
						<div class="staticeNumber">
							<label class="leftText">近半年机动车检测</label>
		                    <div class="NumberDiv" id="aa1">
		                       
		                    </div>
		                    <label class="rightText">辆</label>
	                    </div>
					</div>
					
					<div id="yield_l1">
					</div>
					
					<div id="textSum_l2">
						<div class="staticeNumber">
							<label class="leftText">近一年机动车检测</label>
		                    <div class="NumberDiv" id="aa2">
		                       
		                    </div>
		                    <label class="rightText">辆</label>
	                    </div>
					</div>
					
					<div id="yield_l2">
					</div>
				</div>
				
				<div id="mainLeftMiddle">
					<div class="maintitle">
						<div class="titleleft"><img src="<%=rootPath %>/img/jxh/zjt.png" style="height:2rem;float:right;cursor:pointer;" onclick="leftClick2();"></img></div>
						<div class="titleMiddle">
							<a style="text-decoration:none;color:#00cffd;" href="#" onclick="hbcyjctj();">柴油车检测量</a>
						</div>
						<div class="titleright"><img src="<%=rootPath %>/img/jxh/yjt.png" style="height:2rem;float:left;cursor:pointer;" onclick="rightClick2();"></img></div>
					</div>
					<div id="textSum1_l0">
						<div class="staticeNumber">
							<label class="leftText">全年柴油车检测</label>
		                    <div class="NumberDiv" id="bb0">
		                        
		                    </div>
		                    <label class="rightText">辆</label>
	                    </div>
					</div>
					
					<div id="yield1_l0">
					</div>
					
					<div id="textSum1_l1">
						<div class="staticeNumber">
							<label class="leftText">全年机动车检测</label>
		                    <div class="NumberDiv" id="bb1">
		                        
		                    </div>
		                    <label class="rightText">辆</label>
	                    </div>
					</div>
					
					<div id="yield1_l1">
					</div>
				</div>
				<div id="mainLeftBottom">
					<div class="titlenew">
						<a style="text-decoration:none;color:#00cffd;" href="#" onclick="dshgltj();">检测方法比重</a>
					</div>
					<div id="textMessage">
					</div>
				</div>
			</div>
			<div id="mainMiddle">
				<div id="chart3">
				</div>
				<div id="mainMessage">
				<!-- 
					<div id='mleft1'>
						<div id='mleft1top'>
							<div class='title3' onclick="towgalList()">违规案例</div>
							<div id='mleftbottom2'>
								<div style="margin-top:10%;">
									<label>共</label>
									<label id="wgalzs" class="numItem"></label>
									<label>个违规案例</label>
								</div>
							</div>
						</div>
						<div id='mleft1bottom'>
							<div class='title3' onclick="toYZYDList()">一站一档</div>
							<div id='mleftbottom2'>
								<div style="margin-top:10%;" id="yzydnum">
									<label>共</label>
									<label id="jczzs" class="numItem"></label>
									<label>家检验机构</label>
								</div>
							</div>
						</div>
						
					</div> -->
					<div id='mleft2'>
						<div class='title4'>实时检测车辆</div>
						<div id="yield1">
							<marquee id="gdnr" direction="up" scrollamount="2" loop="-1" behavior="scroll" onMouseOver="this.stop()" onMouseOut="this.start()" style="height:17rem;">
								<table id="gdnr1" border="0" cellspacing="0" cellpadding="0" style="width:100%;">
								</table>
							</marquee>
						</div>
					</div>
					<!-- 
					<div id='mleft3'>
						<div id='mleft3top'>
							<div class='title3' onclick="toycsjList()">异常数据</div>
							<div id='mleftbottom2'>
								<div style="margin-top:10%;">
									<label>已发现</label>
									<label class="numItem1" id='ycsjzs'>233835</label>
									<label>条<br>异常数据</label>
								</div>
							</div>
						</div>
						<div id='mleft3bottom'>
							<div class='title3' onclick="toYCYDList()">一车一档</div>
							<div id='mleftbottom2'>
								<div style="margin-top:10%;">
									<label>共</label>
									<label class="numItem2" id='clsjzs'></label>
									<label>条<br>车辆数据</label>
								</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
			<div id="mainRight">
				<div id="mainRightTop">
					<!-- 
					<div style="color:#4EF0FE;margin-left:16px;">注：柱状图代表检测总量，折线图代表工况率</div>
					<div id="chartx">
					</div> -->
					<div class="textSumNew">
						<div class="textSumDiv textSumDiv1">
							总检测次数
						</div>
						<div class="textSumDiv textSumDiv2">
							当日检测数
						</div>
						<div class="textSumDiv textSumDiv5" style="cursor: pointer;" onclick="toYZYDList();">
							一站一档
						</div>
						<div id="carsnums" class="textSumDiv textSumDiv3">
						</div>
						<div id="jcxnums" class="textSumDiv textSumDiv4">
						</div>
						<div id="jczzs" class="textSumDiv textSumDiv6" style="cursor: pointer;" onclick="toYZYDList();">
						</div>
					</div>
					<div class="textSumNew">
						<div class="textSumDiv textSumDiv10" style="cursor: pointer;" onclick="toYCYDList();">
							一车一档
						</div>
						<div class="textSumDiv textSumDiv8" style="cursor: pointer;" onclick="toycsjList();">
							异常数据
						</div>
						<div class="textSumDiv textSumDiv12" style="cursor: pointer;" onclick="towgalList();">
							作弊案例库
						</div>
						<div id="clsjzs" class="textSumDiv textSumDiv110" style="cursor: pointer;" onclick="toYCYDList();">
						</div>
						<div id="ycnums" class="textSumDiv textSumDiv88">
						</div>
						<div id="wgalzs" class="textSumDiv textSumDiv112" style="cursor: pointer;" onclick="towgalList();">
						</div>
					</div>
				</div>
				<div id="mainRightMiddle">
					<div id="jcxDiv" class="title">
						<a style="text-decoration:none;color:#00cffd;" href="#" onclick="toSurveyList();">黑烟车抓拍记录</a>
					</div>
					<div id="yield2">
						<table border="0" cellspacing="0" cellpadding="0" style="width:100%;">
						<tr>
							<td class='gdcp'><div class='gdcp1'>云F09112</div></td>
							<td class='gdsj'>2019-11-28 14:35:12</td>
							<td class='gdsj'>玉江大道</td>
							<td class='gdsj'>黑度1级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云FA3221</div></td>
							<td class='gdsj'>2019-11-28 14:37:12</td>
							<td class='gdsj'>西河路</td>
							<td class='gdsj'>黑度2级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云FD3228</div></td>
							<td class='gdsj'>2019-11-28 15:31:12</td>
							<td class='gdsj'>玉江大道</td>
							<td class='gdsj'>黑度1级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云F09112</div></td>
							<td class='gdsj'>2019-11-28 15:52:31</td>
							<td class='gdsj'>西河路</td>
							<td class='gdsj'>黑度3级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云FSF422</div></td>
							<td class='gdsj'>2019-11-28 14:31:12</td>
							<td class='gdsj'>西河路</td>
							<td class='gdsj'>黑度4级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云F59002</div></td>
							<td class='gdsj'>2019-11-29 14:33:12</td>
							<td class='gdsj'>玉江大道</td>
							<td class='gdsj'>黑度2级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云F52021</div></td>
							<td class='gdsj'>2019-11-29 16:12:05</td>
							<td class='gdsj'>玉江大道</td>
							<td class='gdsj'>黑度2级</td>
						</tr>
						<tr>
							<td class='gdcp'><div class='gdcp1'>云F98021</div></td>
							<td class='gdsj'>2019-11-29 17:36:58</td>
							<td class='gdsj'>玉江大道</td>
							<td class='gdsj'>黑度2级</td>
						</tr>
						
						</table>
		                
		                <!--
		                <table id="yieldTable" border="0" cellspacing="0" cellpadding="0">
						</table>
						-->
                    </div>
				</div>
				<div id="mainRightBottom">
					<div id="jcxDiv" class="title">
						<a style="text-decoration:none;color:#00cffd;" href="#" onclick="sqxx();">黑烟车数据统计</a>
					</div>
					<div id="yield3">
		                
                    </div>
					<!-- 
					<div id="chart22">
						<div style="color:#4EF0FE;margin-left:45px;">申请修改车辆信息</div>
						<span style="margin-left:10px;">检测站</span>
						<span style="margin-left:75px;">申请数量</span>
						<table id="sqsl3" border="0" cellspacing="0" cellpadding="0">
						</table>
					</div>
					<div id="chart33">
						<div style="color:#4EF0FE;margin-left:45px;">申请修改检测方法</div>
						<span style="margin-left:10px;">检测站</span>
						<span style="margin-left:75px;">申请数量</span>
						<table id="sqsl2" border="0" cellspacing="0" cellpadding="0">
						</table>
					</div>
					 -->
				</div>
				<!-- 
				<div id="alarmMessage">
					<table id="alarmMessageTable" border="0" cellspacing="0" cellpadding="0">
					</table>
				</div> -->
			</div>
		</div>
		<div id="winddd" class="easyui-window" title="My Window" style="width:800px;height:600px"   
		        data-options="iconCls:'icon-save',modal:true,closed:true">   
		</div>  

	</body>
</html>
