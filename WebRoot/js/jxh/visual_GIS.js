window.onload = function () {
			var oMyBar1 = new MyScrollBar({
        selId: 'tableroll',
        bgColor: 'rgba(255, 255, 255, 0.2)',
        barColor: '#d1d1d1',
        enterColor: '#d1d1d1',
        enterShow: false,
        borderRadius: 4,
        width: 4
    });
    $("#tableroll>div").addClass("barstyle");
    init_Load();
}
init_Load();
function init_Load() {
    $('html').fontFlex(12, 20, 114);
    // echarts图表
    // 各检测方法合格率饼图
    var piechart = echarts.init(($('#chart1')[0]));
    var dataStyle = {
        normal: {
            label: {
                show: true,
                normal: {
                    formatter(v) {
                        let text = v.name
                        return text.length < 4
                            ? text
                            : `${text.slice(0, 4)}\n${text.slice(4)}`
                    },
                    offset: [0, 0]
                }
            },
        }
    };
    var chart1length = $('#chart1').height();
    var a1 = chart1length * 0.39;
    var b1 = chart1length * 0.34;
    var a2 = chart1length * 0.33;
    var b2 = chart1length * 0.27;
    var a3 = chart1length * 0.26;
    var b3 = chart1length * 0.21;
    var a4 = chart1length * 0.20;
    var b4 = chart1length * 0.15;
    var a5 = chart1length * 0.14;
    var b5 = chart1length * 0.09;
    var a6 = chart1length * 0.08;
    var b6 = chart1length * 0.02;
    var chart1length = $('#chart1').height();
    var placeHolderStyle = {
        normal: {
            color: 'rgba(0,0,0,0)',
            label: { show: true },
            labelLine: { show: false }
        },
        emphasis: {
            color: 'rgba(0,0,0,0)'
        }
    };
    var option = {
        // backgroundColor: '#f4f2e3',
        color: ['#3475F9', '#00E8F0', '#03F57A', '#A0FC0F', '#FEDE04', '#F64D03'],
        tooltip: {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '总合格率',
                type: 'pie',
                clockWise: false,
                radius: [b1, a1],
                itemStyle: dataStyle,
                hoverAnimation: false,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 300,
                        name: '总合格率'
                    },
                    {
                        value: 50,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }

                ]
            },
            {
                name: 'Line 2',
                type: 'pie',
                clockWise: true,
                radius: [b2, a2],
                itemStyle: dataStyle,
                hoverAnimation: false,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 150,
                        name: '双怠速法'
                    },
                    {
                        value: 60,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            },
            {
                name: 'Line 3',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: [b3, a3],
                itemStyle: dataStyle,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 80,
                        name: '简易瞬态工况法'
                    },
                    {
                        value: 50,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            },
            {
                name: 'Line 4',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: [b4, a4],
                itemStyle: dataStyle,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name;
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 45,
                        name: '滤纸烟度法'
                    },
                    {
                        value: 30,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            },
            {
                name: 'Line 5',
                type: 'pie',
                clockWise: false,
                hoverAnimation: false,
                radius: [b5, a5],
                itemStyle: dataStyle,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 30,
                        name: '不透光烟度法'
                    },
                    {
                        value: 30,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            },
            {
                name: 'Line 6',
                type: 'pie',
                clockWise: true,
                hoverAnimation: false,
                radius: [b6, a6],
                itemStyle: dataStyle,
                label: {
                    show: true,
                    normal: {
                        formatter(v) {
                            let text = v.name;
                            return text.length < 8
                                ? text
                                : `${text.slice(0, 4)}\n${text.slice(4)}`
                        },
                        offset: [0, 0]
                    }
                },
                data: [
                    {
                        value: 30,
                        name: '加载减速法'
                    },
                    {
                        value: 30,
                        name: 'invisible',
                        itemStyle: placeHolderStyle
                    }
                ]
            }
        ]
    };
    piechart.setOption(option);

    // 检测数据量仪表盘
    var piechart2 = echarts.init(($('#chart4')[0]));
    var data = [{
        "q": [{
            "x": "T",
            "id": "1",
            "z": "100000",

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
            "z": "2500",
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
    //setInterval(function() {
    //  option.series[0].data[0].value = (Math.random() * 2).toFixed(2) - 0;
    //  piechart2.setOption(option, true);
    //  option.series[1].data[0].value = (Math.random() * 2).toFixed(2) - 0;
    //  piechart2.setOption(option, true);
    //}, 1000);
    var option = {
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
                        color: 'FDD853'
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
                                        { offset: 0, color: '#4EFBB0' },
                                        { offset: 1, color: '#1DA8FD' }
                                    ]
                                )
                                ],
                                [
                                    0.66, new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        { offset: 0, color: '#1DA8FD' },
                                        { offset: 1, color: '#FDD13D' }
                                    ]
                                )
                                ],
                                [
                                    1, new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        { offset: 0, color: '#FDD13D' },
                                        { offset: 1, color: '#FD4D46' }
                                    ]
                                )
                                ]],
                            width: 10
                        }
                    },

                    axisTick: {            // 坐标轴小标记
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
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
                    title: {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 12,
                            fontStyle: 'italic',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    //              title: {
                    //                  show: true,
                    //                  offsetCenter: offset,
                    //                  textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    //                      fontWeight: 'bolder',
                    //                      fontSize: 12,
                    //                      fontStyle: 'italic',
                    //                      color: '#FDD853'
                    //                  }
                    //              },
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

    // 近12月车辆检测合格率
    var piechart3 = echarts.init(($('#chart2')[0]));
    var dataBeast = [3.1, 4.1, 3.2, 2.1, 2.4, 3.4,3.1, 4.1, 3.2, 2.1, 2.4, 3.4];
    var dataBeauty = [0.2, 0.4, 0.2, 0.1, 0.1, 0.3,0.2, 0.4, 0.2, 0.1, 0.1, 0.3];
    var dataTotal = [87, 79, 94, 92, 84, 84,87, 79, 94, 92, 84, 84];
    var xAxisData = ['11', '12', '1', '2', '3', '4','5','6','7','8','9','10'];
    var option = {
        color: ['#019aba', '#7a201f', '#11565d'],
        legend: {
            right: '30%',
            textStyle: {
                color: '#666',
                fontSize: 12,
            },
            data: ['合格', '不合格'],
        },
        tooltip: {
            show: true,
            trigger: 'axis',
//          axisPointer: {//坐标轴指示线
//              type: 'cross',
////              crossStyle: {
////                  color: '#ddd',
////
////              },
//
//          },
        },


        grid: {
            top: '19%',
            left: '5%',
            right: '3%',
            bottom: '2%',
            containLabel: true,
        },
        xAxis: {
            show: true,
            axisLine: {
                lineStyle: {
                    color: '#e7e7e7',
                    fontSize: 12,
                    width: 2
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#4a4a4a',
                    align: 'center'

                },
            },
            axisTick: {
            	show:false,
                alignWithLabel: true,
                lineStyle: {
                    color: '#4a4a4a',

                },
            },
            data: xAxisData,
        },
        yAxis: [
            {
                type: 'value',
                name: '单位：万辆',
                axisLine: {
                    lineStyle: {
                        color: '#e7e7e7',
                        fontSize: 12,
                        width: 1
                    }
                },
                nameTextStyle: {
                    color: '#4a4a4a',
                },
                axisLabel: {
                    textStyle: {
                        color: '#4a4a4a',
                    },
                },
                axisTick: {
                	show:false,
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#4a4a4a',
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
                    color: '#4a4a4a',
                },
                axisLine: {
                    lineStyle: {
                        color: '#dee0de',
                        fontSize: 12,
                        width: 1
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#4a4a4a',
                    },
                    formatter: '{value} %'
                },
                axisTick: {
                    alignWithLabel: true,
                    lineStyle: {
                        color: '#4a4a4a',

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
                name: '合格',
                stack: '总数',
                data: dataBeast,
                barWidth: 10,

                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#65fb98' },
                                { offset: 1, color: '#1a7b3a' }
                            ]
                        )
                    }
                },
                label: {
                    emphasis: {
                    	show:true,
                        textStyle: {
                            color: 'red',
                        },
                    },
                },
            },
            {
                type: 'bar',
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#b0f9c9',
                    }
                },
                name: '不合格',
                stack: '总数',
                data: dataBeauty,
                label: {
                    emphasis: {
                        textStyle: {
                            color: '#fff',
                        },
                    },
                },
            },
            {
                type: 'line',
                name: '合格率',
                yAxisIndex: 1,
//              symbol:'none',
//              symbolSize:8,
                itemStyle: {
                    normal: {
                        color: '#fd6e52',
                        borderColor: 'rgba(145,250,177,0.2)',
                        borderWidth: 5
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(192, 255, 231, 0.5)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(192, 255, 231, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
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
                symbolSize: 1,
                lineStyle: {
                    normal: {
                        color: '#aafcc5',
                        width: 1,

                    },
                },
            },
        ]
    };
    piechart3.setOption(option);
    window.addEventListener("resize", function () {//窗口改变时的事件监听
        chart1length = $('#chart1').height();
        a1 = chart1length * 0.39;
        b1 = chart1length * 0.34;
        a2 = chart1length * 0.33;
        b2 = chart1length * 0.27;
        a3 = chart1length * 0.26;
        b3 = chart1length * 0.21;
        a4 = chart1length * 0.20;
        b4 = chart1length * 0.15;
        a5 = chart1length * 0.14;
        b5 = chart1length * 0.09;
        piechart.resize();
        piechart2.resize();
        piechart3.resize();
    });
}

