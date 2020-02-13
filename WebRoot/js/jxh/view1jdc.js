var charcharObj;
var charTimes;
var hgl=new Array();//合格率
var totalnum=new Array();//合格车辆
var piechart3;//柱状图
var piechart;//安检测方法统计
var piechart2;//安检线统计

var ref="";//定时执行变量
var isrun=0;
$(function() {
	 piechart3 = echarts.init(($('#piechart')[0]));
	 piechart = echarts.init(($('#chartOne')[0]));
	 piechart2 = echarts.init(($('#chartTwo')[0]));
	getStationInfo();//检测站概况信息
	getStationBaseInfo();//检测站基本信息
	getCharTimes();//获取检测时间
	var sstime="String#$[1];;String#$[2]";
	if(charTimes!=null&&charTimes.length>0){
		var st=charTimes[0].rq;
		sstime="String#"+st+" 00:00:00;;String#"+st+" 23:59:59";
	}
	//动态展现柱状图、按车型、检测方法、检测线、报警统计
	loadYzydInfo(sstime);
	var ss="";
	ss="";
	if(charTimes!=null&&charTimes.length>0){
		var aa=1;
		for(var i=charTimes.length-1;i>=0;i--){
			var vtime=charTimes[i];
			if(i>0){
				ss+="<li><span>"+vtime.rq+"</span></li>";
			}else{
				ss+="<li class='openTimer'><span>"+vtime.rq+"</span></li>";
			}
			aa++;
			if(aa>6)
				aa=1;
		}
	}
	ss+=" <div class='line'></div>";
	$("#sjz").append(ss);
//$('html').fontFlex(12, 20, 114);
	
	// 时间轴
$(".zanting").click(function () {
    $(this).toggleClass("openLi");
    if(isrun%2==0){//暂停
    	clearInterval(ref);
    }else{//播放
    	//设置定时刷新
    	ref = setInterval(function(){autoRuns();},5000);
    }
    isrun++
//    var ss=$(".timer ul li").eq(time_i).text();
//    var sq="String#"+ss+" 00:00:00;;String#"+ss+" 23:59:59";
//	loadYzydInfo(sq);
});
$(".timer ul li").click(function () {
    time_i = $(this).index();
    $(this).addClass("openTimer");
    $(this).siblings("li").removeClass("openTimer");
    var ss=$(".timer ul li").eq(time_i).text();
    var sq="String#"+ss+" 00:00:00;;String#"+ss+" 23:59:59";
	loadYzydInfo(sq);
    //根据年份渲染图层
});
var time_i =  $(".timer ul li").length - 1;
$(".next").click(function () {
    var timeli_length = $(".timer ul li").length;
    time_i++;
    var txtyear = Number($(".timer ul li").eq(timeli_length - 1).text());
    var date = new Date;
    var nowYear = date.getFullYear();
    if (time_i >= timeli_length) {
//        if (txtyear < nowYear) {
//            time_i = 0;
//            for (var i = 0; i < timeli_length; i++) {
//                var year = txtyear + i + 1;
//				$(".timer ul li").eq(i).html('<span>'+year+'</span>');
//            }
    	time_i=0;
            $(".timer ul li").eq(0).addClass("openTimer");
            $(".timer ul li").eq(0).siblings("li").removeClass("openTimer");
//        }
//        else {
//            time_i = timeli_length-1;
//        }
    }
    else {
        $(".timer ul li").eq(time_i).addClass("openTimer");
        $(".timer ul li").eq(time_i).siblings("li").removeClass("openTimer");
    }
    var ss=$(".timer ul li").eq(time_i).text();
    var sq="String#"+ss+" 00:00:00;;String#"+ss+" 23:59:59";
	loadYzydInfo(sq);
});
$(".prev").click(function () {
    var timeli_length = $(".timer ul li").length;
    time_i--;
    if (time_i < 0) {
//        time_i = timeli_length - 1;
//        var txtyear = Number($(".timer ul li").eq(0).text());
//        var date = new Date;
//        var nowYear = date.getFullYear();
//        var firstyear = nowYear - timeli_length + 1;
//        if (txtyear <= firstyear) {
//            for (var i = 0; i < timeli_length; i++) {
//                var year = txtyear - timeli_length + i;
//                $(".timer ul li").eq(i).html('<span>'+year+'</span>');
//            }
            $(".timer ul li").eq(timeli_length - 1).addClass("openTimer");
            $(".timer ul li").eq(timeli_length - 1).siblings("li").removeClass("openTimer");
//        }
    }
    else {
        $(".timer ul li").eq(time_i).addClass("openTimer");
        $(".timer ul li").eq(time_i).siblings("li").removeClass("openTimer");
    }
    var ss=$(".timer ul li").eq(time_i).text();
    var sq="String#"+ss+" 00:00:00;;String#"+ss+" 23:59:59";
	loadYzydInfo(sq);
  //根据年份渲染图层
//          dataparams.TimeYear=   $(".timer ul li").eq(time_i).text();
//          addfeayurLayer(dataparams.dataType);
});
if(charTimes!=null&&charTimes.length>0){
	//3. 设置定时刷新
		ref = setInterval(function(){autoRuns();},5000);
	}
var progress = $(".progress-bar-inner");
    progress.each(function (i)
    {
        var data = $(this).attr('data-value');
        $(this).prev().find("span").html(data+"%");
    });
piechart.resize();
piechart2.resize();
piechart3.resize();
});

//动态展现柱状图、按车型、检测方法、检测线、报警统计
function loadYzydInfo(sstime){
	//合格率柱状图信息
	getCharDatas(sstime);
//	//按车型统计
	getDatasByCLlx(sstime);
//	//按检测方法统计合格率
	getDatasByJCFF(sstime);
//	//按检测线统计合格率
	getDatasByJCX(sstime);
//	//报警信息查询
	getAlertDatas(sstime);
}

//自动执行
function autoRuns(){
	$(".next").click();
}

//检测概况数据组织
function getStationInfo(){
	//获取检测车辆总数
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"countJccls",params:"String#"+stationPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					var obj = data.rows[0];
					$("#carsnums").html(obj.nums);
				}
			}
		}
	});
	//获取检测线总数
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"countJcxs",params:"String#"+stationPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					var obj = data.rows[0];
					$("#jcxnums").html(obj.nums);
				}
			}
		}
	});
	//合格率统计
	var hglhtml="";//合格率信息
	var sjnums="",sjhgl="0";//首检合格数
	var fj1nums="",fj1hgl="0";//复检1次合格数
	var fj2nums="",fj2hgl="0";//复检2次合格数
	var fj3nums="",fj3hgl="0";//复检3次合格数
	var fj4nums="",fj4hgl="0";//复检4次合格数
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"hgltj",params:"String#"+stationPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					for(var i=0;i<data.rows.length;i++){
						var obj = data.rows[i];
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
							fj5hgl=obj.hgl;
						}
					}
				}
			}
		}
	});
	hglhtml+="<li><span>首检合格率</span><span><div class='progress_bar'><div class='pro-bar' style=''>" +
	"<small class='progress_bar_title'><span class='progress_number'>"+sjhgl+"%</span></small>" +
	"<span class='progress-bar-inner' style='width: "+sjhgl+"%;' data-value='"+sjhgl+"' data-percentage-value='"+sjhgl+"'></span>" +
	"</div></div></span></li>";
	hglhtml+="<li><span>1次复检合格率</span><span><div class='progress_bar'><div class='pro-bar' style=''>" +
	"<small class='progress_bar_title'><span class='progress_number'>"+fj1hgl+"%</span></small>" +
	"<span class='progress-bar-inner' style='width: "+fj1hgl+"%;' data-value='"+fj1hgl+"' data-percentage-value='"+fj1hgl+"'></span>" +
	"</div></div></span></li>";
	hglhtml+="<li><span>2次复检合格率</span><span><div class='progress_bar'><div class='pro-bar' style=''>" +
	"<small class='progress_bar_title'><span class='progress_number'>"+fj2hgl+"%</span></small>" +
	"<span class='progress-bar-inner' style='width: "+fj2hgl+"%;' data-value='"+fj2hgl+"' data-percentage-value='"+fj2hgl+"'></span>" +
	"</div></div></span></li>";
	hglhtml+="<li><span>3次复检合格率</span><span><div class='progress_bar'><div class='pro-bar' style=''>" +
	"<small class='progress_bar_title'><span class='progress_number'>"+fj3hgl+"%</span></small>" +
	"<span class='progress-bar-inner' style='width: "+fj3hgl+"%;' data-value='"+fj3hgl+"' data-percentage-value='"+fj3hgl+"'></span>" +
	"</div></div></span></li>";
	hglhtml+="<li><span>3次以上合格率</span><span><div class='progress_bar'><div class='pro-bar' style=''>" +
	"<small class='progress_bar_title'><span class='progress_number'>"+fj4hgl+"%</span></small>" +
	"<span class='progress-bar-inner' style='width: "+fj4hgl+"%;' data-value='"+fj4hgl+"' data-percentage-value='"+fj4hgl+"'></span>" +
	"</div></div></span></li>";
//	alert(hglhtml)
	$("#yieldTable").append(hglhtml);
}

//获取检测站基本信息
function getStationBaseInfo(){
	var shtml="";
	shtml+="<tr><td width='45%'>检测机构名称</td><td width='54%'></td></tr>";
	shtml+="<tr><td width='45%'>检测机构简称</td><td width='54%'></td></tr>";
	shtml+="<tr><td>所属行政区划</td><td></td></tr>";
	shtml+="<tr><td>检测站状态</td><td class='note'></td></tr>";
	shtml+="<tr><td>注册日期</td><td></td></tr>";
	shtml+="<tr><td>检测机构地址</td><td></td></tr>";
	shtml+="<tr><td>法人</td><td></td></tr>";
	shtml+="<tr><td>法人电话</td><td></td></tr>";
	shtml+="<tr><td>站长</td><td></td></tr>";
	shtml+="<tr><td>站长电话</td><td></td></tr>";
	shtml+="<tr><td>环保负责人</td><td></td></tr>";
	shtml+="<tr><td>环保负责人电话</td><td></td></tr>";
	shtml+="<tr><td><span class='ellpsis'>计量认证有效期</span></td><td></td></tr>";
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"queryStations",params:"String#"+stationPkid},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					var obj = data.rows[0];
					shtml="";
					shtml+="<tr><td width='45%'>检测机构名称</td><td width='54%'>"+obj.jczmc+"</td></tr>";
					shtml+="<tr><td width='45%'>检测机构简称</td><td width='54%'>"+obj.jczjc+"</td></tr>";
					shtml+="<tr><td>所属行政区划</td><td>"+obj.xzqh+"</td></tr>";
					shtml+="<tr><td>检测站状态</td><td>"+initStateStyle(obj.zt)+"</td></tr>";
					shtml+="<tr><td>注册日期</td><td>"+obj.zcrq+"</td></tr>";
					shtml+="<tr><td>检测机构地址</td><td>"+obj.jczdz+"</td></tr>";
					shtml+="<tr><td>法人</td><td>"+obj.qyfr+"</td></tr>";
					shtml+="<tr><td>法人电话</td><td>"+obj.frlxdh+"</td></tr>";
					shtml+="<tr><td>站长</td><td>"+obj.zz+"</td></tr>";
					shtml+="<tr><td>站长电话</td><td>"+obj.zzyddh+"</td></tr>";
					shtml+="<tr><td>环保负责人</td><td>"+obj.hbjcfzr+"</td></tr>";
					shtml+="<tr><td>环保负责人电话</td><td>"+obj.fzryddh+"</td></tr>";
					shtml+="<tr><td><span class='ellpsis'>计量认证有效期</span></td><td>"+obj.jlrzzsyxqz+"</td></tr>";
				}
			}
		}
	});
	$("#textMessageTable").append(shtml);
}

//监测站状态
function initStateStyle(state){
var htmlState = "";
if(state == '正常' || state == '1'){
	htmlState = "<span class='jcz' style='color: #5FC184;'>正常</span>";
}else if(state == '警告' || state == '2'){
	htmlState = "<span class='jcz' style='color: #E45F45;'>警告</span>";
}else if(state == '锁定' || state == '3'){
	htmlState = "<span class='jcz' style='color: #EB8234;'>锁定</span>";
}else if(state == '注销' || state == '4'){
	htmlState = "<span class='jcz' style='color:  #CBC6C6;'>注销</span>";
}else if(state == '已删除' || state == '5'){
	htmlState = "<span class='jcz' style='color: red;'>已删除</span>";
}else{
	htmlState = state;
}
return htmlState;
}

//获取检测合格率柱状图信息
function getCharDatas(stime){
	//获取检测车辆总数
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getCharDatas",params:"String#"+stationPkid+";;"+stime},
			async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					if(data.rows.length > 0){
						var ii=data.rows.length-1;
						totalnum.length=0;
						hgl.length=0;
						charObj=data.rows[ii];
						var sjnum=charObj.sjnum;
						var sjok=charObj.sjok;
						var ofjnum=charObj.ofjnum;
						var ofjok=charObj.ofjok;
						var tfjnum=charObj.tfjnum;
						var tfjok=charObj.tfjok;
						var sfjnum=charObj.sfjnum;
						var sfjok=charObj.sfjok;
						var ffjnum=charObj.ffjnum;
						var ffjok=charObj.ffjok;
						totalnum.push(sjnum);
						totalnum.push(ofjnum);
						totalnum.push(tfjnum);
						totalnum.push(sfjok);
						totalnum.push(ffjnum);
						if(sjnum==0){
							sjnum=1;
						}
						if(ofjnum==0){
							ofjnum=1;
						}
						if(tfjnum==0){
							tfjnum=1;
						}
						if(sfjnum==0){
							sfjnum=1;
						}
						if(ffjnum==0){
							ffjnum=1;
						}
						var hgl0=sjok*100/sjnum;
						var hgl1=ofjok*100/ofjnum;
						var hgl2=tfjok*100/tfjnum;
						var hgl3=sfjok*100/sfjnum;
						var hgl4=ffjok*100/ffjnum;
						hgl.push(hgl0.toFixed(2));
						hgl.push(hgl1.toFixed(2));
						hgl.push(hgl2.toFixed(2));
						hgl.push(hgl3.toFixed(2));
						hgl.push(hgl4.toFixed(2));
						option = {
								color: ['#019aba', '#7a201f', '#11565d'],
								tooltip: {
						            show: true,
						            trigger: 'axis',
						            axisPointer: {
						                type: 'cross',
						                label: {
							                backgroundColor: '#6a7985'
							            },
						                crossStyle: {
						                    color: '#ddd',
						                },
						            },
						        },
								grid: {
						            top: '24%',
						            left: '3%',
						            right: '3%',
						            bottom: '2%',
						            containLabel: true,
						        },
								xAxis: [
									{
										show: true,
										type: 'category',
										data: ['首检','一次复检','2次复检','3次复检','3次以上'],
										axisLine:{
							                lineStyle: {
							                    color: '#dbd6d8',
							                    fontSize: 12,
							                    width: 1
							                }
							            },
							            axisLabel: {
							                textStyle: {
							                    color: '#4c4c4c',
							                    align: 'center'

							                },
							            },
							            axisTick: {
							            	show:false,
							                alignWithLabel: true,
							                lineStyle: {
							                    color: '#ddd',

							                },
							            }
									}
									],
									yAxis: [
										{
											type: 'value',
											name: '单位:辆',
											axisLine:{
							                    lineStyle: {
							                        color: '#dbd6d8',
							                        fontSize: 12,
							                        width: 1
							                    }
							                },
							                nameTextStyle: {
							                    color: '#999',
							                },
											axisLabel: {
												textStyle: {
							                        color: '#999',
							                    },
												formatter: '{value} '
											},
							                axisTick: {
							                	show:false,
							                    alignWithLabel: true,
							                    lineStyle: {
							                        color: '#ddd',
							                    },
							                },
							                splitLine: {
							                    show: false,
							                }
										},
										{
											type: 'value',
											name: '合格率',
							                nameTextStyle: {
							                    color: '#999',
							                },
											axisLine:{
							                    lineStyle: {
							                        color: '#dbd6d8',
							                        fontSize: 12,
							                        width: 1
							                    }
							                },
											axisLabel: {
							                    textStyle: {
							                        color: '#999',
							                    },
							                    formatter: '{value} %'
							                },
							                axisTick: {
							                	show: false,
							                    alignWithLabel: true,
							                    lineStyle: {
							                        color: '#ddd',

							                    },
							                },
							                splitLine: {
							                    show: false,
							                }
										}
										],
										series: [
											{
												name:'合格率',
												type:'line',
												yAxisIndex: 1, 
												symbol:'circle', //拐点类型 
								                symbolSize:8,
												itemStyle: {
													normal: {
														color:'#e94b78',  
								                        borderColor:'#fff', 
								                        borderWidth: 1
													}
												},
												areaStyle: {
								                    normal: {
								                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								                            offset: 0,
								                            color: 'rgba(247, 165, 188, 0.8)'
								                        }, {
								                            offset: 1,
								                            color: 'rgba(253, 249, 250, 0.5)'
								                        }], false),
								                        shadowColor: 'rgba(236, 101, 139, 0.1)',
								                        shadowBlur: 5
								                    }
								                },
												data:hgl,
								                label: {
								                    emphasis: {
								                        textStyle: {
								                            color: '#fff',
								                        },
								                    },
								                },
								                lineStyle: {
								                    normal: {
								                        color: '#e94b78',
								                        width: 1,
								                    },
								                }
											},
											{
												type: 'bar',
								                name: '监测数量',
								                stack: '总数',
												barWidth: 25,
												itemStyle: {
													normal: {
														normal: {color:'#48a9e5'}
//														barBorderRadius: 35,
//														color: new echarts.graphic.LinearGradient(
//																0, 0, 0, 1,
//																[
//																	{offset: 0, color: '#4EF0FE'},
//																	{offset: 1, color: '#1A6A7D'}
//																	]
//														)
													},
									                label: {
									                    emphasis: {
									                        textStyle: {
									                            color: '#fff',
									                        },
									                    },
									                }
												},
												data:totalnum
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
function getCharTimes(){
	//获取检测车辆总数
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getcharTimes",params:"String#"+stationPkid},
			async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					if(data.rows.length > 0){
						charTimes=data.rows;
					}
				}
			}
	});
}
//按照车型统计
function getDatasByCLlx(stime){
	$("#mainMessageTable").html("");
	var stry="";
	var numt=8;
	var totalsc=0;
	var chtml="<tr>";
	chtml+="<th>车辆类型</th><th>首检</th><th width='20%'>合格率</th>";
	chtml+="<th>1次复检</th><th width='20%'>合格率</th><th>2次以上</th>";
	chtml+="<th width='20%'>合格率</th></tr>";
	chtml+="";
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
						chtml+="<td>"+sjnum+"</td>";
						chtml+="<td  class='firstmonitor'><div class='progress_bar'><div class='pro-bar'><small class='progress_bar_title'><span class='progress_number'>"+hgl0.toFixed(2)+"%</span></small><span class='progress-bar-inner' style='width: "+hgl0.toFixed(2)+"%;' data-value='"+hgl0.toFixed(2)+"' data-percentage-value='"+hgl0.toFixed(2)+"'></span></div></div></td>";
						chtml+="<td>"+ofjnum+"</td>";
						chtml+="<td  class='twomonitor'><div class='progress_bar'><div class='pro-bar'><small class='progress_bar_title'><span class='progress_number'>"+hgl1.toFixed(2)+"%</span></small><span class='progress-bar-inner' style='width: "+hgl1.toFixed(2)+"%;' data-value='"+hgl1.toFixed(2)+"' data-percentage-value='"+hgl1.toFixed(2)+"'></span></div></div></td>";
						chtml+="<td><span class='fstNub'>"+tfjnum+"</span></td>";
						chtml+="<td  class='lastmonitor'><div class='progress_bar'><div class='pro-bar'><small class='progress_bar_title'><span class='progress_number'>"+hgl2.toFixed(2)+"%</span></small><span class='progress-bar-inner' style='width: "+hgl2.toFixed(2)+"%;' data-value='"+hgl2.toFixed(2)+"' data-percentage-value='"+hgl2.toFixed(2)+"'></span></div></div></td>";
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
	for(var j=totalsc; j <6; j++){
		chtml += "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	$("#mainMessageTable").append(chtml);
}

//按检测方法统计合格率
function getDatasByJCFF(stime){
	var showTime=stime.substr(7,10);
	if(stime.substr(7,1)=="$")
		showTime="";
	$("#jcffDiv").html(showTime+"按检测方法合格率情况");
	var vjcff=new Array();
	var seriesT=new Array();
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getDatasByJCFF",params:"String#"+stationPkid+";;"+stime},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					for(var i=0;i<data.rows.length;i++){
						var vobj=data.rows[i];
						vjcff.push("'"+vobj.jcff+"'");
						var sjnum=vobj.sjnum;
						var sjok=vobj.sjok;
						var ofjnum=vobj.ofjnum;
						var ofjok=vobj.ofjok;
						var tfjnum=vobj.tfjnum;
						var tfjok=vobj.tfjok;
						var sfjnum=vobj.sfjnum;
						var sfjok=vobj.sfjok;
						var ffjnum=vobj.ffjnum;
						var ffjok=vobj.ffjok;
						var totalnum=new Array();
						totalnum.push(sjok);
						totalnum.push(ofjok);
						totalnum.push(tfjok);
						totalnum.push(sfjok);
						totalnum.push(ffjok);
						var co="'#39a571'";
						
						var ff=vobj.jcff;
						if(ff.indexOf("双怠速")!=-1)
							co="'#39a571'";
						if(ff.indexOf("简易瞬态")!=-1)
							co="'#7367f2'";
						if(ff.indexOf("不透光")!=-1)
							co="'#48a9e5'";
						if(ff.indexOf("加载减速")!=-1)
							co="'#f3537f'";
//						alert(co)
						seriesT[i]={name:"'"+vobj.jcff+"'",type: 'line', symbol:'circle',symbolSize:8,itemStyle:{normal:{borderColor:'#fff',borderWidth:1}},data:totalnum};
						
					}
				}
			}
		}
	});
	option = {
			color: ['#39a571', '#7367f2', '#48a7e2','#f3537f','#f49228'],
	    tooltip: {
	        trigger: 'axis',
	        formatter: '{b} : {c}%' 
	    },
	    legend: {
	        data:vjcff,
	        icon:'circle',
	    	itemWidth: 10,
	        itemHeight: 10,
	        itemGap: 10
	    },
	    grid: {
	    	top:'37%',
	        left: '3%',
	        right: '6%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首次','一次复检','二次复检','三次复检','三次以上'],
				axisLine:{
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
            name: '合格率',
            nameLocation:'end',
            nameTextStyle: {
                color: '#999'
            },
	        axisLine:{
                lineStyle: {
                    color: '#e7e7e7',
                    fontSize: 12,
                    width: 1
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#777',
                },
                 formatter: '{value} %'
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
	piechart.setOption(option);
}
//按检测线统计合格率
function getDatasByJCX(stime){
	var showTime=stime.substr(7,10);
	if(stime.substr(7,1)=="$")
		showTime="";
	$("#jcxDiv").html(showTime+"按检测线合格率情况");
	var vjcx=new Array();
	var seriesT=new Array();
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getDatasByJCX",params:"String#"+stationPkid+";;"+stime},
			async:false,type:"post",
		success:function(data){	
			if(null != data.rows && "" != data.rows){
				if(data.rows.length > 0){
					for(var i=0;i<data.rows.length;i++){
						var vobj=data.rows[i];
						vjcx.push("'"+vobj.jcxmc+"'");
						var sjnum=vobj.sjnum;
						var sjok=vobj.sjok;
						var ofjnum=vobj.ofjnum;
						var ofjok=vobj.ofjok;
						var tfjnum=vobj.tfjnum;
						var tfjok=vobj.tfjok;
						var sfjnum=vobj.sfjnum;
						var sfjok=vobj.sfjok;
						var ffjnum=vobj.ffjnum;
						var ffjok=vobj.ffjok;
						var totalnum=new Array();
						totalnum.push(sjok);
						totalnum.push(ofjok);
						totalnum.push(tfjok);
						totalnum.push(sfjok);
						totalnum.push(ffjok);
						seriesT[i]={ name:"'"+vobj.jcxmc+"'",type: 'line',symbol:'none',smooth: true,stack: '总量',  areaStyle: {normal: {}},data:totalnum};
						
					}
				}
			}
		}
	});
	option = {
			color: ['#f8e4af', '#2bbdf1', '#7df7f6'],
	    tooltip: {
	        trigger: 'axis',
	        formatter: '{b} : {c}%' ,
	        axisPointer: {
	            type: 'cross',
	            label: {
	                backgroundColor: '#6a7985'
	            }
	        }
	    },
	    legend: {
	    	icon:'rect',
	    	itemWidth:18,
	    	itemheight:10,
	        data:vjcx,
//	        textStyle: {
//	        	color: '#f1f1f1',
//	        	fontSize: 12,
//	        }
	    },
	    grid: {
	    	top:'20%',
	        left: '3%',
	        right: '6%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首次','一次复检','二次复检','三次复检','三次以上'],
				axisLine:{
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
	        axisLine:{
                lineStyle: {
                    color: '#e7e7e7',
                    fontSize: 12,
                    width: 1
                }
            },
            nameTextStyle: {
                color: '#777',
            },
            axisLabel: {
                textStyle: {
                    color: '#777',
                },
                formatter: '{value} %'
            },
            axisTick: {
            	show:false,
                alignWithLabel: true,
                lineStyle: {
                    color: '#ddd',
                },
            },
            splitLine: {
                show: true,
            }
	    },
	    series: seriesT
	};
	piechart2.setOption(option);
}

//报警信息查询
function getAlertDatas(stime){
	var showTime=stime.substr(7,10);
	if(stime.substr(7,1)=="$")
		showTime="";
	$("#bjDiv").html(showTime+"报警信息");
	$("#alarmMessageTable").html("");
	var bjnums=0;
	var shtml="<tr><td width='25%'>报警类型</td><td width='65%'>报警内容</td><td width='20%'>数量</td></tr>";
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