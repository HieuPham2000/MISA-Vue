<template>
  <div id="app">
    <!-- <EmployeeList /> -->
    <router-view />
  </div>
</template>

<script>
// import EmployeeList from './views/dictionary/employee/EmployeeList.vue'
export default {
  name: 'App',
  components: {
    // EmployeeList
  }
}
</script>

<style>
  @import './assets/font/fontawesome-5.15.1/css/all.min.css';
  @import './css/common/main.css';
  @import './css/page/employee.css';
  #app {
    height: 100vh;
  }
</style>
