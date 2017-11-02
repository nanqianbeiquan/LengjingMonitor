<template>
    <section class="cdCompDetails">
        <div id="loadingAnimation">
            <div id="preloader5"></div>
        </div>
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	    	    	<section class="cd-head">
                        <header>
                            <div class="cd-compName">
                                <p>{{gsInfos.Registered_Info['Registered_Info:enterprisename']}}</p>
                                <p>法定代表人：{{gsInfos.Registered_Info['Registered_Info:legalrepresentative']}}</p>
                                <p><span class="glyphicon glyphicon-map-marker cd-comp-addr"></span>地址：{{gsInfos.Registered_Info['Registered_Info:residenceaddress']}}</p>
                            </div>
                            <div class="cd-links">
                                <ul>
                                    <li>
                                        <a href="{{familyTreeLink}}" style="text-decoration:none">
                                            <div class="cd-fm-tree cd-m">
                                                <img src="../img/force-icon.png">
                                                <p>企业族谱</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{lawLink}}" style="text-decoration:none">
                                            <div class="cd-law-mod cd-m">
                                                <img src="../img/law-icon.png">
                                                <p>司法统计</p>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="{{radarLink}}" style="text-decoration:none">
                                            <div class="cd-law-radar cd-m">
                                                <img src="../img/radar-icon.png">
                                                <p>动态监控</p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </header>
                        <section>
                            <div class="gs-section outer">
                                <ul>
                                    <li v-bind:class="{'gs-hover': tab.tab1}" @click='selectTab1'>基本信息</li>
                                    <li v-bind:class="{'gs-hover': tab.tab2}" @click='selectTab2'>登记信息</li>
                                    <li v-bind:class="{'gs-hover': tab.tab3}" @click='selectTab3'>风险信息</li>
                                    <li v-bind:class="{'gs-hover': tab.tab4}" @click='selectTab4'>司法信息</li>
                                    <li v-bind:class="{'gs-hover': tab.tab5}" @click='selectTab5'>新闻舆情</li>
                                </ul>
                            </div>
                        </section>         
                    </section>
	    	    </div>
	    	</div>
    	</div>
        <div class="container">
            <div class="row">
                <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <section class="cd-gs" v-show='tab.tab1'>
                        <header>
                            <div class="title-gs">
                                基本信息
                            </div>
                            <table class="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td class="td-head">统一社会信用代码</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:tyshxy_code']}}</td>
                                        <td class="td-head">组织机构代码</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:organizationcode']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">注册号</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:zch']}}</td>
                                        <td class="td-head">省份</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:province']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">类型</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:enterprisetype']}}</td>
                                        <td class="td-head">法定代表人</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:legalrepresentative']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">注册资本</td>
                                        <td>{{gsInfos.Registered_Info["Registered_Info:registeredcapital"] | companyCapitalFormat}}</td>
                                        <td class="td-head">成立日期</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:establishmentdate']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">登记状态</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:registrationstatus']}}</td>
                                        <td class="td-head">核准日期</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:approvaldate']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">营业期限自</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:validityfrom']}}</td>
                                        <td class="td-head">营业期限至</td>
                                        <td>{{gsInfos.Registered_Info['Registered_Info:validityto']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">登记机关</td>
                                        <td colspan="3">{{gsInfos.Registered_Info['Registered_Info:registrationinstitution']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">住所</td>
                                        <td colspan="3">{{gsInfos.Registered_Info['Registered_Info:residenceaddress']}}</td>
                                    </tr>
                                    <tr>
                                        <td class="td-head">经营范围</td>
                                        <td colspan="3">{{gsInfos.Registered_Info['Registered_Info:businessscope']}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </header>
                        <section>
                            <div class="title-gs">
                                股东信息
                            </div>
                            <div>
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>股东类型</td>
                                            <td>股东</td>
                                            <td>证照/证件类型</td>
                                            <td>认缴出资额（万元）</td>
                                            <td>实缴出资额（万元）</td>
                                        </tr>
                                        <tr v-show='showNoShareholder'>
                                            <td colspan="5"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无股东信息</td>
                                        </tr>
                                        <tr v-for='Shareholder in gsInfos.Shareholder_Info'>
                                            <td>{{Shareholder['Shareholder_Info:shareholder_type']}}</td>
                                            <td>{{Shareholder['Shareholder_Info:shareholder_name']}}</td>
                                            <td>{{Shareholder['Shareholder_Info:shareholder_certificationtype']}}</td>
                                            <td>{{Shareholder['Shareholder_Info:subscripted_capital'] | toFixed}}</td>
                                            <td>{{Shareholder['Shareholder_Info:actualpaid_capital'] | toFixed}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="cd-Shareholder-tabPage pageRight">
                                    <ul class="pagination pagination-sm">
                                        <li class="cd-page-1" v-for='item in gdlength'>
                                            <a href="javascript:void 0" @click='selectPage1'>{{item}}</a>
                                        </li>
                                    </ul> 
                                </div>
                            </div>
                        </section>
                        <section>
                            <div class="title-gs">
                                主要人员
                            </div>
                            <div class="cd-keyperson outer">
                                <ul>
                                    <li v-show='showNoKeyperson'>
                                        <p><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无主要人员信息</p>
                                    </li>
                                    <li v-for='KeyPerson in gsInfos.KeyPerson_Info'>
                                        <p>{{KeyPerson['KeyPerson_Info:keyperson_name']}}</p>
                                        <p>{{KeyPerson['KeyPerson_Info:keyperson_position']}}</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="cd-keyperson-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-2" v-for='item in kplength'>
                                        <a href="javascript:void 0" @click='selectPage2'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </section>
                        <section>
                            <div class="title-gs">
                                变更信息
                            </div>
                            <div>
                                <table class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>变更日期</td>
                                            <td>变更事项</td>
                                            <td>变更前内容</td>
                                            <td>变更后内容</td>
                                        </tr>
                                        <tr v-show='showNoChanged'>
                                            <td colspan="4"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无变更信息</td>
                                        </tr>
                                        <tr class="cd-changed" v-for='Changed in gsInfos.Changed_Announcement'>
                                            <td class="cd-changed-1">{{Changed['Changed_Announcement:changedannouncement_date']}}</td>
                                            <td class="cd-changed-2">{{Changed['Changed_Announcement:changedannouncement_events']}}</td>
                                            <td>{{Changed['Changed_Announcement:changedannouncement_before']}}</td>
                                            <td>{{Changed['Changed_Announcement:changedannouncement_after']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-changed-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-3" v-for='item in bglength'>
                                        <a href="javascript:void 0" @click='selectPage3'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </section>
                    </section>
                    <section class="cd-gs" v-show='tab.tab2'>
                        <div class="cd-branches">
                            <div class="title-gs">
                                分支机构
                            </div>
                            <div class="cd-branches-lists outer">
                                <ul>
                                    <li v-show='showNoBranches'><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无分支机构</li>
                                    <li v-for='Branches in gsInfos.Branches'>
                                        <p><a style="text-decoration: none" href="javascript: void 0">{{Branches["Branches:branch_registrationname"]}}</a></p>
                                    </li>
                                </ul>
                            </div>
                            <div class="cd-branch-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-4" v-for='item in brlength'>
                                        <a href="javascript:void 0" @click='selectPage4'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                        <div class="cd-chattel-mortgage">
                            <div class="title-gs">
                                动产抵押
                            </div>
                            <div class="cd-chattel-mortgage-cont">
                                <p v-show='showNoCM' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无动产抵押信息</p>
                                <table class="table table-bordered" v-for='cm in gsInfos.Chattel_Mortgage'>
                                    <tbody>
                                        <tr>
                                            <td class="cd-cm-td">登记编号</td>
                                            <td>{{cm["Chattel_Mortgage:chattelmortgage_registrationno"]}}</td>
                                            <td class="cd-cm-td">登记日期</td>
                                            <td>{{cm["Chattel_Mortgage:chattelmortgage_registrationdate"]}}</td>
                                        </tr>
                                        <tr>
                                            <td class="cd-cm-td">被担保债权数额</td>
                                            <td>{{cm['Chattel_Mortgage:chattelmortgage_guaranteedamount']}}</td>
                                            <td class="cd-cm-td">履约起止日期</td>
                                            <td>{{cm['Chattel_Mortgage:pefperform']}}-{{cm['Chattel_Mortgage:pefperto']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="cd-cm-td">状态</td>
                                            <td colspan="3">{{cm['Chattel_Mortgage:chattelmortgage_status']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="cd-cm-td">抵押物名称</td>
                                            <td colspan="3">{{cm['Chattel_Mortgage:guaname']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-chattel-mortgage-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    
                                </ul> 
                            </div>
                        </div>
                        <div class="cd-equity-pledge">
                            <div class="title-gs">
                                股权出质
                            </div>
                            <div class="cd-equity-pledge-cont">
                                <p v-show='showNoEP' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无股权出质信息</p>
                                <table class="table table-bordered" v-for='ep in gsInfos.Equity_Pledge'>
                                    <tbody>
                                        <tr>
                                            <td class="cd-ep-1">序号</td>
                                            <td class="cd-ep-2">{{ep['Equity_Pledge:equitypledge_no']}}</td>
                                            <td class="cd-ep-3">登记编号</td>
                                            <td class="cd-ep-4">{{ep['Equity_Pledge:equitypledge_registrationno']}}</td>
                                            <td class="cd-ep-5">登记日期</td>
                                            <td class="cd-ep-6">{{ep['Equity_Pledge:equitypledge_registrationdate']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="cd-ep-1">出质人</td>
                                            <td class="cd-ep-2">{{ep['Equity_Pledge:equitypledge_pledgor']}}</td>
                                            <td class="cd-ep-3">证照/证件号码</td>
                                            <td class="cd-ep-4">{{ep['Equity_Pledge:equitypledge_pledgorid']}}</td>
                                            <td class="cd-ep-5">出质股权数额</td>
                                            <td class="cd-ep-6">{{ep['Equity_Pledge:equitypledge_amount']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="cd-ep-1">状态</td>
                                            <td class="cd-ep-2">{{ep['Equity_Pledge:equitypledge_status']}}</td>
                                            <td class="cd-ep-3">质权人</td>
                                            <td colspan="3">
                                                {{ep['Equity_Pledge:equitypledge_pawnee']}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-equity-pledge-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-6" v-for='item in eplength'>
                                        <a href="javascript:void 0" @click='selectPage6'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                        <div class="cd-ent-investor">
                            <div class="title-gs">
                                企业对外投资
                            </div>
                            <div class="cd-ent-investor-cont">
                                <p v-show='showNoEntIn' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无对外投资信息</p>
                                <table v-show='hideNoEntIn' class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>企业名称</td>
                                            <!-- <td>企业类型</td> -->
                                            <td>企业状态</td>
                                            <td>认缴出资</td>
                                            <td>出资比例</td>
                                        </tr>
                                        <tr v-for='entIn in gsInfos.ent_Investor_Info'>
                                            <td>{{entIn['ent_Investor_Info:entname']}}</td>
                                            <!-- <td>{{entIn['ent_Investor_Info:enttype']}}</td> -->
                                            <td>{{entIn['ent_Investor_Info:entstatus']}}</td>
                                            <td>{{entIn['ent_Investor_Info:entinvesubsubconam'] | companyCapitalFormat}}</td>
                                            <td>{{entIn['ent_Investor_Info:fundedratio']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-ent-investor-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-7" v-for='item in entilength'>
                                        <a href="javascript:void 0" @click='selectPage7'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                        <div class="cd-fr-investor">
                            <div class="title-gs">
                                企业法人代表对外投资
                            </div>
                            <div class="cd-fr-investor-cont">
                                <p v-show='showNoFrIn' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无对外投资信息</p>
                                <table v-show='hideNoFrIn' class="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>企业名称</td>
                                            <td>企业状态</td>
                                            <td>认缴出资</td>
                                            <td>出资比例</td>
                                        </tr>
                                        <tr v-for='frIn in gsInfos.fr_Investor_Info'>
                                            <td>{{frIn['fr_Investor_Info:entname']}}</td>
                                            <td>{{frIn['fr_Investor_Info:entstatus']}}</td>
                                            <td>{{frIn['fr_Investor_Info:frinvesubsubconam'] | companyCapitalFormat}}</td>
                                            <td>{{frIn['fr_Investor_Info:fundedratio']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-fr-investor-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-8" v-for='item in frlength'>
                                        <a href="javascript:void 0" @click='selectPage8'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </section>
                    <section class="cd-gs" v-show='tab.tab3'>
                        <section>
                            <div class="title-gs">
                                经营异常信息
                            </div>
                            <div class="cd-business-abnormal-cont">
                                <p v-show='showNoBuAb' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无经营异常信息</p>
                                <table v-show='hideNoBuAb' class="table table-bordered">
                                    <tbody>
                                        <tr class="b-abnormal">
                                            <td>做出决定机关</td>
                                            <td>列入经营异常原因</td>
                                            <td>列入日期</td>
                                            <td>移出经营异常原因</td>
                                            <td>移出日期</td>
                                        </tr>
                                        <tr class="b-abnormal-cont" v-for='abnormal in gsInfos.Business_Abnormal'>
                                            <td>{{abnormal['Business_Abnormal:abnormal_decisioninstitution']}}</td>
                                            <td>{{abnormal['Business_Abnormal:abnormal_events']}}</td>
                                            <td>{{abnormal['Business_Abnormal:abnormal_datesin']}}</td>
                                            <td>{{abnormal['Business_Abnormal:abnormal_moveoutreason']}}</td>
                                            <td>{{abnormal['Business_Abnormal:abnormal_datesout']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <ul class="pagination pagination-sm">
                                    
                                </ul> 
                            </div>
                        </section>
                        <section>
                            <div class="title-gs">
                                行政处罚信息
                            </div>
                            <div class="cd-penalty-cont">
                                <p v-show='showNoPanalty' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无行政处罚信息</p>
                                <table class="table table-bordered" v-for='panalty in gsInfos.Administrative_Penalty'>
                                    <tbody>
                                        <tr>
                                            <td class="td-head pe-td-w">序号</td>
                                            <td class="pe-td-w">{{panalty['Administrative_Penalty:penalty_no']}}</td>
                                            <td class="td-head pe-td-w">作出行政处罚决定机关名称</td>
                                            <td class="pe-td-w">{{panalty['Administrative_Penalty:penalty_decisioninsititution']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-head pe-td-w">行政处罚决定书文号</td>
                                            <td class="pe-td-w">{{panalty['Administrative_Penalty:penalty_code']}}</td>
                                            <td class="td-head pe-td-w">行政处罚内容</td>
                                            <td class="pe-td-w">{{panalty['Administrative_Penalty:penalty_decisioncontent']}}</td>
                                        </tr>
                                        <tr>
                                            <td class="td-head pe-td-w" >违法行为类型</td>
                                            <td colspan="3">{{panalty['Administrative_Penalty:penalty_illegaltype']}}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="cd-Penalty-tabPage pageRight">
                                <ul class="pagination pagination-sm">
                                    <li class="cd-page-10" v-for='item in aplength'>
                                        <a href="javascript:void 0" @click='selectPage10'>{{item}}</a>
                                    </li>
                                </ul> 
                            </div>
                        </section>
                    </section>
                    <section v-show='tab.tab4'>
                        <section class="cd-sf">
                            <section>
                                <div class="title-sf">
                                    司法文书
                                </div>
                                <div class="cd-sfws-cont">
                                    <p v-show='showNosfws' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无司法文书</p>
                                    <table class="table table-bordered" v-show='hideNosfws'>
                                        <tbody>
                                            <tr>
                                                <td class="cd-sfws-td">判决时间</td>
                                                <td class="cd-sfws-td">诉讼类型</td>
                                                <td>案件名称</td>
                                            </tr>
                                            <tr v-for='sfws in leaglInfo.sfws'>
                                                <td class="cd-sfws-td">{{sfws['判决时间']}}</td>
                                                <td class="cd-sfws-td">{{sfws['诉讼类型']}}</td>
                                                <td><a href="./judicialdetails.jsp?id={{sfws.jjid}}&key=">{{sfws['案件名称']}}</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="cd-sfws-tabPage pageRight">
                                    <ul class="pagination pagination-sm">
                                        <li class="cd-page-11" v-for='item in leaglPages.sfws'>
                                            <a href="javascript:void 0" @click='selectPage11'>{{item}}</a>
                                        </li>
                                    </ul> 
                                </div>
                            </section>
                            <section>
                                <div class="title-sf">
                                    司法文书
                                </div>
                                <div class="cd-courtAnnoun-cont">
                                    <p v-show='showNoCourtAnnoun' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无法院公告信息</p>
                                    <table class="table table-bordered" v-show='hideNoCourtAnnoun'>
                                        <tbody>
                                            <tr>
                                                <td class="cd-courtAnnoun-100">公告日期</td>
                                                <td class="cd-courtAnnoun-100">公告类型</td>
                                                <td class="cd-courtAnnoun-100">法院名称</td>
                                                <td>公告内容</td>
                                            </tr>
                                            <tr v-for='courtAnnoun in leaglInfo.courtAnnoun'>
                                                <td class="cd-courtAnnoun-100">{{courtAnnoun['bltin:pub_date']}}</td>
                                                <td class="cd-courtAnnoun-100">{{courtAnnoun['bltin:blt_type']}}</td>
                                                <td class="cd-courtAnnoun-100">{{courtAnnoun['bltin:crt_name']}}</td>
                                                <td>{{courtAnnoun['bltin:blt_content']}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="cd-courtAnnoun-tabPage pageRight">
                                    <ul class="pagination pagination-sm">
                                        <li class="cd-page-12" v-for='item in leaglPages.courtAnnoun'>
                                            <a href="javascript:void 0" @click='selectPage12'>{{item}}</a>
                                        </li>
                                    </ul> 
                                </div>
                            </section>
                            <section>
                                <div class="title-sf">
                                    被执行
                                </div>
                                <div class="cd-executed-cont">
                                    <p v-show='showNoExecuted' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无被执行信息</p>
                                    <table class="table table-bordered" v-show='hideNoExecuted'>
                                        <tbody>
                                            <tr>
                                                <td>立案时间</td>
                                                <td>案号</td>
                                                <td>被执行人姓名/名称</td>
                                                <td>执行法院</td>
                                                <!-- <td>身份证号码/组织机构代码</td> -->
                                                <td>执行标的</td>
                                            </tr>
                                            <tr v-for='executed in leaglInfo.executed'>
                                                <td>{{executed['beizhixing:sj']}}</td>
                                                <td>{{executed['beizhixing:ah']}}</td>
                                                <td>{{executed['beizhixing:mc']}}</td>
                                                <td>{{executed['beizhixing:zxfy']}}</td>
                                                <!-- <td>{{executed['beizhixing:dm']}}</td> -->
                                                <td>{{executed['beizhixing:zxbd']}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="cd-executed-tabPage pageRight">
                                    <ul class="pagination pagination-sm">
                                        <li class="cd-page-13" v-for='item in leaglPages.executed'>
                                            <a href="javascript:void 0" @click='selectPage13'>{{item}}</a>
                                        </li>
                                    </ul> 
                                </div>
                            </section>
                            <section>
                                <div class="title-sf">
                                    失信被执行
                                </div>
                                <div class="cd-dishonest-cont">
                                    <p v-show='showNoDishonest' style="padding: 10px 20px"><i class="fa fa-comments-o i-color" aria-hidden="true"></i>无失信被执行信息</p>
                                    <table class="table table-bordered" v-show='hideNoDishonest'>
                                        <tbody>
                                            <tr>
                                                <td>发布时间</td>
                                                <td>被执行人姓名/名称</td>
                                                <td>履行情况</td>
                                                <td>具体情形</td>
                                            </tr>
                                            <tr v-for='dishonest in leaglInfo.dishonest'>
                                                <td>{{dishonest['shixin:fbsj']}}</td>
                                                <td>{{dishonest['shixin:mc']}}</td>
                                                <td>{{dishonest['shixin:lxqk']}}</td>
                                                <td>{{dishonest['shixin:sxjtqk']}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="cd-dishonest-tabPage pageRight">
                                    <ul class="pagination pagination-sm">
                                        <li class="cd-page-14" v-for='item in leaglPages.dishonest'>
                                            <a href="javascript:void 0" @click='selectPage14'>{{item}}</a>
                                        </li>
                                    </ul> 
                                </div>
                            </section>
                        </section>
                    </section>
                    <section v-show='tab.tab5'>
                        tab5
                    </section>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 aside-right">
                    <section v-show='tab.tab1'>
                        <div class="collection-enterprise">
                            <p class="ce-title"><span class="glyphicon glyphicon-heart-empty"></span>收藏企业</p>
                            <ul>
                                <li v-for='comp in col_comps'>
                                    <a href="javascript: void 0" @click='searchCollectComp($index)'>{{comp}}</a>
                                    <button class="deleteColComp" @click='deleteColComp($index)'>X</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-show='tab.tab2'>
                        <div class="collection-enterprise">
                            <p class="ce-title"><span class="glyphicon glyphicon-heart-empty"></span>收藏企业</p>
                            <ul>
                                <li v-for='comp in col_comps'>
                                    <a href="javascript: void 0" @click='searchCollectComp($index)' >{{comp}}</a>
                                    <button class="deleteColComp" @click='deleteColComp($index)'>X</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-show='tab.tab3'>
                        <div class="collection-enterprise">
                            <p class="ce-title"><span class="glyphicon glyphicon-heart-empty"></span>收藏企业</p>
                            <ul>
                                <li v-for='comp in col_comps'>
                                    <a href="javascript: void 0" @click='searchCollectComp($index)' >{{comp}}</a>
                                    <button class="deleteColComp" @click='deleteColComp($index)'>X</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-show='tab.tab4'>
                        <div class="collection-enterprise">
                            <p class="ce-title"><span class="glyphicon glyphicon-heart-empty"></span>收藏企业</p>
                            <ul>
                                <li v-for='comp in col_comps'>
                                    <a href="javascript: void 0" @click='searchCollectComp($index)'>{{comp}}</a>
                                    <button class="deleteColComp" @click='deleteColComp($index)'>X</button>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section v-show='tab.tab5'>
                        {{msg}}tab5
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['tab','gsInfos','leaglInfo','leaglPages','gdlength','bglength','kplength','brlength','eplength','entilength','frlength','aplength'],
    data () {
        return {
            msg: 'Hello Vue!',
            col_comps:['上海斯睿德信息技术有限公司','上海风声企业信用征信有限公司','上海快鹿投资（集团）有限公司','北京链家房地产经纪有限公司','乐视控股（北京）有限公司','北京百度网讯科技有限公司','上海拉扎斯信息科技有限公司','浙江天猫技术有限公司','支付宝（中国）网络技术有限公司','三星（中国）投资有限公司','上海中泛国际贸易有限公司','重庆钛钛化工有限公司','重庆机械进出口公司','乐视网信息技术（北京）股份有限公司','万全县锦祥欣业商贸有限公司']
        }
    },
    computed:{
        familyTreeLink: function(){
            if(this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != '' && this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != undefined && this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != null){
                return './datahub?compName=' + this.gsInfos.Registered_Info['Registered_Info:enterprisename'];
            }else{
                return './datahub'
            }
        },
        lawLink: function(){
            if(this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != '' && this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != undefined && this.gsInfos.Registered_Info['Registered_Info:enterprisename'] != null){
                return './develop2.jsp?compName=' + this.gsInfos.Registered_Info['Registered_Info:enterprisename'];
            }else{
                return './develop2.jsp'
            }
        },
        radarLink: function(){
            return './radarMonitor.jsp';
        },
        showNoShareholder: function(){
            return this.gsInfos.Shareholder_Info.length<=0? true: false;
        },
        showNoKeyperson: function(){
            return this.gsInfos.KeyPerson_Info.length<=0? true: false;
        },
        showNoChanged: function(){
            return this.gsInfos.Changed_Announcement.length<=0? true: false;
        },
        showNoBranches: function(){
            return this.gsInfos.Branches.length<=0? true: false;
        },
        showNoCM: function(){
            return this.gsInfos.Chattel_Mortgage.length<=0? true: false;
        },
        showNoEP: function(){
            return this.gsInfos.Equity_Pledge.length<=0? true: false;
        },
        showNoEntIn: function(){
            return this.gsInfos.ent_Investor_Info.length<=0? true: false;
        },
        hideNoEntIn: function(){
            return !this.showNoEntIn;
        },
        showNoFrIn: function(){
            return this.gsInfos.fr_Investor_Info.length<=0? true: false;
        },
        hideNoFrIn: function(){
            return !this.showNoFrIn;
        },
        showNoBuAb: function(){
            return this.gsInfos.Business_Abnormal.length<=0? true: false;
        },
        hideNoBuAb: function(){
            return !this.showNoBuAb;
        },
        showNoPanalty: function(){
            return this.gsInfos.Administrative_Penalty.length<=0? true: false;
        },
        showNosfws: function(){
            return this.leaglInfo.sfws<=0? true: false;
        },
        hideNosfws: function(){
            return !this.showNosfws;
        },
        showNoCourtAnnoun: function(){
            return this.leaglInfo.courtAnnoun<=0? true: false;
        },
        hideNoCourtAnnoun: function(){
            return !this.showNoCourtAnnoun;
        },
        showNoExecuted: function(){
            return this.leaglInfo.executed<=0? true: false;
        },
        hideNoExecuted: function(){
            return !this.showNoExecuted;
        },
        showNoDishonest: function(){
            return this.leaglInfo.dishonest<=0? true: false;
        },
        hideNoDishonest: function(){
            return !this.showNoDishonest;
        },
    },
    methods: {
        selectTab1:function(){
            this.$dispatch('selectTab1Called');
        },
        selectTab2:function(){
            this.$dispatch('selectTab2Called');
        },
        selectTab3:function(){
            this.$dispatch('selectTab3Called');
        },
        selectTab4:function(){
            this.$dispatch('selectTab4Called');
        },
        selectTab5:function(){
            this.$dispatch('selectTab5Called');
        },
        selectPage1: function(event) {
            this.$dispatch('selectPage1Called',event);
        },
        selectPage2: function(event) {
            this.$dispatch('selectPage2Called',event);
        },
        selectPage3: function(event) {
            this.$dispatch('selectPage3Called',event);
        },
        selectPage4: function(event) {
            this.$dispatch('selectPage4Called',event);
        },
        selectPage6: function(event) {
            this.$dispatch('selectPage6Called',event);
        },
        selectPage7: function(event) {
            this.$dispatch('selectPage7Called',event);
        },
        selectPage8: function(event) {
            this.$dispatch('selectPage8Called',event);
        },
        selectPage10: function(event) {
            this.$dispatch('selectPage10Called',event);
        },
        selectPage11: function(event) {
            this.$dispatch('selectPage11Called',event);
        },
        selectPage12: function(event) {
            this.$dispatch('selectPage12Called',event);
        },
        selectPage13: function(event) {
            this.$dispatch('selectPage13Called',event);
        },
        selectPage14: function(event) {
            this.$dispatch('selectPage14Called',event);
        },
        searchCollectComp: function(index){
            var compName = this.col_comps[index];
            this.$dispatch('searchCollectCompCalled',compName);
        },
        deleteColComp: function(index){
            this.col_comps.splice(index,1);
        }
    }
}
</script>

<style>
    .i-color{
        color: orangered;
    }
    .cdCompDetails{
        min-height: 600px;
        position: relative;
    }
    .cd-compName{
        padding: 20px;
    }
    .cd-compName p{
        font-size: 14px;
        color: #888;
    }
    .cd-compName p:first-child{
        font-size: 18px;
        font-weight: bold;
        color: steelblue;
    }
    .cd-comp-addr{
        color: coral;
    }
    .cd-head{
        width: 100%;
        background-color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
        box-shadow: #eee 1px 1px 3px;
    }
    .cd-head header{
        position: relative;
    }
    .cd-links{
        position: absolute;
        top: 13px;
        right: 40px;
    }
    .cd-links ul li{
        list-style: none;
        display: inline-block;
        margin-right: 20px;
    }
    .cd-m{
        text-align: center;
    }
    .cd-fm-tree img{
        width: 80px;
    }
    .cd-law-mod img{
        width: 80px;
        text-align: center;
    }
    .cd-law-radar img{
        width: 80px;
        text-align: center;
    }
    .radarLink
    .gs-section{
        border-top: 3px solid #6495ed;
    }
    .gs-section ul li{
        font-size: 18px;
        list-style: none;
        float: left;
        width: 20%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
    }
    .gs-hover{
        background-color: tomato;
    }

    /* =======================*/
    .cd-gs{
        width: 100%;
        padding:20px;
        background-color: #fff;
    }
    .title-gs{
        font-size: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background-color: #faf8f8;
    }
    .td-head{
        width: 160px;
        background-color: #faf8f8;
        vertical-align: middle !important;
    }
    .cd-keyperson ul li{
        list-style: none;
        text-align: center;
        float: left;
        width: 23%;
        margin: 1%;
        padding: 5px;
        border: 1px solid #ccc;
        padding: 10px 0 0;
    }
    .cd-changed .cd-changed-1{
        width: 100px;
        vertical-align: middle !important;
    }
    .cd-changed .cd-changed-2{
        width: 160px;
        vertical-align: middle !important;
    }
    .pageRight{
        text-align: right;
    }
    .pageRight ul{
        margin: 0 0 40px;
    }

    .active1>a,.active2>a,.active3>a,.active4>a,.active6>a,.active7>a,.active8>a,.active10>a,.active11>a,.active12>a,.active13>a,.active14>a{
        z-index: 3;
        color: #fff !important;
        background-color: #337ab7 !important;
        border-color: #337ab7 !important;
        cursor: pointer;
    }

    /* 分支机构*/
    .cd-branches-lists>ul li{
        font-size: 14px;
        color: #555;
        list-style: none;
        width: 48%;
        margin: 1%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #eee;
        float: left;
        overflow: hidden;
    }
    /* 分支机构*/

    /*动产抵押*/
    .cd-chattel-mortgage-cont table{
        margin-bottom: 20px;
    }
    .cd-cm-td{
        width: 150px;
        text-align: center;
        vertical-align: middle;
    }
    /*动产抵押*/

    /*股权出质*/
    .cd-ep-1{
        width: 10%;
        text-align: center;
        vertical-align: middle;
    }
    .cd-ep-2{
        width: 10%;
        vertical-align: middle;
    }
    .cd-ep-3{
        width: 15%;
        text-align: center;
        vertical-align: middle;
    }
    .cd-ep-4{
        width: 25%;
        vertical-align: middle;
    }
    .cd-ep-5{
        width: 15%;
        text-align: center;
        vertical-align: middle;
    }
    .cd-ep-6{
        text-align: center;
        vertical-align: middle;
    }
    /*股权出质*/

    /*经营异常*/
    .b-abnormal td{
        width: 20%;
        text-align: center;
    }
    .b-abnormal-cont td{
        text-align: center;
        vertical-align: middle;
    }
    /*经营异常*/

    /*行政处罚*/
    .pe-td-w{
        width: 25%;
        text-align: center;
        vertical-align: middle;
    }
    /*行政处罚*/

    /*收藏企业*/
    .aside-right{
        background-color: #fff;
        padding:0 !important;
    }
    .collection-enterprise{
        padding-bottom: 40px;
    }
    .ce-title span{
        color: coral;
    }
    .collection-enterprise p{
        padding-left: 10px;
        font-size: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #faf8f8;
    }
    .collection-enterprise ul li{
        list-style: none;
        margin: 10px 0px 10px 20px;
    }
    .collection-enterprise a{
        text-decoration: none !important;
    }
    .deleteColComp{
        border:none;
        color: #ccc;
        background-color: #fff;
    }
    /*收藏企业*/


    /* 司法=======================*/
    .cd-sf{
        width: 100%;
        padding:20px;
        background-color: #fff;
    }
    .title-sf{
        font-size: 20px;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        background-color: #faf8f8;
    }
    .cd-sfws-td{
        width: 100px;
        text-align: center;
        vertical-align: middle;
    }
    .cd-sfws-cont a{
        text-decoration: none !important;
    }

    /* 法院公告*/
    .cd-courtAnnoun-100{
        width: 100px;
        text-align: center;
        vertical-align: middle !important;
    }

    /* 司法=====================*/

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
