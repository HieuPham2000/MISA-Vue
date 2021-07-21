import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import registryToast from './script/base/toast'

Vue.config.productionTip = false

Vue.use(registryToast);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
