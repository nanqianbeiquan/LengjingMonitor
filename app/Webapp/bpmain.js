import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/bpmain.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Indexabout from './components/Indexabout.vue'
import Signin from './components/Signin.vue'
import Bpsearch from './components/Bpsearch.vue'


//## 全局变量设置 ================================================================
var searchClassify = "商标";
//## 全局变量设置 ================================================================

//## 文档加载完成 ================================================================
$(document).ready(function(){
	var sign = getQueryStringArgs().sign;
	switch (sign){
		case 'bd':
			$(".search-classify").find('li.classify-name').removeClass('selected');
			$(".classify-name-1").addClass('selected');
			break;
		case 'pa':
			$(".search-classify").find('li.classify-name').removeClass('selected');
			$(".classify-name-2").addClass('selected');
			break;
		default: ;
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
//## 文档加载完成 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!',
    searchForm: {
    	searchContent:''
    }
}

//# model计算属性定义
model.computed = {

}

//# model方法定义
model.methods = {
	reqBySearch: reqBySearch,
}

//# model事件定义
model.events = {
	'reqBySearchCalled':'reqBySearch',
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //首页底部关于
        Bpsearch, //分类搜索
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 搜索 =======================================================================
function reqBySearch(){
	var ctx = this;
	console.log('searchClassify');
	console.log(searchClassify);
	switch (searchClassify){
		case '商标': classifyKey(ctx,4); break;
		case '专利': classifyKey(ctx,7); break;
		default: classifyKey(ctx,4);
	}
}

// 将searchForm参数从model中取回
function getSearchParas(searchForm) {
    return searchForm;
}

function classifyKey(ctx,mode){
	// 暂时没有专利搜索不执行专利搜索
	if(mode==7){
		return;
	}
	// 取回搜索框参数
    var searchForm = getSearchParas(ctx.searchForm);
    // console.log(searchForm);
    var keyWord = searchForm.searchContent;
    if(keyWord==""){
    	return;
    }
    let link = "./searchCompLists.jsp?key="+keyWord+"&mode="+mode;
    // 跳转页面至搜索列表页
    window.location.href=link;
}

//## 搜索 ======================================================================

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
	// console.log('val:'+val);
	searchClassify=val;
});
//## 分类搜索切换逻辑=============================================================