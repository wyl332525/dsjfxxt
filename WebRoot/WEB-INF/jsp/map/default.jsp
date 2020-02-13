<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <%@ include file="../common/common.jsp"%>
    <link href="favicon.ico" rel="shortcut icon" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no" />
    <!-- 配置文件 -->
    <script src="<%=rootPath %>/js/map/Scripts/config/config.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/config/mapconfig.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/config/mapconfigUrl.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/plugins/bootstraptable/bootstrap-table.js"></script>
    <!--**** arcgis地图样式
    <script type="text/javascript">
        document.write("<link rel='Stylesheet' type='text/css' href='" + _arcgisJSAPIUrl_Themes + "'/>");
        document.write("<link rel='stylesheet' type='text/css' href='" + _arcgisJSAPIUrl_Esricss + "'/>");
    </script> ****-->
 <!--**** arcgis地图样式 ****-->
    <link rel='stylesheet' type='text/css' href='<%=rootPath %>/js/map/3.13/dijit/themes/tundra/tundra.css' />
    <link rel='stylesheet' type='text/css' href='<%=rootPath %>/js/map/3.13/esri/css/esri.css' />
	<!-- player skin -->
    <link rel="stylesheet" href="<%=rootPath %>/js/map/Scripts/plugins/flowplayer/skin/functional.css">
	<!-- include flowplayer -->
    <script src="<%=rootPath %>/js/map/Scripts/plugins/flowplayer/flowplayer.min.js"></script>

    <link href="<%=rootPath %>/js/map/CSS/default.css" rel="stylesheet" />
    <link href="<%=rootPath %>/js/map/Scripts/plugins/bootstraptable/bootstrap-table.css" rel="stylesheet" />
    <script src="<%=rootPath %>/js/map/Scripts/plugins/charts/highcharts/highcharts.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/plugins/charts/highcharts/highcharts-3d.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/plugins/charts/highcharts/highcharts-more.js"></script>

    <!--**** arcgis组件路径 ****-->
    <script type="text/javascript">
        var dojoConfig = {
            packages: [
                { name: 'widgets', location: location.pathname.replace(/\/[^/]+$/, "") + '/Scripts/plugins/widgets' },
                { name: 'plugins', location: location.pathname.replace(/\/[^/]+$/, "") + '/Scripts/plugins' },
                { name: 'Scripts', location: location.pathname.replace(/\/[^/]+$/, "") + '/Scripts' }
            ]
        };
        var rootPath=parent.rootPath;
    </script>
    <script type="text/javascript" src="../../js/common/webVideoCtrl.js"></script>

    <!--**** arcgis初始化脚本 
    <script type="text/javascript">
        document.write("<script src='" + _arcgisJSAPIUrl_Init + "'><\/script>");
    </script>****-->
	<script src="<%=rootPath %>/js/map/3.13/init.js"></script>
    <!--地图操作接口-->
    <script src="<%=rootPath %>/js/map/Scripts/custom/coustomTool.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/mainMap.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/custom/interface.js"></script>
    <script src="<%=rootPath %>/js/map/Panel/InitialPage.js"></script>
    <script src="<%=rootPath %>/js/map/Scripts/dafault.js"></script>
	 <!--实时视频预览-->
</head>
<body class="tundra">
    <!--菜单-->
   <div class="menus" style="display:none;">
        <div class="title">
            专题图层
        </div>
        <div class="menu">
            <label for="yczt" class="active">
                <input type="checkbox" name="name" value=" " id="yczt" />
                遥测点位信息专题
            </label>
           <label for="historyGj" id="historyLable" style="display:none;">
                <input type="checkbox" name="name" value=" " id="historyGj" />
                车辆历史轨迹
            </label>
        </div>
        <span></span>
    </div>
    <!--空气质量六因子-->
    <div class="airQualityMenus" style="display:none;">
        <div class="title">
           	 空气质量六因子
        </div>
        <div class="menu">
            <table>
            	<tr>
            		<td class="tTitle">PM2.5</td>
            		<td class="tTitle">PM10</td>
            		<td class="tTitle">CO</td>
            	</tr>
            	<tr>
            		<td id="pm25"></td>
            		<td id="pm10"></td>
            		<td id="co"></td>
            	</tr>
            	<tr>
            		<td class="tTitle">SO<sub>2</sub></td>
            		<td class="tTitle">O<sub>3</sub></td>
            		<td class="tTitle">NO<sub>2</sub></td>
            	</tr>
            	<tr>
            		<td id="so2"></td>
            		<td id="o3"></td>
            		<td id="no2"></td>
            	</tr>
            </table>
        </div>
        <span></span>
     </div>
    <!--图例-->
    <div id="legend"  style="display:none;">
        <div class="title">
            图例
            <span class="close" onclick="legendClose()"></span>
        </div>
        <div>
            <span class="legend" style="background-color: #f8b945;"></span>车流总量
        </div>
        <div>
            <span class="legend"></span>合格
        </div>
        <div>
            <span class="legend legendNo"></span>不合格
        </div>
    </div>
    <span id="legends" onclick="legendOpen()">图例</span>
    <!--工具栏-->
    <ul class="toolbar">
        <li>
            <span class="zoomIn"></span>
            <span class="span_hover">放大</span>
        </li>
        <li>
            <span class="zoomOut"></span>
            <span class="span_hover">缩小</span>
        </li>
        <!--<li>
            <span class="ceLiang" onclick="btn_measure(0)"></span>
            <span class="span_hover">测量</span>
        </li>
        <li>
            <span class="vedio"></span>
            <span class="span_hover">视频</span>
        </li>-->
        <li>
            <span class="quanping1"></span>
            <span class="span_hover">全屏</span>
        </li>
        
        <li>
            <span class="quanping2"></span>
            <span class="span_hover">退出全屏</span>
        </li>
        <!-- <li>
            <span class="delete"></span>
            <span class="span_hover">删除</span>
        </li>-->
    </ul>
    <!--右侧面板-->
    <div id="rightDiv" style="display:none;">
        <span class="hideShow"></span>
        <div class="jctj">
            <b></b>
            <div class="title">
                <img src="img/jiancetongji.png" alt="Alternate Text" />
                监测统计
                <span class="date">
                    2017-12-18
                </span>
            </div>
            <div class="onlineTj">
                <table>
                    <tr>
                        <td>在线点位</td>
                        <td>监测总数</td>
                        <td>合格</td>
                        <td>不合格</td>
                        <td>无效数据</td>
                    </tr>
                    <tr class="monitorTJ">
                        <td class="onlineD">30</td>
                        <td class="jcCount">2000</td>
                        <td class="qualified">1440</td>
                        <td class="noNualified">300</td>
                        <td class="noUse">60</td>
                    </tr>
                </table>
            </div>
            <!--统计图-->
            <div id="tjCharts">

            </div>
        </div>
        <div class="jkyj">

            <b></b>
            <div class="title">
                <img src="img/biaoqian_lv.png" alt="Alternate Text" />
                当日实时监控预警
            </div>
            <div class="tableTj">
                <table id="tableTj"></table>
            </div>
        </div>
    </div>
    <!--视频弹窗-->
    <div id="videoTc">
        <div class="title">
            实时视频预览           
            <span class="videoClose"></span>
            <span class="fullScreen"></span>
        </div>
        <div id="maindiv" class="video">
             <!-- the player -->
		   <!-- <div class="flowplayer" data-swf="flowplayer.swf" data-ratio="0.4167">
		      <video>
		         <source type="video/mp4" src="http://jq22com.qiniudn.com/jq22com.mp4">
		      </video>
		   </div> -->
        </div>
    </div>
    <!--详情页面-->
    <div id="detailPage">
        <div class="title">
            遥测信息展示
            <span class="detailPageTitle"></span>
        </div>
        <div class="detailPageTable">
            <table id="detailPageTable">
                <thead>
                    <tr>
                        <td>车牌号</td>
                        <td>监测时间</td>
                        <td>是否合格</td>
                        <td>是否有效</td>
                        <td>速度<br>(km/h)</td>
                        <td>加速度<br>(m/s2)</td>
                        <td>VSP</td>
                        <td>CO2<br>(%)</td>
                        <td>CO<br>(%)</td>
                        <td>HC<br>(ppm)</td>
                        <td>不透光烟度<br>(%)</td>
                        <td>温度<br>(℃)</td>
                        <td>湿度<br>(%)</td>
                        <td>大气压<br>(kPa)</td>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
    <!--地图-->
    <div class="mapDiv">
        <div id="map" class="map">

        </div>
        <div id="PositionBar"></div>
    </div>

</body>

</html>
