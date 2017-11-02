<template>
<div id='nodeinfo'>
    <div class="panel-group" id="accordionInfo" role="tablist" aria-multiselectable="true">
        <div id="riskBoardCompanyName">{{nodeInfo.basicInfo["公司名称"]}}</div>
        <div id="riskBoardTitle">公司详情</div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingOne">
                <h5 class="panel-title">
                    <!--
                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseOneInfo" aria-expanded="false" aria-controls="collapseOneInfo">
                    工商登记信息<span class="caret"></span>
                    </a>
                    -->
                    <!-- <a href="#" class='moreInfo'>更多...</a> -->
                    
                    <ol class="breadcrumb" id="breadcrumbNodeinfo">
                        <li>
                            <a class="collapsed" role="button" id="nodeRegister" data-parent="#accordionInfo" href="#" aria-expanded="false" aria-controls="collapseOneInfo">工商登记信息</a>
                        </li>
                        <li>
                            <a class="collapsed" role="button" id="nodeShareholder" data-toggle="collapse" data-parent="#accordionInfo" href="#" aria-expanded="false" aria-controls="collapseOneInfo">股东</a>
                        </li>
                        <li>
                            <a class="collapsed" role="button" id="nodeInfoChange" data-toggle="collapse" data-parent="#accordionInfo" href="#" aria-expanded="false" aria-controls="collapseOneInfo">变更</a>
                            <span id="changeNotice" class="noticeNum">{{changeNums}}</span>
                        </li>
                        <li>
                            <a class="collapsed" role="button" id="nodeKeyPersonnel" data-toggle="collapse" data-parent="#accordionInfo" href="#" aria-expanded="false" aria-controls="collapseOneInfo">主要成员</a>
                        </li>
                    </ol> 
                    
                </h5>
            </div>
            <div id="collapseOneInfo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                    <table class="riskinfo table table-condensed" v-if="isShowContent.nodesInfo.register">
                    <!--
                        <tr>
                            <td>公司名称</td>
                            <td>{{nodeInfo.basicInfo["公司名称"]}}</td>
                        </tr>
                    -->
                        <tr>
                            <td>成立时间</td>
                            <td>{{nodeInfo.basicInfo["成立时间"]}}</td>
                        </tr>
                        <tr>
                            <td>登记/经营状态</td>
                            <td>{{nodeInfo.basicInfo["登记状态"]}}</td>
                        </tr>
                        <tr>
                            <td>注册资本</td>
                            <td>{{nodeInfo.basicInfo["注册资本"] | companyCapitalFormat}}</td>
                            <!-- <td>{{nodeInfo.basicInfo["注册资本"]}}</td> -->
                        </tr>
                        <tr>
                            <td>注册号</td>
                            <td>{{nodeInfo.basicInfo["注册号"]}}</td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.nodesInfo.shareholder">
                        <tr>
                            <td class="shareholderType">股东类型</td>
                            <td class="shareholderName">股东</td>
                        </tr>
                        <tr v-for="shareholder in nodeInfo.shareholder">
                            <td>{{shareholder['Shareholder_Info:shareholder_type']}}</td>
                            <td>{{shareholder['Shareholder_Info:shareholder_name']}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td>详细...</td> -->
                            <td>
                                <button type="button" class="opacityButton" data-toggle="modal" data-target="#shareholdermodal">详细...
                                </button>
                            </td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.nodesInfo.change">
                        <tr>
                            <td class="changedDate">变更日期</td>
                            <td>变更事项</td>
                        </tr>
                        <tr v-for="changed in nodeInfo.changed">
                            <td>{{changed['Changed_Announcement:changedannouncement_date']}}</td>
                            <td>{{changed['Changed_Announcement:changedannouncement_events']}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td>详细...</td> -->
                            <td>
                            <button type="button" class="opacityButton" data-toggle="modal" data-target="#infochangemodal">详细...
                                </button>
                            </td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.nodesInfo.keyPersonnel">
                        <tr>
                            <td class="keyPersonName">姓名</td>
                            <td class="keyPersonPosition">职务</td>
                        </tr>
                        <tr v-for="keyPerson in nodeInfo.keyPerson">
                            <td>{{keyPerson['KeyPerson_Info:keyperson_name']}}</td>
                            <td>{{keyPerson['KeyPerson_Info:keyperson_position']}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingTwo">
                <h5 class="panel-title">
                    <!--
                    <a role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseTwoInfo" aria-expanded="true" aria-controls="collapseTwoInfo">
                    司法信息<span class="caret"></span>
                    </a>
                    -->
                    <!-- <a href="#" class='moreInfo'>更多...</a> -->
                    
                    <ol class="breadcrumb" id="breadcrumbLegal">
                        <li>
                            <a role="button" id="nodeLegal" data-parent="#accordionInfo" href="#" aria-expanded="true" aria-controls="collapseTwoInfo">司法文书</a>
                            <span id="legalNotice" class="noticeNum">{{legalNums}}</span>
                        </li>
                        <li>
                            <a role="button" id="nodeCourtAnnoun" data-parent="#accordionInfo" href="#" aria-expanded="true" aria-controls="collapseTwoInfo">开庭公告</a>
                            <span id="courtAnnounNotice" class="noticeNum">{{courtAnnounNums}}</span>
                        </li>
                        <li>
                            <a role="button" id="nodeExecute" data-parent="#accordionInfo" href="#" aria-expanded="true" aria-controls="collapseTwoInfo">被执行</a>
                            <span id="executeNotice" class="noticeNum">{{executeNums}}</span>
                        </li>
                        <li>
                            <a role="button" id="nodeExecuted" data-parent="#accordionInfo" href="#" aria-expanded="true" aria-controls="collapseTwoInfo">失信被执行</a>
                            <span id="executedNotice" class="noticeNum">{{executedNums}}</span>
                        </li>
                    </ol> 
                    
                </h5>
            </div>
            <div id="collapseTwoInfo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                    <table class="riskinfo table table-condensed" v-if="isShowContent.leaglInfo.leagl">
                        <tr>
                            <td class='legalInfoTime'>判决时间</td>
                            <td class='legalInfoCate'>诉讼类型</td>
                            <td class='legalInfoName'>案件名称</td>
                        </tr>
                        <tr v-for='suit in nodeInfo.leaglInfo'>
                            <td>{{suit['判决时间']}}</td>
                            <td>{{suit['诉讼类型']}}</td>
                            <!-- <td>{{suit['案件名称']}}</td> -->
                            <td>
                                <button type="button" class="opacityButton" data-toggle="modal" data-target="#legalInfoWindow" v-on:click="getLegalInfoViaJid(suit.jid)">
                                    <!-- summaryLegalTitle是过滤器，截取前14个字 -->
                                    {{suit['案件名称'] | summaryLegalTitle}}
                                </button>
                            </td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.leaglInfo.courtAnnoun">
                        <tr>
                            <td>公告日期</td>
                            <td>公告内容</td>
                        </tr>
                        <tr v-for='courtAnnoun in nodeInfo.courtAnnoun'>
                            <td>{{courtAnnoun['bltin:pub_date']}}</td>
                            <td>{{courtAnnoun['bltin:blt_content'] | summaryLegalTitle}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td>详细...</td> -->
                            <td>
                            <button type="button" class="opacityButton" data-toggle="modal" data-target="#courtAnnounmodal">详细...
                                </button>
                            </td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.leaglInfo.execute">
                        <tr>
                            <td class="executedDate">立案时间</td>
                            <td>案号</td>
                        </tr>
                        <tr v-for='executed in nodeInfo.executed'>
                            <td>{{executed['beizhixing:sj']}}</td>
                            <td>{{executed['beizhixing:ah']}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td>详细...</td> -->
                            <td>
                            <button type="button" class="opacityButton" data-toggle="modal" data-target="#executedmodal">详细...
                                </button>
                            </td>
                        </tr>
                    </table>
                    <table class="riskinfo table table-condensed" v-if="isShowContent.leaglInfo.executed">
                        <tr>
                            <td class="dishonestExecutedTime">立案时间</td>
                            <td class="dishonestExecutedSituation">履行情况</td>
                            <td>具体情形</td>
                        </tr>
                        <tr v-for='dishonestExecuted in nodeInfo.dishonestExecuted'>
                            <td>{{dishonestExecuted['shixin:fbsj']}}</td>
                            <td>{{dishonestExecuted['shixin:lxqk']}}</td>
                            <td>{{dishonestExecuted['shixin:sxjtqk'] | summaryLegalTitle}}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <!-- <td>详细...</td> -->
                            <td>
                            <button type="button" class="opacityButton" data-toggle="modal" data-target="#dishonestmodal">详细...
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- <div class="panel panel-default">
            <div class="panel-heading" role="tab" id="headingThree">
                <h5 class="panel-title">
                    <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordionInfo" href="#collapseThreeInfo" aria-expanded="false" aria-controls="collapseThreeInfo">
                    其他信息
                    </a>
                </h5>
            </div>
            <div id="collapseThreeInfo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div class="panel-body">
                    <table class="riskinfo table table-condensed">
                        <tr>
                            <td>a</td>
                            <td>a</td>
                            <td>a</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div> -->
    </div>
</div>
</template>

<script>
import $ from 'jquery'
export default {
    props: ['nodeInfo', 'isShowContent'],
    data: function() {
        return {
            // clickedSuitTitle: ''
        }
    },
    computed:{
        changeNums:function(){
            if(this.nodeInfo.changed.length>0){
                $("#changeNotice").css({"min-width": "18px", "padding": "2px", "display": "block"});
                return this.nodeInfo.changed.length;
            }else{
                $("#changeNotice").css({"min-width": "0", "padding": "0", "display": "none"});
                return '';
            }
        },
        legalNums: function(){
            if(this.nodeInfo.leaglInfo.length>0){
                $("#legalNotice").css({"min-width": "18px", "padding": "2px", "display": "block"});
                return this.nodeInfo.leaglInfo.length;
            }else{
                $("#legalNotice").css({"min-width": "0", "padding": "0", "display": "none"});
                return '';
            }
        },
        courtAnnounNums: function(){
            if(this.nodeInfo.courtAnnoun.length>0){
                $("#courtAnnounNotice").css({"min-width": "18px", "padding": "2px", "display": "block"});
                return this.nodeInfo.courtAnnoun.length;
            }else{
                $("#courtAnnounNotice").css({"min-width": "0", "padding": "0", "display": "none"});
                return '';
            }
        },
        executeNums: function(){
            if(this.nodeInfo.executed.length>0){
                $("#executeNotice").css({"min-width": "18px", "padding": "2px", "display": "block"});
                return this.nodeInfo.executed.length;
            }else{
                $("#executeNotice").css({"min-width": "0", "padding": "0", "display": "none"});
                return '';
            }
        },
        executedNums: function(){
            if(this.nodeInfo.dishonestExecuted.length>0){
                $("#executedNotice").css({"min-width": "18px", "padding": "2px", "display": "block"});
                return this.nodeInfo.dishonestExecuted.length;
            }else{
                $("#executedNotice").css({"min-width": "0", "padding": "0", "display": "none"});
                return '';
            }
        }

    },
    methods: {
        getLegalInfoViaJid: function(jid) {
            console.log(jid);
            // console.log(this.nodeInfo);
            // $.post("getJudgmentInfo",
            //     {
            //         judgmentId: jid
            //         // judgmentId: "160108134632348300000007"
            //         // compName: '中央汇金投资有限责任公司'
            //     },
            //     function(data,status){
            //         console.log(data);
            //     },
            //     "json"
            // );
            this.clickedSuitTitle = jid; //该参数将传递给父组件
            this.$dispatch('clickedSuitTitle', this.clickedSuitTitle);

        }
    },
    //根据注册资本显示状态，确定万元字样是否显示
    capitalFormat: function() {
        if (this.nodeInfo.basicInfo['注册资本'] != '') {
            return '万元';
            // multiBoxVisible = true;
        } else {
            // multiBoxVisible = false;
            return '';
        }
    }
}
</script>

<style>
.legalInfoTime {
    width: 85px;
}

.legalInfoCate {
    width: 60px;
}

.legalInfoName {
    text-align: center;
}

.opacityButton {
    border: none;
    background: none;
    color: #ccc;
    height: 24px;
    font-size: 10px;
    cursor: pointer;
}

.moreInfo {
    float: right;
}

#accordionInfo .caret{
    float: right;
    margin-top: 4.5px;
}

#breadcrumbNodeinfo{
    margin-top: 0;
    margin-bottom: 0;
    background-color: transparent;
    padding: 0 0;
    border-radius: 0;
}
#breadcrumbLegal{
    margin-top: 0;
    margin-bottom: 0;
    background-color: transparent;
    padding: 0 0;
    border-radius: 0;
}
.breadcrumb>li+li:before{
    color: #f4d9ba !important;
}

.shareholderType{
    width: 80px;
}
.keyPersonName{
    width: 80px;
    text-align: center;
}
.dishonestExecutedTime{
    width: 100px;
}
.dishonestExecutedSituation{
    width: 80px;
}
.changedDate{
    width: 40%;
}
.executedDate{
    width: 40%;
}
#nodeinfo ol li{
    position: relative;
}
.noticeNum{
    display: block;
    position: absolute;
    top: -18px;
    right: -15px;
    color: #ffffff;
    background-color: #ff0000;
    border-radius: 20px;
    text-align: center;
    height: 15px;
    line-height: 15px;
    /*padding: 2px;*/
}

</style>
