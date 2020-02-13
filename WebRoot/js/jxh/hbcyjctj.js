var cycAllArray = new Array();
var hbcAllArray = new Array();
var dataArray = new Array();
var checkQualifieCityWin=null;
var City=null;
$(function() {
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssj').val(startdate);
	$('#jssj').val(enddate);
	getData();
});


function getData() {
	var cycObj = loadDatasAjax({
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycjcsdt",
		starttime : startdate,
		endtime : enddate
	});
	cycAllArray = new Array();
	//hbcAllArray = new Array();
	dataArray = new Array();
//	var hbcObj = loadDatasAjax({
//		sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcjcsdt",
//		starttime : startdate,
//		endtime : enddate
//	});

	for (var i = 0; i < cycObj.total; i++) {
		var ret = cycObj.rows;
		var cycArray = new Array();
		cycArray.push(ret[i].pjzzl);
		cycArray.push(ret[i].cychgl);
		cycArray.push(ret[i].cycjcl);
		cycArray.push(ret[i].name);
		cycArray.push("柴油车");
		cycAllArray.push(cycArray);
	}
//	for (var i = 0; i < hbcObj.total; i++) {
//		var ret = hbcObj.rows;
//		var hbcArray = new Array();
//		hbcArray.push(ret[i].pjzzl);
//		hbcArray.push(ret[i].hbchgl);
//		hbcArray.push(ret[i].hbcjcl);
//		hbcArray.push(ret[i].name);
//		hbcArray.push("黄标车");
//		hbcAllArray.push(hbcArray);
//	}
	//dataArray.push(hbcAllArray);
	dataArray.push(cycAllArray);
	getTjt()
}

function getTjt() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	myChart.on('click', function (param) {
		City=param.value[3];
		toQualifieList();
	});
	// 指定图表的配置项和数据
	var option = {
			    title : {
			        text: '各州(市)黄标车、柴油车检测散布图',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#fff',
			        	fontSize:30
			        }
			    },
		legend : {
			top : 60,
			data : [
				 {
					name : '柴油车',
					textStyle : {
						color : '#D6007C',
						fontSize : 20
					}
				} ]
		},
		tooltip : {
			trigger : 'item',
			formatter : function(obj) {
				var value = obj.value;
				return value[4] + '<br>'
					+ '平均总质量：' + value[0] + 'kg<br>'
					+ '总体合格率：' + value[1] + '%<br>'
					+ '总检测量：' + value[2] + '次<br>';
			}
		},
		xAxis : {
			splitLine : {
				show : false,
				lineStyle : {
					type : 'dashed'
				}
			},
			axisLine : {
				show : true,
				lineStyle : {
					color : '#30d2d7'
				}
			},
			axisLabel : {
				fontSize : 20
			}
		},
		yAxis : {
			splitLine : {
				lineStyle : {
					type : 'dotted'
				}
			},
			scale : true,
			axisLine : {
				show : true,
				lineStyle : {
					color : '#30d2d7'
				}
			},
			axisLabel : {
				show : true,
				textStyle : {
					color : '#30d2d7',
					fontSize : 25
				},
				formatter : '{value}%'
			}
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '1%',
			containLabel : true
		},
		grid : {
			y : 160
		},
		series : [ {
			name : '柴油车',
			data : dataArray[0],
			type : 'scatter',
			symbolSize : function(data) {
				return Math.sqrt(data[2]) / 4;
			},
			label : {
				normal : {
					show : true,
					formatter : function(param) {
						return param.data[3];
					},
					textStyle : {
						color : '#FFF'
					},
					position : 'top'
				}
			},
			itemStyle : {
				normal : {
					shadowBlur : 10,
					shadowColor : 'rgba(25, 100, 150, 0.5)',
					shadowOffsetY : 5,
					color : new echarts.graphic.RadialGradient(0.4, 0.3, 1, [ {
						offset : 0,
						color : '#D6007C'
					}, {
						offset : 1,
						color : '#D6007C'
					} ])
				}
			}
		} ]
	};
	myChart.setOption(option);
}

//查询
function getValueDate() {
	startdate = $('#kssj').val();
	enddate = $('#jssj').val();

	var start = Date.parse(new Date(startdate.replace(/-/g, "/")));
	var end = Date.parse(new Date(enddate.replace(/-/g, "/")));
	var thisDate = Date.parse(new Date());
	var millTime = end - start;
	var thistime = end - thisDate;
	if (millTime < 0) {
		alert("结束时间不能大于开始时间！");
		return;
	}
	if (thistime > 0) {
		alert("结束时间不能大于当前时间！");
		return;
	}
	getData();
}

//检测统计量详情
function toQualifieList() {
//	if (checkQualifieCityWin == null || checkQualifieCityWin == "") {
//		checkQualifieCityWin = createTopWindow("checkQualifieCityWin", "<iframe src='' id='checkQualifieCityWinIframe' scrolling='no' frameborder='0'></iframe>",
//			{
//				title : "详情列表",
//				width : window.innerWidth,
//				height : window.innerHeight,
//				collapsible : false,
//				modal : true,
//				closed : true,
//				maximizable : false,
//				minimizable : false
//			});
//	}
//	window.top.$("#checkQualifieCityWinIframe").data('openid', window); //把父窗口对象缓存起来
//	window.top.$("#checkQualifieCityWinIframe").attr("src", rootPath + "/common/jxh/hbcyjctjCity.yt?City="+City);
//	checkQualifieCityWin.window('open');
	parent.popWindow.init(1600, 650, rootPath + "/view/mainpage/hbcyjctjCity.do?City="+City);
}