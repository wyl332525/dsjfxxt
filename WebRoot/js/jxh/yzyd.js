var charcharObj;
var charTimes;
var hgl=new Array();//合格率
var totalnum=new Array();//合格车辆
var piechart3;//柱状图
var piechart;//安检测方法统计
var piechart2;//安检线统计
var piechart4;
var ref="";//定时执行变量
var isrun=0;
var dshgltjWin = null;
var hbcyjctjWin = null;
var zsj=0;
var jcxsj=0;
var jrsj=0;
$(function() {
	piechartTop = echarts.init(($('#chart3C')[0]));
	piechart = echarts.init(($('#yzydChartUp')[0]));
	piechart2 = echarts.init(($('#yzydChartMiddle')[0]));
	piechart3 = echarts.init(($('#yzydChartBottom')[0]));
	//piechart4 = echarts.init(document.getElementById('chart1td1'));
	getStationInfo();//检测站概况信息
	getStationBaseInfo();//检测站基本信息
//	initMap("chart3");
//	initStation();
//	dsHglBt();
//	hbctj();
//	dstj();
	
//	clzz();
	
	var sstime="String#$[1];;String#$[2]";
	//charTimes = loadDatasAjax({configName:"jxhnew",sql:"getCheckTimes",params:"String#"+stationPkid}).rows;
	charTimes = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCheckTimes",stationpkid:stationPkid}).rows;
	if(charTimes!=null&&charTimes.length>0){
		var st=charTimes[0].rq;
		sstime=st;
	}
	//动态展现柱状图、按车型、检测方法、检测线、报警统计
	loadYzydInfo(sstime);
	var ss="<div id='timeline'><div id='line1'></div><div id='butleft'></div><div id='butright'></div><div id='ztbut'>";
	ss+="<i id='ztbut1'></i></div><div id='bfbut'><i id='bfbut1'></i></div>";
	if(charTimes!=null&&charTimes.length>0){
		var aa=1;
		for(var i=charTimes.length-1;i>=0;i--){
			var vtime=charTimes[i];
			ss+="<div id='time"+aa+"' class='timeP timePk'><div class='timelinePoint"+aa+"Out checkPointOut'>";
			ss+="<div class='timelinePoint"+aa+" checkPoint'></div></div>";
			ss+="<div class='timelineNub"+aa+" checkPointNub'>"+vtime.rq+"</div></div>";
			aa++;
			if(aa>6)
				aa=1;
		}
	}
	ss+="</div>";
	$("#chart3zhou").html(ss);
	$('html').fontFlex(12, 20, 114);
	// 时间轴
	$(".timeP").click(function () {
		var ss=$(this).text();
		loadYzydInfo(ss);
	//	piechart3.resize();
		$(this).addClass("timePk");
		$(this).siblings().removeClass("timePk");
	});
	var i = -1;
	var length = $(".timeP").length;
	$("#butright").click(function () {
		i++;
		i = i >= length ? 0 : i;
		$(".timeP").eq(i).addClass("timePk");
		$(".timeP").eq(i).siblings().removeClass("timePk");
		var ss=$(".timeP").eq(i).text();
		loadYzydInfo(ss);
	});
	$("#butleft").click(function () {
		i--;
		i = i <= 0 ? 0 : i;
		$(".timeP").eq(i).addClass("timePk");
		$(".timeP").eq(i).siblings().removeClass("timePk");
		var ss=$(".timeP").eq(i).text();
		loadYzydInfo(ss);
	});
	$("#ztbut").click(function () {
		//去掉循环播放
		clearInterval(ref);
		$("#ztbut").hide();
		$("#bfbut").show();
	});
	$("#bfbut").click(function () {
		//设置定时刷新
		ref = setInterval(function(){autoRuns();},5000);
		$("#bfbut").hide();
		$("#ztbut").show();
	});

	var oMyBar1 = new MyScrollBar({
				selId: 'yield',
				bgColor: 'rgba(50, 50, 50, 0.2)',
				barColor: '#173E72',
				enterColor: '#173E72',
				enterShow: false,
				borderRadius: 2,
				width: 4
			});
	$("#mainMessage>div>div").addClass("barstyle");  
	$("#textMessageTable tr:even").addClass("style1");  //奇数行的样式
	$("#yieldTable tr:even").addClass("style1");  //奇数行的样式
	$("#mainMessageTable tr:even").addClass("style1");  //奇数行的样式
	$("#alarmMessageTable tr:even").addClass("style1");  //奇数行的样式
	$("#ycMessageTable tr:even").addClass("style1");
	if(charTimes!=null&&charTimes.length>0){
	//3. 设置定时刷新
		ref = setInterval(function(){autoRuns();},5000);
		$("#ztbut").show();
		$("#bfbut").hide();
	}else{
		$("#ztbut").hide();
		$("#bfbut").hide();
	}
	//
	window.addEventListener("resize", function () {//窗口改变时的事件监听
		if(piechart!=null)
	        piechart.resize();
		if(piechart2!=null)
	        piechart2.resize();
		if(piechart3!=null)
	        piechart3.resize();
	});
//	piechart.resize();
//	piechart2.resize();
//	piechart3.resize();
	getsj();
	window.setInterval(function() {
		getsj();
	}, 10000);
});

//动态展现柱状图、按车型、检测方法、检测线、报警统计
function loadYzydInfo(sstime){
	//合格率柱状图信息
	getCharDatas(sstime);
	//按车型统计
	//getDatasByCLlx(sstime);
	//按检测方法统计合格率
	getDatasByJCFF(sstime);
	//按检测线统计合格率
	getDatasByJCX(sstime);
	//按排放标准统计合格率
	getDatasByPfbz(sstime);
	//报警信息查询
	//getAlertDatas(sstime);
	getStationYccllb(sstime);
}

//自动执行
function autoRuns(){
	$("#butright").click();
}

function getsj(){
	//获取检测车辆次数
		//var jcAllObj = loadDatasAjax({configName:"jxhnew",sql:"countyzydJccls",params:"String#"+stationPkid});
		var jcAllObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.countyzydJccls",stationpkid:stationPkid});

		//$("#carsnums").html(jcAllObj.rows[0].nums);
		 var demo = new CountUp('carsnums', zsj, jcAllObj.rows[0].nums, 0, 5);
	     if (!demo.error) {
	         demo.start();
	     } else {
	         console.error(demo.error);
	     }
	     zsj = Number(jcAllObj.rows[0].nums);
		//var drjclObj = loadDatasAjax({configName:"jxhnew",sql:"countJcclsjt",params:"String#"+stationPkid});
		var drjclObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.countJcclsjt",belongtostation:stationPkid});

	     //$("#drjcnums").html(drjclObj.rows[0].nums);
		 var demo1 = new CountUp('drjcnums', jrsj, drjclObj.rows[0].nums, 0, 5);
	     if (!demo1.error) {
	         demo1.start();
	     } else {
	         console.error(demo1.error);
	     }
	     jrsj = Number(drjclObj.rows[0].nums);
		//var jcxtsObj = loadDatasAjax({configName:"jxhnew",sql:"countJcxts",params:"String#"+stationPkid});
		var jcxtsObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.countJcxts",belongtostation:stationPkid});

		//$("#jcxnums").html(jcxtsObj.rows[0].cc);
		 var demo2 = new CountUp('jcxnums', jcxsj, jcxtsObj.rows[0].cc, 0, 5);
		 if (!demo2.error) {
	         demo2.start();
	     } else {
	         console.error(demo2.error);
	     }
	     jcxsj = Number(jcxtsObj.rows[0].cc);
}

//检测概况数据组织
function getStationInfo(){
	

	//合格率统计
	var hglhtml="";//合格率信息
	var sjnums="",sjhgl="0";//首检合格数
	var fj1nums="",fj1hgl="0";//复检1次合格数
	var fj2nums="",fj2hgl="0";//复检2次合格数
	var fj3nums="",fj3hgl="0";//复检3次合格数
	var fj4nums="",fj4hgl="0";//复检4次合格数
	//var dataObj = loadDatasAjax({configName:"jxhnew",sql:"hgltjyzyd",params:"String#"+stationPkid});
	var dataObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.hgltjyzyd",stationpkid:stationPkid});
	if(null != dataObj.rows && "" != dataObj.rows){
		if(dataObj.rows.length > 0){
			for(var i=0;i<dataObj.rows.length;i++){
				var obj = dataObj.rows[i];
				if(obj.fjqk=="0"){
					sjnums=obj.hgs;
					sjhgl=obj.hgl;
				}else if(obj.fjqk=="1"){
					fj1nums=obj.hgs;
					fj1hgl=obj.hgl;
				}else if(obj.fjqk=="2"){
					fj2nums=obj.hgs;
					fj2hgl=obj.hgl;
				}else if(obj.fjqk=="3"){
					fj3nums=obj.hgs;
					fj3hgl=obj.hgl;
				}else if(obj.fjqk=="4"){
					fj4nums=obj.hgs;
					fj4hgl=obj.hgl;
				}
			}
		}
	}
	hglhtml+="<tr><td width='35%'>首检合格率</td><td width='20%'>"+sjhgl+"%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";
	hglhtml+="<tr><td width='35%'>1次复检合格率</td><td width='20%'>"+fj1hgl+"%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";
	hglhtml+="<tr><td width='35%'>2次复检合格率</td><td width='20%'>"+fj2hgl+"%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
	hglhtml+="<tr><td width='35%'>3次复检合格率</td><td width='20%'>"+fj3hgl+"%</td><td width='38%'><input type='text' class='yieldBar3' style='display: none;'></td></tr>";
	hglhtml+="<tr><td width='35%'>3次以上合格率</td><td width='20%'>"+fj4hgl+"%</td><td width='38%'><input type='text' class='yieldBar4' style='display: none;'></td></tr>";
	$("#yieldTable").append(hglhtml);
	var elem = document.querySelector('.yieldBar0');//选择input元素
	var init = new Powerange(elem, {disable: true,klass: 'power-ranger', min: 0, max: 100, start: sjhgl });//实例化powerange类并且初始化参数
	var elem2 = document.querySelector('.yieldBar1');//选择input元素
	var init2 = new Powerange(elem2, {disable: true,klass: 'power-ranger', min: 0, max: 100, start: fj1hgl });//实例化powerange类并且初始化参数
	var elem3 = document.querySelector('.yieldBar2');//选择input元素
	var init3 = new Powerange(elem3, {disable: true,klass: 'power-ranger',min: 0, max: 100, start: fj2hgl });//实例化powerange类并且初始化参数
	var elem4 = document.querySelector('.yieldBar3');//选择input元素
	var init4 = new Powerange(elem4, {disable: true,klass: 'power-ranger', min: 0, max: 100,start: fj3hgl });//实例化powerange类并且初始化参数
	var elem5 = document.querySelector('.yieldBar4');//选择input元素
	var init5 = new Powerange(elem5, {disable: true,klass: 'power-ranger',min: 0, max: 100,start: fj4hgl });//实例化powerange类并且初始化参数
}

//获取检测站基本信息
function getStationBaseInfo(){
	var shtml="";
	//var jczObj = loadDatasAjax({configName:"jxhnew",sql:"queryStations",params:"String#"+stationPkid});
	var jczObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.queryStations",pkid:stationPkid});
	if(jczObj != null){
		var obj = jczObj.rows[0];
		shtml+="<tr><td width='35%'>检测机构名称</td><td width='65%'>"+obj.stationname+"</td></tr>";
		shtml+="<tr><td>所在地市</td><td>"+obj.area+"</td></tr>";
		shtml+="<tr><td>行政区划</td><td>"+obj.region+"</td></tr>";
		shtml+="<tr><td>检测站状态</td><td class='note'>"+obj.stationstate+"</td></tr>";
		shtml+="<tr><td>注册日期</td><td>"+obj.registdate+"</td></tr>";
		shtml+="<tr><td>检测机构地址</td><td>"+obj.stationaddress+"</td></tr>";
		shtml+="<tr><td>法人</td><td>"+obj.legalperson+"</td></tr>";
		shtml+="<tr><td>环保负责人</td><td>"+obj.hbjcfzr+"</td></tr>";
		shtml+="<tr><td>负责人电话</td><td>"+obj.fzrphone+"</td></tr>";
	}
	$("#textMessageTable").html(shtml);
}

function getStationYccllb(stime){
	$("#yccllb").html(stime+"异常车辆列表(多次复检后合格)Top10");
	var shtml="";
	$("#ycMessageTable").html("");
	//var dataObj = loadDatasAjax({configName:"jxhnew",sql:"getJczYclb",params:"String#"+stime+";;String#"+stationPkid}).rows;
	var dataObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getJczYclb",checktime:stime,stationpkid:stationPkid}).rows;
	for(var i=0;i<dataObj.length;i++){
		var vobj = dataObj[i];
		//shtml += "<tr><td width='15%'>"+vobj.checkstation+"</td>";
		shtml += "<tr><td width='15%'>"+vobj.checkline+"</td>";
		shtml += "<td width='15%'>"+vobj.carcardnumber+"</td>";
		shtml += "<td width='30%'>"+vobj.carversion+"</td>";
		shtml += "<td width='20%'>"+vobj.recheckinfo+"</td>";
		shtml += "<td width='20%'>"+vobj.checkmethod+"</td></tr>";
	}
	$("#ycMessageTable").html(shtml);
}

//获取检测合格率柱状图信息
function getCharDatas(stime){
	//var dataObj = loadDatasAjax({configName:"jxhnew",sql:"getAllHgl",params:"String#"+stime+";;String#"+stationPkid}).rows[0];
	var dataObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getAllHgl",checktime:stime,stationpkid:stationPkid}).rows[0];
	var jclArray = new Array();
	var hglArray = new Array();
	jclArray.push(dataObj.sjzs);
	jclArray.push(dataObj.fj1zs);
	jclArray.push(dataObj.fj2zs);
	jclArray.push(dataObj.fj3zs);
	jclArray.push(dataObj.fj4zs);
	jclArray.push(dataObj.fj5zs);
	hglArray.push(dataObj.sjhgl);
	hglArray.push(dataObj.fj1hgl);
	hglArray.push(dataObj.fj2hgl);
	hglArray.push(dataObj.fj3hgl);
	hglArray.push(dataObj.fj4hgl);
	hglArray.push(dataObj.fj5hgl);
	option = {
			tooltip: {
				trigger: 'axis',
				axisPointer: {type: 'cross'}
			},
			grid: {
				left: '6%',
		        right: '1%',
		        bottom: '2%',
		        top:'10%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: ['首检','一次复检','2次复检','3次复检','4次复检','4次以上'],
					axisLine:{
						lineStyle:{
							color:'#4EF0FE',
							fontSize: 12,
							width:2
						}
					},
				}
				],
				yAxis: [
					{
						type: 'value',
						name: '单位:辆',
						axisLine:{
							lineStyle:{
								color:'#4EF0FE',
								fontSize: 12,
								width:1
							}
						},
						axisLabel: {
							formatter: '{value} '
						}
					},
					{
						type: 'value',
						name: '合格率',
						min: 0,
						max: 100,
						interval:20,
						axisLine:{
							lineStyle:{
								color:'#4EF0FE',
								fontSize: 12,
								width:2
							}
						},
						axisLabel: {
							formatter: '{value} %'
						}
					}
					],
					series: [
						{
							name:'合格率',
							type:'line',
							yAxisIndex: 1,
							itemStyle: {
								normal: {
									
									color: '#0F3DDD',
									borderColor: 'rgba(219,50,51,0.2)',
									borderWidth: 12
								}
							},
							areaStyle: {
								normal: {
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
										offset: 0,
										color: 'rgba(0, 136, 212, 0.3)'
									}, {
										offset: 0.8,
										color: 'rgba(0, 136, 212, 0)'
									}], false),
									shadowColor: 'rgba(0, 0, 0, 0.1)',
									shadowBlur: 10
								}
							},
							data:hglArray
						},
						{
							name:'单位:辆',
							type:'bar',
							
							barWidth: 35,
							itemStyle: {
								normal: {
									
									barBorderRadius: 35,
									color: new echarts.graphic.LinearGradient(
											0, 0, 0, 1,
											[
												{offset: 0, color: '#4EF0FE'},
												{offset: 1, color: '#1A6A7D'}
												]
									)
								}
							},
							data:jclArray
						},
						]
		};
	piechartTop.setOption(option);
}
//按照车型统计
function getDatasByCLlx(stime){
	$("#mainMessageTable").html("");
	var stry="";
	var numt=8;
	var totalsc=0;
	var chtml="<tbody class='scroll'><tr class='opaque'>";
	chtml+="<td width='10%'>车辆类型</td><td width='10%'>首检</td><td width='20%'>合格率</td>";
	chtml+="<td width='10%'>1次复检</td><td width='20%'>合格率</td><td width='10%'>2次以上</td>";
	chtml+="<td width='20%'>合格率</td></tr>";
	chtml+="</tbody>";
	
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getDatasByCLlx",params:"String#"+stationPkid+";;"+stime},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					totalsc=data.rows.length;
					for(var i=0;i<data.rows.length;i++){
						
						var obj=data.rows[i];
						var sjnum=obj.sjnum;
						var sjok=obj.sjok;
						var ofjnum=obj.ofjnum;
						var ofjok=obj.ofjok;
						var tfjnum=obj.tfjnum;
						var tfjok=obj.tfjok;
						if(sjnum==0){
							sjnum=1;
						}
						if(ofjnum==0){
							ofjnum=1;
						}
						if(tfjnum==0){
							tfjnum=1;
						}
						var hgl0=sjok*100/sjnum;
						var hgl1=ofjok*100/ofjnum;
						var hgl2=tfjok*100/tfjnum;
						chtml+="<tr><td title='"+obj.cllx+"'>"+obj.cllx+"</td>";
						chtml+="<td><span class='fstNub'>"+sjnum+"</span></td>";
						chtml+="<td><input type='text' class='yieldBar"+(numt+0)+"' style='display: none;'><span class='fstNub'>"+hgl0.toFixed(2)+"%</span></td>";
						chtml+="<td><span class='fstNub'>"+ofjnum+"</span></td>";
						chtml+="<td><input type='text' class='yieldBar"+(numt+1)+"' style='display: none;'><span class='fstNub'>"+hgl1.toFixed(2)+"%</span></td>";
						chtml+="<td><span class='fstNub'>"+tfjnum+"</span></td>";
						chtml+="<td><input type='text' class='yieldBar"+(numt+2)+"' style='display: none;'><span class='fstNub'>"+hgl2.toFixed(2)+"%</span></td>";
						chtml+="</tr>";
					stry+=numt+":"+hgl0.toFixed(2)+";";
					stry+=(numt+1)+":"+hgl1.toFixed(2)+";";
					stry+=(numt+2)+":"+hgl2.toFixed(2)+";";
						numt=numt+3;
					}
				}
			}
		}
	});
	//不足行补足行
	for(var j=totalsc; j <7; j++){
		chtml += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#mainMessageTable").append(chtml);
//	8:0.00;9:100.00;10:0.00;11:0.00;12:52.73;13:0.00;14:100.00;15:100.00;
	if(stry.length>0){
		var a=stry.split(";");
		if(a.length>0){
			for(var n=0;n<a.length-1;n++){
				var b=a[n].split(":");
				//alert(b[0]+"_"+b[1]);
				var elem=document.querySelector('.yieldBar'+b[0]);
				var init = new Powerange(elem, {disable: true,klass: 'power-ranger',min: 0, max: 100,start: b[1] });//实例化powerange类并且初始化参数
			}
		}
	}
}

//按检测方法统计合格率
function getDatasByJCFF(stime){
	$("#jcffDiv").html(stime+"按检测方法合格率情况");
	var vjcff = new Array();
	var seriesT = new Array();
	//var jcffObj = loadDatasAjax({configName:"jxhnew",sql:"getJcffHgl",params:"String#"+stime+";;String#"+stationPkid});
	var jcffObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getJcffHgl",checktime:stime,stationpkid:stationPkid});

	for(var i=0;i<jcffObj.rows.length;i++){
		var vobj = jcffObj.rows[i];
		vjcff.push(vobj.checkmethod);
		var sjhgl = vobj.sjhgl;
		var fj1hgl = vobj.fj1hgl;
		var fj2hgl = vobj.fj2hgl;
		var fj3hgl = vobj.fj3hgl;
		var fj4hgl = vobj.fj4hgl;
		var fj5hgl = vobj.fj5hgl;
		var totalnum=new Array();
		totalnum.push(sjhgl);
		totalnum.push(fj1hgl);
		totalnum.push(fj2hgl);
		totalnum.push(fj3hgl);
		totalnum.push(fj4hgl);
		totalnum.push(fj5hgl);
		var color = ['#9015DF','#FFEF00','#FF7143','#FF17C0','#00FC00','#00FFFF'];
		seriesT[i]={ name:vobj.checkmethod,type: 'line', symbol:'circle',symbolSize:'8',data:totalnum,
				itemStyle : {
		            normal : {
		            	color:color[i],
		                lineStyle:{
		                    width:3,//折线宽度
		                }
		            }
		        }
		};
	}

	option = {
	    tooltip: {
	        trigger: 'axis',
	    },
	    legend: {
	        data:vjcff,
	        textStyle: {
	        	color: '#f1f1f1',
	        	fontSize: 12,
	        }
	    },
	    grid: {
	        left: '2%',
	        right: '8%',
	        bottom: '2%',
	        containLabel: true
	    },
	    grid:{
            y:35
        },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首次','一次复检','二次复检','三次复检','四次复检','四次以上'],
			axisLine:{
				show:true,
	            lineStyle:{
	                color:'#f1f1f1',
	                fontSize: 12,
	                width:2
	            }
	        },
	        splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    yAxis: {
	        type: 'value',
	        axisLine:{
		        lineStyle:{
		            color:'#f1f1f1',
		            fontSize: 12,
		            width:2
		        }
		    },
		    axisLabel: {
				show:true,
				textStyle:{
					color:'#30d2d7',
					fontSize:25
				},
				formatter: '{value}%'
		    },
		    splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    series: seriesT
	};
	piechart.setOption(option);
}
//按检测线统计合格率
function getDatasByJCX(stime){
	var color = ['#9015DF','#FFEF00','#FF7143','#FF17C0','#00FC00','#00FFFF'];
	$("#jcxDiv").html(stime+"按检测线合格率情况");
	var vjcx = new Array();
	var seriesT = new Array();
	var jcxObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getJcxHgl",checktime:stime,stationpkid:stationPkid}).rows;
	for(var i=0;i<jcxObj.length;i++){
		var vobj = jcxObj[i];
		vjcx.push(vobj.linename);
		var sjhgl = vobj.sjhgl;
		var fj1hgl = vobj.fj1hgl;
		var fj2hgl = vobj.fj2hgl;
		var fj3hgl = vobj.fj3hgl;
		var fj4hgl = vobj.fj4hgl;
		var fj5hgl = vobj.fj5hgl;
		var totalnum=new Array();
		totalnum.push(sjhgl);
		totalnum.push(fj1hgl);
		totalnum.push(fj2hgl);
		totalnum.push(fj3hgl);
		totalnum.push(fj4hgl);
		totalnum.push(fj5hgl);
		seriesT[i]={ name:vobj.linename,type: 'line', symbol:'circle',symbolSize:'8',data:totalnum,
				itemStyle : {
		            normal : {
		            	color:color[i],
		                lineStyle:{
		                    width:3,//折线宽度
		                }
		            }
		        }
		};
	}
	option = {
	    tooltip: {
	        trigger: 'axis',
	    },
	    legend: {
	        data:vjcx,
	        textStyle: {
	        	color: '#f1f1f1',
	        	fontSize: 12,
	        }
	    },
	    grid: {
	        left: '2%',
	        right: '8%',
	        bottom: '2%',
	        containLabel: true
	    },
	    grid:{
            y:35
        },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首次','一次复检','二次复检','三次复检','四次复检','四次以上'],
			axisLine:{
				show:true,
	            lineStyle:{
	                color:'#f1f1f1',
	                fontSize: 12,
	                width:2
	            }
	        },
	        splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    yAxis: {
	        type: 'value',
	        axisLine:{
		        lineStyle:{
		            color:'#f1f1f1',
		            fontSize: 12,
		            width:2
		        }
		    },
		    axisLabel: {
				show:true,
				textStyle:{
					color:'#30d2d7',
					fontSize:25
				},
				formatter: '{value}%'
		    },
		    splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    series: seriesT
	};
	piechart2.setOption(option);
}
//按pfbz统计合格率
function getDatasByPfbz(stime){
	var color = ['#9015DF','#FFEF00','#FF7143','#FF17C0','#00FC00','#00FFFF'];
	$("#pfbzDiv").html(stime+"按排放标准合格率情况");
	var vjcx = new Array();
	var seriesT = new Array();
	var jcxObj = loadDatasAjax({sqlKey : "com.kmzc.dao.dsj.jxhnew.getPfbzHgl",checktime:stime,stationpkid:stationPkid}).rows;
	for(var i=0;i<jcxObj.length;i++){
		var vobj = jcxObj[i];
		vjcx.push(vobj.markstandard);
		var sjhgl = vobj.sjhgl;
		var fj1hgl = vobj.fj1hgl;
		var fj2hgl = vobj.fj2hgl;
		var fj3hgl = vobj.fj3hgl;
		var fj4hgl = vobj.fj4hgl;
		var fj5hgl = vobj.fj5hgl;
		var totalnum=new Array();
		totalnum.push(sjhgl);
		totalnum.push(fj1hgl);
		totalnum.push(fj2hgl);
		totalnum.push(fj3hgl);
		totalnum.push(fj4hgl);
		totalnum.push(fj5hgl);
		seriesT[i]={ name:vobj.markstandard,type: 'line', symbol:'circle',symbolSize:'8',data:totalnum,
				itemStyle : {
		            normal : {
		            	color:color[i],
		                lineStyle:{
		                    width:3,//折线宽度
		                }
		            }
		        }
		};
	}
	option = {
	    tooltip: {
	        trigger: 'axis',
	    },
	    legend: {
	        data:vjcx,
	        textStyle: {
	        	color: '#f1f1f1',
	        	fontSize: 12,
	        }
	    },
	    grid: {
	        left: '2%',
	        right: '8%',
	        bottom: '2%',
	        containLabel: true
	    },
	    grid:{
          y:35
      },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首次','一次复检','二次复检','三次复检','四次复检','四次以上'],
			axisLine:{
				show:true,
	            lineStyle:{
	                color:'#f1f1f1',
	                fontSize: 12,
	                width:2
	            }
	        },
	        splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    yAxis: {
	        type: 'value',
	        axisLine:{
		        lineStyle:{
		            color:'#f1f1f1',
		            fontSize: 12,
		            width:2
		        }
		    },
		    axisLabel: {
				show:true,
				textStyle:{
					color:'#30d2d7',
					fontSize:25
				},
				formatter: '{value}%'
		    },
		    splitLine: {
				show:true,
				lineStyle:{
					type:'dotted'
				}
	        }
	    },
	    series: seriesT
	};
	piechart3.setOption(option);
}

//报警信息查询
function getAlertDatas(stime){
	var showTime=stime.substr(7,10);
	if(stime.substr(7,1)=="$")
		showTime="";
	$("#alarmMessageTable").html("");
	var bjnums=0;
	var shtml="<tr class='opaque'><td width='25%'></td><td width='60%' style='padding-left: 5rem;'>"+showTime+"报警信息</td>";
	 shtml+="<td width='15%'></td></tr>";
	 shtml+="<tr><td width='20%'>报警类型</td><td width='60%'>报警内容</td><td width='20%'>数量</td></tr>";
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getAlertDatas",params:"String#"+stationPkid+";;"+stime},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					bjnums=data.rows.length;
					for(var i=0;i<data.rows.length;i++){
						var obj = data.rows[i];
						shtml+="<tr><td title='"+obj.bjmc+"'>"+obj.bjmc+"</td><td title='"+obj.bjsm+"'>"+obj.bjsm+"</td><td>"+obj.nums+"</td></tr>";
					}
				}
			}
		}
	});
	for(var a=bjnums;a<6;a++){
		shtml+="<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#alarmMessageTable").append(shtml);

}

function initStation(){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getStationLb"
		}
	var data = loadDatasAjax(args1);
	
	if(null != data.rows && "" != data.rows){
//		if(data.rows.length > 0){
//			var obj = data.rows[0];
//			$("#carsnums").html(obj.nums);
//		}
		var allArray = new Array();
		for(var i=0;i<data.rows.length;i++){
			var jd = data.rows[i].longitude;//经度
			var wd = data.rows[i].latitude;//纬度
			var jwdArray = [jd,wd,data.rows[i].pkid];
			allArray.push(jwdArray);
		}
		var pointArray = new Array();
		for(var i=0;i<allArray.length;i++){
			var marker = new BMap.Marker(new BMap.Point(allArray[i][0], allArray[i][1])); // 创建点
//			map.addOverlay(marker);    //增加点
//			pointArray[i] = new BMap.Point(allArray[i][0], allArray[i][1]);
//			marker.addEventListener("click",function (e) {
//                //map.centerAndZoom(pt, 12);attribute(marker,allArray[i][2]));
//                $.ajax({
//					url:rootPath+"/db/query.yt",
//					data:{configName:"jxhnew",
//						sql:"getJczjbxx",params:"String#"+e},
//						async:false,type:"post",
//					success:function(data){	
//						if(null != data.rows && "" != data.rows){
//							if(data.rows.length > 0){
//								var obj = data.rows[0];
////								var opts = {
////										  width : 200,     // 信息窗口宽度
////										  height: 100,     // 信息窗口高度
////										  title : obj.stationname// 信息窗口标题
//////										  enableMessage:true,//设置允许信息窗发送短息
//////										  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
////										}
//								var infoWindow = new BMap.InfoWindow("地址："+obj.stationaddress);  // 创建信息窗口对象 
//								maker.openInfoWindow(infoWindow,point);
//							}
//						}
//					}
//				});
//            });
			
			var args2 = {
					sqlKey : "com.kmzc.dao.dsj.jxhnew.getJczjbxx",
					pkid:allArray[i][2]
				}
			var data2 = loadDatasAjax(args2);
			
			if(null != data2.rows && "" != data2.rows){
				if(data2.rows.length > 0){
					var obj = data2.rows[0];
					addMarker(marker,obj.stationname,obj.stationaddress);
				}
			}
		
			/*
			$.ajax({
				url:rootPath+"/db/query.yt",
				data:{configName:"jxhnew",
					sql:"getJczjbxx",params:"String#"+allArray[i][2]},
					async:false,type:"post",
				success:function(data){	
					if(null != data.rows && "" != data.rows){
						if(data.rows.length > 0){
							var obj = data.rows[0];
							addMarker(marker,obj.stationname,obj.stationaddress);
						}
					}
				}
			});*/
		}
		//让所有点在视野范围内
		map.setViewport(pointArray);
		//获取覆盖物位置
		function attribute(point,e){
			
//			var p = e.target;
//			alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
		}
	}

	
	/*$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxhnew",
			sql:"getStationLb"},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
//				if(data.rows.length > 0){
//					var obj = data.rows[0];
//					$("#carsnums").html(obj.nums);
//				}
				var allArray = new Array();
				for(var i=0;i<data.rows.length;i++){
					var jd = data.rows[i].longitude;//经度
					var wd = data.rows[i].latitude;//纬度
					var jwdArray = [jd,wd,data.rows[i].pkid];
					allArray.push(jwdArray);
				}
				var pointArray = new Array();
				for(var i=0;i<allArray.length;i++){
					var marker = new BMap.Marker(new BMap.Point(allArray[i][0], allArray[i][1])); // 创建点
//					map.addOverlay(marker);    //增加点
//					pointArray[i] = new BMap.Point(allArray[i][0], allArray[i][1]);
//					marker.addEventListener("click",function (e) {
//                        //map.centerAndZoom(pt, 12);attribute(marker,allArray[i][2]));
//                        $.ajax({
//    						url:rootPath+"/db/query.yt",
//    						data:{configName:"jxhnew",
//    							sql:"getJczjbxx",params:"String#"+e},
//    							async:false,type:"post",
//    						success:function(data){	
//    							if(null != data.rows && "" != data.rows){
//    								if(data.rows.length > 0){
//    									var obj = data.rows[0];
////    									var opts = {
////    											  width : 200,     // 信息窗口宽度
////    											  height: 100,     // 信息窗口高度
////    											  title : obj.stationname// 信息窗口标题
//////    											  enableMessage:true,//设置允许信息窗发送短息
//////    											  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
////    											}
//    									var infoWindow = new BMap.InfoWindow("地址："+obj.stationaddress);  // 创建信息窗口对象 
//    									maker.openInfoWindow(infoWindow,point);
//    								}
//    							}
//    						}
//    					});
//                    });
					
					$.ajax({
						url:rootPath+"/db/query.yt",
						data:{configName:"jxhnew",
							sql:"getJczjbxx",params:"String#"+allArray[i][2]},
							async:false,type:"post",
						success:function(data){	
							if(null != data.rows && "" != data.rows){
								if(data.rows.length > 0){
									var obj = data.rows[0];
									addMarker(marker,obj.stationname,obj.stationaddress);
								}
							}
						}
					});
				}
				//让所有点在视野范围内
				map.setViewport(pointArray);
				//获取覆盖物位置
				function attribute(point,e){
					
//					var p = e.target;
//					alert("marker的位置是" + p.getPosition().lng + "," + p.getPosition().lat);
				}
			}
		}
	});*/
	
}

function dsHglBt(){
//	var xzqh = $('#xzqh').combobox('getValue');
//	var jczbh = $('#jczmc').combobox('getValue');
//    var tjsjq = $('#tjsjq').datebox('getValue');
//    var tjsjz = $('#tjsjz').datebox('getValue');
//    var param = "";
//    if(xzqh=="" || xzqh==null){param+=";;String#$[1]";}else{param+=";;String#"+xzqh;}
//    if(jczbh=="" || jczbh==null){param+=";;String#$[2]";}else{param+=";;String#"+jczbh;}
//	if(tjsjq=="" || tjsjq==null){param+=";;String#$[3]";}else{param+=";;String#"+tjsjq;}
//	if(tjsjz=="" || tjsjz==null){param+=";;String#$[4]";}else{param+=";;String#"+tjsjz;}
//	
//	if(param == null || param == ""){
//		querywhere = "String#$[1];;String#$[2];;String#$[3];;String#$[4];;String#$[5];;String#$[6]";
//	}
	var kmObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"530100",starttime: "",endtime: ""});
	var yxObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"530400",starttime: "",endtime: ""});
	var peObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"530800",starttime: "",endtime: ""});
	var dlObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"532900",starttime: "",endtime: ""});
	var qjObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"530300",starttime: "",endtime: ""});
	var wsObj = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHglByAreacode",areacode:"532600",starttime: "",endtime: ""});
	//昆明数据
	var kmhg = kmObj["hgs"];
	var kmbhg = kmObj["bhgs"];
	//玉溪数据
	var yxhg = yxObj["hgs"];
	var yxbhg = yxObj["bhgs"];
	//普洱数据
	var pehg = peObj["hgs"];
	var pebhg = peObj["bhgs"];
	//大理数据
	var dlhg = dlObj["hgs"];
	var dlbhg = dlObj["bhgs"];
	var qjhg = qjObj["hgs"];
	var qjbhg = qjObj["bhgs"];
	var wshg = wsObj["hgs"];
	var wsbhg = wsObj["bhgs"];
	
    var kmhgl = 0;
	if(kmhg == 0 && kmbhg == 0){
		kmhgl = 0;
	}else{
		var zs = Number(kmhg) + Number(kmbhg);
		kmhgl = (kmhg/zs).toFixed(4);
		kmhgl = kmhgl * 100;
	}
	var yxhgl = 0;
	if(yxhg == 0 && yxbhg == 0){
		yxhgl = 0;
	}else{
		var zs = Number(yxhg) + Number(yxbhg);
		yxhgl = (yxhg/zs).toFixed(4);
		yxhgl = yxhgl * 100;
	}
	var pehgl = 0;
	if(pehg == 0 && pebhg == 0){
		pehgl = 0;
	}else{
		var zs = Number(pehg) + Number(pebhg);
		pehgl = (pehg/zs).toFixed(4);
		pehgl = pehgl * 100;
	}
	var dlhgl = 0;
	if(dlhg == 0 && dlbhg == 0){
		dlhgl = 0;
	}else{
		var zs = Number(dlhg) + Number(dlbhg);
		dlhgl = (dlhg/zs).toFixed(4);
		dlhgl = dlhgl * 100;
	}
	pehgl = Math.round(pehgl*100)/100
	var qjhgl = 0;
	if(qjhg == 0 && qjbhg == 0){
		qjhgl = 0;
	}else{
		var zs = Number(qjhg) + Number(qjbhg);
		qjhgl = (qjhg/zs).toFixed(4);
		qjhgl = qjhgl * 100;
	}
	var wshgl = 0;
	if(wshg == 0 && wsbhg == 0){
		wshgl = 0;
	}else{
		var zs = Number(wshg) + Number(wsbhg);
		wshgl = (wshg/zs).toFixed(4);
		wshgl = wshgl * 100;
	}
	
	var myChart = echarts.init(document.getElementById('chart1'));
	var myChart15 = echarts.init(document.getElementById('chart15'));
	var myChart16 = echarts.init(document.getElementById('chart16'));
	var myChart17 = echarts.init(document.getElementById('chart17'));
	var myChart18 = echarts.init(document.getElementById('chart18'));
	var myChart19 = echarts.init(document.getElementById('chart19'));
	var labelTop = {
		    normal : {
		    	color: '#93FF43',
		        label : {
		            show : true,
		            position : 'center',
		            formatter : '{b}',
		            textStyle: {
		                baseline : 'bottom',
		                color:'#FFF'
		            }
		        },
		        labelLine : {
		            show : true
		        },
		        show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
		    },
		    emphasis: {
		        show: true,
                textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                }
		    }
		};
		
		var labelBottom = {
		    normal : {
		        color: '#FFF',
		        label : {
		            show : true,
		            position : 'center'
		        },
		        labelLine : {
		            show : false
		        }
		    },
		    emphasis: {
		        color: '#FFF'
		    }
		};
		
		var labelFromatter = {
			    normal : {
			        label : {
			            formatter : function (params){
			                return 100 - params.value + '%'
			            },
			            textStyle: {
			                baseline : 'top'
			            }
			        }
			    },
			}
		var radius = [40, 55];
		var option = {
				title : {
			        text: '昆明市',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=kmhgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-kmhgl,3), value:roundFun(100-kmhgl,3), itemStyle : labelBottom},
			                {name:roundFun(kmhgl,3), value:roundFun(kmhgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		    
		};
		var option1 = {
				title : {
			        text: '玉溪市',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=yxhgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-yxhgl,3), value:roundFun(100-yxhgl,3), itemStyle : labelBottom},
			                {name:roundFun(yxhgl,3), value:roundFun(yxhgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		};
		var option2 = {
				title : {
			        text: '曲靖市',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=qjhgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-qjhgl,3), value:roundFun(100-qjhgl,3), itemStyle : labelBottom},
			                {name:roundFun(qjhgl,3), value:roundFun(qjhgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		};
		var option3 = {
				title : {
			        text: '普洱市',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=pehgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-pehgl,3), value:roundFun(100-pehgl,3), itemStyle : labelBottom},
			                {name:roundFun(pehgl,3), value:roundFun(pehgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		};
		var option4 = {
				title : {
			        text: '大理州',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=dlhgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-dlhgl,3), value:roundFun(100-dlhgl,3), itemStyle : labelBottom},
			                {name:roundFun(dlhgl,3), value:roundFun(dlhgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		};
		var option5 = {
				title : {
			        text: '文山州',
			        x: 'center',
			        top:'0',
			        textStyle:{
			        	color:'#FFF'
			        }
			    },
			    series: [
			        {
			            name:'检测数量',
			            type:'pie',
			            radius: ['50%', '70%'],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: true,
			                    position: 'center',
			                    formatter:function (argument) {
		                            var html;
		                            html=wshgl;
		                            return html;
		                        },
		                        textStyle: {
			                        fontSize: '20',
			                        fontWeight: 'bold'
			                    }
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
			            data:[
			            	{name:roundFun(100-wshgl,3), value:roundFun(100-wshgl,3), itemStyle : labelBottom},
			                {name:roundFun(wshgl,3), value:roundFun(wshgl,3),itemStyle : labelTop}
			            ]
			        }
			    ]
		};
		myChart.setOption(option);
		myChart15.setOption(option1);
		myChart16.setOption(option2);
		myChart17.setOption(option3);
		myChart18.setOption(option4);
		myChart19.setOption(option5);
}
function roundFun(v,n){
	return Math.round(v*Math.pow(10,n))/Math.pow(10,n);
}

function hbctj(){
	var kmHbc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycJclByAreacode",areacode:"530100",starttime: startdate,endtime: enddate});
	var kmCyc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcJclByAreacode",areacode:"530100",starttime: startdate,endtime: enddate});
	var yxHbc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycJclByAreacode",areacode:"530400",starttime: startdate,endtime: enddate});
	var yxCyc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcJclByAreacode",areacode:"530400",starttime: startdate,endtime: enddate});
	var ljHbc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycJclByAreacode",areacode:"530700",starttime: startdate,endtime: enddate});
	var ljCyc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcJclByAreacode",areacode:"530700",starttime: startdate,endtime: enddate});
	var peHbc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycJclByAreacode",areacode:"530800",starttime: startdate,endtime: enddate});
	var peCyc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcJclByAreacode",areacode:"530800",starttime: startdate,endtime: enddate});
	var wsHbc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getCycJclByAreacode",areacode:"532600",starttime: startdate,endtime: enddate});
	var wsCyc = getZkytData({sqlKey : "com.kmzc.dao.dsj.jxhnew.getHbcJclByAreacode",areacode:"532600",starttime: startdate,endtime: enddate});
//	var dlHbc = getZkytData({configName:"jxhnew",sql:"getHbcJclByAreacode",params:"String#532900"});
//	var dlCyc = getZkytData({configName:"jxhnew",sql:"getCycJclByAreacode",params:"String#532900"});
	//alert(kmHbc.["hbc"]);
	var dsArray = new Array();
	dsArray.push('昆明');
	dsArray.push('玉溪');
	dsArray.push('丽江');
	dsArray.push('普洱');
	dsArray.push('文山');		
//	dsArray.push('大理');	
	var hbcArray = new Array();
	hbcArray.push(kmHbc["hbc"]);
	hbcArray.push(yxHbc["hbc"]);
	hbcArray.push(ljHbc["hbc"]);
	hbcArray.push(peHbc["hbc"]);
	hbcArray.push(wsHbc["hbc"]);
//	hbcArray.push(dlHbc["hbc"]);
	var cycArray = new Array();
	cycArray.push(kmCyc["cyc"]);
	cycArray.push(yxCyc["cyc"]);
	cycArray.push(ljCyc["cyc"]);
	cycArray.push(peCyc["cyc"]);
	cycArray.push(wsCyc["cyc"]);
//	cycArray.push(dlCyc["cyc"]);
	var myChart = echarts.init(document.getElementById('textMessage'));
	var option = {
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow',
		            label:{
		            	color:'#FFF'
		            }
		        }
		    },
		    legend: {
		        data: ['黄标车', '柴油车'],
		    	left:'left',
		    	textStyle:{
		    		color:'#FFF'
		    	}
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: {
		    	splitLine:{show: false},
		        type: 'value',
		        boundaryGap: [0, 0.01],
		        axisLine:{
		        	lineStyle:{
		        		color:'#FFF'
		        	}
		        }
		    },
		    yAxis: {
		    	splitLine:{show: false},
		        type: 'category',
		        axisLine:{
		        	lineStyle:{
		        		color:'#FFF'
		        	}
		        },
		        data: dsArray
		    },
		    series: [
		        {
		            name: '黄标车',
		            type: 'bar',
		            barWidth: 20,
		            itemStyle: {
						normal: {
							
							barBorderRadius: 35,
							color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#ec6941'},
										{offset: 1, color: '#ec6941'}
										]
							)
						}
					},
				    label: {
				        normal: {
				            show: true,
				            position: 'insideRight',
				            textStyle: {
				              color: '#FFF'
				            }
				        }
				     },
		            data: hbcArray
		        },
		        {
		            name: '柴油车',
		            type: 'bar',
		            barWidth: 20,
		            itemStyle: {
						normal: {
							barWidth: 15,
							barBorderRadius: 35,
							color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1,
									[
										{offset: 0, color: '#5319c2'},
										{offset: 1, color: '#5319c2'}
										]
							)
						}
					},
					label: {
				        normal: {
				            show: true,
				            position: 'insideRight',
				            textStyle: {
				              color: '#FFF'
				            }
				        }
				     },
		            data: cycArray
		        }
		    ]
		};
	myChart.setOption(option);
}

function dstj(){
	var myChart = echarts.init(document.getElementById('chart2'));
	//首先查询数据
	var dsArray = new Array();
	var jclArray = new Array();
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getDsjclGroup",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);
	for(var i=0;i<data.total;i++){
		var ret = data.rows;
		dsArray.push(ret[i].area);
		jclArray.push(ret[i].c);
	}

	
    /*$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxhnew",sql:"getDsjclGroup"},
		async:false,type:"post",dataType:'json',
		success:function(data){
			for(var i=0;i<data.total;i++){
				var ret = data.rows;
				dsArray.push(ret[i].area);
				jclArray.push(ret[i].c);
			}
		},
		error:function(data){
			$.messager.alert("错误提示：","操作时出现未知错误！！");
		}
	});*/
	var option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid:{
                x:75
            },
		    xAxis : [
		        {
		            type : 'category',
		            data : dsArray,
			        boundaryGap: [0, 0.01],
			        axisLine:{
			        	lineStyle:{
			        		color:'#FFF'
			        	},
			        },
			        axisLabel: {
                        interval: 0,
                        formatter:function(value)
                        {
                            return value.split("").join("\n");
                        }
                    }
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            splitLine:{show: false},
			        axisLine:{
			        	lineStyle:{
			        		color:'#FFF'
			        	}
			        }
		        }
		    ],
		    series : [    
		        {
		            name:'检测量',
		            type:'bar',
		            barWidth: '60%',
		            itemStyle: {
						normal: {
							barBorderRadius: 15,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                        offset: 0,
		                        color: '#4EF0FE'
		                    }, {
		                        offset: 1,
		                        color: '#1A6A7D'
		                    }]),
						}
					},
				    label: {
				        normal: {
				            show: true,
				            position: 'top',
				            textStyle: {
				              color: '#FFF'
				            }
				        }
				     },
		            data:jclArray
		        }
		    ]
		};
	myChart.setOption(option);
}
var i = 0;
var iCount ;
function clzz(){
	var obj;
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getYcsjlb",
			starttime : startdate,
			endtime : enddate
		}
	var data = loadDatasAjax(args1);
	obj = data;
	initData(data,i)

	/*$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxhnew",sql:"getYcsjlb"},
		async:false,type:"post",dataType:'json',
		success:function(data){
			obj = data;
			initData(data,i)
		},
		error:function(data){
			$.messager.alert("错误提示：","操作时出现未知错误！！");
		}
	});*/
	iCount = window.setInterval(function(){initData(obj,i++);},5000);
}

function initData(data,i){
	if(i == 49){
		clearInterval(iCount);
	}
	var carnumHtml = "";
	//for(var i=0;i<data.total;i++){
	var ret = data.rows;
	var carnum = ret[i].carcardnumber;
	var carArray = carnum.split("");
	for(j = 0; j < carArray.length; j++) {
		carnumHtml += "<div id='carnum'>"+carArray[j]+"</div>";
	}
	$('#number1').html(carnumHtml);
	$('#number2').html(carnumHtml);
	
	//表格左边的
	var jcsj = getZkytData({configName:"jxhnew",sql:"getJcsj",params:"String#"+ret[i].pkid});
	var initLeftTable = "";
	initLeftTable = "<tr><th>检测项</th><th>检测结果</th><th>单位</th><th>限值</th>";
	initLeftTable += "<tr><td>低怠速CO</td><td>"+jcsj.colstr+"</td><td>%</td><td>"+jcsj.colowvalueel+"</td></tr>";
	initLeftTable += "<tr><td>高怠速CO</td><td>"+jcsj.cohstr+"</td><td>%</td><td>"+jcsj.cohighvalueel+"</td></tr>";
	initLeftTable += "<tr><td>低怠速HC</td><td>"+jcsj.hclstr+"</td><td>10-6mol</td><td>"+jcsj.hclowvalueel+"</td></tr>";
	initLeftTable += "<tr><td>高怠速HC</td><td>"+jcsj.hchstr+"</td><td>10-6mol</td><td>"+jcsj.hchighvalueel+"<s/td></tr>";
	$("#leftTable").html(initLeftTable);
	//}
	
	var initRightTable = "";
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getJcjl",
			carcardnumber:ret[i].carcardnumber
		}
	var data = loadDatasAjax(args1);

	for(var i=0;i<data.total;i++){
		initRightTable += "<tr><td width='20%'>"+data.rows[i].fjqk+"</td><td width='40%'>"+data.rows[i].region+"</td><td>"+data.rows[i].stationshortname+"</td></tr>";
	}
	/*$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxhnew",sql:"getJcjl",params:"String#"+ret[i].carcardnumber},
		async:false,type:"post",dataType:'json',
		success:function(data){
			for(var i=0;i<data.total;i++){
				initRightTable += "<tr><td width='20%'>"+data.rows[i].fjqk+"</td><td width='40%'>"+data.rows[i].region+"</td><td>"+data.rows[i].stationshortname+"</td></tr>";
			}
		},
		error:function(data){
			$.messager.alert("错误提示：","操作时出现未知错误！！");
		}
	});*/
	$("#rightTable").html(initRightTable);
	
}

function dshgltj(){
//	 var content = '<iframe src="' + rootPath+"/common/jxh/dshgltj.yt" + '" width="100%" height="99%" frameborder="0" scrolling="no"></iframe>';
//	 $('#win').append(content);
//	 $('#winddd').window('open');
	if(dshgltjWin == null || dshgltjWin == ""){
		dshgltjWin=createTopWindow("dshgltjWin","<iframe src='' id='dshgltjWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"地市合格率统计图",width:window.innerWidth-300, height:window.innerHeight-200,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false,resizable: false});
	}
	window.top.$("#dshgltjWinIframe").data('openid',window);//把父窗口对象缓存起来
	window.top.$("#dshgltjWinIframe").attr("src",rootPath+"/common/jxh/dshgltj.yt");
	dshgltjWin.window('open');
}

function hbcyjctj(){
	if(hbcyjctjWin == null || hbcyjctjWin == ""){
		hbcyjctjWin=createTopWindow("hbcyjctjWin","<iframe src='' id='hbcyjctjWinIframe' scrolling='no' frameborder='0'></iframe>",
				{title:"黄标柴油检测统计散点图",width:window.innerWidth-300, height:window.innerHeight-200,collapsible:false,modal:true,closed:true,maximizable:false,minimizable:false,resizable: false});
	}
	window.top.$("#hbcyjctjWinIframe").data('openid',window);//把父窗口对象缓存起来
	window.top.$("#hbcyjctjWinIframe").attr("src",rootPath+"/common/jxh/hbcyjctj.yt");
	hbcyjctjWin.window('open');
}

function aaaaa(){ 
	window.location.href = rootPath + "/view/mainpage/dsjIndex.do";
}