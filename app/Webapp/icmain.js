import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/icmain.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexabout from './components/Indexabout.vue'
import Icsearch from './components/Icsearch.vue'


//## 全局变量设置 ================================================================

//## 全局变量设置 ================================================================

//## 文档加载完成 ================================================================
// $(document).ready(function(){
// 	console.log("window");
// 	console.log(window.location.search.substring(1));
// })
//## 文档加载完成 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!'
}

//# model方法定义
model.methods = {

}

//# model计算属性定义
model.computed = {

}

//# model事件定义
model.events = {

}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //首页底部关于
        Icsearch, //分类搜索
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
});
//## 分类搜索切换逻辑=============================================================