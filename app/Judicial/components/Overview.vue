<template>
<div>
    <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-width">
            <div class="modal-content">
                <div class="modal-header">
                    <div id="yearsSelectM">
                        <form role="form">
                            <div class="form-group">
                                <select class="form-control" id="selectYearM">
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
                    <h4 class="modal-title">涉及的案由所对应的案件个数</h4>
                </div>
                <div class="modal-body">
                    <div id="treemapContainerM"></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
    <div id="legal-overview-container">
        <div id="loadingAnimation">
            <div id="preloader5"></div>
        </div>
        <section id="legal-overview">
            <section id="lengjing-executed">
                <ul>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                            <h5>{{statisticsData.executedSum}}</h5>
                        </div>
                        <p class="list-executed-info">目前在执行中的被执行人总个数</p>
                    </li>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-usd" aria-hidden="true"></span>
                            <h5>{{statisticsData.executedTotal}}</h5>
                        </div>
                        <p class="list-executed-info">目前在执行中的被执行人执行标的总额</p>
                    </li>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-send" aria-hidden="true"></span>
                            <h5>{{statisticsData.notDiscloseSum}}</h5>
                        </div>
                        <p class="list-executed-info">
                            已结案或全国法院被执行人查询平台已不披露的被执行人总个数
                        </p>
                    </li>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-gbp" aria-hidden="true"></span>
                            <h5>{{statisticsData.notDiscloseTotal}}</h5>
                        </div>
                        <p class="list-executed-info">
                            已结案或全国法院被执行人查询平台已不披露的被执行人的执行标的总额
                        </p>
                    </li>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-bell" aria-hidden="true"></span>
                            <h5>{{statisticsData.dishonestExecutedSum}}</h5>
                        </div>
                        <p class="list-executed-info">
                            目前未履行的失信被执行人个数
                        </p>
                    </li>
                    <li>
                        <div class="list-executed border-bottom-show">
                            <span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span>
                            <h5>{{statisticsData.quitDishonestExecutedSum}}</h5>
                        </div>
                        <p class="list-executed-info">
                            失信记录已退出的失信被执行人个数
                        </p>
                    </li>
                </ul>
            </section>

            <section id="treeAndMap" class="outer">
                <section class="classify classify-left">
                    <div class="treemapHead">
                        <h5>涉及的案由所对应的案件个数</h5>
                        <div id="yearsSelect">
                            <form role="form">
                                <div class="form-group">
                                    <button class="btn btn-default" type="button" data-toggle="modal" data-target=".bs-example-modal-lg" id="expandMatrixTree"><i class="fa fa-television" aria-hidden="true"></i></button>
                                </div>
                                <div class="form-group">
                                    <select class="form-control" id="selectYear">
                                        <option value="All">全部时间段</option>
                                        <option value={{year}} v-for="year in years">{{year}}</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="treemapContainer"></div>
                </section>
                <section class="classify classify-right">
                    <div class="mapHead">
                    <h5>案件地域分布</h5>
                        <div id="yearsSelectForMap">
                            <form role="form">
                                <div class="form-group">
                                    <select class="form-control" id="selectYearForMap">
                                        <option value="All">全部时间段</option>
                                        <option value={{year}} v-for="year in years">{{year}}</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div id="mapContainer"></div>
                </section>
                <div class="classify classify-right">
                    <h5>企业涉诉案件统计</h5>
                    <div id="classify-ratio"></div>
                </div>
            </section>

            <!-- <section id="legal-classify">
                <div class="classify classify-left">
                    <h5>企业涉诉案件统计</h5>
                    <div id="classify-type">
                        <ul class="case-total">
                            <li>
                                <p>{{statisticsData.caseSum}}</p>
                                <p>涉诉案件总数</p>
                            </li>
                        </ul>
                        <ul class="case-type-total">
                            <li>
                                <p>{{statisticsData.accuserSum}}</p>
                                <p>原告案件总数</p>
                            </li>
                            <li>
                                <p>{{statisticsData.accusedSum}}</p>
                                <p>被告案件总数</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="classify classify-right">
                    <h5>原告/被告比例</h5>
                    <div id="classify-ratio"></div>
                </div>
            </section> -->

            <section id="CaseNumsperYear" class="outer">
                <div id="numsPerYear" class="perYear">
                    <h5>企业历年涉诉案件统计</h5>
                    <div id="polylineContainer"></div>
                </div>

                <div id="executedNumsPerYear" class="perYear">
                    <h5>每年被执行人个数统计</h5>
                    <div id="executedPolylineContainer"></div>
                </div>

                <div id="executedTotalNumsPerYear" class="perYear">
                    <!-- <h5>每年在执行中的被执行人的执行标的总额与每年已不披露的被执行人的执行标的总额</h5> -->
                    <h5>每年执行标的总额统计</h5>
                    <div id="executedTotalPolylineContainer"></div>
                </div>
            </section>

            <!-- <section id="numsPerYear">
                <h5>企业历年涉诉案件统计</h5>
                <div id="polylineContainer"></div>
            </section>

            <section id="executedNumsPerYear">
                <h5>每年在执行中的被执行人个数与每年已不披露的被执行人个数统计</h5>
                <div id="executedPolylineContainer"></div>
            </section> -->

            <!-- <section class="lengjing-analyse">
                <h5>棱镜分析</h5>
                <div class="analyse-content">
                    <p>该公司被诉270次，胜诉20次，败诉220次，正处于司法诉讼阶段的30次，高风险</p>
                </div>
            </section> -->
        </section>
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
    .modal-body{
        padding: 0 !important;
    }
    .btn-right{
        height: 0.3rem;
    }
    #yearsSelectM{
        color: #fff;
        height: 0.3rem;
        position: absolute;
        top: 10px;
        right: 10px;
    }
    #selectYearM{
        height: 0.3rem;
    }
    #treemapContainerM{
        width:100%;
        height: 4rem;
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
        height: 0.3rem;
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
        height: 300px;
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
        height: 0.3rem;
    }
    #mapContainer{
        padding: 20px;
        background-color: #ffffff;
        height: 300px;
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
        height: 300px;
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
        height: 300px;
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
