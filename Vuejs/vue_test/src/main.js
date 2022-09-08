import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  // template: `<h1>你好</h1>`,
  // comments: { App },
  // render(createElement) {
  //   console.log(createElement);
  //   console.log('render');

  //   return createElement('h1','你好啊');
  // }
  render: h => h(App),
})
