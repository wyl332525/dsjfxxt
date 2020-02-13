var cache_data_areaHgl = [];
var cache_data_fuelTypeHgl = [];
var cache_data_mileAgeNum = [];
var startIndex = 0;
var endIndex = 5;
var areaLength = 0;
var areaLength_1 = 0;
var mileAgeNumLength = 0;

$(function() {
//	var args = {
//		sqlKey : "com.kmzc.dao.dsj.redisCache.getMileAgeNumHgl"
//	}
	
	console.info(new Date().getTime());
	

//	var query_data = loadDatasAjax(args);
	loadAreaHglByMethod();
	loadFueltypeHgl();
	loadMileAgeNumHgl();
})


/*使用echarts加载各州市检测合格率并按照检测方法划分*/
function loadAreaHglByMethod(){
	var checkmethod = [];	//检测方法图例
	var areaLabel = [];		//区域名称
	var serialArray = [];	//serial 数组
	var serialItem = [];	//serial 各检测方法数据数组
	var serialObject = {};	//serial 各检测方法柱状对象
	var barChart = echarts.init(document.getElementById('areaHglByMethod'));
	
	var data = {
		key : "com.kmzc.dao.dsj.redisCache.getAreaHgl"
	};
	
	cache_data_areaHgl = fromRedisGetData(data);
	
	var option = {
		    title : {
		        text: areaPrefix+'检测合格率',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:checkmethod,
		        top:"10%"
		    },
		    calculable : true,
		    grid:{
		    	top:"30%",
		    	bottom:"10%"
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisLabel:{
		            	interval:0
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : []
	};
	
	assembleData(checkmethod,areaLabel,serialArray,startIndex,endIndex);
	option.xAxis[0].data = areaLabel.slice(startIndex,endIndex);
	option.series = serialArray;
	barChart.setOption(option);
	
	var currentIndex = -1;
//	
    setInterval(function() {
    	serialArray = [];
    	
    	if(endIndex!=areaLength){
    		endIndex+=1;
    		startIndex+=1
    		
//    		console.info("startIndex="+startIndex+",endIndex="+endIndex);
    		assembleData(checkmethod,areaLabel,serialArray,startIndex,endIndex);
    		option.xAxis[0].data = areaLabel.slice(startIndex,endIndex);
//    		console.info(option.xAxis[0].data);
    		option.series = serialArray;
//    		console.info(serialArray);
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	
    	barChart.setOption(option);
    }, 10000);
    
    
    
    setInterval(function(){
		var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
        barChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0, //表示series中的第几个data数据循环展示
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        // 高亮当前图形
        barChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        barChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    },"1000")
	
//	tools.loopShowTooltip(barChart, option, {loopSeries: true,interval:1000});
}

/**
 * asdasd
 * asdasd
 */


function assembleData(checkmethod,areaLabel,serialArray,startIndex,endIndex){
	var serialObject = {};
	var serialItem = [];
	//循环遍历从redis中取出来的数据
		$.each(cache_data_areaHgl.cache,function(index,object){
			//首先获取检测方法图例数组
			if(object.CHECKMETHOD!=null && object.CHECKMETHOD!="" && checkmethod.indexOf(object.CHECKMETHOD)==-1){
				checkmethod.push(object.CHECKMETHOD);
			}
			//获取各地区名称
			if(object.AREANAME!=null && object.AREANAME!="" && areaLabel.indexOf(object.AREANAME)==-1){
				areaLabel.push(object.AREANAME);
			}
			
			areaLength = areaLabel.length;

			if(serialObject.name!=object.CHECKMETHOD){
				//从第二次检测方法不同时就把之前的对象放到serial数组中
				if(serialObject!=null && serialObject!="" && Object.keys(serialObject).length != 0 && serialObject.name!="免检"){
					serialArray.push(serialObject);
				}
//				console.info("area="+object.AREANAME+",checkmethod="+object.CHECKMETHOD)
				
				serialObject = {};
				serialItem = [];
				serialObject.name = object.CHECKMETHOD
				serialObject.type = "bar";
				serialObject.barWidth = "10%"
				if(object.AREANAME!=null && object.AREANAME!=""){
					serialItem.push(object.HGL);
				}
			}else{
				if(object.AREANAME!=null && object.AREANAME!=""){
					serialItem.push(object.HGL);
				}
				serialObject.data = serialItem;
			}
		})
		
		serialArray.push(serialObject);
		
		areaLabel = areaLabel.slice(startIndex,endIndex);
		
		$.each(serialArray,function(index,object){
			object.data = object.data.slice(startIndex,endIndex);
		})
}

/*加载柴油/汽油类型各州市的检测合格率*/
function loadFueltypeHgl(){
	var data = {
		key : "com.kmzc.dao.dsj.redisCache.getFuelTypeHgl"
	};
	
	cache_data_fuelTypeHgl = fromRedisGetData(data);
	
	var lineChart = echarts.init(document.getElementById('areaHglByfuelType'));
	
	var fuelType = [];	//燃料类型图例
	var areaLabel = [];		//区域名称
	var serialArray = [];	//serial 数组
	var serialItem = [];	//serial 各燃料类型数据数组
	var serialObject = {};	//serial 各燃料类型折线图
	var startIndex = 0;
	var endIndex = 5;
	
	var option = {
		    title : {
		        text: areaPrefix+'汽油/柴油各州市合格率',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[]
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    grid:{
		    	top:"25%",
		    	bottom:"10%"
		    },
		    series : []
	};
	
	assembleDataWithLine(fuelType,areaLabel,serialArray,startIndex,endIndex);
	option.legend.data = fuelType;
	option.xAxis[0].data = areaLabel.slice(startIndex,endIndex);
	option.series = serialArray;
	
	console.info(serialArray);
	console.info(option.xAxis[0].data);
	
	lineChart.setOption(option);
	
	
	var currentIndex = -1;
//	
    setInterval(function() {
    	serialArray = [];
    	
    	if(endIndex!=areaLength_1){
    		endIndex+=1;
    		startIndex+=1
    		assembleDataWithLine(fuelType,areaLabel,serialArray,startIndex,endIndex);
    		option.xAxis[0].data = areaLabel.slice(startIndex,endIndex);
    		option.series = serialArray;
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	
    	
    	console.info(serialArray);
    	console.info(option.xAxis[0].data);
    	lineChart.setOption(option);
    }, 10000);
    
    setInterval(function(){
		var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
		lineChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0, //表示series中的第几个data数据循环展示
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        // 高亮当前图形
        lineChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        lineChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    },"1000")
}

/*装配echarts折线图数据*/
function assembleDataWithLine(fuelType,areaLabel,serialArray,startIndex,endIndex){
	
	var serialObject = {};
	var serialItem = [];
	//循环遍历从redis中取出来的数据
		$.each(cache_data_fuelTypeHgl.cache,function(index,object){
			//首先获取检测方法图例数组
			if(object.FUELTYPE!=null && object.FUELTYPE!="" && fuelType.indexOf(object.FUELTYPE)==-1){
				fuelType.push(object.FUELTYPE);
			}
			//获取各地区名称
			if(object.AREANAME!=null && object.AREANAME!="" && areaLabel.indexOf(object.AREANAME)==-1){
				areaLabel.push(object.AREANAME);
			}
			
			areaLength_1 = areaLabel.length;

			if(serialObject.name!=object.FUELTYPE){
				//从第二次检测方法不同时就把之前的对象放到serial数组中
				if(serialObject!=null && serialObject!="" && Object.keys(serialObject).length != 0 && serialObject.name!="免检"){
					serialArray.push(serialObject);
				}
				console.info("area="+object.AREANAME+",checkmethod="+object.FUELTYPE)
				
				serialObject = {};
				serialItem = [];
				serialObject.name = object.FUELTYPE
				serialObject.type = "line";
				serialObject.smooth = true;
				serialObject.itemStyle = {normal: {areaStyle: {type: 'default'}}};
				if(object.AREANAME!=null && object.AREANAME!=""){
					serialItem.push(object.HGL);
				}
			}else{
				if(object.AREANAME!=null && object.AREANAME!=""){
					serialItem.push(object.HGL);
				}
				serialObject.data = serialItem;
			}
		})
		
		serialArray.push(serialObject);
		
		areaLabel = areaLabel.slice(startIndex,endIndex);
		
		$.each(serialArray,function(index,object){
			object.data = object.data.slice(startIndex,endIndex);
		})
}

function loadMileAgeNumHgl(){
	var data = {
		key : "com.kmzc.dao.dsj.redisCache.getMileAgeNumHgl"
	};
		
	cache_data_mileAgeNum = fromRedisGetData(data);
		
	var lineChart = echarts.init(document.getElementById('HglByMileAgeNum'));
	
	var mileAgeNum = [];		//区域名称
	var serialArray = [];	//serial 数组
	var serialItem = [];	//serial 各燃料类型数据数组
	var serialObject = {};	//serial 各燃料类型折线图
	var startIndex = 0;
	var endIndex = 5;
	
	var option = {
		    title : {
		        text: areaPrefix+'各里程数合格率',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : []
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    grid:{
		    	top:"25%",
		    	bottom:"10%"
		    },
		    series : []
	};
	
	assembleMileAgeNumHgl(mileAgeNum,serialArray,startIndex,endIndex);
	option.xAxis[0].data = mileAgeNum.slice(startIndex,endIndex);
	option.series = serialArray;
	
	console.info(serialArray);
	console.info(option.xAxis[0].data);
	
	lineChart.setOption(option);
	
	var currentIndex = -1;
//	
    setInterval(function() {
    	serialArray = [];
    	console.info("mileAgeNum:"+mileAgeNumLength+",endValue:"+endIndex);
    	if(endIndex!=mileAgeNumLength){
    		endIndex+=1;
    		startIndex+=1
    		assembleMileAgeNumHgl(mileAgeNum,serialArray,startIndex,endIndex);
    		option.xAxis[0].data = mileAgeNum.slice(startIndex,endIndex);
    		option.series = serialArray;
    	}else{
    		endIndex=5;
    		startIndex=0;
    	}
    	
    	console.info(serialArray);
    	console.info(option.xAxis[0].data);
    	lineChart.setOption(option);
    }, 10000);
    
    setInterval(function(){
		var dataLen = option.series[0].data.length;
        // 取消之前高亮的图形
		lineChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0, //表示series中的第几个data数据循环展示
            dataIndex: currentIndex
        });
        currentIndex = (currentIndex + 1) % dataLen; //+1表示每次跳转一个
        // 高亮当前图形
        lineChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
        // 显示 tooltip
        lineChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: currentIndex
        });
    },"1000")
}


function assembleMileAgeNumHgl(mileAgeNum,serialArray,startIndex,endIndex){
	var serialObject = {};
	var serialItem = [];
	
	serialObject.name = '合格率';
	serialObject.type = "line";
	serialObject.smooth = true;
	serialObject.itemStyle = {normal: {areaStyle: {type: 'default'}}};
	//循环遍历从redis中取出来的数据    
	$.each(cache_data_mileAgeNum.cache,function(index,object){
		//获取各地区名称
		if(object.MILEAGENUM!=null && object.MILEAGENUM!="" && mileAgeNum.indexOf(object.MILEAGENUM)==-1){
			mileAgeNum.push(object.MILEAGENUM);
		}
		serialItem.push(object.HGL);
	})
	
	mileAgeNumLength = mileAgeNum.length;
	
	serialObject.data = serialItem;
	
	serialArray.push(serialObject);
	
	mileAgeNum = mileAgeNum.slice(startIndex,endIndex);
	
	$.each(serialArray,function(index,object){
		object.data = object.data.slice(startIndex,endIndex);
	})
}