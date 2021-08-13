<template>
  <div class="header">
    <!-- phần bên trái: logo, btn toggle menu -->
    <div class="header-left">
      <div class="sidebar" @click="toggleMenu"></div>
      <div class="logo"></div>
    </div>
    <!-- phần bên phải: selectbox, thông tin tài khoản -->
    <div class="header-right">
      <div class="restaurant-info">
        <!-- select box restaurant -->
        <BaseSelectBox :fixedData="restaurantSelectItems" v-model="restaurantId">
          <template v-slot:m-selectbox-icon>
            <i class="fas fa-chevron-down"></i>
          </template>
        </BaseSelectBox>
        <!-- end select box restaurant -->
      </div>
      <div class="account-info">
        <div class="account-image"></div>
        <div class="account-name">Phạm Trung Hiếu</div>
        <div class="account-icon-option"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  @import '../../css/layout/header.css';
</style>

<script>
import BaseSelectBox from '../base/BaseSelectBox.vue';
import {RESTAURANT_SELECT_ITEMS} from '../../script/common/constant';
export default {
  components: { BaseSelectBox },
  data() {
    return {
      // mảng các nhà hàng
      restaurantSelectItems: RESTAURANT_SELECT_ITEMS, 
      // giá trị v-model với selectbox
      restaurantId: 1
    }
  },
  methods: {
    /**
     * Mở rông/thu hẹp menu
     * @author pthieu (16-07-2021)
     */
    toggleMenu: function(){
      this.$emit("toggleMenu");
    },
  }
};
</script>