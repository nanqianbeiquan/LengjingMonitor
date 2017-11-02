<template>
    <scetion class="indexLink">
    	<div class="container">
    		<header class="linkHeader">
    			<p>探索企业背后多维度、深层次等信息请移步高级定制模块</p>
    		</header>
        	<div class="linkContainer">
    			<a href="./datahub" style="text-decoration:none">
    				<div class="fm-tree cl-m">
    					<img src="../img/force-icon.png">
    					<p>企业背后复杂的关联关系</p>
    					<p>企业族谱</p>
    				</div>
    			</a>
    			<a href="./develop2.jsp" style="text-decoration:none">
    				<div class="law-mod cl-m">
    					<img src="../img/law-icon.png">
    					<p>企业司法文书、统计</p>
    					<p>司法查询</p>
    				</div>
    			</a>
    			<a href="javascript:void 0" style="text-decoration:none">
    				<div class="law-mod cl-m">
    					<img src="../img/news-icon.png">
    					<p>社会热点、企业舆情分析</p>
    					<p>新闻舆情</p>
    				</div>
    			</a>
    			<a href="./radarMonitor.jsp" style="text-decoration:none">
    				<div class="law-mod cl-m">
    					<img src="../img/radar-icon.png">
    					<p>企业风险实时监控</p>
    					<p>动态监控</p>
    				</div>
    			</a>
    			<a href="javascript:void 0" style="text-decoration:none">
    				<div class="law-mod cl-m">
    					<img src="../img/blacklist-icon.png">
    					<p>征信黑名单</p>
    					<p>黑名单</p>
    				</div>
    			</a>
        	</div>
	    </div>
    </scetion>
</template>

<script>
export default {
    props: ['searchForm'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        // clickSearchButton: function() {
        //     this.$dispatch('renderGraphBySearchData');
        // }
    }
}
</script>

<style>
	.indexLink{
		width: 100%;
	}
	.linkHeader{
		font-size: 0.1rem;
	    color: #fff;
		width: 100%;
		height: 0.2rem;
		line-height: 0.2rem;
		text-align: center;
		background-color: cornflowerblue;

	}
	.linkContainer{
		/*border:1px solid #eee;*/
		height: 0.9rem;
		margin: 0 auto 0.1rem;
		padding: 0.1rem 0 0.1rem 0.1rem;
		background-color: #fff;
	}
	.cl-m img{
		width: 0.5rem;
		height: 0.5rem;
	}
	.cl-m p{
		margin: 0;
		padding: 0;
	}
	.linkContainer a{
		text-align: center;
		display: inline-block;
		width: 18%;
		height: 0.8rem;
		margin: 0.8%;
	}
	.linkContainer a:link,.linkContainer a:visited,
	.linkContainer a:hover,.linkContainer a:active{
		color: #337ab7;
	}
</style>
