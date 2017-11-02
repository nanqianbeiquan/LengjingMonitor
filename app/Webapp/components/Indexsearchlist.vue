<template>
    <scetion class="indexSearchList">
    	<div class="searchListContainer">
    		<div class="container">
    		  	<div class="row">
	    		    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	    		     	<div class="row">
	    		        	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		        		<a href="./icindex.jsp?sign=ic" style="text-decoration:none">
	    		        			<div class="list-m">
	    		        				<i class="fa fa-diamond fa-3x" aria-hidden="true"></i>
	    		        				<p>查询企业工商注册信息</p>
	    		        				<p>工商查询</p>
	    		        			</div>
	    		        		</a>
	    		        	</div>
	    		        	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		        		<a href="./bpindex.jsp?sign=bd" style="text-decoration:none">
	    		        			<div class="list-m">
	    		        				<i class="fa fa-trophy fa-3x" aria-hidden="true"></i>
	    		        				<p>查询商标注册信息</p>
	    		        				<p>商标查询</p>
	    		        			</div>
	    		        		</a>
	    		        	</div>
	    		        	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		        		<a href="./bpindex.jsp?sign=pa" style="text-decoration:none">
	    		        			<div class="list-m">
	    		        				<i class="fa fa-flag-o fa-3x" aria-hidden="true"></i>
	    		        				<p>查询专利注册信息</p>
	    		        				<p>专利查询</p>
	    		        			</div>
	    		        		</a>
	    		        	</div>
	    		      	</div>
	    		    </div>
	    		    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
	    		    	<div class="row">
	    		    	   	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		    	   		<a href="./laindex.jsp?sign=ws" style="text-decoration:none">
	    		    	   			<div class="list-m">
	    		    	   				<i class="fa fa-book fa-3x" aria-hidden="true"></i>
	    		    	   				<p>案件详细信息</p>
	    		    	   				<p>裁判文书查询</p>
	    		    	   			</div>
	    		    	   		</a>
	    		    	   	</div>
	    		    	   	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		    	   		<a href="./laindex.jsp?sign=fa" style="text-decoration:none">
	    		    	   			<div class="list-m">
	    		    	   				<i class="fa fa-gavel fa-3x" aria-hidden="true"></i>
	    		    	   				<p>各地法院法院公告查询</p>
	    		    	   				<p>法院公告查询</p>
	    		    	   			</div>
	    		    	   		</a>
	    		    	   	</div>
	    		    	   	<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
	    		    	   		<a href="./laindex.jsp?sign=sx" style="text-decoration:none">
	    		    	   			<div class="list-m">
	    		    	   				<i class="fa fa-user-times fa-3x" aria-hidden="true"></i>
	    		    	   				<p>失信被执行人名单查询</p>
	    		    	   				<p>失信被执行人查询</p>
	    		    	   			</div>
	    		    	   		</a>
	    		    	   	</div>
	    		    	</div>
	    		    </div>
    		  	</div>
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
	.indexSearchList{
		width: 100%;
		height: 1rem;
	}
	.searchListContainer{
		padding: 0.1rem 0;
	}
	.list-m{
		text-align: center;
		background: #fff;
	    padding: 0.05rem 0;
		/*background-color: ghostwhite;*/
	}
	.list-m p{
		margin: 0;
		padding: 0;
		font-size: 12px;
	}
	.searchListContainer a:link,.searchListContainer a:visited,
	.searchListContainer a:hover,.searchListContainer a:active{
		color: #337ab7;
	}
	
</style>
