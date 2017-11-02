<template>
<div>
    <div class="complex_block inline_div_block">
        <div class="inline_div complex_info complex_img_1">
            <div class="complex_num line_txt">{{statisticsData.executedSum}}</div>
            <div class="complex_name">列入被执行人名单次数</div>
        </div>
        <div class="inline_div complex_info complex_img_2">
            <div class="complex_num line_txt" title='{{statisticsData.executedTotal}}万元'>{{statisticsData.executedTotal}}<span style="font-size:18px;font-weight:700;position:relative;top:-3px;"> 万元</span></div>
            <div class="complex_name">列入被执行人名单执行标的总额</div>
        </div>
        <div class="inline_div complex_info complex_img_3">
            <div class="complex_num line_txt">{{statisticsData.dishonestExecutedSum}}</div>
            <div class="complex_name">列入失信被执行人名单次数</div>
        </div>
    </div>
    <div class="panorama_block inline_div_block">
        <div class="modal fade bs-example-modal-lg" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-width">
                <div class="modal-content">
                    <div class="modal-header">
                        <div id="yearsSelectM">
                            <form role="form">
                                <div class="form-group">
                                    <select class="form-control" id="selectYearM"  v-on:change='clickSelectYearM'>
                                        <option value="All">全部时间段</option>
                                        <option value={{year}} v-for="year in years">{{year}}</option>
                                    </select>
                                </div>
                                <!-- <div class="form-group">
                                    <button type="button" class="btn btn-default btn-right" data-dismiss="modal">关闭</button>
                                </div> -->
                            </form>
                        </div>
                        <!-- <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> -->
                        <h4 class="modal-title">涉案的案由所对应的案件个数</h4>
                    </div>
                    <div class="modal-body">
                        <div id="treemapContainerM"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" style="width:auto;height:auto;" v-on:click='clickCloseMap'>关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="inline_div panorama_info">
            <div class="relative_right_block">
                <div id="yearsSelect">
                    <form role="form">
                        <div class="form-group">
                            <select class="form-control" id="selectYear" style="height:20px;"  v-on:change='clickSelectYear'>
                                <option value="All">全部时间段</option>
                                <option value={{year}} v-for="year in years">{{year}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <button class="" type="button" data-toggle="modal" data-target=".bs-example-modal-lg" id="expandMatrixTree" v-on:click='clickExpandMatrixTree'><i class="fa fa-television" aria-hidden="true"  ></i></button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="panorama_title">
                涉案的案由所对应的案件个数
            </div>
            <div class="panorama_area" id="treemapContainer"></div>
        </div>
        <div class="inline_div panorama_info">
            <div class="panorama_title">
                <div class="relative_right_block">
                    <div id="yearsSelectM">
                        <form role="form">
                            <div class="form-group">
                                <select class="form-control" id="selectYearForMap" style="height:20px;"  v-on:change='clickSelectYearForMap'>
                                    <option value="All">全部时间段</option>
                                    <option value={{year}} v-for="year in years">{{year}}</option>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
                案件地域分布
            </div>
            <div class="panorama_area" id="mapArea"></div>
        </div>
        <div class="inline_div panorama_info">
            <div class="panorama_title">
                企业涉诉案件统计
            </div>
            <div class="panorama_area" id="classify-ratio"></div>
        </div>
        <div class="inline_div panorama_info">
            <div class="panorama_title">
                企业历年涉诉案件统计
            </div>
            <div class="panorama_area" id="lineCase"></div>
        </div>
        <div class="inline_div panorama_info">
            <div class="panorama_title">
                每年被执行人个数统计
            </div>
            <div class="panorama_area" id="lineExecuted"></div>
        </div>
        <div class="inline_div panorama_info">
            <div class="panorama_title">
                每年执行标的总额统计
            </div>
            <div class="panorama_area" id="lineSum"></div>
        </div>
    </div>
</div>
</template>

<script>

import store from '../vuex/store' // import 我们刚刚创建的 store
import { action } from '../vuex/actions'
import { getter } from '../vuex/getters'
export default {
    // props: [''],
    data () {
        return {
            msg: 'Hello Vue!',
        }
    },
    computed:{
        years: function(){
            var today = new Date();
            var todayYear = today.getFullYear();
            var years = [];
            for(var i=0; i<30; i++){
                years[i] = todayYear--;
            }
            return years;
        }
    },
    methods: {
        clickSelectYear:function(){
            this.$dispatch("selectYear");
        },
        clickSelectYearForMap:function(){
            this.$dispatch("selectYearForMap");
        },
        clickExpandMatrixTree:function(){
            this.$dispatch("expandMatrixTree");
        },
        clickSelectYearM:function(){
            this.$dispatch("selectYearM");
        },
        clickCloseMap:function(){
            this.$dispatch("closeMap");
        }
        // clickSearchButton: function() {
        //     this.$dispatch('renderGraphBySearchData');
        // }
    },
    store: store, // 在根组件加入 store，让它的子组件和 store 连接
    vuex: {
        actions: {
            // increment: action.incrementCounter,
            // subtract: action.subtractCounter
        },
        getters: {
            // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
            // counterValue: getter.getCount
            statisticsData:getter.getStatisticsData,
        }
    }
}
</script>

<style>
    /*模态框样式*/
    @media screen and (min-width: 768px){
        .modal-width{
            width: 9rem;
        }
    }
    .complex_num{padding:0px 4px;cursor:default;}
    .mouseTooltipForMatrixTree{
        background:rgba(111,111,111,0.8);
        color:#ffffff;
    }
    #expandMatrixTree {
        width:24px;height:24px;margin: 13px 10px 0px 13px;
        background: url('../images/screenFull.png') right center no-repeat;
    }
    #expandMatrixTree:hover {
        background: url('../images/screenFullHover.png') right center no-repeat;
    }
    .empty_panorama{background:url('../images/no_monitor_company.png') center no-repeat;}
    .modal-body{
        padding: 0 !important;
    }
    .btn-right{
    }
    #selectYearM{
        height:20px;
        position:relative;
        right:40px;
        top:10px;
    }
    #yearsSelectM{
        color: #fff;
        height: 0.3rem;
        position: absolute;
        top: 0;
        right: 0;
    }
    #selectYearForMap{
        background:#f5f8fd;
        color:#666666;
        font-size:14px;
        position:relative;
        top:-2px;
        width: 95px;
        box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
        padding: 5px 0px;
        border: 0px;
        font-weight:500;
        right:10px;
    }
    #treemapContainerM{
        width:100%;
        height: 460px;
    }
    /*模态框样式*/
    .form-group{
        display: inline-block;
    }
    #legal-overview-container{
        width: 100%;
        height: 110%;
        background-color: #d7d7d7;
        overflow: auto;
        padding:0 10px 20px 0;
        position: relative;
    }
    #legal-overview{
        margin: 10px auto;
        width: 98%;
        /*background-color: #d7d7d7;*/
    }

    /*模块一*/
    #lengjing-executed{
        width: 100%;
        height: 1.3rem;
        margin-top: 30px;
        padding: 0 3%;
    }
    #lengjing-executed ul{
        margin: 0;
        padding:0 0.2%;
    }
    #lengjing-executed ul li{
        color: #989898;
        float: left;
        width: 15%;
        height: 1.3rem;
        margin: 0 0.83%;
        padding-top: 1%;
    }
    /*#lengjing-executed ul li:hover{
        background-color: #fff;
    }*/
    #lengjing-executed ul li{
        background-color: #fff;
        box-shadow: 1px 3px 1px #aaa;
    }
    .box-shadow-show{
        box-shadow: 1px 3px 1px #aaa;
    }
    .list-executed{
        font-size: 0.25rem;
        text-align: center;
    }
    .border-bottom-show{
        /*border-bottom: 1px solid #989898;*/
    }
    #lengjing-executed .list-executed-info{
        font-size: 0.11rem;
        color: #ff8345;
        margin: 0 1%;
        text-align: center;
        display: block;
    }


    #CaseNumsperYear{
        margin-top: 0.16rem;
    }

    .perYear{
        float: left;
        width: 32%;
    }

    /*模块*/
    #numsPerYear{
        margin: 0 0.5% 0 1%;
    }
    #numsPerYear h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 0.3rem;
        line-height: 0.3rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding-left:0.1rem;
    }
    #polylineContainer{
        height:300px;
        background-color: #ffffff;
    }

    /*模块*/
    #executedNumsPerYear{
        margin: 0 0.5%;
    }
    #executedNumsPerYear h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 0.3rem;
        line-height: 0.3rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding-left:0.1rem;
    }
    #executedPolylineContainer{
        height:300px;
        background-color: #ffffff;
    }

    #executedTotalNumsPerYear{
        margin: 0 0.5%;
    }
    #executedTotalNumsPerYear h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 0.3rem;
        line-height: 0.3rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding-left: 0.1rem;
    }
    #executedTotalPolylineContainer{
        height:300px;
        background-color: #ffffff;
    }

    /*模块二*/
    #treeAndMap{
        margin-top: 0.16rem;
    }

    .treemapHead{
        position: relative;
    }
    #yearsSelect{
        color: #fff;
        height: 0.3rem;
        position: absolute;
        top: 0;
        right: 0;
    }
    #selectYear{
        background:#f5f8fd;
        color:#666666;
        font-size:14px;
        position:relative;
        top:-6px;
        width: 95px;
        box-shadow: inset 0 0px 0px rgba(0, 0, 0, 0.075);
        padding: 5px 0px;
        border: 0px;
    }
    
    #NumscauseOfAction h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 50px;
        line-height: 30px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding:10px;
    }
    #treemapContainer{
        padding: 5px;
        background-color: #ffffff;
        height: 296px;
        overflow: auto;
    }

    .distribution-map h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 50px;
        line-height: 30px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding:10px;
    }
    .mapHead{
        position: relative;
    }
    #yearsSelectForMap{
        color: #fff;
        height: 0.3rem;
        position: absolute;
        top: 0;
        right: 0;
    }
    #selectYearForMap{
    }
    #mapContainer{
        padding: 20px;
        background-color: #ffffff;
        height: 306px;
        overflow: auto;
    }
    /*==清楚浮动的影响==*/
    .outer{
        zoom:1;
    }/*==for IE6/7 Maxthon2==*/
    .outer:after{
        clear:both;
        content:'.';
        display:block;
        width: 0;
        height: 0;
        visibility:hidden;
    }/*==for FF/chrome/opera/IE8==*/

    /*模块三*/
    #legal-classify{
        margin-top: 0.16rem;
    }
    .classify{
        float: left;
        width: 32%;
    }
    .classify-left{
        margin: 0 .5% 0 1%;
    }
    .classify-right{
        margin: 0 0.5%;
    }
    .classify h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 0.3rem;
        line-height: 0.3rem;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding-left: 0.1rem;
    }
    #classify-type{
        width: 100%;
        height: 306px;
        background-color: #ffffff;
        padding-top: 10px;
    }
    .case-total li{
        margin:0 auto 10px; 
    }
    .case-type-total li{
        float: left;
    }
    .case-type-total li:first-of-type{
        margin: 10px 2.5% 10px 7.5%;
    }
    .case-type-total li:last-of-type{
        margin: 10px 7.5% 10px 2.5%;
    }
    #classify-type ul{
        margin: 0;
        padding: 0;
    }
    #classify-type ul li{
        list-style: none;
        background: #f7f7f7;
        border: 1px solid #e3e3e3;
        padding: 10px 0px;
        width: 40%;
        text-align: center;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        -ms-border-radius: 5px;
        -o-border-radius: 5px;
    }
    #classify-type ul li p:nth-child(odd){
        font-size: 42px;
        color: #5daced;
        font-weight: 400;
    } 
    #classify-type ul li p:nth-child(even){
        font-size: 14px;
    } 
    #classify-ratio{
        width: 100%;
        height: 306px;
        background-color: #ffffff;
    }

    .clear{
        clear: both;
    }
    .lengjing-analyse{
        margin-top: 40px;
    }
    .lengjing-analyse h5{
        background-color: #3B3E40;
        color: #ffffff;
        height: 50px;
        line-height: 30px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        margin: 0;
        padding:10px;
    }
    .analyse-content{
        padding: 20px;
        background-color: #ffffff;
        height: 200px;
        overflow: auto;
    }
    /*加载动画*/
    #loadingAnimation{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(0,0,0,0.2);
    }
    #preloader5{
        position: absolute;
        top: 200px;
        left: 49%;
        width:30px;
        height:30px;
        background:#3498db;
        border-radius:50px;
        animation: preloader_5 1.5s infinite linear;
    }
    #preloader5:after{
        position:absolute;
        width:60px;
        height:60px;
        border-top:10px solid #9b59b6;
        border-bottom:10px solid #9b59b6;
        border-left:10px solid transparent;
        border-right:10px solid transparent;
        border-radius:50px;
        content:'';
        top:-15px;
        left:-15px;
        animation: preloader_5_after 1.5s infinite linear;
    }
    @keyframes preloader_5 {
        0% {transform: rotate(0deg);}
        50% {transform: rotate(180deg);background:#2ecc71;}
        100% {transform: rotate(360deg);}
    }
    @keyframes preloader_5_after {
        0% {border-top:10px solid #9b59b6;border-bottom:10px solid #9b59b6;}
        50% {border-top:10px solid #3498db;border-bottom:10px solid #3498db;}
        100% {border-top:10px solid #9b59b6;border-bottom:10px solid #9b59b6;}
    }
</style>
