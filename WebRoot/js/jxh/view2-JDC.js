var sqclWin = null;
var checkDataWin = null;//过程数据列表窗口
var textT = "";//曲线图的标题
var titleT = new Array();//曲线标题
var fields = "";//过程数据文件的列名 id:bs;;
var jcff = "";//检测方法
var dataX = new Array();//曲线图横轴
var seriesT=new Array();
var onePkid = "";  //第一个检测报告主键

var amplificationWin = null;//放大倍数窗口
var alarmInfoWin = null;//查看报警信息窗口
$(function() {
	getCarInfo();//车辆基本信息
	getCheckList();//车辆检测记录
	getAlarmList();//报警信息展示
	countEdit();//车辆修改记录
	checkResult();//检测结果对比分析

	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getJcff",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					textT = data.rows[0].cphm;
					$(".modifyInfoTitle").append(textT+"车辆检测过程数据曲线图");
					jcff = data.rows[0].jcff;
					onePkid = data.rows[0].pkid;
					if(jcff == '1'){//双怠速
						titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
						fields = "hccsgk:1;;cocsgk:1;;co2csgk:1;;o2csgkfxy:1;;fdjzs:1;;";
					}else if(jcff == '2'){//稳态工况法
						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
						fields = "hcclz:1;;coclz:1;;noclz:1;;co2clz:1;;o2clz:1;;cs:1;;";
					}else if(jcff == '3'){//简易瞬态法
						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
						fields = "hccsgk:1;;cocsgk:1;;nocsgk:1;;co2csgk:1;;o2csgkfxy:1;;cs:1;;";
					}else if(jcff == '4'){//加载减速工况法
						titleT = ['功率扫描阶段车速','发动机转速','轮边功率','光吸收系数'];
						fields = "smjdcs:1;;fdjzs:1;;lbgl:1;;gxsxs:1;;";
					}else if(jcff == '5'){//不透光烟度法   
						titleT = ['烟度','发动机转速'];
						fields = "ydz:1;;fdjzs:1;;";
					}
					getGcsj(onePkid,fields);
				}
			}
		}
	});
});

//过程数据
function getGcsj(pkid,bs){
	fields =bs;
	var Obj = {};
	Obj["pkid"] = pkid;
	Obj["fields"] = fields;	
	$.ajax({
		url:rootPath+"/checkinfo/getCheckData.yt",
		data:Obj,
		async:false,
		type:"post",
		dataType:"json",
		success:function(data){
			//获取信息成功
			if(data.result>0){
				initMyChart(data);
			}else{
				//alert("提示：没有获取到该车辆的过程数据！");
			}
		},
		error:function(data){
			alert("错误提示：操作时出现未知错误！！");
		}
	});
	
	var piechart2 = echarts.init(($('#echart')[0]));
		var	option = {
			color:['#0ec896','#9fbd72','#c42376','#ff7b06','#856ddf','1e90ff'],
		    title: {
		        text: ''
		    },
		    toolbox:{//自定义按钮
		    	show:true,
				feature:{
					myTool1:{
						show:true,
						title:'放大倍数',
						icon:'image://../../img/jxh/gongjutiao1.png',
						onclick:function(){
							toAmplification();
						}
					},
					myTool2:{
						show:true,
						title:'过程数据',
						icon:'image://../../img/jxh/gongjutiao4.png',
						onclick:function(){
							toDataList();
						}
					}
				}
			},
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		    	top:15,
		    	right:'6%',
		    	icon:'rect',
		    	itemWidth:15,
		    	itemheight:10,
		    	data:titleT,
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: dataX,
		        axisLine: {
	                lineStyle: {
	                    color: '#e7e7e7',
	                    fontSize: 12,
	                    width: 1
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#777',
	                    align: 'center'
	
	                },
	            },
	            axisTick: {
	            	show:false,
	                alignWithLabel: true,
	                lineStyle: {
	                    color: '#ddd',
	
	                },
	            },
	            splitLine: {     //网格线
		          show: true
		        }
		    },
		    yAxis: {
		        type: 'value',
		        axisLine: {
	                lineStyle: {
	                    color: '#e7e7e7',
	                    fontSize: 12,
	                    width: 1
	                }
	            },
	            axisLabel: {
	                textStyle: {
	                    color: '#777',
	                    align: 'center'
	
	                },
	            },
	            axisTick: {
	            	show:false,
	                alignWithLabel: true,
	                lineStyle: {
	                    color: '#ddd',
	
	                },
	            },
	            splitLine: {     //网格线
		          show: true
		        }
		    },
		    series: seriesT
	};	
	piechart2.setOption(option);
	window.addEventListener("resize", function () {//窗口改变时的事件监听
        piechart2.resize();
   });
	
	
}

//初始化曲线图
function initMyChart(data){
	//首先清空数组，不然多次调用容易出现问题
	dataX.splice(0,dataX.length);
	seriesT.splice(0,seriesT.length);
	//横轴
	for(var i=1; i<=data.result; i++){
		dataX.push(i);
	}
	if(jcff == '1'){//双怠速
		seriesT[0]={ name:'HC(10-6vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#0ec896',
					borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.hccsgk};
		seriesT[1]={ name:'CO(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#9fbd72',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.cocsgk};
		seriesT[2]={ name:'CO2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#c42376',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.co2csgk};
		seriesT[3]={ name:'O2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#ff7b06',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.o2csgkfxy};
		seriesT[4]={ name:'发动机转速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#856ddf',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.fdjzs};
	}else if(jcff == '2'){//稳态工况法
		seriesT[0]={ name:'HC(10-6vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#0ec896',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.hcclz};
		seriesT[1]={ name:'CO(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#9fbd72',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.coclz};
		seriesT[2]={ name:'NO(10-6vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#c42376',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.noclz};
		seriesT[3]={ name:'CO2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#ff7b06',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.co2clz};
		seriesT[4]={ name:'O2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#856ddf',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.o2clz};
		seriesT[5]={ name:'车速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#1e90ff',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.cs};
	}else if(jcff == '3'){//简易瞬态法
		seriesT[0]={ name:'HC(10-6vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#0ec896',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.hccsgk};
		seriesT[1]={ name:'CO(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#9fbd72',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.cocsgk};
		seriesT[2]={ name:'NO(10-6vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#c42376',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.nocsgk};
		seriesT[3]={ name:'CO2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#ff7b06',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.co2csgk};
		seriesT[4]={ name:'O2(%vol)',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#856ddf',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.o2csgkfxy};
		seriesT[5]={ name:'车速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#1e90ff',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.cs};
	}else if(jcff == '4'){//加载减速工况法
		seriesT[0]={ name:'功率扫描阶段车速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#0ec896',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.smjdcs};
		seriesT[1]={ name:'发动机转速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#9fbd72',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.fdjzs};
		seriesT[2]={ name:'轮边功率',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#c42376',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.lbgl};
		seriesT[3]={ name:'光吸收系数',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#ff7b06',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.gxsxs};
	}else if(jcff == '5'){//不透光烟度法
		seriesT[0]={ name:'烟度',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#0ec896',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.ydz};
		seriesT[1]={ name:'发动机转速',symbol:'circle',symbolSize:8,itemStyle: {normal: {color:'#9fbd72',  
                    borderColor:'#fff',borderWidth: 1}},type: 'line',smooth: true, data:data.fdjzs};
	}
}

//根据车辆主键查询车辆的基本信息
function getCarInfo(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getCarInfo",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					makeCarInfoTable(data);
				}
			}
		}
	});
}

//组装车辆基本信息表格
function makeCarInfoTable(data){
	var htmls = "";
	var obj = data.rows[0];
	htmls += "<tr><td>车牌号码：</td><td><span class='plateNum'>";
	htmls += initTbCardStyle(obj.cpys,obj.cphm);
	htmls += "</span></td></tr><tr><td>号牌种类：</td><td>";
	htmls += obj.hpzl;
	htmls += "</td></tr><tr><td>燃料种类：</td><td>";
	htmls += obj.rlzl;
	htmls += "</td></tr><tr><td>车辆类型：</td><td>";
	htmls += obj.cllx;
	htmls += "</td></tr><tr><td>车辆识别码：</td><td>";
	htmls += obj.vin;
	htmls += "</td></tr><tr><td>使用性质：</td><td>";
	htmls += obj.syxz;
	htmls += "</td></tr><tr><td>车辆型号：</td><td>";
	htmls += obj.clxh;
	htmls += "</td></tr><tr><td>发动机型号：</td><td>";
	htmls += obj.fdjxh;
	htmls += "</td></tr><tr><td>注册登记日期：</td><td>";
	htmls += obj.cldjrq;
	htmls += "</td></tr>";
	$(".basicMsgListsTable").append(htmls);
}

//根据车辆主键查询车辆的检测记录列表
function getCheckList(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getCheckList",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			makeCheckListTable(data);
		}
	});
}

//组装车辆检测信息表格
function makeCheckListTable(data){
	var htmls = "<tr><th width='30%'>时间</th><th width='30%'>检测方法</th><th width='40%'>检测结果</th></tr>";
	var num = data.rows.length;
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
		htmls += "<tr><td>";
		htmls += obj.sj;
		htmls += "</td><td>";
		htmls += obj.jcff;
		htmls += "</td><td class='td'><span class='testtimes'>";
		htmls += obj.fjqk;
		if(obj.jcjg == '通过'){
			htmls += "</span><span class='uptest' onclick='toProcessGraph(\""+obj.pkid+"\",\""+obj.jcffdm+"\")'>";
		}else{
			htmls += "</span><span class='below' onclick='toProcessGraph(\""+obj.pkid+"\",\""+obj.jcffdm+"\")'>";
		}
		htmls += obj.jcjg;
		htmls += "</span></td></tr>";
	}
	//如何行数不够3行，则需要加到3行
	for(var j=num; j<3; j++){
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td class='td'>&nbsp;</td></tr>";
	}
	$(".vehicleRecordTable").append(htmls);
}

//点击检测结果
function toProcessGraph(pkid,jcffdm){
	jcff = jcffdm;
	onePkid = pkid;
	if(jcff == '1'){//双怠速
		titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
		fields = "hccsgk:1;;cocsgk:1;;co2csgk:1;;o2csgkfxy:1;;fdjzs:1;;";
	}else if(jcff == '2'){//稳态工况法
		titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		fields = "hcclz:1;;coclz:1;;noclz:1;;co2clz:1;;o2clz:1;;cs:1;;";
	}else if(jcff == '3'){//简易瞬态法
		titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
		fields = "hccsgk:1;;cocsgk:1;;nocsgk:1;;co2csgk:1;;o2csgkfxy:1;;cs:1;;";
	}else if(jcff == '4'){//加载减速工况法
		titleT = ['功率扫描阶段车速','发动机转速','轮边功率','光吸收系数'];
		fields = "smjdcs:1;;fdjzs:1;;lbgl:1;;gxsxs:1;;";
	}else if(jcff == '5'){//不透光烟度法   
		titleT = ['烟度','发动机转速'];
		fields = "ydz:1;;fdjzs:1;;";
	}
	getGcsj(onePkid,fields);
}

//根据车辆主键查询车辆的报警信息列表
function getAlarmList(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getAlarmList",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			makeAlarmListTable(data);
		}
	});
}

//组装车辆报警信息表格
function makeAlarmListTable(data){
	var htmls = "<tr><th style='width:30%'>报警类型</th><th style='width:50%'>报警内容</th><th style='width:20%'>处理方式</th></tr>";
	var num = data.rows.length;
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
		htmls += "<tr><td style='text-overflow:ellipsis;overflow:hidden;' title='"+obj.bjmc+"'>";
		htmls += obj.bjmc;
		htmls += "</td><td style='text-overflow:ellipsis;overflow:hidden;' title='"+obj.bjsm+"'>";
		htmls += obj.bjsm;
		htmls += "</td><td>";
		if(obj.clfs == '0'){
			htmls += "<a onclick='toLookAlarm(\""+obj.pkid+"\")';' class='warming'>报警</a>";
		}else{
			htmls += "<a onclick='toLookAlarm(\""+obj.pkid+"\")';' class=cancel'>作废</a>";
		}
		htmls += "</td></tr>";
	}
	//如何行数不够6行，则需要加到5行
	for(var j=num; j <5; j++){
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$(".msgShowlists").append(htmls);
}

//根据车辆主键查询该车有哪些修改记录
function countEdit(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"countEdit",params:"String#"+carPkid+";;String#"+carPkid+";;String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					makeEditListTable(data);
				}
			}
		}
	});
}

//组装车辆修改信息表格
function makeEditListTable(data){
	var htmls = "";
	var obj = data.rows[0];
	//判断是否有修改车辆信息
	var xgclxx = obj.xgclxx;
	if(null != xgclxx && xgclxx > 0){
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"editCarInfoList",params:"String#"+carPkid},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					for(var i=0; i<data.rows.length; i++){
						htmls += "<tr><td>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td>";
						htmls += "申请修改车辆信息";
						htmls += "</td><td> <a onclick='toLook(\""+data.rows[i].pkid+"\",\"1\")'>";
						htmls += "详情</a></td></tr>";
					}
				}
			}
		});
	}
	//判断是否有修改检测方法
	var xgjcff = obj.xgjcff;
	if(null != xgjcff && xgjcff > 0){
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"editJcffList",params:"String#"+carPkid},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					for(var i=0; i<data.rows.length; i++){
						htmls += "<tr><td>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td>";
						htmls += "申请修改检测方法";
						htmls += "</td><td> <a onclick='toLook(\""+data.rows[i].pkid+"\",\"2\")'>";
						htmls += "详情</a></td></tr>";
					}
				}
			}
		});
	}
	//判断是否有跨站解锁
	var xgkzjs = obj.xgkzjs;
	if(null != xgkzjs && xgkzjs > 0){
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"editKzjsList",params:"String#"+carPkid},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					for(var i=0; i<data.rows.length; i++){
						htmls += "<tr><td>";
						htmls += data.rows[i].sqsj;
						htmls += "</td><td>";
						htmls += "申请复测跨站解锁";
						htmls += "</td><td> <a onclick='toLook(\""+data.rows[i].pkid+"\",\"3\")'>";
						htmls += "详情</span></td></tr>";
					}
				}
			}
		});
	}
	var num = 0;
	if(htmls != ""){
		num = patch("<tr>",htmls);//行数
	}
	//如何行数不够4行，则需要加到4行
	for(var j=num; j <3; j++){
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$(".modifyInfoTable").append(htmls);
}

/**
 * 判断某个字符串在字符串中出现的次数
 * re 某个字符串
 * str 字符串
 * return 出现的次数
 */
function patch(re,str){
	re = eval("/"+re+"/ig")
	return str.match(re).length;
}
/**
 * 详情
 * pkid 主键
 * type 1：修改车辆信息 2：修改检测方法 3：跨站解锁
 */
function toLook(pkid,type){
	if(type == "1"){
		sqclWin=createTopWindow("sqclWin","<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"查看修改车辆信息详情页面",width:window.top.topWidth-600, height:window.top.topHeight-170,modal:true,closed:true,collapsible:false,maximizable:false,minimizable:false});
		window.top.$("#sqclWinIframe").data('openid',window);//把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src",rootPath+"/common/jcywsqcl/sqxgClxxXq.yt?pkid="+pkid);
		sqclWin.window('open');
	}else if(type == "2"){
		sqclWin=createTopWindow("sqclWin","<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"查看修改检测方法详情页面",width:window.top.topWidth-600, height:window.top.topHeight-170,modal:true,closed:true,collapsible:false,maximizable:false,minimizable:false});
		window.top.$("#sqclWinIframe").data('openid',window);//把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src",rootPath+"/common/jcywsqcl/sqxgJcffXq.yt?pkid="+pkid);
		sqclWin.window('open');
	}else if(type == "3"){
		sqclWin=createTopWindow("sqclWin","<iframe src='' id='sqclWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"查看复测跨站解锁详情页面",width:window.top.topWidth-600, height:window.top.topHeight-170,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false});
		window.top.$("#sqclWinIframe").data('openid',window);//把父窗口对象缓存起来
		window.top.$("#sqclWinIframe").attr("src",rootPath+"/common/dealUnlockCar/editUnlockCar.yt?pkid="+pkid);
		sqclWin.window('open');
	}
}

//根据车辆主键查询该车的车型、里程表读数、登记日期
function checkResult(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"checkResult",params:"String#"+carPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					makeCheckResultTable(data);
				}
			}
		}
	});
}

//组装检测结果对比表格
function makeCheckResultTable(data){
	var htmls = "";
	var clxhNum = "0";//车辆型号
	var lcbdsNum = "0";//里程表读数
	var djrqNum = "0";//登记日期
	
	var obj = data.rows[0];
	//车辆型号
	var clxh = obj.clxh;
	htmls += "<li><div>车型（";
	if(null != clxh && "" != clxh){
		htmls += clxh;
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"countClxh",params:"String#"+clxh+";;String#"+clxh},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					var zs = data.rows[0].zs;
					var tg = data.rows[0].tg;
					if(zs > 0){
						clxhNum = Math.round((tg/zs)*100);
					}
				}
			}
		});
	}
	htmls += "）整体合格率</div><div class='progressone'><div class='progress'>";
	htmls += "<div class='progress-bar progress-bar-info progress-bar-striped active' style='width: "+clxhNum+"%;'>";
	htmls += "<div class='progress-value'>";
	htmls += clxhNum;
	htmls += "%</div></div></div></div></li>";
	
	//里程表读数
	var lcbds = obj.lcbds;
	htmls += "<li><div>该车型里程数为(";
	if(null != lcbds && "" != lcbds){
		htmls += lcbds;
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"countLcbds",params:"String#"+(lcbds-5000)+";;String#"+(lcbds+5000)+";;String#"+(lcbds-5000)+";;String#"+(lcbds+5000)},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					var zs = data.rows[0].zs;
					var tg = data.rows[0].tg;
					if(zs > 0){
						lcbdsNum = Math.round((tg/zs)*100);
					}
				}
			}
		});
	}
	htmls += "km±5000)合格率:</div><div class='progresstwo'><div class='progress'>";
	htmls += "<div class='progress-bar progress-bar-info progress-bar-striped active' style='width: "+lcbdsNum+"%;'>";
	htmls += "<div class='progress-value'>";
	htmls += lcbdsNum;
	htmls += "%</div></div></div></div></li>";
	
	//登记日期
	var djrq = obj.djrq;
	htmls += "<li><div>该车型登记日期为（";
	if(null != djrq && "" != djrq){
		htmls += djrq;
		var year = parseInt(djrq.substring(0,4));
		var month = parseInt(djrq.substring(5,7));
		var start = "";
		var end = "";
		if(month-6 <= 0){
			var yearT = year -1;
			var monthT = month+6;
			if(monthT < 10){
				monthT = "0"+monthT;
			}
			start = yearT+"."+monthT;
		}else{
			var monthT = month-6;
			if(monthT < 10){
				monthT = "0"+monthT;
			}
			start = year+"."+monthT;
		}
		if(month+6 >= 12){
			var yearT = year+1;
			var monthT = month-6;
			if(monthT < 10){
				monthT = "0"+monthT;
			}
			end = yearT+"."+monthT;
		}else{
			var monthT = month+6;
			if(monthT < 10){
				monthT = "0"+monthT;
			}
			end = year+"."+monthT;
		}
		$.ajax({
			url:rootPath+"/db/query.yt",
			data:{configName:"jxh",
				sql:"countDjrq",params:"String#"+start+";;String#"+end+";;String#"+start+";;String#"+end},
				async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					var zs = data.rows[0].zs;
					var tg = data.rows[0].tg;
					if(zs > 0){
						djrqNum = Math.round((tg/zs)*100);
					}
				}
			}
		});
	}
	htmls += "±6个月）合格率：</div><div class='progressthree'><div class='progress'>";
	htmls += "<div class='progress-bar progress-bar-info progress-bar-striped active' style='width: "+djrqNum+"%;'>";
	htmls += "<div class='progress-value'>";
	htmls += djrqNum;
	htmls += "%</div></div></div></div></li>";
	$(".resultAnalysiList").append(htmls);
}

//查看过程数据列表
function toDataList(){
	if(checkDataWin == null || checkDataWin == ""){
		checkDataWin=createTopWindow("checkDataWin","<iframe src='' id='checkDataWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"过程数据列表",width:window.top.topWidth-100, height:window.top.topHeight-50,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false});
	}
	window.top.$("#checkDataWinIframe").data('openid',window);//把父窗口对象缓存起来
	window.top.$("#checkDataWinIframe").attr("src",rootPath+"/common/jxh/checkDataList.yt?jcbgPkid="+onePkid+"&jcff="+jcff);
	checkDataWin.window('open');
}

//查看放大倍数
function toAmplification(){
	if(amplificationWin == null || amplificationWin == ""){
		amplificationWin=createTopWindow("amplificationWin","<iframe src='' id='amplificationWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"放大倍数窗口",width:window.top.topWidth-700, height:window.top.topHeight-300,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false});
	}
	window.top.$("#amplificationWinIframe").data('openid',window);//把父窗口对象缓存起来
	window.top.$("#amplificationWinIframe").attr("src",rootPath+"/common/jxh/amplification.yt?jcbgPkid="+onePkid+"&jcff="+jcff+"&fields="+fields);
	amplificationWin.window('open');
}

//查看报警信息
function toLookAlarm(pkid){
	if(alarmInfoWin == null || alarmInfoWin == ""){
		alarmInfoWin=createTopWindow("alarmInfoWin","<iframe src='' id='alarmInfoWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"报警信息详情",width:window.top.topWidth-600, height:window.top.topHeight-170,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false});
	}
	window.top.$("#alarmInfoWinIframe").attr("src",rootPath+"/common/jxh/alarmInfo.yt?pkid="+pkid);
	alarmInfoWin.window('open');
}