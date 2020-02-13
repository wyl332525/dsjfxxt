var checkTime = "";//查询时间 yyyy-mm-dd
var monthTime = "";//查询时间yyyy-mm
var dayNumber = "0";//日检测数据量
var monthNumber = "0";//月检测数据量
var charTimes;
var numT = 0;
var dataT;

var dataBeast=new Array();//检测合格车辆数量：千辆
var dataBeauty=new Array();//检测不合格车辆数量：千辆
var dataTotal=new Array();//检测合格率
var xAxisData=new Array();//检测线

var ref="";//定时执行变量
var isrun=0;


var piechart;//按检测方法合格率
var piechart2;//检测数据量
var piechart3;//按检测线合格率
var a1="";
var b1="";
var a2="";
var b2="";
var a3="";
var b3="";
var a4="";
var b4="";
var a5="";
var b5="";
var a6="";
var b6="";
var a7="";
var b7="";
var dataStyle;

$(function() {
	//按检测方法合格率
	piechart = echarts.init(($('#chart1')[0]));
	//检测数据量
	piechart2 = echarts.init(($('#chart4')[0]));
	//按检测线合格率
	piechart3 = echarts.init(($('#chart2')[0]));
	
	getCharTimes();//时间条
	loadInfo();
	
	var ss="<div id='line1'></div><div id='butleft'></div><div id='butright'></div><div id='ztbut'>";
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
	$("#timeline").html(ss);
	
	$('html').fontFlex(12, 20, 114);
	$("#textMessageTable tr:even").addClass("style1");  //奇数行的样式
	$("#yieldTable tr:even").addClass("style1");  //奇数行的样式
	$("#mainMessageTable tr:even").addClass("style1");  //奇数行的样式
	$("#alarmMessageTable tr:even").addClass("style1");  //奇数行的样式
	var oMyBar1 = new MyScrollBar({
			selId: 'tableroll',
			bgColor: 'rgba(50, 50, 50, 0.2)',
			barColor: '#173E72',
			enterColor: '#173E72',
			enterShow: false,
			borderRadius: 2,
			width: 4
	});
	$("#tableroll>div").addClass("barstyle");  

	// 时间轴
    $(".timeP").click(function () {
    	checkTime=$(this).text();
    	monthTime = checkTime.substr(0,7);
    	loadInfo();
        $(this).addClass("timePk");
        $(this).siblings().removeClass("timePk");
    })
    var i = -1;
    var length = $(".timeP").length;
    $("#butright").click(function () {
        i++;
        i = i >= length ? 0 : i;
        $(".timeP").eq(i).addClass("timePk");
        $(".timeP").eq(i).siblings().removeClass("timePk");
        checkTime=$(".timeP").eq(i).text();
        monthTime = checkTime.substr(0,7);
        loadInfo();
    })
    $("#butleft").click(function () {
        i--;
        i = i <= 0 ? 0 : i;
        $(".timeP").eq(i).addClass("timePk");
        $(".timeP").eq(i).siblings().removeClass("timePk");
        checkTime=$(".timeP").eq(i).text();
        monthTime = checkTime.substr(0,7);
        loadInfo();
    })
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
	if(charTimes!=null&&charTimes.length>0){
		//3. 设置定时刷新
		ref = setInterval(function(){autoRuns();},5000);
		$("#ztbut").show();
		$("#bfbut").hide();
	}else{
		$("#ztbut").hide();
		$("#bfbut").hide();
	}
	
	window.addEventListener("resize", function () {//窗口改变时的事件监听
		//var chart1length=$('#chart1').height();
		var chart1length = 120;
		a1=chart1length*0.39;
		b1=chart1length*0.34;
		a2=chart1length*0.33;
		b2=chart1length*0.27;
		a3=chart1length*0.26;
		b3=chart1length*0.21;
		a4=chart1length*0.20;
		b4=chart1length*0.15;
		a5=chart1length*0.14;
		b5=chart1length*0.09;
		a6=chart1length*0.08;
		b6=chart1length*0.03;
		a7=chart1length*0.02;
		b7=chart1length*0.01;
		if(piechart!=null)
	        piechart.resize();
		if(piechart2!=null)
	        piechart2.resize();
		if(piechart3!=null)
	        piechart3.resize();
	});
	piechart.resize();
	piechart2.resize();
	piechart3.resize();
});

//按检测方法合格率
function initChart(){
	piechart = echarts.init(($('#chart1')[0]));
	dataStyle = { 
		    normal: {
		        label: {show:true},
		        labelLine: {show:true},
		    }
		};
		//var chart1length=$('#chart1').height();
		var chart1length = 120;
		a1=chart1length*0.39;
		b1=chart1length*0.34;
		a2=chart1length*0.33;
		b2=chart1length*0.27;
		a3=chart1length*0.26;
		b3=chart1length*0.21;
		a4=chart1length*0.20;
		b4=chart1length*0.15;
		a5=chart1length*0.14;
		b5=chart1length*0.09;
		a6=chart1length*0.08;
		b6=chart1length*0.03;
		a7=chart1length*0.02;
		b7=chart1length*0.01;
		chart1length=$('#chart1').height();
		var placeHolderStyle = {
		    normal : {
		        color: 'rgba(0,0,0,0)',
		        label: {show:true},
		        labelLine: {show:false}
		    },
		    emphasis : {
		        color: 'rgba(0,0,0,0)'
		    }
		};
		var colorT;
		var seriesT;
		if(numT <= 0){
			colorT= [];
			seriesT = [];
		}else if(numT == 1){
			colorT= ['#3474F6', '#00E6EE'];
			
			seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}else if(numT == 2){
				    colorT= ['#3474F6', '#00E6EE','#03F47A'];
				    
				    seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 3',
				            type:'pie',
				            clockWise:false,
				            radius : [b3, a3],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[1].hgs, 
				                    name:dataT.rows[1].jcff
				                },
				                {
				                    value:dataT.rows[1].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}else if(numT == 3){
				    colorT= ['#3474F6', '#00E6EE','#03F47A', '#9EF90F'];
				    
				    seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 3',
				            type:'pie',
				            clockWise:false,
				            radius : [b3, a3],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[1].hgs, 
				                    name:dataT.rows[1].jcff
				                },
				                {
				                    value:dataT.rows[1].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 4',
				            type:'pie',
				            clockWise:false,
				            radius : [b4, a4],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[2].hgs, 
				                    name:dataT.rows[2].jcff
				                },
				                {
				                    value:dataT.rows[2].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}else if(numT == 4){
				    colorT = ['#3474F6', '#00E6EE','#03F47A', '#9EF90F','#FDDD04'];
				    
				    seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 3',
				            type:'pie',
				            clockWise:false,
				            radius : [b3, a3],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[1].hgs, 
				                    name:dataT.rows[1].jcff
				                },
				                {
				                    value:dataT.rows[1].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 4',
				            type:'pie',
				            clockWise:false,
				            radius : [b4, a4],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[2].hgs, 
				                    name:dataT.rows[2].jcff
				                },
				                {
				                    value:dataT.rows[2].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 5',
				            type:'pie',
				            clockWise:false,
				            radius : [b5, a5],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[3].hgs, 
				                    name:dataT.rows[3].jcff
				                },
				                {
				                    value:dataT.rows[3].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}else if(numT == 5){
				    colorT= ['#3474F6', '#00E6EE','#03F47A', '#9EF90F','#FDDD04','#ff8000'];
				   
				    seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 3',
				            type:'pie',
				            clockWise:false,
				            radius : [b3, a3],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[1].hgs, 
				                    name:dataT.rows[1].jcff
				                },
				                {
				                    value:dataT.rows[1].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 4',
				            type:'pie',
				            clockWise:false,
				            radius : [b4, a4],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[2].hgs, 
				                    name:dataT.rows[2].jcff
				                },
				                {
				                    value:dataT.rows[2].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 5',
				            type:'pie',
				            clockWise:false,
				            radius : [b5, a5],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[3].hgs, 
				                    name:dataT.rows[3].jcff
				                },
				                {
				                    value:dataT.rows[3].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 6',
				            type:'pie',
				            clockWise:false,
				            radius : [b6, a6],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[4].hgs, 
				                    name:dataT.rows[4].jcff
				                },
				                {
				                    value:dataT.rows[4].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}else{
				    colorT= ['#3474F6', '#00E6EE','#03F47A', '#9EF90F','#FDDD04','#ff8000','#ff80ff'];
				    
				    seriesT = [
				        {
				            name:'Line 1',
				            type:'pie',
				            clockWise:false,
				            radius : [b1,a1],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				       
				            data:[
				                {
				                    value:dataT.rows[0].zhgs,
				                    name:'总合格率'
				                },
				                {
				                    value:dataT.rows[0].zjs,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				         
				            ]
				        }, 
				         {
				            name:'Line 2',
				            type:'pie',
				            clockWise:false,
				            radius : [b2, a2],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[0].hgs, 
				                    name:dataT.rows[0].jcff
				                },
				                {
				                    value:dataT.rows[0].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 3',
				            type:'pie',
				            clockWise:false,
				            radius : [b3, a3],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[1].hgs, 
				                    name:dataT.rows[1].jcff
				                },
				                {
				                    value:dataT.rows[1].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 4',
				            type:'pie',
				            clockWise:false,
				            radius : [b4, a4],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[2].hgs, 
				                    name:dataT.rows[2].jcff
				                },
				                {
				                    value:dataT.rows[2].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 5',
				            type:'pie',
				            clockWise:false,
				            radius : [b5, a5],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[3].hgs, 
				                    name:dataT.rows[3].jcff
				                },
				                {
				                    value:dataT.rows[3].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 6',
				            type:'pie',
				            clockWise:false,
				            radius : [b6, a6],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[4].hgs, 
				                    name:dataT.rows[4].jcff
				                },
				                {
				                    value:dataT.rows[4].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }, 
				         {
				            name:'Line 7',
				            type:'pie',
				            clockWise:false,
				            radius : [b7, a7],
				            itemStyle : dataStyle,
				            hoverAnimation: false,
				           
				            data:[
				                {
				                    value:dataT.rows[5].hgs, 
				                    name:dataT.rows[5].jcff
				                },
				                {
				                    value:dataT.rows[5].js,
				                    name:'invisible',
				                    itemStyle : placeHolderStyle
				                }
				            ]
				        }
				
				    ];
		}
		option = {
			    color: colorT,
			    tooltip : {
			        show: true,
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			
			    toolbox: {
			        show : true,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series :seriesT
			};
		piechart.setOption(option);
}

//检测数据量
function initChart4(){
	var data = [{
	    "q": [{
	        "x": "T",
	        "id": "1",
	        "z": monthNumber,
	    
	        "color": [
	            [0.166, '#91c7ae'],
	            [0.5, '#63869e'],
	            [0.635, '#EFC631'],
	            [1, '#c23531']
	        ],
	        "scale": [0, 200000]
	
	    }]
	}, {
	    "q": [{
	        "x": "T2",
	        "id": "1",
	        "z": dayNumber,
	        "color": [
	            [0.166, '#91c7ae'],
	            [0.5, '#63869e'],
	            [0.635, '#EFC631'],
	            [1, '#c23531']
	        ],
	        "scale": [0, 3000]
	    }]
	}];
		
	obj = createGaugeOption(data, "q", ["x"], "z", ["r", "time"], "color", "scale");
		
	option = {
		textStyle: {
	            fontSize: 12,
	        },
	
	    legend: obj.legend,
	    series: obj.series
	};
	
	function createGaugeOption(datas, colName, legColName, dataColName, categoryColName, colorData, scaleData) {
	  
	    var obj = {};
	    var series = new Array();
	    var legs = new Array();
	    var rows = new Array();
	    var cols = new Array();
	    for (var n = 0; n < datas.length; n++) {
	        var data = datas[n];
	        var d = eval("data." + colName);
	        for (var i = 0; i < d.length; i++) {
	            var rowname = ArrToStr(d[i], categoryColName[0]);
	            var colname = ArrToStr(d[i], categoryColName[1]);
	            if ($.inArray(rowname, rows) < 0) {
	                rows.push(rowname);
	            }
	            if ($.inArray(colname, cols) < 0) {
	                cols.push(colname);
	            }
	        }
	    }
	    rows = rows.sort(fncSort);
	    cols = cols.sort(fncSort);
	    for (var n = 0; n < datas.length; n++) {
	        var data = datas[n];
	        var d = eval("data." + colName);
	        if (d.length > 0) {
	            var lstr = "";
	            lstr = ArrToStr(d[0], legColName);
	            legs.push({
	                name: lstr,
	                textStyle: {
	                    //color: d[0].color
	                    color:'FDD853'
	                }
	            });
	        }
	
	        var colors = d[0].color;
	        var size = 0;
	        for (var i = 0; i < d.length; i++) {
	            var rowname = ArrToStr(d[i], categoryColName[0]);
	            var colname = ArrToStr(d[i], categoryColName[1]);
	            var x = ($.inArray(colname, cols) + 1 / (n + 1)) / (cols.length + 1);
	            var y = ($.inArray(rowname, rows) + 1 / (n + 1)) / (rows.length + 1);
	
	
	            // 内外盘间隔 盘面大小
	            size = 1 / rows.length - 0.05 - 0.45 * n;
	            var offset = [];
	
	            offset = [i, titleOffset(0.15 * (i + 1), y, size) + '%'];
	            var o = {
	                name: lstr,
	                type: 'gauge',
	                z: 100 - n,
	                min: d[0].scale[0],
	                max: d[0].scale[1],
	                splitNumber: 5,
	                //上边距
	                center: [50 + '%', 90 + '%'],
	                startAngle: 180,
	                endAngle: 0,
	                radius: size * 180 + '%',
	                axisLabel: {     
	                color: '#FD9A5B',
	            	},
	                axisLine: {
	                    show: true,
	                    lineStyle: {
	                        color: [
	                        [
	                            0.33, new echarts.graphic.LinearGradient(
	                            0, 0, 1, 0,
	                            [
	                                {offset: 0, color: '#4EFBB0'},
	                                {offset: 1, color: '#1DA8FD'}
	                            ]
	                        )
	                        ],
	                        [
	                            0.66, new echarts.graphic.LinearGradient(
	                            0, 0, 1, 0,
	                            [
	                                {offset: 0, color: '#1DA8FD'},
	                                {offset: 1, color: '#FDD13D'}
	                            ]
	                        )
	                        ],
	                        [
	                            1, new echarts.graphic.LinearGradient(
	                            0, 0, 1, 0,
	                            [
	                                {offset: 0, color: '#FDD13D'},
	                                {offset: 1, color: '#FD4D46'}
	                            ]
	                        )
	                        ]],
	                        width: 10
	                    }
	                },
	
		            axisTick: {            // 坐标轴小标记
		                length :15,        // 属性length控制线长
		                lineStyle: {       // 属性lineStyle控制线条样式
		                    color: 'auto',
		                    shadowColor : '#fff', //默认透明
		                    shadowBlur: 10
		                }
		            },
	                splitLine: { // 分隔线
	                    length: 15, // 属性length控制线长
	                    lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
	                        color: 'auto'
	                    }
	                },
	                pointer: {
	                    width: 4
	                },
	                title : {
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder',
	                    fontSize: 12,
	                    fontStyle: 'italic',
	                    color: '#fff',
	                    shadowColor : '#fff', //默认透明
	                    shadowBlur: 10
	                }
	            	},
	                detail: {
				            show: false,
				        },
	                data: [{
	                    value: eval("d[i]." + dataColName),
	                    name: colname
	
	                }]
	            }
	            series.push(o);
	        }
	    }
	
	    obj.series = series;
	    obj.legend = {
	        selectedMode: false,
	        data: colors
	    };
	    return obj;
	}
	
	function ReservedDecimal(data, digit) {
	    var num = data + "";
	    if (num.indexOf(".") < 0) {
	        return num;
	    }
	    return num.substring(0, num.indexOf(".") + digit + 1);
	}
	
	function ArrToStr(data, arr) {
	    return eval("data." + arr);
	}
	
	function fncSort(a, b) {
	    var x = parseInt(a);
	    var y = parseInt(b);
	    if (x != y) {
	        return x - y;
	    } else {
	        return a - b;
	    }
	}
	
	function isArray(obj) {
	    return Object.prototype.toString.call(obj) === '[object Array]';
	}

	function titleOffset(final, center, size) {
	    return ((final - center * 2) / size) * 80
	}
	piechart2.setOption(option);
}

//按检测线合格率
function initChart2(){
	option = {
		    color:['#019aba','#7a201f','#11565d'],
		    legend:{
		    	right:'30%',
		        textStyle: {
		            color: '#666',
		            fontSize: 12,
		        },
		        data:['合格','不合格'],
		    },
		    tooltip:{
		        show:true,
		        trigger: 'axis',
		        axisPointer: {
		            type:'cross',
		            crossStyle:{
		               color:'#ddd',
		           },
		
		        },
		    },
		    
		
		    grid:{
		    	top: '19%',
		        left: '8%',
		        right: '8%',
		        bottom: '2%',
		        containLabel:true,
		    },
		    xAxis: {
		      show:true,
		      axisLine:{
		            lineStyle:{
		                color:'#65F996',
		                fontSize: 12,
		                width:2
		      }
			  },
		      axisLabel:{
		         textStyle:{
		              color:'#f1f1f1',
		              align: 'center'
		         },
		      },
		      axisTick:{
		          alignWithLabel:true,
		          lineStyle:{
		              color:'#ddd',
		          },
		      },
		      data:xAxisData,
		    },
		    yAxis: [
		        {
		            type:'value',
		            name:'千辆',
		            axisLine:{
		            lineStyle:{
		                color:'#65F996',
		                fontSize: 12,
		                width:2
		            }
		       	 	},
		            nameTextStyle:{
		                color:'#ddd',
		            },
		            axisLabel:{
		             textStyle:{
		                  color:'#ddd',
		             },
		            },
		            axisTick:{
		              alignWithLabel:true,
		              lineStyle:{
		                  color:'#ddd',  
		              },
		            },
		            splitLine:{
		                show:false,
		            },
		        },
		        {
		            type:'value',
		            name:'合格率',
		            nameTextStyle:{
		                color:'#ddd',
		            },
		            axisLine:{
		            lineStyle:{
		                color:'#65F996',
		                fontSize: 12,
		                width:2
		            }
		        	},
		            axisLabel:{
		             textStyle:{
		                  color:'#ddd',
		             },
		            },
		            axisTick:{
		              alignWithLabel:true,
		              lineStyle:{
		                  color:'#ddd',
		              },
		            },
		            splitLine:{
		                show:false,
		            },
		        },
		    ],
		    series: [
		        {
		            type: 'bar',
		            name:'合格',
		            stack:'总数',
		            data:dataBeast,
		            barWidth: 25,
		            itemStyle: {
		            normal: {
		                color: new echarts.graphic.LinearGradient(
		                    0, 0, 0, 1,
		                    [
		                        {offset: 0, color: '#65F996'},
		                        {offset: 1, color: '#327E4F'}
		                    ]
		                )
		            }
		        },
		            label: {
		                emphasis: {
		                     textStyle:{
		                       color:'#fff',
		                    }, 
		                },
		            },
		        },
		        {
		            type: 'bar',
		            barWidth: 25,
		            itemStyle: {
		            normal: {
		                color: '#387A7A',
		            }
		        },
		            name:'不合格',
		            stack:'总数',
		            data:dataBeauty,
		            label: {
		                emphasis: {
		                   textStyle:{
		                       color:'#fff',
		                    }, 
		                },
		            },
		        },
		        {
		            type: 'line',
		            name:'合格率',
		            yAxisIndex:1,
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
		            data:dataTotal,
		            label: {
		                emphasis: {
		                    textStyle:{
		                       color:'#fff',
		                    },  
		                },
		            },
		            symbolSize:1,
		            lineStyle: {
		                    normal: {
		                    color: '#01B3D7',
		                    width: 1,
		                
		                    },
		                },
		        },
		    ]
		};
		piechart3.setOption(option);
}

//自动执行
function autoRuns(){
	$("#butright").click();
}

//初始化加载
function loadInfo(){
	getRealTimeCheckData();//获取实时检测数据
	getCheckNumber();//获取检测数据量
	initChart4();
	getCheckLineDynamic();//获取检测线信息动态
	jcffPercent();//按检测方法合格率
	initChart();
	jcxPercent();//按检测线合格率
	initChart2();
}

//获取最近五天检测时间
function getCharTimes(){
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"yzydgl",
			sql:"getcharTimes",params:"String#"+stationPkid},
			async:false,type:"post",
			success:function(data){	
				if(null != data.rows && "" != data.rows){
					if(data.rows.length > 0){
						checkTime = data.rows[0].rq;
						monthTime = checkTime.substr(0,7);
						charTimes=data.rows;
					}else{
						checkTime=getCurrentDate('yyyy-mm-dd');
						monthTime = getCurrentDate('yyyy-mm');
					}
				}
			}
	});
}

//获取实时检测数据
function getRealTimeCheckData(){
	$("#ssjcsjDiv").html("实时检测数据（"+checkTime+"）");
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getRealTimeCheckData",params:"String#"+stationPkid+";;String#"+checkTime},
			async:false,type:"post",
		success:function(data){	
			$("#realTimeTable").html("");
			if(data.total > 0){
				makeRealTimeCheckDataTable(data);
			}
		}
	});
}

//组装实时检测数据信息表格
function makeRealTimeCheckDataTable(data){
	
	var htmls = "<tr><td width='40%'>车牌号</td><td width='30%'>监测结果</td><td width='30%'>报警信息</td></tr>";
	var num = data.rows.length;
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
		if(obj.cphm != null && obj.cphm != '' && obj.cphm != 'null'){
			htmls += "<tr><td>";
			htmls += initCardStyle(obj.cpys,obj.cphm);
			htmls += "</td><td>";
			htmls += obj.jcjg;
			htmls += "</td><td>";
			htmls += obj.sl;
			htmls += "</td></tr>";
		}
	}
	//如何行数不够4行，则需要加到4行
	for(var j=num; j <4; j++){
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>";
	}
	
	$("#realTimeTable").append(htmls);
}

/**
 * 初始化车牌颜色样式
 * color 车牌颜色
 * card  车牌号码
 */
function initCardStyle(color,card){
	var htmlColor = "";
	if(color == '蓝'){
		htmlColor = "<div class='plateNub plateNub1'>"+card+"</div>";
	}else if(color == '黄'){
		htmlColor = "<div class='plateNub plateNub2'>"+card+"</div>";
	}else if(color == '绿'){
		htmlColor = "<div class='plateNub plateNub3'>"+card+"</div>";
	}else if(color == '黑'){
		htmlColor = "<div class='plateNub plateNub4'>"+card+"</div>";
	}else if(color == '白'){
		htmlColor = "<div class='plateNub plateNub5'>"+card+"</div>";
	}else{
		htmlColor = card;
	}
	return htmlColor;
}

//获取检测数据量
function getCheckNumber(){
	$("#jcsjlDiv").html("检测数据量（"+checkTime+"）");
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getCheckNumber",params:"String#"+stationPkid+";;String#"+monthTime+";;String#"+stationPkid+";;String#"+checkTime},
			async:false,type:"post",
		success:function(data){	
			$("#chart4Nub").html("");
			if(data.total == 0){
				monthNumber = 0;
				dayNumber = 0;
			}else if(data.total > 0){
				monthNumber = data.rows[0].ysl;
				dayNumber = data.rows[0].rsl;
			}
			var htmls = "<div class='chart4Nub1'>月检测数据：";
			htmls += monthNumber;
			htmls += "</div><div class='chart4Nub2'>日监测数据：";
			htmls += dayNumber;
			htmls += "</div>";
			$("#chart4Nub").append(htmls);
		}
	});
}

//获取检测线信息动态
function getCheckLineDynamic(){
	$("#jcxxxdtDiv").html("检测线信息动态（"+checkTime+"）");
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"getCheckLineDynamic",params:"String#"+stationPkid+";;String#"+checkTime},
			async:false,type:"post",
		success:function(data){	
			$("#gisMessageTable").html("");
			$("#dynamicTable").html("");
			if(data.total >= 0){
				makeCheckLineDynamicTable(data);
			}
		}
	});
}

//组装检测线信息动态表格
function makeCheckLineDynamicTable(data){
	
	var htmls = "";
	var num = data.rows.length;
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
		if(i==1){
			htmls += "<tr><td width='25%'>";
			htmls += obj.jcxmc;
			htmls += "</td><td width='25%'>";
			htmls += obj.hgs;
			htmls += "</td><td width='25%'>";
			htmls += obj.jczs;
			htmls += "</td><td width='25%'>";
			htmls += obj.hgl;
			htmls += "</td></tr>";
		}else{
			htmls += "<tr><td>";
			htmls += obj.jcxmc;
			htmls += "</td><td>";
			htmls += obj.hgs;
			htmls += "</td><td>";
			htmls += obj.jczs;
			htmls += "</td><td>";
			htmls += obj.hgl;
			htmls += "</td></tr>";
		}
	}

	var htmls1 = "<tr><td width='9%'>检测站名称</td><td width='10%'>检测线名称</td><td width='9%'>检测线类型</td>" +
			"<td width='9%'>检测线状态</td><td width='9%'>设备商</td><td width='9%'>在检车辆</td>" +
			"<td width='9%'>检测总数</td><td width='9%'>合格数</td><td width='9%'>合格率</td>" +
			"<td width='9%'>检定有效期（天）</td><td width='9%'>检测异常数量</td></tr>";
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
			htmls1 += "<tr><td>";
			htmls1 += obj.jczjc;
			htmls1 += "</td><td>";
			htmls1 += obj.jcxmc;
			htmls1 += "</td><td>";
			htmls1 += obj.jcxlx;
			htmls1 += "</td><td>";
			htmls1 += obj.jcxzt;
			htmls1 += "</td><td>";
			htmls1 += obj.sbpp;
			htmls1 += "</td><td>";
			htmls1 += obj.zjcl;
			htmls1 += "</td><td>";
			htmls1 += obj.jczs;
			htmls1 += "</td><td>";
			htmls1 += obj.hgs;
			htmls1 += "</td><td>";
			htmls1 += obj.hgl;
			htmls1 += "</td><td>";
			htmls1 += obj.jdyxq;
			htmls1 += "</td><td>";
			htmls1 += obj.jcycsl;
			htmls1 += "</td></tr>";
	}
	//如何行数不够6行，则需要加到6行
	for(var j=num; j <6; j++){
		htmls += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td><td></td></tr>";
	}
	//如何行数不够4行，则需要加到4行
	for(var j=num; j <4; j++){
		htmls1 += "<tr><td>&nbsp;</td><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}
	$("#gisMessageTable").append(htmls);
	$("#dynamicTable").append(htmls1);
}

//按检测方法合格率
function jcffPercent(){
	$("#jcffhglDiv").html("按检测方法合格率情况（"+checkTime+"）");
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"jcffPercent",params:"String#"+stationPkid+";;String#"+checkTime+";;String#"+stationPkid+";;String#"+checkTime},
			async:false,type:"post",
		success:function(data){
			$("#chart1Nub").html("");
			if(data.total > 0){
				makeJcffPercentTable(data);
			}
		}
	});
}

//组装按检测方法合格率图表
function makeJcffPercentTable(data){
	var htmls = "";
	var num = data.rows.length;
	numT = num;
	dataT = data;
	for(var i=0; i< num; i++){
		var obj = data.rows[i];
		if(i==0){
			htmls += "<div class='chart1Nub1'><span class='chart1NubW'>总合格率：</span><span class='chart1Nub1c'>";
			htmls += obj.zhgl;
			htmls += "</span></div>";
		}
		htmls += "<div class='chart1Nub"+(i+2)+"'><span class='chart1NubW'>";
		htmls += obj.jcff+"：";
		htmls += "</span><span class='chart1Nub"+(i+2)+"c'>"
		htmls += obj.hgl;
		htmls += "</span></div>";
	}
	$("#chart1Nub").append(htmls);
}

//按检测线合格率
function jcxPercent(){
	$("#jcxhglDiv").html("按检测线合格率情况（"+checkTime+"）");
	//清空数组
	dataBeast.splice(0, dataBeast.length);
	dataBeauty.splice(0, dataBeauty.length);
	dataTotal.splice(0, dataTotal.length);
	xAxisData.splice(0, xAxisData.length);
	
	$.ajax({
		url:rootPath+"/db/query.yt",
		data:{configName:"jxh",
			sql:"jcxPercent",params:"String#"+stationPkid+";;String#"+checkTime},
			async:false,type:"post",
		success:function(data){
			if(data.total > 0){
				for(var i=0; i<data.total; i++){
					dataBeast.push(data.rows[i].hgs);//检测合格车辆数量：千辆
					dataBeauty.push(data.rows[i].bhgs);//检测不合格车辆数量：千辆
					dataTotal.push(data.rows[i].hgl);//检测合格率
					xAxisData.push(data.rows[i].jcxmc);//检测线
				}
			}
		}
	});
}