var totalnum = [];
var hgl = [];
var cs = [];
var myChart = null;
var startdate = null;
var enddate = null;
var City=null;
$(function() {

	
	document.getElementById('CityName').innerHTML = City;
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssjxx').val(startdate);
	$('#jssj').val(enddate);
	getStationInfo();
})
//获取车辆数量及合格率
function getStationInfo() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.QualifiedCity",
			areaname:City,
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);

	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			totalnum.splice(0,totalnum.length);;
			hgl.splice(0,hgl.length);;
			cs.splice(0,cs.length);;
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				totalnum.push(obj.total);
				hgl.push(obj.qualified);
				cs.push(obj.stationname);
			}
			//加载统计图
			TJT();
		}
	}

	
	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "Survey",
			sql : "QualifiedCity",
			params : "String#"+City+";;String#" + startdate + ";;String#" + enddate
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					totalnum.splice(0,totalnum.length);;
					hgl.splice(0,hgl.length);;
					cs.splice(0,cs.length);;
					for (var i = 0; i < data.rows.length; i++) {
						var obj = data.rows[i];
						totalnum.push(obj.total);
						hgl.push(obj.qualified);
						cs.push(obj.stationname);
					}
					//加载统计图
					TJT();
				}
			}
		}
	});*/
}

//加载统计图
function TJT() {
	myChart = echarts.init(document.getElementById('main'));
	option = {
		//			title : {
		//		        text: '各州(市)检测总量及合格率统计图',
		//		        x: 'center',
		//		        top:'0',
		//		        textStyle:{
		//		        	color:'#FFF',
		//		        	fontSize:30
		//		        }
		//		    },
		tooltip : {
			trigger : 'axis',
			axisPointer : {
				type : 'cross'
			}
		},
		grid : {
			left : '5%',
			right : '5%',
			bottom : '2%',
			top : '10%',
			containLabel : true
		},
		xAxis : [
			{
				type : 'category',
				data : cs,
				axisLine : {
					lineStyle : {
						color : '#4EF0FE',
						fontSize : 12,
						width : 2
					}
				},
			}
		],
		yAxis : [
			{
				type : 'value',
				name : '单位:辆',
				axisLine : {
					lineStyle : {
						color : '#4EF0FE',
						fontSize : 12,
						width : 1
					}
				},
				axisLabel : {
					formatter : '{value} '
				}
			},
			{
				type : 'value',
				name : '合格率',
				min : 0,
				max : 100,
				interval : 20,
				axisLine : {
					lineStyle : {
						color : '#4EF0FE',
						fontSize : 12,
						width : 2
					}
				},
				axisLabel : {
					formatter : '{value} %'
				}
			}
		],
		series : [
			{
				name : '合格率:',
				type : 'line',
				yAxisIndex : 1,
				itemStyle : {
					normal : {
						color : '#288d9e',
						borderColor : 'rgba(219,50,51,0.2)',
						borderWidth : 12
					}
				},
				areaStyle : {
					normal : {
						color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
							offset : 0,
							color : 'rgba(40,141,158,0.2)'
						}, {
							offset : 1,
							color : 'rgba(40,141,158,0.5)'
						} ], false),
						shadowColor : '#288d9e',
						shadowBlur : 10
					}
				},
				data : hgl
			},
			{
				name : '车辆:',
				type : 'bar',

				barWidth : 35,
				itemStyle : {
					normal : {
						color : new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{
									offset : 0,
									color : '#F1A875'
								},
								{
									offset : 0.5,
									color : '#704563'
								},
								{
									offset : 1,
									color : '#2F115B'
								}
							]
						)
					}
				},
				data : totalnum
			},
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
	getStationInfo();
}
