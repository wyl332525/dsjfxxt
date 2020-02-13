
$(function() {
	//加载地图板块
	map();
})



function map() {
	
	var query_cond = {
		sqlKey:"com.kmzc.dao.visual.mapLoad.getXsbnData"
	}
	
	var ajaxRet = loadDatasAjax(query_cond);
	
	var mapArray = [];
//		{
//			name:ajaxRet.rows[0].stationname,
//			value:parseInt(ajaxRet.rows[0].total),
//			coord:[100.385344,26.750783]
//		},
//		{
//			name:ajaxRet.rows[1].stationname,
//			value:parseInt(ajaxRet.rows[1].total),
//			coord:[99.946935,26.610257]
//		},
//		{
//			name:ajaxRet.rows[2].stationname,
//			value:parseInt(ajaxRet.rows[2].total),
//			coord:[100.06197,26.643922]
//		},
//		{
//			name:ajaxRet.rows[3].stationname,
//			value:parseInt(ajaxRet.rows[3].total),
//			coord:[100.412335,27.724888]
//		},
//		{
//			name:ajaxRet.rows[4].stationname,
//			value:parseInt(ajaxRet.rows[4].total),
//			coord:[99.413282,27.454135]
//		},
//		{
//			name:ajaxRet.rows[5].stationname,
//			value:parseInt(ajaxRet.rows[5].total),
//			coord:[100.579582,25.987056]
//		},
//		{
//			name:ajaxRet.rows[6].stationname,
//			value:parseInt(ajaxRet.rows[6].total),
//			coord:[101.465838,26.786601]
//		}
//	
	
	
	
	console.info(ajaxRet);
	
	$.each(ajaxRet.rows,function(index,object){
		var mapObject = {};
		var asix = [];
		mapObject.name = object.stationname;
		asix.push(parseFloat(object.longitude));
		asix.push(parseFloat(object.latitude));
		mapObject.coord = asix;
		mapObject.value = parseInt(object.total);
		mapArray.push(mapObject);
	});
	
	console.info(mapArray);
	
	
	
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('map_1'));
//	var area = [
//		{name:'勐海县',value:'120'}
//	];

	option = {
		// backgroundColor: '#404a59',
		/***  title: {
		      text: '实时行驶车辆',
		      subtext: 'data from PM25.in',
		      sublink: 'http://www.pm25.in',
		      left: 'center',
		      textStyle: {
		          color: '#fff'
		      }
		  },**/
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				if (typeof (params.value)[2] == "undefined") {
					return params.name + ' : ' + params.value;
				} else {
					return params.name + ' : ' + params.value[2];
				}
			}
		},
		series : [
			{
				name : '实时监测车辆数量',
				type : 'map',
				map: 'lj',
	            //地图的显示位置
	            mapLocation: {
	                x: 'center'
	            },
	            //放大或者缩小地图
	            zoom:1.2,
	            //启用echarts 缩放功能
	            roam:true,
				data : [],
				itemStyle:{
	                normal:{
	                	label:{
	                		show:true,
	                		textStyle:{
	                			color:'white',
	                			fontWeight:'bolder'
	                		}
	                	},
	                //修改地图标注点的样式
	                color:'blue',
	                //修改地图颜色
	                areaColor:'#4c60ff',borderColor:'#fff',borderWidth:1.5},
	                emphasis:{label:{show:false},areaColor:'#1874CD'}
	            },
	            markPoint:{
	            	symbol:'pin',
                    symbolSize: 50,
                    itemStyle: {
                        normal: {
                            borderColor: '#87cefa',
                            color:'#5196CC',
                            borderWidth: 2,            // 标注边线线宽，单位px，默认为1
                            label: {
                                show: true,
                            }
                        }
                    },
                    data:mapArray
                }
			}

		/**
		,
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 20;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffd800',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0,0,0,.3)'
                }
            },
            zlevel: 1
        }
		**/
		]
	};

//	option.series[0].markPoint.data = mapArray;
//	console.info(option.series[0].markPoint.data);
	$.ajax({
		url:rootPath+"/js/diqing.json",
		type:"get",
		dataType:"json",
		success:function (data){
			console.info(data);
			echarts.registerMap("lj",data);
			//加载设置超出此范围将不加载地图
			myChart.setOption(option);
		}
	});
	
	
	myChart.resize();
	window.addEventListener("resize", function() {
		myChart.resize();
	});
}


//function convertData(arrs) {
//    var markdata = [];
//    var valuess = [100,300,200,500,211];
//    for (var i = 0; i < arrs.length; i++) {
//        markdata.push({})
//        if (arrs[i].properties.name == '丽江市') {
//            markdata[i].coord = new Array(parseFloat(arrs[i].properties.center[0]) + 0.1, parseFloat(arrs[i].properties.center[1]) - 0.18);
//            console.info(markdata[i])
//        } else {
//            markdata[i].coord = arrs[i].properties.center;
//        }
//        markdata[i].name = arrs[i].properties.name;
//
//        markdata[i].value = valuess[i]
//    }
//    return markdata
//}