import $ from 'jquery';
import d3 from 'd3';
import Vue from 'vue';
// import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routerMap from './modules/routerMap'; // 引入路由表

//vuex状态管理
import store from './vuex/store' // import 我们刚刚创建的 store

import Navbtp from './components/Navbtp.vue';
Vue.use(VueRouter);

require("bootstrap-webpack");
require("./css/develop3.css");
require("./css/scatter.css");
require("./css/lineChart.css");
require("./css/treemap.css");

/*== start 测试区 ==========================================================*/
setInterval(function(){
    // console.log("setInterval");
    store.dispatch('INCREMENT',1)
    // store.state.count+=1;
    // console.log(store.state.count);
}, 1000);

/*== end 测试区 ============================================================*/

/*== start 全局设置 ========================================================*/
//== 存储路由切换后需要重新渲染图所需要的数据
var dataStore = createDataStore('dataStore');

//== 保存搜索公司名称
var searchCompName = '';

//== 各省省名缩写
var province = {"新疆维吾尔自治区":"新疆","西藏自治区":"西藏","内蒙古自治区":"内蒙古","青海省":"青海","四川省":"四川","黑龙江省":"黑龙江","甘肃省":"甘肃","云南省":"云南","广西壮族自治区":"广西","湖南省":"湖南","陕西省":"陕西","广东省":"广东","吉林省":"吉林","河北省":"河北","湖北省":"湖北","贵州省":"贵州","山东省":"山东","江西省":"江西","河南省":"河南","辽宁省":"辽宁","山西省":"山西","安徽省":"安徽","福建省":"福建","浙江省":"浙江","江苏省":"江苏","重庆市":"重庆","宁夏回族自治区":"宁夏","海南省":"海南","台湾":"台湾","北京市":"北京","天津市":"天津","上海市":"上海","香港":"香港","澳门":"澳门"}

//== 保存案子关联信息
var casesInfos = {};

/*== end 全局设置 ==========================================================*/

/*== end 全局设置 ==========================================================*/
function createDataStore(store) {
    // 存储散点数据
    var store = {};

    // 节点名字堆、关系id堆
    store.nodesIdSet = d3.set();
    store.linksIdSet = d3.set();

    // 初始节点和关系
    store.nodes = [];
    store.links = [];

    // 节点id与nodes字典
    store.idNodesDict = {};

    return store;
}
/*== end 全局设置 ==========================================================*/

/*== start model of mvvm ==================================================*/

// 定义模型
var model = {};

// model数据定义
model.data = {
	searchForm: {
		searchMode: 'single', //搜索模式
        firstSearchBox: '',
	}
}

// model计算属性定义
model.computed = {

}

// model方法定义
model.methods = {
    renderGraphBySearch: renderGraphBySearch, //搜索渲染企业司法统计数据
}

// model事件定义
model.events = {
    'renderGraphBySearchData': 'renderGraphBySearch', ////搜索渲染企业司法统计数据
}

/*== end model of mvvm ====================================================*/

/*== start vm of mvvm =====================================================*/
var navVm = new Vue({
    el: '.navContainer',
    components: {
        Navbtp, //导航栏
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
/*== end vm of mvvm =======================================================*/

/*== start Vue-router =====================================================*/
var vmode = {};

// model数据定义
vmode.data = {
    abc:'hello root'
}

// vmode计算属性定义
vmode.computed = {

}

// vmode方法定义
vmode.methods = {
    toggleAxis: toggleAxis, //搜索渲染企业司法统计数据
}

// vmode事件定义
vmode.events = {
    'toggleAxisCalled': 'toggleAxis', ////搜索渲染企业司法统计数据
}

// 路由器需要一个根组件。
var App = Vue.extend({
    data (){
        return vmode.data;
    },
    methods: vmode.methods,
    computed: vmode.computed,
    events: vmode.events,
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

/*== start 页面加载完成运行 ==================================================*/
$(document).ready(function(){
    // router.go("/");
    //监听select值的变化
    listenSelectChange();

    let compName = '';
    let jid = '';
    if(location.hash=='#/' || location.hash=='#/main'){
        jid = getQueryStringArgs().hasOwnProperty('jid')?getQueryStringArgs().jid:'';
        getScatterData(jid);
    }else if(location.hash == '#/overview'){
        compName = getQueryStringArgs().hasOwnProperty('compName')?getQueryStringArgs().compName:'';
        if(compName!=''){
            searchCompName = compName;
            renderCompData(compName);
        }else{
            return;
        }
    }
})
function getQueryStringArgs(){
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
    for (i=0; i < len; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
/*== end 页面加载完成运行 ====================================================*/

/*== start 导航栏搜索触发器 ====================================================*/
function renderGraphBySearch(){
    // 取回搜索框参数
    var searchForm = getSearchParas(this.searchForm);
    // 将搜索公司名称存入全局变量
    searchCompName = searchForm.firstSearchBox;
    // 数据恢复默认设置
    // 将数据推入数据仓库中
    store.dispatch('DEFAULTSETTING', 0);

    if(location.hash == "#/" || location.hash == "#/overview"){
        if(!searchForm.firstSearchBox) {
            alert('请输入查询关键字');
            return;
        } else {
            renderSearchData(searchForm.firstSearchBox); //搜索公司司法维度统计数据
        }
    }
}

//搜索公司司法维度统计数据
function renderSearchData(compName){
    // console.log('搜索公司司法维度统计数据');
    // console.log(compName);
    renderCompData(compName);
}

// 将searchForm参数从model中取回
function getSearchParas(searchForm) {
    return searchForm;
}
/*== end 导航栏搜索触发器 ======================================================*/

/*== start ajax获取数据 ====================================================*/
function renderCompData(companyName){
    // 加载动画
    $('#loadingAnimation').show();
    // 获取公司司法统计数据
    // 涉诉案件统计
    $.ajax({
        url:'sfGraph/graph1',
        data:{
            //接口设定的参数名称
            compName:companyName
        },
        type:'POST',
        timeout: 120000,
        cache:false,  
        dataType: 'json',
        success:function(data){
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph1 success");
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPDATA',data);
            // 渲染公司原告被告比例饼图
            renderPie(store.state.statisticsData);
        },
        error: function(error){
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
    // 历年涉诉案件统计
    $.ajax({
        url:'sfGraph/graph2',
        data:{
            //接口设定的参数名称
            compName:companyName,
            startTime: '1900',
            stopTime:'2016'
        },
        type:'POST',
        timeout: 120000,
        cache:false,  
        dataType: 'json',
        success:function(data){
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph2 success")
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPHISTORYDATA',data);
            // console.log("store.state.compHistoryData");
            // console.log(store.state.compHistoryData);
            // 渲染公司司法历年曲线图
            renderLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人个数和已不披露的被执行人总个数曲线图
            renderExecutedLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人的执行标的总额和已不披露的被执行人的执行标的总额曲线图
            renderExecutedTotalLineChart(store.state.compHistoryData);
        },
        error: function(error){
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })

    // 全部案由统计
    $.ajax({
        url:'sfGraph/graph4',
        data:{
            //接口设定的参数名称
            compName:companyName
        },
        type:'POST',
        timeout: 120000,
        cache:false,  
        dataType: 'json',
        success:function(data){
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("graph4 success")
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPCASETYPE',data);
            // console.log("store.state.compCaseType");
            // console.log(store.state.compCaseType);
            // 渲染所涉及的案由所对应的案件个数
            matrixTree(store.state.compCaseType,'treemapContainer');
        },
        error: function(error){
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
    // 案件地域分布统计
    $.ajax({
        url:'sfGraph/graph37',
        data:{
            //接口设定的参数名称
            compName:companyName
        },
        type:'POST',
        timeout: 120000,
        cache:false,  
        dataType: 'json',
        success:function(data){
            // 清除加载动画
            $('#loadingAnimation').hide();
            // console.log("案件地域分布统计 success")
            // console.log(data);
            // 将数据推入数据仓库中
            store.dispatch('REFRESHCOMPCASEGEO',data);
            // console.log("store.state.compCaseType");
            // console.log(store.state.compCaseType);
            // 渲染地图组件
            renderMap(store.state.compCaseGeo);
        },
        error: function(error){
            // 清除加载动画
            $('#loadingAnimation').hide();
            console.log(error);
            // alert('网络忙，请稍后再试');
        }
    })
}

/*== end ajax获取数据 ======================================================*/

/*== start 导航栏路由控制 ===================================================*/

window.onresize = function(){
    if(location.hash == "#/main"){
        // renderScatter(dataStore);
        if(casesInfos.hasOwnProperty('nodesDetail')){
            handleScatterData(casesInfos,'审判程序');
        }
    }else if(location.hash == "#/" || location.hash == "#/overview"){
        // console.log("onresize");
        renderPie(store.state.statisticsData);
        // 渲染公司司法历年曲线图
        renderLineChart(store.state.compHistoryData);
        // 渲染历年在执行中的被执行人个数和已不披露的被执行人总个数曲线图
        renderExecutedLineChart(store.state.compHistoryData);
        // 渲染历年在执行中的被执行人的执行标的总额和已不披露的被执行人的执行标的总额曲线图
        renderExecutedTotalLineChart(store.state.compHistoryData);
        // 渲染所涉及的案由所对应的案件个数
        matrixTree(store.state.compCaseType,'treemapContainer');
        // 渲染地图组件
        renderMap(store.state.compCaseGeo);
    }else{
        return;
    }
}
//== 检测url hash是否发生变化
var hashchangeTimer = null;
window.onhashchange = function(){
    // console.log("onhashchange is happen");
    clearTimeout(hashchangeTimer);
    if(location.hash == "#/main"){
        hashchangeTimer = setTimeout(function(){
            renderScatter(dataStore);
        }, 100);
    }else if(location.hash == "#/" || location.hash == "#/overview"){
        hashchangeTimer = setTimeout(function(){
            renderPie(store.state.statisticsData);
            // 渲染公司司法历年曲线图
            renderLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人个数和已不披露的被执行人总个数曲线图
            renderExecutedLineChart(store.state.compHistoryData);
            // 渲染历年在执行中的被执行人的执行标的总额和已不披露的被执行人的执行标的总额曲线图
            renderExecutedTotalLineChart(store.state.compHistoryData);
            // 渲染所涉及的案由所对应的案件个数
            matrixTree(store.state.compCaseType,'treemapContainer');
            // 渲染地图组件
            renderMap(store.state.compCaseGeo);

            // listenLiHover();
            //监听select值的变化
            listenSelectChange();
        }, 100);
    }else{
        return;
    }
    return false;
}

var goMainTimer = null;
var goOverviewTimer = null;
$("#goMain").click(function(){
    $("body").css("background-color", "#ffffff");
    router.go("/main");

    // d3.json('../secret/data.json',function(error, data){
    //     var rawData = data.data
    //     loadScatterData(rawData);
    // })

    clearTimeout(goMainTimer);
    goMainTimer = setTimeout(function(){
        // renderScatter(dataStore);
        if(casesInfos.hasOwnProperty('nodesDetail')){
            handleScatterData(casesInfos,'审判程序');
        }
    }, 100);
});
$("#goOverview").click(function(){
    router.go("/overview");

    clearTimeout(goOverviewTimer);
    goOverviewTimer = setTimeout(function(){
        renderPie(store.state.statisticsData);
        // 渲染公司司法历年曲线图
        renderLineChart(store.state.compHistoryData);
        // 渲染历年在执行中的被执行人个数和已不披露的被执行人总个数曲线图
        renderExecutedLineChart(store.state.compHistoryData);
        // 渲染历年在执行中的被执行人的执行标的总额和已不披露的被执行人的执行标的总额曲线图
        renderExecutedTotalLineChart(store.state.compHistoryData);
        // 渲染所涉及的案由所对应的案件个数
        matrixTree(store.state.compCaseType,'treemapContainer');
        // 渲染地图组件
        renderMap(store.state.compCaseGeo);
        // listenLiHover();
        //监听select值的变化
        listenSelectChange();
    }, 100);
});
$("#goList").click(function(){
    router.go("/list");
});
$("#goBar").click(function(){
    router.go("/bar");
});
$("#goFoo").click(function(){
    router.go("/foo");
});

/*== end 导航栏路由控制 =====================================================*/

/*== start js控制被执行人统计样式 ===============================================*/
var listenLiHover = function(){
    $("#lengjing-executed ul").find('li').hover(function(){
        $(this).addClass('box-shadow-show');
        $(this).find('div').removeClass('border-bottom-show');
        $(this).find('.list-executed-info').show();
    },function(){
        $(this).find('div').addClass('border-bottom-show');
        $(this).removeClass('box-shadow-show');
        $(this).find('.list-executed-info').hide();
    })    
}
// listenLiHover();
/*== end js控制被执行人统计样式 =================================================*/

/*== start 监听案由所对应案件个数select表单值得变化 ================================*/
function listenSelectChange(){
    function selectChange(id,that){
        var selectedVal = $(that).children('option:selected').val();
        if(selectedVal=='All' && searchCompName!=''){
            $.ajax({
                url:'sfGraph/graph4',
                data:{
                    //接口设定的参数名称
                    compName:searchCompName
                },
                type:'POST',
                timeout: 120000,
                cache:false,  
                dataType: 'json',
                success:function(data){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    // console.log("graph4 success")
                    // console.log(data);
                    // 将数据推入数据仓库中
                    store.dispatch('REFRESHCOMPCASETYPE',data);
                    // console.log("store.state.compCaseType");
                    // console.log(store.state.compCaseType);
                    // 渲染所涉及的案由所对应的案件个数
                    matrixTree(store.state.compCaseType,id);
                },
                error: function(error){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    console.log(error);
                    // alert('网络忙，请稍后再试');
                }
            })
        }else if(searchCompName!=''){
            $.ajax({
                url:'sfGraph/graph3',
                data:{
                    //接口设定的参数名称
                    compName:searchCompName,
                    startTime: selectedVal,
                    stopTime: selectedVal
                },
                type:'POST',
                timeout: 120000,
                cache:false,  
                dataType: 'json',
                success:function(data){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    // console.log("graph3 success")
                    // console.log(data);
                    // 将数据推入数据仓库中
                    store.dispatch('REFRESHCOMPCASETYPE',data);
                    // 渲染所涉及的案由所对应的案件个数
                    matrixTree(store.state.compCaseType,id);
                },
                error: function(error){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    console.log(error);
                    // alert('网络忙，请稍后再试');
                }
            })
        }
    }
    $("#selectYear").change(function(){
        // 加载动画
        $('#loadingAnimation').show();
        var that = this;
        selectChange('treemapContainer',that);
    });
    //地图组件按年展示
    $("#selectYearForMap").change(function(){
        var selectedVal = $(this).children('option:selected').val();

        if(selectedVal=='All' && searchCompName!=''){
            // 加载动画
            $('#loadingAnimation').show();
            $.ajax({
                url:'sfGraph/graph37',
                data:{
                    //接口设定的参数名称
                    compName:searchCompName
                },
                type:'POST',
                timeout: 120000,
                cache:false,  
                dataType: 'json',
                success:function(data){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    // console.log("案件地域分布统计 success")
                    // console.log(data);
                    // 将数据推入数据仓库中
                    store.dispatch('REFRESHCOMPCASEGEO',data);
                    // console.log("store.state.compCaseType");
                    // console.log(store.state.compCaseType);
                    // 渲染地图组件
                    renderMap(store.state.compCaseGeo);
                },
                error: function(error){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    console.log(error);
                    // alert('网络忙，请稍后再试');
                }
            })
        }else if(searchCompName!=''){
            // 加载动画
            $('#loadingAnimation').show();
            $.ajax({
                url:'sfGraph/graph38',
                data:{
                    //接口设定的参数名称
                    compName:searchCompName,
                    startTime: selectedVal,
                    stopTime: selectedVal
                },
                type:'POST',
                timeout: 120000,
                cache:false,  
                dataType: 'json',
                success:function(data){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    // console.log("案件地域分布统计 success")
                    // console.log(data);
                    // 将数据推入数据仓库中
                    store.dispatch('REFRESHCOMPCASEGEOPY',data);
                    // console.log("store.state.compCaseType");
                    // console.log(store.state.compCaseType);
                    // 渲染地图组件
                    renderMap(store.state.compCaseGeoPY);
                },
                error: function(error){
                    // 清除加载动画
                    $('#loadingAnimation').hide();
                    console.log(error);
                    // alert('网络忙，请稍后再试');
                }
            })
        }
    })
    $('#expandMatrixTree').click(function(){
        console.log('expandMatrixTree click');
        // 渲染所涉及的案由所对应的案件个数
        setTimeout(function(){
            matrixTree(store.state.compCaseType,'treemapContainerM',true);
        }, 300);
    })
    $("#selectYearM").change(function(){
        var that = this;
        selectChange('treemapContainerM',that);
    });
} 
/*== end 监听案由所对应案件个数select表单值得变化 ==================================*/

/*== start 获取司法关联数据 ===================================================*/
function getScatterData(jid){
    // console.log('jid');
    // console.log(jid);
    // 获取司法关联数据
    $.ajax({
        url:'Access/relationWS',
        data:{
            //接口设定的参数名称
            key:jid
        },
        type:'POST',
        timeout: 120000,
        cache:false,  
        dataType: 'json',
        success:function(data){
            // 清除加载动画
            // $('#loadingAnimation').hide();
            // console.log("Access/relationWS success");
            // console.log(data);
            let rawData = data.data;
            if(rawData == ''){
                return;
            }
            casesInfos.anjianleixing = rawData.anjianleixing;
            casesInfos.date = rawData.date;
            casesInfos.diyu = rawData.diyu;
            casesInfos.fayancengji = rawData.fayancengji;
            casesInfos.nodesDetail = rawData.nodesDetail;
            casesInfos.relations = rawData.relations;
            casesInfos.shenpanchengxu = rawData.shenpanchengxu;
            casesInfos.wenshuleixing = rawData.wenshuleixing;
            casesInfos.xAxis = [];
            casesInfos.xAxis.push(Math.min(...rawData.date));
            casesInfos.xAxis.push(Math.max(...rawData.date));
            casesInfos.xAxis[1]+=1;

            handleScatterData(casesInfos,'审判程序');
        },
        error: function(error){
            // 清除加载动画
            // $('#loadingAnimation').hide();
            console.log(error);
            alert('网络忙，请稍后再试');
        }
    })
}
/*== end 获取司法关联数据 =====================================================*/

/*== start 处理数据 ==========================================================*/
function handleScatterData(casesInfos,yType){
    let yAxis = [];
    // console.log("casesInfos:");
    // console.log(casesInfos);
    let now = new Date();
    let nowMonth = now.getMonth();
    let nowDate = now.getDate();

    //== 确保有裁判日期
    casesInfos.nodesDetail.forEach(function(node,i){
        if(!node.hasOwnProperty('caipangriqi') || node.caipangriqi ==''){
            if(nowMonth!=0){
                node.caipangriqi = node.caipangnianfeng + '-' + Math.ceil(Math.random()*nowMonth) + '-' + Math.ceil(Math.random()*30);
            }else{
                node.caipangriqi = node.caipangnianfeng + '-' + (nowMonth + 1) + '-' + Math.ceil(Math.random()*nowDate);
            }  
        }
    })

    let firstYear = casesInfos.xAxis[0]+'';
    let lastYear = casesInfos.xAxis[1]+'';
    let xMinD = new Date(firstYear);
    let xMin = xMinD.getTime();
    let xMaxD = new Date(lastYear);
    let xMax = xMaxD.getTime();
    // 定义比例尺
    let xTemp = d3.scale.linear()
        .domain([xMin,xMax])
        .range([0,100]);

    casesInfos.nodesDetail.forEach(function(node,i){
        let nodeD = new Date(node.caipangriqi);
        let nodeX = nodeD.getTime();
        node.x = +xTemp(nodeX).toFixed(2);
    })

    switch (yType){
        case '审判程序': 
            yAxis = deepCopy(casesInfos.shenpanchengxu).reverse();
            yAxis.unshift('');
            setNodeY('shenpanchengxu');
            break;
        case '文书类型': 
            yAxis = deepCopy(casesInfos.wenshuleixing).reverse();
            yAxis.unshift('');
            setNodeY('wenshuleixing');
            break;
        case '法院层次': 
            yAxis = deepCopy(casesInfos.fayancengji).reverse();
            yAxis.unshift('');
            setNodeY('fayancengji');
            break;
        case '案件类型': 
            yAxis = deepCopy(casesInfos.anjianleixing).reverse();
            yAxis.unshift('');
            setNodeY('anjianleixing');
            break;
        case '地域': 
            yAxis = deepCopy(casesInfos.diyu).reverse();
            yAxis.unshift('');
            setNodeY('diyuprovince');
            break;
        default: 
            yAxis = deepCopy(casesInfos.shenpanchengxu).reverse();
            yAxis.unshift('');
            setNodeY('shenpanchengxu');
    }

    function setNodeY(prop){
        casesInfos.nodesDetail.forEach(function(node,i){
            let index = yAxis.indexOf(node[prop])-1;
            if(index>-1){
                node.y = Math.ceil(Math.random()*20) + index*20;
                node.y = node.y >5 ? node.y : node.y+5;
            }else{
                node.y = Math.ceil(Math.random()*20);
                node.y = node.y >5 ? node.y : node.y+5;
            } 
        })
    }

    //将数据处理为绘图数据
    let drawDataStore = createDataStore('dataStore');
    casesInfos.nodesDetail.forEach(function(item){
        drawDataStore.nodes.push(item);
        if(!drawDataStore.nodesIdSet.has(item.id)){
            drawDataStore.nodesIdSet.add(item.id);
            drawDataStore.idNodesDict[item.id] = item;
        }
    })
    if(casesInfos.hasOwnProperty('relations')){
        let id = 0;
        casesInfos.relations.forEach(function(item){
            item.id = id + '';
            id +=1;
            drawDataStore.links.push(item);
            if(!drawDataStore.linksIdSet.has(item.id)){
                drawDataStore.linksIdSet.add(item.id);
            }
        })   
    }

    drawDataStore.links.forEach(function(link){
        link.startX = drawDataStore.idNodesDict[link.startnode]["x"];
        link.startY = drawDataStore.idNodesDict[link.startnode]["y"];
        link.endX = drawDataStore.idNodesDict[link.stopnode]["x"];
        link.endY = drawDataStore.idNodesDict[link.stopnode]["y"];
    })
    // 绘图数据存储到数据存储仓库中
    dataStore.nodes = drawDataStore.nodes;
    dataStore.links = drawDataStore.links;
    dataStore.nodesIdSet = drawDataStore.nodesIdSet;
    dataStore.linksIdSet = drawDataStore.linksIdSet;
    dataStore.idNodesDict = drawDataStore.idNodesDict;
    // console.log('dataStore');
    // console.log(dataStore);

    //== 将节点信息推入到Vuex数据存储仓库(store)中
    store.dispatch('UPDATA', drawDataStore.nodes);
    renderScatter(dataStore,casesInfos,yAxis);

    function deepCopy(arr){
        let newArr = [];
        for(let i=0; i<arr.length; i++){
            newArr[i] = arr[i];
        }
        return newArr;
    }
}

function loadScatterData(rawData){
    console.log("rawData:");
    console.log(rawData);
    var drawDataStore = createDataStore('dataStore');
    rawData.forEach(function(item){
        drawDataStore.nodes.push(item.nodes);
        if(!drawDataStore.nodesIdSet.has(item.nodes.id)){
            drawDataStore.nodesIdSet.add(item.nodes.id);
            drawDataStore.idNodesDict[item.nodes.id] = item.nodes;
        }
        if(item.hasOwnProperty('relationships')){
            drawDataStore.links.push(item.relationships);
            if(!drawDataStore.linksIdSet.has(item.relationships.id)){
                drawDataStore.linksIdSet.add(item.relationships.id);
            }   
        }
    })
    drawDataStore.links.forEach(function(link){
        link.startX = drawDataStore.idNodesDict[link.startNode]["x"];
        link.startY = drawDataStore.idNodesDict[link.startNode]["y"];
        link.endX = drawDataStore.idNodesDict[link.endNode]["x"];
        link.endY = drawDataStore.idNodesDict[link.endNode]["y"];
    })
    // 绘图数据存储到数据存储仓库中
    dataStore.nodes = drawDataStore.nodes;
    dataStore.links = drawDataStore.links;
    dataStore.nodesIdSet = drawDataStore.nodesIdSet;
    dataStore.linksIdSet = drawDataStore.linksIdSet;
    dataStore.idNodesDict = drawDataStore.idNodesDict;
    // console.log("drawDataStore:");
    // console.log(drawDataStore);

    //== 将节点信息推入到Vuex数据存储仓库(store)中
    store.dispatch('UPDATA', drawDataStore.nodes);
    renderScatter(dataStore);
}

/*== end 处理数据 ============================================================*/

/*== start 切换纵坐标 =========================================================*/
function toggleAxis(index,tab){
    console.log('监听事件触发=='+index+'=='+tab);
    store.dispatch('TOGGLETAB',index,tab);
    handleScatterData(casesInfos,tab);
}
/*== end 切换纵坐标 ===========================================================*/

/*== start 渲染司法分析图 =====================================================*/
function renderScatter(data,casesInfos,yAxis){
    // console.log("renderScatter");
    // console.log(yAxis);
    // console.log(casesInfos);
    let yAxisDomain = [];
    for(let i=0; i<yAxis.length; i++){
        yAxisDomain.push(i);
    }
    //== 每次渲染司法分析图时先清除上一次的绘图
    d3.select("#legalContainer svg").remove();

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltipForScatter');

    var margin = {top: 20, right: 20, bottom: 100, left: 30},
        width = document.getElementById("legalContainer").offsetWidth - margin.left - margin.right,
        height = document.getElementById("legalContainer").offsetHeight - margin.top - margin.bottom;
        // console.log("length:" + width + ":" + height);

    // 获取时间
    // var todayDate = new Date();
    // var nextYear = todayDate.getFullYear()+1;
    // console.log("nextYear:"+ nextYear);
    var firstYear = casesInfos.xAxis[0];
    var lastYear = casesInfos.xAxis[1];

    // 设定跨越多少年
    // var intervalYear = 60;
    // var xScale = d3.scale.linear()
    //     .domain([nextYear-intervalYear,nextYear])
    //     .range([0, width])

    var intervalYear = casesInfos.xAxis[1]-casesInfos.xAxis[0];
    var xScale = d3.scale.linear()
        .domain([firstYear,lastYear])
        .range([0, width])

    var yScale = d3.scale.ordinal()
        .domain(yAxisDomain)
        .range(yAxis)

    // 设定坐标轴的分隔数
    // var xScaleNum = intervalYear/3;
    var xScaleNum;
    if(intervalYear<=10){
        xScaleNum = intervalYear;
    }else if(intervalYear<=30){
        xScaleNum = intervalYear/2;
    }else{
        xScaleNum = intervalYear/3;
    }

    var yScaleNum = yAxis.length-1;
    // console.log("yScaleNum:"+yScaleNum);

    var x = d3.scale.linear()
        .domain([0,100])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0,20*yScaleNum])
        .range([height, 0]);

    var z = d3.scale.category10();

    var svg = d3.select("#legalContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.attr("opacity",0)
        .transition()
        .duration(1500)
        .attr("opacity",1);

    // var series = data.map(function(series) {
    //   return data.map(function(d) {
    //     return {x: +d.x, y: +d.y};
    //   });
    // });

    // 设置比例尺定义域
    // x.domain(d3.extent(data.nodes, function(d) { return d.x; })).nice();
    // y.domain(d3.extent(data.nodes, function(d) { return d.y; })).nice();

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.svg.axis().scale(xScale).ticks(xScaleNum).tickSize(0,0).tickFormat(function(d){return '' + d;}).orient("bottom"));

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).ticks(yScaleNum).tickSize(0,0).tickFormat(function(d,i){return yScale(i);}).orient("right"));

    //画出y轴每个刻度的水平线
    svg.append("g")
        .append("path")
        .attr("class", "horizontalLines") //horizontalLines
        .attr("stroke", "#aaa")
        .attr("stroke-Width", 1)
        .attr("fill", "none")
        .attr("d", function(){
            return "M0,0" + "L" + width + ",0" + "L" + width + "," + height;
        })
    svg.append("g")
        .selectAll(".horizontalLines")
        .data(y.ticks(yScaleNum))
        .enter()
        .append("path")
        .attr("class", "horizontalLines") //horizontalLines
        .attr("stroke", "#aaa")
        .attr("stroke-Width", 1)
        .attr("fill", "none")
        .style("stroke-dasharray", "10, 15")
        .style("stroke-opacity", 0.5)
        .attr("d", function(d, i){
            if(d==0 || d==yScaleNum){
                return;
            }
            return "M0,"+ y(d) + "L" + width + "," + y(d);
        })

    //画出x轴每个刻度的垂直线verticalLines
    svg.append('g')
        .selectAll(".verticalLines")
        .data(xScale.ticks(xScaleNum))
        .enter()
        .append("path")
        .attr("class", "verticalLines") //horizontalLines
        .attr("stroke", "#aaa")
        .attr("stroke-Width", 1)
        .attr("fill", "none")
        // .style("stroke-dasharray", "10, 15")
        .style("stroke-opacity", 0.3)
        .attr("d", function(d, i){
            if(d==0 || d==lastYear){
                return;
            }
            return "M"+ xScale(d) + ",0L" + xScale(d) + "," + height;
        })

    // 画箭头----------------------------
    var arrowConfig = {
        id: 'arrow',
        path: "M0,0 L6,3 L0,6 L0,0", //"M0,0 L4,2 L0,4 L0,0"
        markerUnits: 'strokeWidth',
        markerWidth: 6, //4
        markerHeight: 6, //4
        viewBox: "0 0 6 6", //"0 0 8 8"
        refX: 0, //16
        refY: 3, //2
        orient: 'auto'
    }
    var arrow = drawArror(svg, "#888", arrowConfig); //#aaa
    //----------------------------------
    // return;
    // add svgG包裹层
    var svgG = svg.append("g")
        .attr("class", "series");
    // 添加节点之间连线
    var caseLinks = svgG.selectAll(".caseLinks")
        .data(data.links)
        .enter()
        .append('path')
        .attr('d', function(d, i){
            return "M" + x(d.startX) + "," + y(d.startY) + "L" + x((d.startX+d.endX)/2) + "," + y((d.startY+d.endY)/2) + "L" + x(d.endX) + "," + y(d.endY);
        })
        .attr('class', 'caseLinks')
        .attr('fill', 'none')
        .attr('stroke', '#888888')
        .attr('stroke-Width', '1px')
        .attr("marker-mid", 'url(#arrow)')
        .style("opacity", 0)

    // Add the points!
    var caseNodes = svgG.selectAll(".caseNodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("class", "caseNodes")
        .attr("fill", function(d, i){ return "#019FDE"})
        .attr("r", function(d){ return 10})
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .style('cursor', "pointer")
        .on('click', function(d){
            // 取消冒泡
            d3.event.stopPropagation();

            // 取得单击节点的id获取右侧相应的LI元素，并滑到点端聚焦显示
            var liElement = document.getElementById(d.id);
            $("#main-right").animate({scrollTop: liElement.offsetTop-10}, 500);

            // 设置li聚焦样式前先将所有li恢复到之前的样式
            d3.selectAll(".caseBrief")
                .style("border", "1px solid #aaa")
                .style("box-shadow", "1px 2px 2px #aaa");

            liElement.style.border = "1px solid #019FDE";
            liElement.style["box-shadow"] = "1px 2px 2px #eee";

            var liElementLeft = liElement.querySelector("td:first-child");
            $(".li-left-tags").css({"background-color":"#ffffff"});
            liElementLeft.style["background-color"] = "#eee";
            //高亮与其相关的节点与连线
            // console.log("d.id:"+d.id);
            highLightElement(d.id);
        })
        .on('mousemove', function(d){
            showMouseTooltip(d);
        })
        .on('mouseout', function(d){
            hideMouseTooltip();
        })

    // 点击页面其他地方时右侧边框颜色恢复到不聚焦状态
    d3.select("#legalContainer svg")
        .on('click', function(){
            d3.selectAll(".caseBrief")
                .style("border", "1px solid #aaa")
                .style("box-shadow", "1px 2px 2px #aaa");
            svgG.selectAll(".caseNodes")
                .style("opacity", 1)
                .style("fill", "#019FDE");
            svgG.selectAll(".caseLinks")
                .style("opacity", 0);

            $(".li-left-tags").css({"background-color":"#ffffff"});
        })

    setTimeout(function(){
        // 鼠标移动到右侧简明信息时，高亮对应的节点
        $("#main-right").find("li").hover(function() {
            /* Stuff to do when the mouse enters the element */
            // 设置li聚焦样式前先将所有li恢复到之前的样式
            d3.selectAll(".caseBrief")
                .style("border", "1px solid #aaa")
                .style("box-shadow", "1px 2px 2px #aaa");

            var thisElementId = $(this).attr("id");
            var liElement = document.getElementById(thisElementId);

            var liElementLeft = liElement.querySelector("td:first-child");
            $(".li-left-tags").css({"background-color":"#ffffff"});
            liElementLeft.style["background-color"] = "#eee";

            liElement.style.border = "1px solid #019FDE";
            liElement.style["box-shadow"] = "1px 2px 2px #eee";

            highLightElement(thisElementId);

        }, function() {
            /* Stuff to do when the mouse leaves the element */
            $(".li-left-tags").css({"background-color":"#ffffff"});

            var thisElementId = $(this).attr("id");
            var liElement = document.getElementById(thisElementId);

            d3.selectAll(".caseBrief")
                .style("border", "1px solid #aaa")
                .style("box-shadow", "1px 2px 2px #aaa");

        }).bind("click", function(){
            var liElement = document.getElementById($(this).attr("id"));
            if(!$("#main-right").is(":animated")){
                $("#main-right").animate({scrollTop: liElement.offsetTop-10}, 500);
            }
        })
    }, 500);

    // 选中节点时与其相关的节点与连线高亮
    function highLightElement(rootNodeId){
        //存储需要高亮的节点ID与连线ID
        var highNodes = [];
        var highLinks = [];
        highNodes.push(rootNodeId);
        data.links.forEach(function(link){
            if(link.startnode == rootNodeId){
                highLinks.push(link.id);
                highNodes.push(link.stopnode);
            }else if(link.stopnode == rootNodeId){
                highLinks.push(link.id);
                highNodes.push(link.startnode);
            }else{
                return;
            }
        })
        svgG.selectAll(".caseNodes")
            .style("opacity", function(d){
                if(highNodes.indexOf(d.id) !== -1){
                    return 1;
                }else{
                    return 0.1;
                }
            })
            .style("fill", function(d){
                if(rootNodeId == d.id){
                    return "#ff8345";
                }else{
                    return "019FDE";
                }
            })
        svgG.selectAll(".caseLinks")
            .style("opacity", function(d){
                if(highLinks.indexOf(d.id) !== -1){
                    return 1;
                }else{
                    return 0;
                }
            })
    }

    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", (d3.event.pageX+10) + "px")
            .style("top", (d3.event.pageY-40) + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        d3.selectAll('.mouseTooltipForScatter').style("opacity", 0)
            .style("left", -1000+'px')
            .style('top', -1000+'px');
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + d.anhao + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============
}
/*== end 渲染司法分析图 =======================================================*/

/*== start 绘制箭头 ==========================================================*/
function drawArror(svg, color, arrowConfig) {
    var arrow_path = arrowConfig.path || "M0,0 L6,3 L0,6 L0,0"; //"M0,0 L4,2 L0,4 L0,0"

    var svg = svg || d3.select('svg');

    var defsG = svg.append('g');
    var defs = defsG.append("defs");
    var arrowMarker = defs.append("marker")
        .attr(arrowConfig);

    arrowMarker.append("path")
        .attr("d",arrow_path)
        .attr("fill",color);
}
/*== end 绘制箭头 ============================================================*/

/*== start 渲染被执行人折线图(历年统计) ==========================================*/
function renderExecutedLineChart(rawData){
    //== 每次渲染折线图时先清除上一次的绘图
    d3.select("#executedPolylineContainer svg").remove();

    if(rawData==null || rawData==undefined || rawData.length ==0){
        return;
    }
    rawData.sort(compare('nf'));
    // console.log("rawData");
    // console.log(rawData);

    var data = {
        executedNumsPerYear:[],
        quitExecutedNumsPerYear:[],
    };
    var years = [];
    var personNums = [];
    rawData.forEach(function(d, i){
        years.push(d.nf);
        personNums.push(d.mnzxzs);
        personNums.push(d.mnjazxzs);
        data.executedNumsPerYear.push([d.nf, d.mnzxzs]);
        data.quitExecutedNumsPerYear.push([d.nf, d.mnjazxzs]);
    })
    // console.log("== 处理后的数据 ===");
    // console.log(years);
    // console.log(personNums);
    // console.log(data);

    var minYear = Math.min.apply(null, years);
    var maxYear = Math.max.apply(null, years);
    var maxPersonNums = Math.max.apply(null, personNums) || 6;
    maxPersonNums = maxPersonNums>=6 ? maxPersonNums: 6;

    if((maxYear-minYear)<1){
        minYear = maxYear-1;
    }

    // console.log("== 最大最小值 ===");
    // console.log(minYear);
    // console.log(maxYear);
    // console.log(maxPersonNums);

    //== 图例数据
    var legendData = ['在执行中的被执行人个数','已不披露的被执行人个数'];

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltip');

    var margin = {top: 30, right: 30, bottom: 50, left: 40},
        width = document.getElementById("executedPolylineContainer").offsetWidth - margin.left - margin.right,
        height = document.getElementById("executedPolylineContainer").offsetHeight - margin.top - margin.bottom;

    var x = d3.scale.linear()
        // .domain([new Date(2001, 0, 1), new Date(2006, 0, 1)])
        .domain([minYear, maxYear])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, maxPersonNums])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("monotone")
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });

    //== 定义颜色比例尺
    var color = d3.scale.category20();   //有二十种颜色的颜色比例尺

    var svg = d3.select("#executedPolylineContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    //== 生成图例
    var legendG = svg.append('g')
        .attr("transform", "translate(" + (margin.left+20) + "," + (margin.top-20) + ")");

    var legendLine = legendG.selectAll('.pLegendCircle')
        .data(legendData)
        .enter()
        .append('circle')
        .attr('class', 'pLegendCircle')
        .attr("cx", 10)
        .attr("cy", function(d,i){
            return 10 + 20*i; 
        })
        .attr("r", 5)
        .attr('fill', 'none')
        .attr('stroke', function(d,i){
            return color(i);
        })
        .attr('stroke-width', '1.5px')

    var legendText = legendG.selectAll('.pLegendText')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class', 'pLegendText')
        .attr()
        .attr('x', 25)
        .attr('y', function(d,i){
            return 20*i; 
        })
        .attr('dy', 15)
        .text(function(d){
            return d;
        })

    //== 折线图装载点
    var svgG = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svgG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.ticks(((maxYear-minYear+1)<=25?maxYear-minYear:25)).tickFormat(function(d){return '' + d;}));

    svgG.append("g")
        .attr("class", "y axis")
        .call(yAxis.ticks(6));

    //== 每年在执行中的被执行人个数
    svgG.append("path")
        .datum(data.executedNumsPerYear)
        .attr("class", "lineCaseNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotCaseNums")
        .data(data.executedNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotCaseNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== 已不披露的被执行人个数
    svgG.append("path")
        .datum(data.quitExecutedNumsPerYear)
        .attr("class", "lineAccuserNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotAccuserNums")
        .data(data.quitExecutedNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotAccuserNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", (d3.event.pageX+10) + "px")
            .style("top", (d3.event.pageY-40) + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        mouseTooltip.style("opacity", 0)
            .style("left", -1000 + "px")
            .style("top", -1000 + "px");
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + d[1] + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============

    //== start 生成标示线 ================
    function showIndexLine(x){
        var indexLine = svgG.selectAll('.indexLine')
            .data([1])
            .enter()
            .append('path')
            .attr('class', 'indexLine')
            .attr('d', 'M' + x + ' 0 L' + x + ' ' + height)
            .attr('stroke', '#8cc540')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '10,10');
    }
    function hideIndexLine(){
        d3.select('.indexLine').remove();
    }
    //== end 生成标示线 ==================

}
/*== end 渲染被执行人折线图(历年统计) ===========================================*/

/*== start 渲染被执行人的执行标的总额折线图(历年统计) =============================*/
function renderExecutedTotalLineChart(rawData){
    //== 每次渲染折线图时先清除上一次的绘图
    d3.select("#executedTotalPolylineContainer svg").remove();

    if(rawData==null || rawData==undefined || rawData.length ==0){
        return;
    }
    rawData.sort(compare('nf'));
    // console.log("rawData");
    // console.log(rawData);

    var data = {
        executedTotalPerYear:[],
        quitExecutedTotalPerYear:[],
    };
    var years = [];
    var executedTotal = [];
    rawData.forEach(function(d, i){
        years.push(d.nf);
        executedTotal.push(d.mnbdze);
        executedTotal.push(d.mnjabdze);
        data.executedTotalPerYear.push([d.nf, d.mnbdze]);
        data.quitExecutedTotalPerYear.push([d.nf, d.mnjabdze]);
    })
    // console.log("== 处理后的数据 ===");
    // console.log(years);
    // console.log(executedTotal);
    // console.log(data);

    var minYear = Math.min.apply(null, years);
    var maxYear = Math.max.apply(null, years);
    var maxExecutedTotal = Math.max.apply(null, executedTotal) || 6;
    maxExecutedTotal = maxExecutedTotal>=6 ? maxExecutedTotal: 6;

    if((maxYear-minYear)<1){
        minYear = maxYear-1;
    }

    // console.log("== 最大最小值 ===");
    // console.log(minYear);
    // console.log(maxYear);
    // console.log(maxExecutedTotal);

    //== 图例数据
    var legendData = ['在执行中的被执行人的执行标的总额','已不披露的被执行人的执行标的总额'];

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltip1');

    var _left = maxExecutedTotal<=6 ? 40: 80;
    var margin = {top: 30, right: 30, bottom: 50, left: _left},
        width = document.getElementById("executedTotalPolylineContainer").offsetWidth - margin.left - margin.right,
        height = document.getElementById("executedTotalPolylineContainer").offsetHeight - margin.top - margin.bottom;

    var x = d3.scale.linear()
        // .domain([new Date(2001, 0, 1), new Date(2006, 0, 1)])
        .domain([minYear, maxYear])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, maxExecutedTotal])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("monotone")
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });

    //== 定义颜色比例尺
    var color = d3.scale.category20();   //有二十种颜色的颜色比例尺

    var svg = d3.select("#executedTotalPolylineContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    //== 生成图例
    var legendG = svg.append('g')
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top-20) + ")");

    var legendLine = legendG.selectAll('.pLegendCircle')
        .data(legendData)
        .enter()
        .append('circle')
        .attr('class', 'pLegendCircle')
        .attr("cx", 10)
        .attr("cy", function(d,i){
            return 10 + 20*i; 
        })
        .attr("r", 5)
        .attr('fill', 'none')
        .attr('stroke', function(d,i){
            return color(i);
        })
        .attr('stroke-width', '1.5px')

    var legendText = legendG.selectAll('.pLegendText')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class', 'pLegendText')
        .attr()
        .attr('x', 25)
        .attr('y', function(d,i){
            return 20*i; 
        })
        .attr('dy', 15)
        .text(function(d){
            return d;
        })

    //== 折线图装载点
    var svgG = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svgG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.ticks(((maxYear-minYear+1)<=25?maxYear-minYear:25)).tickFormat(function(d){return '' + d;}));

    svgG.append("g")
        .attr("class", "y axis")
        .call(yAxis.ticks(6));

    //== 每年在执行中的被执行人的执行标的总额
    svgG.append("path")
        .datum(data.executedTotalPerYear)
        .attr("class", "lineCaseNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotCaseNums")
        .data(data.executedTotalPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotCaseNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== 已不披露的被执行人的执行标的总额
    svgG.append("path")
        .datum(data.quitExecutedTotalPerYear)
        .attr("class", "lineAccuserNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotAccuserNums")
        .data(data.quitExecutedTotalPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotAccuserNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        var _width = (+d[1]).toFixed(2).toString().length;
        mouseTooltip.html(generateMouseTooltipContent(d))
            // .style("left", (d3.event.pageX+10) + "px")
            .style("left", function(){
                var PageWidth = document.body.clientWidth;
                if(PageWidth-d3.event.pageX<_width*10+5){
                    return (d3.event.pageX-_width*10-10) + "px";
                }else{
                    return (d3.event.pageX+10) + "px"; 
                }
            })
            .style("top", (d3.event.pageY-40) + "px")
            .style('width', _width*10 + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        mouseTooltip.style("opacity", 0)
            .style("left", -1000 + "px")
            .style("top", -1000 + "px");
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + (+d[1]).toFixed(2) + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============

    //== start 生成标示线 ================
    function showIndexLine(x){
        var indexLine = svgG.selectAll('.indexLine')
            .data([1])
            .enter()
            .append('path')
            .attr('class', 'indexLine')
            .attr('d', 'M' + x + ' 0 L' + x + ' ' + height)
            .attr('stroke', '#8cc540')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '10,10');
    }
    function hideIndexLine(){
        d3.select('.indexLine').remove();
    }
    //== end 生成标示线 ==================

}
/*== end 渲染被执行人的执行标的总额折线图(历年统计) =================================*/

/*== start 渲染折线图(每年案件统计) =============================================*/
function renderLineChart(rawData){
    //== 每次渲染折线图时先清除上一次的绘图
    d3.select("#polylineContainer svg").remove();

    if(rawData==null || rawData==undefined || rawData.length ==0 ){
        return;
    }
    rawData.sort(compare('nf'));
    // console.log("rawData");
    // console.log(rawData);

    var data = {
        caseNumsPerYear:[],
        accuserNumsPerYear:[],
        accusedNumsPerYear:[],
        thirdPersonNumsPerYear:[]
    };
    var years = [];
    var caseNums = [];
    rawData.forEach(function(d, i){
        years.push(d.nf);
        caseNums.push(d.mnajzs);
        caseNums.push(d.mnygzs);
        caseNums.push(d.mnbgzs);
        caseNums.push(d.mndsrzs);
        data.caseNumsPerYear.push([d.nf, d.mnajzs]);
        data.accuserNumsPerYear.push([d.nf, d.mnygzs]);
        data.accusedNumsPerYear.push([d.nf, d.mnbgzs]);
        data.thirdPersonNumsPerYear.push([d.nf, d.mndsrzs]);
    })
    // console.log("== 处理后的数据 ===");
    // console.log(years);
    // console.log(caseNums);
    // console.log(data);

    var minYear = Math.min.apply(null, years);
    var maxYear = Math.max.apply(null, years);
    var maxCaseNums = Math.max.apply(null, caseNums) || 6;
    maxCaseNums = maxCaseNums>=6 ? maxCaseNums: 6; 

    if((maxYear-minYear)<1){
        minYear = maxYear-1;
    }

    // console.log("== 最大最小值 ===");
    // console.log(minYear);
    // console.log(maxYear);
    // console.log(maxCaseNums);

    //== 图例数据
    var legendData = ['涉诉案件','原告案件','被告案件','第三人'];

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltip');

    var margin = {top: 30, right: 30, bottom: 50, left: 40},
        width = document.getElementById("polylineContainer").offsetWidth - margin.left - margin.right,
        height = document.getElementById("polylineContainer").offsetHeight - margin.top - margin.bottom;

    var x = d3.scale.linear()
        // .domain([new Date(2001, 0, 1), new Date(2006, 0, 1)])
        .domain([minYear, maxYear])
        .range([0, width]);

    var y = d3.scale.linear()
        .domain([0, maxCaseNums])
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .interpolate("monotone")
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); });

    //== 定义颜色比例尺
    var color = d3.scale.category20();   //有二十种颜色的颜色比例尺

    var svg = d3.select("#polylineContainer").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    //== 生成图例
    var legendG = svg.append('g')
        .attr("transform", "translate(" + (margin.left) + "," + (margin.top-20) + ")");

    var legendLine = legendG.selectAll('.pLegendCircle')
        .data(legendData)
        .enter()
        .append('circle')
        .attr('class', 'pLegendCircle')
        .attr("cx", 10)
        .attr("cy", function(d,i){
            return 10 + 20*i; 
        })
        .attr("r", 5)
        .attr('fill', 'none')
        .attr('stroke', function(d,i){
            return color(i);
        })
        .attr('stroke-width', '1.5px')

    var legendText = legendG.selectAll('.pLegendText')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class', 'pLegendText')
        .attr()
        .attr('x', 25)
        .attr('y', function(d,i){
            return 20*i; 
        })
        .attr('dy', 15)
        .text(function(d){
            return d;
        })

    //== 折线图装载点
    var svgG = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svgG.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis.ticks(((maxYear-minYear+1)<=25?maxYear-minYear:25)).tickFormat(function(d){return '' + d;}));

    svgG.append("g")
        .attr("class", "y axis")
        .call(yAxis.ticks(6));

    //== 每年案件的个数
    svgG.append("path")
        .datum(data.caseNumsPerYear)
        .attr("class", "lineCaseNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotCaseNums")
        .data(data.caseNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotCaseNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(0))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== 每年原告案件个数
    svgG.append("path")
        .datum(data.accuserNumsPerYear)
        .attr("class", "lineAccuserNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotAccuserNums")
        .data(data.accuserNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotAccuserNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(1))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== 每年被告案件个数
    svgG.append("path")
        .datum(data.accusedNumsPerYear)
        .attr("class", "lineAccusedNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(2))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotlineAccusedNums")
        .data(data.accusedNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotlineAccusedNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(2))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })

    //== 每年第三人案件个数
    svgG.append("path")
        .datum(data.thirdPersonNumsPerYear)
        .attr("class", "lineThirdPersonNums")
        .attr("d", function(d){
            return line(d);
        })
        .attr('fill', 'none')
        .attr('stroke', color(3))
        .attr('stroke-width', '1.5px');

    svgG.selectAll(".dotlineThirdPersonNums")
        .data(data.thirdPersonNumsPerYear)
        .enter()
        .append("circle")
        .attr("class", "dotlineThirdPersonNums")
        .attr("cx", line.x())
        .attr("cy", line.y())
        .attr("r", 3.5)
        .attr('fill', 'white')
        .attr('stroke', color(3))
        .attr('stroke-width', '1.5px')
        .on('mouseover', function(d){
            d3.select(this).attr('stroke-width', '3px');
            showMouseTooltip(d);
            showIndexLine(d3.select(this)[0][0].cx.animVal.value);
        })
        .on('mouseout', function(){
            d3.select(this).attr('stroke-width', '1.5px');
            hideMouseTooltip();
            hideIndexLine();
        })
    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", (d3.event.pageX+10) + "px")
            .style("top", (d3.event.pageY-40) + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        mouseTooltip.style("opacity", 0)
            .style("left", -1000 + "px")
            .style("top", -1000 + "px");
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + d[1] + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============

    //== start 生成标示线 ================
    function showIndexLine(x){
        var indexLine = svgG.selectAll('.indexLine')
            .data([1])
            .enter()
            .append('path')
            .attr('class', 'indexLine')
            .attr('d', 'M' + x + ' 0 L' + x + ' ' + height)
            .attr('stroke', '#8cc540')
            .attr('stroke-width', '1px')
            .attr('stroke-dasharray', '10,10');
    }
    function hideIndexLine(){
        d3.select('.indexLine').remove();
    }
    //== end 生成标示线 ==================

}
/*== end 渲染折线图(每年案件统计) ===============================================*/

/*== start 渲染饼图(各类案件总数比例) ===========================================*/
function renderPie(data){
    var dataCaseSum = [data.caseSum];
    var dataset = [ data.accuserSum ,data.accusedSum, data.thirdPersonSum];
    var legendData = ['原告','被告','第三人'];
    //== 每次渲染司法分析图时先清除上一次的绘图
    d3.select("#classify-ratio svg").remove();
    if(dataset[0]<=0 && dataset[1]<=0 && dataset[2]<=0){
        return;
    }

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = document.getElementById("classify-ratio").offsetWidth - margin.left - margin.right,
        height = document.getElementById("classify-ratio").offsetHeight - margin.top - margin.bottom;
    // console.log("width:"+width);
    // console.log("height:"+height);
    var minRadius = Math.min(width,height);
    //== 定义饼图布局换算数据
    var pie = d3.layout.pie();
    //== 将原始数据换算为绘制饼图所需数据
    var piedata = pie(dataset);

    //== 定义弧生成器生成绘制path所需的路径数据
    var outerRadius = minRadius/2-40; //外半径
    var innerRadius = 0; //内半径，为0则中间没有空白

    var arc = d3.svg.arc()  //弧生成器
        .innerRadius(innerRadius)   //设置内半径
        .outerRadius(outerRadius);  //设置外半径

    //== 定义一个颜色比例尺
    var color = d3.scale.category20();   //有二十种颜色的颜色比例尺

    var svg = d3.select("#classify-ratio").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    //== 画图例
    var legend = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var legendRect = legend.selectAll('.pieLegendRect')
        .data(legendData)
        .enter()
        .append('rect')
        .attr('class', 'pieLegendRect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('x', 0)
        .attr('y', function(d,i){
            return 22*i;
        })
        .style('fill', function(d,i){
            return color(i);
        })
    var legendText = legend.selectAll('.pieLegendText')
        .data(legendData)
        .enter()
        .append('text')
        .attr('class','pieLegendText')
        .attr('x', 20)
        .attr('y', function(d,i){
            return 22*i;
        })
        .attr('dy', 13)
        .text(function(d){
            return d;
        })

    //== 挂载案件总数
    var caseSumG = svg.append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .selectAll('.caseSumText')
        .data(dataCaseSum)
        .enter()
        .append('text')
        .attr('class', 'caseSumText')
        .attr('x', width/2-3*14)
        .attr('y', 22)
        .text(function(d){
            return '涉案总数：'+d;
        })

    //== 饼图挂载点
    var pieG = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var arcs = pieG.selectAll(".fan-shaped")
        .data(piedata)
        .enter()
        .append("g")
        .each(function(d){
            d.dx = width/2;
            d.dy = height/2;
        })
        .attr('class', 'fan-shaped')
        .attr("transform","translate("+ (width/2) +","+ (height/2) +")");

    arcs.append("path")
        .attr("fill",function(d,i){
            return color(i);
        })
        .attr("d",function(d){
            return arc(d);   //调用弧生成器，得到路径值
        });

    arcs.append("text")
        .attr("transform",function(d){
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor","middle")
        .text(function(d){
            if(d.data==0|| d.data=='0'){
                return;
            }else{
                return d.data;
            }
        });

    var drag = d3.behavior.drag()
        .origin(null)
        .on('drag', dragmove);

    function dragmove(d){
        d.dx += d3.event.dx;
        d.dy += d3.event.dy;
        d3.select(this)
            .attr('transform', "translate("+ d.dx +","+ d.dy +")");
    }

    arcs.call(drag);
}
/*== end 渲染饼图(各类案件总数比例) =============================================*/

/*== start 渲染矩阵树图 =======================================================*/
function matrixTree(data,treeId,second){
    //== 每次渲染矩阵树图时先清除上一次的绘图
    d3.select('#'+treeId+' svg').remove();

    if(data.length==0){
        return;
    }

    // console.log("matrixTree");
    // console.log(data);

    /*== 递归将处理数据===========================================*/
    function toTreeMapData(treeMapData,tempData,sizeNum){
        ++index;
        if(index!=tempData.length){
            if(treeMapData.children.length!=0){
                for(var i=0; i<treeMapData.children.length;i++){
                    if(treeMapData.children[i].name==tempData[index-1]){
                        continue;
                    }else if(i == treeMapData.children.length-1){
                        treeMapData.children.push({'name':tempData[index-1],'children':[]});
                    }
                }
            }else{
                treeMapData.children.push({'name':tempData[index-1],'children':[]});
            }
            var tempTreeMapData=null;
            for(var i=0; i<treeMapData.children.length; i++){
                if(treeMapData.children[i].name==tempData[index-1]){
                    tempTreeMapData = treeMapData.children[i];
                    continue;
                }
            }
            toTreeMapData(tempTreeMapData,tempData,sizeNum);
        }else{
            treeMapData.children.push({'name': tempData[index-1], 'size':sizeNum});
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
    for(var i=0; i<data.length; i++){
        sizeNum = data[i].ayzs|| data[i].mnayzs;
        tempData = data[i].causename.split('->');
        tempData[tempData.length-1] = tempData[tempData.length-1] + ' ';
        index = 0;
        toTreeMapData(treeMapData,tempData,sizeNum);
    }
    // console.log('=== 转换结束后的数据 ===');
    // console.log(treeMapData);

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltipForMatrixTree');

    var margin = {top: 10, right: 10, bottom: 10, left: 10},
        width = document.getElementById(treeId).offsetWidth - margin.left - margin.right,
        height = document.getElementById(treeId).offsetHeight - margin.top - margin.bottom;

    var color = d3.scale.category20();

    var svg = d3.select('#'+treeId).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var partition = d3.layout.partition()
        .size([width-11, height-11])
        .value(function(d) { return d.size; });

    var nodes = partition.nodes(treeMapData);
    // console.log('treeMapData');
    // console.log(treeMapData);
    // console.log(nodes);
    var nodeClass = second? 'nodeM': 'node';
    var lableClass = second? 'labelM': 'label';
    var labelBigClass = second? 'labelBigM': 'labelBig';

    svg.selectAll("."+nodeClass)
        .data(nodes)
        .enter()
        .append("rect")
        .attr("class", nodeClass)
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.dx; })
        .attr("height", function(d) { return d.dy; })
        .style('stroke', '#fff')
        .style('stroke-width', '1px')
        .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
        .on('mouseover', function(d){
            d3.select(this).style('fill', 'orange');
            // showMouseTooltip(d);
        })
        .on('mousemove', function(d){
            showMouseTooltip(d);
        })
        // .on('mouseup', function(d){
        //     showMouseTooltip(d);
        // })
        .on('mouseout', function(d){
            d3.select(this).style('fill', function(d) { return color((d.children ? d : d.parent).name); });
            hideMouseTooltip();
        })

    svg.selectAll("."+lableClass)
        .data(nodes.filter(function(d) { return d.dx > 6; }))
        .enter().append("text")
        .attr("class", function(d,i){
            if(d.depth == 0){
                return labelBigClass;
            }else{
                return lableClass;
            }
        })
        .attr("dy", ".35em")
        // .attr("transform", function(d) { return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")rotate(90)"; })
        .attr("transform", function(d) {
            if(d.dx > d.name.length*12 || d.dx > d.dy){
                return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")";    
            }else{
                return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")rotate(90)";
            }
        })
        .text(function(d) {
            // var name = d.name.replace(/(.{8})/g,'<tspan>$1</tspan>'); 
            // console.log("name:"+name);
            if(d.dx >10 && (d.dx > d.name.length*10 || d.dy > d.name.length*10)){
                return d.name;   
            }else{
                return '';
            }
        });

    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", function(){
                var PageWidth = document.body.clientWidth;
                if(PageWidth-d3.event.pageX<(d.name.length*15+40)){
                    return (d3.event.pageX-d.name.length*15-30) + "px";
                }else{
                    return (d3.event.pageX+10) + "px"; 
                }
            })
            .style("top", (d3.event.pageY-60) + "px")
            .style('width', d.name.length*15+ 20 + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        // mouseTooltip.style("opacity", 0)
        //     .style("left", -1000+'px')
        //     .style('top', -1000+'px');
        d3.selectAll('.mouseTooltipForMatrixTree').style("opacity", 0)
            .style("left", -1000+'px')
            .style('top', -1000+'px');
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + d.name + "</span>";
        htmlContent += "<span>" + d.value + "</span>";

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============
}
/*== end 渲染矩阵树图 =========================================================*/

/*== start 渲染地图组件 =======================================================*/
function renderMap(data){
    // 按案件数量排序compare(propertyName)
    if(data.hasOwnProperty('dqzs')){
        data.sort(compare('dqzs'));
    }else{
        data.sort(compare('mndqzs'));
    }
    
    // console.log('renderMap data');
    // console.log(data);
    //清楚上次绘制的图形
    d3.select("#mapContainer svg").remove();

    // 生成鼠标提示框
    var mouseTooltip = createMouseTooltip('mouseTooltipForTreeMap');

    var margin = {top: 10, right: 40, bottom: 40, left: 10},
        width = document.getElementById("mapContainer").offsetWidth - margin.left - margin.right,
        height = document.getElementById("mapContainer").offsetHeight - margin.top - margin.bottom;

    var color = d3.scale.category20();

    var svg = d3.select("#mapContainer").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //# 投影函数 =>  GeoJSON 文件中的地图数据，都是经度和纬度的信息,投影函数用来转换经度纬度
    var projection = d3.geo.mercator()
        .center([107, 37])
        .scale(290)
        .translate([width/2, height/2]);
    //# 地理路径生成器
    var path = d3.geo.path()
        .projection(projection);
    //# 向服务器请求文件并绘制地图
    d3.json("js/map/china.geojson", function(error, root) {
        if (error) return console.error(error);
        if(data.length>0){
            data.forEach(function(d,i){
                root.features.forEach(function(p,i){
                    if(province[d.geo]===p.properties.name){
                        p.geo = d.geo;
                        p.dqzs = d.dqzs || d.mndqzs;
                    }
                })
            })
        }
        // console.log(root.features);

        svg.selectAll("path")
            .data( root.features )
            .enter()
            .append("path")
            .attr("stroke","#000")
            .attr("stroke-width",1)
            .attr("fill", function(d,i){
                if(d.hasOwnProperty('geo')){
                    return color(i);
                }else{
                    return '#eee';
                }
            })
            .attr("d", path )   //使用地理路径生成器
            .on("mouseover",function(d,i){
                d3.select(this)
                   .attr("fill","yellow");
                showMouseTooltip(d);
            })
            .on('mousemove',function(d,i){
                showMouseTooltip(d);
            })
            // .on("mouseup",function(d,i){
            //     showMouseTooltip(d);
            // })
            .on("mouseout",function(d,i){
                hideMouseTooltip();

                d3.select(this)
                   .attr("fill",function(){
                        if(d.hasOwnProperty('geo')){
                            return color(i);
                        }else{
                            return '#eee';
                        }
                   });
            })
    });
    //== start mouse tooltip ===========
    //出现提示框
    function showMouseTooltip(d) {
        mouseTooltip.style("opacity", 1)
            .style('z-index', 9999);

        var _width = d.hasOwnProperty('dqzs')?(d.dqzs.length+6):d.properties.name.length;
        mouseTooltip.html(generateMouseTooltipContent(d))
            .style("left", function(){
                var PageWidth = document.body.clientWidth;
                if(PageWidth-d3.event.pageX<(_width*15+40)){
                    return (d3.event.pageX-_width*15-30) + "px";
                }else{
                    return (d3.event.pageX+10) + "px"; 
                } 
            })
            // .style("top", (d3.event.pageY-60) + "px")
            .style('width', (_width*15+ 20) + "px");
    }

    // 隐藏提示框
    function hideMouseTooltip() {
        d3.selectAll('.mouseTooltipForTreeMap').style("opacity", 0)
            .style("left", -1000+'px')
            .style('top', -1000+'px');
    }
    //start 生成提示框内容
    function generateMouseTooltipContent (d) {
        var htmlContent = '';

        htmlContent += "<span>" + d.properties.name + "</span>";
        if(d.hasOwnProperty('dqzs')){
            mouseTooltip.style('height', '50px')
                .style("top", (d3.event.pageY-60) + "px");
            htmlContent += "<span>涉诉案件：" + (d.dqzs||0) + "件</span>";
        }else{
            mouseTooltip.style('height', '25px')
                .style("top", (d3.event.pageY-35) + "px");
        }

        return htmlContent;
    }
    //end 生成提示框内容
    //== end mouse tooltip =============
}
/*== end 渲染地图组件 =========================================================*/

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
        }else if (value2 < value1) { 
            return 1; 
        }else { 
            return 0; 
        } 
    } 
} 
/*== end 定义所需的函数 =======================================================*/

/*==start 搜索程序=============================================================*/
//实现搜索输入框的输入提示js类
function oSearchSuggest(inputId,searchSuggestId,inputValue){
    // this 不能传入到内部函数使用that替代
    var that = this;
    // 表单当前值
    var valText='';
    // 批量搜索表单内容
    var inputBatchCompany='';
    // 批量搜索表单最后一个逗号后的字符串
    var inputBatchCompanylastString='';

    var time = null;
    var input = $(inputId);
    var suggestWrap = $(searchSuggestId);
    // 表单上一次的值
    var key = "";
    var init = function(){
        input.bind('focus',sendKeyWordEntrance);
        input.bind('input',inputChange);
        input.bind('keyup',KeyEvent);
        input.bind('blur',function(){setTimeout(hideSuggest,100);});
    }
    //输入框变化事件监听
    var inputChange = function(){
        inputBatchCompany = $.trim(input.val());
        if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
            inputBatchCompanylastString = inputBatchCompany.substring(inputBatchCompany.lastIndexOf('，')+1);
            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
        }else{
            inputBatchCompanylastString = inputBatchCompany.substring(inputBatchCompany.lastIndexOf(',')+1);
            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
        }
    }
    //隐藏提示框
    var hideSuggest = function(){
        suggestWrap.hide();
    }

    //关键字发送
    var sendKeyWord = function(){
        var valText = $.trim(input.val());
        if(valText ==''||valText==key){
            return;
        }
        if(key!=''|| key!=valText){
            if(navVm.searchForm.searchMode == 'batch'){
                sendKeyWordToBack(inputBatchCompanylastString);
                key = valText;
            }else{
                sendKeyWordToBack(valText);
                key = valText;
            }
        }
    }

    //input表单500ms发送一次ajax请求
    var sendKeyWordEntrance = function(){
        $(this).bind('keyup',function(e){
            var event = e || event;
            //每次键盘按键先取消定时
            clearInterval(time);
            if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40 || event.keyCode == 13 || event.keyCode == 188){
                // 按键为上下左右逗号回车不启动定时扫描表单内容变化
            }else{
                // console.log(inputBatchCompanylastString);
                time = setInterval(sendKeyWord, 400);
            }
        })
        $(this).bind('blur',function(){
            clearInterval(time);
        });

    }

    //发送请求，根据关键字到后台查询
    var KeyEvent = function(e){
        var event = e || event;
        // console.log(event.keyCode);
        //表单为空时隐藏提示框
        if($.trim(input.val())==""){
            suggestWrap.hide();
        }
        valText = $.trim(input.val());
        inputBatchCompany = valText;
        //键盘选择下拉项
        if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40||event.keyCode == 13){

            var current = suggestWrap.find('li.hover');
            if(event.keyCode == 38){
                if(current.length>0){
                    var prevLi = current.removeClass('hover').prev();
                    if(prevLi.length>0){
                        prevLi.addClass('hover');
                        if(navVm.searchForm.searchMode == 'batch'){
                            // input.val(key+prevLi.html());
                            if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
                                key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                            }else{
                                key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
                            }
                            navVm.$data.searchForm.firstSearchBox = key+prevLi.html();
                        }else{
                            // input.val(prevLi.html());
                            if(inputValue=='firstInput'){
                                navVm.$data.searchForm.firstSearchBox = prevLi.html();
                            }else{
                                navVm.$data.searchForm.secondSearchBox = prevLi.html();
                            }
                        }
                    }
                }else{
                    var last = suggestWrap.find('li:last');
                    last.addClass('hover');
                    if(navVm.searchForm.searchMode == 'batch'){
                        // input.val(key+last.html());
                        if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
                            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                        }else{
                            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
                        }
                        // key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                        navVm.$data.searchForm.firstSearchBox = key+last.html();
                    }else{
                        // input.val(last.html());
                        if(inputValue=='firstInput'){
                            navVm.$data.searchForm.firstSearchBox = last.html();
                        }else{
                            navVm.$data.searchForm.secondSearchBox = last.html();
                        }
                    }
                }

            }else if(event.keyCode == 40){
                if(current.length>0){
                    var nextLi = current.removeClass('hover').next();
                    if(nextLi.length>0){
                        nextLi.addClass('hover');
                        if(navVm.searchForm.searchMode == 'batch'){
                            // input.val(key+nextLi.html());
                            if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
                                key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                            }else{
                                key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
                            }
                            // key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                            navVm.$data.searchForm.firstSearchBox = key+nextLi.html();
                        }else{
                            // input.val(nextLi.html());
                            if(inputValue=='firstInput'){
                                navVm.$data.searchForm.firstSearchBox = nextLi.html();
                            }else{
                                navVm.$data.searchForm.secondSearchBox = nextLi.html();
                            }
                        }
                    }
                }else{
                    var first = suggestWrap.find('li:first');
                    first.addClass('hover');
                    if(navVm.searchForm.searchMode == 'batch'){
                        // input.val(key+first.html());
                        if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
                            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                        }else{
                            key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
                        }
                        // key = inputBatchCompany.substring(0,commaLastIndex+1);
                        navVm.$data.searchForm.firstSearchBox = key+first.html();
                    }else{
                        // input.val(first.html());
                        if(inputValue=='firstInput'){
                            navVm.$data.searchForm.firstSearchBox = first.html();
                        }else{
                            navVm.$data.searchForm.secondSearchBox = first.html();
                        }
                    }
                }
            }
            else if(event.keyCode == 13){
                suggestWrap.hide();
            }
        }
    }
    //请求返回后，执行数据展示
    this.dataDisplay = function(data){
        if(data.length<=0){
            suggestWrap.hide();
            return;
        }

        //往搜索框下拉建议显示栏中添加条目并显示
        var li;
        var tmpFrag = document.createDocumentFragment();
        suggestWrap.find('ul').html('');
        for(var i=0; i<data.length; i++){
            li = document.createElement('LI');
            li.innerHTML = data[i];
            tmpFrag.appendChild(li);
        }
        suggestWrap.find('ul').append(tmpFrag);
        suggestWrap.show();

        //为下拉选项绑定鼠标事件
        suggestWrap.find('li').hover(function(){
            suggestWrap.find('li').removeClass('hover');
            $(this).addClass('hover');

            },function(){
                $(this).removeClass('hover');
            }).bind('click',function(){
                //每次单击联想停止计时器发送ajax
                clearInterval(time);
                if(navVm.searchForm.searchMode == 'batch'){
                    if(inputBatchCompany.lastIndexOf('，')>inputBatchCompany.lastIndexOf(',')){
                        key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                    }else{
                        key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf(',')+1);
                    }
                    // key = inputBatchCompany.substring(0,inputBatchCompany.lastIndexOf('，')+1);
                    navVm.$data.searchForm.firstSearchBox = key+this.innerHTML;
                }else{
                    if(inputValue=='firstInput'){
                        navVm.$data.searchForm.firstSearchBox = this.innerHTML;
                    }else{
                        navVm.$data.searchForm.secondSearchBox = this.innerHTML;
                    }
                }
                suggestWrap.hide();
            });
        //为下拉选项绑定鼠标事件====解决google浏览器鼠标点击无效
        suggestWrap.find('ul').bind('mousedown', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;

            // 不是<li>标签就返回
            if(target.nodeName !== 'LI') {
                return;
            }
            //事件函数
            //func(target.innerHTML);

            // 阻止默认行为并取消冒泡
            // 阻止打开连接
            if(typeof e.preventDefault === 'function') {
                e.preventDefault();
                e.stopPropagation();
            }else {
                e.returnValue = false;
                e.cancelBubble = true;
            }
        })
    }
    init();

    //这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求
    //参数为一个字符串，是搜索输入框中当前的内容
    function sendKeyWordToBack(keyword){
        //http://localhost:8888/datahub/linkage/data
        $.post("Access/linkage/data",
           {
               //传递参数
               keyword:keyword,   //表单内需要发送的关键字
               rows: 20,    //需要后端返回的条数
               columns:'Registered_Info:enterprisename', //查询公司名称
               ishighlight: '', //是否高亮
               type: 'true'
           },
           function(data,status){
               // console.log(status);
               // console.log(data);
               var rawData = data.data;
               var searchSuggestBackData = [];
               for(var i=1; i<rawData.length; i++){
                    searchSuggestBackData.push(rawData[i].enterprisename);
               }
               // rawData.forEach(function(d){
               //      searchSuggestBackData.push(d.enterprisename);
               // })
               // console.log(searchSuggestBackData);
               that.dataDisplay(searchSuggestBackData);
           },
           'json'
        );
    }
};


//实例化输入提示的JS,参数为进行查询操作时要调用的函数名
var searchSuggestOne =  new oSearchSuggest('#searchInputOne', '#keywordSearchSuggestOne','firstInput');
//==单击页面时隐藏提示框
d3.select('body').on("mouseup",function(){
    $("#keywordSearchSuggestOne").hide();
})
/*==end 搜索程序=============================================================*/




// var cookieUtil={  
//       /*设置cookie*/  
//     set:function(name,value,expires,path,domain,secure){  
//         var cookie=encodeURIComponent(name)+"="+encodeURIComponent(value);  
//         if(expires instanceof Date){  
//           cookie+="; expires="+expires.toGMTString();  
//         }else{  
//             var date=new Date();  
//             date.setTime(date.getTime()+expires*24*3600*1000);  
//             cookie+="; expires="+date.toGMTString();  
//         }  
//         // if(path){  
//         //     cookie+="; path="+path;  
//         // }  
//         // if(domain){  
//         //     cookie+="; domain="+domain;  
//         // }  
//         // if (secure) {  
//         //     cookie+="; "+secure;  
//         // }  
//         document.cookie=cookie;  
//     },  
//     /*获取cookie*/  
//     get:function(name){  
//         var cookieName=encodeURIComponent(name);  
//         /*正则表达式获取cookie*/  
//         var restr="(^| )"+cookieName+"=([^;]*)(;|$)";  
//         var reg=new RegExp(restr);  
//         var cookieValue=document.cookie.match(reg)[2];  
//         /*字符串截取cookie*/  
//         /*var cookieStart=document.cookie.indexOf(cookieName+“=”); 
//         var cookieValue=null; 
//         if(cookieStart>-1){ 
//             var cookieEnd=document.cookie.indexOf(";",cookieStart); 
//             if(cookieEnd==-1){ 
//                 cookieEnd=document.cookie.length; 
//             } 
//             cookieValue=decodeURIComponent(document.cookie.substring(cookieStart 
//             +cookieName.length,cookieEnd)); 
//         }*/  
//         return cookieValue;  
//     }  
// }  
// cookieUtil.set("usr","hello world", 1);
// console.log(cookieUtil.get("usr"));




