import Vue from 'vue'
import VueRouter from 'vue-router'

import EmployeePage from '../views/dictionary/employee/EmployeePage.vue'
import CustomerPage from '../views/dictionary/customer/CustomerPage.vue'
import DashboardPage from '../views/DashboardPage.vue'
import ReportPage from '../views/ReportPage.vue'
import PurchasePage from '../views/PurchasePage.vue'
import SettingPage from '../views/SettingPage.vue'


Vue.use(VueRouter);

const routes = [
  {path:"/", component: EmployeePage},

  {path:"/employee", component: EmployeePage},
  {path:"/customer", component: CustomerPage},
  {path:"/dashboard", component: DashboardPage},
  {path:"/report", component: ReportPage},
  {path:"/purchase", component: PurchasePage},
  {path:"/setting", component: SettingPage},
];

export const router = new VueRouter({
  mode:'history',
  routes
})

