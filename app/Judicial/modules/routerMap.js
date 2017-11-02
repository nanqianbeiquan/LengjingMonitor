import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import panorama from '../components/panorama.vue';


// 定义组件
var Foo = Vue.extend({
    template: '<h1>正在建设敬请期待...</h1>'
})

var Bar = Vue.extend({
    template: '<h1>正在建设敬请期待...</h1>'
})
export default function (router){
	console.log(router);
	router.map({
		'/': {
			//component: mainVue
	         component: panorama
	    }
	})
}