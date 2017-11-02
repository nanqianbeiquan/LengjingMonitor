import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");

//# 导入组件
import Signin from './components/Signin.vue'
import Indexnav from './components/Indexnav.vue'
import Indexabout from './components/Indexabout.vue'
import Clcomplists from './components/Clcomplists.vue'
import Clsearch from './components/Clsearch.vue'


//## 全局变量设置 ================================================================

// 搜索类型
var searchClassify = "全部";
// 存储搜索返回的公司列表
var companyLists = [];

//## 全局变量设置 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!',
    compLists: [],
    listsLength:[],
    renderCondition:{
    	all: false,
    	keyperson: false,
    	shareholder: false,
    	shangbiao: false
    },
    searchKey: {
    	key:''
    }, //搜索关键字
}

//# model方法定义
model.methods = {
	reqBySearch: reqBySearch,
	selectPage: selectPage,
	selectFirstPage: selectFirstPage,
	selectLastPage: selectLastPage,
	selectSort: selectSort
}

//# model计算属性定义
model.computed = {

}

//# model事件定义
model.events = {
	'reqBySearchData': 'reqBySearch',
	'selectPageCalled': 'selectPage',
	'selectFirstPageCalled': 'selectFirstPage',
	'selectLastPageCalled': 'selectLastPage',
	'selectSortCalled': 'selectSort'
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components:{
        Signin, //登陆
        Indexnav, //顶部导航栏用户登陆、注册
        Indexabout, //底部关于
        Clsearch, // 搜索框
        Clcomplists, 
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 页面加载完成 ================================================================
$(document).ready(function(){
	// 隐藏搜索提示信息
	$('.seach-tip').hide();

	let keyWord = getQueryStringArgs().key;
	let mode = getQueryStringArgs().mode;
	// console.log(keyWord);
	// console.log(mode);
	sendKeyWord(keyWord,mode);
})

// "nenterprisename": 公司名,
// "nlegalrepresentative": 法人,
// "nregisteredcapital": 注册资本,
// "nresidenceaddress": 注册地址
// "nestablishmentdate": 成立日期
// "nregistrationstatus": 注册状态,
// "nkeypersonname": 高管,
// "nshangbiao": 商标,
// "nshareholdername": 股东,

function sendKeyWord(keyWord,mode){
	let modes = ['keyword','nenterprisename','person','nshareholdername','nshangbiao','nresidenceaddress','nbusinessscope']
	let index = Number(mode);
	let cols = {
		'keyword':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus,nshangbiao",
		'nenterprisename':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus",
		'person':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus,nkeypersonname",
		'nshareholdername':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus,nshareholdername",
		'nshangbiao':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus,nshangbiao",
		'nresidenceaddress':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus",
		'nbusinessscope':"nenterprisename,nlegalrepresentative,nregisteredcapital,nresidenceaddress,nestablishmentdate,nregistrationstatus"
	}
	var dataType = 'json';
	$.ajax({
		// 搜索
	    url:'Access/multipleSearch', 
	    data:{
	        //传递参数
	       	keyword:keyWord,   //表单内需要发送的关键字
	       	rows: 100,    //需要后端返回的条数
	       	region: modes[index],
	       	columns: cols[modes[index]]
	    },
	    type:'post',
	    timeout: 120000,
	    cache:false,  
	    dataType:dataType,
	    success:function(data){
	    	// 恢复隐藏商标、高管、股东渲染条件
	    	vm.$data.renderCondition = {
		    	all: false,
		    	keyperson: false,
		    	shareholder: false,
		    	shangbiao: false
		    }
	    	// 清除加载动画
	    	$('.spinner').hide();
	        // var rawData = data.data;
	        console.log("rawData");
	        console.log(data);
	        var rawData = data.data;
            if(rawData.length<1){
            	// 未搜到相关内容提示信息
    			$('.seach-tip').show();
            }
            companyLists = [];
            companyLists = rawData.slice(1);
            let key = eval('/'+ keyWord + '/ig');
            if(modes[index]=='nenterprisename'){
            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		d.nenterprisename = d.nenterprisename.replace(key,"<span style='color:red'>"+keyWord+"</span>");
            	})
            }else if(modes[index]=='person'){
            	// 显示高管
            	vm.$data.renderCondition.all = true;
            	vm.$data.renderCondition.keyperson = true;
            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		d.nlegalrepresentative = d.nlegalrepresentative.replace(key,"<span style='color:red'>"+keyWord+"</span>");
            		d.nkeypersonname = d.nkeypersonname.replace(key,"<span style='color:red'>"+keyWord+"</span>");
            	})
            }else if(modes[index]=='nshareholdername'){
            	// 显示股东
            	vm.$data.renderCondition.all = true;
            	vm.$data.renderCondition.shareholder = true;
            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		if(d.nshareholdername!=null && d.nshareholdername!=''){
	            		d.nshareholdername = d.nshareholdername.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            	})
            }else if(modes[index]=='nshangbiao'){
            	// 显示商标
            	vm.$data.renderCondition.shangbiao = true;
            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		if(d.nshangbiao != null && d.nshangbiao!= ''){
	        			d.nshangbiao = d.nshangbiao.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            	})
            }else if(modes[index]=='nresidenceaddress'){
            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		if(d.nresidenceaddress != null && d.nresidenceaddress!=''){
	            		d.nresidenceaddress = d.nresidenceaddress.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            	})
            }else{
            	// 显示商标
            	vm.$data.renderCondition.shangbiao = true;

            	companyLists.forEach(function(d){
            		d.compName = d.nenterprisename;
            		if(d.nenterprisename!=null && d.nenterprisename!=''){
	            		d.nenterprisename = d.nenterprisename.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            		if(d.nlegalrepresentative != null && d.nlegalrepresentative != ''){
	            		d.nlegalrepresentative = d.nlegalrepresentative.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            		if(d.nshangbiao === "\\\N"){
            			d.nshangbiao = '';
            		}else{
            			d.nshangbiao = d.nshangbiao.replace(key,"<span class='cl-keyWord' style='color:red'>"+keyWord+"</span>");
            		}
            	})
            }
            // 将前十条数据挂载回模型
            if(companyLists.length <= 10){
            	vm.$data.compLists = companyLists.slice(0);
            }else{
            	vm.$data.compLists = companyLists.slice(0,10);
            }

            // 计算页数
            let size = Math.ceil(companyLists.length/10);
            let sizeArr = [];
            for(let i=0; i<size; i++){
            	sizeArr[i] = i+1;
            }
            vm.$data.listsLength=sizeArr;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cl-tabPage li.cl-page:eq(0)').addClass('active');
            }, 100);
	        
	    },
	    error: function(error){
	    	// 清除加载动画
	    	$('.spinner').hide();
	    	console.log('error');
	        console.log(error);
	        alert('网络忙，请稍后再试');
	    }
	})
}

//=> 已取消
function sendAjax(keyWord){
	var dataType = 'json';
	$.ajax({
		// 搜索
	    url:'Access/linkage/data', 
	    data:{
	        //传递参数
	       	keyword:keyWord,   //表单内需要发送的关键字
	       	rows: 100,    //需要后端返回的条数
	       	columns:'Registered_Info:enterprisename', //查询公司名称
	       	ishighlight: '', //是否高亮
	       	type: 'true'
	    },
	    type:'post',
	    timeout: 120000,
	    cache:false,  
	    dataType:dataType,
	    success:function(data){
	    	// 清除加载动画
	    	$('.spinner').hide();
	        var rawData = data.data;
	        // console.log("rawData");
	        // console.log(rawData);
	        if(rawData.length<1){
	        	// 未搜到相关内容提示信息
				$('.seach-tip').show();
	        }
	        companyLists = [];
	        companyLists = rawData.slice(1);
	        let key = eval('/'+ keyWord + '/ig');
	        companyLists.forEach(function(d){
	        	d.enterprisename = d.enterprisename.replace(key,"<span style='color:red'>"+keyWord+"</span>");
	        })
	        // 将前十条数据挂载回模型
	        if(companyLists.length <= 10){
	        	vm.$data.compLists = companyLists.slice(0);
	        }else{
	        	vm.$data.compLists = companyLists.slice(0,10);
	        }
	        
	        // 计算页数
	        let size = Math.ceil(companyLists.length/10);
	        let sizeArr = [];
	        for(let i=0; i<size; i++){
	        	sizeArr[i] = i+1;
	        }
	        vm.$data.listsLength=sizeArr;
	        // 为翻页标签添加样式
	        setTimeout(function(){
	        	$('.cl-tabPage li.cl-page:eq(0)').addClass('active');
	        }, 100);
	    },
	    error: function(error){
	    	// 清除加载动画
	    	$('.spinner').hide();
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
//## 页面加载完成 ===============================================================

//# 过滤器 =====================================================================
// 隐藏或显示侧边栏公司信息的万元单位
Vue.filter('companyCapitalFormat', function (capital) {
    if(capital != '') {
        return capital + ' 万元';
    } else {
        return '';
    }
});
//## 过滤器 ====================================================================

//# 搜索类型选择 ================================================================
$(".cl-search-lists").find('li.classify-name').hover(function(){
	// 
},function(){
    // 
}).bind('click',function(){
    $(".cl-search-lists").find('li.classify-name').removeClass('selected');
	$(this).addClass('selected');
	var val = $(this).attr('data-hover');
	searchClassify=val;
});
//# 搜索类型选择 ================================================================

//# 搜索 =======================================================================
function reqBySearch(){
	let keyWord = this.searchKey.key;
	if(keyWord==''){
		alert("请输入搜索内容");
		return;
	}
	// 加载加载动画
	$('.spinner').show();
	// 隐藏搜索提示信息
	$('.seach-tip').hide();
	// 网页默认设置
	defaultSetting();
	var searchClassifyNames = ['全部','企业名','法人/高管','股东','商标','注册地址'];
	var index = searchClassifyNames.indexOf(searchClassify);
	sendKeyWord(keyWord,index);
}
//## 搜索 ======================================================================
//# 选择排序方式 ================================================================
function selectSort(e){
	// console.log('e');
	// console.log(e);
	let mode = e.target.firstChild.data;
	// console.log(mode);
	// 加载加载动画
	$('.spinner').show();
	let btnMode = mode+"<span class='caret'></span>";
	$(".cl-filter button").html(btnMode);
	let companyListsArr = JSON.parse(JSON.stringify(companyLists));
	if(companyListsArr.length<=1){
		return;
	}else{
		switch (mode){
			case '默认排序': 
				reorder(companyLists); 
				break;
			case '注册资本降序':
				companyListsArr.sort(compare('nregisteredcapital',0));
				reorder(companyListsArr);
				break;
			case '注册资本升序':
				companyListsArr.sort(compare('nregisteredcapital',1));
				reorder(companyListsArr);
				break;
			case '注册时间降序':
				companyListsArr.sort(compare('nestablishmentdate',0));
				reorder(companyListsArr);
				break;
			case '注册时间升序':
				companyListsArr.sort(compare('nestablishmentdate',1));
				reorder(companyListsArr);
				break;
			default: reorder(companyLists);
		}
	}
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
//## 选择排序方式 ===============================================================

//# 列表翻页 ====================================================================
function selectPage(e){
	// console.log('e');
	// console.log(e);
	let pageNum = e.target.firstChild.data;
	// console.log('pageNum:'+pageNum);
	$('.cl-tabPage').find('li.cl-page').bind('click',function(){
		$('.cl-tabPage').find('li.cl-page').removeClass('active');
		$(this).addClass('active');
	})
	if(vm.$data.listsLength<=1){
		return;
	}else{
		vm.$data.compLists = companyLists.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
		// 滚动条回到顶部
		$(document).scrollTop(0);
	}
}
function selectFirstPage(){
	// 滚动条回到顶部
	$(document).scrollTop(0);
	if(vm.$data.listsLength.length<=1){
		return;
	}else{
		vm.$data.compLists = companyLists.slice(0,10);
		$('.cl-tabPage').find('li.cl-page').removeClass('active');
		$('.cl-tabPage li.cl-page:eq(0)').addClass('active');
	}
}
function selectLastPage(){
	// 滚动条回到顶部
	$(document).scrollTop(0);
	var lastP = vm.$data.listsLength.length;
	if(vm.$data.listsLength.length<=1){
		return;
	}else{
		vm.$data.compLists = companyLists.slice(0+((lastP-1)*10),10+((lastP-1)*10));
		$('.cl-tabPage').find('li.cl-page').removeClass('active');
		$('.cl-tabPage li.cl-page:eq('+(lastP-1)+')').addClass('active');
	}
}
// 重新排序
function reorder(compLists){
	// 滚动条回到顶部
	$(document).scrollTop(0);
	setTimeout(function(){
		vm.$data.compLists = compLists.slice(0,10);
		$('.cl-tabPage').find('li.cl-page').removeClass('active');
		$('.cl-tabPage li.cl-page:eq(0)').addClass('active');
		// 清除加载动画
		$('.spinner').hide();
	}, 500);
}
//## 列表翻页 ===================================================================

//# 网页默认设置 =================================================================
function defaultSetting(){
	let btnMode = "默认排序<span class='caret'></span>";
	$(".cl-filter button").html(btnMode);
	$('.cl-tabPage').find('li.cl-page').removeClass('active');
	$('.cl-tabPage li.cl-page:eq(0)').addClass('active');
}
//## 网页默认设置 ================================================================




