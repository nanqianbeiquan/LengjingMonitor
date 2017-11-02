<template>
    <section class="hotNews">
    	<div class="container">
            <div class="row">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <div class="hot-col-left hot-col-b">
                        <header>社会关注新闻热点</header>
                        <div class="newsC"></div>
                    </div>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div class="hot-col-right hot-col-b">
                        <header>企业新闻热点</header>
                        <div class="newsC">
                            <ul>
                                <li v-for='new in compHotNews'>
                                    <a style="text-decoration: none" href="javascript:void 0">{{new}}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: ['searchForm'],
    data () {
        return {
            msg: 'Hello Vue!',
            compHotNews:['2016年世界500强106家中国上榜公司完整名单','2016广东省百强民营企业排行榜','2016年中国互联网企业Top100','2016上半年锂电上市企业业绩Top100','2016年模具企业Top100','大合并孤独样本：58赶集以投资并购驶入新赛道',"'唐僧'迟重瑞妻子陈丽华首成中国女首富",'李嘉诚200亿出售其在浦东最后一个项目 中国人寿接盘']
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
	.hotNews{
        width: 100%;
        margin-bottom: 0.2rem;
    }
    .hot-col-b{
        border:1px solid #eee;
        background-color: #fff;
    }
    .hot-col-b header{
        width: 100%;
        height: 0.2rem;
        line-height: 0.2rem;
        padding-left: 0.1rem;
        border-bottom: 1px solid #eee;
    }
    .newsC{
        padding-top: 20px;
        padding-left: 20px;
        min-height: 2rem;
    }
    .newsC ul li{
        margin: 10px;
        list-style: none;
    }
</style>
