import $ from 'jquery'
import Vue from 'vue'
require("bootstrap-webpack");

//# 导入样式
require("./css/default.css");
require("./css/urmain.css");

//# 导入组件
import Signin from './components/Signin.vue'
import Indexnav from './components/Indexnav.vue'
import Indexabout from './components/Indexabout.vue'
import Urregister from './components/Urregister.vue'


//## 全局变量设置 ================================================================

//## 全局变量设置 ================================================================

//## vue实例MVVM ================================================================
//# => vue实例参数设置
//# 定义模型
var model = {};

//# model数据定义
model.data = {
    flag: 'flag here!'
}

//# model方法定义
model.methods = {

}

//# model计算属性定义
model.computed = {

}

//# model事件定义
model.events = {

}

//# => vue实例
var vm = new Vue({
    el: 'body',
    components:{
        Indexnav, //首页顶部导航栏用户登陆、注册
        Indexabout, //首页底部关于
        Signin, //登陆
        Urregister, //注册
    },
    data: model.data,
    methods: model.methods,
    computed: model.computed,
    events: model.events,
});
//## vue实例MVVM ===============================================================
