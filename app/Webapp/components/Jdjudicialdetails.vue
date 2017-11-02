<template>
    <section class="judicialDetails">
    	<div id="loadingAnimation">
			<div id="preloader5"></div>
		</div>
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-9 col-sm-9 col-md-9 col-lg-9 col-l">
	    	    	<section class="jd-left">
	    	    		<div class="jd-case-content">
	    	    			<div class="case-head">
	    	    				<p>{{{caseContent.head['案件名称']}}}</p>
	    	    				<p><span>{{{caseContent.head['裁判日期']}}}</span><span class="margin-l-20">{{{caseContent.head['审理法院']}}}</span><span class="margin-l-20">{{{caseContent.head['案号']}}}</span></p>
	    	    			</div>
	    	    			<div class="case-body">
	    	    				<ul>
		    	    				<li v-for='(index,case) in caseContent.mainBody' id="{{'case-body-t'+index}}">
		    	    					<p><span class="case-body-title">{{{case.title}}}</span></p>
		    	    					<p>{{{case.content}}}</p>
		    	    				</li>
		    	    			</ul>
	    	    			</div>
	    	    		</div>
	    	    	</section>
	    	    </div>
	    	    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-r">
	    	    	<section class="jd-right">
	    	    		<div class="aside-index">
	    	    			<ul>
	    	    				<li class="aside-index-head">快速索引</li>
	    	    				<li class="aside-index-body" v-for='(index,title) in caseContent.index'>
	    	    					<a href="javascript: void 0" @click='locateTo(index)'>{{title}}</a>
	    	    				</li>
	    	    			</ul>
	    	    		</div>
	    	    		<div class="caseBaseInfos">
	    	    			<table class="table">
	    	    			  	<thead>
	    	    			    	<tr>
	    	    			      		<th colspan="2">案件信息</th>
	    	    			    	</tr>
	    	    			  	</thead>
	    	    			  	<tbody>
	    	    			    	<tr v-for='info in caseContent.baseInfo'>
	    	    			      		<td>{{{info.title}}}</td>
	    	    			      		<td>{{{info.content}}}</td>
	    	    			    	</tr>
	    	    			    </tbody>
	    	    			</table>
	    	    		</div>
	    	    	</section>
	    	    </div>
	    	</div>
	    </div>	
    </section>
</template>

<script>
export default {
    props: ['caseContent'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    computed:{
    	
    },
    methods: {
    	locateTo: function(index) {
            this.$dispatch('locateToCalled',index);
        },
    }
}
</script>

<style>
	.jd-left strong{
		color: red;
	}
	.col-l, .col-r{
		padding-left: 0px !important;
	}
	.judicialDetails{
		min-height: 500px;
	}
	.jd-left{
		width: 100%;
		background-color: #fff;
		padding: 10px;
	}
	.jd-right{
		width: 100%;
		background-color: #fff;
	    padding: 10px;
	}
	.case-head{
		text-align: center;
		padding-top: 20px;
	    padding-bottom: 20px;
	    background-color: #ffe4c4;
	    box-shadow: #888 1px 1px 3px;
	}
	.case-head p:first-child{
		font-size: 20px;
	    color: #333;
	}
	.margin-l-20{
		margin-left: 20px;
	}
	.case-body ul li{
		list-style: none;
	}
	.case-body ul li p:nth-child(odd){
		font-size: 18px;
		font-weight: 400;
		color: #000;
		margin: 10px 0 10px 0px;
	    padding: 5px 10px;
		background-color: #faebd7;
	    box-shadow: 1px 1px 3px #888;
	}
	.case-body ul li p:nth-child(even){
		font-size: 14px;
		color: #000;
		margin-left: 20px;
		margin-bottom: 20px;
	    line-height: 25px;
	}
	.case-body-title{
		/*border-bottom: 3px solid #6495ed;*/
	}
	.case-body ul li:last-child p:nth-child(even){
		text-align: right;
	}

	.aside-index ul li{
		list-style: none;
		margin: 10px 0;
	}
	.aside-index-body a{
		text-decoration: none !important;
	}
	.aside-index-head{
		border-bottom: 2px solid #ddd;
	    height: 40px;
		line-height: 40px;
	    color: #333;
	    font-weight: 800;
	}
	.aside-index-body{
		padding-left: 10px;
		cursor: pointer;
	}
	.caseBaseInfos{
		margin-top: 40px;
		margin-bottom: 20px;
	}
	.caseBaseInfos tr td{
		vertical-align: middle !important;
	}
	.caseBaseInfos tr td:first-child{
		width: 50px;
		text-align: center;
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
