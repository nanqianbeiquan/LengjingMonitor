<template>
    <section class="indexBook">
    	<div class="comp-family-tree display-inline-block">
    		<div class="component">
    			<ul class="align">
    				<li>
    					<figure class='book'>
    						<!-- Front -->
    						<ul class='hardcover_front'>
    							<li>
    								<div class="coverDesign blue">
    									<h1>企业族谱</h1>
    								</div>
    							</li>
    							<li></li>
    						</ul>
    						<!-- Pages -->
    						<ul class='page'>
    							<li></li>
    							<li>
    								<a class="a_btn" href="./testApi.jsp">进入企业族谱</a>
    							</li>
    							<li></li>
    							<li></li>
    							<li></li>
    						</ul>
    						<!-- Back -->
    						<ul class='hardcover_back'>
    							<li></li>
    							<li></li>
    						</ul>
    						<ul class='book_spine'>
    							<li></li>
    							<li></li>
    						</ul>
    					</figure>
    				</li>
    			</ul>
    		</div>
    		<div style="text-align:center;clear:both"></div>
    	</div>
    	<div class="comp-laws display-inline-block">
    		<div class="component">
    			<ul class="align">
    				<li>
    					<figure class='book'>
    						<!-- Front -->
    						<ul class='hardcover_front'>
    							<li>
    								<div class="coverDesign blue">
    									<h1>司法信息</h1>
    								</div>
    							</li>
    							<li></li>
    						</ul>
    						<!-- Pages -->
    						<ul class='page'>
    							<li></li>
    							<li>
    								<a class="a_btn" href="./develop2.jsp">进入司法查询</a>
    							</li>
    							<li></li>
    							<li></li>
    							<li></li>
    						</ul>
    						<!-- Back -->
    						<ul class='hardcover_back'>
    							<li></li>
    							<li></li>
    						</ul>
    						<ul class='book_spine'>
    							<li></li>
    							<li></li>
    						</ul>
    					</figure>
    				</li>
    			</ul>
    		</div>
    		<div style="text-align:center;clear:both"></div>
    	</div>
    	<div class="comp-news display-inline-block">
    		<div class="component">
    			<ul class="align">
    				<li>
    					<figure class='book'>
    						<!-- Front -->
    						<ul class='hardcover_front'>
    							<li>
    								<div class="coverDesign blue">
    									<h1>新闻舆情</h1>
    								</div>
    							</li>
    							<li></li>
    						</ul>
    						<!-- Pages -->
    						<ul class='page'>
    							<li></li>
    							<li>
    								<a class="a_btn" href="#">进入新闻舆情</a>
    							</li>
    							<li></li>
    							<li></li>
    							<li></li>
    						</ul>
    						<!-- Back -->
    						<ul class='hardcover_back'>
    							<li></li>
    							<li></li>
    						</ul>
    						<ul class='book_spine'>
    							<li></li>
    							<li></li>
    						</ul>
    					</figure>
    				</li>
    			</ul>
    		</div>
    		<div style="text-align:center;clear:both"></div>
    	</div>
    </section>
</template>

<script>
/*start翻书效果动画*/
require("./book.css");
/*end翻书效果动画*/
export default {
    props: [],
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
	.indexBook{
		width: 80%;
		margin: 0.1rem auto;
	}
	.display-inline-block{
		display: inline-block;
	}
	.comp-laws{
		margin-left: 60px;
	}
	.comp-news{
		margin-left: 60px;
	}
	
</style>
