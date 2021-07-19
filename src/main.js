import Vue from 'vue'
import App from './App.vue'
import {router} from './router'

Vue.config.productionTip = false
var eventBus = new Vue();
Vue.use(eventBus);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
