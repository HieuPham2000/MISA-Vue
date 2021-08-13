import Vue from 'vue'
import VueRouter from 'vue-router'

import EmployeePage from '../views/employee/EmployeePage.vue'
import CustomerPage from '../views/customer/CustomerPage.vue'
import DashboardPage from '../views/dashboard/DashboardPage.vue'
import ReportPage from '../views/report/ReportPage.vue'
import PurchasePage from '../views/purchase/PurchasePage.vue'
import SettingPage from '../views/setting/SettingPage.vue'


Vue.use(VueRouter);

const routes = [
  {path:"/", redirect: "/employee" },

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

