<template>
    <section id="legal-mainPage">
        <div class="main-left" id="main-left">
            <div id="legalContainer"></div>
        </div>
        <div class="main-right" id="main-right">
            <h3>
                案件简明信息
            </h3>
            <ul class="caseBriefContainer">
                <li v-for = "data in scatterData" class="caseBrief" id="{{data.id}}">
                    <table>
                        <tr>
                            <td class="li-left-tags"><span class="glyphicon glyphicon-share-alt"></span></td>
                            <td class="li-right-content">
                               <h4>{{$index}}.{{data.caseNum}}</h4>
                               <p>{{data.properties}}</p> 
                            </td>
                        </tr>
                    </table>
                   <!--  <div class="li-left-tags">
                        <span class="glyphicon glyphicon-share-alt"></span>
                    </div>
                    <div class="li-right-content">
                        <h4>{{data.caseNum}}</h4>
                        <p>{{data.properties}}</p>
                    </div> -->
                </li>
            </ul>
        </div>
    </section>
</template>

<script>

import store from '../vuex/store' // import 我们刚刚创建的 store
import { action } from '../vuex/actions'
import { getter } from '../vuex/getters'
import $ from 'jquery'
export default {
    // props: [],
    data () {
        return {
            msg: 'Hello Vue!'
        }
    },
    methods: {
        // clickSearchButton: function() {
        //     this.$dispatch('renderGraphBySearchData');
        // }
    },
    store: store, // 在根组件加入 store，让它的子组件和 store 连接
    vuex: {
        actions: {
            increment: action.incrementCounter,
            subtract: action.subtractCounter
        },
        getters: {
            // 注意在这里你需要 `getCount` 函数本身而不是它的执行结果 'getCount()'
            counterValue: getter.getCount,
            scatterData: getter.getScatterData
        }
    }
}

</script>

<style>
    #legal-mainPage{
        width: 98%;
        position: absolute;
        left: 0px;
        top: 40px;
        bottom: 20px;
    }
    .main-left{
        width: 60%;
        position: absolute;
        top: 0;
        left: 2%;
        bottom: 0;
        border: 1px solid #ccc;
        box-shadow: 1px 2px 2px #aaa;
        border-radius: 5px;
        /*background-color: #ffffff;*/
        overflow: hidden;
    }
    .main-right{
        width: 36%;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        border: 1px solid #ccc;
        box-shadow: 1px 2px 2px #aaa;
        border-radius: 5px;
        /*background-color: #ffffff;*/
        overflow: auto;
    }
    #legalContainer{
        width: 100%;
        height: 100%;
    }
    .main-right h3{
        text-align: center;
        margin: 10px;
    }
    .caseBriefContainer{
        list-style: none;
        width: 90%;
        margin: 10px auto;
        padding: 0;
    }
    .caseBriefContainer li:hover{
        cursor: pointer;
    }
    .caseBrief{
        width: 100%;
        margin: 10px 0px;
        /*padding: 10px;*/
        border: 1px solid #aaa;
        border-radius: 5px;
        box-shadow: 1px 2px 2px #aaa;
    }
    .li-left-tags{
        font-size: 25px;
        width: 10%;
        height: 100%;
        text-align: center;
        vertical-align: top;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        /*border-right: 1px solid #aaaaaa;*/
    }
    .li-left-tags span{
        display: inline-block;
        margin-top: 20px;
        color: #aaaaaa;
    }
    .li-right-content{
        padding: 10px;
    }
</style>
