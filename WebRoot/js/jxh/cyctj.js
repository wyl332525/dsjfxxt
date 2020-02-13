var cycAllArray = new Array();
var dataName = new Array();
var checkQualifieCityWin=null;
var code=null;
var arry = new Array();
$(function() {
	startdate = "2018-01-01";
	enddate = getCurrentDate('yyyy-mm-dd');
	$('#kssj').val(startdate);
	$('#jssj').val(enddate);
	getData();
});


function getData() {
	var cycObj = loadDatasAjax({
		sqlKey : "com.kmzc.dao.dsj.Survey.getCyctjbycode",
		starttime : startdate,
		endtime : enddate
	});
	cycAllArray = new Array();
	dataName = new Array();
	arry = new Array();
	var map = {};
	for (var i = 0; i < cycObj.total; i++) {
		var ret = cycObj.rows;
		var cycArray = new Array();
		cycArray.push(ret[i].cycjcl);//检测量
		cycArray.push(ret[i].cychgl);//合格率
		cycArray.push(ret[i].gkl);//工况率
		cycArray.push(ret[i].pjzzl);//平均总质量
		cycArray.push(ret[i].pjlcs);//平均里程数
		dataName.push(ret[i].name);//
		cycArray.push(ret[i].code);//
		cycArray.push("柴油车");
		cycAllArray.push(cycArray);
	}
	for(var i=0;i<cycAllArray.length;i++){
		var map = {};
        map.name = dataName[i];
        map.value = cycAllArray[i];
        arry.push(map);
	}
	getTjt()
}

function getTjt() {
	// 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

	myChart.on('click', function (param) {
		code=param.value[5];
		toQualifieList();
	});
	// 指定图表的配置项和数据
	option = {
			color: ['#ffcc01','#b3ff3c','#FF19D3'],
			//backgroundColor: '#161627',//背景颜色
		    /*title: {
		        text: '柴油车雷达图'
		    },*/
		    tooltip: {},//提示框
		    legend: {//图例
		    	bottom: 5,//图例放底部
		        data:dataName,
		        textStyle:{
		        	color:'#FFF',
		        	fontSize : 20
		        }
		    },
		    radar: {
		        name: {
		        	fontSize : 18,
		            textStyle: {
		                color: '#fff',
		                borderRadius: 3,
		                padding: [3, 5]
		           }
		        },
		        indicator: 
		        	[
		           { name: '检测量', max: 30000},
		           { name: '合格率', max: 100},
		           { name: '工况率', max: 100},
		           { name: '平均总质量', max: 10000},
		           { name: '平均里程数', max: 110000}
		        ],
		        shape: 'circle',//设置圆形背景网络线
		        splitNumber: 5,//5层
		        /*name: {
		            textStyle: {
		                color: 'rgb(238, 197, 102)'
		            }
		        },*/
		        /*splitLine: {//设置网络线的颜色
		            lineStyle: {
		                color: [
		                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
		                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
		                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
		                ].reverse()
		            }
		        },*/
		        /*splitArea: {//背景透明
		            show: false
		        },*/
		        axisLine: {//网格直线的样式
		            lineStyle: {
		                color: '#FFF'
		            }
		        }
		            
		    },
		    series: [{
		        name: '柴油车统计',
		        type: 'radar',
		        // areaStyle: {normal: {}},
		        /*itemStyle: {
	                normal: {//未选中状态
	                    borderWidth:2,//边框大小
	                    borderColor:'white',
	                    areaColor: 'orange',//背景颜色
	                    label: {
	                        show: true//显示名称
	                    }
	                },
	                emphasis: {// 也是选中样式
	                    borderWidth:2,
	                    borderColor:'#288d9e',
	                    areaColor: '#704563',
	                    label: {
	                        show: true,
	                        textStyle: {
	                            color: 'lightgreen'
	                        }
	                    }
	                 }    
	                },*/
		        /*itemStyle: {
                    normal: {
                        color : "rgba(0,0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                        lineStyle: {
                            color:"white" // 图表中各个图区域的边框线颜色
                        },
                        areaStyle: {
                            type: 'default',
                            color: "#1686c2" // 图表中各个图区域的颜色
                        }
                    }
                },*/
		        itemStyle: {
		             normal: {
				        	 lineStyle : {
		                         width : 3
		                     }
		             },
		             emphasis: {// 也是选中样式
		                    lineStyle : {
	                         width : 5
		                    }
		             }
				},
		        data : arry
		    }]
		};
	myChart.setOption(option);
}

//查询
function getValueDate() {
	startdate = $('#kssj').val();
	enddate = $('#jssj').val();

	var start = Date.parse(new Date(startdate.replace(/-/g, "/")));
	var end = Date.parse(new Date(enddate.replace(/-/g, "/")));
	var thisDate = Date.parse(new Date());
	var millTime = end - start;
	var thistime = end - thisDate;
	if (millTime < 0) {
		alert("结束时间不能大于开始时间！");
		return;
	}
	if (thistime > 0) {
		alert("结束时间不能大于当前时间！");
		return;
	}
	getData();
}
function toQualifieList() {
	parent.popWindow.init(1700, 750, rootPath + "/view/mainpage/cyctj2.do?code="+code);
}
