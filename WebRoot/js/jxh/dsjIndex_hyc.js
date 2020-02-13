var charcharObj;
var charTimes;
var hgl = new Array(); //合格率
var totalnum = new Array(); //合格车辆
var piechart3; //柱状图
var piechart; //安检测方法统计
var piechart2; //安检线统计
var piechart4;
var ref = ""; //定时执行变量
var isrun = 0;
var dshgltjWin = null;
var hbcyjctjWin = null;
var checkSurveyWin = null; //检测概况详情窗口
var checkQualifieWin = null; //检测量详情
var checkVisual2Win = null; //车辆追踪详情
var checklwqkWin=null;//联网详情
var startdate = null;
var enddate = null;
var defaultRoom = 0;
var zsj = 0;
var drsj = 0;
var wgxxcount=0;//违规信息计数

var myChart2 = null;
var totalnum = [];
var hgl = [];
var cs = [];
var City=null;
var testDg1=null;
var zhjcgkwz = 0;
var cycjcgkwz = 0;
$(function() {
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	//实时检测车辆
	ssjc();
	//检测量和工况率统计
	//jclAndgkl();
	getSqxx();
	//piechart4 = echarts.init(document.getElementById('chart1td1'));
	getStationInfo(); //检测站概况信息
	//getSjhgl();
	loadSmokeCarTotal();
	//getlwqk();//联网情况
	//右上合格率饼状统计图
	//dsHglBt();
	//右下检测数量柱状统计图
	//dstj();
	
	
	//getStationBaseInfo();//检测站基本信息
	//getCharTimes();//获取检测时间
	//clzz();

	$('html').fontFlex(12, 20, 114);
	// 时间轴
	$(".timeP").click(function() {
		var ss = $(this).text();
		var sq = "String#" + ss + " 00:00:00;;String#" + ss + " 23:59:59";
		loadYzydInfo(sq);
		//	piechart3.resize();
		$(this).addClass("timePk");
		$(this).siblings().removeClass("timePk");
	});
	var i = -1;
	var length = $(".timeP").length;
	$("#butright").click(function() {
		i++;
		i = i >= length ? 0 : i;
		$(".timeP").eq(i).addClass("timePk");
		$(".timeP").eq(i).siblings().removeClass("timePk");
		var ss = $(".timeP").eq(i).text();
		var sq = "String#" + ss + " 00:00:00;;String#" + ss + " 23:59:59";
		loadYzydInfo(sq);
	});
	$("#butleft").click(function() {
		i--;
		i = i <= 0 ? 0 : i;
		$(".timeP").eq(i).addClass("timePk");
		$(".timeP").eq(i).siblings().removeClass("timePk");
		var ss = $(".timeP").eq(i).text();
		var sq = "String#" + ss + " 00:00:00;;String#" + ss + " 23:59:59";
		loadYzydInfo(sq);
	});
	$("#ztbut").click(function() {
		//去掉循环播放
		clearInterval(ref);
		$("#ztbut").hide();
		$("#bfbut").show();
	});
	$("#bfbut").click(function() {
		//设置定时刷新
		ref = setInterval(function() {
			autoRuns();
		}, 5000);
		$("#bfbut").hide();
		$("#ztbut").show();
	});

	var oMyBar1 = new MyScrollBar({
		selId : 'mainMessage',
		bgColor : 'rgba(50, 50, 50, 0.2)',
		barColor : '#173E72',
		enterColor : '#173E72',
		enterShow : false,
		borderRadius : 2,
		width : 4
	});
	$("#mainMessage>div>div").addClass("barstyle");
	$("#textMessageTable tr:even").addClass("style1"); //奇数行的样式
	//$("#yieldTable tr:even").addClass("style1"); //奇数行的样式
	$("#mainMessageTable tr:even").addClass("style1"); //奇数行的样式
	$("#alarmMessageTable tr:even").addClass("style1"); //奇数行的样式
	if (charTimes != null && charTimes.length > 0) {
		//3. 设置定时刷新
		ref = setInterval(function() {
			autoRuns();
		}, 5000);
		$("#ztbut").show();
		$("#bfbut").hide();
	} else {
		$("#ztbut").hide();
		$("#bfbut").hide();
	}
	//
	window.addEventListener("resize", function() { //窗口改变时的事件监听
		if (piechart != null)
			piechart.resize();
		if (piechart2 != null)
			piechart2.resize();
		if (piechart3 != null)
			piechart3.resize();
	});
	/*piechart.resize();*/
	//piechart2.resize();
	//piechart3.resize();


	document.getElementById("chart3").innerHTML = '<iframe name="myiframe" style="width:100%;height:100%;position:relative;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + rootPath + '/view/map/default.do"></iframe>';
	$("#myiframe").load(function() {
		$(this).contents().find("div.embed-footer").css('display', 'none');
	});
	
	
	window.setInterval(function() {
		getStationInfo();
		ssjc();
	}, 10000);
	
	window.setInterval(function(){
		var cd=new Date();
		var year = cd.getFullYear();
		var month = cd.getMonth()+1 < 10 ? '0'+(cd.getMonth()+1) : (cd.getMonth()+1);
		var day = cd.getDate() < 10 ? '0'+ cd.getDate() : cd.getDate();
		var hour = cd.getHours() < 10 ? '0'+ cd.getHours() : cd.getHours();
		var minute = cd.getMinutes() < 10 ? '0'+ cd.getMinutes() : cd.getMinutes();
		var second = cd.getSeconds() < 10 ? '0'+ cd.getSeconds() : cd.getSeconds();
		$("#curTime").html(year+"-"+month+"-"+
			day+" "+hour+":"+minute+":"+second);
	},1000);
	
	LoadJczlByDay();
	//LoadCycJczl();
	cyctjl();
	LoadJcffQk();
//	LoadYwsqQk();
	
    
    
});

function toFull(){
	$("#mainLeft").hide();
	$("#mainRight").hide();
	$("#mainMessage").hide();
	$("#mainMiddle").css({"width":"98%","height":"98%"})
	//$("#chart3").css({"width":"100%","height":"100%"})
}

function toFull(){
	$("#mainLeft").hide();
	$("#mainRight").hide();
	$("#mainMessage").hide();
	$("#mainMiddle").css({"width":"98%","height":"98%"});
	$("#chart3").css({"width":"100%","height":"100%"});
}
function noFull(){
	$("#mainMiddle").css({"width":"45%"});
	$("#chart3").css({"width":"50rem","height":"27rem"});
	$("#mainLeft").show();
	$("#mainRight").show();
	$("#mainMessage").show();
}

function ymtz(url){
	window.location.href = url;
}

function jclAndgkl(){
	myChart2 = echarts.init(document.getElementById('yield2'));

	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getJCLandGKL",
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
				cs.push(obj.name);
			}
			//加载统计图
			myChart2.on('click', function (param) {
				City=param.name;
				
			});
			option = {
					color: ['#00a8ff'],
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'cross'
					}
				},
				grid : {
					left : '3%',
					right : '3%',
					bottom : '1%',
					top : '15%',
					containLabel : true
				},
				xAxis : [
					{
						type : 'category',
						data : cs,
						splitLine: { show: false },//去除网格线
		                splitArea: { show: false },//保留网格区域
						axisLine : {
							lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
						},
						axisLabel: {
							rotate:30,
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					}
				],
				yAxis : [
					{
						type : 'value',
						name : '单位:辆',
						axisTick: {
		                    show: false
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					},
					{
						type : 'value',
						name : '工况率',
						min : 0,
						max : 100,
						interval : 20,
						axisTick: {
		                    show: false
		                },
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
						axisLabel : {
							formatter : '{value} %'
						}
					}
				],
				series : [
					{
						name : '工况率',
						type : 'line',
						yAxisIndex : 1,
						smooth: true,
		                symbol: 'circle',
		                symbolSize: 0,
		                sampling: 'average',
		                itemStyle: {
		                    normal: {
		                        color: '#8a86fa'
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
						data : hgl
					},
					{
						name : '车辆',
						type : 'bar',
						barWidth: '60%',
						data : totalnum
					},
				]
			};
			myChart2.setOption(option);
		}
	}
}

function getSqxx(){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getSqclxx"
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var str="";
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			str+="<tr><td class='sqxx'>"+obj.name+"</td>";
			str+="<td class='sqxx2'>"+obj.zs+'次'+"</td></tr>";
		}
		$("#sqsl3").html(str);
	}
	
	var args2 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getSqjcff"
		}
	var data2 = loadDatasAjax(args2);
	if (null != data2.rows && "" != data2.rows) {
		var str2="";
		for(var i = 0; i < data2.rows.length; i++){
			var obj2=data2.rows[i];
			str2+="<tr><td class='sqxx'>"+obj2.name+"</td>";
			str2+="<td class='sqxx2'>"+obj2.zs+'次'+"</td></tr>";
		}
		$("#sqsl2").html(str2);
	}
}

function cyctjl(){
	var myChart2 = echarts.init(document.getElementById('yield1_l0'));

	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.Survey.getCycJCLandHGL",
		starttime : startdate,
		endtime : enddate
	}
	var data = loadDatasAjax(args1);
	var zs = new Array();
	var hgl = new Array();
	var cs = new Array();
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			var titlecount = 0;
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				zs.push(obj.zs);
				hgl.push(obj.cychgl);
				cs.push(obj.stationname);
				titlecount+=parseInt(obj.zs);
			}
			
			if(titlecount!=0){
				btsz1(titlecount,0);
			}
			//加载统计图
			myChart2.on('click', function (param) {
				City=param.name;
				
			});
			option = {
					color: ['#00a8ff'],
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'cross'
					}
				},
				grid : {
					left : '3%',
					right : '3%',
					bottom : '1%',
					top : '15%',
					containLabel : true
				},
				xAxis : [
					{
						type : 'category',
						data : cs,
						splitLine: { show: false },//去除网格线
		                splitArea: { show: false },//保留网格区域
						axisLine : {
							lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
						},
						axisLabel: {
							rotate:30,
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					}
				],
				yAxis : [
					{
						type : 'value',
						name : '单位:辆',
						axisTick: {
		                    show: false
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					},
					{
						type : 'value',
						name : '合格率',
						min : 0,
						max : 100,
						interval : 20,
						axisTick: {
		                    show: false
		                },
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
						axisLabel : {
							formatter : '{value} %'
						}
					}
				],
				series : [
					{
						name : '工况率',
						type : 'line',
						yAxisIndex : 1,
						smooth: true,
		                symbol: 'circle',
		                symbolSize: 0,
		                sampling: 'average',
		                itemStyle: {
		                    normal: {
		                        color: '#8a86fa'
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
						data : hgl
					},
					{
						name : '车辆',
						type : 'bar',
						barWidth: '60%',
						data : zs
					},
				]
			};
			myChart2.setOption(option);
		}
	}
}

function alltjl(){
	var myChartAll = echarts.init(document.getElementById('yield1_l1'));

	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.Survey.getJCLandHGL",
		starttime : startdate,
		endtime : enddate
	}
	var data = loadDatasAjax(args1);
	var zs = new Array();
	var hgl = new Array();
	var cs = new Array();
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			var titlecount = 0;
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				zs.push(obj.zs);
				hgl.push(obj.zhgl);
				cs.push(obj.stationname);
				titlecount+=parseInt(obj.zs);
			}
			
			if(titlecount!=0){
				btsz1(titlecount,1);
			}
			//加载统计图
			option = {
					color: ['#00a8ff'],
				tooltip : {
					trigger : 'axis',
					axisPointer : {
						type : 'cross'
					}
				},
				grid : {
					left : '3%',
					right : '3%',
					bottom : '1%',
					top : '15%',
					containLabel : true
				},
				xAxis : [
					{
						type : 'category',
						data : cs,
						splitLine: { show: false },//去除网格线
		                splitArea: { show: false },//保留网格区域
						axisLine : {
							lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
						},
						axisLabel: {
							rotate:30,
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					}
				],
				yAxis : [
					{
						type : 'value',
						name : '单位:辆',
						axisTick: {
		                    show: false
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                }
					},
					{
						type : 'value',
						name : '合格率',
						min : 0,
						max : 100,
						interval : 20,
						axisTick: {
		                    show: false
		                },
		                axisLine: {
		                    lineStyle: {
		                        type: 'solid',
		                        color: '#9ac9fa',//左边线的颜色
		                        width: '2'//坐标线的宽度
		                    }
		                },
		                axisLabel: {
		                    textStyle: {
		                        color: '#9ac9fa',//坐标值得具体的颜色

		                    }
		                },
		                splitLine: {
		                    show: true,
		                    //  改变轴线颜色
		                    lineStyle: {
		                        // 使用深浅的间隔色
		                        color: '#054660',
		                    }
		                },
		                splitArea: { show: false },//保留网格区域
		                type: 'value',
						axisLabel : {
							formatter : '{value} %'
						}
					}
				],
				series : [
					{
						name : '合格率',
						type : 'line',
						yAxisIndex : 1,
						smooth: true,
		                symbol: 'circle',
		                symbolSize: 0,
		                sampling: 'average',
		                itemStyle: {
		                    normal: {
		                        color: '#8a86fa'
		                    }
		                },
		                areaStyle: {
		                    normal: {
		                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: '#494e9b'
		                        }, {
		                            offset: 1,
		                            color: '#142a53'
		                        }])
		                    }
		                },
						data : hgl
					},
					{
						name : '车辆',
						type : 'bar',
						barWidth: '60%',
						data : zs
					},
				]
			};
			myChartAll.setOption(option);
		}
	}
}


//动态展现柱状图、按车型、检测方法、检测线、报警统计
function loadYzydInfo(sstime) {
	//合格率柱状图信息
	getCharDatas(sstime);
	//按车型统计
	getDatasByCLlx(sstime);
	//按检测方法统计合格率
	getDatasByJCFF(sstime);
	//按检测线统计合格率
	getDatasByJCX(sstime);
	//报警信息查询
	getAlertDatas(sstime);
}

//自动执行
function autoRuns() {
	$("#butright").click();
}

//检测概况数据组织
function getStationInfo() {
	//获取检测车辆次数
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.countJccls",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			var obj = data.rows[0];
			var options = {
	            useEasing: true, 
	            useGrouping: true, 
	            separator: ',', 
	            decimal: '.', 
	        };
	        var demo = new CountUp('carsnums', zsj, obj.nums, 0, 5);
	        if (!demo.error) {
	            demo.start();
	        } else {
	            //console.error(demo.error);
	        }
	        zsj = Number(obj.nums);
			//$("#carsnums").html(obj.nums);
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
		            useEasing: true, 
		            useGrouping: true, 
		            separator: ',', 
		            decimal: '.', 
		        };
		        var demo1 = new CountUp('jcxnums', drsj, obj.nums, 0, 5);
		        if (!demo1.error) {
		            demo1.start();
		        } else {
		            //console.error(demo.error);
		        }
		        drsj = Number(obj.nums);
			//$("#jcxnums").html(obj.nums);
		}
	}
	
	//检测站一站一档
	var jczzsObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getJczzs",region:area}).rows[0];
	var jczzs = jczzsObj["c"];
	var demo1 = new CountUp('jczzs', 0, jczzs, 0, 10);
    if (!demo1.error) {
        demo1.start();
    } else {
        console.error(demo1.error);
    }
    
    var wgalzsObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getWgalzs",region:area}).rows[0];
	var wgalzs = wgalzsObj["c"];
	var demo2 = new CountUp('wgalzs', 0, wgalzs, 0, 10);
    if (!demo2.error) {
        demo2.start();
    } else {
        console.error(demo2.error);
    }
    
    var options = {
	  useEasing: true, 
	  useGrouping: true, 
	  separator: '', 
	  decimal: '.', 
	};
    var clxxObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getClxxzs"}).rows[0];
	var clxxzs = clxxObj["c"];
	var demo3 = new CountUp('clsjzs', 0, clxxzs, 0, 10,options);
    if (!demo3.error) {
        demo3.start();
    } else {
        console.error(demo3.error);
    }
    
    var ycsjzsObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.Survey.getYcsjzs",region:area}).rows[0];
	var ycsjzs = ycsjzsObj["c"];
	var demo4 = new CountUp('ycnums', 0, ycsjzs, 0, 10);
    if (!demo4.error) {
        demo4.start();
    } else {
        console.error(demo4.error);
    }
}
function getSjhgl(){
	//合格率统计
	var hglhtml = ""; //合格率信息
	var sjnums = "",
		sjhgl = "0"; //首检合格数
	var fj1nums = "",
		fj1hgl = "0"; //复检1次合格数
	var fj2nums = "",
		fj2hgl = "0"; //复检2次合格数
	var fj3nums = "",
		fj3hgl = "0"; //复检3次合格数
	var fj4nums = "",
		fj4hgl = "0"; //复检4次合格数
	
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.hgltj",
			starttime : startdate,
			endtime:enddate
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			for (var i = 0; i < data.rows.length; i++) {
				var obj = data.rows[i];
				if (obj.fjqk == "0") {
					sjnums = obj.hgs;
					sjhgl = obj.hgl;
				} else if (obj.fjqk == "1") {
					fj1nums = obj.hgs;
					fj1hgl = obj.hgl;
				} else if (obj.fjqk == "2") {
					fj2nums = obj.hgs;
					fj2hgl = obj.hgl;
				} else if (obj.fjqk == "3") {
					fj3nums = obj.hgs;
					fj3hgl = obj.hgl;
				} else if (obj.fjqk == "4") {
					fj4nums = obj.hgs;
					fj4hgl = obj.hgl;
				}
			}
		}
	}
	
	sjhgl = 34.5;
	fj1hgl = 22.3;
	fj2hgl = 12.5;
	fj3hgl = 19.3;
	fj4hgl = 11.4;
	

	
//	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>首检合格率</td><td width='20%' style='color:#96C9FA;'>" + sjhgl + "%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";
//	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>1次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj1hgl + "%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";
//	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>2次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj2hgl + "%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
//	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>3次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj3hgl + "%</td><td width='38%'><input type='text' class='yieldBar3' style='display: none;'></td></tr>";
//	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>3次以上合格率</td><td width='20%' style='color:#96C9FA;'>" + fj4hgl + "%</td><td width='38%'><input type='text' class='yieldBar4' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>重型货车</td><td width='20%' style='color:#96C9FA;'>" + sjhgl + "%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>中型货车</td><td width='20%' style='color:#96C9FA;'>" + fj1hgl + "%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>大型客车</td><td width='20%' style='color:#96C9FA;'>" + fj2hgl + "%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>中型客车</td><td width='20%' style='color:#96C9FA;'>" + fj3hgl + "%</td><td width='38%'><input type='text' class='yieldBar3' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>其他</td><td width='20%' style='color:#96C9FA;'>" + fj4hgl + "%</td><td width='38%'><input type='text' class='yieldBar4' style='display: none;'></td></tr>";
	
	$("#yieldTable").append(hglhtml);
	var elem = document.querySelector('.yieldBar0'); //选择input元素
	var init = new Powerange(elem, {
		disable : true,
		klass : 'power-ranger',
		min : 0,
		max : 100,
		start : sjhgl
	}); //实例化powerange类并且初始化参数
	var elem2 = document.querySelector('.yieldBar1'); //选择input元素
	var init2 = new Powerange(elem2, {
		disable : true,
		klass : 'power-ranger',
		min : 0,
		max : 100,
		start : fj1hgl
	}); //实例化powerange类并且初始化参数
	var elem3 = document.querySelector('.yieldBar2'); //选择input元素
	var init3 = new Powerange(elem3, {
		disable : true,
		klass : 'power-ranger',
		min : 0,
		max : 100,
		start : fj2hgl
	}); //实例化powerange类并且初始化参数
	var elem4 = document.querySelector('.yieldBar3'); //选择input元素
	var init4 = new Powerange(elem4, {
		disable : true,
		klass : 'power-ranger',
		min : 0,
		max : 100,
		start : fj3hgl
	}); //实例化powerange类并且初始化参数
	var elem5 = document.querySelector('.yieldBar4'); //选择input元素
	var init5 = new Powerange(elem5, {
		disable : true,
		klass : 'power-ranger',
		min : 0,
		max : 100,
		start : fj4hgl
	}); //实例化powerange类并且初始化参数
	
	
	
}
function sx(){
	$("#sx").hide();
	getlwqk();
}
function getlwqk(){
	
	var lwObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getlwqk"}).rows;
	var lwhtml="";
	for(var i=0;i<lwObj.length;i++){
		lwhtml += "<tr><td width='23%' onclick='tolwqkList("+lwObj[i].areacode+")'>";
		if(lwObj[i].sj>30){
			lwhtml+="<font color='#FFF'>"+lwObj[i].stationshortname+"</font><div class='wlw'></div></td>";
		}else{
			lwhtml+="<font color='#96C9FA'>"+lwObj[i].stationshortname+"</font><div class='lw'></div></td>";
		}
		if(i<lwObj.length-1){
			i++;
		}else{
			break;
		}
		lwhtml += "<td width='23%' style='color:#96C9FA;' onclick='tolwqkList("+lwObj[i].areacode+")'>";
		if(lwObj[i].sj>30){
			lwhtml+="<font color='#FFF'>"+lwObj[i].stationshortname+"</font><div class='wlw'></div></td>";
		}else{
			lwhtml+="<font color='#96C9FA'>"+lwObj[i].stationshortname+"</font><div class='lw'></div></td>";
		}
		if(i<lwObj.length-1){
			i++;
		}else{
			break;
		}
		lwhtml += "<td width='23%' style='color:#96C9FA;' onclick='tolwqkList("+lwObj[i].areacode+")'>";
		if(lwObj[i].sj>30){
			lwhtml+="<font color='#FFF'>"+lwObj[i].stationshortname+"</font><div class='wlw'></div></td>";
		}else{
			lwhtml+="<font color='#96C9FA'>"+lwObj[i].stationshortname+"</font><div class='lw'></div></td>";
		}
		if(i<lwObj.length-1){
			i++;
		}else{
			break;
		}
		lwhtml += "<td width='23%' style='color:#96C9FA;' onclick='tolwqkList("+lwObj[i].areacode+")'>";
		if(lwObj[i].sj>30){
			lwhtml+="<font color='#FFF'>"+lwObj[i].stationshortname+"</font><div class='wlw'></div></td></tr>";
		}else{
			lwhtml+="<font color='#96C9FA'>"+lwObj[i].stationshortname+"</font><div class='lw'></div></td></tr>";
		}
	}
	$("#yieldTable1").html(lwhtml);
	$("#sx").show();
//	window.setInterval(function() {
//		getlwqk();
//	}, 10*60*1000);
}


function jcgk(){
	$("#mainLeftTop1").hide();
	$("#mainLeftTop").show();
}
function lwqk(){
	$("#mainLeftTop1").show();
	$("#mainLeftTop").hide();
}


//获取检测站基本信息
function getStationBaseInfo() {
	var shtml = "";
	shtml += "<tr><td width='45%'>检测机构名称</td><td width='54%'></td></tr>";
	shtml += "<tr><td width='45%'>检测机构简称</td><td width='54%'></td></tr>";
	shtml += "<tr><td>所属行政区划</td><td></td></tr>";
	shtml += "<tr><td>检测站状态</td><td class='note'></td></tr>";
	shtml += "<tr><td>注册日期</td><td></td></tr>";
	shtml += "<tr><td>检测机构地址</td><td></td></tr>";
	shtml += "<tr><td>法人</td><td></td></tr>";
	shtml += "<tr><td>法人电话</td><td></td></tr>";
	shtml += "<tr><td>站长</td><td></td></tr>";
	shtml += "<tr><td>站长电话</td><td></td></tr>";
	shtml += "<tr><td>环保负责人</td><td></td></tr>";
	shtml += "<tr><td>环保负责人电话</td><td></td></tr>";
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "yzydgl",
			sql : "queryStations",
			params : "String#" + stationPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					var obj = data.rows[0];
					shtml = "";
					shtml += "<tr><td width='45%'>检测机构名称</td><td width='54%'>" + obj.jczmc + "</td></tr>";
					shtml += "<tr><td width='45%'>检测机构简称</td><td width='54%'>" + obj.jczjc + "</td></tr>";
					shtml += "<tr><td>所属行政区划</td><td>" + obj.xzqh + "</td></tr>";
					shtml += "<tr><td>检测站状态</td><td class='note'>" + obj.zt + "</td></tr>";
					shtml += "<tr><td>注册日期</td><td>" + obj.zcrq + "</td></tr>";
					shtml += "<tr><td>检测机构地址</td><td>" + obj.jczdz + "</td></tr>";
					shtml += "<tr><td>法人</td><td>" + obj.qyfr + "</td></tr>";
					shtml += "<tr><td>法人电话</td><td>" + obj.frlxdh + "</td></tr>";
					shtml += "<tr><td>站长</td><td>" + obj.zz + "</td></tr>";
					shtml += "<tr><td>站长电话</td><td>" + obj.zzyddh + "</td></tr>";
					shtml += "<tr><td>环保负责人</td><td>" + obj.hbjcfzr + "</td></tr>";
					shtml += "<tr><td>环保负责人电话</td><td>" + obj.fzryddh + "</td></tr>";
				}
			}
		}
	});
	$("#textMessageTable").append(shtml);
}

//获取检测合格率柱状图信息
function getCharDatas(stime) {
	//获取检测车辆总数
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "yzydgl",
			sql : "getCharDatas",
			params : "String#" + stationPkid + ";;" + stime
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					var ii = data.rows.length - 1;
					totalnum.length = 0;
					hgl.length = 0;
					charObj = data.rows[ii];
					var sjnum = charObj.sjnum;
					var sjok = charObj.sjok;
					var ofjnum = charObj.ofjnum;
					var ofjok = charObj.ofjok;
					var tfjnum = charObj.tfjnum;
					var tfjok = charObj.tfjok;
					var sfjnum = charObj.sfjnum;
					var sfjok = charObj.sfjok;
					var ffjnum = charObj.ffjnum;
					var ffjok = charObj.ffjok;
					totalnum.push(sjnum);
					totalnum.push(ofjnum);
					totalnum.push(tfjnum);
					totalnum.push(sfjok);
					totalnum.push(ffjnum);
					if (sjnum == 0) {
						sjnum = 1;
					}
					if (ofjnum == 0) {
						ofjnum = 1;
					}
					if (tfjnum == 0) {
						tfjnum = 1;
					}
					if (sfjnum == 0) {
						sfjnum = 1;
					}
					if (ffjnum == 0) {
						ffjnum = 1;
					}
					var hgl0 = sjok * 100 / sjnum;
					var hgl1 = ofjok * 100 / ofjnum;
					var hgl2 = tfjok * 100 / tfjnum;
					var hgl3 = sfjok * 100 / sfjnum;
					var hgl4 = ffjok * 100 / ffjnum;
					hgl.push(hgl0.toFixed(2));
					hgl.push(hgl1.toFixed(2));
					hgl.push(hgl2.toFixed(2));
					hgl.push(hgl3.toFixed(2));
					hgl.push(hgl4.toFixed(2));
					option = {
						tooltip : {
							trigger : 'axis',
							axisPointer : {
								type : 'cross'
							}
						},
						grid : {
							left : '2%',
							right : '8%',
							bottom : '2%',
							top : '22%',
							containLabel : true
						},
						xAxis : [
							{
								type : 'category',
								data : [ '首检', '一次复检', '2次复检', '3次复检', '3次以上' ],
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
								name : '合格率',
								type : 'line',
								yAxisIndex : 1,
								itemStyle : {
									normal : {
										color : '#0F3DDD',
										borderColor : 'rgba(219,50,51,0.2)',
										borderWidth : 12
									}
								},
								areaStyle : {
									normal : {
										color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
											offset : 0,
											color : 'rgba(0, 136, 212, 0.3)'
										}, {
											offset : 0.8,
											color : 'rgba(0, 136, 212, 0)'
										} ], false),
										shadowColor : 'rgba(0, 0, 0, 0.1)',
										shadowBlur : 10
									}
								},
								data : hgl
							},
							{
								name : '单位:辆',
								type : 'bar',

								barWidth : 35,
								itemStyle : {
									normal : {
										barBorderRadius : 35,
										color : new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{
													offset : 0,
													color : '#4EF0FE'
												},
												{
													offset : 1,
													color : '#1A6A7D'
												}
											]
										)
									}
								},
								data : totalnum
							},
						]
					};
					piechart3.setOption(option);
				}
			}
		}
	});
}
//获取检测合格率柱状图信息
function getCharTimes() {
	//获取检测车辆总数
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "yzydgl",
			sql : "getcharTimes",
			params : "String#" + stationPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					charTimes = data.rows;
				}
			}
		}
	});
}
//按照车型统计
function getDatasByCLlx(stime) {
	$("#mainMessageTable").html("");
	var stry = "";
	var numt = 8;
	var totalsc = 0;
	var chtml = "<tbody class='scroll'><tr class='opaque'>";
	chtml += "<td width='10%'>车辆类型</td><td width='10%'>首检</td><td width='20%'>合格率</td>";
	chtml += "<td width='10%'>1次复检</td><td width='20%'>合格率</td><td width='10%'>2次以上</td>";
	chtml += "<td width='20%'>合格率</td></tr>";
	chtml += "</tbody>";
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "yzydgl",
			sql : "getDatasByCLlx",
			params : "String#" + stationPkid + ";;" + stime
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					totalsc = data.rows.length;
					for (var i = 0; i < data.rows.length; i++) {

						var obj = data.rows[i];
						var sjnum = obj.sjnum;
						var sjok = obj.sjok;
						var ofjnum = obj.ofjnum;
						var ofjok = obj.ofjok;
						var tfjnum = obj.tfjnum;
						var tfjok = obj.tfjok;
						if (sjnum == 0) {
							sjnum = 1;
						}
						if (ofjnum == 0) {
							ofjnum = 1;
						}
						if (tfjnum == 0) {
							tfjnum = 1;
						}
						var hgl0 = sjok * 100 / sjnum;
						var hgl1 = ofjok * 100 / ofjnum;
						var hgl2 = tfjok * 100 / tfjnum;
						chtml += "<tr><td title='" + obj.cllx + "'>" + obj.cllx + "</td>";
						chtml += "<td><span class='fstNub'>" + sjnum + "</span></td>";
						chtml += "<td><input type='text' class='yieldBar" + (numt + 0) + "' style='display: none;'><span class='fstNub'>" + hgl0.toFixed(2) + "%</span></td>";
						chtml += "<td><span class='fstNub'>" + ofjnum + "</span></td>";
						chtml += "<td><input type='text' class='yieldBar" + (numt + 1) + "' style='display: none;'><span class='fstNub'>" + hgl1.toFixed(2) + "%</span></td>";
						chtml += "<td><span class='fstNub'>" + tfjnum + "</span></td>";
						chtml += "<td><input type='text' class='yieldBar" + (numt + 2) + "' style='display: none;'><span class='fstNub'>" + hgl2.toFixed(2) + "%</span></td>";
						chtml += "</tr>";
						stry += numt + ":" + hgl0.toFixed(2) + ";";
						stry += (numt + 1) + ":" + hgl1.toFixed(2) + ";";
						stry += (numt + 2) + ":" + hgl2.toFixed(2) + ";";
						numt = numt + 3;
					}
				}
			}
		}
	});
	//不足行补足行
	for (var j = totalsc; j < 7; j++) {
		chtml += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#mainMessageTable").append(chtml);
	//	8:0.00;9:100.00;10:0.00;11:0.00;12:52.73;13:0.00;14:100.00;15:100.00;
	if (stry.length > 0) {
		var a = stry.split(";");
		if (a.length > 0) {
			for (var n = 0; n < a.length - 1; n++) {
				var b = a[n].split(":");
				//alert(b[0]+"_"+b[1]);
				var elem = document.querySelector('.yieldBar' + b[0]);
				var init = new Powerange(elem, {
					disable : true,
					klass : 'power-ranger',
					min : 0,
					max : 100,
					start : b[1]
				}); //实例化powerange类并且初始化参数
			}
		}
	}
}

//按检测方法统计合格率
function getDatasByJCFF(stime) {
	var showTime = stime.substr(7, 10);
	if (stime.substr(7, 1) == "$")
		showTime = "";
	$("#jcffDiv").html(showTime + "按检测方法合格率情况");
	var vjcff = new Array();
	var seriesT = new Array();
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "yzydgl",
			sql : "getDatasByJCFF",
			params : "String#" + stationPkid + ";;" + stime
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					for (var i = 0; i < data.rows.length; i++) {
						var vobj = data.rows[i];
						vjcff.push("'" + vobj.jcff + "'");
						var sjnum = vobj.sjnum;
						var sjok = vobj.sjok;
						var ofjnum = vobj.ofjnum;
						var ofjok = vobj.ofjok;
						var tfjnum = vobj.tfjnum;
						var tfjok = vobj.tfjok;
						var sfjnum = vobj.sfjnum;
						var sfjok = vobj.sfjok;
						var ffjnum = vobj.ffjnum;
						var ffjok = vobj.ffjok;
						var totalnum = new Array();
						totalnum.push(sjok);
						totalnum.push(ofjok);
						totalnum.push(tfjok);
						totalnum.push(sfjok);
						totalnum.push(ffjok);
						//						if(sjnum==0){
						//							sjnum=1;
						//						}
						//						if(ofjnum==0){
						//							ofjnum=1;
						//						}
						//						if(tfjnum==0){
						//							tfjnum=1;
						//						}
						//						if(sfjnum==0){
						//							sfjnum=1;
						//						}
						//						if(ffjnum==0){
						//							ffjnum=1;
						//						}
						//						var hgl0=sjok*100/sjnum;
						//						var hgl1=ofjok*100/ofjnum;
						//						var hgl2=tfjok*100/tfjnum;
						//						var hgl3=sfjok*100/sfjnum;
						//						var hgl4=ffjok*100/ffjnum;
						//						hgl.push(hgl0.toFixed(2));
						//						hgl.push(hgl1.toFixed(2));
						//						hgl.push(hgl2.toFixed(2));
						//						hgl.push(hgl3.toFixed(2));
						//						hgl.push(hgl4.toFixed(2));
						seriesT[i] = {
							name : "'" + vobj.jcff + "'",
							type : 'line',
							smooth : true,
							data : totalnum
						};

					}
				}
			}
		}
	});
	option = {
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			data : vjcff,
			textStyle : {
				color : '#f1f1f1',
				fontSize : 12,
			}
		},
		grid : {
			left : '2%',
			right : '8%',
			bottom : '2%',
			containLabel : true
		},
		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : [ '首次', '一次复检', '二次复检', '三次复检', '三次以上' ],
			axisLine : {
				lineStyle : {
					color : '#f1f1f1',
					fontSize : 12,
					width : 2
				}
			},
		},
		yAxis : {
			type : 'value',
			axisLine : {
				lineStyle : {
					color : '#f1f1f1',
					fontSize : 12,
					width : 2
				}
			},
		},
		series : seriesT
	};
	piechart.setOption(option);
}

function roundFun(v, n) {
	var test=Math.round(v * Math.pow(10, n)) / Math.pow(10, n);
	return Math.round(v * Math.pow(10, n)) / Math.pow(10, n);
}


function dstj() {
	var myChart = echarts.init(document.getElementById('chart2'));
	//首先查询数据
	var dsArray = new Array();
	var jclArray = new Array();
	var dataObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getDsjclGroup",
		starttime : startdate,
		endtime:enddate});
	for (var i = 0; i < dataObj.total; i++) {
		var ret = dataObj.rows;
		dsArray.push(ret[i].area);
		jclArray.push(ret[i].c);
	}
	var option = {
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid : {
			x : 30
		},
		animationDelay: function (idx) {
            return 5000;
        },
		xAxis : [
			{
				type : 'category',
				data : dsArray,
				boundaryGap : [ 0, 0.01 ],
				axisLine : {
					lineStyle : {
						color : '#96C9FA'
					},
				},
				axisLabel : {
					interval : 0,
					rotate:45,
					fontWeight:'bold',
					fontSize:15
					/*,
					formatter : function(value) {
						return value.split("").join("\n");
					}*/
				}
			}
		],
		yAxis : [
			{
				show:false,
				type : 'value',
				splitLine : {
					show : false
				},
				axisLine : {
					lineStyle : {
						color : '#96C9FA'
					}
				},
				axisLabel:{
					show:false
				}
			}
		],

		series : [
			{
				name : '检测量',
				type : 'bar',
				barWidth : '80%',
//				itemStyle : {
//					normal : {
//						barBorderRadius : 15,
//						color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
//							offset : 0,
//							color : '#4EF0FE'
//						}, {
//							offset : 1,
//							color : '#1A6A7D'
//						} ]),
//					}
//				},
				itemStyle : {
					
					normal : {
						borderColor:'#B8B7F4',
						borderWidth:2,
						color : new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{
									offset : 0,
									color : '#625df8'
								},
								
								{
									offset : 1,
									color : '#00a1e5'
								}
							]
						)
					}
				},
				label : {
					normal : {
						show : true,
						position : 'top',
						textStyle : {
							color : '#FFF'
						}
					}
				},
				data : jclArray
			}
		]
	};
	myChart.setOption(option);
}
var i = 0;
var iCount;
function clzz() {
	var obj;
	$.ajax({
		url : rootPath + "/db/query.do",
		data : {
			configName : "jxhnew",
			sql : "getYcsjlb"
		},
		async : false,
		type : "post",
		dataType : 'json',
		success : function(data) {
			obj = data;
			initData(data, i)
		},
		error : function(data) {
			$.messager.alert("错误提示：", "操作时出现未知错误！！");
		}
	});
	iCount = window.setInterval(function() {
		initData(obj, i++);
	}, 5000);
}


function getWgxx(pkid){
	window.open(rootPath + "/view/mainpage/visual4.do?wgpkid="+pkid);
}

/*function dshgltj() {
	popWindow.init(1800, 795, rootPath + "/view/mainpage/dshgltj.do");//地市合格率统计
}*/
//检测量和工况率
function dshgltj() {
	popWindow.init(1800, 795, rootPath + "/view/mainpage/dshgltj.do");//地市合格率统计
}

function hbcyjctj() {
	//popWindow.init(1800, 795, rootPath + "/view/mainpage/hbcyjctj.do");//黄标车详情
	popWindow.init(1800, 795, rootPath + "/view/mainpage/cyctj.do");//黄标车详情
}

//检测概况详情页面
function toSurveyList() {
	popWindow.init(1800, 795, rootPath + "/view/mainpage/checkSurveyCityList.do");//检测概况详情页面
}


//检测统计量详情
function toQualifieList() {
	popWindow.init(1800, 795, rootPath + "/view/mainpage/checkQualifiedList.do");//检测统计量详情
}
//申请信息统计
function sqxx() {
	popWindow.init(1800, 795, rootPath + "/view/mainpage/sqxxtj.do");//检测统计量详情
}

//联网情况详情
function tolwqkList(areacode) {
	popWindow.init(1300, 650, rootPath+"/view/mainpage/lwqk.do?areacode="+areacode);//联网情况
}

//违规案例
function towgalList() {
	popWindow.init(1300, 650, rootPath+"/view/mainpage/wgcl.do?area="+area);//违规案例
}

//异常数据
function toycsjList() {
	popWindow.init(1300, 650, rootPath+"/view/mainpage/ycsj.do?area="+area);//异常数据
}

//一站一档
function toYZYDList(){
	popWindow.init(1300, 650, rootPath+"/view/mainpage/yzyd2.do?area="+area);
}

//一车一档
function toYCYDList(){
	popWindow.init(1300, 650, rootPath+"/view/mainpage/ycyd.do?");
}


//加载无边框窗口
var popWindow = new function () {
  this.init = function (width, height, href) {

      var $obj = $("<div class='popWindow'></div>");
      $obj.css({
          "width": width + "px",
          "height": height + "px",
          "position": "absolute",
          "top": "50%",
          "left": "50%",
          "z-index": "9001",
          "margin-top": "-" + (height / 2) + "px",
          "margin-left": "-" + (width / 2) + "px"
      });

      var $closeObj = $("<div class='closeObj'></div>");

      $closeObj.appendTo($obj);


      var $windowContent = $("<div class='windowContent'></div>")
      $windowContent.css({
          "width": (width - 20) + "px",
          "height": height + "px",
          "border": "2px solid #00cffd",
          "background-color": "#0a2b52",
          "padding": "10"
      })
      $windowContent.appendTo($obj);

      var $label = $("<label style='display: inline-block; border: 2px solid #00cffd; border-bottom: 0px; border-right: 0px; width: 25px; height: 25px; position: absolute; left: 10px; top: 10px; z-index: 600'></label>")
      $label.appendTo($windowContent);
      $label = $("<label style='display: inline-block; border: 2px solid #00cffd; border-bottom: 0px; border-left: 0px; width: 25px; height: 25px; position: absolute; right: 10px; top: 10px; z-index: 600'></label>")
      $label.appendTo($windowContent);
      $label = $("<label style='display: inline-block; border: 2px solid #00cffd; border-top: 0px; border-right: 0px; width: 25px; height: 25px; position: absolute; left: 10px; bottom: -10px; z-index: 600'></label>")
      $label.appendTo($windowContent);
      $label = $("<label style='display: inline-block; border: 2px solid #00cffd; border-top: 0px; border-left: 0px; width: 25px; height: 25px; position: absolute; right: 10px; bottom: -10px; z-index: 600'></label>")
      $label.appendTo($windowContent);

      var $windowFrame = $("<div style='width: " + (width - 25) + "px; height: " + (height - 5) + "px;'><iframe class='windowFrame' frameborder='0' scrolling='auto' style='width: 100%; height: 100%;'></iframe></div>")
      $windowFrame.appendTo($windowContent);

      popWindow.Mask();
      $obj.appendTo($('body'));
      $obj.find(".windowFrame").attr("src", href);



      $closeObj.on("click", function () {
          $obj.remove();

          if ($("body .popWindow").length == 0) {
              $("body .window-mask").remove();
          }

      })

  }
  this.Mask = function () {
      var $Mask = $("<div class='window-mask'></div>");
      $Mask.css({
          "width": "100%",
          "height": "100%",
          "position": "absolute",
          "background": "#ccc",
          "top": "0",
          "left": "0",
          "opacity": "0.4",
          "filter": "alpha(opacity=40)",
          "overflow": "hidden",
          "z-index": "9000"
      })
      if ($("body .window-mask").length == 0) {
          $Mask.appendTo($('body'));
      }
  }
}


function LoadJczl() {
	var zs = new Array();
	var yf = new Array();
	//创建现在的时间
	var data = new Date();
	//获取年
	var year = data.getFullYear();
	//获取月
	var mon = data.getMonth()+1;
	var arry = new Array();
	for(var i=0;i<5;i++){
		mon=mon-1;
		if(mon<=0){
			year=year-1;
			mon=mon+12;
		}
		if(mon<10){
			mon="0"+mon;
		}
	}

	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getbnjcl",
			sjd:year+""+mon
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var titlecount=0;
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			zs.push(obj.zs);
			yf.push(obj.checktime);
			titlecount+=parseInt(obj.zs);
		}
	}
	if(titlecount!=0){
		btsz(titlecount,1);
	}
    var myChart = echarts.init(document.getElementById('yield_l1'));
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            top: 20,
            left: 50,
            right: 20,
            bottom: 40
        },
        xAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                	rotate:30,
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: { show: false },//去除网格线
                splitArea: { show: false },//保留网格区域
                type: 'category',
                boundaryGap: false,
                data: yf
            },

        ],
        yAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: '#054660',
                    }
                },
                splitArea: { show: false },//保留网格区域
                type: 'value',

            }
        ],
        series: [
            {
                name: '检测总量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 0,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#8a86fa'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#494e9b'
                        }, {
                            offset: 1,
                            color: '#142a53'
                        }])
                    }
                },
                data: zs
            }
        ]
    };

    myChart.setOption(option);
}

function LoadJczlByDay() {
	var zs = new Array();
	var yf = new Array();
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getbnjclbyday"
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var titlecount=0;
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			zs.push(obj.zs);
			yf.push(obj.checktime);
			titlecount+=parseInt(obj.zs);
		}
	}
	if(titlecount!=0){
		btsz(titlecount,0);
	}
    var myChart = echarts.init(document.getElementById('yield_l0'));
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            top: 20,
            left: 50,
            right: 20,
            bottom: 40
        },
        xAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                	rotate:30,
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: { show: false },//去除网格线
                splitArea: { show: false },//保留网格区域
                type: 'category',
                boundaryGap: false,
                data: yf
            },

        ],
        yAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: '#054660',
                    }
                },
                splitArea: { show: false },//保留网格区域
                type: 'value',

            }
        ],
        series: [
            {
                name: '日检测总量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 0,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#8a86fa'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#494e9b'
                        }, {
                            offset: 1,
                            color: '#142a53'
                        }])
                    }
                },
                data: zs
            }
        ]
    };

    myChart.setOption(option);
}

function LoadJczlByYear() {
	var zs = new Array();
	var yf = new Array();
	//创建现在的时间
	var data = new Date();
	//获取年
	var year = data.getFullYear();
	//获取月
	var mon = data.getMonth()+1;
	var arry = new Array();
	for(var i=0;i<11;i++){
		mon=mon-1;
		if(mon<=0){
			year=year-1;
			mon=mon+12;
		}
		if(mon<10){
			mon="0"+mon;
		}
	}

	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getbnjcl",
		sjd:year+mon
	}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var titlecount=0;
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			zs.push(obj.zs);
			yf.push(obj.checktime);
			titlecount+=parseInt(obj.zs);
		}
	}
	if(titlecount!=0){
		btsz(titlecount,2);
	}
    var myChart = echarts.init(document.getElementById('yield_l2'));
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        grid: {
            top: 20,
            left: 50,
            right: 20,
            bottom: 40
        },
        xAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                	rotate:30,
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: { show: false },//去除网格线
                splitArea: { show: false },//保留网格区域
                type: 'category',
                boundaryGap: false,
                data: yf
            },

        ],
        yAxis: [
            {
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#96c9fa',//坐标值得具体的颜色

                    }
                },
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: '#054660',
                    }
                },
                splitArea: { show: false },//保留网格区域
                type: 'value',

            }
        ],
        series: [
            {
                name: '日检测总量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 0,
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: '#8a86fa'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#494e9b'
                        }, {
                            offset: 1,
                            color: '#142a53'
                        }])
                    }
                },
                data: zs
            }
        ]
    };

    myChart.setOption(option);
}


function LoadCycJczl() {
	var cyczs = new Array();
	var jczmc = new Array();
    var myChart = echarts.init(document.getElementById('yield1'));
    var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getqncyc"
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var titlecount=0;
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			cyczs.push(obj.zs);
			jczmc.push(obj.stationshortname);
			titlecount+=parseInt(obj.zs);
		}
	}
	if(titlecount!=0){
		btsz1(titlecount);
	}
    option = {
        color: ['#00a8ff'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: $(window).width() >= 1880 ? 10 : 5,
            left: 60,
            right: 20,
            bottom: 60,
            containLabel: false
        },
        xAxis: [
            {
                type: 'category',
                data: jczmc,
                axisTick: {
                    show: false
                },
                splitLine: { show: false },//去除网格线
                splitArea: { show: false },//保留网格区域
                axisLine: {
                	
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                axisLabel: {
                	rotate : 30,
                    textStyle: {
                        color: '#9ac9fa',//坐标值得具体的颜色

                    }
                },
            }
        ],
        yAxis: [
            {
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    //  改变轴线颜色
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: '#054660',
                    }
                },
                splitArea: { show: false },//保留网格区域
                type: 'value',
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#96c9fa',//左边线的颜色
                        width: '2'//坐标线的宽度
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#494e9b'
                        }, {
                            offset: 1,
                            color: '#142a53'
                        }])
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#9ac9fa',//坐标值得具体的颜色

                    }
                },
            }
        ],
        series: [
            {
                name: '柴油车检测量',
                type: 'bar',
                barWidth: '60%',
                data: cyczs
                //itemStyle: {

                //    normal: {
                //        color: new echarts.graphic.LinearGradient(
                //            0, 0, 1, 0,
                //            [
                //                { offset: 0, color: '#605ff8' },
                //                { offset: 1, color: '#029be6' }

                //            ]
                //        )
                //    }
                //}
            }
        ]
    };

    myChart.setOption(option);

}

var jcffzs = new Array();
var jcffmc = new Array();
function LoadJcffQk() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getjcfftj"
		}
	var data = loadDatasAjax(args1);
	var sum=0;
	if (null != data.rows && "" != data.rows) {
		
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			jcffzs.push(obj.zs);
			jcffmc.push(obj.name);
			sum+=parseInt(obj.zs);
		}
	}
    var dataValue = jcffzs;
    var dataName = jcffmc;
    var arry = [];
    var len = dataName.length;
    for (var i = 0; i < len; i++) {
        var map = {};
        map.name = dataName[i];
        map.value = dataValue[i];
        arry.push(map);
    };
    var myChart = echarts.init(document.getElementById('textMessage'));
    var option = {
        color: ['#4068fe', '#2dd8d7', '#792ddb', '#ff9f40'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            textStyle: {
                color: '#9ac9fa',
                fontSize: $(window).width() >= 1880 ? "16" : "12",

            },
            left: $("#textMessage").width() / 2 + 20,
            top: $("#textMessage").height() / 5 - 10,
            orient: 'vertical',
            x: 'left',
            data: dataName,
            formatter: function (name) {
                var len = dataName.length;
                for (var i = 0; i < len; i++) {
                    if (name == dataName[i]) {
                        return name + "    " + (dataValue[i] / sum * 100).toFixed(2) + "%"
                    }
                };
            }
        },
        series: [
            {
                name: '检测方法使用情况',
                type: 'pie',
                radius: ['55%', '80%'],
                center: ['25%', $(window).width() >= 1880 ? "45%" : "55%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: arry
            }
        ]
    };

    myChart.setOption(option);

}

//车辆追踪详情
function toVisual2List() {
	window.open(rootPath + "/view/jxh/visual2.do");

}

function aaaaa(){
	var okUrl="http://10.202.236.3:8888/xsbnzx/ywcl/ywcl.jsp?modulecode=YWCL";
//	window.open(okUrl,"","fullscreen=no,width="+ window.screen.width+",height="+ window.screen.height+",top=0,left=0,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no,status=no");
//	window.open('','_parent','');  
//	window.close(); 
	window.location.href = okUrl;
}

function ymtz(url){
	window.open(url,"","fullscreen=no,width="+ window.screen.width+",height="+ window.screen.height+",top=0,left=0,toolbar=no,menubar=no,resizable=yes,location=no,scrollbars=no,status=no");
	window.open('','_parent','');  
	window.close(); 
}

function ssjc(){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getSsjc",
			region:area
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var str="";
		for(var i = 0; i < data.rows.length; i++){
			var obj=data.rows[i];
			str+="<tr onclick='toVideo(\""+ obj.pkid+ "\");' style='cursor:pointer;'>";
			if(obj.carcardcolor=="blue"){
				str+="<td class='gdcp'><div class='gdcp1'>"+obj.carcardnumber+"</div></td>"
			}else if(obj.carcardcolor=="yellow"){
				str+="<td class='gdcp'><div class='gdcp2'>"+obj.carcardnumber+"</div></td>"
			}else if(obj.carcardcolor=="green"){
				str+="<td class='gdcp'><div class='gdcp3'>"+obj.carcardnumber+"</div></td>"
			}else if(obj.carcardcolor=="black"){
				str+="<td class='gdcp'><div class='gdcp4'>"+obj.carcardnumber+"</div></td>"
			}else if(obj.carcardcolor=="white"){
				str+="<td class='gdcp'><div class='gdcp5'>"+obj.carcardnumber+"</div></td>"
			}
			str+="<td class='gdsj'>"+obj.checktime+"</td>";
			str+="<td class='gdsj'>"+obj.stationshortname+"</td>";
			str+="<td class='gdsj'>"+obj.checkmethod+"</td>";
			str+="<td class='gdsj'>"+obj.recheckinfo+"</td>";
			if(obj.checkresult=="合格"){
				str+="<td class='gdjghg'>"+obj.checkresult+"</td>"
			}else{
				str+="<td class='gdjgbhg'>"+obj.checkresult+"</td>"
			}
			str+="</tr>";
		}
		$("#gdnr1").html("");
		$("#gdnr1").html(str);
	}
}
//监测实时视频
function toVideo(pkid){//http://10.202.6.18:8888/jdc/videoMonitor/historyVision/checkLinehistoryReback.jsp?
	//window.location.href = "http://127.0.0.1:8081/jdc/videoMonitor/video/JdcVideo.jsp";
	//popWindow.init(1500, 800, "http://10.202.236.3:8888/xsbnzx/videoMonitor/historyVision/checkLinehistoryReback.jsp?bid="+pkid);
	//popWindow.init(1500, 800, "http://10.202.236.3:8888/xsbnzx/videoMonitor/historyVision/checkLinehistoryReback.jsp?bid="+pkid);
	window.open("http://10.202.236.3:8888/xsbnzx/videoMonitor/historyVision/checkLinehistoryReback.jsp?bid="+pkid);
}


function btsz(count,num){
	var html="";
	var count1=count+"";
    for(var i = 0;i<count1.length;i++){
    	html+="<label class='numItem'>"+count1.charAt(i)+"</label>";
    }
    $("#aa"+num).html(html);
}

function btsz1(count,num){
	var html="";
	var count1=count+"";
    for(var i = 0;i<count1.length;i++){
    	html+="<label class='numItem'>"+count1.charAt(i)+"</label>";
    }
    $("#bb"+num).html(html);
}

/*黑烟车数据统计*/
function loadSmokeCarTotal(){
	var myChart = echarts.init(document.getElementById('yield3'));
	
	var option = {
//		    title: {
//		        text: '黑烟车数据统计',
//		        y:"-3px",
//		        x:"center",
//		        textStyle:{
//		        	color:"#96c9fa"
//		        }
//		    },
		    legend: {
		        data:['黑烟车'],
		        textStyle:{
		        	color:"#96c9fa"
		        }
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#283b56'
		            }
		        }
		    },
		    grid:{
		    	top:"20%",
		    	bottom:"9%"
		    },
		    dataZoom: {
		        show: false,
		        start: 0,
		        end: 100
		    },
		    xAxis: [
		        {
		            type: 'category',
		            boundaryGap: true,
		            axisLabel:{
		            	show:true,
		            	textStyle:{
		            		color:"#c3dbff"
		            	}
		            },
		            axisLine : {
						lineStyle : {
							color : '#96c9fa',
						}
					},
		            data: (function (){
		                var now = new Date();
		                var res = [];
		                var len = 5;
		                while (len--) {
//		                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
		                    res.unshift(now.getHours()+":00");
		                    now = new Date(now - 1000*60*60);
		                    console.info(res);
		                }
		                return res;
		            })()
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            splitLine:{
		            	show: true,
		            	lineStyle:{
		            		color:"#4682B4"
		            	}
		            },
		            scale: true,
		            name: '辆',
		            max: 1200,
		            min: 0,
		            boundaryGap: [0.2, 0.2],
		            axisLine : {
						lineStyle : {
							color : '#96c9fa',
						}
					},
		        }
		    ],
		    series: [
		        {
		            name:'黑烟车',
		            type:'bar',
		            barWidth:"35%",
	            	itemStyle:{
	            		normal:{
	            			color:"#00BFFF"
	            		}
	            		
	            	},
		            data:(function (){
		                var res = [];
		                var len = 5;
		                while (len--) {
		                    res.push(Math.round(Math.random() * 1000));
		                }
		                return res;
		            })()
		        }
		    ]
		};
	
	    var data0 = option.series[0].data;
	    data0.shift();
	    data0.push(Math.round(Math.random() * 1000));
	
	    myChart.setOption(option);

		//定时更新数据  隔2s执行一次
		setInterval(function (){
		    axisData = new Date().getHours()+":00";

		    var data0 = option.series[0].data;
		    data0.shift();
		    data0.push(Math.round(Math.random() * 1000));

		    option.xAxis[0].data.shift();
		    option.xAxis[0].data.push(axisData);

		    myChart.setOption(option);
		}, 1000*60*60);
}



function LoadYwsqQk() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getYwsqByjcz"
		}
	var data1 = loadDatasAjax(args1);
	var sum=0;
	var dataValue = new Array();
	var dataName = new Array();
	if (null != data1.rows && "" != data1.rows) {
		
		for(var i = 0; i < data1.rows.length; i++){
			var obj=data1.rows[i];
			dataValue.push(obj.zs);
			dataName.push(obj.name);
			sum+=parseInt(obj.zs);
		}
	}
    var arry = [];
    var len = dataName.length;
    for (var i = 0; i < len; i++) {
        var map = {};
        map.name = dataName[i];
        map.value = dataValue[i];
        arry.push(map);
    };
    var myChart = echarts.init(document.getElementById('yield3'));
    var option = {
        color: ['#ffcc01','#b3ff3c','#FF19D3','#da685d','#4068fe', '#2dd8d7', '#792ddb', '#ff9f40'],
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            textStyle: {
                color: '#9ac9fa',
                fontSize: $(window).width() >= 1880 ? "16" : "12",

            },
            left: $("#textMessage").width() / 2 + 20,
            top: $("#textMessage").height() / 5 - 40,
            orient: 'vertical',
            x: 'left',
            data: dataName,
            formatter: function (name) {
                var len = dataName.length;
                for (var i = 0; i < len; i++) {
                    if (name == dataName[i]) {
                        return name + "    " + (dataValue[i] / sum * 100).toFixed(2) + "%"
                    }
                };
            }
        },
        series: [
            {
                name: '申请修改检测方法数量',
                type: 'pie',
                center: ['25%', $(window).width() >= 1880 ? "45%" : "55%"],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: arry
            }
        ]
    };

    myChart.setOption(option);

}


function leftClick1(){
	if(zhjcgkwz == 0){
		$("#yield_l"+zhjcgkwz).hide();
		$("#textSum_l"+zhjcgkwz).hide();
		zhjcgkwz = 2;
		$("#yield_l"+zhjcgkwz).show();
		$("#textSum_l"+zhjcgkwz).show();
		LoadJczlByYear();
	}else{
		$("#yield_l"+zhjcgkwz).hide();
		$("#textSum_l"+zhjcgkwz).hide();
		zhjcgkwz--;
		$("#yield_l"+zhjcgkwz).show();
		$("#textSum_l"+zhjcgkwz).show();
		if(zhjcgkwz == 0){
			LoadJczlByDay();
		}else if(zhjcgkwz == 1){
			LoadJczl();
			
		}else if(zhjcgkwz == 2){
			LoadJczlByYear();
		}
	}
}
function rightClick1(){
	if(zhjcgkwz == 2){
		$("#yield_l"+zhjcgkwz).hide();
		$("#textSum_l"+zhjcgkwz).hide();
		zhjcgkwz = 0;
		$("#yield_l"+zhjcgkwz).show();
		$("#textSum_l"+zhjcgkwz).show();
		LoadJczlByYear();
	}else{
		$("#yield_l"+zhjcgkwz).hide();
		$("#textSum_l"+zhjcgkwz).hide();
		zhjcgkwz++;
		$("#yield_l"+zhjcgkwz).show();
		$("#textSum_l"+zhjcgkwz).show();
		if(zhjcgkwz == 0){
			LoadJczlByDay();
		}else if(zhjcgkwz == 1){
			LoadJczl();
			
		}else if(zhjcgkwz == 2){
			LoadJczlByYear();
		}
	}
}

function leftClick2(){
	if(cycjcgkwz == 0){
		$("#yield1_l"+cycjcgkwz).hide();
		$("#textSum1_l"+cycjcgkwz).hide();
		zhjcgkwz = 1;
		$("#yield1_l"+cycjcgkwz).show();
		$("#textSum1_l"+cycjcgkwz).show();
		alltjl();
	}else{
		$("#yield1_l"+cycjcgkwz).hide();
		$("#textSum1_l"+cycjcgkwz).hide();
		cycjcgkwz--;
		$("#yield1_l"+cycjcgkwz).show();
		$("#textSum1_l"+cycjcgkwz).show();
		if(cycjcgkwz == 0){
			cyctjl();
		}else if(cycjcgkwz == 1){
			alltjl();
		}
	}
}
function rightClick2(){
	if(cycjcgkwz == 1){
		$("#yield1_l"+cycjcgkwz).hide();
		$("#textSum1_l"+cycjcgkwz).hide();
		cycjcgkwz = 0;
		$("#yield1_l"+cycjcgkwz).show();
		$("#textSum1_l"+cycjcgkwz).show();
		cyctjl();
	}else{
		$("#yield1_l"+cycjcgkwz).hide();
		$("#textSum1_l"+cycjcgkwz).hide();
		cycjcgkwz++;
		$("#yield1_l"+cycjcgkwz).show();
		$("#textSum1_l"+cycjcgkwz).show();
		if(cycjcgkwz == 1){
			alltjl();
		}else if(cycjcgkwz == 0){
			cyctjl();
		}
	}
}