import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/urmain.css");

//# 导入组件
import Signin from './components/Signin.vue'
import Indexnav from './components/Indexnav.vue'
import Indexabout from './components/Indexabout.vue'
import Urregister from './components/Urregister.vue'
import Cdcompdatails from './components/Cdcompdatails.vue'


//## 全局变量设置 ================================================================
var queryCompName = ''; //存储查询公司

// 工商信息
var Shareholderlists = [];
var Changelists = [];
var Keypersonlists = [];
var Branches = [];
var Chattel_Mortgage = [];
var Equity_Pledge = [];
var ent_Investor = [];
var fr_Investor = [];
var business_abnormal = [];
var Penalty = [];

// 司法信息
var sfws = [];
// 法院公告
var courtAnnoun = [];
// 被执行
var executed = [];
// 失信被执行
var dishonest = [];
//## 全局变量设置 ================================================================

//# 过滤器 =====================================================================
// 隐藏或显示侧边栏公司信息的万元单位
Vue.filter('companyCapitalFormat', function (capital) {
    if(capital != '' && capital!= undefined) {
        return capital + ' 万元';
    } else {
        return '';
    }
});
Vue.filter('toFixed', function (capital) {
    if(capital != '' && capital!= undefined) {
        return parseFloat(capital).toFixed(2);
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
    tab:{
    	tab1: true,
    	tab2: false,
    	tab3: false,
    	tab4: false,
    	tab5: false
    },
    gdlength: [], //股东数目
    bglength: [], //变更数目
    kplength: [], //主要人员
    brlength: [], //分支机构
    eplength: [], //股权出质
    entilength: [], //企业对外投资
    frlength: [], //法人对外投资
    aplength: [], // 行政处罚
    gsInfos:{
		Registered_Info:{},
		Shareholder_Info:[],
		KeyPerson_Info:[],
		Changed_Announcement:[],
		Branches:[],
		Chattel_Mortgage:[],
		Equity_Pledge:[],
		ent_Investor_Info:[],
		fr_Investor_Info:[],
		Business_Abnormal: [],
		Administrative_Penalty: []
    },
    leaglInfo:{
    	sfws: [],
    	courtAnnoun: [],
    	executed:[],
    	dishonest: []
    },
    leaglPages:{
    	sfws:[],
    	courtAnnoun: [],
    	executed: [],
    	dishonest: []
    }
}

//# model计算属性定义
model.computed = {
	
}

//# model方法定义
model.methods = {
	selectTab1: selectTab1,
	selectTab2: selectTab2,
	selectTab3: selectTab3,
	selectTab4: selectTab4,
	selectTab5: selectTab5,
	selectPage1: selectPage1,
	selectPage2: selectPage2,
	selectPage3: selectPage3,
	selectPage4: selectPage4,
	selectPage6: selectPage6,
	selectPage7: selectPage7,
	selectPage8: selectPage8,
	selectPage10: selectPage10,
	selectPage11: selectPage11,
	selectPage12: selectPage12,
	selectPage13: selectPage13,
	selectPage14: selectPage14,
	searchCollectComp: searchCollectComp
}

//# model事件定义
model.events = {
	'selectTab1Called': 'selectTab1',
	'selectTab2Called': 'selectTab2',
	'selectTab3Called': 'selectTab3',
	'selectTab4Called': 'selectTab4',
	'selectTab5Called': 'selectTab5',
	'selectPage1Called': 'selectPage1',
	'selectPage2Called': 'selectPage2',
	'selectPage3Called': 'selectPage3',
	'selectPage4Called': 'selectPage4',
	'selectPage6Called': 'selectPage6',
	'selectPage7Called': 'selectPage7',
	'selectPage8Called': 'selectPage8',
	'selectPage10Called': 'selectPage10',
	'selectPage11Called': 'selectPage11',
	'selectPage12Called': 'selectPage12',
	'selectPage13Called': 'selectPage13',
	'selectPage14Called': 'selectPage14',
	'searchCollectCompCalled': 'searchCollectComp'
}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components:{
        Indexnav, //首页顶部导航栏用户登陆、注册
        Signin, //登陆
        Indexabout, //首页底部关于
        Urregister, //注册
        Cdcompdatails
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================

//# 页面加载完成 ================================================================
$(document).ready(function(){
	let compName =getQueryStringArgs().hasOwnProperty('key')?getQueryStringArgs().key:'';
	if(compName!=''){
		getcompGSInfos(compName);
	}
})

function getcompGSInfos(compName){
	queryCompName = compName;
	// 加载动画
	$('#loadingAnimation').show();

	var queryCompany = compName;
    var businessInfoColumns = 'zch,registrationno,enterprisename,province,legalrepresentative,enterprisetype,establishmentdate,registeredcapital,residenceaddress,validityfrom,validityto,businessscope,registrationinstitution,registrationstatus,entstatus,organizationcode,tyshxy_code,approvaldate,';
    var shareholderColumns = 'shareholder_type,shareholder_name,shareholder_certificationtype,subscripted_capital,actualpaid_capital,';
    var changeColumns = 'changedannouncement_date,changedannouncement_events,changedannouncement_before,changedannouncement_after,';
    var keyPersonColumns = 'keyperson_name,keyperson_position,';
    var branchesColumns = 'branch_no,branch_registrationno,branch_registrationname,brprincipal,';
    var chattelmortgageColumns = 'chattelmortgage_no,chattelmortgage_registrationno,chattelmortgage_registrationdate,chattelmortgage_registrationinstitution,chattelmortgage_guaranteedamount,chattelmortgage_status,chattelmortgage_details,appregrea,priclaseckind,pefperform,pefperto,guaname,quan,value,';
    var equitypledgeColumns = 'equitypledge_no,equitypledge_registrationno,equitypledge_pledgor,equitypledge_pledgorid,equitypledge_amount,equitypledge_pawnee,equitypledge_pawneeid,equitypledge_registrationdate,equitypledge_status,equitypledge_announcedate,equitypledge_change,lastupdatetime,equitypledge_detail,'
    var entinvestorColumns = 'entname,fundedratio,entinvesubsubconam,entstatus,enttype,entinveregcap,';
    var frinvestorColumns = 'frinvesubsubconam,frinveregcap,';
    var businessabnormalColumns = 'abnormal_no,abnormal_events,abnormal_datesin,abnormal_moveoutreason,abnormal_datesout,abnormal_decisioninstitution,';
    var penaltyColumns = 'penalty_no,penalty_code,penalty_illegaltype,penalty_decisioncontent,penalty_decisioninsititution,penalty_decisiondate';
    var queryColumns = businessInfoColumns + shareholderColumns + changeColumns + keyPersonColumns+branchesColumns+chattelmortgageColumns+equitypledgeColumns+entinvestorColumns+frinvestorColumns+businessabnormalColumns+penaltyColumns;
    // 返回数据类型必须设定为json，默认是string字符串
	var dataType = 'json';
	$.ajax({
		// 搜索
	    url:'Access/gs/companyinfo', 
	    data:{
	        // compNameAjax是接口设定的参数名称
            companyName: queryCompany,
            columns: queryColumns
	    },
	    type:'post',
	    timeout: 120000,
	    cache:false,  
	    dataType:dataType,
	    success:function(data){
	    	// 清除加载动画
	    	$('#loadingAnimation').hide();
	        var rawData = data.data;
	        // console.log("rawData");
	        // console.log(data);
	        // 将数据挂载回vm
	        //登记信息
	        vm.$data.gsInfos.Registered_Info = rawData.Registered_Info[0];

	        //股东信息
	        if(rawData.hasOwnProperty('Shareholder_Info')){
		        Shareholderlists = rawData.Shareholder_Info;
	        }else{
	        	Shareholderlists = [];
	        }
	        // 将前十条数据挂载回模型
            if(Shareholderlists.length <= 10){
            	vm.$data.gsInfos.Shareholder_Info = Shareholderlists.slice(0);
            }else{
            	vm.$data.gsInfos.Shareholder_Info = Shareholderlists.slice(0,10);
            }
	        // 计算页数
            let size1 = Math.ceil(Shareholderlists.length/10);
            let sizeArr1 = [];
            for(let i=0; i<size1; i++){
            	sizeArr1[i] = i+1;
            }
            vm.$data.gdlength=sizeArr1;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-Shareholder-tabPage li.cd-page-1:eq(0)').addClass('active1');
            }, 100);

            //主要人员
            if(rawData.hasOwnProperty('KeyPerson_Info')){
		        Keypersonlists = rawData.KeyPerson_Info;
            }else{
				Keypersonlists = [];
            }
	        // 将前十条数据挂载回模型
	        if(Keypersonlists.length <= 12){
	        	vm.$data.gsInfos.KeyPerson_Info = Keypersonlists.slice(0);
	        }else{
	        	vm.$data.gsInfos.KeyPerson_Info = Keypersonlists.slice(0,12);
	        }
	        // 计算页数
            let size2 = Math.ceil(Keypersonlists.length/12);
            let sizeArr2 = [];
            for(let i=0; i<size2; i++){
            	sizeArr2[i] = i+1;
            }
            vm.$data.kplength=sizeArr2;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-keyperson-tabPage li.cd-page-2:eq(0)').addClass('active2');
            }, 100);

            //变更信息
            if(rawData.hasOwnProperty('Changed_Announcement')){
	            Changelists = rawData.Changed_Announcement.sort(compare('Changed_Announcement:changedannouncement_date'),0);
            }else{
            	Changelists = [];
            }
            // 将前十条数据挂载回模型
            if(Changelists.length <= 10){
            	vm.$data.gsInfos.Changed_Announcement = Changelists.slice(0);
            }else{
            	vm.$data.gsInfos.Changed_Announcement = Changelists.slice(0,10);
            }
            // 计算页数
            let size3 = Math.ceil(Changelists.length/10);
            let sizeArr3 = [];
            for(let i=0; i<size3; i++){
            	sizeArr3[i] = i+1;
            }
            vm.$data.bglength=sizeArr3;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-changed-tabPage li.cd-page-3:eq(0)').addClass('active3');
            }, 100);

            //分支机构
            if(rawData.hasOwnProperty('Branches')){
	            Branches = rawData.Branches.sort(compare1('Branches:branch_no'),1);
            }else{
            	Branches = [];
            }
            // 将前十条数据挂载回模型
            if(Branches.length <= 10){
            	vm.$data.gsInfos.Branches = Branches.slice(0);
            }else{
            	vm.$data.gsInfos.Branches = Branches.slice(0,10);
            }
            // 计算页数
            let size4 = Math.ceil(Branches.length/10);
            let sizeArr4 = [];
            for(let i=0; i<size4; i++){
            	sizeArr4[i] = i+1;
            }
            vm.$data.brlength=sizeArr4;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-branch-tabPage li.cd-page-4:eq(0)').addClass('active4');
            }, 100);

            //动产抵押
            if(rawData.hasOwnProperty('Chattel_Mortgage')){
            	Chattel_Mortgage = rawData.Chattel_Mortgage;
            }else{
            	Chattel_Mortgage = [];
            }
            vm.$data.gsInfos.Chattel_Mortgage = Chattel_Mortgage;

            //股权出质
            if(rawData.hasOwnProperty('Equity_Pledge')){
            	Equity_Pledge = rawData.Equity_Pledge;
            }else{
            	Equity_Pledge = [];
            }
            // 将前十条数据挂载回模型
            if(Equity_Pledge.length <= 5){
            	vm.$data.gsInfos.Equity_Pledge = Equity_Pledge.slice(0);
            }else{
            	vm.$data.gsInfos.Equity_Pledge = Equity_Pledge.slice(0,5);
            }
            // 计算页数
            let size6 = Math.ceil(Equity_Pledge.length/5);
            let sizeArr6 = [];
            for(let i=0; i<size6; i++){
            	sizeArr6[i] = i+1;
            }
            vm.$data.eplength=sizeArr6;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-equity-pledge-tabPage li.cd-page-6:eq(0)').addClass('active6');
            }, 100);

            // 企业对外投资ent_Investor
            if(rawData.hasOwnProperty('ent_Investor_Info')){
            	ent_Investor = rawData.ent_Investor_Info;
            }else{
            	ent_Investor = [];
            }
            // 将前十条数据挂载回模型
            if(ent_Investor.length <= 10){
            	vm.$data.gsInfos.ent_Investor_Info = ent_Investor.slice(0);
            }else{
            	vm.$data.gsInfos.ent_Investor_Info = ent_Investor.slice(0,10);
            }
            // 计算页数
            let size7 = Math.ceil(ent_Investor.length/10);
            let sizeArr7 = [];
            for(let i=0; i<size7; i++){
            	sizeArr7[i] = i+1;
            }
            vm.$data.entilength=sizeArr7;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-ent-investor-tabPage li.cd-page-7:eq(0)').addClass('active7');
            }, 100);

            // 法人对外投资fr_Investor
            if(rawData.hasOwnProperty('fr_Investor_Info')){
            	fr_Investor = rawData.fr_Investor_Info;
            }else{
            	fr_Investor = [];
            }
            // 将前十条数据挂载回模型
            if(fr_Investor.length <= 10){
            	vm.$data.gsInfos.fr_Investor_Info = fr_Investor.slice(0);
            }else{
            	vm.$data.gsInfos.fr_Investor_Info = fr_Investor.slice(0,10);
            }
            // 计算页数
            let size8 = Math.ceil(fr_Investor.length/10);
            let sizeArr8 = [];
            for(let i=0; i<size8; i++){
            	sizeArr8[i] = i+1;
            }
            vm.$data.frlength=sizeArr8;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-fr-investor-tabPage li.cd-page-8:eq(0)').addClass('active8');
            }, 100);

            //经营异常  
            if(rawData.hasOwnProperty('Business_Abnormal')){
            	business_abnormal = rawData.Business_Abnormal;
            }else{
            	business_abnormal = [];
            }
            vm.$data.gsInfos.Business_Abnormal=business_abnormal;

            //行政处罚Penalty
            if(rawData.hasOwnProperty('Administrative_Penalty')){
            	Penalty = rawData.Administrative_Penalty;
            }else{
            	Penalty = [];
            }
            // 将前十条数据挂载回模型
            if(Penalty.length <= 5){
            	vm.$data.gsInfos.Administrative_Penalty = Penalty.slice(0);
            }else{
            	vm.$data.gsInfos.Administrative_Penalty = Penalty.slice(0,5);
            }
            // 计算页数
            let size10 = Math.ceil(Penalty.length/5);
            let sizeArr10 = [];
            for(let i=0; i<size10; i++){
            	sizeArr10[i] = i+1;
            }
            vm.$data.aplength=sizeArr10;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-Penalty-tabPage li.cd-page-10:eq(0)').addClass('active10');
            }, 100);
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
//## 页面加载完成 ===============================================================

//# 排序方式 ===================================================================
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

function compare1(propertyName,mode) { 
	// mode=0/undefined降序   mode=1升序
    return function (object1, object2) { 
        var value1 = +object1[propertyName]; 
        var value2 = +object2[propertyName]; 
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
//## 排序方式 =================================================================

//# tab选择 ====================================================================
function selectTab1(){
	vm.$data.tab={
    	tab1: true,
    	tab2: false,
    	tab3: false,
    	tab4: false,
    	tab5: false
    }
    // 为翻页标签添加样式
    // setTimeout(function(){
    // 	$('.cd-Shareholder-tabPage li.cd-page-1:eq(0)').addClass('active1');
    // 	$('.cd-keyperson-tabPage li.cd-page-2:eq(0)').addClass('active2');
    // 	$('.cd-changed-tabPage li.cd-page-3:eq(0)').addClass('active3');
    // }, 100);
}
function selectTab2(){
	vm.$data.tab={
    	tab1: false,
    	tab2: true,
    	tab3: false,
    	tab4: false,
    	tab5: false
    }
}
function selectTab3(){
	vm.$data.tab={
    	tab1: false,
    	tab2: false,
    	tab3: true,
    	tab4: false,
    	tab5: false
    }
}
function selectTab4(){
	vm.$data.tab={
    	tab1: false,
    	tab2: false,
    	tab3: false,
    	tab4: true,
    	tab5: false
    }
    // 获取司法信息
    getLeaglData(queryCompName);
}
function selectTab5(){
	vm.$data.tab={
    	tab1: false,
    	tab2: false,
    	tab3: false,
    	tab4: false,
    	tab5: true
    }
}
//## tab选择 ===================================================================

//# 列表翻页 ====================================================================
function selectPage1(e){
	// console.log('e');
	// console.log(e);
	let pageNum = e.target.firstChild.data;
	// console.log('pageNum:'+pageNum);
	$('.cd-Shareholder-tabPage').find('li.cd-page-1').bind('click',function(){
		$('.cd-Shareholder-tabPage').find('li.cd-page-1').removeClass('active1');
		$(this).addClass('active1');
	})
	if(vm.$data.gdlength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.Shareholder_Info = Shareholderlists.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
		// 滚动条回到顶部
		// $(document).scrollTop(0);
	}
}

function selectPage2(e){
	// console.log('e');
	// console.log(e);
	let pageNum = e.target.firstChild.data;
	// console.log('pageNum:'+pageNum);
	$('.cd-keyperson-tabPage').find('li.cd-page-2').bind('click',function(){
		$('.cd-keyperson-tabPage').find('li.cd-page-2').removeClass('active2');
		$(this).addClass('active2');
	})
	if(vm.$data.kplength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.KeyPerson_Info = Keypersonlists.slice(0+((pageNum-1)*12),12+((pageNum-1)*12));
		// 滚动条回到顶部
		// $(document).scrollTop(0);
	}
}

function selectPage3(e){
	// console.log('e');
	// console.log(e);
	let pageNum = e.target.firstChild.data;
	// console.log('pageNum:'+pageNum);
	$('.cd-changed-tabPage').find('li.cd-page-3').bind('click',function(){
		$('.cd-changed-tabPage').find('li.cd-page-3').removeClass('active3');
		$(this).addClass('active3');
	})
	if(vm.$data.bglength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.Changed_Announcement = Changelists.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
		// 滚动条回到顶部
		// $(document).scrollTop(0);
	}
}

function selectPage4(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-branch-tabPage').find('li.cd-page-4').bind('click',function(){
		$('.cd-branch-tabPage').find('li.cd-page-4').removeClass('active4');
		$(this).addClass('active4');
	})
	if(vm.$data.brlength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.Branches = Branches.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

function selectPage6(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-equity-pledge-tabPage').find('li.cd-page-6').bind('click',function(){
		$('.cd-equity-pledge-tabPage').find('li.cd-page-6').removeClass('active6');
		$(this).addClass('active6');
	})
	if(vm.$data.eplength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.Equity_Pledge = Equity_Pledge.slice(0+((pageNum-1)*5),5+((pageNum-1)*5));
	}
}

function selectPage7(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-ent-investor-tabPage').find('li.cd-page-7').bind('click',function(){
		$('.cd-ent-investor-tabPage').find('li.cd-page-7').removeClass('active7');
		$(this).addClass('active7');
	})
	if(vm.$data.entilength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.ent_Investor_Info = ent_Investor.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

function selectPage8(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-fr-investor-tabPage').find('li.cd-page-8').bind('click',function(){
		$('.cd-fr-investor-tabPage').find('li.cd-page-8').removeClass('active8');
		$(this).addClass('active8');
	})
	if(vm.$data.frlength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.fr_Investor_Info = fr_Investor.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

function selectPage10(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-Penalty-tabPage').find('li.cd-page-10').bind('click',function(){
		$('.cd-Penalty-tabPage').find('li.cd-page-10').removeClass('active10');
		$(this).addClass('active10');
	})
	if(vm.$data.aplength.length<=1){
		return;
	}else{
		vm.$data.gsInfos.Administrative_Penalty = Penalty.slice(0+((pageNum-1)*5),5+((pageNum-1)*5));
	}
}

function selectPage11(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-sfws-tabPage').find('li.cd-page-11').bind('click',function(){
		$('.cd-sfws-tabPage').find('li.cd-page-11').removeClass('active11');
		$(this).addClass('active11');
	})
	if(vm.$data.leaglPages.sfws.length<=1){
		return;
	}else{
		vm.$data.leaglInfo.sfws = sfws.slice(0+((pageNum-1)*20),20+((pageNum-1)*20));
	}
}

function selectPage12(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-courtAnnoun-tabPage').find('li.cd-page-12').bind('click',function(){
		$('.cd-courtAnnoun-tabPage').find('li.cd-page-12').removeClass('active12');
		$(this).addClass('active12');
	})
	if(vm.$data.leaglPages.courtAnnoun.length<=1){
		return;
	}else{
		vm.$data.leaglInfo.courtAnnoun = courtAnnoun.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

function selectPage13(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-executed-tabPage').find('li.cd-page-13').bind('click',function(){
		$('.cd-executed-tabPage').find('li.cd-page-13').removeClass('active13');
		$(this).addClass('active13');
	})
	if(vm.$data.leaglPages.executed.length<=1){
		return;
	}else{
		vm.$data.leaglInfo.executed = executed.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

function selectPage14(e){
	let pageNum = e.target.firstChild.data;
	$('.cd-dishonest-tabPage').find('li.cd-page-14').bind('click',function(){
		$('.cd-dishonest-tabPage').find('li.cd-page-14').removeClass('active14');
		$(this).addClass('active14');
	})
	if(vm.$data.leaglPages.dishonest.length<=1){
		return;
	}else{
		vm.$data.leaglInfo.dishonest = dishonest.slice(0+((pageNum-1)*10),10+((pageNum-1)*10));
	}
}

//## 列表翻页 ===================================================================

//# 查询收藏公司详情 =============================================================
function searchCollectComp(compName){
	getcompGSInfos(compName);
	if(vm.$data.tab.tab4 == true){
		getLeaglData(compName);
	}
}
//## 查询收藏公司详情 ============================================================

//start 点击获取公司司法信息 =====================
function getLeaglData(compName){
	getCompLeaglData(compName);
	getCourtAnnounData(compName);
	getExecutedData(compName);
	getDishonestExecutedData(compName);
}

//end 点击获取公司司法信息 =======================

//start 点击获取公司司法文书 =====================
function getCompLeaglData(companyName) {
	// 加载动画
	$('#loadingAnimation').show();

    var queryCompany = companyName;
    // 返回数据类型必须设定为json，默认是string字符串
    var dataType = "json";
 	$.ajax({
 		// 搜索
 	    url:'Access/sf/sfws', 
 	    data:{
 	        companyName: queryCompany
 	    },
 	    type:'post',
 	    timeout: 120000,
 	    cache:false,  
 	    dataType:dataType,
 	    success:function(data){
 	    	// 清除加载动画
 	    	$('#loadingAnimation').hide();

 	    	var rawData= data.data;

 	    	//
 	    	if(rawData.hasOwnProperty('案件信息')){
 	    		sfws = rawData['案件信息'].sort(compare("判决时间"));
 	    	}else{
 	    		sfws = [];
 	    	}
 	    	sfws.forEach(function(item){
 	    		item.jjid = item.jid.substring(item.jid.lastIndexOf('_')+1);
 	    	})
 	    	// 将前十条数据挂载回模型
 	    	if(sfws.length <= 20){
 	    		vm.$data.leaglInfo.sfws = sfws.slice(0);
 	    	}else{
 	    		vm.$data.leaglInfo.sfws = sfws.slice(0,20);
 	    	}
 	    	// 计算页数
 	    	let size = Math.ceil(sfws.length/20);
 	    	let sizeArr = [];
 	    	for(let i=0; i<size; i++){
 	    		sizeArr[i] = i+1;
 	    	}
 	    	vm.$data.leaglPages.sfws=sizeArr;
 	    	// 为翻页标签添加样式
 	    	setTimeout(function(){
 	    		$('.cd-sfws-tabPage li.cd-page-11:eq(0)').addClass('active11');
 	    	}, 100);
 	    },
 	    error: function(error){
 	    	// 清除加载动画
 	    	$('#loadingAnimation').hide();
 	        console.log(error);
 	        alert('网络忙，请稍后再试');
 	    }
 	})
}
//end 点击获取公司司法文书 =====================

//== start 点击获取公司司法法院公告信息 ================
function getCourtAnnounData(queryCompanyName) {
    var queryCompany = queryCompanyName;
    // 返回数据类型必须设定为json，默认是string字符串
    var dataType = "json";
     $.post("Access/sf/sfOther",
        {
            // compNameAjax是接口设定的参数名称
            companyName: queryCompany,
            columns:'bltin:pub_date,bltin:crt_name,bltin:blt_content,bltin:blt_type,bltin:rld_prn'
        },
        function(data,status){
            // 清除加载动画
            $('#loadingAnimation').hide();
            var rawData = data.data;

            courtAnnoun =rawData.length>0 ? rawData.sort(compare("bltin:pub_date")) : [];
            // 将前十条数据挂载回模型
            if(courtAnnoun.length <= 10){
            	vm.$data.leaglInfo.courtAnnoun = courtAnnoun.slice(0);
            }else{
            	vm.$data.leaglInfo.courtAnnoun = courtAnnoun.slice(0,10);
            }
            // 计算页数
            let size = Math.ceil(courtAnnoun.length/10);
            let sizeArr = [];
            for(let i=0; i<size; i++){
            	sizeArr[i] = i+1;
            }
            vm.$data.leaglPages.courtAnnoun=sizeArr;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-courtAnnoun-tabPage li.cd-page-12:eq(0)').addClass('active12');
            }, 100);
        },
        // 返回数据类型必须设定为json
        dataType
    );
}
//== end 点击获取公司司法开庭公告信息 ==================

//== start 点击获取公司司法被执行信息 ================
function getExecutedData(queryCompanyName) {
    var queryCompany = queryCompanyName;
    // 返回数据类型必须设定为json，默认是string字符串
    var dataType = "json";
     $.post("Access/sf/sfOther",
        {
            // compNameAjax是接口设定的参数名称
            companyName: queryCompany,
            columns:'beizhixing:mc,beizhixing:sj,beizhixing:zxbd,beizhixing:ah,beizhixing:dm,beizhixing:zxfy'
        },
        function(data,status){
        	// 清除加载动画
        	$('#loadingAnimation').hide();
            var rawData = data.data;
            executed =rawData.length>0 ? rawData.sort(compare("beizhixing:sj")) : [];
            // 将前十条数据挂载回模型
            if(executed.length <= 10){
            	vm.$data.leaglInfo.executed = executed.slice(0);
            }else{
            	vm.$data.leaglInfo.executed = executed.slice(0,10);
            }
            // 计算页数
            let size = Math.ceil(executed.length/10);
            let sizeArr = [];
            for(let i=0; i<size; i++){
            	sizeArr[i] = i+1;
            }
            vm.$data.leaglPages.executed=sizeArr;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-executed-tabPage li.cd-page-13:eq(0)').addClass('active13');
            }, 100);
        },
        // 返回数据类型必须设定为json
        dataType
    );
}
//== end 点击获取公司司法被执行信息 ==================

//== start 点击获取公司司法失信被执行信息 ================
function getDishonestExecutedData(queryCompanyName) {
    var queryCompany = queryCompanyName;
    // 返回数据类型必须设定为json，默认是string字符串
    var dataType = "json";
     $.post("Access/sf/sfOther",
        {
            companyName: queryCompany,
            columns:'shixin:lasj,shixin:lxqk,shixin:xq_mc,shixin:xqck,shixin:sxjtqk,shixin:fbsj,shixin:mc'
        },
        function(data,status){
        	// 清除加载动画
        	$('#loadingAnimation').hide();
            var rawData = data.data;
            dishonest = rawData.length>0 ? rawData.sort(compare("shixin:fbsj")) : [];
            // 将前十条数据挂载回模型
            if(dishonest.length <= 10){
            	vm.$data.leaglInfo.dishonest = dishonest.slice(0);
            }else{
            	vm.$data.leaglInfo.dishonest = dishonest.slice(0,10);
            }
            // 计算页数
            let size = Math.ceil(dishonest.length/10);
            let sizeArr = [];
            for(let i=0; i<size; i++){
            	sizeArr[i] = i+1;
            }
            vm.$data.leaglPages.dishonest=sizeArr;
            // 为翻页标签添加样式
            setTimeout(function(){
            	$('.cd-dishonest-tabPage li.cd-page-14:eq(0)').addClass('active14');
            }, 100);
        },
        // 返回数据类型必须设定为json
        dataType
    );
}
//== end 点击获取公司司法失信被执行信息 ==================



