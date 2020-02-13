var startdate = null;//统计开始时间
var enddate = null;//统计结束时间
var defaultRoom = 0;
var zsj = 0;//总检测次数
var drsj = 0;//当日检测次数

$(function () {
//echarts_1();
	
//echarts_2();
	
	
//echarts_4();
echarts_31();
echarts_32();
echarts_33();
//echarts_5();



	
function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));

    option = {
	    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
    },
		    legend: {
    top:'0%',
        data:['安卓','IOS'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    grid: {
        left: '10',
		top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },
        axisLine: {
			lineStyle: { 
				color: 'rgba(255,255,255,.2)'
			}

        },

   data: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']

    }, {

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,

       

    }],

    yAxis: [{
        type: 'value',
        axisTick: {show: false},
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
       axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },

        splitLine: {
            lineStyle: {
                 color: 'rgba(255,255,255,.1)'
            }
        }
    }],
    series: [
		{
        name: '安卓',
        type: 'line',
         smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#0184d5',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#0184d5',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: [3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4,3, 4, 3, 4, 3, 4, 3, 6, 2, 4, 2, 4]

    }, 
{
        name: 'IOS',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#00d887',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#00d887',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: [5, 3, 5, 6, 1, 5, 3, 5, 6, 4, 6, 4, 8, 3, 5, 6, 1, 5, 3, 7, 2, 5, 1, 4]

    }, 
	
		 ]

};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

function echarts_31() {
	var jcffArray = new Array();
	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getJccsByCheckMethod",
		starttime : startdate,
		endtime : enddate
	}
	var dataObj = new Array();
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		for(var i = 0; i < data.rows.length; i++){
			var obj = data.rows[i];
			jcffArray.push(obj.checkmethod);
			var dobj = {};
			dobj.name = obj.checkmethod;
			dobj.value = obj.c;
			dataObj.push(dobj);
		}
	}
	// 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb1')); 
    option = {
   
	    title: [{
        text: '检测方法分布',
        left: 'center',
        textStyle: {
            color: '#94CBFF',
			fontSize:'15'
        }

    }],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
    	top:'70%',
    	itemWidth: 10,
        itemHeight: 10,
        //data:['0岁以下','20-29岁','30-39岁','40-49岁','50岁以上'],
        data:jcffArray,
        textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'检测方法分布',
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
                  color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
            label: {show:false},
			labelLine: {show:false},
//            data:[
//                {value:1, name:'稳态工况法'},
//                {value:4, name:'20-29岁'},
//                {value:2, name:'30-39岁'},
//                {value:2, name:'40-49岁'},
//                {value:1, name:'50岁以上'},
//            ]
			data:dataObj
        }
    ]
};
      
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function echarts_32() {
	var fjqkArray = new Array();
	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getJccsByFjqk",
		starttime : startdate,
		endtime : enddate
	}
	var dataObj = new Array();
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		for(var i = 0; i < data.rows.length; i++){
			var obj = data.rows[i];
			var fjqk = "";
			if (obj.fjqk == "0") {
				fjqk = "首检";
			} else if (obj.fjqk == "4") {
				fjqk = "3次以上复检";
			} else {
				fjqk = obj.fjqk+"次复检";
			}
			
			fjqkArray.push(fjqk);
			var dobj = {};
			dobj.name = fjqk;
			dobj.value = obj.c;
			dataObj.push(dobj);
		}
	}
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb2'));
option = {
   
	    title: [{
        text: '复检次数分布',
        left: 'center',
        textStyle: {
            color: '#94CBFF',
			fontSize:'15'
        }

    }],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
        
    top:'70%',
       itemWidth: 10,
        itemHeight: 10,
        data:fjqkArray,
        textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'复检次数分布',
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
            color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
            label: {show:false},
			labelLine: {show:false},
//            data:[
//                {value:5, name:'电子商务'},
//                {value:1, name:'教育'},
//                {value:6, name:'IT/互联网'},
//                {value:2, name:'金融'},
//                {value:1, name:'学生'},
//                {value:1, name:'其他'},
//            ]
			data:dataObj
        }
    ]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_33() {
	var areaArray = new Array();
	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getJccsByArea",
		starttime : startdate,
		endtime : enddate
	}
	var dataObj = new Array();
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		for(var i = 0; i < data.rows.length; i++){
			var obj = data.rows[i];
			areaArray.push(obj.areaname);
			var dobj = {};
			dobj.name = obj.areaname;
			dobj.value = obj.c;
			dataObj.push(dobj);
		}
	}
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('fb3'));
option = {
	    title: [{
        text: '区域检测分布',
        left: 'center',
        textStyle: {
            color: '#94CBFF',
			fontSize:'15'
        }

    }],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
position:function(p){   //其中p为当前鼠标的位置
            return [p[0] + 10, p[1] - 10];
        }
    },
    legend: {
    top:'70%',
       itemWidth: 10,
        itemHeight: 10,
        data:areaArray,
        textStyle: {
            color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    series: [
        {
        	name:'区域检测分布',
            type:'pie',
			center: ['50%', '42%'],
            radius: ['40%', '60%'],
                   color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab','#06b4ab','#06c8ab','#06dcab','#06f0ab'],	
            label: {show:false},
			labelLine: {show:false},
            data:dataObj
        }
    ]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	
	startdate = "2017-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	
	//加载首页中间的3个数量值
	initJcsl();
	//左边上面的表：近一个月检测量
	LoadJczlByDay();
	//左边中间的表：柴油车检测量
	cyctjl();
	
	//复检合格率统计
	getSjhgl();
	
	echarts_6();
	
	ssjc();
})

function initJcsl(){
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
				useEasing : true,
				useGrouping : true,
				separator : ',',
				decimal : '.',
			};
			//延迟动画加载数据插件  countup.js
			var demo = new CountUp('carsnums', zsj, obj.nums, 0, 3);
			if (!demo.error) {
				demo.start();
			} else {
				//console.error(demo.error);
			}
			zsj = Number(obj.nums);
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
				useEasing : true,
				useGrouping : true,
				separator : ',',
				decimal : '.',
			};
			var demo = new CountUp('jcxnums', drsj, obj.nums, 0, 3);
			if (!demo.error) {
				demo.start();
			} else {
				//console.error(demo.error);
			}
			drsj = Number(obj.nums);

			console.info('obj.cc' + obj.nums);
		//$("#jcxnums").html(obj.nums);
		}
	}
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
//	if(titlecount!=0){
//		btsz(titlecount,0);
//	}
    var myChart = echarts.init(document.getElementById('echart1'));
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
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

function cyctjl(){
	var myChart2 = echarts.init(document.getElementById('echart2'));

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
			
//			if(titlecount!=0){
//				btsz1(titlecount,0);
//			}
			//加载统计图
			myChart2.on('click', function (param) {
				City=param.name;
				
			});
			option = {
					color: ['#27d08a'],
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
					top : '5%',
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
							show : false,
							rotate:50,
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
			myChart2.setOption(option);
		}
	}
	myChart2.setOption(option);
    window.addEventListener("resize",function(){
        myChart2.resize();
    });
}
		
function leftClick1(){
	alert(1);
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
	
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>首检合格率</td><td width='20%' style='color:#96C9FA;'>" + sjhgl + "%</td><td width='38%'><input type='text' class='yieldBar0' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>1次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj1hgl + "%</td><td width='38%'><input type='text' class='yieldBar1' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>2次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj2hgl + "%</td><td width='38%'><input type='text' class='yieldBar2' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>3次复检合格率</td><td width='20%' style='color:#96C9FA;'>" + fj3hgl + "%</td><td width='38%'><input type='text' class='yieldBar3' style='display: none;'></td></tr>";
	hglhtml += "<tr><td width='35%' style='color:#96C9FA;'>3次以上合格率</td><td width='20%' style='color:#96C9FA;'>" + fj4hgl + "%</td><td width='38%'><input type='text' class='yieldBar4' style='display: none;'></td></tr>";
	
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

function echarts_6() {
	var args1 = {
		sqlKey : "com.kmzc.dao.dsj.jxhnew.getJchglByJcff",
		starttime : startdate,
		endtime : enddate
	}
	var dbhgl = 0;
	var wthgl = 0;
	var ldhgl = 0;
	var tghgl = 0;
	var zhgl = 0;
	var data = loadDatasAjax(args1);
	if (null != data.rows && "" != data.rows) {
		var dataObj = data.rows[0];
		dbhgl = dataObj.dbhgl;
		wthgl = dataObj.wthgl;
		tghgl = dataObj.tghgl;
		ldhgl = dataObj.ldhgl;
		zhgl = dataObj.zhgl;
	}
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('echart6'));

	var dataStyle = {
			normal: {
				label: {
					show: false
				},
		labelLine: {
			show: false
		},
		//shadowBlur: 40,
		//shadowColor: 'rgba(40, 40, 40, 1)',
	}
};
var placeHolderStyle = {
	
	normal: {
		color: 'rgba(255,255,255,.05)',
		label: {show: false,},
		labelLine: {show: false}
	},
	emphasis: {
		color: 'rgba(0,0,0,0)'
	}
};
option = {
	color: ['#0f63d6', '#0f78d6', '#0f8cd6', '#0fa0d6', '#0fb4d6'],
	tooltip: {
		show: true,
		formatter: "{a} : {c}% "
	},
	legend: {
		itemWidth: 10,
        itemHeight: 10,
		itemGap: 12,
		bottom: '3%',
		
		data: ['简易工况法', '加载减速工况法', '自由加速法', '双怠速法', '总合格率'],
		textStyle: {
                    color: 'rgba(255,255,255,.6)',
                }
	},
	
	series: [
		{
		name: '简易工况法',
		type: 'pie',
		clockWise: false,
		center: ['50%', '42%'],
		radius: ['59%', '70%'],
		itemStyle: dataStyle,
		hoverAnimation: false,
		data: [{
			value: wthgl,
			name: '01'
		}, {
			value: 100-wthgl,
			name: 'invisible',
			tooltip: {show: false},
			itemStyle: placeHolderStyle
		}]
	},
		{
		name: '加载减速工况法',
		type: 'pie',
		clockWise: false,
		center: ['50%', '42%'],
		radius: ['49%', '60%'],
		itemStyle: dataStyle,
		hoverAnimation: false,
		data: [{
			value: ldhgl,
			name: '02'
		}, {
			value: 100-ldhgl,
			name: 'invisible',
			tooltip: {show: false},
			itemStyle: placeHolderStyle
		}]
	}, 
		{
		name: '自由加速法',
		type: 'pie',
		clockWise: false,
		hoverAnimation: false,
		center: ['50%', '42%'],
		radius: ['39%', '50%'],
		itemStyle: dataStyle,
		data: [{
			value: tghgl,
			name: '03'
		}, {
			value: 100-tghgl,
			name: 'invisible',
			tooltip: {show: false},
			itemStyle: placeHolderStyle
		}]
	},
		{
		name: '双怠速法',
		type: 'pie',
		clockWise: false,
		hoverAnimation: false,
		center: ['50%', '42%'],
		radius: ['29%', '40%'],
		itemStyle: dataStyle,
		data: [{
			value: dbhgl,
			name: '04'
		}, {
			value: 100-dbhgl,
			name: 'invisible',
			tooltip: {show: false},
			itemStyle: placeHolderStyle
		}]
	},{
		name: '总合格率',
		type: 'pie',
		clockWise: false,
		hoverAnimation: false,
		center: ['50%', '42%'],
		radius: ['19%', '30%'],
		itemStyle: dataStyle,
		data: [{
			value: zhgl,
			name: '05'
		}, {
			value: 100-zhgl,
			name: 'invisible',
			tooltip: {show: false},
			itemStyle: placeHolderStyle
		}]
	},]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }



function ssjc(){
	var args1 = {
			sqlKey : "com.kmzc.dao.dsj.jxhnew.getSsjc"
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
			str+="<td class='gdsj'>"+obj.checkmethod+"</td>";
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





