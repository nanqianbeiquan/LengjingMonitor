import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import mainVue from '../components/main.vue';
import overviewVue from '../components/Overview.vue';
import listVue from '../components/list.vue';

// 定义组件
var Foo = Vue.extend({
    template: '<h1>正在建设敬请期待...</h1>'
})

var Bar = Vue.extend({
    template: '<h1>正在建设敬请期待...</h1>'
})
export default function (router){
	router.map({
		'/': {
			component: mainVue
	        // component: overviewVue
	    },
	    '/main': {
	        component: mainVue
	    },
	    '/overview': {
	        component: overviewVue
	    },
	    '/list': {
	        component: listVue
	    },
	    '/foo': {
	        component: Foo
	    },
	    '/bar': {
	        component: Bar
	    }
	})
	
}