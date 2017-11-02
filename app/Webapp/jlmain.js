import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/bootstrap-treeview.css");

//# 导入组件
import Indexnav from './components/Indexnav.vue'
import Signin from './components/Signin.vue'
import Indexabout from './components/Indexabout.vue'
import Jljudiciallist from './components/Jljudiciallist.vue'

import treeview from './modules/bootstrap-treeview.js'
// console.log(treeview);
treeview($, window, document);

//## 全局变量设置 ================================================================
// 全局存储搜索关键字
var keyWord = '';
var searchLists = [];

var searchConditionDisp = new Set();
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
    searchLists: [], //搜索列表
    listsArr:[], //翻页标签
    searchForm:{
        searchContent:'', //搜索框内容
    },
    searchConditionDisp:{},
    searchConditionAjax:{},
    searchConditionDispArr:[],  //v-for 对象不能动态更新
    searchConditionAjaxArr: [],
}

//# model计算属性定义
model.computed = {

}

//# model方法定义
model.methods = {
    reqBySearch: reqBySearch,
    sortByDefault: sortByDefault,
    sortByDesc: sortByDesc,
    selectPage: selectPage,
    deleteCondition: deleteCondition
}

//# model事件定义
model.events = {
    'reqBySearchData': 'reqBySearch',
    'sortByDefaultCalled': 'sortByDefault',
    'sortByDescCalled': 'sortByDesc',
    'selectPageCalled': 'selectPage',
    'deleteConditionCalled':'deleteCondition',
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components: {
        Indexnav, //顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //底部关于
        Jljudiciallist,
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 分类搜索切换逻辑==============================================================
// $(".search-classify").find('li.classify-name').hover(function(){

// },function(){

// }).bind('click',function(){
//     $(".search-classify").find('li.classify-name').removeClass('selected');
// 	$(this).addClass('selected');
// 	var val = $(this).attr('data-hover');
// 	console.log('val:'+val);
//     searchClassify=val;
// });
//## 分类搜索切换逻辑=============================================================

//## 文档加载完成 ================================================================
$(document).ready(function(){
	var searchArgs = getQueryStringArgs();

    keyWord = searchArgs.hasOwnProperty('key') ? searchArgs.key : '';
    var mode = searchArgs.hasOwnProperty('mode') ? searchArgs.mode : '';

	if(keyWord!=''){
		vm.$data.searchForm.searchContent = keyWord;
		vm.$data.searchConditionDisp = {};
		vm.$data.searchConditionAjax = {};
		vm.$data.searchConditionDisp.keyword = keyWord;
		vm.$data.searchConditionAjax.keyword = keyWord;
		// if(!searchConditionDisp.has(keyWord)){
		// 	searchConditionDisp.add(keyWord);
		// 	vm.$data.searchConditionDisp.push(keyWord);
		// 	vm.$data.searchConditionAjax.push(keyWord);
		// }
		sendAjax(keyWord, mode, '');
	}
    
})

function sendAjax(keyWord, mode, sortBy){
	//
	vm.$data.searchConditionDispArr = [];
	vm.$data.searchConditionAjaxArr = [];
	for (let key in vm.$data.searchConditionDisp){
		vm.$data.searchConditionDispArr.push(vm.$data.searchConditionDisp[key]);
		vm.$data.searchConditionAjaxArr.push(key);
	}
	// 清除加载动画
	$('#loadingAnimation').show();
	let cols = "caipanriqi,diyuprovince,diyucity,fayuancengci,fayuan,anjianmingcheng,anhao,anyou,shenpanrenyuan,lvshi,shenpanchengxu,id,guanjianci,dangshiren,caipangnianfeng,anjianleixing,liyou,fayuanld,wenshuleixing";
	var dataType = 'json';
	$.ajax({
		// 搜索
	    url:'Access/sfMultipleSearch', 
	    data:{
	        //传递参数
	       	keyword:JSON.stringify(vm.$data.searchConditionAjax),   //表单内需要发送的关键字
	       	type: '',
	       	rows: 100,    //需要后端返回的条数
	       	region: 'keyword',
	       	columns: cols,
	       	sort: sortBy,
	       	ishighlight: cols,
	       	hlkeyword:keyWord
	    },
	    type:'post',
	    timeout: 120000,
	    cache:false,  
	    dataType:dataType,
	    success:function(data){
	    	// 清除加载动画
	    	$('#loadingAnimation').hide();
	    	console.log('data');
	    	console.log(data);
	    	searchLists = data.data.slice(1);

	    	// 搜索列表
	    	// 将前十条数据挂载回模型
	    	if(searchLists.length <= 10){
	    		vm.$data.searchLists = searchLists.slice(0);
	    	}else{
	    		vm.$data.searchLists = searchLists.slice(0,10);
	    	}
	    	// 计算页数
	    	let size = Math.ceil(searchLists.length/10);
	    	let sizeArr = [];
	    	for(let i=0; i<size; i++){
	    		sizeArr[i] = i+1;
	    	}
	    	vm.$data.listsArr=sizeArr;
	    	// 为翻页标签添加样式
	    	setTimeout(function(){
	    		$('.jl-tabPage li.jl-page:eq(0)').addClass('active');
	    	}, 100);

	    	// facets关键词
	    	let guanjianci = [
	    		{
	    			text:'关键词',
	    			nodes:[]
	    		}
	    	];
	    	for(let item in data.facets.guanjianci){
	    		let word={};
	    		word.text= item + ' [' + data.facets.guanjianci[item] + ']';
	    		word.key = item;
	    		word.val = data.facets.guanjianci[item];
	    		guanjianci[0].nodes.push(word);
	    	}
	    	guanjianci[0].nodes = guanjianci[0].nodes.sort(compare('val',0)).slice(0,10);
	    	if(guanjianci[0].nodes.length>0){
		    	facets(guanjianci,'facets-guanjianci');
	    	}

	    	// 案由
	    	let anyou = [
	    		{
	    			text:'案由',
	    			nodes:[]
	    		}
	    	];
	    	let anyouLevel = data.facets.anyou.value;
	    	if(anyouLevel.length>0){
	    		let anyouLevelStr = JSON.stringify(anyouLevel).replace(/key/ig,"text");
	    		anyouLevelStr = anyouLevelStr.replace(/value/ig,"nodes");
	    		anyouLevelStr = anyouLevelStr.replace(/,\"nodes\":\[\]/ig,'');
	    		anyou[0].nodes = JSON.parse(anyouLevelStr);
	    		facets(anyou,'facets-anyou');
	    	}

	    	// 法院层次
	    	let fayuancengci = [
	    		{
	    			text:'法院层次',
	    			nodes:[]
	    		}
	    	];
	    	if(data.facetsPivot[0].hasOwnProperty('fayuancengci')){
	    		let fayuancengciLevel = data.facetsPivot[0].fayuancengci;
	    		let fayuancengciStr = JSON.stringify(fayuancengciLevel).replace(/name/ig,"text");
	    		fayuancengciStr = fayuancengciStr.replace(/value/ig,"nodes");
	    		fayuancengci[0].nodes = JSON.parse(fayuancengciStr);
	    		facets(fayuancengci,'facets-fayuancengci');
	    	}

	    	// 地域
	    	let diyuprovince = [
	    		{
	    			text:'地域',
	    			nodes:[]
	    		}
	    	];
	    	if(data.facetsPivot[1].hasOwnProperty('diyuprovince')){
	    		let diyuprovinceLevel = data.facetsPivot[1].diyuprovince;
	    		let diyuprovinceStr = JSON.stringify(diyuprovinceLevel).replace(/name/ig,"text");
	    		diyuprovinceStr = diyuprovinceStr.replace(/value/ig,"nodes");
	    		diyuprovince[0].nodes = JSON.parse(diyuprovinceStr);
	    		facets(diyuprovince,'facets-diyuprovince');
	    	}

	    	// 年份
	    	let caipangnianfeng = [
	    		{
	    			text:'年份',
	    			nodes:[]
	    		}
	    	];
	    	for(let item in data.facets.caipangnianfeng){
	    		let word={};
	    		word.text= item + ' [' + data.facets.caipangnianfeng[item] + ']';
	    		word.key = item;
	    		word.val = data.facets.caipangnianfeng[item];
	    		caipangnianfeng[0].nodes.push(word);
	    	}
	    	caipangnianfeng[0].nodes = caipangnianfeng[0].nodes.sort(compare('key',0));
	    	if(caipangnianfeng[0].nodes.length>0){
		    	facets(caipangnianfeng,'facets-caipangnianfeng');
	    	}

	    	// 审判程序
	    	let shenpanchengxu = [
	    		{
	    			text:'审判程序',
	    			nodes:[]
	    		}
	    	];
	    	for(let item in data.facets.shenpanchengxu){
	    		let word={};
	    		word.text= item + ' [' + data.facets.shenpanchengxu[item] + ']';
	    		word.key = item;
	    		word.val = data.facets.shenpanchengxu[item];
	    		shenpanchengxu[0].nodes.push(word);
	    	}
	    	if(shenpanchengxu[0].nodes.length>0){
		    	facets(shenpanchengxu,'facets-shenpanchengxu');
	    	}

	    	// 
	    	let anjianleixing = [
	    		{
	    			text:'案件类型',
	    			nodes:[]
	    		}
	    	];
	    	for(let item in data.facets.anjianleixing){
	    		let word={};
	    		word.text= item + ' [' + data.facets.anjianleixing[item] + ']';
	    		word.key = item;
	    		word.val = data.facets.anjianleixing[item];
	    		anjianleixing[0].nodes.push(word);
	    	}
	    	if(anjianleixing[0].nodes.length>0){
		    	facets(anjianleixing,'facets-anjianleixing');
	    	}
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

//# 搜索 ========================================================================
function reqBySearch(){
	// 取回搜索框参数
    var searchForm = getSearchParas(this.searchForm);
    keyWord = searchForm.searchContent;
    vm.$data.searchConditionDisp = {};
    vm.$data.searchConditionAjax = {};
    vm.$data.searchConditionDisp.keyword = keyWord;
    vm.$data.searchConditionAjax.keyword = keyWord;
    sendAjax(keyWord, 0, '');
}

// 将searchForm参数从model中取回
function getSearchParas(searchForm) {
    return searchForm;
}

// 默认排序
function sortByDefault(){
	sendAjax(keyWord, 0, '');
}
// 裁判日期排序
function sortByDesc(){
	let sortByAsc = 'caipanriqi asc';
	let sortByDesc = 'caipanriqi desc';
	sendAjax(keyWord, 0, sortByDesc);
}

//## 搜索 =======================================================================

//# 列表翻页 ====================================================================
function selectPage(e){
	// console.log('e');
	// console.log(e);
	let pageNum = e.target.firstChild.data;
	// console.log('pageNum:'+pageNum);
	$('.jl-tabPage').find('li.jl-page').bind('click',function(){
		$('.jl-tabPage').find('li.jl-page').removeClass('active');
		$(this).addClass('active');
	})
	if(vm.$data.listsArr<=1){
		return;
	}else{
		vm.$data.searchLists = searchLists.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
		// 滚动条回到顶部
		$('body').animate({scrollTop: '0px'}, 'slow');
	}
}
//## 列表翻页 ====================================================================

//# facets =================================================================
function facets(treeData,ele){

	var options= {
		bootstrap2: false, 
		showTags: true,
		levels: 2,
		expandIcon:"glyphicon glyphicon-chevron-right",
		collapseIcon:"glyphicon glyphicon-chevron-down",
		data: treeData
	}

	$('#'+ele).treeview(options);

	$('#'+ele).on('nodeSelected', function(event, data) {
		// console.log('nodeSelected');
		// console.log(event);
		// console.log(data);
		// console.log(event.currentTarget.id);
		switch(event.currentTarget.id){
			case 'facets-guanjianci':
				if(data.text != '关键词'){

					if(vm.$data.searchConditionDisp.guanjianci != '关键词：'+data.key){
						console.log('关键词');
						vm.$data.searchConditionDisp.guanjianci = '关键词：'+data.key;
						vm.$data.searchConditionAjax.guanjianci = data.key;
					}
				}else{
					return;
				}
				break;
			case 'facets-anyou': 
				if(data.text != '案由'){
					if(vm.$data.searchConditionDisp.anyou != '案由：'+data.text.substring(0,data.text.indexOf('['))){
						vm.$data.searchConditionDisp.anyou = '案由：'+data.text.substring(0,data.text.indexOf('['));
						vm.$data.searchConditionAjax.anyou = data.text.substring(0,data.text.indexOf('['));
					}
				}else{
					return;
				}
				break;
			case 'facets-fayuancengci': 
				if(data.text != '法院层次'){
					if(vm.$data.searchConditionDisp[data.key] != '法院：'+data.text.substring(0,data.text.indexOf('['))){
						vm.$data.searchConditionDisp[data.key] = '法院：'+data.text.substring(0,data.text.indexOf('['));
						vm.$data.searchConditionAjax[data.key] = data.text.substring(0,data.text.indexOf('['));
					}
				}else{
					return;
				}
				break;
			case 'facets-diyuprovince':
				if(data.text != '地域'){
					if(vm.$data.searchConditionDisp[data.key] != '地域：'+data.text.substring(0,data.text.indexOf('['))){
						vm.$data.searchConditionDisp[data.key] = '地域：'+data.text.substring(0,data.text.indexOf('['));
						vm.$data.searchConditionAjax[data.key] = data.text.substring(0,data.text.indexOf('['));
					}
				}else{
					return;
				}
				break;
			case 'facets-caipangnianfeng': 
				if(data.text != '年份'){
					if(vm.$data.searchConditionDisp.caipangnianfeng != '年份：'+data.key){
						vm.$data.searchConditionDisp.caipangnianfeng = '年份：'+data.key;
						vm.$data.searchConditionAjax.caipangnianfeng = data.key;
					}
				}else{
					return;
				}
				break;
			case 'facets-shenpanchengxu':
				if(data.text != '审判程序'){
					if(vm.$data.searchConditionDisp.shenpanchengxu != '审判程序：'+data.key){
						vm.$data.searchConditionDisp.shenpanchengxu = '审判程序：'+data.key;
						vm.$data.searchConditionAjax.shenpanchengxu = data.key;
					}
				}else{
					return;
				}
				break;
			case 'facets-anjianleixing': 
				if(data.text != '案件类型'){
					if(vm.$data.searchConditionDisp.anjianleixing != '案件类型：'+data.key){
						vm.$data.searchConditionDisp.anjianleixing = '案件类型：'+data.key;
						vm.$data.searchConditionAjax.anjianleixing = data.key;
					}
				}else{
					return;
				}
				break;
		}
		// console.log(vm.$data.searchConditionDisp);
		// console.log(vm.$data.searchConditionAjax);
		sendAjax(vm.$data.searchConditionAjax.keyword, '', '');
	});
} 

// 按对象属性排序比较函数
function compare(propertyName,mode) { 
	// mode=0/undefined降序   mode=1升序
    return function (object1, object2) { 
        var value1 = object1[propertyName]; 
        var value2 = object2[propertyName]; 
        if(mode){
        	if (value2 < value1) { 
        	    return 1; 
        	}else if (value2 > value1) { 
        	    return -1; 
        	}else { 
        	    return 0; 
        	} 
        }else{
        	if (value2 < value1) { 
        	    return -1; 
        	}else if (value2 > value1) { 
        	    return 1; 
        	}else { 
        	    return 0; 
        	} 
        }
    } 
} 
//## facets ================================================================

//## 删除筛选条件 ============================================================
function deleteCondition(index){
	if(vm.$data.searchConditionAjaxArr[index]!='keyword'){
		let key = vm.$data.searchConditionAjaxArr[index];
		delete vm.$data.searchConditionDisp[key];
		delete vm.$data.searchConditionAjax[key];
		vm.$data.searchConditionDispArr.splice(index,1);
		vm.$data.searchConditionAjaxArr.splice(index,1);
		sendAjax(vm.$data.searchConditionAjax.keyword, '', '');
	}else{
		defaultSetting();
	}
}

function defaultSetting(){
	vm.$data.searchConditionDisp = {};
	vm.$data.searchConditionAjax = {};
	vm.$data.searchConditionDispArr = [];
	vm.$data.searchConditionAjaxArr = [];
	vm.$data.searchLists = [];
	searchLists =[];
	vm.$data.listsArr =[];
	facets([],'facets-guanjianci');
	facets([],'facets-anyou');
	facets([],'facets-fayuancengci');
	facets([],'facets-diyuprovince');
	facets([],'facets-caipangnianfeng');
	facets([],'facets-shenpanchengxu');
	facets([],'facets-anjianleixing');
}
//## 删除筛选条件 ============================================================