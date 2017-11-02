<template>
    <nav class="indexNav">
    	<div class="homepage">
    		<a href="./indexApi.jsp">
    			<i class="fa fa-home fa-3x home-icon" aria-hidden="true"></i>
    		</a>
    	</div>
    	<div class="entrance-user-login">
	    	<button type="button" class="btn btn-default" @click='openSignIn'>登录</button>
    		<a href="./user-register.jsp" class="btn btn-success" role="button">立即注册</a>
    	</div>
    </nav>
</template>

<script>
import $ from 'jquery';
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
        openSignIn: function(){
        	$('.signIn').show();
        }
    }
}
</script>

<style>
	.indexNav{
		width: 100%;
		height: 55px;
	    border-bottom: 1px solid #ccc;
	    box-shadow: #aaa 0px 1px 5px;
	    background-color: #fff;
	}
	.homepage{
		display: inline-block;
		color: #ccc;
		width: 55px;
		height: 55px;
		line-height: 55px;
		text-align: center;
		margin-left: 0.1rem;
	}
	.home-icon{
		line-height: 55px;
	}
	.entrance-user-login{
		height: 55px;
		line-height: 55px;
		float: right;
		margin-right: 0.2rem;
	}
</style>
