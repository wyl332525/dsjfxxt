$(function(){
	loadCarversionHgl();
	loadCarversionObdwtxl();
	loadCheckLineHgl();
	loadCheckStationHgl();
	loadManufacturerHgl();
})

/**
 * 加载车型-合格率列表
 */
function loadCarversionHgl(){
	var data = loadDatasAjax({sqlKey:"com.kmzc.dao.dsj.redisCache.getCarversionHgl"});
	console.info(data);
	$.each(data.rows,function(index,object){
		var html = "<tr><td class='item'>"+(index+1)+"</td>"+
					"<td class='item'>"+object.carbrand+"</td>"+
					"<td class='item'>"+object.carversion+"</td>"+
					"<td class='item'>"+object.hgl+"</td></tr>"
		$("#carversionHgl").append(html)
	})
}

/**
 * 加载车型-OBD未通讯成功率排名列表
 */
function loadCarversionObdwtxl(){
	var data = loadDatasAjax({sqlKey:"com.kmzc.dao.dsj.redisCache.getCarversionObdwxtcgl"});
	console.info(data);
	$.each(data.rows,function(index,object){
		var html = "<tr><td class='item_1'>"+(index+1)+"</td>"+
					"<td class='item_1'>"+object.carversion+"</td>"+
					"<td class='item_1'>"+object.wtxcgl+"</td></tr>"
		$("#obdTcbcg").append(html)
	})
}

/**
 * 加载检测线合格率排名列表
 */
function loadCheckLineHgl(){
	var data = loadDatasAjax({sqlKey:"com.kmzc.dao.dsj.redisCache.getCheckLineHgl"});
	console.info(data);
	$.each(data.rows,function(index,object){
		var html = "<tr><td class='item'>"+(index+1)+"</td>"+
					"<td class='item'>"+object.stationshortname+"</td>"+
					"<td class='item'>"+object.checklinename+"</td>"+
					"<td class='item'>"+object.hgl+"</td></tr>"
		$("#checkLineHgl").append(html)
	})
}

/**
 * 加载检测站合格率排名列表
 */
function loadCheckStationHgl(){
	var data = loadDatasAjax({sqlKey:"com.kmzc.dao.dsj.redisCache.getCheckStationHgl"});
	console.info(data);
	$.each(data.rows,function(index,object){
		var html = "<tr><td class='item_1'>"+(index+1)+"</td>"+
					"<td class='item_1'>"+object.stationshortname+"</td>"+
					"<td class='item_1'>"+object.hgl+"</td></tr>"
		$("#checkStationHgl").append(html)
	})
}

/**
 * 加载厂商合格率排名列表
 */
function loadManufacturerHgl(){
	var data = loadDatasAjax({sqlKey:"com.kmzc.dao.dsj.redisCache.getManufacturerHgl"});
	console.info(data);
	$.each(data.rows,function(index,object){
		var html = "<tr><td class='item_1'>"+(index+1)+"</td>"+
					"<td class='item_1'>"+object.manufacturer+"</td>"+
					"<td class='item_1'>"+object.hgl+"</td></tr>"
		$("#ManufacturerHgl").append(html)
	})
}