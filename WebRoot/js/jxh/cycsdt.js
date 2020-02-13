
$(function() {
	var dataObj = loadDatasAjax({configName:"jxhnew",sql:"dsjcffhgltj"});
	var hgl=new Array();
	var dbhgl = new Array();
	var wthgl = new Array();
	var tghgl = new Array();
	var ldhgl = new Array();
	var zhgl = new Array();
	var ds = new Array();
	for(var i=0;i<dataObj.total;i++){
		var ret = dataObj.rows;
		ds.push(ret[i].name);
		dbhgl.push(ret[i].dbhgl);
		wthgl.push(ret[i].wthgl);
		tghgl.push(ret[i].tghgl);
		ldhgl.push(ret[i].ldhgl);
		zhgl.push(ret[i].zhgl);
	}
//	var cs=['昆明市','曲靖市','昭通市','玉溪市','楚雄州','普洱市','丽江市','大理州','德宏州','文山州','红河州','版纳州','临沧市','保山市','迪庆州','怒江州'];
//	
//	sj=[70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70];
//	yc=[11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11];
//	lc=[9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9];
//	sc=[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];
//	sic=[4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4];
	
	hgl.push(dbhgl);
	hgl.push(wthgl);
	hgl.push(tghgl);
	hgl.push(ldhgl);
	hgl.push(zhgl);
//	console.log(hgl);
//	console.log(cs);

        // 基于准备好的dom，初始化echarts实例
	var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
	var option = {
			title : {
		        text: '地市(州)按检测方法统计合格率折线图',
		        x: 'center',
		        top:'0',
		        textStyle:{
		        	color:'#30d2d7',
		        	fontSize:30
		        }
		    },
	    color:['#9015DF','#FFEF00','#FF7143','#E40D00','#00FC00'],
	    tooltip: {
	        trigger: 'axis',
			formatter:'{a0}:{c0}%<br />{a1}:{c1}%<br />{a2}:{c2}%<br />{a3}:{c3}%<br />{a4}:{c4}%<br />'
	    },
	    legend: {
	    	top:60,
	         data:[
			 {
				 name:'双怠速法',
				 textStyle:{
					color:'#9015DF',
					fontSize:20
				 }
			}, {
				 name:'简易工况法',
				 textStyle:{
					color:'#FFEF00',
					fontSize:20
				 }
			}, {
				 name:'不透光烟度法',
				 textStyle:{
					color:'#FF7143',
					fontSize:20
				 }
			}, {
				 name:'加载减速工况法',
				 textStyle:{
					color:'#E40D00',
					fontSize:20
				 }
			}, {
				 name:'综合合格率',
				 textStyle:{
					color:'#00FC00',
					fontSize:20
				 }
			}
			]
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '1%',
	        containLabel: true
	    },
	   
	    xAxis: {
	        type: 'category',
	        boundaryGap: false,
	        data: ds,
			axisLine: {
				show:true,
				lineStyle:{
					color:'#30d2d7'
				}
				
			},
			axisLabel:{
				fontSize:20
			}
	    },
	    yAxis: {
	        type: 'value',
	        axisLine: {
				show:true,
				lineStyle:{
					color:'#30d2d7'
				}
				
			},
			axisLabel: {
				show:true,
				textStyle:{
					color:'#30d2d7',
					fontSize:25
				},
				formatter: '{value}%'
			 }
	    },
	    grid:{
            y:160
        },
	    series: [
	        {
	            name:'双怠速法',
	            type:'line',
	            data:hgl[0],
	            symbol:'star',//拐点样式
                symbolSize: 8,//拐点大小
                itemStyle : {
	                normal : {
	                    lineStyle:{
	                        width:6,//折线宽度
	                    }
	                }
	            }
	        },
	        {
	            name:'简易工况法',
	            type:'line',
	            data:hgl[1],
	            symbol:'star',//拐点样式
                symbolSize: 8,//拐点大小
                itemStyle : {
	                normal : {
	                    lineStyle:{
	                        width:6,//折线宽度
	                    }
	                }
	            }
	        },
	        {
	            name:'不透光烟度法',
	            type:'line',
	            data:hgl[2],
	            symbol:'star',//拐点样式
                symbolSize: 8,//拐点大小
                itemStyle : {
	                normal : {
	                    lineStyle:{
	                        width:6,//折线宽度
	                    }
	                }
	            }
	        },
	        {
	            name:'加载减速工况法',
	            type:'line',
	            data:hgl[3],
	            symbol:'star',//拐点样式
                symbolSize: 8,//拐点大小
                itemStyle : {
	                normal : {
	                    lineStyle:{
	                        width:6,//折线宽度
	                    }
	                }
	            }
	        },
	        {
	            name:'综合合格率',
	            type:'line',
	            data:hgl[4],
	            symbol:'star',//拐点样式
                symbolSize: 8,//拐点大小
                itemStyle : {
	                normal : {
	                    lineStyle:{
	                        width:6,//折线宽度
	                    }
	                }
	            }
	        }
	    ]
	};
	myChart.setOption(option);
});
