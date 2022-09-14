//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
// 引入插件
// import vueResource from "vue-resource";
import Vuex from 'vuex';
//关闭Vue的生产提示
Vue.config.productionTip = false;
// 使用插件
// Vue.use(vueResource);
Vue.use(Vuex);

//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	store: 'hello',
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
});
console.log(vm);