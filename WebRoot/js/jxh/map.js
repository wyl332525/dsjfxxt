var map = null;
function initMap(divId){
	// 百度地图API功能
	map = new BMap.Map(divId);    // 创建Map实例
	map.centerAndZoom(new BMap.Point(102.73, 25.04), 7);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	  
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	var mapStyle ={
        features: ["road","building","water","land"]
    };
    map.setMapStyle(mapStyle);
}

function message(obj, unitname, address) {
    var opts = {
        width: 350,
        height: 100,
        title: unitname
    }
    var infoWindow = new BMap.InfoWindow("地址：" + address , opts);  // 创建信息窗口对象
    obj.openInfoWindow(infoWindow, map.getCenter());
}

function addMarker(marker, unitname,address) {  // 创建图标对象
    map.addOverlay(marker);
    marker.addEventListener("click", function () {
        message(this, unitname, address);
    });
}

