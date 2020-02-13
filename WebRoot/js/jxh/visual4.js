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
	//根据违规ID获取违规信息
	getWgxx(wgpkid);
	
	
	//makeCheckResultTable();
	//getCheckList();
	//getAlarmList();//报警信息展示
	////countEdit();//车辆修改记录
	//checkResult();//检测结果对比分析

	$('html').fontFlex(12, 20, 114);
	$("#carMessageTable tr:even").addClass("style1"); //奇数行的样式
	$("#carTextTable tr:even").addClass("style1"); //奇数行的样式
	$("#InforChangesTable tr:even").addClass("style1"); //奇数行的样式
	$("#myiframe").load(function() {
		$(this).contents().find("div.embed-footer").css('display', 'none');
	});
//	$.ajax({
//		url:rootPath+"/db/query.yt",
//		data:{configName:"jxh",
//			sql:"getJcff",params:"String#"+carPkid},
//			async:false,type:"post",
//		success:function(data){	
//			if(null != data.rows && "" != data.rows){
//				if(data.rows.length > 0){
//					textT = data.rows[0].cphm;
//					jcff = data.rows[0].jcff;
//					onePkid = data.rows[0].pkid;
//					if(jcff == '1'){//双怠速
//						titleT = ['HC(10-6vol)','CO(%vol)','CO2(%vol)','O2(%vol)','发动机转速'];
//						fields = "hccsgk:1;;cocsgk:1;;co2csgk:1;;o2csgkfxy:1;;fdjzs:1;;";
//					}else if(jcff == '2'){//稳态工况法
//						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
//						fields = "hcclz:1;;coclz:1;;noclz:1;;co2clz:1;;o2clz:1;;cs:1;;";
//					}else if(jcff == '3'){//简易瞬态法
//						titleT = ['HC(10-6vol)','CO(%vol)','NO(10-6vol)','CO2(%vol)','O2(%vol)','车速'];
//						fields = "hccsgk:1;;cocsgk:1;;nocsgk:1;;co2csgk:1;;o2csgkfxy:1;;cs:1;;";
//					}else if(jcff == '4'){//加载减速工况法
//						titleT = ['功率扫描阶段车速','发动机转速','轮边功率','光吸收系数'];
//						fields = "smjdcs:1;;fdjzs:1;;lbgl:1;;gxsxs:1;;";
//					}else if(jcff == '5'){//不透光烟度法   
//						titleT = ['烟度','发动机转速'];
//						fields = "ydz:1;;fdjzs:1;;";
//					}
//					getGcsj(onePkid,fields);
//				}
//			}
//		}
//	});
});

function getWgxx(wgpkid){
	var wgObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.Survey.getWgxx",pkid:wgpkid}).rows[0];
	makeCarInfoTable(wgObj);
	getWgxx1(wgObj);
	getJcxx(wgObj.carpkid);
	var jcbgUrl = rootPath+"/video/"+wgObj.reportpath;
	document.getElementById("jcbg").innerHTML = '<iframe name="myiframe" style="width:100%;height:99%;border:0;" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" src="' + jcbgUrl + '"></iframe>';
	var videoPath = rootPath+"/video/"+wgObj.videopath;
	initSp(videoPath);
}

//组装车辆基本信息表格
function makeCarInfoTable(data) {
	var htmls = "";
	htmls += "<tr><td width='42%'>车牌号码：</td><td width='57%'><div>";
	htmls += data.wgcphm;
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
function getWgxx1(data) {
	var htmls = "";
	htmls += "<tr><td width='35%'>检验机构：</td><td width='64%'>";
	htmls += data.stationname;
	htmls += "</td></tr><tr><td>违规类型：</td><td>";
	htmls += data.wglx;
	htmls += "</td></tr><tr><td>违规时间：</td><td>";
	htmls += data.wgsj;
	htmls += "</td></tr><tr><td>违规说明：</td><td>";
	htmls += data.wgxxsm;
	htmls += "</td></tr><tr><td>违规检测人：</td><td>";
	htmls += data.staffname;
	htmls += "</td></tr><tr><td>违规检测线：</td><td>";
	htmls += data.linename;
	htmls += "</td></tr>";
	$("#carTextTable").append(htmls);
}

//组装车辆检测信息表格
function getJcxx(carpkid) {
	var wgObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.Survey.getCljcjl",carpkid:carpkid}).rows;
	var initTable = "";
	initTable = "<tr><td>检测时间</td><td>检测次数</td><td>100%点</td><td>90%点</td><td>80%点</td><td>轮边功率</td><td>结果</td>";
	for(var i=0;i<wgObj.length;i++){
		
		initTable += "<tr><td width='17%'>"+wgObj[i].checktime+"</td><td width='12%'>" + wgObj[i].recheckinfo + "</td><td width='10%'>" + wgObj[i].s100str
		+ "</td><td width='10%'>" + wgObj[i].s90str+ "</td><td width='10%'>" + wgObj[i].s80str+ "</td><td width='10%'>"+ wgObj[i].powstr+ "</td><td width='10%'>" + wgObj[i].checkresult+ "</td></tr>";
	}
	$("#carTextTable1").html(initTable);
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
	window.location.href = rootPath + "/common/jxh/visual1.yt";
}