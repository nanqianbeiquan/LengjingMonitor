var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/map');
require('echarts/map/js/china');

var clone=function(obj){
    var o;
    switch(typeof obj){
    case 'undefined': break;
    case 'string'   : o = obj + '';break;
    case 'number'   : o = obj - 0;break;
    case 'boolean'  : o = obj;break;
    case 'object'   :
        if(obj === null){
            o = null;
        }else{
            if(obj instanceof Array){
                o = [];
                for(var i = 0, len = obj.length; i < len; i++){
                    o.push(clone(obj[i]));
                }
            }else{
                o = {};
                for(var k in obj){
                    o[k] = clone(obj[k]);
                }
            }
        }
        break;
    default:		
        o = obj;break;
    }
    return o;
}

var echart_demo=function(id){
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
}

var echart_map=function(id,data){
    var option = {
        title: {
            show:false
        },
        tooltip: {
            show:true,
            formatter:'{b}<br />{a} : {c} 件'
        },
        legend: {
            show:false
        },
        visualMap: {
            min: 0,
            max: 1,
            left: 15,
            top: 'bottom',
            text: ['高','低'],
            calculable: false,
            inRange: {
                color: ['#E0FFFF','#006EDD']
            }
        },
        toolbox: {
            show: false
        },
        geo: {
            map: 'china',
            roam: false,
            zoom:1.2,
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: 'rgba(0,0,0,0.4)'
                    }
                }
            },
            itemStyle: {
                normal:{
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 20,
                symbol: 'none',symbolRotate: 35,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                            color: '#F06C00'
                    }
                }
            },
            {
                name: '涉诉案件',
                type: 'map',
                geoIndex: 0,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                data:[]
            }
        ]
    };

    var defaultData={
        '北京': 0 ,'天津': 0 ,'上海': 0 ,'重庆': 0,'河北': 0 ,'河南': 0 ,'云南': 0 ,'辽宁': 0 ,'黑龙江': 0 ,'湖南': 0 ,'安徽': 0 ,'山东': 0 ,'新疆': 0 ,'江苏': 0 ,'浙江': 0 ,'江西': 0 ,'湖北': 0 ,'广西': 0 ,'甘肃': 0,'山西': 0 ,'内蒙古': 0 ,'陕西': 0 ,'吉林': 0 ,'福建': 0 ,'贵州': 0 ,'广东': 0 ,'青海': 0 ,'西藏': 0 ,'四川': 0 ,'宁夏': 0 ,'海南': 0 ,'台湾': 0 ,'香港': 0 ,'澳门': 0 ,'南海诸岛':0
    }
    if(data.length>0){
        data.forEach(function(d,i){
            defaultData[d.geo]=d.dqzs;
        })
        //取最大值
        var max=data[0].dqzs;
        // if(max.length==1){
        //     max=max;
        // }else{
        //     var max_0=max.substring(0,1);
        //     var max_1=max.substring(1,2);
        //     var max_add=0;
            
        //     if(parseInt(max_1)<=5){
        //         max_1=5;
        //     }else{
        //         max_1=0;
        //         max_add+=1;
        //     }
        //     if((max_0=(parseInt(max_0)+max_add))>=10){
        //         max_0=10;
        //         max_1=0;
        //     }

        //     max=max_0*10+max_1*Math.pow(10,max.length-2);
        //     if(max<parseInt(data[0].dqzs)){
        //         max+=Math.pow(10,max.length-1)/2;
        //     }
        // }
        option.visualMap.max=parseInt(max);
    }

    for(var p in defaultData){
        var model={};
        model.name=p;
        model.value=defaultData[p];
        option.series[1].data.push(model);
    }



    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
}

var line_yAxis_formatter={
    unit:"万",
    unit_change:false,
    change:function(value){
        if(this.unit_change){
            return formatNumber(value/10000)+this.unit;
        }
        return value;
    }    
};

function formatNumber(num) {
    if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(num)) {
        return num;
    }
    var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
    var re = new RegExp("(\\d)(\\d{3})(,|$)");
    while (re.test(b))   b = b.replace(re, "$1,$2$3");
    return a + "" + b + "" + c;
}

var line_option={
    tooltip : {
        trigger: 'axis'
    },
    grid:{
        top:100,
        left:80
    },
    legend:{
        show:true,
        top:50
    },
    toolbox: {
        show : false
    },
    calculable : true,
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value',
        axisLabel:{
            formatter:function(value,index){
                if(index==1){
                    if(value>=100000){
                        line_yAxis_formatter.unit_change=true;
                    }else{
                        line_yAxis_formatter.unit_change=false;
                    }
                }
                return line_yAxis_formatter.change(value);
            }
        }
    },
    series:[

    ]
};

var echart_line_case=function(id,data){
    var option=clone(line_option);
    option.color=['#fec414','#8ce4e2','#ec5a67','#1aa6fa'],
    option.xAxis.data=data.days;
    option.legend.data=["涉诉案件","原告案件","被告案件"];
    option.series=
        [{
            name:'涉诉案件',
            type:'line',
            data:data.data[0]
        },
        {
            name:'原告案件',
            type:'line',
            data:data.data[1]
        },
        {
            name:'被告案件',
            type:'line',
            data:data.data[2]
        }];
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
}

var echart_line_executed=function(id,data){
    var option=clone(line_option);
    option.color=['#ff7f50'];
    option.xAxis.data=data.days;
    option.legend.data=["被执行人个数"];
    option.series=
        [{
            name:'被执行人个数',
            type:'line',
            data:data.data
        }];
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
}

var echart_line_sum=function(id,data){
    var option=clone(line_option);
    option.color=['#ff7f50'];
    option.xAxis.data=data.days;
    option.tooltip.formatter=function(data){
        console.log(data);
        return data[0].name+"</br>"+"<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:"+data[0].color+"'></span>"+data[0].seriesName+" : </br><span style='text-align:center;display:block;'>"+data[0].data+"元</span>";
    };
    option.legend.data=["列入被执行人名单执行标的总额"];
    option.series=
        [{
            name:'列入被执行人名单执行标的总额',
            type:'line',
            data:data.data
        }];
    var myChart = echarts.init(document.getElementById(id));
    // 绘制图表
    myChart.setOption(option);
}

module.exports = {
	echart_demo:echart_demo,
    echart_map:echart_map,
    echart_line_case:echart_line_case,
    echart_line_executed:echart_line_executed,
    echart_line_sum:echart_line_sum
}