<template>
    <section class="judicialList">
    	<div id="loadingAnimation">
			<div id="preloader5"></div>
		</div>
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	    	    	<section>
	    	    		<div class="jl-search-box">
	    	    			<form class="form-inline" role="form" v-on:submit.prevent>
								<div class="form-group">
									<input type="text" placeholder="请输入关键字、案号、案件名称、当事人、法院、律师、审判员" v-model='searchForm.searchContent' @keyup.enter='clickSearchButton'>
								</div>
								<button type="button" class="btn btn-default" @click='clickSearchButton'><span class="glyphicon glyphicon-search"></span></button>
							</form>
	    	    		</div>
	    	    		<div class="jl-search-condition">
	    	    			<span>搜索条件：</span>
							<span v-for='(index,condition) in searchConditionDispArr'>
								{{condition}}
								<button class="del-condition" @click='deleteCondition(index)'>X</button>
							</span>
	    	    		</div>
	    	    	</section>
	    	    </div>
	    	</div>
	    </div>	
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
	    	    	<div class="jl-left">
	    	    		<header>筛选</header>
	    	    		<div>
	    	    			<label for="facets-guanjianci"></label>
					        <div id="facets-guanjianci"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-anyou"></label>
					        <div id="facets-anyou"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-fayuancengci"></label>
					        <div id="facets-fayuancengci"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-diyuprovince"></label>
					        <div id="facets-diyuprovince"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-caipangnianfeng"></label>
					        <div id="facets-caipangnianfeng"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-shenpanchengxu"></label>
					        <div id="facets-shenpanchengxu"></div>
	    	    		</div>
	    	    		<div>
	    	    			<label for="facets-anjianleixing"></label>
					        <div id="facets-anjianleixing"></div>
	    	    		</div>
	    	    	</div>
	    	    </div>
	    	    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9">
					<div class="jl-right">
						<header>
							<a style="text-decoration: none" href="javascript: void 0" @click='sortByDefault'>默认排序</a>
							<span>|</span>
							<a style="text-decoration: none" href="javascript: void 0" @click='sortByDesc'>裁判日期排序</a>
						</header>
						<section class="jl-search-list">
							<ul>
								<li v-show='showNoInfos'><i class="fa fa-comments-o i-color" aria-hidden="true"></i>没有查询到相关信息</li>
								<li v-for='item in searchLists'>
									<p>
										<span class="label label-primary">{{{item.anjianleixing}}}</span>
										<span class="label label-success">{{{item.shenpanchengxu}}}</span>
										<span class="label label-info">{{{item.wenshuleixing}}}</span>
										<a style="text-decoration: none; margin-left:20px" href="./develop3.jsp?jid={{item.id}}#/main"><span class="glyphicon glyphicson-share-alt jl-icon-color"></span>查看关联案件</a>
									</p>
									<p class="list-h"><a style="text-decoration: none" href="./judicialdetails.jsp?id={{item.id}}&key={{searchForm.searchContent}}">{{{item.anjianmingcheng}}}</a></p>
									<p><span>{{{item.anhao}}}</span><span style="margin-left:40px">{{{item.fayuan}}}</span><span style="margin-left:40px">{{{item.caipanriqi}}}</span></p>
									<p><span>【关键词】</span>{{{item.guanjianci}}}</p>
									<p><span>【当事人】</span>{{{item.dangshiren}}}</p>
									<p class="jl-fygd-tit">【法院观点】</p>
									<p class="js-fygd-cont">{{{item.liyou | strToFixed}}}</p>
									<p><span>【审判员】</span>{{{item.shenpanrenyuan}}}</p>
								</li>
							</ul>
						</section>
						<section class="jl-tabPage">
						    <ul class="pagination pagination-sm">
						        <li class="jl-page" v-for='item in listsArr'>
						            <a href="javascript:void 0" @click='selectPage'>{{item}}</a>
						        </li>
						    </ul> 
						</section>
					</div>
	    	    </div>
	    	</div>
    	</div>
    </section>
</template>

<script>
export default {
    props: ['searchForm','searchLists','listsArr','searchConditionDisp','searchConditionAjax','searchConditionDispArr','searchConditionAjaxArr'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    computed:{
    	showNoInfos: function(){
            return this.searchLists.length<=0? true: false;
        },
    },
    methods: {
    	clickSearchButton: function() {
            this.$dispatch('reqBySearchData');
        },
        sortByDefault: function(){
			this.$dispatch('sortByDefaultCalled');
        },
        sortByDesc: function(){
        	this.$dispatch('sortByDescCalled');
        },
        selectPage: function(event) {
            this.$dispatch('selectPageCalled',event);
        },
        deleteCondition: function(index){
        	this.$dispatch('deleteConditionCalled',index);
        }
    }
}

</script>

<style>
	.i-color{
		color: orangered;
	}
	.judicialList{
		/*margin-top: 20px;*/
		min-height: 500px;
		position: relative;
	}
	.jl-search-box{
		width: 100%;
	    padding: 20px 0;
	    text-align: center;
	    background-color: cadetblue;
	}
	.jl-search-box input{
		width: 500px;
	    height: 40px;
	    outline: none;
	    border: none;
	    padding-left: 10px;
	}
	.jl-search-box button{
		color: steelblue;
		font-size: 18px;
		width: 100px;
		height: 40px;
		border: none;
		outline: none !important;
		background-color: #fff;
	}
	.jl-search-condition{
		padding-left: 20px;
		background-color: #5f9ea0;
		color: #fff;
	}
	.jl-search-condition span{
		margin-right: 10px;
	}
	.del-condition{
		background-color: transparent;
		border: none;
		outline: none !important;
	}
	.treeview span.icon{
		color: #337ab7;
	}
	.jl-left{
		min-height: 200px;
		background-color: #fff;
	}
	.jl-right{
		/*background-color: #fff;*/
	}
	.jl-left header, .jl-right header{
		font-size: 14px;
		color: #337ab7;
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		background-color: #fff;
	}
	.jl-right header{
		border-bottom: 1px solid #ccc;
	}
	.jl-search-list ul li{
		color: #333;
		list-style: none;
		font-size: 14px;
		padding: 10px;
		background-color: #fff;
		margin-bottom: 20px;
		border-top: 1px solid #eee;
	}
	.jl-search-list ul li:hover{
		background-color: ivory;
	}
	.jl-search-list strong{
		color: red;
	}
	.list-h{
		font-size: 18px;
		font-weight: bold;
	}
	.jl-icon-color{
		color: #ff4500;
	}
	.jl-fygd-tit{
		margin: 0 0 10px;
	}
	.js-fygd-cont{
		margin:0 20px 20px;
	}
	/* 翻页样式*/
	.jl-tabPage {
		text-align: right;
	}
	/* 加载动画 */
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
