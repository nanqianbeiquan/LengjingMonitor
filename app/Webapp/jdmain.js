import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexabout from './components/Indexabout.vue'
import Jdjudicialdetails from './components/Jdjudicialdetails.vue'

//## 全局变量设置 ================================================================

//## 全局变量设置 ================================================================

//# 过滤器 =====================================================================
// 隐藏或显示侧边栏公司信息的万元单位
Vue.filter('strToFixed', function (str) {
    if(str != '' && str!= undefined) {
    	if(str.length>200){
	        return str.substr(0,200)+'......';
    	}else{
    		return str;
    	}
    } else {
        return '';
    }
});
//## 过滤器 ====================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!',
    caseContent: {
		head:{},
		baseInfo:[],
		mainBody:[],
		index:[]
	}, // 文书内容
}

//# model计算属性定义
model.computed = {

}

//# model方法定义
model.methods = {
	locateTo: locateTo
}

//# model事件定义
model.events = {
	'locateToCalled': 'locateTo'
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //底部关于
        Jdjudicialdetails, //司法详情
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//## 文档加载完成 ================================================================
$(document).ready(function(){
	var searchArgs = getQueryStringArgs();
	if(searchArgs.hasOwnProperty('id')){
		if(searchArgs.id!=''){
			sendAjax(searchArgs.id,searchArgs.key);
		}
	}
})

function sendAjax(id,key){
	// 清除加载动画
	$('#loadingAnimation').show();
	var dataType = 'json';
	$.ajax({
		// 搜索
	    url:'Access/sfMultipleSearchDetail', 
	    data:{
	        //传递参数
	       	key:id,   //司法文书ID
	       	hlkeyword: key
	    },
	    type:'post',
	    timeout: 120000,
	    cache:false,  
	    dataType:dataType,
	    success:function(data){
	    	// 清除加载动画
	    	$('#loadingAnimation').hide();
	    	// console.log('data');
	    	// console.log(data);
	    	let rawData = data.data;
	    	let caseContent = {
	    		head:{},
	    		baseInfo:[],
	    		mainBody:[],
	    		index:[]
	    	};
	    	if(rawData.hasOwnProperty('案件名称')){
		    	caseContent.head['案件名称'] = rawData['案件名称'];
	    	}else{
	    		caseContent.head['案件名称'] = '';
	    	}
	    	caseContent.baseInfo = rawData['基本信息'].map(function(item){
	    		if(item.title=='案号'){
	    			caseContent.head['案号'] = item.content;
	    		}else if(item.title=='审理法院'){
	    			caseContent.head['审理法院'] = item.content;
	    		}else if(item.title=='裁判日期'){
	    			caseContent.head['裁判日期'] = item.content;
	    		}else if(item.title=='案由'){
	    			let newItem = {};
	    			newItem.title = item.title;
	    			let cause = item.content.split('->').pop();
	    			newItem.content = cause;
	    			return newItem;
	    		}
	    		return item;
	    	})
	    	caseContent.baseInfo = caseContent.baseInfo.filter(function(item){
	    		if(item.content!=''){
	    			return true;
	    		}else{
	    			return false;
	    		}
	    	})
	    	caseContent.mainBody = rawData['正文'].map(function(item){
	    		caseContent.index.push(item.title);
	    		return item;
	    	});
	    	// console.log('caseContent');
	    	// console.log(caseContent);
	    	// 将数据挂载回模型
	    	vm.$data.caseContent = caseContent;
	    },
	    error: function(error){
	    	// 清除加载动画
	    	$('#loadingAnimation').hide();
	        console.log(error);
	        alert('网络忙，请稍后再试');
	    }
	})
}

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

//# 快速索引定位 =================================================================
function locateTo(index){
	// 取得单击节点的id获取右侧相应的LI元素，并滑到点端聚焦显示
	var id = "case-body-t"+index;
	var liElement = document.getElementById(id);
	$('body').animate({scrollTop: liElement.offsetTop+50}, 'fast');
}
//## 快速索引定位 ================================================================

