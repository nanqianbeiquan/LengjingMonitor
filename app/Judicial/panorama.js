import $ from 'jquery';
import d3 from 'd3';
import Vue from 'vue';
// import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routerMap from './modules/routerMap'; // 引入路由表

//vuex状态管理
import store from './vuex/store'; // import 我们刚刚创建的 store
import echart from './vuex/echartCore';

//http://localhost:8080/ljd3/monitor_judicial_panorama.html?compName=%E5%AE%89%E5%BE%BD%E5%8D%8E%E4%BF%A1%E5%9B%BD%E9%99%85%E6%8E%A7%E8%82%A1%E8%82%A1%E4%BB%BD%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8#/
require("bootstrap-webpack");
require("./css/treemap.css");
Vue.use(VueRouter);

/*== start Vue-router =====================================================*/

var model = {}
model.methods = {
    selectYearChange: selectYearChange,
    selectYearForMapChange: selectYearForMapChange,
    expandMatrixTreeClick: expandMatrixTreeClick,
    selectYearMChange: selectYearMChange,
    closeMapClick: closeMapClick,
};
// model事件定义
model.events = {
    'selectYear': 'selectYearChange',  //点击筛选按钮
    'selectYearForMap': 'selectYearForMapChange',  //点击筛选按钮
    'expandMatrixTree': 'expandMatrixTreeClick',  //点击筛选按钮
    'selectYearM': 'selectYearMChange',  //点击筛选按钮
    'closeMap': 'closeMapClick',  //点击筛选按钮
};

// 路由器需要一个根组件。
var App = Vue.extend({
    methods: model.methods,
    events: model.events,
})

// 创建一个路由器实例,创建实例时可以传入配置参数进行定制
var router = new VueRouter({
    hashbang: false,
    // history: true
    // mode: 'html5',
    // linkActiveClass: 'active',
    // transitionOnLoad: true,
    // root: '/'
});

// 定义路由规则
routerMap(router); // 路由表引入

//启动应用了！路由器创建一个 App 实例，并且挂载到选择符 body 匹配的元素上。
router.start(App, 'body');

/*== end Vue-router =======================================================*/

//== 各省省名缩写
var province = { "新疆维吾尔自治区": "新疆", "西藏自治区": "西藏", "内蒙古自治区": "内蒙古", "青海省": "青海", "四川省": "四川", "黑龙江省": "黑龙江", "甘肃省": "甘肃", "云南省": "云南", "广西壮族自治区": "广西", "湖南省": "湖南", "陕西省": "陕西", "广东省": "广东", "吉林省": "吉林", "河北省": "河北", "湖北省": "湖北", "贵州省": "贵州", "山东省": "山东", "江西省": "江西", "河南省": "河南", "辽宁省": "辽宁", "山西省": "山西", "安徽省": "安徽", "福建省": "福建", "浙江省": "浙江", "江苏省": "江苏", "重庆市": "重庆", "宁夏回族自治区": "宁夏", "海南省": "海南", "台湾": "台湾", "北京市": "北京", "天津市": "天津", "上海市": "上海", "香港": "香港", "澳门": "澳门" }

var searchCompName = '';

function isLoacalDebug() {
    if (window.location.host.indexOf("localhost:8080") >= 0 
        || window.location.host.indexOf("192.168.1.93:8080") >= 0 
        || window.location.host.indexOf("127.0.0.1:8080") >= 0) {
        return true;
    }
    return false;
}
//请求前缀
var request_url = window.location.protocol + "//" + window.location.host + "/ljzx/";
if (isLoacalDebug()) {
    request_url = ctx ? ctx : "";
}
var mouseTooltip;
$(document).ready(function () {
    router.go("/");
    mouseTooltip = createMouseTooltip('mouseTooltipForMatrixTree');
    let compName = getQueryStringArgs().hasOwnProperty('compName') ? getQueryStringArgs().compName : '';
    if (compName != '') {
        searchCompName = compName;
        renderCompData(compName);
    } else {
        return;
    }
    listenSelectChange()
})

function getQueryStringArgs() {
    //获取查询字符串并去掉问号
    var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
        //保存数据的对象  
        args = {},
        //取得每一项
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        //在 for循环中使用
        i = 0,
        len = items.length;
    //逐个将每一项加入到args对象中
    for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}


/*== start ajax获取数据 ====================================================*/
function renderCompData(companyName) {
    // 加载动画
    $('#loadingAnimation').show();
    // 获取公司司法统计数据
    // 涉诉案件统计
    $.ajax({
        url: request_url + 'sfGraph/graph1',
        //url:'http://localhost:9096/api/company/info',
        data: {
            //接口设定的参数名称
            //Name:companyName
            compName: companyName
        },
        type: 'POST',
        timeout: 120000,
        cache: false,
        dataType: "json",
        success: function (data) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph1 success");
            // console.log(data);
            // 将数据推入数据仓库中
            var index = 0;
            for (var val in data) {
                index++;
            }
            if (index <= 0) {
                $("#classify-ratio").addClass("empty_panorama");
            }
            store.dispatch('REFRESHCOMPDATA', data);
            // 渲染公司原告被告比例饼图
            renderPie(store.state.statisticsData);
        },
        error: function (error) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
    // 历年涉诉案件统计
    $.ajax({
        url: request_url + 'sfGraph/graph2',
        data: {
            //接口设定的参数名称
            compName: companyName,
            startTime: '1900',
            stopTime: new Date().getFullYear()
        },
        type: 'POST',
        timeout: 120000,
        cache: false,
        dataType: 'json',
        success: function (data) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph2 success")
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPHISTORYDATA', data);
            // console.log("store.state.compHistoryData");
            // console.log(store.state.compHistoryData);
            // 渲染公司司法历年曲线图
            renderLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人个数和已不披露的被执行人总个数曲线图
            renderExecutedLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人的执行标的总额和已不披露的被执行人的执行标的总额曲线图
            renderExecutedTotalLineChart(store.state.compHistoryData);
        },
        error: function (error) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })

    // $.ajax({
    //     url:'sfGraph/graph3',
    //     data:{
    //         //接口设定的参数名称
    //         compName:companyName,
    //         startTime: '2000',
    //         stopTime:'2016'
    //     },
    //     type:'POST',
    //     timeout: 120000,
    //     cache:false,  
    //     dataType: 'json',
    //     success:function(data){
    //         console.log("graph3 success")
    //         console.log(data);
    //     },
    //     error: function(error){
    //         console.log(error);
    //         // alert('网络忙，请稍后再试');
    //     }
    // })

    // 全部案由统计
    $.ajax({
        url: request_url + 'sfGraph/graph4',
        data: {
            //接口设定的参数名称
            compName: companyName
        },
        type: 'POST',
        timeout: 120000,
        cache: false,
        dataType: 'json',
        success: function (data) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph4 success")
            // console.log(data);
            // 将数据推入数据仓库中
            if (data.length <= 0) {
                $("#treemapContainer").addClass("empty_panorama");
            }
            store.dispatch('REFRESHCOMPCASETYPE', data);
            // console.log("store.state.compCaseType");
            // console.log(store.state.compCaseType);
            // 渲染所涉及的案由所对应的案件个数
            matrixTree(store.state.compCaseType, 'treemapContainer');
        },
        error: function (error) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
    // 案件地域分布统计
    $.ajax({
        url: request_url + 'sfGraph/graph37',
        data: {
            //接口设定的参数名称
            compName: companyName
        },
        type: 'POST',
        timeout: 120000,
        cache: false,
        dataType: 'json',
        success: function (data) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("案件地域分布统计 success")
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPCASEGEO', data);
            // console.log("store.state.compCaseType");
            // console.log(store.state.compCaseType);
            // 渲染地图组件
            renderMap(store.state.compCaseGeo);
        },
        error: function (error) {
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
}

/*== end ajax获取数据 ======================================================*/

/*== start 监听案由所对应案件个数select表单值得变化 ================================*/
function closeMapClick() {
    hideMouseTooltip();
    d3.select('#treemapContainerM svg').remove();
    var selectedVal = $("#selectYearM").children('option:selected').val();
    if (selectedVal == $("#selectYear").children('option:selected').val()) {

    } else {
        $("#selectYear").children("option").each(function () {
            if (selectedVal == $(this).val()) {
                $("#selectYear").children('option:selected').attr("selected", false);
                $(this).attr("selected", true);
                return;
            }
        })
    }
    matrixTree(store.state.compCaseType, 'treemapContainer', true);
}


function selectChange(id, that) {
    hideMouseTooltip();
    var selectedVal = $(that).children('option:selected').val();

    if (selectedVal == 'All' && searchCompName != '') {
        $.ajax({
            url: request_url + 'sfGraph/graph4',
            data: {
                //接口设定的参数名称
                compName: searchCompName
            },
            type: 'POST',
            timeout: 120000,
            cache: false,
            dataType: 'json',
            success: function (data) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                // console.log("graph4 success")
                // console.log(data);
                // 将数据推入数据仓库中
                store.dispatch('REFRESHCOMPCASETYPE', data);
                // console.log("store.state.compCaseType");
                // console.log(store.state.compCaseType);
                // 渲染所涉及的案由所对应的案件个数
                matrixTree(store.state.compCaseType, id);
            },
            error: function (error) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                console.log(error);
                // alert('网络忙，请稍后再试');
            }
        })
    } else if (searchCompName != '') {
        $.ajax({
            url: request_url + 'sfGraph/graph3',
            data: {
                //接口设定的参数名称
                compName: searchCompName,
                startTime: selectedVal,
                stopTime: selectedVal
            },
            type: 'POST',
            timeout: 120000,
            cache: false,
            dataType: 'json',
            success: function (data) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                // console.log("graph3 success")
                // console.log(data);
                // 将数据推入数据仓库中
                store.dispatch('REFRESHCOMPCASETYPE', data);
                // 渲染所涉及的案由所对应的案件个数
                matrixTree(store.state.compCaseType, id);
            },
            error: function (error) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                console.log(error);
                // alert('网络忙，请稍后再试');
            }
        })
    }
}

function selectYearChange() {
    hideMouseTooltip();
    $('#loadingAnimation').show();
    var that = $("#selectYear");
    selectChange('treemapContainer', that);
}

function selectYearForMapChange() {
    hideMouseTooltip();
    var that = $("#selectYearForMap");
    var selectedVal = $(that).children('option:selected').val();
    if (selectedVal == 'All' && searchCompName != '') {
        // 加载动画
        $('#loadingAnimation').show();
        $.ajax({
            url: request_url + 'sfGraph/graph37',
            data: {
                //接口设定的参数名称
                compName: searchCompName
            },
            type: 'POST',
            timeout: 120000,
            cache: false,
            dataType: 'json',
            success: function (data) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                // console.log("案件地域分布统计 success")
                // console.log(data);
                // 将数据推入数据仓库中
                store.dispatch('REFRESHCOMPCASEGEO', data);
                // console.log("store.state.compCaseType");
                // console.log(store.state.compCaseType);
                // 渲染地图组件
                renderMap(store.state.compCaseGeo);
            },
            error: function (error) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                console.log(error);
                // alert('网络忙，请稍后再试');
            }
        })
    } else if (searchCompName != '') {
        // 加载动画
        $('#loadingAnimation').show();
        $.ajax({
            url: request_url + 'sfGraph/graph38',
            data: {
                //接口设定的参数名称
                compName: searchCompName,
                startTime: selectedVal,
                stopTime: selectedVal
            },
            type: 'POST',
            timeout: 120000,
            cache: false,
            dataType: 'json',
            success: function (data) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                // console.log("案件地域分布统计 success")
                // console.log(data);
                // 将数据推入数据仓库中
                store.dispatch('REFRESHCOMPCASEGEOPY', data);
                // console.log("store.state.compCaseType");
                // console.log(store.state.compCaseType);
                // 渲染地图组件
                renderMap(store.state.compCaseGeoPY);
            },
            error: function (error) {
                // 清除加载动画
                $('#loadingAnimation').hide();
                console.log(error);
                // alert('网络忙，请稍后再试');
            }
        })
    }
}

function expandMatrixTreeClick() {
    hideMouseTooltip();
    // 渲染所涉及的案由所对应的案件个数
    setTimeout(function () {
        var selectedVal = $("#selectYear").children('option:selected').val();
        if (selectedVal == $("#selectYearM").children('option:selected').val()) {

        } else {
            $("#selectYearM").children("option").each(function () {
                if (selectedVal == $(this).val()) {
                    $("#selectYearM").children('option:selected').attr("selected", false);
                    $(this).attr("selected", true);
                    return;
                }
            })
        }
        matrixTree(store.state.compCaseType, 'treemapContainerM', true);
    }, 300);
}

function selectYearMChange() {
    hideMouseTooltip();
    var that = $("#selectYearM");
    selectChange('treemapContainerM', that);
}

function hideMouseTooltip() {
    // mouseTooltip.style("opacity", 0)
    //     .style("left", -1000+'px')
    //     .style('top', -1000+'px');
    d3.selectAll('.mouseTooltipForMatrixTree').style("opacity", 0)
        .style("left", -1000 + 'px')
        .style('top', -1000 + 'px');
}

function listenSelectChange() {

    // $("#selectYear").change(function(){
    //     // 加载动画
    //     $('#loadingAnimation').show();
    //     var that = this;
    //     selectChange('treemapContainer',that);
    // });
    // //地图组件按年展示
    // $("#selectYearForMap").change(function(){
    //     var selectedVal = $(this).children('option:selected').val();

    //     if(selectedVal=='All' && searchCompName!=''){
    //         // 加载动画
    //         $('#loadingAnimation').show();
    //         $.ajax({
    //             url:request_url+'sfGraph/graph37',
    //             data:{
    //                 //接口设定的参数名称
    //                 compName:searchCompName
    //             },
    //             type:'POST',
    //             timeout: 120000,
    //             cache:false,  
    //             dataType: 'json',
    //             success:function(data){
    //                 // 清除加载动画
    //                 $('#loadingAnimation').hide();
    //                 // console.log("案件地域分布统计 success")
    //                 // console.log(data);
    //                 // 将数据推入数据仓库中
    //                 store.dispatch('REFRESHCOMPCASEGEO',data);
    //                 // console.log("store.state.compCaseType");
    //                 // console.log(store.state.compCaseType);
    //                 // 渲染地图组件
    //                 renderMap(store.state.compCaseGeo);
    //             },
    //             error: function(error){
    //                 // 清除加载动画
    //                 $('#loadingAnimation').hide();
    //                 console.log(error);
    //                 // alert('网络忙，请稍后再试');
    //             }
    //         })
    //     }else if(searchCompName!=''){
    //         // 加载动画
    //         $('#loadingAnimation').show();
    //         $.ajax({
    //             url:request_url+'sfGraph/graph38',
    //             data:{
    //                 //接口设定的参数名称
    //                 compName:searchCompName,
    //                 startTime: selectedVal,
    //                 stopTime: selectedVal
    //             },
    //             type:'POST',
    //             timeout: 120000,
    //             cache:false,  
    //             dataType: 'json',
    //             success:function(data){
    //                 // 清除加载动画
    //                 $('#loadingAnimation').hide();
    //                 // console.log("案件地域分布统计 success")
    //                 // console.log(data);
    //                 // 将数据推入数据仓库中
    //                 store.dispatch('REFRESHCOMPCASEGEOPY',data);
    //                 // console.log("store.state.compCaseType");
    //                 // console.log(store.state.compCaseType);
    //                 // 渲染地图组件
    //                 renderMap(store.state.compCaseGeoPY);
    //             },
    //             error: function(error){
    //                 // 清除加载动画
    //                 $('#loadingAnimation').hide();
    //                 console.log(error);
    //                 // alert('网络忙，请稍后再试');
    //             }
    //         })
    //     }
    // })
    // $('#expandMatrixTree').click(function(){
    //     //console.log('expandMatrixTree click');
    //     // 渲染所涉及的案由所对应的案件个数
    //     setTimeout(function(){
    //         matrixTree(store.state.compCaseType,'treemapContainerM',true);
    //     }, 300);
    // })
    // $("#selectYearM").change(function(){
    //     var that = this;
    //     selectChange('treemapContainerM',that);
    // });
}
/*== end 监听案由所对应案件个数select表单值得变化 ==================================*/

/*== start 渲染矩阵树图 =======================================================*/
function matrixTree(data, treeId, second) {
    //== 每次渲染矩阵树图时先清除上一次的绘图
    d3.select('#' + treeId + ' svg').remove();
    hideMouseTooltip();
    if (data.length == 0) {
        return;
    }

    // console.log("matrixTree");
    // console.log(data);

    /*== 递归将处理数据===========================================*/
    function toTreeMapData(treeMapData, tempData, sizeNum) {
        ++index;
        if (index != tempData.length) {
            if (treeMapData.children.length != 0) {
                for (var i = 0; i < treeMapData.children.length; i++) {
                    if (treeMapData.children[i].name == tempData[index - 1]) {
                        continue;
                    } else if (i == treeMapData.children.length - 1) {
                        treeMapData.children.push({ 'name': tempData[index - 1], 'children': [] });
                    }
                }
            } else {
                treeMapData.children.push({ 'name': tempData[index - 1], 'children': [] });
            }
            var tempTreeMapData = null;
            for (var i = 0; i < treeMapData.children.length; i++) {
                if (treeMapData.children[i].name == tempData[index - 1]) {
                    tempTreeMapData = treeMapData.children[i];
                    continue;
                }
            }
            toTreeMapData(tempTreeMapData, tempData, sizeNum);
        } else {
            treeMapData.children.push({ 'name': tempData[index - 1], 'size': sizeNum });
        }
    }
    /*=============================================*/
    var treeMapData = {
        'name': data[0].company,
        'children': []
    };
    var sizeNum = 0;
    var tempData = [];
    var index = 0;
    for (var i = 0; i < data.length; i++) {
        sizeNum = data[i].ayzs || data[i].mnayzs;
        tempData = data[i].causename.split('->');
        tempData[tempData.length - 1] = tempData[tempData.length - 1] + ' ';
        index = 0;
        toTreeMapData(treeMapData, tempData, sizeNum);
    }
    // console.log('=== 转换结束后的数据 ===');
    // console.log(treeMapData);

    // 生成鼠标提示框


    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = document.getElementById(treeId).offsetWidth - margin.left - margin.right,
        height = document.getElementById(treeId).offsetHeight - margin.top - margin.bottom;

    var color = d3.scale.category20();
    var svg = d3.select('#' + treeId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var partition = d3.layout.partition()
        .size([width - 11, height - 11])
        .value(function (d) { return d.size; });

    var nodes = partition.nodes(treeMapData);
    // console.log('treeMapData');
    // console.log(treeMapData);
    // console.log(nodes);
    var nodeClass = second ? 'nodeM' : 'node';
    var lableClass = second ? 'labelM' : 'label';
    var labelBigClass = second ? 'labelBigM' : 'labelBig';

    svg.selectAll("." + nodeClass)
        .data(nodes)
        .enter()
        .append("rect")
        .attr("class", nodeClass)
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .attr("width", function (d) { return d.dx; })
        .attr("height", function (d) { return d.dy; })
        .style('stroke', '#fff')
        .style('stroke-width', '1px')
        .style("fill", function (d) { return color((d.children ? d : d.parent).name); })
        .on('mouseover', function (d) {
            d3.select(this).style('fill', 'orange');
            // showMouseTooltip(d);
        })
        .on('mousemove', function (d) {
            showMouseTooltip(d);
        })
        // .on('mouseup', function(d){
        //     showMouseTooltip(d);
        // })
        .on('mouseout', function (d) {
            d3.select(this).style('fill', function (d) { return color((d.children ? d : d.parent).name); });
            hideMouseTooltip();
        })

    svg.selectAll("." + lableClass)
        .data(nodes.filter(function (d) { return d.dx > 6; }))
        .enter().append("text")
        .attr("class", function (d, i) {
            if (d.depth == 0) {
                return labelBigClass;
            } else {
                return lableClass;
            }
        })
        .attr("dy", ".35em")
        // .attr("transform", function(d) { return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")rotate(90)"; })
        .attr("transform", function (d) {
            if (d.dx > d.name.length * 12 || d.dx > d.dy) {
                return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")";
            } else {
                return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")rotate(90)";
            }
        })
        .attr("pointer-events", function (d) { return "none" })
        .text(function (d) {
            // var name = d.name.replace(/(.{8})/g,'<tspan>$1</tspan>'); 
            // console.log("name:"+name);
            if (d.dx > 10 && (d.dx > d.name.length * 10 || d.dy > d.name.length * 10)) {
                return d.name;
            } else {
                return '';
            }
        });

    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", function () {
                var PageWidth = document.body.clientWidth;
                if (PageWidth - d3.event.pageX < (d.name.length * 15 + 40)) {
                    return (d3.event.pageX - d.name.length * 15 - 30) + "px";
                } else {
                    return (d3.event.pageX + 10) + "px";
                }
            })
            .style("top", (d3.event.pageY - 60) + "px")
            .style('width', d.name.length * 15 + 20 + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        // mouseTooltip.style("opacity", 0)
        //     .style("left", -1000+'px')
        //     .style('top', -1000+'px');
        d3.selectAll('.mouseTooltipForMatrixTree').style("opacity", 0)
            .style("left", -1000 + 'px')
            .style('top', -1000 + 'px');
    }
    //start 生成提示框内容
    function generateMouseTooltipContent(d) {
        var htmlContent = '';

        htmlContent += "<span>" + d.name + "</span>";
        htmlContent += "<span>" + d.value + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============
}
/*== end 渲染矩阵树图 =========================================================*/

/*== start 渲染事件地图 ===========================================*/

function renderMap(data) {
    if (data.hasOwnProperty('dqzs')) {
        data.sort(compare('dqzs'));
    } else {
        data.sort(compare('mndqzs'));
    }

    if (data.length > 0) {
        data.forEach(function (d, i) {
            d.geo = province[d.geo];
            d.dqzs = d.dqzs || d.mndqzs || d.cnt;
        })
    }
    echart.echart_map("mapArea", data);
}

/*== end 渲染事件地图 =========================================================*/

/*== start 渲染饼图(各类案件总数比例) ===========================================*/
function renderPie(data) {
    // 生成鼠标提示框
    //var mouseTooltip = createMouseTooltip('mouseTooltipForMatrixTree');
    var Donut3D = function () {
        var Donut3D = {};

        function pieTop(d, rx, ry, ir) {
            if (d.endAngle - d.startAngle == 0) return "M 0 0";
            var sx = rx * Math.cos(d.startAngle),
                sy = ry * Math.sin(d.startAngle),
                ex = rx * Math.cos(d.endAngle),
                ey = ry * Math.sin(d.endAngle);

            var ret = [];
            ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
            ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
            return ret.join(" ");
        }

        function pieOuter(d, rx, ry, h) {
            var startAngle = (d.startAngle > Math.PI ? Math.PI : d.startAngle);
            var endAngle = (d.endAngle > Math.PI ? Math.PI : d.endAngle);

            var sx = rx * Math.cos(startAngle),
                sy = ry * Math.sin(startAngle),
                ex = rx * Math.cos(endAngle),
                ey = ry * Math.sin(endAngle);

            var ret = [];
            ret.push("M", sx, h + sy, "A", rx, ry, "0 0 1", ex, h + ey, "L", ex, ey, "A", rx, ry, "0 0 0", sx, sy, "z");
            return ret.join(" ");
        }

        function pieInner(d, rx, ry, h, ir) {
            var startAngle = (d.startAngle < Math.PI ? Math.PI : d.startAngle);
            var endAngle = (d.endAngle < Math.PI ? Math.PI : d.endAngle);

            var sx = ir * rx * Math.cos(startAngle),
                sy = ir * ry * Math.sin(startAngle),
                ex = ir * rx * Math.cos(endAngle),
                ey = ir * ry * Math.sin(endAngle);

            var ret = [];
            ret.push("M", sx, sy, "A", ir * rx, ir * ry, "0 0 1", ex, ey, "L", ex, h + ey, "A", ir * rx, ir * ry, "0 0 0", sx, h + sy, "z");
            return ret.join(" ");
        }

        function pieBottom(d, rx, ry, h, ir) {
            if (d.endAngle - d.startAngle == 0) return "M 0 0";
            var sx = (rx - h / 2) * Math.cos(d.startAngle),
                sy = (ry - h) * Math.sin(d.startAngle),
                ex = (rx - h / 2) * Math.cos(d.endAngle),
                ey = (ry - h) * Math.sin(d.endAngle);

            var ret = [];
            ret.push("M", sx, sy, "A", rx, ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "1", ex, ey, "L", ir * ex, ir * ey);
            ret.push("A", ir * rx, ir * ry, "0", (d.endAngle - d.startAngle > Math.PI ? 1 : 0), "0", ir * sx, ir * sy, "z");
            return ret.join(" ");
        }

        function getPercent(d) {
            return (d.endAngle - d.startAngle > 0.2 ?
                Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 + '%' : '');
        }
        function getPercentValue(d) {
            return (d.endAngle - d.startAngle > 0.2 ?
                Math.round(1000 * (d.endAngle - d.startAngle) / (Math.PI * 2)) / 10 : 0);
        }
        Donut3D.transition = function (id, data, rx, ry, h, ir) {
            function arcTweenInner(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) { return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir); };
            }
            function arcTweenTop(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) { return pieTop(i(t), rx, ry, ir); };
            }
            function arcTweenOuter(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) { return pieOuter(i(t), rx - .5, ry - .5, h); };
            }
            function textTweenX(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) { return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle)); };
            }
            function textTweenY(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) { return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle)); };
            }

            var _data = d3.layout.pie().sort(null).value(function (d) { return d.value; })(data);

            d3.select("#" + id).selectAll(".innerSlice").data(_data)
                .transition().duration(750).attrTween("d", arcTweenInner);

            d3.select("#" + id).selectAll(".topSlice").data(_data)
                .transition().duration(750).attrTween("d", arcTweenTop);

            d3.select("#" + id).selectAll(".outerSlice").data(_data)
                .transition().duration(750).attrTween("d", arcTweenOuter);

            d3.select("#" + id).selectAll(".percent").data(_data).transition().duration(750)
                .attrTween("x", textTweenX).attrTween("y", textTweenY).text(getPercent);
        }

        Donut3D.draw = function (id, data, x /*center x*/, y/*center y*/,
            rx/*radius x*/, ry/*radius y*/, h/*height*/, ir/*inner radius*/) {

            var _data = d3.layout.pie().sort(null).value(function (d) { return d.value; })(data);

            var slices = d3.select("#" + id).append("g").attr("transform", "translate(" + x + "," + y + ")")
                .attr("class", "slices");

            // slices.selectAll(".bottomSlice").data(_data).enter().append("path").attr("class", "bottomSlice")
            //     .style("fill", function(d) { return d.data.color; })
            //     .style("fill-opacity",function(d){return d.data.opacity||1})
            //     // .style("stroke", function(d) { return d.data.color; })
            //     // .style("stroke-opacity",function(d){return d.data.opacity||1})
            //     .attr("d",function(d){ return pieBottom(d, rx, ry, h,ir);})
            //     .each(function(d){this._current=d;});

            slices.selectAll(".innerSlice").data(_data).enter().append("path").attr("class", "innerSlice")
                .style("fill", function (d) { return d3.hsl(d.data.color).darker(0.7); })
                //.style("fill-opacity",function(d){return d.data.opacity||1})
                .attr("d", function (d) { return pieInner(d, rx + 0.5, ry + 0.5, h, ir); })
                .each(function (d) { this._current = d; });

            slices.selectAll(".topSlice").data(_data).enter().append("path").attr("class", "topSlice")
                .style("fill", function (d) { return d.data.color; })
                .style("fill-opacity", function (d) { return d.data.opacity || 1 })
                //.style("stroke", function(d) { return d.data.color; })
                // .style("stroke-opacity",function(d){return d.data.opacity||1})
                .attr("d", function (d) { return pieTop(d, rx, ry, ir); })
                .each(function (d) { this._current = d; })
                .on('mousemove', function (d) {
                    showMouseTooltip(d);
                })
                .on('mouseout', function (d) {
                    hideMouseTooltip();
                });

            slices.selectAll(".outerSlice").data(_data).enter().append("path").attr("class", "outerSlice")
                .style("fill", function (d) { return d3.hsl(d.data.color).darker(0.7); })
                .style("fill-opacity", function (d) { return d.data.opacity || 1 })
                .attr("d", function (d) { return pieOuter(d, rx - .5, ry - .5, h); })
                .each(function (d) { this._current = d; })
                .on('mousemove', function (d) {
                    showMouseTooltip(d);
                })
                .on('mouseout', function (d) {
                    hideMouseTooltip();
                });

            slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
                .attr("x", function (d) { return 0.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle)) - d.data.font.font; })
                .attr("y", function (d) { return 0.7 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle)); })
                .style("fill", function (d) { return d.data.fontColor })
                .attr("pointer-events", function (d) { return "none" })
                .style("font-size", function (d) { return d.data.font.font })
                .style("font-weight", function (d) { return d.data.font.fontWeight })
                .text(getPercent).each(function (d) { this._current = d; });
        }

        //== start mouse tooltip ===========
        //出现提示框
        function showMouseTooltip(d) {
            mouseTooltip.style("opacity", 1)
                .style('z-index', 9999);
            mouseTooltip.html(generateMouseTooltipContent(d))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        }

        // 隐藏提示框
        function hideMouseTooltip() {
            mouseTooltip.style("opacity", 0)
                .style("left", -1000 + "px")
                .style("top", -1000 + "px");
        }
        //start 生成提示框内容
        function generateMouseTooltipContent(d) {
            var htmlContent = '';
            htmlContent += "<span>" + d.data.label + "</span><span>" + d.data.value + "件</span>";
            return htmlContent;
        }
        //end 生成提示框内容
        //== end mouse tooltip =============

        //this.Donut3D = Donut3D;
        return Donut3D;
    }();

    if ($("#classify-ratio").hasClass("empty_panorama")) {
        return;
    }

    data.total = data.accuserSum
        + data.otherSum
        + data.accusedSum
        + data.thirdPersonSum
        + data.appealPersonSum
        + data.appealedPersonSum
        + data.retrialApplicationSum
        + data.applyExecutionSum
        + data.beExecutedSum
        + data.beAppealedSum;
    var salesData = [
        { label: "原告", opacity: 1, color: "#8ce4e2", value: data.accuserSum, percent: data.accuserSum / (data.total) },
        { label: "被告", opacity: 1, color: "#ec5a67", value: data.accusedSum, percent: data.accusedSum / (data.total) },
        { label: "第三人", opacity: 1, color: "#fec414", value: data.thirdPersonSum, percent: data.thirdPersonSum / (data.total) },
        { label: "上诉人", opacity: 1, color: "#ebe60c", value: data.appealPersonSum, percent: data.appealPersonSum / (data.total) },
        { label: "被上诉人", opacity: 1, color: "#38b2eb", value: data.appealedPersonSum, percent: data.appealedPersonSum / (data.total) },
        { label: "再审申请人", opacity: 1, color: "#f329c8", value: data.retrialApplicationSum, percent: data.retrialApplicationSum / (data.total) },
        { label: "申请执行人", opacity: 1, color: "#91da0e", value: data.applyExecutionSum, percent: data.applyExecutionSum / (data.total) },
        { label: "被执行人", opacity: 1, color: "#1bcc84", value: data.beExecutedSum, percent: data.beExecutedSum / (data.total) },
        { label: "被申请人", opacity: 1, color: "#fa682f", value: data.beAppealedSum, percent: data.beAppealedSum / (data.total) },
        { label: "其他", opacity: 1, color: "#a38eff", value: data.otherSum, percent: data.otherSum / (data.total) },
    ];
    // var salesData=[
    //     {label:"原告", color:"#8ce4e2",value:1000*Math.random()},
    //     {label:"被告", color:"#ec5a67",value:1000*Math.random()},
    //     {label:"申请执行人", color:"#91da0e",value:1000*Math.random()}
    // ];
    // var salesData=[
    //     {label:"原告",opacity:1, color:"#8ce4e2",value:1000*Math.random()},
    //     {label:"被告", opacity:1,color:"#ec5a67",value:1000*Math.random()},
    //     {label:"第三人",opacity:1, color:"#91da0e",value:1000*Math.random()},
    //     {label:"上诉人",opacity:1, color:"#ebe60c",value:1000*Math.random()},
    //     {label:"被上诉人",opacity:1, color:"#38b2eb",value:1000*Math.random()},
    //     {label:"再审申请人",opacity:1, color:"#f329c8",value:1000*Math.random()},
    //     {label:"申请执行人",opacity:1, color:"#fec414",value:1000*Math.random()},
    //     {label:"被执行人",opacity:1, color:"#1bcc84",value:1000*Math.random()},
    // ];
    // var total=salesData[0].value+salesData[1].value+salesData[2].value+salesData[3].value+salesData[4].value+salesData[5].value+salesData[6].value+salesData[7].value;
    function fontData(value) {
        var model = { font: 0, fontWeight: 500 };
        if (value > 0.25) {
            model.fontWeight = 700;
        }
        var pointA = [0.1, 12];
        var pointB = [0.7, 28];
        var pointC = [1, 32];
        var a = ((pointA[0] - pointB[0]) * (pointC[1] - pointA[1]) - (pointC[0] - pointA[0]) * (pointA[1] - pointB[1])) / ((pointA[0] - pointB[0]) * (pointB[0] - pointC[0]) * (pointC[0] - pointA[0]));
        var b = (pointA[1] - pointB[1] - a * (pointA[0] * pointA[0] - pointB[0] * pointB[0])) / (pointA[0] - pointB[0]);
        var c = pointA[1] - a * pointA[0] * pointA[0] - b * pointA[0];
        model.font = a * value * value + b * value + c;
        if (value >= 1) {
            model.font = 32;
        }
        return model;
    }
    function randomData() {
        return salesData.map(function (d) {
            var model = { label: d.label, opacity: d.opacity, value: d.value, color: d.color, fontColor: "#ffffff", font: fontData(d.percent) };
            return model;
        });
    }

    var margin = { top: 10, right: 10, bottom: 10, left: 10 },
        width = document.getElementById("classify-ratio").offsetWidth - margin.left - margin.right,
        height = document.getElementById("classify-ratio").offsetHeight - margin.top - margin.bottom;

    var svg = d3.select("#classify-ratio").append("svg").attr("width", "100%").attr("height", "100%");
    svg.append("g").attr("id", "quotesDonut");
    Donut3D.draw("quotesDonut", randomData(), 182, 150, 120, 60, 30, 0);

    //== 画图例
    var legend = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var legendRect = legend.selectAll('.pieLegendRect')
        .data(salesData)
        .enter()
        .append('circle')
        .attr('r', function (d) {
            return 4;
        })
        .attr('cx', function (d, i) {
            return 400;
        })
        .attr('cy', function (d, i) {
            return 29 * i + 15;
        })
        .attr('class', 'pieLegendRect')
        .attr('width', 15)
        .attr('height', 15)
        .style('fill', function (d, i) {
            return d.color;
        })
        .style("fill-opacity", function (d) { return d.opacity || 1 })
    var legendText = legend.selectAll('.pieLegendText')
        .data(salesData)
        .enter()
        .append('text')
        .attr('class', 'pieLegendText')
        .attr('x', 414)
        .attr('y', function (d, i) {
            return 29 * i + 15;
        })
        .attr('dy', 5)
        .style("font-size", 14)
        .style("fill", "#333333")
        .text(function (d) {
            return d.label;
        })

}
/*== end 渲染饼图(各类案件总数比例) =============================================*/

/*== start 渲染折线图(每年案件统计) =============================================*/
function renderLineChart(rawData) {
    var data = {
        days: [],
        data: [[], [], []]
    };
    var date = new Date;
    var year = date.getFullYear();
    var last_year = null;
    if (rawData.length > 0) {
        rawData.forEach(function (d, i) {
            while (last_year != null && last_year < d.nf - 1) {
                data.days.push(++last_year);
                data.data[0].push(0);
                data.data[1].push(0);
                data.data[2].push(0);
            }
            data.days.push(d.nf);
            data.data[0].push(d.mnajzs || 0);
            data.data[1].push(d.mnygzs || 0);
            data.data[2].push(d.mnbgzs || 0);
            last_year = d.nf;
        })
        while (data.days[data.days.length - 1] < year) {
            data.days.push(year);
            data.data[0].push(0);
            data.data[1].push(0);
            data.data[2].push(0);
        }
    } else {
        for (var i = 1; i >= 0; i--) {
            data.days.push(year - i);
            data.data[0].push(0);
            data.data[1].push(0);
            data.data[2].push(0);
        }
    }

    //== 每次渲染折线图时先清除上一次的绘图
    //d3.select("#polylineContainer svg").remove();
    echart.echart_line_case("lineCase", data);
}
/*== end 渲染折线图(每年案件统计) ===============================================*/

/*== start 渲染折线图(每年被执行人个数统计) =====================================================*/
function renderExecutedLineChart(rawData) {
    var data = {
        days: [],
        data: []
    };
    var date = new Date;
    var year = date.getFullYear();
    var last_year = null;
    if (rawData.length > 0) {
        rawData.forEach(function (d, i) {
            while (last_year != null && last_year < d.nf - 1) {
                data.days.push(++last_year);
                data.data.push(0);
            }
            data.days.push(d.nf);
            data.data.push(d.mnzxzs || 0);
            last_year = d.nf;
        })
        while (data.days[data.days.length - 1] < year) {
            data.days.push(year);
            data.data.push(0);
        }
    } else {

        for (var i = 1; i >= 0; i--) {
            data.days.push(year - i);
            data.data.push(0);
        }
    }

    //== 每次渲染折线图时先清除上一次的绘图
    //d3.select("#polylineContainer svg").remove();
    echart.echart_line_executed("lineExecuted", data);
}
/*== end 渲染折线图(每年被执行人个数统计) ===============================================*/

/*== start 渲染折线图(每年执行标的总额统计) =====================================================*/
function renderExecutedTotalLineChart(rawData) {
    var data = {
        days: [],
        data: []
    };
    var date = new Date;
    var year = date.getFullYear();
    var last_year = null;
    if (rawData.length > 0) {
        rawData.forEach(function (d, i) {
            while (last_year != null && last_year < d.nf - 1) {
                data.days.push(++last_year);
                data.data.push(0);
            }
            data.days.push(d.nf);
            data.data.push(d.mnbdze || 0);
            last_year = d.nf;
        })
        while (data.days[data.days.length - 1] < year) {
            data.days.push(year);
            data.data.push(0);
        }
    } else {
        var date = new Date;
        var year = date.getFullYear();
        for (var i = 1; i >= 0; i--) {
            data.days.push(year - i);
            data.data.push(0);
        }
    }
    //== 每次渲染折线图时先清除上一次的绘图
    //d3.select("#polylineContainer svg").remove();
    echart.echart_line_sum("lineSum", data);
}
/*== end 渲染折线图(每年执行标的总额统计) ===============================================*/

/*== start 定义所需的函数 =====================================================*/
// 创建鼠标经过目标图形，出现div信息框
// styleClass: div样式
function createMouseTooltip(styleClass) {
    var mouseTooltip = d3.select("body")
        .append("div")
        .attr("class", styleClass)
        .style("opacity", 0);

    return mouseTooltip;
}

// 按对象属性排序比较函数
function compare(propertyName) {
    return function (object1, object2) {
        var value1 = object1[propertyName];
        var value2 = object2[propertyName];
        if (value2 > value1) {
            return -1;
        } else if (value2 < value1) {
            return 1;
        } else {
            return 0;
        }
    }
}
/*== end 定义所需的函数 =======================================================*/