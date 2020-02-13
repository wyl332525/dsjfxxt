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

var reportRootPath = "http\://10.202.236.3\:8899/_rep";
$(function() {
	//根据违规ID获取违规信息
	getYCxx(pkid);
	$('html').fontFlex(12, 20, 114);
	$("#carMessageTable tr:even").addClass("style1"); //奇数行的样式
	$("#carTextTable tr:even").addClass("style1"); //奇数行的样式
	$("#InforChangesTable tr:even").addClass("style1"); //奇数行的样式
	$("#myiframe").load(function() {
		$(this).contents().find("div.embed-footer").css('display', 'none');
	});
	initGcsj();
});

function initGcsj(){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxh.getCheckResultMain",
			pkid:pkid
		}
	var data = loadDatasAjax(args1);
	//var titleT = new Array(); //曲线标题
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
				/*}else{
					titleT = ['实时车速','发动机转速','轮边功率','烟度值'];						
					fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
				}*/
			}else if(jcff == 'TG'){//不透光烟度法   
				titleT = ['烟度','发动机转速'];
				fields = "smoke:1;;rateSpeed:1;;";
			}
			getGcsj(onePkid,fields);
		}
	}
}

//过程数据
function getGcsj(pkid, bs,titleT) {
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
	window.top.$("#checkDataWinIframe").attr("src", rootPath + "/common/jxh/checkDataList.yt?jcbgPkid=" + onePkid + "&jcff=" + jcff);
	checkDataWin.window('open');
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
			data : data.speedK100
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
			data : data.corMaxPower
		};
		seriesT[3] = {
			name : '烟度值',
			type : 'line',
			smooth : true,
			data : data.smokeK100
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

function getYCxx(pkid){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.Survey.getycsj",
			pkid:pkid
		}
	var data = loadDatasAjax(args1);
	console.log(data);
	debugger
	var wgObj = data.rows[0];
	//var wgObj = loadDatasAjax({configName:"Survey",sql:"getycsj",params:"String#"+carPkid}).rows[0];
	makeCarInfoTable(wgObj);
	getYCxx1(wgObj);
	getJcxx(wgObj.carpkid,wgObj.checkmethod);
	toCheckReportPreview(wgObj.pkid,wgObj.checkmethod);//检测报告预览
	//var jcbgUrl = rootPath+"/video/"+wgObj.reportpath;
	//var videoPath = rootPath+"/video/"+wgObj.videopath;
	//initSp(videoPath);
}

//组装车辆基本信息表格
function makeCarInfoTable(data) {
	var htmls = "";
	htmls += "<tr><td width='42%'>车牌号码：</td><td width='57%'><div>";
	htmls += data.carcardnumber;
	htmls += "</div></td></tr><tr><td width='45%'>号牌种类：</td><td width='54%'>";
	htmls += data.cardtype;
	htmls += "</td></tr><tr><td>燃料种类：</td><td>";
	htmls += data.fueltype;
	htmls += "</td></tr><tr><td>车辆类型：</td><td class='note'>";
	htmls += data.carmode;
	htmls += "</td></tr><tr><td>车辆识别码：</td><td>";
	htmls += data.vin;
	htmls += "</td></tr><tr><td>车辆型号：</td><td>";
	htmls += data.carversion;
	htmls += "</td></tr><tr><td>注册登记日期：</td><td>";
	htmls += data.registerdate;
	htmls += "</td></tr>";
	$("#carMessageTable").append(htmls);
	//makeCheckResultTable(); //车辆检测记录
}

//根据车辆主键查询车辆的检测记录列表
function getYCxx1(data) {
	var htmls = "";
	htmls += "<tr><td width='35%'>检验机构：</td><td width='64%'>";
	htmls += data.stationname;
	htmls += "</td></tr><tr><td>检测时间：</td><td>";
	htmls += data.checktime;
	htmls += "</td></tr><tr><td>检测人：</td><td>";
	htmls += data.staffname;
	htmls += "</td></tr><tr><td>检测线：</td><td>";
	htmls += data.linename;
	htmls += "</td></tr><tr><td>车辆信息：</td><td>";
	htmls += data.clxxycsm;
	htmls += "</td></tr><tr><td>结果数据：</td><td>";
	htmls += data.jgsjycsm;
	htmls += "</td></tr><tr><td>过程数据：</td><td>";
	htmls += data.gcsjycsm;
	htmls += "</td></tr><tr><td>检测方法：</td><td>";
	htmls += data.jcffycsm;
	htmls += "</td></tr><tr><td>检测限值：</td><td>";
	htmls += data.jcxzycsm;
	//htmls += "</td></tr><tr><td>异常原因：</td><td>";
	//htmls += data.ycyy;
	/*htmls += "</td></tr><tr><td>详细原因：</td><td>";
	htmls += data.reasonxx;*/
	htmls += "</td></tr>";
	$("#carTextTable").append(htmls);
}

//组装车辆检测信息表格
function getJcxx(carpkid,jcff) {
	
	if(jcff == 'DB'){//双怠速
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.getDBXX",
				carpkid:carpkid
			}
		var wgObj = loadDatasAjax(args1).rows;
		//var wgObj = loadDatasAjax({configName:"Survey",sql:"getDBXX",params:"String#"+carpkid}).rows;
		var initTable = "";
		initTable = "<tr><td>检测时间</td><td>检测次数</td><td>低怠速CO</td><td>低怠速HC</td><td>高怠速CO</td><td>高怠速HC</td><td>高怠速HC</td>过量系数<td>结果</td>";
		for(var i=0;i<wgObj.length;i++){
			
			initTable += "<tr onclick='toShowReportAndGcsj(\""+ wgObj[i].businessid+ "\",\""+ jcff+ "\");' style='cursor:pointer;'><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].colowvalue
			+ "</td><td width='10%'>" + wgObj[i].hclowvalue+ "</td><td width='10%'>" + wgObj[i].cohighvalue+ "</td><td width='10%'>"+ wgObj[i].hchighvalue+"</td><td width='10%'>"+ wgObj[i].lambdavalue+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
		}
		$("#carTextTable1").html(initTable);
	
	}else if(jcff == 'WT'){//稳态工况法
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.getWTXX",
				carpkid:carpkid
			}
		var wgObj = loadDatasAjax(args1).rows;
		//var wgObj = loadDatasAjax({configName:"Survey",sql:"getWTXX",params:"String#"+carpkid}).rows;
		var initTable = "";
		initTable = "<tr><td>检测时间</td><td>检测次数</td><td>5025工况CO</td><td>5025工况HC</td><td>5025工况NO</td><td>2540工况CO</td><td>2540工况HC</td><td>2540工况NO</td><td>结果</td>";
		for(var i=0;i<wgObj.length;i++){
			
			initTable += "<tr onclick='toShowReportAndGcsj(\""+ wgObj[i].businessid+ "\",\""+ jcff+ "\");' style='cursor:pointer;'><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].co5025
			+ "</td><td width='10%'>" + wgObj[i].hc5025+ "</td><td width='10%'>" + wgObj[i].no5025+ "</td><td width='10%'>"+ wgObj[i].co2540+ "</td><td width='10%'>" +wgObj[i].hc2540+ "</td><td width='10%'>" +wgObj[i].no2540+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
		}
		$("#carTextTable1").html(initTable);
	}else if(jcff == 'IG'){//简易瞬态法
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.getIGXX",
				carpkid:carpkid
			}
		var wgObj = loadDatasAjax(args1).rows;
		//var wgObj = loadDatasAjax({configName:"Survey",sql:"getIGXX",params:"String#"+carpkid}).rows;
		var initTable = "";
		initTable = "<tr><td>检测时间</td><td>检测次数</td><td>CO检测值</td><td>90%点</td><td>HC检测值</td><td>NO检测值</td><td>结果</td>";
		for(var i=0;i<wgObj.length;i++){
			
			initTable += "<tr onclick='toShowReportAndGcsj(\""+ wgObj[i].businessid+ "\",\""+ jcff+ "\");' style='cursor:pointer;'><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].valueco
			+ "</td><td width='10%'>" + wgObj[i].valuehc+ "</td><td width='10%'>" + wgObj[i].valueno+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
		}
		$("#carTextTable1").html(initTable);
	}else if(jcff == 'LD'){//加载减速工况法
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.getLDXX",
				carpkid:carpkid
			}
		var wgObj = loadDatasAjax(args1).rows;
		//var wgObj = loadDatasAjax({configName:"Survey",sql:"getLDXX",params:"String#"+carpkid}).rows;
		var initTable = "";
		initTable = "<tr><td>检测时间</td><td>检测次数</td><td>100%点</td><td>90%点</td><td>80%点</td><td>轮边功率</td><td>结果</td>";
		for(var i=0;i<wgObj.length;i++){
			
			initTable += "<tr onclick='toShowReportAndGcsj(\""+ wgObj[i].businessid+ "\",\""+ jcff+ "\");' style='cursor:pointer;'><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].s100str
			+ "</td><td width='10%'>" + wgObj[i].s90str+ "</td><td width='10%'>" + wgObj[i].s80str+ "</td><td width='10%'>"+ wgObj[i].powstr+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
		}
		$("#carTextTable1").html(initTable);
	}else if(jcff == 'TG'){//不透光烟度法
		var args1 = {
				sqlKey : "com.kmzc.dao.dsj.Survey.getTGXX",
				carpkid:carpkid
			}
		var wgObj = loadDatasAjax(args1).rows;
		//var wgObj = loadDatasAjax({configName:"Survey",sql:"getTGXX",params:"String#"+carpkid}).rows;
		var initTable = "";
		initTable = "<tr><td>检测时间</td><td>检测次数</td><td>第一次烟度值</td><td>第二次烟度值</td><td>第三次烟度值</td><td>平均值</td><td>结果</td>";
		for(var i=0;i<wgObj.length;i++){
			
			initTable += "<tr onclick='toShowReportAndGcsj(\""+ wgObj[i].businessid+ "\",\""+ jcff+ "\");' style='cursor:pointer;'><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].smokevalue1
			+ "</td><td width='10%'>" + wgObj[i].smokevalue2+ "</td><td width='10%'>" + wgObj[i].smokevalue3+ "</td><td width='10%'>"+ wgObj[i].avgsmokevalue+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
		}
		$("#carTextTable1").html(initTable);
	}	
}

function toShowReportAndGcsj(pkid,checkMethod){
	toCheckReportPreview(pkid,checkMethod);
	//var titleT = new Array(); //曲线标题
	if(checkMethod == 'DB'){//双怠速
		titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
		fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
	}else if(checkMethod == 'WT'){//稳态工况法
		titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		fields = "clzHC:1;;clzCO:1;;clzNO:1;;clzO2:1;;clzCO2:1;;cs:1;;";
	}else if(checkMethod == 'IG'){//简易瞬态法
		titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		fields = "flowHC:1;;flowCO:1;;flowNO:1;;flowCO2:1;;analyserO2:1;;lineSpeed:1;;";
//		titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
//		fields = "flowHC:1;;flowCO:1;;flowCO2:1;;analyserO2:1;;rotateSpeed:1;;";
	}else if(checkMethod == 'LD'){//加载减速工况法
		if(areacode=="530800"||areacode=="532600"||areacode=="530700"||areacode=="530400"||areacode=="530300"||areacode=="532800"){
			titleT = ['实时车速','发动机转速','轮边功率','烟度值'];
			fields = "speedK100:1;;rotateSpeed:1;;corMaxPower:1;;smokeK100:1;;";
		}else{
			titleT = ['实时车速','发动机转速','轮边功率','烟度值'];						
			fields = "speed:1;;rotateSpeed:1;;power:1;;smoke:1;;";
		}
	}else if(checkMethod == 'TG'){//不透光烟度法   
		titleT = ['烟度','发动机转速'];
		fields = "smoke:1;;rateSpeed:1;;";
	}
	getGcsj(pkid,fields,titleT);
}

function toCheckReportPreview(pkid,checkMethod){
	if(checkMethod=='IG'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/VMAS.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='LD'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/LOADDOWNDATA.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='LZ'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/FILTERSMOKEDATA.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='TG'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/LIGHTPROOFSMOKEDATA.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='DB'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/DOUBLEIDLEDATA.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='DD'){//1345193436171_0001--IG
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/BEV.raq&pkid="+pkid+"&pageNum=1";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='HH'){//4401HZJTF212004759--DB
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/HH.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else if(checkMethod=='WT'){
		var jcbgUrl = reportRootPath+"/reportJsp/showReport1.jsp?raq=../reportFiles/checkReportPreview/WTGKF.raq&pkid="+pkid+"&pageNum=2";
		document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	}else{alert("获取检测信息出错!");}
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

function aaaaa(){
	var okUrl=rootPath + "/view/mainpage/dsjIndex.do";
	window.location.href = okUrl;
}