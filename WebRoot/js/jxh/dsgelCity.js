var hgl = new Array();
var dbhgl = new Array();
var wthgl = new Array();
var tghgl = new Array();
var ldhgl = new Array();
var zhgl = new Array();
var ds = new Array();
var startdate = null;
var enddate = null;
var City=null;
$(function() {
	document.getElementById('CityName').innerHTML = City;
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssjxx').val(startdate);
	$('#jssj').val(enddate);
	getData();

});

function getData() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.zsjcffhgl",
			areaname:City,
			starttime : startdate,
			endtime : enddate
		}
	var dataObj = loadDatasAjax(args1);
	/*var dataObj = loadDatasAjax({
		configName : "jxhnew",
		sql : "zsjcffhgl",
		params : "String#"+City+";;String#" + startdate + ";;String#" + enddate
	});*/
	ds.splice(0,ds.length);
	dbhgl.splice(0,dbhgl.length);
	wthgl.splice(0,wthgl.length);
	tghgl.splice(0,tghgl.length);
	ldhgl.splice(0,ldhgl.length);
	zhgl.splice(0,zhgl.length);
	hgl.splice(0,hgl.length);
	for (var i = 0; i < dataObj.total; i++) {
		var ret = dataObj.rows;
		ds.push(ret[i].stationname);
		dbhgl.push(ret[i].dbhgl);
		wthgl.push(ret[i].wthgl);
		tghgl.push(ret[i].tghgl);
		ldhgl.push(ret[i].ldhgl);
		zhgl.push(ret[i].zhgl);
	}
	hgl.push(dbhgl);
	hgl.push(wthgl);
	hgl.push(tghgl);
	hgl.push(ldhgl);
	hgl.push(zhgl);
	getTjt();
}

function getTjt(){
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	// 指定图表的配置项和数据
	var option = {
//		title : {
//			text : '各州(市)按检测方法统计合格率折线图',
//			x : 'center',
//			top : '0',
//			textStyle : {
//				color : '#FFF',
//				fontSize : 30
//			}
//		},
		color : [ '#9015DF', '#FFEF00', '#FF7143', '#FF17C0', '#00FC00' ],
		tooltip : {
			trigger : 'axis',
			formatter : '{a0}:{c0}%<br />{a1}:{c1}%<br />{a2}:{c2}%<br />{a3}:{c3}%<br />{a4}:{c4}%<br />'
		},
		legend : {
			top : 60,
			data : [
				{
					name : '双怠速法',
					textStyle : {
						color : '#9015DF',
						fontSize : 20
					}
				}, {
					name : '简易工况法',
					textStyle : {
						color : '#FFEF00',
						fontSize : 20
					}
				}, {
					name : '不透光烟度法',
					textStyle : {
						color : '#FF7143',
						fontSize : 20
					}
				}, {
					name : '加载减速工况法',
					textStyle : {
						color : '#FF17C0',
						fontSize : 20
					}
				}, {
					name : '综合合格率',
					textStyle : {
						color : '#00FC00',
						fontSize : 20
					}
				}
			]
		},
		grid : {
			left : '3%',
			right : '4%',
			bottom : '1%',
			containLabel : true
		},

		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : ds,
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
			type : 'value',
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
			y : 160
		},
		series : [
			{
				name : '双怠速法',
				type : 'line',
				data : hgl[0],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
				itemStyle : {
					normal : {
						lineStyle : {
							width : 3, //折线宽度
						}
					}
				}
			},
			{
				name : '简易工况法',
				type : 'line',
				data : hgl[1],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
				itemStyle : {
					normal : {
						lineStyle : {
							width : 3, //折线宽度
						}
					}
				}
			},
			{
				name : '不透光烟度法',
				type : 'line',
				data : hgl[2],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
				itemStyle : {
					normal : {
						lineStyle : {
							width : 3, //折线宽度
						}
					}
				}
			},
			{
				name : '加载减速工况法',
				type : 'line',
				data : hgl[3],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
				itemStyle : {
					normal : {
						lineStyle : {
							width : 3, //折线宽度
						}
					}
				}
			},
			{
				name : '综合合格率',
				type : 'line',
				data : hgl[4],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
				itemStyle : {
					normal : {
						lineStyle : {
							width : 3, //折线宽度
						}
					}
				}
			}
		]
	};
	myChart.setOption(option);
}


//查询
function getValueDate() {
	startdate = $('#kssjxx').val();
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