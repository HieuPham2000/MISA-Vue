<template>
  <div>
    <TheHeader />
    <TheMenu />
    <ThePage />
  </div>
</template>

<script>
import TheHeader from '../../../components/layout/TheHeader.vue'
import TheMenu from '../../../components/layout/TheMenu.vue'
import ThePage from '../../../components/layout/ThePage.vue'
export default {
  name: 'EmployeeList',
  components: {
    TheHeader, TheMenu, ThePage
  }
}
</script>

<style>
  @import '../../../assets/font/fontawesome-5.15.1/css/all.min.css';
  @import '../../../css/common/main.css';
  @import '../../../css/page/employee.css';
</style>
