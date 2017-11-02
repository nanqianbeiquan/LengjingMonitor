<template>
    <section class="indexSearch">
    	<div class="index-ad">
            <p>企业商标、专利注册信息查询</p>
        </div>
        <div class="search-classify">
            <ul>
                <li class="classify-name selected classify-name-1" data-hover="商标">商标</li>
                <li>|</li>
                <li class="classify-name classify-name-2" data-hover="专利">专利</li>
            </ul>
        </div>
        <div class="search-box">
            <input type="text" class="search-content inline-block" placeholder="请输入企业名称！" v-model="searchForm.searchContent" @keyup.enter='clickSearchButton'/>
            <span class="glyphicon glyphicon-search search-icon"></span>
            <button type="button" class="inline-block" @click='clickSearchButton'>查询</button>
        </div>
    </section>
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
        clickSearchButton: function() {
            this.$dispatch('reqBySearchCalled');
        }
    }
}
</script>

<style>
	.indexSearch{
        width: 100%;
        padding: 0.4rem 0 1rem 0;
        background-image: url("../img/indexbg.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .blur {    
        -webkit-filter: blur(10px); /* Chrome, Opera */
           -moz-filter: blur(10px);
            -ms-filter: blur(10px);    
                filter: blur(10px);    
    }
    /*index-ad*/
    .index-ad{
        font-family: "STKaiti","KaiTiGB2312","Microsoft YaHei";
        font-size: 0.2rem;
        text-align: center;
        /*margin-top: 0.3rem;*/
    }
    /*search-classify*/
    .search-classify{
        margin-top: 0.2rem;
    }
    .search-classify{
    	margin-left: 25%;
    }
    .search-classify ul li{
        list-style: none;
        display: inline-block;
        font-size: 18px;
        padding: 5px;
        position: relative;
    }
    .search-classify ul li:nth-child(even){
        color: #aaa;
    }
    .classify-name{
        cursor: pointer;
    }
    .selected{
        background-color: #4187FE;
        border-radius: 5px;
        color: #fff;
    }
    .selected:after{
        content: " ";
        width: 0;
        height: 0;
        border-width: 6px 6px 0px;
        border-style: solid;
        position: absolute;
        bottom: -6px;
        border-color:#4187FE transparent transparent;
        left: 50%;
        margin-left: -6px;
    }
    .selected:hover::after{
        opacity: 0;
    }
    /*翻转动画*/
    .classify-name{
        position: relative;
    }
    .classify-name::before {
    	padding: 5px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #4187FE;
        color: #fff;
        content: attr(data-hover);
        border-radius: 5px;
        -webkit-transform: rotateX(270deg);
        -moz-transform: rotateX(270deg);
        transform: rotateX(270deg);
        -webkit-transition: -webkit-transform 0.6s;
        -moz-transition: -moz-transform 0.6s;
        transition: transform 0.6s;
        -webkit-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        transform-origin: 0 0;
        pointer-events: none;
    }
    .classify-name:hover,
    .classify-name:focus {
        background: none;
    }
    .classify-name:hover::before,
    .classify-name:focus::before {
        -webkit-transform: rotateX(10deg);  
        -moz-transform: rotateX(10deg);
        transform: rotateX(10deg);
    }

    /*search-box*/
    .search-box{
        width: 100%;
        height: 0.2rem;
        text-align: center;
        position: relative;
        /*margin-top: 0.05rem;*/
    }
    .inline-block{
        display: inline-block;
    }
    .search-box input{
        width: 50%;
        height: 0.2rem;
        padding-left: 0.15rem;
        font-size: 0.08rem;
        border:none;
        outline:none;
    }
    .search-icon{
        position: absolute !important;
        left: 22.5%;
        top: 0.05rem !important;
        font-size: 0.1rem;
        color: #aaa;
    }
    .search-box button{
        width: 6%;
        height: 0.2rem;
        background-color: #4187fe;
        border: 1px solid transparent;
        color: #fff;
        font-size: 0.08rem;
    }
    .search-box button:hover{
        background-color: #449d44;
    }
</style>
