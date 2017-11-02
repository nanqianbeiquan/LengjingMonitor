<template>
    <section class="clCompSearch">
    	<div class="container">
	    	<div class="row">
	    	    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	    	    	<div class="cl-comp-search">
	    	    		<div class="cl-search-lists">
	    	    			<ul>
	    	    			    <li class="classify-name selected" data-hover="全部">全部</li>
	    	    			    <li class="classify-name" data-hover="企业名">企业名</li>
	    	    			    <li class="classify-name" data-hover="法人/高管">法人/高管</li>
	    	    			    <li class="classify-name" data-hover="股东">股东</li>
	    	    			    <li class="classify-name" data-hover="商标">商标</li>
	    	    			    <li class="classify-name " data-hover="注册地址">注册地址</li>
	    	    			</ul>
	    	    		</div>
	    	    		<div class="cl-search-input">
	    	    			<input type="text" v-model='searchKey.key' placeholder="请输入关键字" @keyup.enter='clickSearchButton'/>
	    	    			<button @click="clickSearchButton">查询</button>
	    	    		</div>
	    	    	</div>
	    	    </div>
	    	</div>
    	</div>
    </section>
</template>

<script>
export default {
    props: ['searchKey'],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        clickSearchButton: function() {
            this.$dispatch('reqBySearchData');
        }
    }
}
</script>

<style>
    .cl-comp-search{
    	margin-top: 40px;
    	margin-bottom: 20px;
    	/*border:1px solid #eee;*/
    }
    .cl-search-lists ul li{
        font-size: 16px;
    	color: #333;
        cursor: pointer;
    	list-style: none;
        display: inline-block;
        margin-left: 5px;
	    margin-right: 5px;
        padding-left: 5px;
        padding-right: 5px;
        position: relative;
    }
    .cl-search-lists ul li:hover{
    	border-bottom: 2px solid #4187fe;
    }
    .selected{
    	border-bottom: 2px solid #4187fe;
    }
    .cl-search-input input{
	    font-size: 14px;
    	width: 60%;
    	height: 40px;
    	line-height: 40px;
    	outline: none;
    	padding-left: 10px;
    }
    .cl-search-input button{
	    color: #fff;
    	letter-spacing: 1px;
		font-size: 16px;
		width: 80px;
		height: 40px;
		outline: none;
		border: none;
		background-color: #4187fe;
    }
</style>
