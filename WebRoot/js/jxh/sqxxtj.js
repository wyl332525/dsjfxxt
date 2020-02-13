var totalnum = [];
var totalnum2 = [];
var hgl = [];
var cs = [];
var cs2 = [];
var myChart = null;
var startdate = null;
var enddate = null;
var checkQualifieCityWin=null;
var City=null;
var state = 0;
$(function() {
	myChart = echarts.init(document.getElementById('main'));
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssj').val(startdate);
	$('#jssj').val(enddate);
	getStationInfo();
})
//获取车辆数量及合格率
function getStationInfo() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getSqclxx2",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		state++;
		if (data.rows.length > 0) {
			totalnum.splice(0,totalnum.length);;
			//hgl.splice(0,hgl.length);;
			cs.splice(0,cs.length);;
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				totalnum.push(obj.zs);
				//hgl.push(obj.qualified);
				cs.push(obj.name);
			}
			//加载统计图
			//TJT();
		}
	}
	
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getSqjcff2",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		state++;
		if (data.rows.length > 0) {
			totalnum2.splice(0,totalnum2.length);;
			//hgl.splice(0,hgl.length);;
			cs.splice(0,cs.length);;
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				totalnum2.push(obj.zs);
				//hgl.push(obj.qualified);
				cs.push(obj.name);
			}
			//加载统计图
			//TJT();
		}
	}
	if(state == 2){
		//加载统计图
		TJT();
		state =0;
		
	}
	
}

//加载统计图
function TJT() {
	myChart.on('click', function (param) {
		City=param.name;
		toQualifieList();
	});
	option = {
		legend: {
	        data: ['申请修改车辆信息', '申请修改检测方法'],
			textStyle:{
	        	color:'#FFF',
	        	fontSize : 20
	        },
	        left: 5//图例放底部
	    },
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
				axisLabel : {
					fontSize : 20
				}
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
					fontSize : 20,
					formatter : '{value} '
				}
			}
		],
		series : [
			{
				name : '申请修改车辆信息',
				type : 'bar',

				barWidth : 35,
				itemStyle : {
					normal : {
						color : new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{
									offset : 0,
									color : '#288d9e'
								},
								{
									offset : 0.5,
									color : '#288d9e'
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
			{
				name : '申请修改检测方法',
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
				data : totalnum2
			},
		]
	};
	myChart.setOption(option);
}


//查询
function getValueDate() {
	startdate = $("#kssj").val();
	enddate = $("#jssj").val();
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

//function toQualifieList() {
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
//	window.top.$("#checkQualifieCityWinIframe").attr("src", rootPath + "/common/jxh/checkQualifiedCityList.yt?City="+City);
//	checkQualifieCityWin.window('open');
	//parent.popWindow.init(1600, 650, rootPath + "/view/mainpage/checkQualifiedCityList.do?City="+City);
//}