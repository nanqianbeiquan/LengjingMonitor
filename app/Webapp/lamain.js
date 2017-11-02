import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/lamain.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexabout from './components/Indexabout.vue'
import Lasearch from './components/Lasearch.vue'
import Lawfirm from './components/Lawfirm.vue'


//## 全局变量设置 ================================================================
var searchClassify = '司法文书';
//## 全局变量设置 ================================================================

//## 文档加载完成 ================================================================
$(document).ready(function(){
    var urlSearch = window.location.search.substring(1);
    var sign = urlSearch.substr(urlSearch.indexOf('=')+1,2);
    switch (sign){
        case 'ws':
            $(".search-classify").find('li.classify-name').removeClass('selected');
            $(".classify-name-1").addClass('selected');
            break;
        case 'fa':
            $(".search-classify").find('li.classify-name').removeClass('selected');
            $(".classify-name-2").addClass('selected');
            break;
        case 'sx':
            $(".search-classify").find('li.classify-name').removeClass('selected');
            $(".classify-name-3").addClass('selected');
            break;
        default: ;
    }
})
//## 文档加载完成 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!',
    searchForm:{
        searchContent:'', //搜索框内容
    }
}

//# model计算属性定义
model.computed = {

}

//# model方法定义
model.methods = {
    reqBySearch:reqBySearch
}

//# model事件定义
model.events = {
    'reqBySearchData':'reqBySearch'
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //首页底部关于
        Lasearch, //分类搜索
        Lawfirm, // 律师事务所推荐
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 分类搜索切换逻辑==============================================================
$(".search-classify").find('li.classify-name').hover(function(){
	// $(".search-classify").find('li.classify-name').removeClass('selected');
	// $(this).addClass('selected');
},function(){
    // $(this).removeClass('selected');
}).bind('click',function(){
    $(".search-classify").find('li.classify-name').removeClass('selected');
	$(this).addClass('selected');
	var val = $(this).attr('data-hover');
	console.log('val:'+val);
    searchClassify=val;
});
//## 分类搜索切换逻辑=============================================================

//# 搜索 =======================================================================
function reqBySearch(){
    var ctx = this;
    console.log('searchClassify');
    console.log(searchClassify);
    switch (searchClassify){
        case '司法文书': classifyKey(ctx,0); break;
        case '法院公告': classifyKey(ctx,1); break;
        case '失信被执行人': classifyKey(ctx,2); break;
        case '律师事务所': classifyKey(ctx,3); break;
        default: classifyKey(ctx,0);
    }
}

// 将searchForm参数从model中取回
function getSearchParas(searchForm) {
    return searchForm;
}

function classifyKey(ctx,mode){
    console.log("hello world");
    // 取回搜索框参数
    var searchForm = getSearchParas(ctx.searchForm);
    console.log(searchForm);
    var keyWord = searchForm.searchContent;
    if(keyWord==""){
        return;
    }
    let link = "./judiciallists.jsp?key="+keyWord+"&mode="+mode;
    // 跳转页面至搜索列表页
    window.location.href=link;
}

//## 搜索 ======================================================================
