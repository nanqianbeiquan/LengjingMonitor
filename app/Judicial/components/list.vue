<template>
    <section id="legal-list">
        <div>hello world!{{msg}}</div>
        <h3>Count is {{counterValue}}</h3>
        <button @click='increment'>Increment +1</button>
        <button @click='subtract'>Increment -1</button>
    </section>
</template>

<script>

import store from '../vuex/store' // import 我们刚刚创建的 store
import { action } from '../vuex/actions'
import { getter } from '../vuex/getters'
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
            counterValue: getter.getCount
        }
    }
}
</script>

<style>

</style>
