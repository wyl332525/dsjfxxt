
var jspanel = null;
var map = null;

window["userid"] = null;

//地图对象
var mapConfig = {
    map: null,
    mapZoom: 1,
    pointZoom: 10,
    initExtent: null,

    panStart: null,
    panEnd: null
};


/*地图初始化*/
require([
    "esri/map",
    "esri/config",
    "esri/dijit/Basemap",
    "esri/dijit/Popup",
    "dojo/dom-class",
    "dojo/dom-construct",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/FeatureLayer",
    "plugins/TDTLayer",
    "dojo/domReady!"
], function (Map, esriConfig, esriBasemaps, Popup, domClass, domConstruct, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, FeatureLayer,TDTLayer, domReady) {

    /*设置arcgisforjs配置数据*/
    esriConfig.defaults.io.proxyUrl = _proxyUrl;
    esriConfig.defaults.io.alwaysUseProxy = false;
    //esriConfig.defaultImageUrl = _defaultImageUrl;
    esriConfig.defaults.geometryService = _geometryServer;
    esriConfig.DefaultMapServerUrl = _defaultMapServerUrl;
    esriConfig.VectorMapServerUrl = _vectorMapServerUrl;
    esriConfig.RasterMapServerUrl = _rasterMapServerUrl;
    esriConfig.ImgMapServerUrl = _imgMapServerUrl;
    esriConfig.Extent = _extent;
    esriConfig._eventHandlers = new Array();//绑定地图事件句柄数组
    esriConfig._isSearching = false;//判断查询是否结束

    //ArcGISTiledMapServiceLayer切片   ArcGISDynamicMapServiceLayer动态
    esri.config.defaults.io.corsDetection = false;
    var popup = new Popup({
        titleInBody: false,
        highlight: false
    }, domConstruct.create("div"));
    domClass.add(popup.domNode, "light");

    /*默认地图范围*/
    mapConfig.initExtent = initExtent = new esri.geometry.Extent(esriConfig.Extent);

    /*地图类型，1地图或切片服务，2地图容器，3天地图*/
    var mapType = 4;

    if (mapType == 1) {
        mapConfig.map = map = new Map("map", {
            //center: [-118, 34.5],
            extent: initExtent,
            //zoom: 8,
            slider: false,
            //basemap: "topo"
        });
        var VectorMap = new ArcGISTiledMapServiceLayer(esriConfig.VectorMapServerUrl, { id: "baseMap_VEC", visible: true });
        var RasterMap = new ArcGISTiledMapServiceLayer(esriConfig.RasterMapServerUrl, { id: "baseMap_DEM", visible: false });
        var ImgMap = new ArcGISTiledMapServiceLayer(esriConfig.ImgMapServerUrl, { id: "baseMap_IMG", visible: false });
        map.addLayer(VectorMap);
        map.addLayer(RasterMap);
        map.addLayer(ImgMap);
    }
    else if (mapType == 2) {
        /*加载地图容器*/
        esriBasemaps.VEC = {
            id: "VEC",
            layers: [{
                id: "baseMap_VEC", url: esriConfig.VectorMapServerUrl
            }],
            title: "矢量图"
        };
        esriBasemaps.DEM = {
            id: "DEM",
            layers: [{
                id: "baseMap_DEM", url: esriConfig.RasterMapServerUrl
            }],
            title: "地形图"
        };
        esriBasemaps.IMG = {
            id: "IMG",
            layers: [{
                id: "baseMap_IMG", url: esriConfig.ImgMapServerUrl
            }],
            title: "影像图"
        };
        map = new esri.Map("map", { basemap: esriBasemaps.VEC, extent: initExtent, logo: false, slider: false });
    }
    else if (mapType == 3) {
        //加载天地图
        map = new esri.Map("map", { extent: initExtent, logo: false, slider: false });
        // addTDTBaseMap("baseMap_VEC");

        //加载地图边界
        var mapBoundaryLayer = new esri.layers.ArcGISDynamicMapServiceLayer(esriConfig.VectorMapServerUrl);
        mapBoundaryLayer.id = "baseMap_BoundaryLayer";
        map.addLayer(mapBoundaryLayer, 1);
    }
    else if (mapType == 4) {
        //测试：天地图上加载切片图
        map = new esri.Map("map", { extent: initExtent, logo: false, slider: false });
        var tdt = new TDTLayer("http://t0.tianditu.com/vec_c/wmts", { noteType: "vec_c" });
        tdt.id = "TDT_base";
        var tdlt = new TDTLayer("http://t0.tianditu.com/cva_c/wmts", { noteType: "cva_c" });
        tdlt.id = "TDT_mark";
        map.addLayer(tdt, 0);
        map.addLayer(tdlt, 1);
        ///*  加载 遮罩  */
        //区域外
        var shadeLayer3 = new FeatureLayer(shadeLayer + "/2");
        shadeLayer3.setOpacity(1)//设置透明度
        shadeLayer3.id = "shadeLayer3";
        //区域内
        var shadeLayer2 = new FeatureLayer(shadeLayer + "/1");
        shadeLayer2.setOpacity(0.5)//设置透明度
        shadeLayer2.id = "shadeLayer2";
        //边界
        var shadeLayer1 = new FeatureLayer(shadeLayer + "/0");
        shadeLayer1.setOpacity(1)//设置透明度
        shadeLayer1.id = "shadeLayer1";
        /*添加到地图里*/
        map.addLayer(shadeLayer3, 2);
        map.addLayer(shadeLayer2, 3);
        map.addLayer(shadeLayer1, 4);
    }

    //初始化参数
    setTimeout(function () {
        init_Load();
        dataLoading();
    });

    ////绑定全局变量
    //MapUniGIS.map = map;

    //加载天地图的矢量（baseMap_VEC）、地形（baseMap_DEM）、影像图（baseMap_IMG）
    function addTDTBaseMap(type) {
        var tdt;//地图
        var tdlt;//地图标注
        if (type == "baseMap_VEC") {
            //矢量
            var tdt = new TDTLayer("http://t0.tianditu.com/vec_c/wmts", { noteType: "vec_c" });
            tdt.id = type;
            //矢量图标注
            //var tdlt = new TDTLayer("http://t0.tianditu.com/cva_c/wmts", { noteType: "cva_c" });
            //tdlt.id = type + "_labelmark";
        } else if (type == "baseMap_DEM") {
            //地形图（不显示）
            var tdt = new TDTLayer("http://t5.tianditu.cn/ter_c/wmts", { noteType: "ter_c" });
            tdt.id = type;
            //地形图标注
            //var tdlt = new TDTLayer("http://t0.tianditu.com/cta_c/wmts", { noteType: "cta_c" });
            //tdlt.id = type + "_labelmark";
        } else if (type == "baseMap_IMG") {
            //影像  
            var tdt = new TDTLayer("http://t0.tianditu.com/img_c/wmts", { noteType: "img_c" });
            tdt.id = type;
            //影像图标注
            //var tdlt = new TDTLayer("http://t0.tianditu.com/cia_c/wmts", { noteType: "cia_c" });
            //tdlt.id = type + "_labelmark";
        }
        var tdlt = new TDTLayer("http://t0.tianditu.com/cva_c/wmts", { noteType: "cva_c" });
        tdlt.id = type + "_labelmark";
        map.addLayer(tdt, 0);
        map.addLayer(tdlt, 1);
    }

    /*显示经纬度*/
    dojo.connect(map, "onMouseMove", function (event) {
        $("#PositionBar").html("经度:" + event.mapPoint.x.toFixed(3) + "     纬度:" + event.mapPoint.y.toFixed(3));
    });

    ///*地图比例尺*/
    //require(["esri/dijit/Scalebar"
    //], function (Scalebar) {
    //    var scalebar = new Scalebar({
    //        map: map,
    //        attachTo: "bottom-left",
    //        scalebarUnit: "metric"
    //    });
    //});

    /*切换底图*/
    $("#mapType div").on("click", function (e) {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        changeBaseMap($(this).attr("name"));
        //切换
        function changeBaseMap(BaseMap) {
            if (mapType == "1") {
                var layerName = map.layerIds;
                for (var i = 0; i < layerName.length; i++) {
                    if (layerName[i] == BaseMap) {
                        map.getLayer(BaseMap).setVisibility(true);
                    }
                    else {
                        map.getLayer(layerName[i]).setVisibility(false);
                    }
                }
            }
            else if (mapType == "2") {
                if (BaseMap == "baseMap_VEC") {
                    map.setBasemap(esriBasemaps.VEC);
                }
                if (BaseMap == "baseMap_IMG") {
                    map.setBasemap(esriBasemaps.IMG);
                }
                if (BaseMap == "baseMap_DEM") {
                    map.setBasemap(esriBasemaps.DEM);
                }
            }
            else if (mapType == "3") {
                var layerName = map.layerIds;
                for (var i = layerName.length; i > 0; i--) {
                    if (layerName[i - 1].indexOf("baseMap") > -1) {
                        if (layerName[i - 1].indexOf("Boundary") > -1) {
                            continue;
                        }
                        if (layerName[i - 1].indexOf(BaseMap) == -1) {
                            map.removeLayer(map.getLayer(layerName[i - 1]));
                        }
                    }
                }
                addTDTBaseMap(BaseMap);
            }
        }
    });

    ////初始化地图上的按钮绑定事件
    //initButton();
});



//初始化默认参数
function initWhenLoadMap() {
    //根据权限删除配置的部分城市
    initCitys_QX();
    //权限设置
    initQuanXian();
    //初始化mark权限遮盖层
    mapRegion.hightLightUserMarkRegion(regionCodeSub_QX);
}

//根据权限删除配置的部分城市
function initCitys_QX() {
    /* 扩展，删除Array第n项（从0开始计） */
    Array.prototype.del = function (n) {
        if (n < 0)
            return this;
        else
            return this.slice(0, n).concat(this.slice(n + 1, this.length));
    }

    if (!regionISAdmin_QX) {
        for (var kk = _CityInfo.length - 1; kk >= 0 ; kk--) {
            if (_CityInfo[kk].cityCode.indexOf(regionCodeSub_QX) == -1) {
                _CityInfo = _CityInfo.del(kk);
            }
        }
    }
}

