<template>
  <div class="paging-bar">
      <div class="paging-total">
        Hiển thị <b class="paging-total-detail">1-20/1000</b> nhân viên
      </div>

      <!-- button control page -->
      <div class="paging-number">
        <div class="m-btn-ctrl-page m-btn-first-page"></div>
        <div class="m-btn-ctrl-page m-btn-prev-page"></div>
        <div class="m-btn-num-page active">1</div>
        <div class="m-btn-num-page">2</div>
        <div class="m-btn-num-page">3</div>
        <div class="m-btn-num-page">4</div>
        <div class="m-btn-ctrl-page m-btn-next-page"></div>
        <div class="m-btn-ctrl-page m-btn-last-page"></div>
      </div>
      <!-- end button control page -->

      <!-- selectbox select number of records -->
      <div class="m-selectbox paging-limit">
        <div class="m-selectbox__content" tabindex="-1">20 nhân viên/trang</div>
        <div class="m-selectbox__btn" tabindex="-1">
          <i class="fas fa-sort"></i>
        </div>
        <ul class="m-selectbox__dropdown">
          <li class="m-selectbox__dropdown__item">
            <i class="fas fa-check"></i>10 nhân viên/trang
          </li>
          <li class="m-selectbox__dropdown__item selected">
            <i class="fas fa-check"></i>20 nhân viên/trang
          </li>
          <li class="m-selectbox__dropdown__item">
            <i class="fas fa-check"></i>30 nhân viên/trang
          </li>
        </ul>
      </div>
      <!-- end selectbox -->
    </div>
</template>

<script>
export default {
  
}
</script>

<style>
@import '../../css/layout/paging.css';
</style>