import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'

import EmployeeList from './views/dictionary/employee/EmployeeList.vue'
import CustomerList from './views/dictionary/customer/CustomerList.vue'

Vue.use(Router);

const routes = [
  {path:"/", component: EmployeeList},
  {path:"/employee", component: EmployeeList},
  {path:"/customer", component: CustomerList},
];

const router = new Router({
  mode:'history',
  routes
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
