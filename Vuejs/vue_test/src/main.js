//引入Vue
import Vue from 'vue';
//引入App
import App from './App.vue';
// 引入插件
import VueRouter from 'vue-router';
import router from './router/index';
//关闭Vue的生产提示
Vue.config.productionTip = false;

// 应用插件
Vue.use(VueRouter);
//创建vm
const vm = new Vue({
	el: '#app',
	render: h => h(App),
	router: router
});