<template>
      <nav class="navbar navbar-fixed-top nav-backgroundcolor">
         <div class="container-fluid" id="container-fluid">
            <div class="home-icon">
                <a href="./indexApi.jsp">
                    <i class="fa fa-home fa-3x home-icon" aria-hidden="true"></i>
                </a>
            </div>
             <!-- Brand and toggle get grouped for better mobile display -->
            <form id='searchFrom' class="navbar-form" role="search" v-on:submit.prevent>
                <!-- 搜索与搜索提示框============================= -->
                <div class="form-group keyword-search">
                    <input id='searchInputOne' type="text" class="form-control" placeholder="请输入公司全称" v-model="searchForm.firstSearchBox" @keyup.enter='clickSearchButton' autocomplete="off" value=''>
                    <div class="keywordSearchSuggest keywordSearchSuggestOne" id="keywordSearchSuggestOne">
                        <ul class="list-unstyled">
                        </ul>
                    </div>
                </div>

                <!-- 搜索按钮============================= -->
                <button id='searchSubmit' type="button" class="btn btn-default" @click='clickSearchButton'> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> 搜索</button>

            </form>
         </div><!-- /.container-fluid -->
     </nav>

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
            this.$dispatch('renderGraphBySearchData');
        }
    }
}
</script>

<style>
    .nav-backgroundcolor{
        background: linear-gradient(to bottom, #208ed3 0%,#0272bd 100%); 
    }
    .container-fluid{
        width: 100%;
    }
    .home-icon{
        float: left;
        height: 55px;
        line-height: 55px;
    }
    .home-icon a i{
        font-size: 35px;
        color: #fff;
    }
    #searchFrom{
        margin: 10px;
        float: right;
    }
    @media (min-width: 768px){
        #searchInputOne{
            width: 300px;
        }
    }
    #searchInputOne{
        border-radius: 20px;
        height: 35px;
        font-size: 12px;
    }
    #searchSubmit {
        height: 35px;
        font-size: 12px;
        margin-left: 10px;
        padding-top: 0;
        padding-bottom: 0;
        /*background-color: transparent;*/
        border: 0;
        color: #0272bd;
        border-radius: 5px;
    }
    #searchSubmit:hover {
        background-color: orange;
    }
    /* start 搜索提示框样式================================================*/
    .keyword-search{
        position: relative;
    }
    .keywordSearchSuggest{
        font-size: 12px;
        color:#666666;
        background:#FFFFFF;
        border: 1px solid #999999;
        position: absolute;
        z-index: 99;
        display: none;
    }
    @media screen and (min-width: 768px){
        .keywordSearchSuggestOne{
            left: 10px;
            width: 280px;
            top: 100%;
        }
    }
    @media screen and (max-width: 767px){
        .keywordSearchSuggestOne{
            left: 10px;
            width: 100%;
            top: 26px;
        }
    }
    .keywordSearchSuggest li{
        height:24px;
        overflow:hidden;
        padding-left:3px;
        line-height:24px;
        background:#FFFFFF;
        cursor:default;
    }
    .keywordSearchSuggest li.hover{
        /*color: red; */
        background: #DDDDDD;
    }
    /* end 搜索提示框样式================================================*/
</style>
