<template>
    <section class="signIn">
    	<div class="signInContainer">
    		<header>
	    		<span>账号登录</span>
	    		<button type="button" class="close-signin" @click='closeSignIn'><span aria-hidden="true">&times;</span></button>
    		</header>
    		<div class="user-passw">
    			<div class="user-account">
    				<input id="user-account" type="text" autocomplete="off" placeholder="手机/邮箱/用户名" @focus='user_focus' @blur='user_blur'>
    				<div class="u-icon user-icon">
	    				<span class="glyphicon glyphicon-user"></span>
    				</div>
    			</div>
    			<div class="user-password">
    				<input type="password" autocomplete="off" placeholder="密码" @focus='password_focus' @blur='password_blur'>
    				<div class="u-icon password-icon">
    					<span class="glyphicon glyphicon-lock"></span>
    				</div>
    			</div>
    		</div>
    		<div class="auto-sign-in">
    			<form role="form">
    				<div class="checkbox">
    				    <label>
    				      	<input type="checkbox" value="">下次自动登录
    				    </label>
    				</div>
    			</form>
    			<div class="goregister">
    				<a href="./user-register.jsp">立即注册</a>
    			</div>
			</div>
			<div class="sign-in-web">
				<button type="button" @click='sign_in_web'>登录</button>
			</div>
    	</div>
    </section>
</template>

<script>
import $ from 'jquery';
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
        closeSignIn:function(){
        	$('.signIn').hide();
        },
        user_focus:function(){
        	$('.user-icon').css({'color':'#6495ed'});
        },
        user_blur:function(){
        	$('.user-icon').css({'color':'#888'});
        },
        password_focus:function(){
        	$('.password-icon').css({'color':'#6495ed'});
        },
        password_blur:function(){
        	$('.password-icon').css({'color':'#888'});
        },
        sign_in_web:function(){
        	window.location.reload();
        }
    }
}
</script>

<style>
	.signIn{
		display: none;
	    width: 100%;
	    height: 100%;
	    position: fixed;
		top: 0px;
	    left: 0px;
	    z-index: 60000;
	    background-color: rgba(0, 0, 0, 0.15);
	}
	.signInContainer{
		width: 370px;
		height: 350px;
		margin: 150px auto 0px;
		background-color: #fff;
		opacity: 1;
	}
	.signInContainer header{
		font-family: microsoft yahei;
		font-size: 14px;
		color: #fff;
		padding: 0 10px; 
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: #6495ed;
	}
	.close-signin{
		float: right;
		background: none;
		border: 0;
		font-size: 25px;
		outline: medium;
	}
	.close-signin:hover{
		color: #ccc;
	}
	.user-passw{
		text-align: center;
		margin-top: 50px;
	}
	.user-passw input{
		outline: none;
		width: 320px;
		height: 40px;
		padding-left: 30px;
		margin-top: 10px;
		color: #000;
	}
	.user-passw input:focus{
		border:1px solid #6495ed;
	}
	.user-account{
		position: relative;
	}
	.user-password{
		position: relative;
	}
	.u-icon{
		position: absolute;
		top: 20px;
		left: 35px;
		color: #888;
	}
	.auto-sign-in{
		margin-left: 25px;
		margin-right: 25px;
		position: relative;
	}
	.goregister{
		font-family: microsoft yahei;
		font-size: 12px;
		color:#6495ed;
		position: absolute;
	    top: 3px;
	    right: 0;
	}
	.goregister a{
		text-decoration: none;
	}
	.goregister a:link,.goregister a:visited,
	.goregister a:hover,.goregister a:active{
		color: #6495ed;
	}
	.sign-in-web{
		width: 100%;
		margin-top: 20px;
		text-align: center;
	}
	.sign-in-web button{
		width: 320px;
		height: 40px;
	    color: #fff;
		background: none;
		border: 0;
		font-size: 25px;
		outline: medium;
		background-color: #4187fe;
	}

</style>
