var sqclWin = null;
var checkDataWin = null; //过程数据列表窗口
var textT = ""; //曲线图的标题
var titleT = new Array(); //曲线标题
var fields = ""; //过程数据文件的列名 id:bs;;
var jcff = ""; //检测方法
var dataX = new Array(); //曲线图横轴
var seriesT = new Array();
var onePkid = ""; //第一个检测报告主键
var	CartestWin=null//车辆检测记录详情
	
var getlcbds = "";
var getclid = "";
var getdjrq = "";
var amplificationWin = null; //放大倍数窗口
var checkCarList=null;//存储所有车辆检测信息
$(function() {
	getCarInfo(); //车辆基本信息
	makeCheckResultTable();
	getCheckList();
	//getAlarmList();//报警信息展示
	////countEdit();//车辆修改记录
	//checkResult();//检测结果对比分析

	$('html').fontFlex(12, 20, 114);
	$("#carMessageTable tr:even").addClass("style1"); //奇数行的样式
	$("#carTextTable tr:even").addClass("style1"); //奇数行的样式
	$("#InforChangesTable tr:even").addClass("style1"); //奇数行的样式
	
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxh.getCheckResultMain",
			carpkid:carPkid
		}
	var data = loadDatasAjax(args1);

	if(null != data.rows && "" != data.rows){
		if(data.rows.length > 0){
			textT = data.rows[0].carcardnumber;
			jcff = data.rows[0].checkmethod;
			onePkid = data.rows[0].pkid;
			areacode = data.rows[0].areacode;
			if(jcff == 'DB'){//双怠速
				titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
				fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
			}else if(jcff == 'WT'){//稳态工况法
				titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
				fields = "clzHC:1;;clzCO:1;;clzNO:1;;clzO2:1;;clzCO2:1;;cs:1;;";
			}else if(jcff == 'IG'){//简易瞬态法
				titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
				fields = "flowHC:1;;flowCO:1;;flowNO:1;;flowCO2:1;;analyserO2:1;;lineSpeed:1;;";
//				titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
//				fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
			}else if(jcff == 'LD'){//加载减速工况法
				//if(areacode=="530800"||areacode=="532600"||areacode=="530700"||areacode=="530400"||areacode=="530300"||areacode=="532800"){
					titleT = ['实时车速','发动机转速','轮边功率','烟度值'];
					fields = "speedK100:1;;rotateSpeed:1;;corMaxPower:1;;smokeK100:1;;";
				//}else{
					//titleT = ['实时车速','发动机转速','轮边功率','烟度值'];						
					//fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
				//}
			}else if(jcff == 'TG'){//不透光烟度法   
				titleT = ['烟度','发动机转速'];
				fields = "smoke:1;;rateSpeed:1;;";
			}
			getGcsj(onePkid,fields);
		}
	}


	/*$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getCheckResultMain",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					textT = data.rows[0].carcardnumber;
					jcff = data.rows[0].checkmethod;
					onePkid = data.rows[0].pkid;
					areacode = data.rows[0].areacode;
					if(jcff == 'DB'){//双怠速
						titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
						fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
					}else if(jcff == 'WT'){//稳态工况法
						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
						fields = "clzHC:1;;clzCO:1;;clzNO:1;;clzO2:1;;clzCO2:1;;cs:1;;";
					}else if(jcff == 'IG'){//简易瞬态法
						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
						fields = "flowHC:1;;flowCO:1;;flowNO:1;;flowCO2:1;;analyserO2:1;;lineSpeed:1;;";
//						titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
//						fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
					}else if(jcff == 'LD'){//加载减速工况法
						if(areacode=="530800"||areacode=="532600"||areacode=="530700"||areacode=="530400"||areacode=="530300"||areacode=="532800"){
							titleT = ['实时车速','发动机转速','轮边功率','烟度值'];
							fields = "speedK100:1;;rotateSpeed:1;;corMaxPower:1;;smokeK100:1;;";
						}else{
							titleT = ['实时车速','发动机转速','轮边功率','烟度值'];						
							fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
						}
					}else if(jcff == 'TG'){//不透光烟度法   
						titleT = ['烟度','发动机转速'];
						fields = "smoke:1;;rateSpeed:1;;";
					}
					getGcsj(onePkid,fields);
				}
			}
		}
	});*/
});

//过程数据
function getGcsj(pkid, bs) {
	fields = bs;
	var Obj = {};
	Obj["pkid"] = pkid;
	Obj["fields"] = fields;
	$.ajax({
		url : rootPath + "/checkinfo/getCheckData.do",
		data : Obj,
		async : false,
		type : "post",
		dataType : "json",
		success : function(data) {
			//获取信息成功
			if (data.result > 0) {
				initMyChart(data);
			} else {
				//alert("提示：没有获取到该车辆的过程数据！");
			}
		},
		error : function(data) {
			alert("提示：没有获取到该车辆的过程数据！");
			//alert("错误提示：操作时出现未知错误！！");
		}
	});

	var piechart = echarts.init(($('#chart3')[0]));
	option = {
		title : {
			x : 100,
			y : 10,
			text : textT + '车辆检测过程数据曲线图',
			textStyle : {
				color : '#51CBFD',
				fontSize : 20,
			}
		},
		toolbox : { //自定义按钮
			show : true,
			feature : {
				myTool1 : {
					show : true,
					title : '放大倍数',
					icon : 'image://../../img/jxh/gongjutiao1.png',
					onclick : function() {
						toAmplification();
					}
				},
				myTool2 : {
					show : true,
					title : '过程数据',
					icon : 'image://../../img/jxh/gongjutiao4.png',
					onclick : function() {
						toDataList();
					}
				}
			}
		},
		tooltip : {
			trigger : 'axis'
		},
		legend : {
			x : 120,
			y : 40,
			data : titleT,
			textStyle : {
				color : '#f1f1f1',
				fontSize : 12,
			}
		},
		grid : {
			left : '4%',
			right : '2%',
			bottom : '4%',
			top : '20%',
			containLabel : true
		},
		xAxis : {
			type : 'category',
			boundaryGap : false,
			data : dataX,
			axisLine : {
				lineStyle : {
					color : '#f1f1f1',
					fontSize : 12,
					width : 2
				}
			},
		},
		yAxis : {
			name : '秒/值',
			min : 0,
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
	window.addEventListener("resize", function() { //窗口改变时的事件监听
		piechart.resize();
	});
}

//初始化曲线图
function initMyChart(data) {
	//首先清空数组，不然多次调用容易出现问题
	dataX.splice(0, dataX.length);
	seriesT.splice(0, seriesT.length);
	//横轴
	for (var i = 1; i <= data.result; i++) {
		dataX.push(i);
	}
	if (jcff == 'DB') { //双怠速
		seriesT[0] = {
			name : 'HC(10-6vol)',
			type : 'line',
			smooth : true,
			data : data.flowHC
		};
		seriesT[1] = {
			name : 'CO(%vol)',
			type : 'line',
			smooth : true,
			data : data.flowCO
		};
		seriesT[2] = {
			name : 'CO2(%vol)',
			type : 'line',
			smooth : true,
			data : data.flowCO2
		};
		seriesT[3] = {
			name : 'O2(%vol)',
			type : 'line',
			smooth : true,
			data : data.analyserO2
		};
		seriesT[4] = {
			name : '发动机转速',
			type : 'line',
			smooth : true,
			data : data.rotateSpeed
		};
	} else if (jcff == 'WT') { //稳态工况法
		seriesT[0] = {
			name : 'HC(10-6vol)',
			type : 'line',
			smooth : true,
			data : data.clzHC
		};
		seriesT[1] = {
			name : 'CO(%vol)',
			type : 'line',
			smooth : true,
			data : data.clzCO
		};
		seriesT[2] = {
			name : 'NO(10-6vol)',
			type : 'line',
			smooth : true,
			data : data.clzNO
		};
		seriesT[3] = {
			name : 'CO2(%vol)',
			type : 'line',
			smooth : true,
			data : data.clzO2
		};
		seriesT[4] = {
			name : 'O2(%vol)',
			type : 'line',
			smooth : true,
			data : data.clzCO2
		};
		seriesT[5] = {
			name : '车速',
			type : 'line',
			smooth : true,
			data : data.cs
		};
	} else if (jcff == 'IG') { //简易瞬态法
		seriesT[0] = {
			name : 'HC(10-6vol)',
			type : 'line',
			smooth : true,
			data : data.flowHC
		};
		seriesT[1] = {
			name : 'CO(%vol)',
			type : 'line',
			smooth : true,
			data : data.flowCO
		};
		seriesT[2] = {
			name : 'NO(10-6vol)',
			type : 'line',
			smooth : true,
			data : data.flowNO
		};
		seriesT[3] = {
			name : 'CO2(%vol)',
			type : 'line',
			smooth : true,
			data : data.flowCO2
		};
		seriesT[4] = {
			name : 'O2(%vol)',
			type : 'line',
			smooth : true,
			data : data.analyserO2
		};
		seriesT[5] = {
			name : '车速',
			type : 'line',
			smooth : true,
			data : data.lineSpeed
		};
	} else if (jcff == 'LD') { //加载减速工况法
		seriesT[0] = {
			name : '实时车速',
			type : 'line',
			smooth : true,
			data : data.speed
		};
		seriesT[1] = {
			name : '发动机转速',
			type : 'line',
			smooth : true,
			data : data.rotateSpeed
		};
		seriesT[2] = {
			name : '轮边功率',
			type : 'line',
			smooth : true,
			data : data.power
		};
		seriesT[3] = {
			name : '烟度值',
			type : 'line',
			smooth : true,
			data : data.smoke
		};
	} else if (jcff == 'TG') { //不透光烟度法
		seriesT[0] = {
			name : '烟度',
			type : 'line',
			smooth : true,
			data : data.smoke
		};
		seriesT[1] = {
			name : '发动机转速',
			type : 'line',
			smooth : true,
			data : data.rateSpeed
		};
	}
}

//根据车辆主键查询车辆的基本信息
function getCarInfo() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.visual2Car",
			pkid:carPkid
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			makeCarInfoTable(data);
		}
	}

	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "Survey",
			sql : "visual2Car",
			params : "String#" + carPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					makeCarInfoTable(data);
				}
			}
		}
	});*/
}

//组装车辆基本信息表格
function makeCarInfoTable(data) {
	getlcbds = null;
	getclid = null;
	getdjrq = null;
	var htmls = "";
	var obj = data.rows[0];
	getclid = obj.carversion;
	getlcbds = obj.mileagenum;
	getdjrq = obj.registerdate;
	htmls += "<tr><td width='42%'>车牌号码：</td><td width='57%'><div>";
	htmls += obj.carcardnumber;
	htmls += "</div></td></tr><tr><td width='45%'>号牌种类：</td><td width='54%'>";
	htmls += obj.hpzl;
	htmls += "</td></tr><tr><td>燃料种类：</td><td>";
	htmls += obj.rlzl;
	htmls += "</td></tr><tr><td>车辆类型：</td><td class='note'>";
	htmls += obj.cllx;
	htmls += "</td></tr><tr><td>车辆识别码：</td><td>";
	htmls += obj.vin;
	htmls += "</td></tr><tr><td>使用性质：</td><td>";
	htmls += obj.syxz;
	htmls += "</td></tr><tr><td>车辆型号：</td><td>";
	htmls += obj.carversion;
	htmls += "</td></tr><tr><td>发动机型号：</td><td>";
	htmls += obj.engineversion;
	htmls += "</td></tr><tr><td>注册登记日期：</td><td>";
	htmls += obj.registerdate.substring(0, 10);
	htmls += "</td></tr><tr><td>出厂日期：</td><td>";
	htmls += obj.outfactorydate.substring(0, 10);
//	htmls += "</td></tr><tr><td>行驶里程数：</td><td>";
//	htmls += obj.mileagenum;
	htmls += "</td></tr>";
	$("#carMessageTable").append(htmls);
	//makeCheckResultTable(); //车辆检测记录
}

//根据车辆主键查询车辆的检测记录列表
function getCheckList() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.visual2CarRecord",
			carpkid:carPkid
		}
	var data = loadDatasAjax(args1);
	makeCheckListTable(data);

	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "Survey",
			sql : "visual2CarRecord",
			params : "String#" + carPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			makeCheckListTable(data);
		}
	});*/
}

//组装车辆检测信息表格
function makeCheckListTable(data) {
	checkCarList=null;
	var htmls = "<tr><td width='15%'>时间</td><td width='13%'>检测方法</td><td width='20%'>检测结果</td><td width='15%'>检测站</td><td width='15%'>里程数</td><td width='15%'>过程数据</td></tr>";
	var num = data.rows.length;
	if(num>4){
		num=4;
	}
	checkCarList=data;
	for (var i = 0; i < num; i++) {
		var obj = data.rows[i];
		htmls += "<tr><td>";
		htmls += obj.checktime.substring(0,11);
		htmls += "</td><td>";
		htmls += obj.jcff;
		htmls += "</td><td><span class='testResultsFont'>";
		htmls += obj.jccs;
		if(obj.checkresult=='合格'){
			htmls += "</span><span class='testResultsT'>";
		}else{
			htmls += "</span><span class='testResultsF'>";
		}
		htmls += obj.checkresult;
		htmls += "</span></td><td>";
		htmls += obj.stationshortname;
		htmls += "</td><td>";
		htmls += obj.mileagenum;
		htmls += "</td><td>";
		//htmls += obj.staffname;
		htmls += "<a style='color:#fff;text-decoration:none;'  href='javascript:toProcessGraph(\""+obj.pkid+"\",\""+obj.checkmethod+"\");'>过程数据</a>";
		htmls +="</tr>";
	}
	//如何行数不够4行，则需要加到4行
//	for (var j = num; j < 4; j++) {
//		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td>&nbsp;<td></td>&nbsp;<td></td>&nbsp;<td></td></tr>";
//	}
	
	
	$("#carTextTable").append(htmls);
	
	var htmls1 = "<tr><td width='20%'>车牌号码</td><td width='30%'>抓拍时间</td><td width='30%'>抓拍地点</td><td width='20%'>林格曼黑度</td></tr>";
	htmls1 += "<tr><td width='20%'>云F79004</td><td width='30%'>2019-11-25 14:30:12</td><td width='30%'>玉江大道</td><td width='20%'>黑度1级</td></tr>";
	htmls1 += "<tr><td width='20%'>云F79004</td><td width='30%'>2019-11-28 10:22:57</td><td width='30%'>玉江大道</td><td width='20%'>黑度3级</td></tr>";
	$("#carTextTable1").append(htmls1);
}

//点击检测结果
function toProcessGraph(pkid, jcffdm) {
	jcff = jcffdm;
	onePkid = pkid;
	if(jcff == 'DB'){//双怠速
		titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
		fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
	}else if(jcff == 'WT'){//稳态工况法
		titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		fields = "clzHC:1;;clzCO:1;;clzNO:1;;clzO2:1;;clzCO2:1;;cs:1;;";
	}else if(jcff == 'IG'){//简易瞬态法
		//titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		//fields = "hccsgk:1;;cocsgk:1;;nocsgk:1;;co2csgk:1;;o2csgkfxy:1;;cs:1;;";
		titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
		fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
	}else if(jcff == 'LD'){//加载减速工况法
		//titleT = ['实时车速','发动机转速','轮边功率','烟度值'];
		//fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
		//if(areacode=="532822"||areacode=="532600"||areacode=="530700"||areacode=="530400"||areacode=="530300"||areacode=="532800"){
			titleT = ['实时车速','发动机转速','轮边功率','烟度值'];
			fields = "speedK100:1;;rotateSpeed:1;;corMaxPower:1;;smokeK100:1;;";
		//}else{
			//titleT = ['实时车速','发动机转速','轮边功率','烟度值'];						
			//fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
		//}
	}else if(jcff == 'TG'){//不透光烟度法   
		titleT = ['烟度','发动机转速'];
		fields = "smoke:1;;rateSpeed:1;;";
	}
	getGcsj(onePkid, fields);
}

//根据车辆主键查询车辆的报警信息列表
function getAlarmList() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxh.getAlarmList",
			clzj:carPkid
		}
	var data = loadDatasAjax(args1);
	makeAlarmListTable(data);
	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "jxh",
			sql : "getAlarmList",
			params : "String#" + carPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			makeAlarmListTable(data);
		}
	});*/
}

//组装车辆报警信息表格
function makeAlarmListTable(data) {
	var htmls = "<tr><td width='20%'>报警类型</td><td width='60%'>报警内容</td><td width='20%'>处理方式</td></tr>";
	var num = data.rows.length;
	for (var i = 0; i < num; i++) {
		var obj = data.rows[i];
		htmls += "<tr><td title='" + obj.bjmc + "'>";
		htmls += obj.bjmc;
		htmls += "</td><td title='" + obj.bjsm + "'>";
		htmls += obj.bjsm;
		htmls += "</td><td title='" + obj.clfs + "'>";
		htmls += obj.clfs;
		htmls += "</td></tr>";
	}
	//如何行数不够6行，则需要加到6行
	for (var j = num; j < 6; j++) {
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#alarmInforTable").append(htmls);
}

//根据车辆主键查询该车有哪些修改记录
function countEdit() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxh.SurveyAll",
			clzj:carPkid
		}
	var data = loadDatasAjax(args1);
	makeEditListTable(data);
	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "jxh",
			sql : "countEdit",
			params : "String#" + carPkid + ";;String#" + carPkid + ";;String#" + carPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					makeEditListTable(data);
				}
			}
		}
	});*/
}

//组装车辆修改信息表格
function makeEditListTable(data) {
	var htmls = "";
	var obj = data.rows[0];
	//判断是否有修改车辆信息
	var xgclxx = obj.xgclxx;
	if (null != xgclxx && xgclxx > 0) {
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.jxh.editCarInfoList",
				clzj:carPkid
			}
		var data = loadDatasAjax(args1);
		if (null != data.rows && "" != data.rows) {
			for (var i = 0; i < data.rows.length; i++) {
				htmls += "<tr><td width='35%'>";
				htmls += data.rows[i].sqsj;
				htmls += "</td><td width='48%'>";
				htmls += "申请修改车辆信息";
				htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"1\")'>";
				htmls += "详情</span></td></tr>";
			}
		}
	
		/*$.ajax({
			url : rootPath + "/db/query.yt",
			data : {
				configName : "jxh",
				sql : "editCarInfoList",
				params : "String#" + carPkid
			},
			async : false,
			type : "post",
			success : function(data) {
				if (null != data.rows && "" != data.rows) {
					for (var i = 0; i < data.rows.length; i++) {
						htmls += "<tr><td width='35%'>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td width='48%'>";
						htmls += "申请修改车辆信息";
						htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"1\")'>";
						htmls += "详情</span></td></tr>";
					}
				}
			}
		});*/
	}
	//判断是否有修改检测方法
	var xgjcff = obj.xgjcff;
	if (null != xgjcff && xgjcff > 0) {
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.jxh.editJcffList",
				clzj:carPkid
			}
		var data = loadDatasAjax(args1);
		if (null != data.rows && "" != data.rows) {
			for (var i = 0; i < data.rows.length; i++) {
				htmls += "<tr><td width='35%'>";
				htmls += data.rows[i].sqsj;
				htmls += "</td><td width='48%'>";
				htmls += "申请修改检测方法";
				htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"2\")'>";
				htmls += "详情</span></td></tr>";
			}
		}
	
		/*$.ajax({
			url : rootPath + "/db/query.yt",
			data : {
				configName : "jxh",
				sql : "editJcffList",
				params : "String#" + carPkid
			},
			async : false,
			type : "post",
			success : function(data) {
				if (null != data.rows && "" != data.rows) {
					for (var i = 0; i < data.rows.length; i++) {
						htmls += "<tr><td width='35%'>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td width='48%'>";
						htmls += "申请修改检测方法";
						htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"2\")'>";
						htmls += "详情</span></td></tr>";
					}
				}
			}
		});*/
	}
	//判断是否有跨站解锁
	var xgkzjs = obj.xgkzjs;
	if (null != xgkzjs && xgkzjs > 0) {
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.jxh.editKzjsList",
				clzj:carPkid
			}
		var data = loadDatasAjax(args1);
		if (null != data.rows && "" != data.rows) {
			for (var i = 0; i < data.rows.length; i++) {
				htmls += "<tr><td width='35%'>";
				htmls += data.rows[i].sqsj;
				htmls += "</td><td width='48%'>";
				htmls += "申请复测跨站解锁";
				htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"3\")'>";
				htmls += "详情</span></td></tr>";
			}
		}
	
		/*$.ajax({
			url : rootPath + "/db/query.yt",
			data : {
				configName : "jxh",
				sql : "editKzjsList",
				params : "String#" + carPkid
			},
			async : false,
			type : "post",
			success : function(data) {
				if (null != data.rows && "" != data.rows) {
					for (var i = 0; i < data.rows.length; i++) {
						htmls += "<tr><td width='35%'>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td width='48%'>";
						htmls += "申请复测跨站解锁";
						htmls += "</td><td width='17%'> <span class='InforChangesInfo' onclick='toLook(\"" + data.rows[i].pkid + "\",\"3\")'>";
						htmls += "详情</span></td></tr>";
					}
				}
			}
		});*/
	}
	var num = 0;
	if (htmls != "") {
		num = patch("<tr>", htmls); //行数
	}
	//如何行数不够4行，则需要加到4行
	for (var j = num; j < 4; j++) {
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#InforChangesTable").append(htmls);
}

/**
 * 判断某个字符串在字符串中出现的次数
 * re 某个字符串
 * str 字符串
 * return 出现的次数
 */
function patch(re, str) {
	re = eval("/" + re + "/ig")
	return str.match(re).length;
}
/**
 * 详情
 * pkid 主键
 * type 1：修改车辆信息 2：修改检测方法 3：跨站解锁
 */
function toLook(pkid, type) {
	if (type == "1") {
		sqclWin = createTopWindow("sqclWin", "<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
			{
				title : "查看修改车辆信息详情页面",
				width : window.top.topWidth - 250,
				height : window.top.topHeight - 250,
				modal : false,
				closed : true,
				closable : false,
				collapsible : false,
				maximizable : false,
				minimizable : false
			});
		window.top.$("#sqclWinIframe").data('openid', window); //把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src", rootPath + "/common/jcywsqcl/sqxgClxxXq.yt?pkid=" + pkid);
		sqclWin.window('open');
	} else if (type == "2") {
		sqclWin = createTopWindow("sqclWin", "<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
			{
				title : "查看修改检测方法详情页面",
				width : window.top.topWidth - 250,
				height : window.top.topHeight - 250,
				modal : false,
				closed : true,
				collapsible : false,
				maximizable : false,
				minimizable : false
			});
		window.top.$("#sqclWinIframe").data('openid', window); //把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src", rootPath + "/common/jcywsqcl/sqxgJcffXq.yt?pkid=" + pkid);
		sqclWin.window('open');
	} else if (type == "3") {
		sqclWin = createTopWindow("sqclWin", "<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
			{
				title : "查看复测跨站解锁详情页面",
				width : window.top.topWidth - 200,
				height : window.top.topHeight,
				collapsible : false,
				modal : false,
				closed : true,
				maximizable : false,
				minimizable : false
			});
		window.top.$("#sqclWinIframe").data('openid', window); //把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src", rootPath + "/view/dealUnlockCar/editUnlockCar.do?pkid=" + pkid);
		sqclWin.window('open');
	}
}

//根据车辆主键查询该车的车型、里程表读数、登记日期
function checkResult() {
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxh.checkResult",
			pkid:carPkid
		}
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		if (data.rows.length > 0) {
			makeCheckResultTable(data);
		}
	}

	/*$.ajax({
		url : rootPath + "/db/query.yt",
		data : {
			configName : "jxh",
			sql : "checkResult",
			params : "String#" + carPkid
		},
		async : false,
		type : "post",
		success : function(data) {
			if (null != data.rows && "" != data.rows) {
				if (data.rows.length > 0) {
					makeCheckResultTable(data);
				}
			}
		}
	});*/
}

//组装检测结果对比表格
function makeCheckResultTable() {
	var htmls = "";
	var clxhNum = 57.44; //车辆型号
	var lcbdsNum = '1.52'; //里程表读数
	var djrqNum = '17.68'; //登记日期
	//	
	//	var obj = data.rows[0];

	//车辆型号
	//	var clxh = obj.clxh;
	if (null != getdjrq && "" != getdjrq) {
		var year = parseInt(getdjrq.substring(0, 4));
		var month = parseInt(getdjrq.substring(5, 7));
		var start = "";
		var end = "";
		if (month - 6 <= 0) {
			var yearT = year - 1;
			var monthT = month + 6;
			if (monthT < 10) {
				monthT = "0" + monthT;
			}
			if(getdjrq.substring(9, 11) == '0'){
				start = yearT + "-" + monthT + "-" + "1";
			}else{
				start = yearT + "-" + monthT + "-" + getdjrq.substring(9, 11);
			}
		} else {
			var monthT = month - 6;
			if (monthT < 10) {
				monthT = "0" + monthT;
			}
			if(getdjrq.substring(9, 11) == '0'){
				start = year + "-" + monthT + "-" + "1";
			}else{
				start = year + "-" + monthT + "-" + getdjrq.substring(9, 11);
			}	
		}
		if (month + 6 >= 12) {
			var yearT = year + 1;
			var monthT = month - 6;
			if(monthT == 0){
				monthT = 12;
			}
			
			if (monthT < 10) {
				monthT = "0" + monthT;
			}
			if(getdjrq.substring(9, 11) == "0"){
				end = yearT + "-" + monthT + "-" + "1";
			}else{
				end = yearT + "-" + monthT + "-" + getdjrq.substring(9, 11);
			}

		} else {
			var monthT = month + 6;
			if (monthT < 10) {
				monthT = "0" + monthT;
			}
			if(getdjrq.substring(9, 11) == "0"){
				end = year + "-" + monthT + "-" + "1";
			}else{
				end = year + "-" + monthT + "-" + getdjrq.substring(9, 11);
			}
		}
	}
	htmls += "<tr><td width='70%'>车型（";
	if (null != getclid && "" != getclid) {
		htmls += getclid;
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.visual2Cartest",
				endmileagenum:getlcbds + 5000,
				startmileagenum:getlcbds - 5000,
				strattime:start,
				endtime:end,
				carversion:getclid
			}
		var data = loadDatasAjax(args1);
		if (null != data.rows && "" != data.rows) {
			clxhNum = data.rows[0].cxhgl;
			lcbdsNum = data.rows[0].lchgl;
			djrqNum = data.rows[0].djrqhgl;
		}
	
		/*$.ajax({
			url : rootPath + "/db/query.yt",
			data : {
				configName : "Survey",
				sql : "visual2Cartest",
				params : "String#" + (getlcbds + 5000) + ";;String#" + (getlcbds - 5000) + ";;String#" + start + ";;String#" + end + ";;String#" + getclid
			},
			async : false,
			type : "post",
			success : function(data) {
				if (null != data.rows && "" != data.rows) {
					clxhNum = data.rows[0].cxhgl;
					lcbdsNum = data.rows[0].lchgl;
					djrqNum = data.rows[0].djrqhgl;
				}
			}
		});*/
	}
	htmls += "）整体合格率</td><td width='15%'>"+clxhNum+"%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";

	htmls += "<tr><td width='70%'>该车型里程数为（";
	htmls += getlcbds;
	htmls += "km±5000）合格率</td><td width='15%'>"+lcbdsNum+"%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";

	//登记日期
	htmls += "<tr><td width='70%'>该车型登记日期为（";
	htmls += getdjrq.substring(0, 10);
	htmls += "±6个月）合格率</td><td width='15%'>"+djrqNum+"%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
	//$("#contrastTable").html(htmls);
	document.getElementById("contrastTable").innerHTML = htmls;
//	$('#jqmeter-container').jQMeter({
//		goal : '100',
//		raised : ""+clxhNum,
//		width : '100px',
//		height : '50px'
//	});
//	initData(clxhNum,lcbdsNum,djrqNum);
//	hglhtml+="<tr><td width='35%'>首检合格率</td><td width='20%'>"+sjhgl+"%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";
//	hglhtml+="<tr><td width='35%'>1次复检合格率</td><td width='20%'>"+fj1hgl+"%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";
//	hglhtml+="<tr><td width='35%'>2次复检合格率</td><td width='20%'>"+fj2hgl+"%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
//	hglhtml+="<tr><td width='35%'>3次复检合格率</td><td width='20%'>"+fj3hgl+"%</td><td width='38%'><input type='text' class='yieldBar3' style='display: none;'></td></tr>";
//	hglhtml+="<tr><td width='35%'>3次以上合格率</td><td width='20%'>"+fj4hgl+"%</td><td width='38%'><input type='text' class='yieldBar4' style='display: none;'></td></tr>";
//	$("#yieldTable").append(hglhtml);
	var elem = document.querySelector('.yieldBar0');//选择input元素
	var init = new Powerange(elem, {disable: true,klass: 'power-ranger', min: 0, max: 100, start: clxhNum });//实例化powerange类并且初始化参数
	var elem2 = document.querySelector('.yieldBar1');//选择input元素
	var init2 = new Powerange(elem2, {disable: true,klass: 'power-ranger', min: 0, max: 100, start: lcbdsNum });//实例化powerange类并且初始化参数
	var elem3 = document.querySelector('.yieldBar2');//选择input元素
	var init3 = new Powerange(elem3, {disable: true,klass: 'power-ranger',min: 0, max: 100, start: djrqNum });//实例化powerange类并且初始化参数
//	var elem4 = document.querySelector('.yieldBar3');//选择input元素
//	var init4 = new Powerange(elem4, {disable: true,klass: 'power-ranger', min: 0, max: 100,start: fj3hgl });//实例化powerange类并且初始化参数
//	var elem5 = document.querySelector('.yieldBar4');//选择input元素
//	var init5 = new Powerange(elem5, {disable: true,klass: 'power-ranger',min: 0, max: 100,start: fj4hgl });//实例化powerange类并且初始化参数
}

function initData(clxhNum,lcbdsNum,djrqNum){
	$('#jqmeter-container').jQMeter({
		goal : '100',
		raised : ""+clxhNum,
		width : '100px',
		height : '50px'
	});
	$('#jqmeter-container2').jQMeter({
		goal : '100',
		raised : lcbdsNum,
		width : '100px',
		height : '50px'
	});
	$('#jqmeter-container3').jQMeter({
		goal : '100',
		raised : djrqNum,
		width : '100px',
		height : '50px'
	});
	$.parse.parse();
}
//查看过程数据列表
function toDataList() {
	if (checkDataWin == null || checkDataWin == "") {
		checkDataWin = createTopWindow("checkDataWin", "<iframe src='' id='checkDataWinIframe' scrolling='no' frameborder='0'></iframe>",
			{
				title : "过程数据列表",
				width : window.top.topWidth - 100,
				height : window.top.topHeight - 50,
				collapsible : false,
				modal : true,
				closed : true,
				maximizable : false,
				minimizable : false
			});
	}
	window.top.$("#checkDataWinIframe").data('openid', window); //把父窗口对象缓存起来
	window.top.$("#checkDataWinIframe").attr("src", rootPath + "/view/mainpage/checkDataList.do?jcbgPkid=" + onePkid + "&jcff=" + jcff);
	checkDataWin.window('open');
}

//查看放大倍数
function toAmplification() {
	if (amplificationWin == null || amplificationWin == "") {
		amplificationWin = createTopWindow("amplificationWin", "<iframe src='' id='amplificationWinIframe' scrolling='no' frameborder='0'></iframe>",
			{
				title : "放大倍数窗口",
				width : window.top.topWidth - 400,
				height : window.top.topHeight - 150,
				collapsible : false,
				modal : true,
				closed : true,
				maximizable : false,
				minimizable : false
			});
	}
	window.top.$("#amplificationWinIframe").data('openid', window); //把父窗口对象缓存起来
	window.top.$("#amplificationWinIframe").attr("src", rootPath + "/common/jxh/amplification.yt?jcbgPkid=" + onePkid + "&jcff=" + jcff + "&fields=" + fields);
	amplificationWin.window('open');
}

//查看车辆检测记录详情
function toCartest() {
//	if (CartestWin == null || CartestWin == "") {
//		CartestWin = createTopWindow("CartestWin", "<iframe src='' id='CartestWinIframe' scrolling='no' frameborder='0'></iframe>",
//			{
//				title : "车辆检测记录详情",
//				width:window.innerWidth-500,
//				height:window.innerHeight-300,
//				collapsible:false,
//				modal:true,
//				closed:true,
//				maximizable:false,
//				minimizable:false
//			});
//	}
//	window.top.$("#CartestWinIframe").data('openid', window); //把父窗口对象缓存起来
//	window.top.$("#CartestWinIframe").attr("src", rootPath + "/common/jxh/checkCarList.yt?checkCarList=" + checkCarList);
//	CartestWin.window('open');
	popWindow.init(1800, 650, rootPath + "/view/mainpage/checkCarList.do?checkCarList=" + checkCarList);//异常数据
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

function aaaaa(){
	window.location.href = rootPath + "/view/mainpage/dsjIndex.do";
}