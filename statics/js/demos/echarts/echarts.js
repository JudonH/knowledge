define(function(require, exports, module){
    var echarts=require('echarts');
    var $=require('jquery');
    var HttpUrl={
        url_data: '/json/demos/echarts/data'
    };
    var chart = {
        init: function() {
            // this.first();
            // this.second();
            // this.third();
            // 异步加载
            this.fourth();
        },
        first: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector('#first'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        second: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector('#second'));
            // 指定图表的配置项和数据
            var option = {
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    roseType: 'angle',
                    data: [{
                        value: 400,
                        name: '搜索引擎'
                    }, {
                        value: 335,
                        name: '直接访问'
                    }, {
                        value: 310,
                        name: '邮件营销'
                    }, {
                        value: 274,
                        name: '联盟广告'
                    }, {
                        value: 235,
                        name: '视频广告'
                    }],
                    itemStyle: {
                        //正常展示下的阴影显示
                        // normal: {
                        //     // 阴影的大小
                        //     shadowBlur: 200,
                        //     // 阴影水平方向上的偏移
                        //     shadowOffsetX: 0,
                        //     // 阴影垂直方向上的偏移
                        //     shadowOffsetY: 0,
                        //     // 阴影颜色
                        //     shadowColor: 'rgba(0, 0, 0, 0.5)'
                        // },
                        // hover时的阴影突出
                        emphasis: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        third: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector('#third'));
            // 指定图表的配置项和数据
            var option = {
                backgroundColor: '#2c343c',
                // textStyle:{
                //     color: 'rgba(255, 255, 255, 0.3)'
                // },
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    data: [{
                        value: 400,
                        name: '搜索引擎',
                        itemStyle: {
                            normal: {
                                color: '#333'
                            }
                        }
                    }, {
                        value: 335,
                        name: '直接访问'
                    }, {
                        value: 310,
                        name: '邮件营销'
                    }, {
                        value: 274,
                        name: '联盟广告'
                    }, {
                        value: 235,
                        name: '视频广告'
                    }],
                    itemStyle: {
                        //正常展示下的阴影显示
                        normal: {
                            color: '#c23531'
                                // // 阴影的大小
                                // shadowBlur: 200,
                                // // 阴影水平方向上的偏移
                                // shadowOffsetX: 0,
                                // // 阴影垂直方向上的偏移
                                // shadowOffsetY: 0,
                                // // 阴影颜色
                                // shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },
                        // hover时的阴影突出
                        emphasis: {
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        fourth: function() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.querySelector('#fourth'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'ECharts 异步加载示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: []
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            // 显示加载动画
            myChart.showLoading();
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: HttpUrl.url_data,
                success: function(result){
                    if(result.code===100){
                        myChart.hideLoading();
                        var r=result.data;
                        // 填入数据
                        myChart.setOption({
                            xAxis: {
                                data: r.title
                            },
                            series: [{
                                // 根据名字对应到相应的系列
                                name: '销量',
                                data: r.sale
                            }]
                        });
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
    };
    chart.init();
});