<template>
    <section class="setColor" id="setColor">
        <div class="relative_right_block">
            <div class="inline_div close_color_btn" style="" @click='closeSetcolorClick'>关闭</div>
        </div>
        <ul class="nodeType" id="nodeType">
            <li class="selectedLi">公司</li>
            <li>自然人</li>
            <li>其他类型</li>
            <li>高风险</li>
            <li>中风险</li>
            <li>低风险</li>
            <li>无风险</li>
            <li>投资</li>
            <li>法人</li>
            <li>任职</li>
            <li>默认设置</li>
            
        </ul>
        <ul class="colorConfig" id="colorConfig">
            <li v-for="color in colorConfig.nodescolorConfig" v-bind:style="{ backgroundColor: color}" data-bgcolor={{color}}>
                <!-- {{$index}} -->
            </li>
        </ul>
    </section>
</template>

<script>
import $ from 'jquery'
export default {
    props: ['colorConfig'],
    data () {
        return {

        }
    },
    methods: {
        closeSetcolorClick: function() {
            this.$dispatch('closeSetcolorClicked');
        }
    }
}
</script>

<style>
    .close_color_btn{
        position: relative;
        margin: 3px 4px;
        padding: 2px 5px;
        cursor: pointer;
        font-size: 12px;
        border-radius: 3px;
    }
    .close_color_btn:hover{
        background:#2ea7e0;
        color:#ffffff;
    }
    .setColor{
        width: 650px;
        height: 70px;
        position: fixed;
        /*top: 51px;
        right: 10px;*/
        opacity: 0;
        top: -1000px;
        right: -1000px;
        background-color: #faf8f8;
        z-index: 10;
        margin-top: 10px;
        border: 1px solid #2ea7e0;
        border-radius: 5px;
        padding: 5px 2px;
    }
    .setColor ul{
        margin: 0;
        padding: 0;
    }
    .nodeType li{
        display: inline-block;
        list-style: none;
        color: #6086b5;
        font-size: 12px;
        margin: 0 4px;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
    }
    .colorConfig li{
        display: inline-block;
        list-style: none;
        margin:12px 10px 5px;
        width: 10px;
        height: 10px;
        /*background-color: red;*/
        border-radius: 10px;
        color: #333;
        cursor: pointer;
    }
    .nodeType .selectedLi{
        background-color: #2ea7e0;
        color:#ffffff;
    }
    .selectedLi{
        background-color: #2ea7e0;
        color:#ffffff;
    }
    .selectedLiHover{
        background-color: #ddd;
    }
</style>
