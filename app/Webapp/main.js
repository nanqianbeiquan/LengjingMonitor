import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/indexApi.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexsearch from './components/Indexsearch.vue'
import Indexabout from './components/Indexabout.vue'
import Indexlink from './components/Indexlink.vue'
import Indexsearchlist from './components/Indexsearchlist.vue'
import Hotnews from './components/Hotnews.vue'


//## 全局变量设置 ================================================================
var searchClassify = "全部";

//## 全局变量设置 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {
	
};

//# model数据定义
model.data = {
    flag: 'flag here!',
    searchForm:{
		searchContent:'', //搜索框内容
	}
}

//# model方法定义
model.methods = {
	reqBySearch: reqBySearch,
}

//# model计算属性定义
model.computed = {

}

//# model事件定义
model.events = {
	'reqBySearchData': 'reqBySearch',
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexsearch, //首页分类搜索
        Indexabout, //首页底部关于
        Indexlink, //链接至其他行业
        Indexsearchlist, //查询分类列表
        Hotnews, //新闻热点
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 分类搜索切换逻辑==============================================================
$(".search-classify").find('li.classify-name').hover(function(){
	// 
},function(){
    // 
}).bind('click',function(){
    $(".search-classify").find('li.classify-name').removeClass('selected');
	$(this).addClass('selected');
	var val = $(this).attr('data-hover');
	// console.log('val:'+val);
	searchClassify=val;
});
//## 分类搜索切换逻辑=============================================================

//# 搜索 =======================================================================
function reqBySearch(){
	var ctx = this;
	console.log('searchClassify');
	console.log(searchClassify);
	switch (searchClassify){
		case '全部': classifyKey(ctx,0); break;
		case '企业名': classifyKey(ctx,1); break;
		case '法人/高管': classifyKey(ctx,2); break;
		case '股东': classifyKey(ctx,3); break;
		case '商标': classifyKey(ctx,4); break;
		case '注册地址': classifyKey(ctx,5); break;
		// case '经营范围': classifyKey(ctx,6); break;
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
    let link = "./searchCompLists.jsp?key="+keyWord+"&mode="+mode;
    // 跳转页面至搜索列表页
    window.location.href=link;
}

//## 搜索 ======================================================================