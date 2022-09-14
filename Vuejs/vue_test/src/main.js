//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
// 引入插件
// import vueResource from "vue-resource";
import store from './store';
//关闭Vue的生产提示
Vue.config.productionTip = false;
// 使用插件
// Vue.use(vueResource);

//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	store: store,
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
});
console.log(vm);