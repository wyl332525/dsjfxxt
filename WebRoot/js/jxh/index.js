$(function(){
	// 时间轴
$(".zanting").click(function () {
    $(this).toggleClass("openLi");
})
$(".timer ul li").click(function () {
    time_i = $(this).index();
    $(this).addClass("openTimer");
    $(this).siblings("li").removeClass("openTimer");
    //根据年份渲染图层
})
var time_i =  $(".timer ul li").length - 1;
$(".next").click(function () {
    var timeli_length = $(".timer ul li").length;
    time_i++;
    var txtyear = Number($(".timer ul li").eq(timeli_length - 1).text());
    var date = new Date;
    var nowYear = date.getFullYear();
    if (time_i >= timeli_length) {
        if (txtyear < nowYear) {
            time_i = 0;
            for (var i = 0; i < timeli_length; i++) {
                var year = txtyear + i + 1;
				$(".timer ul li").eq(i).html('<span>'+year+'</span>');
            }
            $(".timer ul li").eq(0).addClass("openTimer");
            $(".timer ul li").eq(0).siblings("li").removeClass("openTimer");
        }
        else {
            time_i = timeli_length-1;
        }
    }
    else {
        $(".timer ul li").eq(time_i).addClass("openTimer");
        $(".timer ul li").eq(time_i).siblings("li").removeClass("openTimer");
    }
    //根据年份渲染图层
//          dataparams.TimeYear=   $(".timer ul li").eq(time_i).text();
//          addfeayurLayer(dataparams.dataType);
})
$(".prev").click(function () {
    var timeli_length = $(".timer ul li").length;
    time_i--;
    if (time_i < 0) {
        time_i = timeli_length - 1;
        var txtyear = Number($(".timer ul li").eq(0).text());
        var date = new Date;
        var nowYear = date.getFullYear();
        var firstyear = nowYear - timeli_length + 1;
        if (txtyear <= firstyear) {
            for (var i = 0; i < timeli_length; i++) {
                var year = txtyear - timeli_length + i;
                $(".timer ul li").eq(i).html('<span>'+year+'</span>');
            }
            $(".timer ul li").eq(timeli_length - 1).addClass("openTimer");
            $(".timer ul li").eq(timeli_length - 1).siblings("li").removeClass("openTimer");
        }
    }
    else {

        $(".timer ul li").eq(time_i).addClass("openTimer");
        $(".timer ul li").eq(time_i).siblings("li").removeClass("openTimer");
    }
  //根据年份渲染图层
//          dataparams.TimeYear=   $(".timer ul li").eq(time_i).text();
//          addfeayurLayer(dataparams.dataType);
});
	
	
//检测数量图表		
//	initCharts("#piechart");
	var piechart3 = echarts.init(($('#piechart')[0]));
    var dataBeast = [133, 64, 93, 32, 32];
//  var dataBeauty = [0.2, 0.4, 0.2, 0.1, 0.1];
    var dataTotal = [96,60, 88, 70, 72];
    var xAxisData = ['首检', '1次复检', '2次复检', '3次复检', '3次复检以上',];
    var option = {
        color: ['#019aba', '#7a201f', '#11565d'],
        legend: {
        	itemWidth: 16,
        	itemHeight: 6,
            right: '8%',
            textStyle: {
                color: '#666',
                fontSize: 12,
            },
            data: ['监测数量'],
        },
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
        xAxis: {
            show: true,
//          boundaryGap: false,
            axisLine: {
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
            },
            data: xAxisData,
        },
        yAxis: [
            {
                type: 'value',
                name: '单位：辆',
                axisLine: {
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
                },
            },
            {
                type: 'value',
                name: '合格率',
                nameTextStyle: {
                    color: '#999',
                },
                axisLine: {
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
                },
            },
        ],
        series: [
            {
                type: 'bar',
                name: '监测数量',
                stack: '总数',
                data: dataBeast,
                barWidth: 25,

                itemStyle: {
                    normal: {
						color:'#48a9e5',

//                      color: new echarts.graphic.LinearGradient(
//                          0, 0, 0, 1,
//                          [
//                              { offset: 0, color: '#65F996' },
//                              { offset: 1, color: '#327E4F' }
//                          ]
//                      )
                    }
                },
                label: {
                    emphasis: {
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
            },
//          {
//              type: 'bar',
//              barWidth: 25,
//              itemStyle: {
//                  normal: {
//
//
//                      color: '#387A7A',
//                  }
//              },
//              name: '不合格',
//              stack: '总数',
//              data: dataBeauty,
//              label: {
//                  emphasis: {
//                      textStyle: {
//                          color: '#fff',
//                      },
//                  },
//              },
//          },
            {
                type: 'line',
                name: '合格率',
                yAxisIndex: 1,
                symbol:'circle', //拐点类型 
                symbolSize:8, //拐点大小  数字为1，则是空圆环
                itemStyle: {
                    normal: {
//                      color: '#0F3DDD',
//                      borderColor: 'rgba(219,50,51,0.2)',
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
                data: dataTotal,
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
                },
            },
        ]
    };
    piechart3.setOption(option);
    
    var piechart1 = echarts.init(($('#chartOne')[0]));
	var option = {
		color: ['#39a571', '#7367f2', '#48a7e2','#f3537f','#f49228'],
	    title: {
	        text: ''
	    },
	    tooltip: {
	        trigger: 'axis',
	        formatter: '{b} : {c}%' ,
	    },
	    legend: {
	    	icon:'circle',
	    	itemWidth: 10,
	        itemHeight: 10,
	        itemGap: 10,
	        data:[
	        {name:'双怠速法',},
	        {name:'简易瞬态工况法'},
	        {name:'不透光烟度法'},
	        {name:'加载减速法'},
	        {name:'滤纸烟度法'}]
	    },
	    grid: {
	    	top:'37%',
	        left: '3%',
	        right: '6%',
	        bottom: '3%',
	        containLabel: true
	    },
//	    toolbox: {
//	        feature: {
//	            saveAsImage: {}
//	        }
//	    },
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ['首检','1次复检','2次复检','3次复检','3次以上'],
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
            name: '合格率',
            nameLocation:'end',
            nameTextStyle: {
                color: '#999'
            },
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
	    series: [
	        {
	            name:'双怠速法',
	            type:'line',
	            symbol:'circle',
                symbolSize:8,
                itemStyle: {
                    normal: {
						color:'#39a571',  
                        borderColor:'#fff', 
                        borderWidth: 1
                    }
                },
	            data:[30, 25, 30, 22, 24,20]
	        },
	        {
	            name:'简易瞬态工况法',
	            type:'line',
	            symbol:'circle',
                symbolSize:8,
                itemStyle: {
                    normal: {
						color:'#7367f2',  
                        borderColor:'#fff', 
                        borderWidth: 1
                    }
                },
	            data:[04, 15, 20, 20, 10 ,14]
	        },
	        {
	            name:'不透光烟度法',
	            type:'line',
	            symbol:'circle',
                symbolSize:8,
                itemStyle: {
                    normal: {
						color:'#48a9e5',  
                        borderColor:'#fff', 
                        borderWidth: 1
                    }
                },
	            data:[13, 15, 10, 28, 17,20]
	        },
	        {
	            name:'加载减速法',
	            type:'line',
	            symbol:'circle',
                symbolSize:8,
                itemStyle: {
                    normal: {
						color:'#f3537f',  
                        borderColor:'#fff', 
                        borderWidth: 1
                    }
                },
	            data:[20, 16, 10, 12, 20 , 15]
	        },
	        {
	            name:'滤纸烟度法',
	            type:'line',
	            symbol:'circle',
                symbolSize:8,
                itemStyle: {
                    normal: {
						color:'#f49228',  
                        borderColor:'#fff', 
                        borderWidth: 1
                    }
                },
	            data:[20, 10, 4, 12, 7,3]
	        }
	    ]
};
	piechart1.setOption(option);
	
	
	var piechart2 = echarts.init(($('#chartTwo')[0]));
	var option = {
		color: ['#f8e4af', '#2bbdf1', '#7df7f6'],
	    title: {
	        text: ''
	    },
	    tooltip : {
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
//	    	borderColor:'red',
//	    	borderWidth:1,
	        data:[
	        {name:'环保一线'},
	        {name:'环保二线'},
	        {name:'环保三线'}]
	    },
	    
	    grid: {
	    	top:'20%',
	        left: '3%',
	        right: '6%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data: ['首检','1次复检','2次复检','3次复检','3次以上'],
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
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLine: {
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
                },
	        }
	    ],
	    series : [
	        {
	            name:'环保一线',
	            type:'line',
	            symbol:'none',
	            smooth:true,
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[16, 40, 28, 20, 30, 20, 30],
//	            itemStyle: {  
//               normal:{ 
//                      label:{ 
//                          show: true, 
//                          formatter: '{b} : {c}%' 
//                      }, 
//                      labelLine :{show:true} 
//                  } 
//          	},   
	        },
	        {
	            name:'环保二线',
	            type:'line',
	            symbol:'none',
	            smooth:true,
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[18, 40, 24, 20, 15, 30, 30] 
	        },
	        {
	            name:'环保三线',
	            type:'line',
	            symbol:'none',
	            smooth:true,
	            stack: '总量',
	            areaStyle: {normal: {}},
	            data:[20, 10, 33, 16, 30, 20, 08]
	        }
	    ]
	};
		
	piechart2.setOption(option);
	window.addEventListener("resize", function () {//窗口改变时的事件监听
        piechart3.resize();
        piechart1.resize();
        piechart2.resize();
    });
});

