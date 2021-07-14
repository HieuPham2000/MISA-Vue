<template>
  <div id="app">
    <EmployeePage />
  </div>
</template>

<script>
import EmployeePage from './views/dictionary/employee/EmployeePage.vue'
export default {
  name: 'App',
  components: {
    EmployeePage
  }
}
</script>

<style>
  @import './assets/font/fontawesome-5.15.1/css/all.min.css';
  @import './css/common/main.css';
  @import './css/page/employee.css';
</style>
