<template>
  <div id="app">
    <!-- vùng chứa toast message -->
    <div id="toast-msg-container" ref="toast-msg-container"></div>

    <!-- pop-up -->
    <BasePopUp />

    <!-- header -->
    <TheHeader @toggleMenu="toggleMenu" />

    <!-- menu -->
    <TheMenu :class="{collapse: collapseMenu}" />

    <!-- page -->
    <router-view :expand="collapseMenu"/>
  </div>
</template>

<script>
import BasePopUp from './components/base/BasePopUp.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheMenu from './components/layout/TheMenu.vue'
export default {
  name: 'App',
  components: {
    TheHeader,
    TheMenu,
    BasePopUp,
  },
  data() {
    return {
      // cờ xác định trạng thái thu hẹp/mở rộng của menu
      // true - menu thu hẹp, false - menu mở rộng
      collapseMenu: false,
    }
  },
  methods: {
    /**
     * Phương thức thay đổi trạng thái thu hẹp/mở rộng menu
     * @author pthieu (17-07-2021)
     */
    toggleMenu: function() {
      this.collapseMenu = !this.collapseMenu;
    },
  }
}
</script>

<style>
  @import './assets/font/fontawesome-5.15.1/css/all.min.css';
  @import './css/common/main.css';
</style>
