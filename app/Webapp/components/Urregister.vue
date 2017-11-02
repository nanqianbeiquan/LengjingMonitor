<template>
    <section class="urRegister">
    	<div class="register-container">
	    	<div class="container">
		    	<div class="row">
		    	    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
		    	    	<div class="ur-r-l ur-r">
		    	    		<header>
		    	    			会员注册
		    	    		</header>
	    		    		<div class="user-register-box">
	    		    			<div class="user-r-phone">
	    		    				<input type="text" autocomplete="off" placeholder="请输入手机号" @focus='u_phone_focus' @blur='u_phone_blur'>
	    		    				<div class="u-r-icon u-phone-icon">
	    			    				<span class="glyphicon glyphicon-phone"></span>
	    		    				</div>
	    		    			</div>
	    		    			<div class="user-r-name">
	    		    				<input type="text" autocomplete="off" placeholder="请输入账户名" @focus='u_user_focus' @blur='u_user_blur'>
	    		    				<div class="u-r-icon u-user-icon">
	    			    				<span class="glyphicon glyphicon-user"></span>
	    		    				</div>
	    		    			</div>
	    		    			<div class="user-r-email">
	    		    				<input type="text" autocomplete="off" placeholder="请输入邮箱" @focus='u_email_focus' @blur='u_email_blur'>
	    		    				<div class="u-r-icon u-email-icon">
	    			    				<span class="glyphicon glyphicon-envelope"></span>
	    		    				</div>
	    		    			</div>
	    		    			<div class="user-r-password">
	    		    				<input type="password" autocomplete="off" placeholder="请输入密码" @focus='u_password_focus' @blur='u_password_blur'>
	    		    				<div class="u-r-icon u-password-icon">
	    		    					<span class="glyphicon glyphicon-lock"></span>
	    		    				</div>
	    		    			</div>
	    		    			<div class="user-r-vcode">
	    		    				<input id="ur-vcode" type="text" autocomplete="off" placeholder="请输入验证码">
	    		    				<input id="ur-vcode-btn" type="button" value="获取验证码">
	    		    			</div>
	    		    		</div>
	    		    		<div class="service-protocol">
	    		    			<form role="form">
	    		    				<div class="checkbox">
	    		    				    <label>
	    		    				      	<input type="checkbox" value="">阅读并接受<a href="#">《用户协议》</a>
	    		    				    </label>
	    		    				</div>
	    		    			</form>
	    		    		</div>
	    		    		<div class="submit-box">
	    		    			<button>注册</button>
	    		    		</div>
	    		    		<div class="has-account">
	    		    			已注册，直接&nbsp&nbsp<button type="button" @click='openSignIn'>登录</button>
	    		    		</div>
		    	    	</div>
		    	    </div>
		    	    <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
						<div class="ur-r-r ur-r">
							<img src="../img/ur-ad.png" alt="">
						</div>
		    	    </div>
		    	</div>
	    	</div>
    	</div>
    </section>
</template>

<script>
import $ from 'jquery'
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
        u_phone_focus:function(){
        	$('.u-phone-icon').css({'color':'#6495ed'});
        },
        u_phone_blur:function(){
        	$('.u-phone-icon').css({'color':'#888'});
        },
        u_user_focus:function(){
        	$('.u-user-icon').css({'color':'#6495ed'});
        },
        u_user_blur:function(){
        	$('.u-user-icon').css({'color':'#888'});
        },
        u_email_focus:function(){
        	$('.u-email-icon').css({'color':'#6495ed'});
        },
        u_email_blur:function(){
        	$('.u-email-icon').css({'color':'#888'});
        },
        u_password_focus:function(){
        	$('.u-password-icon').css({'color':'#6495ed'});
        },
        u_password_blur:function(){
        	$('.u-password-icon').css({'color':'#888'});
        },
        openSignIn: function(){
        	$('.signIn').show();
        }
    }
}
</script>

<style>
	.urRegister{
		width: 100%;
	}
	.register-container{
		padding-top: 50px;
	}
	.urRegister .ur-r{
		width: 360px;
		height: 450px;
	    text-align: center;
	}
	.ur-r-l{
		background-color: #fff;
		box-shadow: #ccc 3px 3px 5px;
	}
	.ur-r-l header{
		font-size: 18px;
	 	font-weight: bold;
		color:#333;
		height: 50px;
		line-height: 50px;
		padding-left: 10px;
	}
	.ur-r-r{
		margin: 0 auto;
	}
	.ur-r-r img{
		width: 400px;
	}
	.user-register-box>div{
		position: relative;
	}
	.user-register-box input{
		outline: none;
		width: 320px;
		height: 40px;
		padding-left: 30px;
		margin-top: 10px;
		color: #000;
	}
	.user-register-box input:focus{
		border:1px solid #6495ed;
	}
	.u-r-icon{
		position: absolute;
		top: 20px;
		left: 30px;
		color: #888;
	}
	#ur-vcode{
		display: inline-block;
		margin-top: 10px;
		padding-left: 10px;
		width: 320px;
	}
	#ur-vcode-btn{
		color: #fff;
	    padding: 0;
		position: absolute;
	    right: 20px;
	    top: 0;
	    width: 96px;
		background-color: #449d44;
		border:none;
	}
	.service-protocol{
	    text-align: left;
	    padding-left: 20px;
	}
	.submit-box button{
		width: 250px;
	    height: 40px;
	    background: #4490f7;
	    border: none;
	    color: #fff;
	    font-size: 18px;
	    border-radius: 5px;
        outline: none;
	}
	.has-account{
	    margin-top: 20px;
	    text-align: right;
	    padding-right: 55px;
	}
	.has-account button{
		display: inline-block;
	    color: #23527c;
	    background: none;
	    border: none;
	    outline: none;
	}
</style>
