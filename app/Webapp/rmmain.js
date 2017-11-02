import $ from 'jquery'
import Vue from 'vue'
import d3 from 'd3'
import radar from './modules/radarChart'; // 风险分析雷达图库
require("./css/radar-chart.css");   // 雷达图样式
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/icmain.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexabout from './components/Indexabout.vue'
import Rmradar from './components/Rmradar.vue'


//## 全局变量设置 ================================================================
var monitorComps=['上海斯睿德信息技术有限公司','上海风声企业信用征信有限公司','上海快鹿投资（集团）有限公司','北京链家房地产经纪有限公司','乐视控股（北京）有限公司','北京百度网讯科技有限公司','上海拉扎斯信息科技有限公司','浙江天猫技术有限公司','支付宝（中国）网络技术有限公司','三星（中国）投资有限公司','上海中泛国际贸易有限公司','重庆钛钛化工有限公司','重庆机械进出口公司','乐视网信息技术（北京）股份有限公司','万全县锦祥欣业商贸有限公司']
//## 全局变量设置 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!',
    monitorComps: monitorComps,
    time: '',
}

//# model计算属性定义
model.computed = {

}

//# model方法定义
model.methods = {
    deleteComp: deleteComp,
    refreashMonitor: refreashMonitor
}

//# model事件定义
model.events = {
    'deleteCompCalled': 'deleteComp',
    'refreashMonitorCalled':'refreashMonitor'
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //首页底部关于
        Rmradar, // 动态监控
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//## 文档加载完成 ================================================================
$(document).ready(function(){
    console.log("文档加载完成");
    renderRadarMonitor();
})
//## 文档加载完成 ================================================================

//# 删除雷达监控企业 =============================================================
function deleteComp(index){
    monitorComps.splice(index,1);
    vm.$data.monitorComps.splice(index,1);
}
//# 删除雷达监控企业 =============================================================

//# 批量渲染动态监控 =============================================================
function renderRadarMonitor(){
    for(let i=0; i<vm.$data.monitorComps.length; i++){
        setTimeout(function(){
            renderRadar(vm.$data.monitorComps[i],'radar'+i);
        }, 100*i+100);
    }
}

//更新动态监控
function refreashMonitor(){
    renderRadarMonitor();
}

function getdates() { 
    var w_array=new Array("星期天","星期一","星期二","星期三","星期四","星期五","星期六"); 
    var d=new Date(); 
    var year=d.getFullYear(); 
    var month=d.getMonth()+1; 
    var day=d.getDate(); 
    var week=d.getDay(); 
    var h=d.getHours(); 
    var mins=d.getMinutes(); 
    var s=d.getSeconds(); 
     
    if(month<10) month="0" + month 
    if(day<10) month="0" + day 
    if(h<10) h="0" + h 
    if(mins<10) mins="0" + mins 
    if(s<10) s="0" + s 
     
    vm.$data.time = year + "-" + month + "-" + day + " " + h + ":" + mins +  ":" + s + " " + w_array[week];  
} 
setInterval(function(){
    getdates();
}, 1000);


//# 批量渲染动态监控 =============================================================

//== start 渲染风险分析分值雷达图 ===============
function renderRadar(compName,ele){

    setTimeout(function(){
        var radarContainerWidth = document.getElementById(ele).offsetWidth;
        $("#"+ele).css("height", radarContainerWidth+20);
        var radarContainerHeight = parseInt($("#"+ele).css("height"));

        var dataType = 'json';
        //== 风险分析数据接口
        var queryCompany = compName;
        //==
        // var testString = "工商,司法,招聘,新闻(正面),新闻(负面)|Hodor,19,10,17,4,10";
        // var testString = "工商,司法,招聘,新闻(正面),新闻(负面)|Hodor,1,1,1,1,1";
        // var testString = "工商,司法,招聘,新闻(正面),新闻(负面)";
        var testString = "背景,司法,经营,舆情(正面),舆情(负面)";
        //== 获取当前日期
        var nowDate = new Date();
        var year = nowDate.getFullYear();
        var mouth = nowDate.getMonth()+1;
        var date = nowDate.getDate();
        //== 将日期处理为“0000-00-00”格式
        var mouthStr;
        var dateStr;
        var nowDateStr;
        if(mouth < 10){
            mouthStr = '0' + mouth;
        }else{
            mouthStr = mouth.toString();
        }
        if(date < 10){
            dateStr = '0' + date;
        }else{
            dateStr = date.toString();
        }
        nowDateStr = year + "-" + mouthStr + "-" + dateStr;
        var yestoday_milliseconds = nowDate.getTime() - 1000*60*60*24*2;
        var yestoday = new Date();
        yestoday.setTime(yestoday_milliseconds);
        var yestodayYear = yestoday.getFullYear();
        var yestodayMouth = yestoday.getMonth()+1;
        var yestodayDate = yestoday.getDate();
        var yestodayStr;
        var yestodayMouthStr;
        var yestodayDateStr;
        if(yestodayMouth < 10){
            yestodayMouthStr = '0' + yestodayMouth;
        }else{
            yestodayMouthStr = yestodayMouth.toString();
        }
        if(yestodayDate < 10){
            yestodayDateStr = '0' + yestodayDate;
        }else{
            yestodayDateStr = yestodayDate.toString();
        }
        yestodayStr = yestodayYear + '-' + yestodayMouthStr + '-' + yestodayDateStr;
        // console.log("nowDateStr:");
        // console.log(nowDateStr);
        // console.log("yestodayStr:");
        // console.log(yestodayStr);
        // console.log(queryCompany);
        $.post("Access/leida",
            // $.post("errorApi",
            {
                // compNameAjax是接口设定的参数名称
                companyName: queryCompany,
                startTime: yestodayStr,
                // startTime:"2016-07-22",//==暂时给定默认日期
                stopTime:nowDateStr
            },
            function(data,status){
                // console.log(status);
                if (status != 'success') {
                    alert('服务器没有响应，请稍后再试');
                    return;
                }
                // data[i].colsValue是返回json对象包含的提取数据入口
                var radarRawData;
                var radarCompanyName;
                var radarCompanyRiskLevel;
                var radarRawDataAarry;
                // var radarRawDataObj = {
                //     "工商":1,
                //     "司法":1,
                //     "招聘":1,
                //     "正面舆情":1,
                //     "负面舆情":1,
                // }
                var radarRawDataObj = {
                    "背景":{value:6, riskLevel: 0},
                    "司法":{value:6, riskLevel: 0},
                    "经营":{value:6, riskLevel: 0},
                    "正面舆情":{value:6, riskLevel: 0},
                    "负面舆情":{value:6, riskLevel: 0},
                }
                if(data.length>0){
                    radarCompanyName = data[0].companyName;
                    radarCompanyRiskLevel = data[0].riskratefixed;
                    radarRawData = data[0].colsValue;

                    // 载入图形
                    // console.log("data:");
                    // console.log(data);
                    // console.log("radarRawData:");
                    // console.log(radarRawData);
                    radarRawDataAarry = radarRawData.split(',');
                    // console.log("radarRawDataAarry:");
                    // console.log(radarRawDataAarry);
                    for(var i=0; i<radarRawDataAarry.length; i++){
                        if(radarRawDataAarry[i].indexOf('工商') != -1){
                            radarRawDataObj['背景'].value = +radarRawDataAarry[i].substr(radarRawDataAarry[i].lastIndexOf(':')+1) + 6;
                            radarRawDataObj['背景'].riskLevel = +radarRawDataAarry[i].substr(radarRawDataAarry[i].indexOf(':')+1, 1);
                        }else if(radarRawDataAarry[i].indexOf('司法') != -1){
                            radarRawDataObj['司法'].value = +radarRawDataAarry[i].substr(radarRawDataAarry[i].lastIndexOf(':')+1)+ 6;
                            radarRawDataObj['司法'].riskLevel = +radarRawDataAarry[i].substr(radarRawDataAarry[i].indexOf(':')+1, 1);
                        }else if(radarRawDataAarry[i].indexOf('招聘') != -1){
                            radarRawDataObj['经营'].value = +radarRawDataAarry[i].substr(radarRawDataAarry[i].lastIndexOf(':')+1)+ 6;
                            radarRawDataObj['经营'].riskLevel = +radarRawDataAarry[i].substr(radarRawDataAarry[i].indexOf(':')+1, 1);
                        }else if(radarRawDataAarry[i].indexOf('正面舆情') != -1){
                            // radarRawDataObj['正面舆情'].value = Math.abs(+radarRawDataAarry[i].substr(radarRawDataAarry[i].lastIndexOf(':')+1))+ 6;
                            radarRawDataObj['正面舆情'].value = 0 + 6;
                            radarRawDataObj['正面舆情'].riskLevel = +radarRawDataAarry[i].substr(radarRawDataAarry[i].indexOf(':')+1, 1);
                        }else if(radarRawDataAarry[i].indexOf('负面舆情') != -1){
                            radarRawDataObj['负面舆情'].value = Math.abs(+radarRawDataAarry[i].substr(radarRawDataAarry[i].lastIndexOf(':')+1))+ 6;
                            radarRawDataObj['负面舆情'].riskLevel = +radarRawDataAarry[i].substr(radarRawDataAarry[i].indexOf(':')+1, 1);
                            // radarRawDataObj['负面舆情'] = + "-9";
                        }
                    }
                }
                // console.log("radarRawDataObj:");
                // console.log(radarRawDataObj);
                var radarRawDataString = radarCompanyName;
                for(var j=0; j<5; j++){
                    switch(j){
                        case 0: radarRawDataString += "---" +  radarRawDataObj['背景'].value; break;
                        case 1: radarRawDataString += "---" +  radarRawDataObj['司法'].value; break;
                        case 2: radarRawDataString += "---" +  radarRawDataObj['经营'].value; break;
                        case 3: radarRawDataString += "---" +  radarRawDataObj['正面舆情'].value; break;
                        case 4: radarRawDataString += "---" +  radarRawDataObj['负面舆情'].value; break;
                    }
                }
                // console.log(radarRawDataString);
                testString += "|" + radarRawDataString;
                // console.log(testString);
                startRenderRadar(testString, radarRawDataObj, radarCompanyRiskLevel);
            },
            dataType
        );
        // var testString = "背景,司法,经营,专利,新闻(正面),新闻(负面)|Hodor,19,2,4,4,7|Jon Snow,14,15,18,14,7|Tyrion Lannister,8,19,7,5,10|Eddard Stark,12,13,17,12,0";
        // var testString = "背景,司法,经营,新闻(正面),新闻(负面)|Hodor,19,10,17,4,10";

        function startRenderRadar(str, getRiskLevel,companyRiskLevel){
            // console.log("getRiskLevel");
            // console.log(getRiskLevel);
            var radarData = [];
            var chart = radar.RadarChart.chart();
          
            var radarSvgWidth = radarContainerWidth-20;
            var radarSvgHeight = radarSvgWidth;
            var csv = testString.split("\|").map(function(d,i){
                if(i==0){
                    return d.split(",");
                }else{
                    return d.split("---");
                }
            });
            var radarHeaders = [];

            // console.log("csv:");
            // console.log(csv);

            csv.forEach(function(item, i){
                if(i==0){
                    radarHeaders = item;
                }else{
                    var newSeries = {};
                    item.forEach( function(v, j){
                        if(j==0){
                            newSeries.className = v;
                            newSeries.axes = [];
                        }else{
                            var radarHeadersType = radarHeaders[j-1];
                            // console.log(radarHeadersType);
                            switch(radarHeadersType){
                                case "背景": newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v), "riskLevel": getRiskLevel['背景'].riskLevel});break;
                                case "司法": newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v), "riskLevel": getRiskLevel['司法'].riskLevel});break;
                                case "经营": newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v), "riskLevel": getRiskLevel['经营'].riskLevel});break;
                                case "舆情(正面)": newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v), "riskLevel": getRiskLevel['正面舆情'].riskLevel});break;
                                case "舆情(负面)": newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v), "riskLevel": getRiskLevel['负面舆情'].riskLevel});break;
                            }
                            // newSeries.axes.push({"axis":[radarHeaders[j-1]], "value": parseFloat(v)});
                        }
                    });
                    radarData.push(newSeries);
                }
            })
            radarData[0]['companyRiskLevel'] = companyRiskLevel;
            // console.log("radarData:");
            // console.log(radarData);

           radar.RadarChart.defaultConfig.radius = 3;
           radar.RadarChart.defaultConfig.w = radarSvgWidth;
           radar.RadarChart.defaultConfig.h = radarSvgHeight;
           radar.RadarChart.draw("#"+ele, radarData);
        } 
    }, 200);
}
//== end 渲染风险分析分值雷达图 =================


