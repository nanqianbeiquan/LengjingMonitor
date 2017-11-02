<template>
    <section class="compLists">
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <!-- 加载动画 -->
                    <div class="spinner">
                        <div class="bounce1"></div>
                        <div class="bounce2"></div>
                        <div class="bounce3"></div>
                    </div>
	    	    	<div class="cl-l">
                        <section class="cl-filter">
                            <div class="btn-group">
                                <button class="btn btn-default btn-sm dropdown-toggle" type="button" data-toggle="dropdown">
                                    默认排序<span class="caret"></span>
                                </button>
                                <ul class="dropdown-menu" role="menu">
                                    <li><a href="javascript:void 0" @click='selectSort'>默认排序</a></li>
                                    <li><a href="javascript:void 0" @click='selectSort'>注册资本降序</a></li>
                                    <li><a href="javascript:void 0" @click='selectSort'>注册资本升序</a></li>
                                    <li><a href="javascript:void 0" @click='selectSort'>注册时间降序</a></li>
                                    <li><a href="javascript:void 0" @click='selectSort'>注册时间升序</a></li>
                                </ul>
                            </div>
                        </section>
	    	    		<header>
                            <table>
                                <tbody>
                                    <tr>
                                        <td class="cl-h-1">公司</td>                
                                        <td class="cl-h-2 cl-h-align">注册资本</td>             
                                        <td class="cl-h-3 cl-h-align">状态</td>                
                                        <td class="cl-h-4 cl-h-align">收藏</td> 
                                    </tr>
                                </tbody>
                            </table>               
                        </header>
                        <section class="cl-Details">
                            <table>
                                <tbody>
                                    <tr class="seach-tip"><td><i class="fa fa-comments-o" aria-hidden="true"></i>没有查询到相关信息</td></tr>
                                    <tr v-for="comp in compLists">
                                        <td class="cl-h-1">
                                            <p>公司名称：<a href="./companyDatails.jsp?key={{comp.compName}}" style="text-decoration: none"><span class="cl-compName">{{{comp.nenterprisename}}}</span></a></p>
                                            <p v-if='renderCondition.shangbiao'>商标：<span class="cl-shangbiao">{{{comp.nshangbiao}}}</span></p>
                                            <p><span>法人：<span class="cl-color">{{{comp.nlegalrepresentative}}}</span></span><span class="reg-time">注册时间：<span class="cl-color">{{comp.nestablishmentdate}}</span></span></p>
                                            <p v-if='renderCondition.all'><span v-if='renderCondition.keyperson'>主要人员：{{{comp.nkeypersonname}}}</span><span v-bind:class="{ 'reg-time': renderCondition.keyperson}" v-if='renderCondition.shareholder'>股东：{{{comp.nshareholdername}}}</span></p>
                                            <p><span class="glyphicon glyphicon-map-marker cl-comp-addr"></span>公司地址：{{{comp.nresidenceaddress}}}</p>
                                        </td>                
                                        <td class="cl-h-2 cl-h-align">
                                            {{comp.nregisteredcapital | companyCapitalFormat}}
                                        </td>           
                                        <td class="cl-h-3 cl-h-align">
                                            {{comp.nregistrationstatus}}
                                        </td>                
                                        <td class="cl-h-4 cl-h-align cl-collect">
                                            <span class="glyphicon glyphicon-heart-empty"></span>
                                        </td>  
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section class="cl-tabPage">
                            <ul class="pagination pagination-sm">
                                <li @click='selectFirstPage'><a href="#">&laquo;第一页</a></li>
                                <li class="cl-page" v-for='item in listsLength'>
                                    <a href="javascript:void 0" @click='selectPage'>{{item}}</a>
                                </li>
                                <li @click='selectLastPage'><a href="#">最后一页&raquo;</a></li>
                            </ul> 
                        </section>
	    	    	</div>
	    	    </div>
	    	    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
					<div class="cl-r">
						<header></header>
					</div>
	    	    </div>
	    	</div>
    	</div>
    </section>
</template>

<script>
export default {
    props: ['compLists','listsLength','renderCondition'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        selectPage: function(event) {
            this.$dispatch('selectPageCalled',event);
        },
        selectFirstPage: function(){
            this.$dispatch('selectFirstPageCalled');
        },
        selectLastPage: function(){
            this.$dispatch('selectLastPageCalled');
        },
        selectSort: function(){
            this.$dispatch('selectSortCalled',event);
        }
    }
}
</script>

<style>
    .compLists{
        min-height: 300px;
    }
    /* 加载动画 */
    .spinner {
        z-index: 10;
        position: absolute;
        top: 30px;
        left: 40%;
        margin: 0 auto 0;
        width: 150px;
        text-align: center;
    }
     
    .spinner > div {
      width: 30px;
      height: 30px;
      background-color: #67CF22;
     
      border-radius: 100%;
      display: inline-block;
      -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
      animation: bouncedelay 1.4s infinite ease-in-out;
      /* Prevent first frame from flickering when animation starts */
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
     
    .spinner .bounce1 {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }
     
    .spinner .bounce2 {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
     
    @-webkit-keyframes bouncedelay {
      0%, 80%, 100% { -webkit-transform: scale(0.0) }
      40% { -webkit-transform: scale(1.0) }
    }
     
    @keyframes bouncedelay {
      0%, 80%, 100% {
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 40% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }
    /* 加载动画 */
    .cl-l {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1px solid #eee;
        box-shadow: #eee 1px 1px 3px;
        background-color: #fff;
    }
    .cl-r{
        margin-top: 20px;
        margin-bottom: 20px;
        border: 1px solid #eee;
        box-shadow: #eee 1px 1px 3px;
        height: 100px;
    }
    .cl-filter{
        margin-top: 10px;
        margin-bottom: 10px;
        padding-left: 10px;
    }
	.cl-l header{
        color: #333;
        padding: 1%;
        width: 100%;
        border-bottom: 1px solid #eee;
        background: rgba(0,0,0,0.05);
    }
    .cl-l header>table{
        width: 100%;
    }
    .cl-h-align{
        text-align: center;
    }
    .cl-h-1{
        width: 50%;
    }
    .cl-h-2{
        width: 20%;
    }
    .cl-h-3{
        width: 20%;
    }
    .cl-h-4{
        width: 8%;
    }
    .cl-Details{
        font-size: 12px;
        color: #888;
        width: 100%;
        padding: 1%;
        min-height: 500px;
    }
    .cl-Details table{
        width: 100%;
    }
    .cl-Details table tr{
        padding: 40px 20px;
        border-bottom: 1px solid #eee;
    }
    .cl-Details table tr td{
        padding: 10px;
    }
    .seach-tip{
        display: none;
        border-bottom: none !important;
        color: #888;
        /*font-size: 0.12rem;*/
        font-size: 16px;
    }
    .seach-tip i{
        color:orangered;
    }
    .cl-keyWord{
        pointer-events: none;
    }
    .cl-compName{
        color:#333;
        /*font-size: 0.1rem;*/
        font-size: 16px;
    }
    .cl-shangbiao{
        color:#333;
        font-size: 14px;
    }
    .cl-color{
        color:#444;
    }
    .reg-time{
        display: inline-block;
        margin-left: 20px;
    }
    .cl-comp-addr{
        color: coral;
    }
    .cl-collect{
        color: orangered;
        /*font-size: 0.12rem;*/
        font-size: 16px;
    }
    .cl-tabPage{
        text-align: center;
    }
</style>
