<template>
  <div class="header">
    <div class="header-left">
      <div class="sidebar" @click="toggleMenu"></div>
      <div class="logo"></div>
    </div>
    <div class="header-right">
      <div class="restaurant-info">
        <!-- select box restaurant -->
        <div class="m-selectbox">
          <div class="m-selectbox__content" tabindex="-1">Nhà hàng Biển Đông</div>
          <div class="m-selectbox__btn" tabindex="-1"><i class="fas fa-chevron-down"></i></div>
          <ul class="m-selectbox__dropdown">
            <li class="m-selectbox__dropdown__item selected"><i class="fas fa-check"></i>Nhà hàng Biển Đông</li>
            <li class="m-selectbox__dropdown__item"><i class="fas fa-check"></i>Nhà hàng Biển Tây</li>
            <li class="m-selectbox__dropdown__item"><i class="fas fa-check"></i>Nhà hàng Biển Nam</li>
            <li class="m-selectbox__dropdown__item"><i class="fas fa-check"></i>Nhà hàng Biển Bắc</li>
          </ul>
        </div>
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
export default {
  methods: {
    toggleMenu: function(){
      this.$emit("toggleMenu");
    }
  }
};
</script>