<template>
  <div class="menu">
    <router-link
      v-for="(menuItem, index) in menuItems"
      :key="index"
      class="menu-item"
      :to="menuItem.route"
    >
      <div class="menu-item-icon" :class="menuItem.icon"></div>
      <div class="menu-item-text">{{ menuItem.text }}</div>
    </router-link>
  </div>
</template>

<style scoped>
@import "../../css/layout/menu.css";
.menu-item.router-link-exact-active {
  background-color: #019160;
  color: #ffffff
}
.menu .menu-item.router-link-exact-active .menu-item-icon{
  filter: brightness(0) invert(1);
}
</style>

<script>
export default {
  data() {
    return {
      menuItems: [
        {
          text: "Tổng quan",
          icon: "menu-icon-dashboard",
          route: "/dashboard",
        },
        {
          text: "Báo cáo",
          icon: "menu-icon-report",
          route: "/report",
        },
        {
          text: "Mua hàng",
          icon: "menu-icon-purchase",
          route: "/purchase",
        },
        {
          text: "Danh sách khách hàng",
          icon: "menu-icon-customer",
          route: "/customer",
        },
        {
          text: "Danh sách nhân viên",
          icon: "menu-icon-employee",
          route: "/employee",
        },
        {
          text: "Cài đặt",
          icon: "menu-icon-setting",
          route: "/setting",
        },
      ],
    };
  },
};
</script>