var areaMethodLength = 0;
var zsj = 0; //总检测次数
var drsj = 0; //当日检测次数
$(function() {
	loadAreaByMethod();
	loadAreaByFuelType();
	loadAreaGklByMethod();
	loadMileAgeNumFjhgl();
	loadOutfactoryDateFjhgl();
	loadMonthJclWithArea();
	loadGasHglSituationOfWeeks();
	loadDieselHglSituationOfWeeks();
	loadCyslByMethod();
	loadQyslByMethod();
	loadMyMrJclHglByMethod();
	loadMtMsJclHglByMethod();
	loadJczlDayjclByMethod();	
})



/**
 * 加载根据检测方法按16个地州统计合格率直方图
 */
function loadAreaByMethod(){
	var startIndex = 0;
	var endIndex = 5;
	//从redis调取数据
	var data = fromRedisGetData({key:"getAreaHglByMethod"});
	var args = {
		elementId:"areaHglByMethod",
		data:data,
		startIndex:startIndex,
		endIndex:endIndex,
		legendName:"CHECKMETHOD",
		xAxisName:"AREANAME",
		dataName:"HGL"
	}
	//柱状图配置参数数据装配
	assembleAreaHglByMethod(args);
	
    setInterval(function() {
    	if(endIndex!=areaMethodLength){
    		endIndex+=1;
    		startIndex+=1
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	args.startIndex = startIndex;
		args.endIndex = endIndex;
		assembleAreaHglByMethod(args);
    },10000);
	
}


/**
 * 加载根据燃料种类按16个地州统计合格率折线图
 */
function loadAreaByFuelType(){
	var data = fromRedisGetData({key:"getAreaHglByFuelType"});
	var lineChart = echarts.init(document.getElementById('areaHglByfuelType'));
	var startIndex = 0;
	var endIndex = 5;
	var length = 0;
	
	var args = {
		elementId:"areaHglByfuelType",
		data:data,
		startIndex:startIndex,
		endIndex:endIndex,
		legendName:"FUELTYPE",
		xAxisName:"REGIONNAME",
		dataName:"HGL",
		smooth:true,
		globalColor:['#0428BB','#3E03BC','#0188AF','#3B5BDD'],
		yAxisLabelName:"单位:%",
		margin_top:"20%"
	}
	
	length = assembleLineCharts(args);
	
	
    setInterval(function() {
    	if(endIndex!=length){
    		endIndex+=1;
    		startIndex+=1
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	args.startIndex = startIndex;
    	args.endIndex = endIndex;
    	assembleLineCharts(args);
    }, 10000);
}


/**
 * 加载根据汽油柴油工况法按16个地州统计合格率折线图
 */
function loadAreaGklByMethod(){
	var data = fromRedisGetData({key:"getAreaGklByMethod"});
	var startIndex = 0;
	var endIndex = 5;
	var length = 0;
	
	var args = {
		elementId:"AreaGklByMethod",	//组件元素id
		data:data,			//要读取的数据
		startIndex:startIndex,	//开始索引
		endIndex:endIndex,		//结束索引
		legendName:"CHECKMETHOD",	//图例名称
		xAxisName:"REGIONNAME",		//x轴坐标名称
		dataName:"GKL",			//数据名称
		smooth:true,
		globalColor:['#0428BB','#3E03BC','#0188AF','#3B5BDD'],
		yAxisLabelName:"单位:%",
	}
	
	length = assembleLineCharts(args);
	
    setInterval(function() {
    	if(endIndex!=length){
    		endIndex+=1;
    		startIndex+=1
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	
    	args.startIndex = startIndex;
    	args.endIndex = endIndex;
    	
    	assembleLineCharts(args);
    }, 10000);
}

/**
 * 加载里程数复检合格率
 */
function loadMileAgeNumFjhgl(){
	var data = fromRedisGetData({key:"getMileAgeNumFjhgl"});
	var startIndex = 0;
	var length = 0;
	
	var args = {
		elementId:"MileAgeNumFjhgl",	//组件元素id
		data:data,			//要读取的数据
		startIndex:startIndex,	//开始索引
		legendName:"RECHECK",	//图例名称
		xAxisName:"MILEAGENUM",		//x轴坐标名称
		dataName:"FJHGL",  //数据名称
		margin_top:"15%",
		margin_bottom:"17%",
		margin_left:"5%",
		margin_right:"3%",
		areaStyle:true,
		globalColor:"#3B5BDD",
		xAxisLabelRotate:45,
		yAxisLabelName:"单位:%"
	}
	
	length = assembleLineCharts(args);
}

/**
 * 加载车辆出厂日期复检合格率
 */
function loadOutfactoryDateFjhgl(){
	var data = fromRedisGetData({key:"getOutfactoryDateFjhgl"});
	var startIndex = 0;
	var length = 0;
	
	var args = {
		elementId:"OutfactoryDateFjhgl",	//组件元素id
		data:data,			//要读取的数据
		startIndex:startIndex,	//开始索引
		legendName:"FIRSTCHECK",	//图例名称
		xAxisName:"OUTFACTORYDATE",		//x轴坐标名称
		dataName:"FJHGL",			//数据名称
		xAxisLabelRotate:45,		//设置x轴名称旋转角度
		margin_top:"15%",
		margin_bottom:"15%",
		margin_left:"5%",
		margin_right:"3%",
		areaStyle:true,
		globalColor:"#3B5BDD",
		yAxisLabelName:"单位:%",
		markPoint:true
	}
	
	length = assembleLineCharts(args);
}

/**
 * 加载每个月对应各州市的总检测量
 */
function loadMonthJclWithArea(){
	var data = fromRedisGetData({key:"getMonthJclWithArea"});
	
	var args = {
		elementId:"monthJclWithArea",	//组件元素id
		data:data
	}
	
	assembleMonthJclWithArea(args);
}

/**
 * 加载随汽油工况率增加合格率的变化趋势图
 */
function loadGasHglSituationOfWeeks(){
	var data = fromRedisGetData({key:"getGasHglSituationOfWeeks"});
	var startIndex = 0;
	var endIndex = 7;
	var length = 0;
	
	var args = {
		elementId:"gasHglSituationOfWeeks",	//组件元素id
		data:data,			//要读取的数据
		startIndex:startIndex,	//开始索引
		legendName:"CONDITION",	//图例名称
		xAxisName:"GKL",		//x轴坐标名称
		dataName:"HGL",			//数据名称
		margin_top:"15%",
		margin_bottom:"15%",
		margin_left:"5%",
		margin_right:"3%",
		xAxisLabelRotate:45,
		yAxisLabelName:"单位:%",
	}
	
	
	
	length = assembleLineCharts(args);
	
//    setInterval(function() {
//    	if(endIndex!=length){
//    		endIndex+=1;
//    		startIndex+=1
//    	}else{
//    		endIndex=7;
//    		startIndex=0;
//    	}
//    	args.startIndex = startIndex;
//    	args.endIndex = endIndex;
//    	
//    	assembleLineCharts(args);
//    }, 10000);
}


/**
 * 加载随柴油工况率增加合格率的变化趋势图
 */
function loadDieselHglSituationOfWeeks(){
	var data = fromRedisGetData({key:"getDieselHglSituationOfWeeks"});
	var startIndex = 0;
	var endIndex = 7;
	var length = 0;
	
	var args = {
		elementId:"dieselHglSituationOfWeeks",	//组件元素id
		data:data,			//要读取的数据
		startIndex:startIndex,	//开始索引
		legendName:"CONDITION",	//图例名称
		xAxisName:"GKL",		//x轴坐标名称
		dataName:"HGL",			//数据名称
		margin_top:"15%",
		margin_bottom:"15%",
		margin_left:"5%",
		margin_right:"3%",
		yAxisLabelName:"单位:%",
		xAxisLabelRotate:45
	}
	
	
	
	length = assembleLineCharts(args);
	
//    setInterval(function() {
//    	if(endIndex!=length){
//    		endIndex+=1;
//    		startIndex+=1
//    	}else{
//    		endIndex=7;
//    		startIndex=0;
//    	}
//    	args.startIndex = startIndex;
//    	args.endIndex = endIndex;
//    	
//    	assembleLineCharts(args);
//    }, 10000);
}

/**
 * 检测总量/当日检测量,显示屏数据
 */
function loadJczlDayjclByMethod() {
	var startdate = "2017-01-01";
	var enddate = getCurrentDate('yyyy-mm-dd');
	//获取检测车辆次数
	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.countJccls",
		starttime : startdate,
		endtime : enddate
	}
	var data = loadDatasAjax(args1);
	console.log("检测总量",data)
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			var obj = data.rows[0];
			var options = {
				useEasing : true,
				useGrouping : true,
				separator : ',',
				decimal : '.',
			};
			//延迟动画加载数据插件  countup.js
			var demo = new CountUp('jczlNums', zsj, obj.nums, 0, 3);
			//			var demo = new CountUp('元素id', 开始值, 结束值, 小数位数, 动画延迟); 
			if (!demo.error) {
				demo.start();
			} else {
				//console.error(demo.error);
			}
			zsj = Number(obj.nums);
		}
	}
	//获取当日检测
	var args2 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.countJcclsjt",
	}
	var data2 = loadDatasAjax(args2);

	if (null != data2.rows && "" != data2.rows) {
		if (data2.rows.length > 0) {
			var obj = data2.rows[0];
			var options = {
				useEasing : true,
				useGrouping : true,
				separator : ',',
				decimal : '.',
			};
			var demo = new CountUp('drjclNums', drsj, obj.nums, 0, 3);
			if (!demo.error) {
				demo.start();
			} else {
				//console.error(demo.error);
			}
			drsj = Number(obj.nums);

			console.info('obj.cc' + obj.nums);
		//$("#jcxnums").html(obj.nums);
		}
	}
}

// 每天更新一次
function loadJczlDayjclByTimer() {
	setInterval(function() {
		loadJczlDayjclByMethod()
	}, 86400000)
}




/**
 * 加载根据各州市柴油车数量的环状图
 */
function loadCyslByMethod() {
	var barChart = echarts.init(document.getElementById('areaCyslByMethod'));

	// 从redis调取数据
	var data = fromRedisGetData({
		key : "getAreaJclByFuelType"
	})
	// 为环状图配置参数数据装配
	var option = assembleAreaCyslByMethod(data);
	barChart.setOption(option);
}

/**
 * 加载根据各州市汽油车数量的环状图
 */
function loadQyslByMethod() {
	var qyCheckmethod = []; //汽油车检测图例
	var barChart = echarts.init(document.getElementById("areaQyslByMethod"));

	//从redis调取数据
	var data = fromRedisGetData({
		key : "getAreaJclByFuelType"
	});
	//为环状图配置参数数据装配
	var option = assembleAreaQyslByMethod(data, qyCheckmethod);
	barChart.setOption(option);
}

/**
 *  加载每月每日检测量/合格率统计的折线柱状图
 */
function loadMyMrJclHglByMethod() {
	var pjjclmethod = []; // 平均检测量图例
	var pjhglmethod = []; // 平均合格率图例
	var datamethod = []; // 月日期图例
	var startIndex = 0;
	var endIndex = 10;

	var barChart = echarts.init(document.getElementById("areaMyMrJclHglByMethod"));

	// 从redis调取数据
	var data = fromRedisGetData({
		key : "getEveryDayJclAndHgl"
	})
	// 从折线柱状图配置参数数据装配
	var option = assembleAreaMyMrJclHglByMethod(data, pjjclmethod, pjhglmethod, datamethod, startIndex, endIndex);
	barChart.setOption(option);

	// 10秒更新一次数据
	setInterval(function() {
		if (endIndex != jclHglMethodLength) {
			endIndex += 5;
			startIndex += 5;
			option = assembleAreaMyMrJclHglByMethod(data, pjjclmethod, pjhglmethod, datamethod, startIndex, endIndex);
		} else {
			endIndex = 10;
			startIndex = 0;
		}
		barChart.setOption(option)
	}, 10000)
}

/**
 *  加载每天每时检测量/合格率最高的时间段的折线柱状图
 */
function loadMtMsJclHglByMethod() {
	var pjjclmethod = []; // 平均检测量图例
	var pjhglmethod = []; // 平均合格率图例
	var hourmethod = []; // 小时图例
	var startIndex = 0;
	var endIndex = 8;

	var barChart = echarts.init(document.getElementById("areaMtMsJclHglByMethod"));

	// 从redis调取数据
	var data = fromRedisGetData({
		key : "getHourJclAndHgl"
	})
	// 从折线柱状图配置参数数据装配
	var option = assembleAreaMtMsJclHglByMethod(data, pjjclmethod, pjhglmethod, hourmethod, startIndex, endIndex);
	barChart.setOption(option);

	// 10秒更新一次数据
	setInterval(function() {
		if (endIndex != jclHglMethodLength) {
			endIndex += 3;
			startIndex += 3;
			option = assembleAreaMtMsJclHglByMethod(data, pjjclmethod, pjhglmethod, hourmethod, startIndex, endIndex);
		} else {
			endIndex = 8;
			startIndex = 0;
		}
		barChart.setOption(option)
	}, 10000)
}