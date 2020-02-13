/*
* 地图配置文件
* 作者: gis
* 日期：2017-7-6
* 版本：V1.0.0
*/
/*用户权限启用*/
var _rmIsUse = false;

/*跨域地址*/
//获取服务发布目录  window.location.href.split("/")[3]
var _proxyUrl = window.location.origin + "/" + window.location.href.split("/")[2] + "/proxy/proxy.ashx";//window.location.origin='http://localhost:9393'
var interfaceUrl = "http://121.8.182.146:8899/zx/";

/*单独发布arcgis api*/
////默认API地址
//var _arcgisJSAPIUrl = "http://192.168.120.103:80";
////引用API地址
//var _arcgisJSAPIUrl_Themes = _arcgisJSAPIUrl + "/arcgis_js_api/library/3.21/3.21/dijit/themes/tundra/tundra.css";
//var _arcgisJSAPIUrl_Esricss = _arcgisJSAPIUrl + "/arcgis_js_api/library/3.21/3.21/esri/css/esri.css";
//var _arcgisJSAPIUrl_Init = _arcgisJSAPIUrl + "/arcgis_js_api/library/3.21/3.21/init.js";

/*随程序发布发布arcgis api*/
var arcgis_url = window.location.href.substring(0, window.location.href.lastIndexOf("/") + 1).replace('http://', '').replace('https://', '') + "Scripts/3.13/dojo";
var _arcgisJSAPIUrl_Themes = "Scripts/3.21/dijit/themes/tundra/tundra.css";
var _arcgisJSAPIUrl_Esricss = "Scripts/3.21/esri/css/esri.css";
var _arcgisJSAPIUrl_Init = "Scripts/3.21/init.js";


///* 引用文件（同步加载） */
//var headFileArr = [
//    _arcgisJSAPIUrl_Themes,
//    _arcgisJSAPIUrl_Esricss ];
//var afterBodyFileArr = [
//    _arcgisJSAPIUrl_Init,
//    "js/custom/mapShowPoints.js",
//    "Scripts/mian/mainMap.js"];

/*地图范围*/
var _extentFW = {
    "xmin": 119.88412935100001, "ymin": 29.226459394000045, "xmax": 121.22714606800002, "ymax": 30.291644839000014, "spatialReference": { "wkid": 4326 }
};
var _extent = _extentFW;

var shadeLayer = "http://192.168.120.103:6080/arcgis/rest/services/JDC_ScreenShow/MapServer"//0边界  1区域内   2区域外

/*地图服务地址(矢量、栅格DEM，影像)*/
var _vectorMapServerUrl = "http://192.168.120.103:6080/arcgis/rest/services/WenshanMap/MapServer";
var _rasterMapServerUrl = "http://192.168.120.103:6080/arcgis/rest/services/WenshanDemMap/MapServer";
var _imgMapServerUrl = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer";

/*默认地图服务地址*/
var _defaultMapServerUrl = _vectorMapServerUrl;

/*几何服务地址*/
var _geometryServer = "http://192.168.120.106:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
//打印服务
var _mapPrintServerUrl = "http://192.168.120.148:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task";

/*地区边界范围样式*/
var mapBoundaryServerUrl = "http://192.168.120.106:6080/arcgis/rest/services/YunNanBoundaryServer/MapServer";

//第二区县级别图层（等于_secondLevel）
var _mapSecondCitysLayerUrl = "http://192.168.120.106:6080/arcgis/rest/services/WSRegionEdge/MapServer/0";
//var _mapSecondCitysLayerUrl = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer/563";

//第一级（省）（市）（县）
var _firstLevel = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer/564";
//第二级（市）（县）（乡）
var _secondLevel = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer/563";
//第三级（县）（乡）
var _thirdLevel = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer/562";
//第四级（乡）
var _fifthLevel = "http://192.168.120.106:6080/arcgis/rest/services/YunNanMapService/MapServer/562";
//全部级别图层数组
var _layers = [_firstLevel, _secondLevel, _thirdLevel, _fifthLevel];

/*不同级别对应地区类别*/
var _regionLevelArray = [
    {
        level1: "省", //省、市、县(区)
        level2: "城市", //市、县(区)、乡(镇)
        level3: "县",//县(区)、乡(镇)、街道
        level4: "乡"//乡(镇)
    },
    {
        level1: "城市", //市、县(区)、乡(镇)
        level2: "区县",//县(区)、乡(镇)
        level3: "乡镇",//乡(镇)、街道
        level4: "村"//乡(镇)
    }

];
_regionLevel = _regionLevelArray[1];

//河流数据
var _riverLayerUrl = "http://192.168.120.103:6080/arcgis/rest/services/WenshanWater/MapServer";

/*气模型涉及配置*/
var AirModel_LayerAddress = "http://192.168.120.103:6080/arcgis/rest/services/WenshanMap/MapServer";
var AirModel_LayerID = [9, 11, 13, 12];
var _AriWebService = "http://192.168.120.148/HorseMapWebService/AirModelWebService.asmx/CountAirModel";

/*水模型及配置*/
/*水模型及配置*/
var _RiverList = [
    {
        code: 0, name: "谷拉河", layerName: "谷拉河", extent: [105.61066700038208, 23.52501699973498, 106.1551265000881, 24.105598023997914],
        partLength: 100, url: "http://192.168.120.103:6080/arcgis/rest/services/WenshanRiverModel/MapServer/0", idField: "ID"
    },
    {
        code: 1, name: "南利河", layerName: "南利河", extent: [104.41813399998432, 23.38390599986224, 105.2812210001492, 23.550066499719321],
        partLength: 100, url: "http://192.168.120.103:6080/arcgis/rest/services/WenshanRiverModel/MapServer/1", idField: "ID"
    },
    {
        code: 2, name: "盘龙河", layerName: "盘龙河", extent: [104.21853700008279, 23.15335199959527, 104.4693039998799, 23.402371999768151],
        partLength: 100, url: "http://192.168.120.103:6080/arcgis/rest/services/WenshanRiverModel/MapServer/2", idField: "ID"
    },
];
var _riverLayerIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];


/*路经分析----NA服务*/ //RoadAnalystServer
var _routeLayer = "http://192.168.120.106:6080/arcgis/rest/services/WSRoute/NAServer/Route";
/*路经分析----GP服务*/
//var _routeLayer = "";//未发布

/*空气质量区域插值服务*/
var _airGPService = "http://192.168.120.148:6080/arcgis/rest/services/WenShanAirModel/GPServer/ChinaModel";


/*敏感点图层配置，图形查询，缓冲查询用*/
var _layerList = [
    {
        selected: true,
        name: "xuexiao",
        icon: "IMG/SpaceSearch/教育教研.png",
        layerUrl: _defaultMapServerUrl + "/522",
        infoTiledField: "ID ",
        infoParam: [{ "label": "名称：", "field": "NAME" }, { "label": "地址：", "field": "ADDRESS" }]
    },
    {
        selected: true,
        name: "yiyuan",
        icon: "IMG/SpaceSearch/医疗卫生.png",
        layerUrl: _defaultMapServerUrl + "/517",
        infoTiledField: "ID ",
        infoParam: [{ "label": "名称：", "field": "NAME" }, { "label": "地址：", "field": "ADDRESS" }]
    },
    {
        selected: true,
        name: "dangzhengjiguan",
        icon: "IMG/SpaceSearch/党政机关.png",
        layerUrl: _defaultMapServerUrl + "/524",
        infoTiledField: "ID ",
        infoParam: [{ "label": "名称：", "field": "NAME" }, { "label": "地址：", "field": "ADDRESS" }]
    },
    {
        selected: true,
        name: "jumindi",
        icon: "IMG/SpaceSearch/居民小区村庄.png",
        layerUrl: _defaultMapServerUrl + "/510",
        infoTiledField: "ID ",
        infoParam: [{ "label": "名称：", "field": "NAME" }, { "label": "地址：", "field": "ADDRESS" }]
    },
];


/*区县code、名称和经纬度信息配置*/
var _CityInfoWenshan = [
   { cityCode: "532600000000", cityCodeSub: "5326", cityName: "文山州", "lon": 104.239542, "lat": 23.392534, "level": 0 },
   { cityCode: "532621000000", cityCodeSub: "532621", cityName: "文山县", "lon": 104.239542, "lat": 23.392534, "level": 1 },
   { cityCode: "532622000000", cityCodeSub: "532622", cityName: "砚山县", "lon": 104.343721, "lat": 23.611456, "level": 1 },
   { cityCode: "532623000000", cityCodeSub: "532623", cityName: "西畴县", "lon": 104.678877, "lat": 23.443286, "level": 1 },
   { cityCode: "532624000000", cityCodeSub: "532624", cityName: "麻栗坡县", "lon": 104.709202, "lat": 23.131436, "level": 1 },
   { cityCode: "532625000000", cityCodeSub: "532625", cityName: "马关县", "lon": 104.400493, "lat": 23.018666, "level": 1 },
   { cityCode: "532626000000", cityCodeSub: "532626", cityName: "丘北县", "lon": 104.173162, "lat": 24.057944, "level": 1 },
   { cityCode: "532627000000", cityCodeSub: "532627", cityName: "广南县", "lon": 105.061747, "lat": 24.052153, "level": 1 },
   { cityCode: "532628000000", cityCodeSub: "532628", cityName: "富宁县", "lon": 105.637018, "lat": 23.631379, "level": 1 },
];
var _CityInfoYunnan = [
    { cityCode: "530000000000", cityCodeSub: "53", cityName: "云南省", "lon": 102.603601, "lat": 24.718139, "level": 0 },
    { cityCode: "530100000000", cityCodeSub: "5301", cityName: "昆明市", "lon": 102.803601, "lat": 24.918139, "level": 1 },
    { cityCode: "532300000000", cityCodeSub: "5323", cityName: "楚雄", "lon": 101.543828, "lat": 25.037981, "level": 1 },
    { cityCode: "533400000000", cityCodeSub: "5334", cityName: "迪庆", "lon": 98.677661, "lat": 27.826384, "level": 1 },
    { cityCode: "530700000000", cityCodeSub: "5307", cityName: "丽江市", "lon": 100.222887, "lat": 26.679284, "level": 1 },
    { cityCode: "530500000000", cityCodeSub: "5305", cityName: "保山市", "lon": 98.816216, "lat": 24.50512, "level": 1 },
    { cityCode: "533100000000", cityCodeSub: "5331", cityName: "德宏", "lon": 97.7088045, "lat": 24.141193, "level": 1 },
    { cityCode: "533300000000", cityCodeSub: "5333", cityName: "怒江", "lon": 98.852361, "lat": 25.858585, "level": 1 },
    { cityCode: "532900000000", cityCodeSub: "5329", cityName: "大理", "lon": 100.228939, "lat": 25.59573, "level": 1 },
    { cityCode: "532500000000", cityCodeSub: "5325", cityName: "红河", "lon": 102.394607, "lat": 23.0380031, "level": 1 },
    { cityCode: "530900000000", cityCodeSub: "5309", cityName: "临沧市", "lon": 100.086613, "lat": 23.878861, "level": 1 },
    { cityCode: "530300000000", cityCodeSub: "5303", cityName: "曲靖市", "lon": 103.819578, "lat": 25.528331, "level": 1 },
    { cityCode: "530600000000", cityCodeSub: "5306", cityName: "昭通市", "lon": 103.713439, "lat": 27.341455, "level": 1 },
    { cityCode: "532600000000", cityCodeSub: "5326", cityName: "文山", "lon": 104.239945, "lat": 23.37182, "level": 1 },
    { cityCode: "532800000000", cityCodeSub: "5328", cityName: "西双版纳", "lon": 100.794549, "lat": 21.70616, "level": 1 },
    { cityCode: "530800000000", cityCodeSub: "5308", cityName: "普洱市", "lon": 100.974721, "lat": 22.786781, "level": 1 },
    { cityCode: "530400000000", cityCodeSub: "5304", cityName: "玉溪市", "lon": 102.339953, "lat": 24.0164107, "level": 1 }
];
var _CityInfo = _CityInfoWenshan;
