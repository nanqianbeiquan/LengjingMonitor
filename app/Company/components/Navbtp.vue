<template>
      <nav class="chart_bar "><!--navbar-fixed-top-->
         <div class="container-fluid" id="container-fluid">
             <!-- Brand and toggle get grouped for better mobile display -->
             <!--
             <div class="navbar-header">
                 <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                     <span class="sr-only">Toggle navigation</span>
                     <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                     <span class="icon-bar"></span>
                 </button>
                 <a class="navbar-brand" href="#">棱镜征信</a>
             </div>
             -->

            <form id='searchFrom' class="navbar-form" role="search" v-on:submit.prevent>
                <div class="chart_bar_line">
                    <div class="relative_right_block">
                        
                    </div>
                    <div class="form-group">
                        <select id='searchMode' class="form-control"  v-model="searchForm.searchMode">
                            <!--<option selected='selected' value="single">单个公司搜索<span class="caret"></span></option>-->
                            <option selected='selected' value="multi">关联公司搜索<span class="caret"></span></option>
                            <option value="batch">批量公司搜索<span class="caret"></span></option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select v-if='isSingleSearchMode' id='searchDimension' class="form-control" v-model="searchForm.searchDimension">
                            <option  value="1">一度数据</option>
                            <option  value="2">二度数据</option>
                            <option  value="3">三度数据</option>
                            <option  value="4">四度数据</option>
                            <option  value="5">五度数据</option>
                            <option  value="6">六度数据</option>
                            <option selected='selected' value="7">七度数据</option>
                        </select>
                    </div>
                     <!--<span>{{selectedStatus.selectedLinksTypeList}}</span>-->
                    
                    <!--<div class="form-group">
                        <input id='searchInputOne' type="text" class="form-control" v-bind:placeholder="searchBoxPlaceholder" v-model="searchForm.firstSearchBox" @keyup.enter='clickSearchButton'>
                        <input v-if='isMultiSearchMode' id='searchInputTwo' type="text" class="form-control" placeholder="请输入关联公司全名" v-model="searchForm.secondSearchBox" @keyup.enter='clickSearchButton'>
                    </div>-->
                    
                    <!-- 搜索与搜索提示框============================= -->
                    
                    <div class="form-group keyword-search" id="search_input_group">
                        <input id='searchInputOne' type="hidden" class="form-control" v-bind:placeholder="searchBoxPlaceholder" v-model="searchForm.firstSearchBox" @keyup.enter='clickSearchButton' autocomplete="off" value=''>
                        <div v-show='isMultiSearchMode'  class="inline_div">
                            <input id='searchInputTwo' type="text" class="form-control" v-bind:placeholder="searchBoxPlaceholder" v-model="searchForm.secondSearchBox" @keyup.enter='clickSearchButton' autocomplete="off">
                            <button id='searchSubmit' type="button" class="btn btn-default" @click='clickSearchButton'> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> 搜索</button>
                        </div>
                        <div v-show='isBatchSearchMode' class="inline_div" id="batch_search_input_list">
                            <div class="inline_div search_box_block" v-for="moreSearchBox in searchForm.moreSearchBox">
                                <div class="relative_right_block">
                                    <div class="inline_div companySearchDel" @click="clickDelCompanySearchButton(moreSearchBox)" >
                                        <div class="inline_div companySearchDelLine"></div>
                                    </div>
                                </div>
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="moreSearchBox.value" @keyup.enter='clickSearchButton' autocomplete="off">
                            </div>
                            <!--<div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            
                            </div><div class="inline_div">
                                <input type="text" class="form-control batch_search_input" placeholder="请输入企业全称" v-model="searchForm.moreSearchBox[1]" @keyup.enter='clickSearchButton' autocomplete="off">
                            </div>-->
                            <button id='addCompanyBtn' type="button" class="inline_div" @click='clickAddCompanySearchButton'> <span class="add_company_icon">+</span> 添加公司</button>
                            <button id='searchSubmit' type="button" class="btn btn-default inline_div" @click='clickSearchButton'> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> 搜索</button>
                        </div>
                        <div class="keywordSearchSuggest keywordSearchSuggestOne" id="keywordSearchSuggestOne">
                            <ul class="list-unstyled">

                            </ul>
                        </div>
                        <div class="keywordSearchSuggest keywordSearchSuggestTwo" id="keywordSearchSuggestTwo">
                            <ul class="list-unstyled">

                            </ul>
                        </div>
                    </div>
                    

                    <!-- 搜索按钮============================= -->
                    
                    
                    
                </div>
                
                <div class="chart_bar_line">
                    <div class="relative_right_block">
                        <!-- 撤销、清空按钮组============================= -->
                        <div class="btn-group" role="group" aria-label="...">
                            <button id='cancelAction' type="button" class="btn btn-default" v-bind:class="{'btnDisabled':allBtnDisable}" @click='clickRedoButton'><span class="glyphicon glyphicon-repeat" aria-hidden="true"></span> 撤销</button>
                            
                        </div>
                        <!-- 撤销、清空按钮组============================= -->
                        <!--<div class="btn-group" role="group" aria-label="...">
                            
                            <button id='deleteGraph' type="button" class="btn btn-default" v-bind:class="{'btnDisabled':allBtnDisable}" @click='clickClearButton'><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> 清空</button>
                        </div>-->
                        <!-- 临时安放清空按钮组，撤销稳定后放回去============================= -->
                        <!-- <button id='deleteGraphTemp' type="button" class="btn btn-default" @click='clickClearButton'><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> 清空</button> -->
                         <!-- 恢复按钮============================= -->
                        <div class="btn-group" role="group" aria-label="...">
                            
                            <button id='reloadGraph' type="button" class="btn btn-default" v-bind:class="{'btnDisabled':allBtnDisable}" @click='clickreloadButton'><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span> 恢复</button>
                        </div>
                        <!-- 棱镜按钮============================= -->
                        
                        <button id='smartAnalyse' type="button" class="btn btn-default" v-bind:class="{ 'btnSmartAnalyseHighLight': smartAnalyseHighLight.yes, 'disabled':smartAnalyseHighLight.no, 'btnSmartAnalyseDisabled':smartAnalyseHighLight.no,'btnDisabled':allBtnDisable}" @click='clickSmartAnalyseButton'><span class="glyphicon glyphicon-flash" aria-hidden="true"></span> 棱镜</button>

                        <!-- 最大化按钮============================= -->
                        <div class="btn-group" role="group" aria-label="...">
                            <button id='fullScreenActionBtn' type="button" class="btn btn-default"  @click='clickFullScreenButton'><span class="glyphicon glyphicon-resize-full" aria-hidden="true"></span> 全屏</button>
                            
                        </div>
                        
                    </div>
                    <!-- 截图按钮============================= -->
                    <div class="dropdown" id='exportGraphButtonContainer'>
                        <button id='exportGraphButton' class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span class="glyphicon glyphicon-camera" aria-hidden="true"></span> 截图
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="exportGraphButton">
                            <li class="exportGraphLiContainer">
                                <button type="button" class="exportButtons" @click='exportPngClicked'>导出PNG位图</button>
                            </li>
                            <li class="exportGraphLiContainer">
                                <button type="button" class="exportButtons" @click='exportSvgClicked'>导出SVG矢量图</button>
                            </li>
                        </ul>
                    </div>

                    <!-- 选项设置按钮============================= -->
                    <div class="dropdown" id='systemOptionsContainer'>
                        <button id='systemOptionsButton' class="btn btn-default dropdown-toggle" v-bind:class="{'btnDisabled':allBtnDisable}" type="button" id="systemOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span class="glyphicon glyphicon-cog" aria-hidden="true"></span> 设置
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" v-bind:class="{'btnDisabled1':allBtnDisable}" aria-labelledby="systemOptions">
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkboxFullName" value='displayCompanyName' v-model='optionsConfig.optionsHandler' v-on:change='watchDisplayCompanyName'>
                                <label class='labelText' for="checkboxFullName"> 显示公司全名</label>
                            </li>
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkboxInvestPercent" value='displayInvestPercent' v-model='optionsConfig.investPercentHandler' v-on:change='watchDisplayInvestPercent'>
                                <label class='labelText' for="checkboxInvestPercent"> 显示股权比例</label>
                            </li>
                            
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkColorConfig" value='displayInvestPercent' v-model='optionsConfig.colorConfigHandler' v-on:change='watchDisplayColorConfig'>
                                <label class='labelText' for="checkColorConfig"> 颜色自定义</label>
                            </li>
                            
                        </ul>
                    </div>
                    <!-- 筛选功能选项============================= -->
                    <div class="dropdown hidden" id='selectNodesContainer'>
                        <button id='selectNodes' class="btn btn-default dropdown-toggle" v-bind:class="{'btnDisabled':allBtnDisable}" type="button" id="systemOptions" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> 节点
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu" v-bind:class="{'btnDisabled1':allBtnDisable}" aria-labelledby="systemOptions">
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkboxFullName" value='投资' v-model='selectedStatus.selectedLinksTypeList' v-on:change='clickUpdateGraphButton'>
                                <label class='labelText' for="投资"> 投资</label>
                            </li>
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkboxInvestPercent" value='法定代表人' v-model='selectedStatus.selectedLinksTypeList' v-on:change='clickUpdateGraphButton'>
                                <label class='labelText' for="法定代表人"> 法人</label>
                            </li>
                            <li class="systemOptionsLiContainer">
                                <input type="checkbox" id="checkColorConfig" value='任职' v-model='selectedStatus.selectedLinksTypeList' v-on:change='clickUpdateGraphButton'>
                                <label class='labelText' for="任职"> 任职</label>
                            </li>
                            
                        </ul>
                    </div>
                    <!--<div class="form-group" id= "selectNodesContainer">
                        <select class="form-control" v-model="selectedStatus.selectedNodesType" id="selectNodes">
                            <option selected  value="All">全部节点</option>
                            <option  value="Company">公司节点</option>
                             <option  value="Person">个人节点</option> 
                        </select>
                    </div>-->
                    <div class="form-group" id="checkboxexContainer">
                        <ul id="checkboxes">
                            <li class="relationTypeCheckbox" v-for='type in checkKeys'>
                                <input type="checkbox" v-bind:value="type" v-model="selectedStatus.selectedLinksTypeList"  v-on:change='clickUpdateGraphButton'> 
                                <label>{{menuKeyNameList[type]}}</label>
                            </li>
                            <!-- 临时屏蔽替代 -->
                            <!-- <li class="relationTypeCheckbox">
                                <input type="checkbox" name="name" value="">
                                <label for="">投资</label>
                            </li>
                            <li class="relationTypeCheckbox">
                                <input type="checkbox" name="name" value="">
                                <label for="">法人</label>
                            </li>
                            <li class="relationTypeCheckbox">
                                <input type="checkbox" name="name" value="">
                                <label for="">任职</label>
                            </li> -->
                            <!-- 临时屏蔽替代 -->
                        </ul>
                    </div>
                    <div class="form-group hidden">
                        <button type="button" class="btn btn-default" v-bind:class="{'btnDisabled':allBtnDisable}" @click='clickUpdateGraphButton' id="filterButton">筛选数据</button>
                    </div>
                </div>
                
            </form>
         </div><!-- /.container-fluid -->
     </nav>

</template>

<script>
export default {
    props: ['searchForm', 'isSingleSearchMode', 'isMultiSearchMode','isBatchSearchMode','searchBoxPlaceholder','disableExportSvg', 'optionsConfig','selectedStatus', 'checkKeys', 'menuKeyNameList','smartAnalyseHighLight', 'allBtnDisable'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        clickSearchButton: function() {
            this.$dispatch('renderGraphBySearchData');
        },
        clickFullScreenButton:function(){
            this.$dispatch('renderfullScreenCalled');
        },
        clickRedoButton: function() {
            this.$dispatch('renderGraphByRedoCalled');
        },
        clickreloadButton:function(){
            this.$dispatch('renderGraphByReloadCalled');
        },
        clickClearButton: function() {
            this.$dispatch('clearGraphStateCalled');
        },
        clickScreenshotButton: function() {
            this.$dispatch('shotScreenCalled');
        },
        clickSmartAnalyseButton: function() {
            // console.log('clickSmartAnalyseButton');
            this.$dispatch('smartAnalyseCalled');
        },
        watchDisplayCompanyName: function() {
            this.$dispatch('changeDisplayCompanyName');
        },
        watchDisplayInvestPercent: function() {
            this.$dispatch('changeDisplayInvestPercent');
        },
        watchDisplayColorConfig: function(){
            this.$dispatch('changeDisplayColorConfig');
        },
        exportPngClicked: function() {
            // this.$dispatch('exportPngNeeded');
            this.$dispatch('exportPngCalled');
        },
        exportSvgClicked: function() {
            this.$dispatch('exportSvgGraphCalled');
        },
        clickUpdateGraphButton: function() {
            this.$dispatch('updateGraphWithFiltedData');
        },
        watchSelectedLinksTypeConfig:function(){
            this.$dispatch('showSelectedLinksTypeConfig');
        },
        clickAddCompanySearchButton:function(){
            this.$dispatch('addCompanySearch');
        },
        clickDelCompanySearchButton:function(moreSearchBox){
            this.$dispatch('delCompanySearchButton',moreSearchBox)
        }
    }
}
</script>

<style>
    #batch_search_input_list{
        position:relative;
        top:-1px;
    }
    #batch_search_input_list .companySearchDel{
        width: 15px;
        height: 15px;
        background: #d70f0f;
        top: -14px;
        position: relative;
        border-radius: 50%;
        cursor: pointer;
        text-align: center;
        left: -4px;
    }
    #batch_search_input_list .companySearchDel .companySearchDelLine{
        width:7px;height:2px;background:#ffffff;position:relative;top:-17px;
    }
    #batch_search_input_list .search_box_block:first-child .companySearchDel{
        display:none;
    }
    #addCompanyBtn{
        color:#666666;
        background:#ffffff;
        font-size:12px;
        line-height:12px;
        border:0px;
        padding: 0px 3px 0px 0px;
        margin: 0px 6px;
        position:relative;
        top:2px;
    }
    #addCompanyBtn:focus{
        background-color: #ffffff;
        border:0px;
    }
     #addCompanyBtn:active{
        background-color: #ffffff;
        border:0px;
    }
    #addCompanyBtn:visited{
        background-color: #ffffff;
        border:0px;
    }
    #addCompanyBtn:hover{
        color:#2ea7e0;
        background:#ffffff;
    }
    #addCompanyBtn .add_company_icon{
        border: 1px solid #d7d7d7;
        display: inline-block;
        height: 9px;
        vertical-align: middle;
        position: relative;
        top: -1px;
        line-height: 6px;
        border-radius:2px;
    }
    #addCompanyBtn:hover>.add_company_icon{
        border:1px solid #2ea7e0;
    }
    #fullScreenActionBtn:focus{
        background-color: #ffffff;
        border-color: #d7d7d7;
    }
    #fullScreenActionBtn:hover{
        background-color: #2ea7e0;
        border-color: #2ea7e0;
        color:#ffffff;
    }
    .chart_bar{
        border:0px;
        border-bottom:1px solid #d7d7d7;
        color:#333333;
        font-size:14px;
        z-index: 5;
        position: relative;
    }

    .chart_bar label.labelText{
        margin-bottom:0px;
    }

    .chart_bar input[type="radio"],.chart_bar input[type="checkbox"]{
        position:relative;
        top:2px;
    }

    .chart_bar .chart_bar_line{
        min-height:50px;line-height:47px;
    }
    .chart_bar .btn{
        width:auto;
        border:1px solid #d7d7d7;
        height:28px;
        line-height:28px;
        padding:0px 10px 0px 0px;
        background:#ffffff;
        color:#333333;
        border-radius:3px;
        margin-right:7px;
    }
    .chart_bar ul li{line-height:24px;}
    
    .chart_bar .glyphicon{
        margin:0px 0px 0px 10px;
        top:2px;
        color: #999999;
    }
    .chart_bar .btn:hover{
        background:#2ea7e0;
        color:#ffffff;
        border:1px solid #2ea7e0;
    }
    .chart_bar .btn:hover>.glyphicon{

        color:#ffffff;
    }
    .chart_bar .disabled:hover{
        color:#333333;
    }

    .form-control option:hover{background:#2ea7e0;}

    #container-fluid{
        padding-right: 0px;
    }
    #searchFrom {
        margin-top: 12px;
        margin-left: -15px;
        position: relative;
        z-index: 10;
        padding: 0px 8px 0px 15px;
    }

    #searchInputOne {
        -webkit-border-radius: 20px;
        border-radius: 20px;
        height: 32px;
        line-height: 32px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        border: 1px solid #d7d7d7;
        background-color: #ffffff;
        width: 232px;
        vertical-align: middle;
        padding:0px 10px 0px 20px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    #searchInputOne::-webkit-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputOne:-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputOne::-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputOne:-ms-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputTwo {
        -webkit-border-radius: 20px;
        border-radius: 20px;
        height: 32px;
        line-height: 32px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        border: 1px solid #d7d7d7;
        background-color: #ffffff;
        width: 153px;
        vertical-align: middle;
        padding:0px 10px 0px 10px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    #searchInputTwo::-webkit-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputTwo:-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputTwo::-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchInputTwo:-ms-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchFrom .batch_search_input{
        -webkit-border-radius: 20px;
        border-radius: 20px;
        height: 32px;
        line-height: 32px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        border: 1px solid #d7d7d7;
        background-color: #ffffff;
        width: 153px;
        vertical-align: middle;
        padding:0px 10px 0px 10px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    }
    #searchFrom .batch_search_input::-webkit-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchFrom .batch_search_input:-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchFrom .batch_search_input::-moz-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchFrom .batch_search_input:-ms-input-placeholder{ 
    color: #d7d7d7; 
    } 
    #searchFrom #search_input_group{
        width:902px;
        vertical-align:top;
    }
    #searchDimension {
        width: 80px;
        height: 26px;
        padding: 0;
        padding-bottom: 0;
        box-shadow: none;
        border: 0;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url('../img/arrow.png') right center no-repeat;
    }

    #searchMode {
        width: 110px;
        height: 26px;
        padding: 0;
        padding-bottom: 0;
        box-shadow: none;
        border: 0;
        appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        background: url('../img/arrow.png') right center no-repeat;
    }

    .icon_camera{
        
        background-position:right center;
        background-repeat:no-repeat;
    }

    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    #searchMode select::-ms-expand { display: none; }

    #searchSubmit {
        position:relative;left: 4px;
        
    }

    #searchSubmit:hover {
        /*background-color: orange;*/
    }
    #batch_search_input_list #searchSubmit{
        top:2px;
    }
    #screenshotSubmit {
        border-radius: 5px;
        height: 26px;
        font-size: 12px;
        padding-top: 0;
        padding-bottom: 0;
        margin-left: 10px;
        background-color: #189362;
        border: 0;
        color: white;
    }

    /*隐藏select展开时候的占位提示文字*/
    .selectPlaceHolder {
        display:none;
    }

    #exportGraphButtonContainer {

        display: inline-block;

    }

    #exportGraphButton {

    }

    #exportGraphButton:hover {
    }

    .exportGraphLiContainer {
        margin-left: 20px;
        font-size: 12px;
        font-weight: normal;
    }

    .exportButtons {
        background-color: #faf8f8;
        border: none;
        height: 24px;
        font-size: 10px;
        color: #878787;
    }

    #systemOptionsContainer {
        display: inline-block;
    }

    ul.dropdown-menu {
        background-color: #faf8f8;
    }

    #cancelAction {

    }

    #cancelAction:hover {

    }

    #deleteGraph {

    }

    #deleteGraph:hover {

    }

    #deleteGraphTemp {
        height: 26px;
        font-size: 12px;
        padding-top: 0;
        padding-bottom: 0;
        /*margin-left: 1px;*/
        margin-left: 10px;
        background-color: #666;
        border: 0;
        color: white;
    }

    #deleteGraphTemp:hover {
        background-color: orange;
    }

    #smartAnalyse {

    }

    .btnSmartAnalyseHighLight_del{
        background-color: #2ea7e0 !important;
        font-size: 12px !important;
        color: #ffffff !important;
    }

    .btnSmartAnalyseDisabled{
        background-color: #ccc !important;
        border: 1px solid #ccc !important;
    }
    .btnSmartAnalyseDisabled:glyphicon{
        background-color:#333333;
        color:#333333;
    }
    .btnDisabled{
        background-color: #ccc !important;
        border: 1px solid #ccc !important;
        cursor: not-allowed !important;
    }
    .btnDisabled1{
        opacity: 0;
    }

    #systemOptionsButton {
    }

    #systemOptionsButton:hover {
    }

    .systemOptionsLiContainer {
        margin-left: 20px;
        font-size: 12px;
        font-weight: normal;
        vertical-align: middle;
    }

    .labelText {
        font-size: 10px;
        font-weight: normal;
        color: #878787;
    }
    /* start 搜索提示框样式================================================*/
    .keyword-search{
        position: relative;
    }
    .keywordSearchSuggest{
        font-size: 12px;
        color:#666666;
        background:#FFFFFF;
        border: 1px solid #999999;
        position: absolute;
        z-index: 99;
        display: none;
    }
    @media screen and (min-width: 768px){
        .keywordSearchSuggestOne{
            left: 10px;
            width: 230px;
            top: 100%;
        }
        .keywordSearchSuggestTwo{
            left: 173.5px;
            width: 230px;
            top: 100%;
        }
    }
    @media screen and (max-width: 767px){
        .keywordSearchSuggestOne{
            left: 10px;
            width: 100%;
            top: 26px;
        }
        .keywordSearchSuggestTwo{
            left: 10px;
            width: 100%;
            top: 100%;
        }
    }
    .keywordSearchSuggest li{
        height:24px;
        overflow:hidden;
        padding-left:3px;
        line-height:24px;
        background:#FFFFFF;
        cursor:default;
    }
    .keywordSearchSuggest li.hover{
        /*color: red; */
        background: #DDDDDD;
    }
    /* end 搜索提示框样式================================================*/

    /* start 更改界面风格样式 ===========================================*/
    .nav-backgroundcolor{
        background-color: #faf8f8;
    }

    #selectNodesContainer{
        display:inline-block;
    }

    #selectNodes {
        
    }

    /*清除ie的默认选择框样式清除，隐藏下拉箭头*/
    #selectNodes select::-ms-expand { display: none; }
    #checkboxexContainer{
        height: 26px;
        vertical-align: inherit;
        color: #878787;
    }

    #filterButton {
        height: 26px;
        font-size: 12px;
        padding-top: 0;
        padding-bottom: 0;
        background-color: transparent;
        /*background-color: gray;*/
        border: 0;
        color: #6086b5;
        border: 1px solid #f0be8f;
    }

    #filterButton:hover {
        background-color: orange;
    }
    /* end 更改界面风格样式 =============================================*/
</style>
