<template>
    <div id="modalnews">
        <div class="modal" id="newsmodal" tabindex="-1">
            <div class="modal-dialog" id="news-modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title modalNewsTitle">公司新闻舆情提炼</h4>
                    </div>
                    <div class="modal-body" id="wordCloudBody">
                        <!-- <div id="wordCloudContainer"></div> -->
                        <div id="newsList">
                            <h5 class="newsListTitle">新闻列表</h5>
                            <table class="table table-condensed">
                                <tr>
                                    <td>日期</td>
                                    <td>新闻标题</td>
                                </tr>
                                <tr v-for="list in companyNewsList.newsList">
                                    <td>{{list['pubtime'].substr(0,11)}}</td>
                                    <!-- <td>{{list['title'] | summaryNewsListTitle}}</td> -->
                                    <td>
                                        <button type="button" class="opacityButton" id="newsDetailTitle" v-on:click="getThisNews(list.key)">
                                            <!-- summaryNewsListTitle是过滤器，截取前15个字 -->
                                            {{list['title'] | summaryNewsListTitle}}
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div id="news-detail">
                            <!-- <h4 class="modal-title news-detail-title">{{newsDetail.title}}</h4> -->
                            <h4 class="modal-title news-detail-title"></h4>
                            <div id="news-detail-content"></div>
                            <br/>
                            <p>{{newsDetail.source}}</p>
                            <p>{{newsDetail.url}}</p>
                        </div>
                    </div>
                    <div class="clearFloat"></div>
                    <div class="modal-footer" id="news-modal-footer">
                        <!-- <button type="button" class="btn btn-default" @click="refreshWordCloudButton">刷新</button> -->
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
export default {
    props: ['companyNewsList', 'newsDetail'],
    data () {
        return {
            thisNewsId: ''
        }
    },
    methods: {
        // clickCloseButton: function() {
        //     this.$dispatch('closeButtonClicked');
        // }
        refreshWordCloudButton:function(){
            this.$dispatch('refreshWordCloudClicked');
        },
        getThisNews: function(key){
            // console.log(key);
            this.thisNewsId = key;
            this.$dispatch('getThisNewsClicked', this.thisNewsId);
        }
    }
}
</script>

<style>
    #wordCloudBody{
        padding: 15px;
    }
/*    #wordCloudContainer{
        float: left;
        border-right:1px #aaaaaa solid;
    }*/
    #newsList{
        float: left;
        overflow: auto;
        width: 33%;
        height: 500px;
        border-right: 1px solid #aaa;
    }
    #newsList table tr:first-child td{
        text-align: center;
    }
    #newsList table tr:first-child td:first-child{
        width: 100px;
    }
    .clearFloat{
        clear:both;
        height: 10px;
    }
    .newsListTitle{
        width: 100%;
        text-align: center;
    }
    .modalNewsTitle{
        text-align: center;
    }
    #news-modal-footer{
        text-align: center;
    }
    #newsDetailTitle{
        color: #333;
    }
    #news-detail{
        height: 500px;
        padding: 15px 30px;
        overflow: auto;
    }
    .news-detail-title{
        text-align: center;
    }
    #news-detail a{
        pointer-events:none;
    }
</style>
