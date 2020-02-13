/*
* 地图上添加点位
* 作者: gis
* 日期：2017-9-26
* 版本：V1.0.0
*/

//全局变量
var drawGraphicsLayer, ecologicalLayer, GridLayer;
var point_ID = "GL_PointCover_";


//设置覆盖物样式
function GetCoverStyle(datatype, json, i) {
    var html = "";
    var symbol = null;
    var returnStyle = new Array();
    try {
        require([
        "esri/symbols/PictureMarkerSymbol"
        , "esri/symbols/SimpleMarkerSymbol"
        , "esri/symbols/SimpleLineSymbol"
        , "esri/Color"
        ], function (PictureMarkerSymbol, SimpleMarkerSymbol, SimpleLineSymbol, Color) {

            //初始化数据
            var id = json.p_id;
            var lon = json.p_lon;
            var lat = json.p_lat;
            var name = json.p_name;
            var value = json.p_value;


            //value值进行处理
            if (value == null || value == "" || value.toString().toUpperCase() == "NAN") {
                value = '-';
            }

            //①添加SimpleMarkerSymbol标记和带名称的html覆盖物
            var level = null;
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 5, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1), new Color([255, 0, 0]));//带名称覆盖物旁边的点状标记
            if (datatype == "airHour_City") {
                //城市小时
                level = coustomTool.getCityAirLveAndColor(value);//未处理类型，需修改
                if (level) {
                    html += "<div id='ring" + i + "' class='ring'>";
                    html += "<div id = 'div_mapIcoDiv" + i + "' name='" + name + "' title='" + name + "' lon='" + lon + "' lat='" + lat + "' value='" + value + "' pointcode='" + id + "'  class = 'class_mapIcoDiv'>";
                    html += "<div class = 'aqi_tip_name' style='border:1px solid " + level.borderColor + "'>" + name + "</div>";
                    html += "<div class = 'aqi_tip_value' style='background: url(IMG/points/" + level.imgColor + ") no-repeat'>" + value + "</div>";
                    html += "</div>";
                    html += "</div>";
                }
            }
            else {

            }

            //pointSymbl = esri.symbol.PictureMarkerSymbol({ "url": "IMG/MapIcons/居民小区村庄.png", "height": 12, "width": 12, "yoffset": 12, "type": "esriPMS" });
            //polygonSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([0, 0, 255, 0.35]), 1), new dojo.Color([125, 125, 125, 0.35]));


            //②添加PictureMarkerSymbol覆盖物
            if (datatype == "online" || datatype == "polluter_general") {
                symbol = new PictureMarkerSymbol('IMG/Polluter/GYWRY.png', 20, 20);
                if (json.SuperviseType == "01") {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/国控.png', 20, 20);
                }
                else if (json.SuperviseType == "02") {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/省控.png', 20, 20);
                }
                else if (json.SuperviseType == "03") {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/市控.png', 20, 20);
                } else {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/其他.png', 20, 20);
                }
            }
            else if (datatype == "polluter_gas") {
                symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/GYWRY.png', 20, 20);
                if (json.OnlineStatus == null) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGas/废气-灰色.png', 20, 20);
                }
                else if (json.OnlineStatus == 0) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGas/废气-灰色.png', 20, 20);
                }
                else if (json.OnlineStatus == 1) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGas/废气-绿色.png', 20, 20);
                }
                else if (json.OnlineStatus == 2) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterGas/废气-红色.png', 20, 20);
                }
            }
            else if (datatype == "polluter_water") {
                symbol = new PictureMarkerSymbol('IMG/points/polluterGeneral/GYWRY.png', 20, 20);
                if (json.OnlineStatus == null) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterWater/废水-灰色.png', 20, 20);
                }
                else if (json.OnlineStatus == 0) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterWater/废水-灰色.png', 20, 20);
                }
                else if (json.OnlineStatus == 1) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterWater/废水-绿色.png', 20, 20);
                }
                else if (json.OnlineStatus == 2) {
                    symbol = new PictureMarkerSymbol('IMG/points/polluterWater/废水-红色.png', 20, 20);
                }
            }
            else if (datatype == "airHour_Station") {
                level = coustomTool.getStationAirLveAndColor(value);
                symbol = new PictureMarkerSymbol({ "url": "IMG/points/" + level.imgColor, "width": 18, "height": 24, "yoffset": 12 });
            }
            else if (datatype == "radiation") {
                symbol = new PictureMarkerSymbol('IMG/MapIcons/Radiation.png', 24, 24);
            }
            else if (datatype == "WaterDrink") {
                //$("body").append(html);
                symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_7.png', 20, 20);
                if (json.p_value == "Ⅰ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_1.png', 20, 20);
                }
                else if (json.p_value == "Ⅱ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_2.png', 20, 20);
                }
                else if (json.p_value == "Ⅲ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_3.png', 20, 20);
                }
                else if (json.p_value == "Ⅳ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_4.png', 20, 20);
                }
                else if (json.p_value == "Ⅴ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_5.png', 20, 20);
                }
                else if (json.p_value == "劣Ⅴ") {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_6.png', 20, 20);
                }
                else {
                    symbol = new PictureMarkerSymbol('IMG/points/WaterSurface/water_7.png', 20, 20);
                }
            }
            else if (datatype == "jczxx") {
                symbol = new PictureMarkerSymbol('IMG/point/zhandian2.png', 28, 35);
                html += "<div id='ring_" + datatype + "_" + i + "' class='ring_" + datatype + "' style='width:100px;height:120px;'></div>";
            }
            returnStyle.push(html);
            returnStyle.push(symbol);
        });

    } catch (e) {
        returnStyle = new Array();
        returnStyle.push(null);
        returnStyle.push(null);
    }
    return returnStyle;
}


//地图上添加点位
function map_AddPointInfoToMap(datatype, json, popWindowParam) {
    /// <param name="datatype" type="string">业务模块类型</param>
    /// <param name="json" type="object">点位数据</param>
    /// <param name="popWindowParam" type="">popWindowUrl, urlParam, popWidth, popHeight</param>
    /// <returns type=""></returns>
    require([
         "esri/geometry/Point"
        , "esri/layers/GraphicsLayer"
        , "esri/graphic"
        , "esri/symbols/PictureMarkerSymbol"
        , "esri/symbols/SimpleMarkerSymbol"
        , "esri/symbols/SimpleLineSymbol"
        , "esri/symbols/PictureFillSymbol"
        , "esri/Color"
        , "esri/config"
        , "esri/dijit/PopupTemplate"
        , "esri/renderers/ClassBreaksRenderer"
        //, "widgets/ClusterLayer"
    ], function (Point, GraphicsLayer, Graphic, PictureMarkerSymbol, SimpleMarkerSymbol, SimpleLineSymbol, PictureFillSymbol, Color, config, PopupTemplate, ClassBreaksRenderer/*, ClusterLayer*/) {
        console.log("json   ", json);
        //参数初始化
        if (json == null) {
            json = [];
        }

        var html = "";
        var symbol = null;

        if (json != null) {

            //检查图层是否存在
            var layerTestExist = map.getLayer(point_ID + datatype);
            if (layerTestExist) {
                layerTestExist.clear();
                map.removeLayer(layerTestExist);
            }

            //创建图层
            drawGraphicsLayer = new GraphicsLayer({ id: point_ID + datatype });
            map.addLayer(drawGraphicsLayer, 50);
            //drawGraphicsLayer.on("click", layerClick);
            //drawGraphicsLayer.on("mouse-over", mouseOverLayer);
            //drawGraphicsLayer.on("mouse-out", mouseOutLayer);

            var multipoint = new esri.geometry.Multipoint(); //查询到的点集合
            var pointArr = new Array(); //(用于聚合)

            //设置覆盖物样式并添加覆盖物到地图
            for (var i = 0; i < json.length; i++) {
                //初始化数据
                var lon = json[i].p_lon;
                var lat = json[i].p_lat;

                //添加覆盖物
                html = "";
                symbol = null;

                var coverStyle = mapShowPoints.GetCoverStyle(datatype, json[i], i);
                html = coverStyle[0];
                symbol = coverStyle[1];

                //添加html覆盖物到地图
                $("body").append(html);

                //添加点位到地图
                var point = new Point(lon, lat, map.spatialReference);
                var screenPnt = map.toScreen(point);
                multipoint.addPoint(point);

                var graphic = new Graphic(point, symbol, json[i]);

                drawGraphicsLayer.add(graphic);
                pointArr.push({ x: lon, y: lat, attributes: json[i] });

                //设置标签离覆盖物偏移距离
                $("#ring" + i).css({ "left": screenPnt.x - 19 + "px", "top": screenPnt.y - 26 + "px", "position": "absolute", "z-index": "40", "cursor": "pointer" });

                $("#ring_" + datatype + "_" + i).css({ "left": screenPnt.x - 48 + "px", "top": screenPnt.y - 126 + "px", "position": "absolute", "z-index": "39", "cursor": "pointer" });

                loadChartOnMap("#ring_" + datatype + "_" + i, [json[i]["qualifiedNumber"]], [json[i]["unqualifiedNumber"]]);
            }


            ////设置动画
            //$(".class_mapIcoDiv").animo({ animation: ["rollIn"], duration: 0.5 });
            //$(".class_mapIcoDiv").bind("mouseover", function () {
            //    $(this).animo({ animation: ["pulse"], duration: 0.5 });
            //});

            //开始平移
            var panStart = dojo.connect(map, "onPanStart", function () {
                $(".ring").css("display", "none");
                $(".esriPopup").css("display", "none");
                $(".ring_" + datatype).css("display", "none");
            });
            //平移结束
            var panEnd = dojo.connect(map, "onPanEnd", function () {
                for (var i = 0; i < json.length; i++) {
                    var x = json[i].p_lon;
                    var y = json[i].p_lat;
                    var point = new Point(x, y, map.spatialReference);
                    screenPnt = map.toScreen(point);
                    $("#ring" + i).css({ "left": screenPnt.x - 19 + "px", "top": screenPnt.y - 26 + "px", "position": "absolute", "display": "block", "z-index": "40" });

                    $("#ring_" + datatype + "_" + i).css({ "left": screenPnt.x - 48 + "px", "top": screenPnt.y - 126 + "px", "position": "absolute", "z-index": "39", "cursor": "pointer" });
                }
                $(".ring").css("display", "block");
                $(".esriPopup").css("display", "block");
                $(".ring_" + datatype).css("display", "block");
            });
            //开始缩放
            var zoomStart = dojo.connect(map, "onZoomStart", function () {
                $(".ring").css("display", "none");
                $(".esriPopup").css("display", "none");
                $(".ring_" + datatype).css("display", "none");
            });
            //缩放结束
            var zoomEnd = dojo.connect(map, "onZoomEnd", function () {
                for (var i = 0; i < json.length; i++) {
                    var x = json[i].p_lon;
                    var y = json[i].p_lat;
                    var point = new Point(x, y, map.spatialReference);
                    screenPnt = map.toScreen(point);
                    $("#ring" + i).css({ "left": screenPnt.x - 19 + "px", "top": screenPnt.y - 26 + "px", "position": "absolute", "display": "block", "z-index": "40" });

                    $("#ring_" + datatype + "_" + i).css({ "left": screenPnt.x - 48 + "px", "top": screenPnt.y - 126 + "px", "position": "absolute", "z-index": "39", "cursor": "pointer" });
                }
                $(".ring").css("display", "block");
                $(".esriPopup").css("display", "block");
                $(".ring_" + datatype).css("display", "block");
            });

            //将地图事件的句柄添加到句柄集合中。
            config._eventHandlers.push(panStart);
            config._eventHandlers.push(panEnd);
            config._eventHandlers.push(zoomStart)
            config._eventHandlers.push(zoomEnd);

            //设置弹出窗PopWindow
            if (popWindowParam.popWindowUrl != null && popWindowParam.popWindowUrl != "undefined" && popWindowParam.popWindowUrl != "") {
                $(".ring").unbind();
                $(".ring").bind("click", function (evt) {

                    if (evt.target.nodeName != "LI" && evt.target.nodeName != "IMG") {
                        var element = $(this).find(".class_mapIcoDiv");
                        var name = element.attr("name");
                        var x = Number(element.attr("lon"));
                        var y = Number(element.attr("lat"));
                        var id = element.attr("pointcode");

                        //设置infoWindow弹出窗高度
                        var infoWidth = popWindowParam.popWidth;
                        var infoHeight = popWindowParam.popHeight;

                        //自定义infoWindow弹窗窗默认高度
                        if (infoWidth == null || infoWidth == undefined) {
                            infoWidth = 400;
                        }
                        if (infoHeight == null || infoHeight == undefined) {
                            infoHeight = 300;
                        }

                        var param = "";
                        var urlParam = popWindowParam.urlParam;
                        if (urlParam != null) {
                            if (urlParam[id] != null && urlParam[id] != undefined && urlParam[id] != "") {
                                param = urlParam[id];
                            }
                        }

                        map.infoWindow.resize(infoWidth, infoHeight);

                        map.infoWindow.setContent("<iframe frameborder='0' scrolling  ='no' width='100%'  height='" + (infoHeight - 30) + "' src='" + (popWindowParam.popWindowUrl + "?lon=" + x + "&lat=" + y + "" + param) + "'/>");
                        map.infoWindow.setTitle("<font style = 'font-weight:bold'>" + name + "</font>");
                        var mapPoint = new Point(x, y, map.spatialReference);
                        map.infoWindow.show(mapPoint);
                    }
                });
            }
            if (datatype == "polluter_general") {
                //ClusterLyr.createClusterLayer("1", "polluter_general", pointArr, popWindowParam);
                //HeatMap.createHeatMap("polluter_general", pointArr, "heatmap", {
                //    blurRadius: 16,
                //    colorStops: {
                //        ratio: [0, 0.2, 0.3, 0.4, 0.5],//0-1
                //        color: ["0,0,255", "0,255,255", "0, 255, 0", "255,255,0", "255,0,0"],
                //        transparency: [0, 1, 1, 1],//0-1
                //    },
                //    maxPixelIntensity: 50,
                //    minPixelIntensity: 50,
                //});
            }

        }//if (json != null)结束位置

        //图层的点击事件
        function layerClick(e) {
            var graphic = e.graphic;
            var mapPoint = graphic.geometry;
            //var id = graphic._graphicsLayer.id.replace(point_ID, "");
            //if (id == "jczxx") {
            //    symbol = new PictureMarkerSymbol('IMG/point/zhandian3.png', 28, 35);
            //}
            var attributes = graphic.attributes;
            var name = attributes["p_name"];
            var infoWidth = 550;
            var infoHeight = 400;
            infoWidth = popWindowParam.popWidth;
            infoHeight = popWindowParam.popHeight;
            if (datatype == "online") {
                infoHeight = 390;
            }

            var param = "";
            if (attributes["p_id"] != null && attributes["p_id"] != undefined && attributes["p_id"] != "") {
                param = popWindowParam["urlParam"][attributes["p_id"]];
                if (param == null || param == undefined) {
                    param = "";
                }
            }

            map.infoWindow.resize(infoWidth, infoHeight);
            map.infoWindow.setContent("<iframe frameborder='0' scrolling  ='no' width='100%'  height='" + (infoHeight - 30) + "' src='" + (popWindowParam.popWindowUrl + "?lon=" + mapPoint.x + "&lat=" + mapPoint.y + "&id=" + attributes["p_id"] + "&name=" + attributes["p_name"] + param) + "'/>");
            map.infoWindow.setTitle("<font style = 'font-weight:bold'>" + name + "</font>");
            map.infoWindow.show(mapPoint);
        }


        function mouseOverLayer(e) {
            map.setMapCursor("pointer");
            //console.log(e.graphic);
            var font = new esri.symbol.Font();
            font.setSize("10pt");
            font.setFamily("微软雅黑");
            var cpoint = event.graphic.geometry;
            var text = new esri.symbol.TextSymbol(event.graphic.attributes.p_name);
            text.setFont(font);
            text.setColor(new dojo.Color([0, 0, 0, 100]));
            text.setOffset(20, -35);
            var pmsTextBg = new PictureMarkerSymbol();
            pmsTextBg.setOffset(20, -30);
            var textLength = event.graphic.attributes.p_name.length;
            pmsTextBg.setWidth(textLength * 13.5 + 5);
            pmsTextBg.setColor(new esri.Color([255, 255, 0, 0.8]));
            var bgGraphic = new esri.Graphic(cpoint, pmsTextBg);
            //map.graphics.add(bgGraphic);
            var labelGraphic = new esri.Graphic(cpoint, text);
            //map.graphics.add(labelGraphic);
        };
        function mouseOutLayer() {
            map.graphics.clear();
            map.setMapCursor("default");
        }


    });//require结束(加载点位结束)
}//地图上添加点位结束


var mapShowPoints = {
    addPoints: map_AddPointInfoToMap,
    GetCoverStyle: GetCoverStyle
};
/**********地图点位加载highcharts柱状图************* */
function loadChartOnMap(divId, Y, N) {
    $(divId).highcharts({
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 15,
                beta: 0,
                depth: 50,
                viewDistance: 25
            },
            backgroundColor: 'rgba(255,255,255,0)'
        },
        colors: ['#8c93ec', '#56d373'],
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },
        xAxis: {
            //categories: ['本月'],
            //                  categories:[title],
            visible: false,
            crosshair: false,
            labels: {
                style: {
                    color: '#BA222B',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    fontFamily: '微软雅黑'
                }
            },
            //                  gridLineColor: '#BA222B',
            //                  lineColor: '#56d373',
            lineWidth: 1
        },
        yAxis: {
            visible: false,
            labels: {
                style: {
                    color: '#BA222B',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    fontFamily: '微软雅黑'
                }
            },
            min: 0.1,
            title: {
                text: ''
            },
            //                  lineColor: '#56d373',
            lineWidth: 1
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px"></span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}:</td><td style="padding:0"><b>{point.y:1f}次</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                depth: 25,
                pointPadding: 5,
                borderWidth: 0,
                pointWidth: 20
            }
        },
        series: [{
            name: '不合格',
            data: Y//[15]
        },
        {
            name: '合格',
            data: N//[30]
        }
        ]
    })
}
/**
 * 关闭地图弹窗
 */
function closeWindow() {
    if (map.infoWindow.isShowing == true) {
        map.infoWindow.hide();
    }
}
/**
 * 展示遥测车历史轨迹
 */
function showCarHistoryTrajectoryOnMap(json) {
    require([
		"esri/geometry/Polyline",
		"esri/graphic",
		"esri/layers/GraphicsLayer",
		"esri/symbols/SimpleLineSymbol"
    ], function (Polyline, Graphic, GraphicLayer, SimpleLineSymbol) {
        var layer = new GraphicLayer({ id: "carHistory" });
        if (layer) {
            layer.clear();
            map.removeLayer(layer);
        }
        var sls = new SimpleLineSymbol();
        sls.setWidth(3);
        sls.setColor("red");
        var jwd = [];

        for (var i = 0; i < json.length; i++) {
            var arr = [];
            arr.push(json[i]["longitude"]);
            arr.push(json[i]["latitude"]);
            jwd.push(arr);
            if (i == 0) {
                console.log(json[i]);
            }
        }
        var polylineJson = {
            "paths": [jwd],
            "spatialReference": { "wkid": 4326 }
        };

        var polyline = new Polyline(polylineJson);
        var graphic = new Graphic(polyline, sls);
        layer.add(graphic);
        map.addLayer(layer);
    });
}