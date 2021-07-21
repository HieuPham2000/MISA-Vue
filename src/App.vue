<template>
  <div id="app">
    <div id="toast-msg-container" ref="toast-msg-container"></div>
    <BasePopUp />
    <TheHeader @toggleMenu="toggleMenu" />
    <TheMenu :class="{collapse: collapseMenu}" />
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
      collapseMenu: false,
    }
  },
  methods: {
    toggleMenu: function() {
      this.collapseMenu = !this.collapseMenu;
    },
  }
}
</script>

<style>
  @import './assets/font/fontawesome-5.15.1/css/all.min.css';
  @import './css/common/main.css';
  @import './css/page/employee.css';
</style>
