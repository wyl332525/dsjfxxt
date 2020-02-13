//加载合格率统计图js
var aaa = 0;
/**
 * 根据检测方法按16个地州统计合格率直方图参数配置
 */
function assembleAreaHglByMethod(args){
	var legend = [];	//检测方法图例
	var xAxis = [];		//区域名称
	var serialArray = [];	//serial 数组
	var serialItem = [];	//serial 各检测方法数据数组
	var serialObject = {};	//serial 各检测方法柱状对象
	var barChart = echarts.init(document.getElementById(args.elementId));
	
	var option = {
		    color:['#0428BB','#3E03BC','#0188AF','#3B5BDD'],
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:legend,
		        top:"3%",
		        textStyle:{
		        	color:"#94CBFF"
		        }
		    },
		    calculable : true,
		    grid:{
		    	top:"20%",
		    	bottom:"8%"
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : [],
		            axisLabel:{
		            	interval:0
		            },
		            nameTextStyle:{
		            	color:"#94CBFF"
		            },
		            axisLine:{
		            	lineStyle:{
		            		color:"#94CBFF"
		            	}
		            },
		            axisTick:{
		            	show:false
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            nameTextStyle:{
		            	color:"#94CBFF"
		            },
		            axisLine:{
		            	lineStyle:{
		            		color:"#94CBFF"
		            	}
		            },
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        }
		    ],
		    series : []
	};
	
	
	//循环遍历从redis中取出来的数据
	$.each(args.data.cache,function(index,object){
		//首先获取检测方法图例数组
		if(object[args.legendName]!=null && object[args.legendName]!="" && legend.indexOf(object[args.legendName])==-1){
			legend.push(object[args.legendName]);
		}
		//获取各地区名称
		if(object[args.xAxisName]!=null && object[args.xAxisName]!="" && xAxis.indexOf(object[args.xAxisName])==-1){
			xAxis.push(object[args.xAxisName]);
		}
		
		areaMethodLength = xAxis.length;

		if(serialObject.name!=object[args.legendName]){
			//从第二次检测方法不同时就把之前的对象放到serial数组中
			if(serialObject!=null && serialObject!="" && Object.keys(serialObject).length != 0 && serialObject.name!="免检"){
				serialArray.push(serialObject);
			}
			
			serialObject = {};
			serialItem = [];
			serialObject.name = object[args.legendName]
			serialObject.type = "bar";
			serialObject.barWidth = "13%"
			if(object[args.xAxisName]!=null && object[args.xAxisName]!=""){
				serialItem.push(object[args.dataName]);
			}
		}else{
			if(object[args.xAxisName]!=null && object[args.xAxisName]!=""){
				serialItem.push(object[args.dataName]);
			}
			serialObject.data = serialItem;
		}
	})
	
	serialArray.push(serialObject);
	
	xAxis = xAxis.slice(args.startIndex,args.endIndex);
	
	$.each(serialArray,function(index,object){
		object.data = object.data.slice(args.startIndex,args.endIndex);
	})
	
	option.xAxis[0].data = xAxis;
	
	option.series = serialArray;
	
	barChart.setOption(option);
}


/**
 * 纯折线统计图配置方法
 */
function assembleLineCharts(args){
	var legend = [];	//图例
	var xAxis = [];		//x坐标轴名称
	var serialArray = [];	//serial 数组
	var serialItem = [];	//serial 各燃料类型数据数组
	var serialObject = {};	//serial 各燃料类型折线图
	var markPoint = [];	//标记点数组
	var xAxisLength = 0;
	var lineChart = echarts.init(document.getElementById(args.elementId));
	
	var option = {
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[],
		        textStyle:{
		        	color:"#94CBFF"
		        }
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            name:args.xAxisLabelName,
		            boundaryGap : false,
		            data : [],
		            nameTextStyle:{
		            	color:"#94CBFF"
		            },
		            axisLine:{
		            	lineStyle:{
		            		color:"#94CBFF"
		            	}
		            },
		            axisTick:{
		            	show:false
		            },
		            axisLabel:{
		            	interval:0,
		            	rotate:args.xAxisLabelRotate!=null?args.xAxisLabelRotate:0
		            }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            name:args.yAxisLabelName,
		            nameTextStyle:{
		            	color:"#94CBFF"
		            },
		            axisLine:{
		            	lineStyle:{
		            		color:"#94CBFF"
		            	}
		            },
		            axisTick:{
		            	show:false
		            },
		            splitLine:{
		            	show:false
		            }
		        }
		    ],
		    grid:{
		    	top:args.margin_top!=null?args.margin_top:"25%",
		    	bottom:args.margin_bottom!=null?args.margin_bottom:"10%",
		    	left:args.margin_left!=null?args.margin_left:"5%",
		    	right:args.margin_right!=null?args.margin_right:"5%"
		    },
		    series : []
	};
	//循环遍历从redis中取出来的数据
	$.each(args.data.cache,function(index,object){
		//首先获取检测方法图例数组
		if(object[args.legendName]!=null && object[args.legendName]!="" && legend.indexOf(object[args.legendName])==-1){
			legend.push(object[args.legendName]);
		}
		//获取各地区名称
		if(object[args.xAxisName]!=null && object[args.xAxisName]!="" && xAxis.indexOf(object[args.xAxisName])==-1){
			xAxis.push(object[args.xAxisName]);
		}
		
		xAxisLength = xAxis.length;

		
		if(serialObject.name!=object[args.legendName]){
			
			//从第二次燃料类型不同时就把之前的对象放到serial数组中
			if(serialObject!=null && serialObject!="" && Object.keys(serialObject).length != 0){
				//对空的数据进行补0
				for(var i = 0;i<xAxis.length;i++){
					if(serialObject.data[i]==null || serialObject.data[i]==""){
						serialObject.data[i] = "0";
					}
				}
				
				serialArray.push(serialObject);
			}
			
			serialObject = {};
			serialItem = [];
			serialObject.name = object[args.legendName]
			serialObject.type = "line";
			serialObject.smooth = args.smooth!=null?true:false;
			//设置折现区域填充颜色
			if(args.areaStyle){
				serialObject.areaStyle={};
			}
			
			//先寻找州市数组下标索引，再进行赋值，最后剩余的空位补0处理
			index = xAxis.indexOf(object[args.xAxisName]);
			if(index!=-1){
				serialItem[index] =object[args.dataName];
			}
		}else{
			index = xAxis.indexOf(object[args.xAxisName]);
			if(index!=-1){
				serialItem[index] = object[args.dataName];
			}
			serialObject.data = serialItem;
		}
	})
	
	for(var i = 0;i<xAxis.length;i++){
		if(serialObject.data[i]==null || serialObject.data[i]==""){
			serialObject.data[i] = "0";
		}
	}
	
	if(args.markPoint!=null){
		for(var i = 1;i<xAxis.length;i+=2){
			var markPointObject = {};
			markPointObject.value = serialObject.data[i];
			markPointObject.xAxis = i;
			markPointObject.yAxis = parseInt(serialObject.data[i]);
			markPoint.push(markPointObject);
//			console.info(markPointObject)
		}
		serialObject.markPoint = {data:markPoint};
	}
	
	serialArray.push(serialObject);
	
	if(args.endIndex==null || args.endIndex==""){
		args.endIndex = xAxisLength;
	}
	
	xAxis = xAxis.slice(args.startIndex,args.endIndex);
	
	$.each(serialArray,function(index,object){
		object.data = object.data.slice(args.startIndex,args.endIndex);
	})
	
	if(args.globalColor!=null){
		option.color = args.globalColor;
	}
	
	option.legend.data = legend;
	option.xAxis[0].data = xAxis;
	option.series = serialArray;
	
	lineChart.setOption(option);
	
	return xAxisLength;
}


/**
 * 加载每个月对应的各州市总检测量
 */
function assembleMonthJclWithArea(args){
	var multipleCharts = echarts.init(document.getElementById(args.elementId));
	var dataMap = {};
	var monthDataArr = [];	//每个月州市总检测量
	var xAxisArr = [];	//x轴数据（城市）
	var timeLineArr = [];	//时间线数据（月份）
	
	$.each(args.data.cache,function(index,object){
		//在横轴上添加城市
		if(xAxisArr.indexOf(object.REGIONNAME)==-1){
			xAxisArr.push(object.REGIONNAME)
		}
		
		//添加时间线数据
		if(timeLineArr.indexOf(object.MONTH)==-1){
			timeLineArr.push(object.MONTH);
		}
		
		//判断在数据集中是否已经包含该月的数据，如果包含了就继续添加数据，反之则重新创建一个容器装下月的数据
		if(!dataMap.hasOwnProperty(object.MONTH) || index==args.data.length-1){
			monthDataArr = [];
			monthDataArr.push(object.TOTAL);
		}else{
			monthDataArr.push(object.TOTAL);
		}
		
		dataMap[object.MONTH] = monthDataArr;
	})
	
	var keys = Object.keys(dataMap);
	
	
	var option = {
	    timeline:{
	        data:[],
	        autoPlay : true,
	        playInterval : 1000,
	        label : {
	            formatter : function(s) {
	                return s;
	            }
	        },
	        bottom:"1%",
//	        checkpointStyle:{
//	        	symbol:'circle',
//	        	color:"#94CBFF",
//	        	borderColor:"rgba(0,0,0,0)"
//	        }
	    },
	    options:[
	        {
	        	title:{
		    		text:"1月各州市总检测量",
		    		textStyle:{
		    			color:"#94CBFF"
		    		}
		    	},
	        	color:["#0188AF	"],
	            tooltip : {'trigger':'axis'},
	            legend : {
	                x:'right',
	                data:['检测量'],
	                selected:{
	                    '检测量':true,
	                },
	                textStyle:{
	                	color:"#94CBFF"
	                }
	            },
	            calculable : true,
	            grid : {y:60,y2:80},
	            xAxis : [{
	                type:'category',
	                axisLabel:{'interval':0},
	                data:[],
	                nameTextStyle:{
		            	color:"#94CBFF"
		            },
		            axisLine:{
		            	lineStyle:{
		            		color:"#94CBFF"
		            	}
		            }
	            }],
	            yAxis : [
	                {
	                    type:'value',
	                    name:'总检测量',
	                    splitLine:{
	                    	show:false
	                    },
	                    nameTextStyle:{
			            	color:"#94CBFF"
			            },
			            axisLine:{
			            	lineStyle:{
			            		color:"#94CBFF"
			            	}
			            }
	                },
	                {
	                	type:'value',
	                    name:'平均检测量',
	                    nameTextStyle:{
			            	color:"#94CBFF"
			            },
			            axisLine:{
			            	lineStyle:{
			            		color:"#94CBFF"
			            	}
			            }
	                }
	            ],
	            series : [
	                {
	                    name:'检测量',
	                    type:'bar',
	                    barWidth:"35%",
	                    markLine:{
	                        symbol : ['none','arrow'],
	                        symbolSize : [10, 5],
	                        itemStyle : {
	                            normal: {
	                                lineStyle: {color:'orange'},
	                                barBorderColor:'orange',
	                                label:{
	                                    position:'end',
	                                    textStyle:{color:'orange'}
	                                }
	                            }
	                        },
	                        data:[{type:'average',name:'平均值'}]
	                    },
	                    itemStyle:{
	                    	barBorderRadius:4
	                    },
	                    data:[]
	                }
	            ]
	        }

	    ]
	};
	
	
	$.each(keys,function(index,object){
		if(index==0){
			return true;
		}
		var barObject = {};
		barObject.title = {text:object+"月各州市总检测量"};
		barObject.series = {data:dataMap[object]};
		option.options.push(barObject);
	})
	
	option.options[0].xAxis[0].data = xAxisArr;
	option.timeline.data = timeLineArr;
	option.options[0].series[0].data = dataMap["1"];
	
	multipleCharts.setOption(option);
}


// 装配echarts环状图数据
function assembleAreaCyslByMethod(cacheData) {
	var cyCheckmethod = [];
	var sundata = [];

	option = {
		title : {
			text : "柴油车数量",
			subtext : sundata,
			subtextStyle : {
				fontSize : 23,
				color : "#94CBFF",
				fontWeight : "bold"
			},
			x : 'center',
			y : '38%',
			textStyle : {
				fontWeight : 'normal',
				fontSize : 12,
				color : '#B6BBD0',
			}
		},
		tooltip : {
			show : true,
			trigger : 'item',
			formatter : "{b}: {c} ({d}%)"
		},

		series : [ {
			type : 'pie',
			selectedMode : 'single',
			radius : [ '40%', '65%' ],
			color : [ '#0788DD', '#70C2F7', '#2D76A6', '#518CB3', '#41AAEE', '#6D9BB9' ],
			//		        color: ['#0428BB','#3B5BDD','#6B85EE','#91A5F7','#ADBDFB','#C2CEFD',],
			label: {
	            normal: {
	                textStyle: {
	                    fontWeight: 'bold',
	                    fontSize: 10
	                }
	            }
	        },
			labelLine: {
	            normal: {
	                show: true
	            }
	        },
			data : cyCheckmethod
		} ]
	};
	$.each(cacheData.cache, function(index, object) {
		//首先获取检测方法图例数组
		if (object.FUELTYPE == "柴油车" && object.REGIONNAME != null) {
			var object1 = {};
			object1.value = object.CYC;
			object1.name = object.REGIONNAME;
			cyCheckmethod.push(object1)
		}
	})
	console.log("cy", cyCheckmethod)
	var sundatas = 0;
	for (var i = 0; i < cyCheckmethod.length; i++) {
		sundatas += cyCheckmethod[i].value;
	}
	sundata.push(sundatas)
	return option

}

// 装配echarts环状图数据
function assembleAreaQyslByMethod(cacheData, qyCheckmethod) {
	var data = qyCheckmethod;
	var sundata = [];

	option = {
		title : {
			text : "机动车数量",
			subtext : sundata,
			subtextStyle : {
				fontSize : 23,
				color : "#94CBFF",
				fontWeight : "bold"
			},
			x : 'center',
			y : '38%',
			textStyle : {
				fontWeight : 'normal',
				fontSize : 12,
				color : '#B6BBD0',
			}
		},
		tooltip : {
			show : true,
			trigger : 'item',
			formatter : "{b}: {c} ({d}%)"
		},

		series : [ {
			type : 'pie',
			selectedMode : 'single',
			radius : [ '40%', '65%' ],
			color : [ '#0788DD', '#70C2F7', '#2D76A6', '#518CB3', '#41AAEE', '#6D9BB9' ],
	        label: {
	            normal: {
	                textStyle: {
	                    fontWeight: 'bold',
	                    fontSize: 10
	                }
	            }
	        },
			labelLine: {
	            normal: {
	                show: true
	            }
	        },
			data : data
		} ]
	};

	//循环遍历从redis中取出来的数据
	$.each(cacheData.cache, function(index, object) {
		//首先获取检测方法图例数组
		if (object.FUELTYPE == "汽油车" && object.REGIONNAME != null) {
			var object1 = {};
			object1.value = object.CYC;
			object1.name = object.REGIONNAME;
			qyCheckmethod.push(object1)
		}
	})
	var sundatas = 0;
	for (var i = 0; i < qyCheckmethod.length; i++) {
		sundatas += qyCheckmethod[i].value;
	}
	sundata.push(sundatas)

	return option;
}

// 装配echarts每月每日检测量/合格率统计图形的折线柱状图数据
function assembleAreaMyMrJclHglByMethod(cacheData,pjjclmethod,pjhglmethod,datamethod,startIndex,endIndex) {
	
	option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'cross',
			}
		},
		legend : {
			data : [ '平均检测量', '平均合格率' ],
			textStyle : {
				color : '#94CBFF'
			}
		},
		grid : {
			height : "138"
		},
		xAxis : [
			{
				type : 'category',
				data : datamethod,
				axisPointer : {
					type : 'shadow'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				name : '检测量',
				//		            min: 0,
				//		            max: 250,
				//		            interval: 50,
				axisLabel : {
					formatter : '{value}'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				},
				splitLine : {
					show : false
				}
			},
			{
				type : 'value',
				name : '合格率',
				//		            min: 0,
				//		            max: 25,
				//		            interval: 5,
				axisLabel : {
					formatter : '{value} %'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				},
				splitLine : {
					show : false
				}
			}
		],
		series : [
			{
				name : '平均检测量',
				type : 'bar',
				data : pjjclmethod,
				color:"#3E03BC"
			},
			{
				name : '平均合格率',
				type : 'line',
				yAxisIndex : 1,
				data : pjhglmethod,
				color:"#1874CD"
			}
		]
	};
	
	$.each(cacheData.cache,function(index,object){
//		console.log("遍历",object,'下标',index)
		pjjclmethod.push(object.PJJCL)
		pjhglmethod.push(object.PJHGL)
		datamethod.push(object.DAY + '号')
		jclHglMethodLength = datamethod.length
		
	})
// 下标选择数据
	pjjclmethod = pjjclmethod.slice(startIndex,endIndex)
	pjhglmethod = pjhglmethod.slice(startIndex,endIndex)
	datamethod = datamethod.slice(startIndex,endIndex)
	
//	重新赋值
	option.series[0].data = pjjclmethod;
	option.series[1].data = pjhglmethod;
	option.xAxis[0].data = datamethod;
	
	
	return option;
}


// 装配每天每时检测量/合格率最高的时间段折线柱状图
function assembleAreaMtMsJclHglByMethod(cacheData,pjjclmethod,pjhglmethod,hourmethod,startIndex,endIndex){
	
	option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'cross',
			}
		},
		legend : {
			data : [ '平均检测量', '平均合格率' ],
			textStyle : {
				color : '#94CBFF'
			}
		},
		grid : {
			height : "138"
		},
		xAxis : [
			{
				type : 'category',
				data : hourmethod,
				axisPointer : {
					type : 'shadow'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				name : '检测量',
				//		            min: 0,
				//		            max: 250,
				//		            interval: 50,
				axisLabel : {
					formatter : '{value}'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				},
				splitLine : {
					show : false
				}
			},
			{
				type : 'value',
				name : '合格率',
				//		            min: 0,
				//		            max: 25,
				//		            interval: 5,
				axisLabel : {
					formatter : '{value} %'
				},
				axisLabel : {
					show : true,
					textStyle : {
						color : '#94CBFF', //更改坐标轴文字颜色
						fontSize : 13 //更改坐标轴文字大小
					}
				},
				axisLine : {
					lineStyle : {
						color : '#94CBFF' //更改坐标轴颜色
					}
				},
				splitLine : {
					show : false
				}
			}
		],
		series : [
			{
				name : '平均检测量',
				type : 'bar',
				data : pjjclmethod,
				color:"#0428BB"
			},
			{
				name : '平均合格率',
				type : 'line',
				yAxisIndex : 1,
				data : pjhglmethod,
				color:"#1874CD"
			}
		]
	};
	
	$.each(cacheData.cache,function(index,object){
		pjjclmethod.push(object.PJJCL);
		pjhglmethod.push(object.PJHGL);
		hourmethod.push(object.HOUR+"时");
		jclHglMethodLength = hourmethod.length
	})
// 下标选择数据
	pjjclmethod = pjjclmethod.slice(startIndex,endIndex);
	pjhglmethod = pjhglmethod.slice(startIndex,endIndex);
	hourmethod = hourmethod.slice(startIndex,endIndex);
//	重新赋值
	option.series[0].data = pjjclmethod;
	option.series[1].data = pjhglmethod;
	option.xAxis[0].data = hourmethod;
	
	return option;
}

