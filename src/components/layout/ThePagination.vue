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
       <BaseSelectBox :fixedData="pageSizeSelectItems" v-model="pageSizeValue" :extraClass="['paging-limit']" :showAbove="true">
          <template v-slot:m-selectbox-icon>
            <i class="fas fa-sort"></i>
          </template>
        </BaseSelectBox>
      <!-- end selectbox -->
    </div>
</template>

<script>
import BaseSelectBox from '../base/BaseSelectBox.vue';
import {PAGE_SIZE_SELECT_ITEMS} from '../../constant'
export default {
  components: {
    BaseSelectBox
  },
  data() {
    return {
      pageSizeSelectItems: PAGE_SIZE_SELECT_ITEMS,
      pageSizeValue: 20,
    }
  }
}
</script>

<style>
@import '../../css/layout/paging.css';
</style>