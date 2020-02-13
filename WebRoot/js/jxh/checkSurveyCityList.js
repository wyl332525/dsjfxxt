var cs = [];
var hgl = new Array();
var sj = [];
var yc = [];
var lc = [];
var sc = [];
var sic = [];
var startdate = null;//开始时间
var enddate = null;//结束时间
var myChart = null;
$(function() {
	// 基于准备好的dom，初始化echarts实例
	
	//document.getElementById('CityName').innerHTML = City;
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssjxx').val(startdate);
	$('#jssj').val(enddate);
	//TJT();
	getStationInfo();
})
//获取检测次数数据
function getStationInfo() {
	//获取检测车辆次数
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.SurveyCity",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);

	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			cs.splice(0,cs.length);
			sj.splice(0,sj.length);
			yc.splice(0,yc.length);
			lc.splice(0,lc.length);
			sc.splice(0,sc.length);
			sic.splice(0,sic.length);
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				cs.push(obj.stationname);
				sj.push(obj.firstcheck);
				yc.push(obj.onecheck);
				lc.push(obj.twocheck);
				sc.push(obj.therrcheck);
				sic.push(obj.therrcheckup);
			}
			hgl.push(sj);
			hgl.push(yc);
			hgl.push(lc);
			hgl.push(sc);
			hgl.push(sic);
			//加载折线图
			TJT();
		}
	}

	
	//获取检测车辆次数
	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "Survey",
			sql : "SurveyCity",
			params : "String#"+City+";;String#" + startdate + ";;String#" + enddate
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					cs.splice(0,cs.length);
					sj.splice(0,sj.length);
					yc.splice(0,yc.length);
					lc.splice(0,lc.length);
					sc.splice(0,sc.length);
					sic.splice(0,sic.length);
					for (var i = 0; i < data.rows.length; i++) {
						var obj = data.rows[i];
						cs.push(obj.stationname);
						sj.push(obj.firstcheck);
						yc.push(obj.onecheck);
						lc.push(obj.twocheck);
						sc.push(obj.therrcheck);
						sic.push(obj.therrcheckup);
					}
					hgl.push(sj);
					hgl.push(yc);
					hgl.push(lc);
					hgl.push(sc);
					hgl.push(sic);
					//加载折线图
					TJT();
				}
			}
		}
	});*/
}
// 指定图表的配置项和数据
function TJT() {
	myChart = echarts.init(document.getElementById('main'));
	var option = {
//			title : {
//		        text: '各州(市)按复检次数统计合格率折线图',
//		        x: 'center',
//		        top:'0',
//		        textStyle:{
//		        	color:'#FFF',
//		        	fontSize:30
//		        }
//		    },
		color : [ '#9015DF', '#FFEF00', '#FF7143', '#FF17C0', '#00FC00' ],
		tooltip : {
			trigger : 'axis',
			formatter : function(params) {
				return params[0].name + ':<br />'
					+ params[0].seriesName + ':' + params[0].value + '%<br />'
					+ params[1].seriesName + ':' + params[1].value + '%<br />'
					+ params[2].seriesName + ':' + params[2].value + '%<br />'
					+ params[3].seriesName + ':' + params[3].value + '%<br />'
					+ params[4].seriesName + ':' + params[4].value + '%';
			}
		//formatter:'{a0}:{c0}%<br />{a1}:{c1}%<br />{a2}:{c2}%<br />{a3}:{c3}%<br />{a4}:{c4}%<br />'
		},
		legend : {
			top:60,
			data : [
				{
					name : '首检合格',
					textStyle : {
						color : '#9015DF',
						fontSize : 20
					}
				}, {
					name : '1次复检合格率',
					textStyle : {
						color : '#FFEF00',
						fontSize : 20
					}
				}, {
					name : '2次复检合格率',
					textStyle : {
						color : '#FF7143',
						fontSize : 20
					}
				}, {
					name : '3次复检合格率',
					textStyle : {
						color : '#FF17C0',
						fontSize : 20
					}
				}, {
					name : '3次以上合格率',
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
			bottom : '3%',
			containLabel : true
		},

		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : cs,
			axisLabel : {
				show : true,
				color : '#30d2d7',
				fontSize : 20
			},
			axisLine : {
				lineStyle : {
					color : "#30d2d7"
				}
			},
		},
		yAxis : {
			type : 'value',
			max : 100,
			min : 0,
			axisLabel : {
				show : true,
				color : "#30d2d7",
				fontSize : 20,
				formatter : '{value}%'
			},
			axisLine : {
				lineStyle : {
					color : "#30d2d7"
				}
			}
		},
		grid:{
            y:160
        },
		series : [
			{
				name : '首检合格',
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
				name : '1次复检合格率',
				type : 'line',
				data : hgl[1],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
			},
			{
				name : '2次复检合格率',
				type : 'line',
				data : hgl[2],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
			},
			{
				name : '3次复检合格率',
				type : 'line',
				data : hgl[3],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
			},
			{
				name : '3次以上合格率',
				type : 'line',
				data : hgl[4],
				symbol : 'star', //拐点样式
				symbolSize : 8, //拐点大小
			}
		]
	};
	//使用刚指定的配置项和数据显示图表。
	
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
	getStationInfo();
}