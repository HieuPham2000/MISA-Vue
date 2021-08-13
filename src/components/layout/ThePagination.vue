<template>
  <div class="paging-bar">
    <!-- hiển thị range các bản ghi/ tổng số bản ghi -->
    <div class="paging-total">
      <span>Hiển thị <b>{{ rangeRecord }}</b> {{ recordUnit }}</span>
    </div>

    <!-- button control page -->
    <div class="paging-button">
      <!-- nút về trang đầu -->
      <button
        class="m-btn-ctrl-page m-btn-first-page"
        :disabled="isInFirstPage"
        @click="clickFirstPage"
      ></button>
      <!-- nút chuyển đến trang trước -->
      <button
        class="m-btn-ctrl-page m-btn-prev-page"
        :disabled="isInFirstPage"
        @click="clickPreviousPage"
      ></button>

      <!-- các nút chọn trang cụ thể -->
      <button
        v-for="page in pages"
        :key="page.name"
        :class="['m-btn-num-page', { active: page.isCurrentPage }]"
        :disabled="page.isCurrentPage"
        @click="clickPage(page.name)"
      >
        {{ page.name }}
      </button>

      <!-- nút chuyển đến trang sau -->
      <button
        class="m-btn-ctrl-page m-btn-next-page"
        :disabled="isInLastPage"
        @click="clickNextPage"
      ></button>
      <!-- nút chuyển đến trang cuối -->
      <button
        class="m-btn-ctrl-page m-btn-last-page"
        :disabled="isInLastPage"
        @click="clickLastPage"
      ></button>
    </div>
    <!-- end button control page -->

    <!-- selectbox select number of records -->
    <BaseSelectBox
      :fixedData="pageSizeSelectItems"
      :value="pageSize"
      @input="selectPageSize"
      :extraClass="['paging-limit']"
      :showAbove="true"
    >
      <template v-slot:m-selectbox-text>
        <span><b>{{ pageSize }}</b> {{ recordUnit }}/trang</span>
      </template>
      <template v-slot:m-selectbox-icon>
        <i class="fas fa-sort"></i>
      </template>
    </BaseSelectBox>
    <!-- end selectbox -->
  </div>
</template>

<script>
import BaseSelectBox from "../base/BaseSelectBox.vue";
export default {
  components: {
    BaseSelectBox,
  },
  props: {
    // đơn vị bản ghi (vd: nhân viên, khách hàng)
    recordUnit: String,
    /**
     * Số lượng tối đa các btn chọn trang
     */
    maxVisiableBtn: {
      type: Number,
      required: false,
      default: 4,
    },
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    totalRecords: Number,
    // chỉ số của bản ghi đầu tiên trong trang
    startRecord: Number,
    pageSize: Number,
    // các options trong selectbox chọn số bản ghi/trang
    pageSizeSelectItems: Array
  },
  computed: {
    /**
     * Chỉ số của nút đầu tiên trong số các btn chọn trang
     */
    startPage: function () {
      return parseInt((this.currentPage - 1) / this.maxVisiableBtn)*this.maxVisiableBtn + 1;
    },

    /**
     * Danh sách các btn chọn trang
     */
    pages: function () {
      var buttons = [];
      if(this.totalPages == 0) {
        buttons.push({
          name: 1,
          isCurrentPage: 1 === this.currentPage,
        });
        return buttons;
      }

      for (
        var i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisiableBtn - 1, this.totalPages);
        ++i
      ) {
        buttons.push({
          name: i,
          isCurrentPage: i === this.currentPage,
        });
      }

      return buttons;
    },

    /**
     * Cờ xác định có đang ở trang 1 không: 
     * true - đang ở trang 1, false - không
     */
    isInFirstPage: function () {
      return this.currentPage === 1;
    },

    /**
     * Cờ xác định có đang ở trang cuối không: 
     * true - đang ở trang 1, false - không
     */
    isInLastPage: function () {
      if(this.totalPages == 0) {
        return true;
      }
      return this.currentPage === this.totalPages;
    },

    /**
     * Khoảng chỉ số các bản ghi trong trang hiện tại
     */
    rangeRecord: function() {
      if(this.totalRecords == 0) {
        return `0`
      }
      var firstRecord = this.startRecord + 1;
      var lastRecord = Math.min(this.startRecord + this.pageSize, this.totalRecords);
      return `${firstRecord}-${lastRecord}/${this.totalRecords}`;
    }
  },
  methods: {
    /**
     * Phương thức xử lý khi chọn btn chuyển đến trang đầu
     * @author pthieu (31-07-2021)
     */
    clickFirstPage: function () {
      this.$emit("changePage", 1);
    },

    /**
     * Phương thức xử lý khi chọn btn chuyển đến trang cuối
     * @author pthieu (31-07-2021)
     */
    clickPreviousPage: function () {
      this.$emit("changePage", this.currentPage - 1);
    },

    /**
     * Phương thức xử lý khi chọn btn chuyển đến trang cụ thể
     * @author pthieu (31-07-2021)
     */
    clickPage: function (page) {
      this.$emit("changePage", page);
    },

    /**
     * Phương thức xử lý khi chọn btn chuyển đến trang sau
     * @author pthieu (31-07-2021)
     */
    clickNextPage: function () {
      this.$emit("changePage", this.currentPage + 1);
    },

    /**
     * Phương thức xử lý khi chọn btn chuyển đến trang trước
     * @author pthieu (31-07-2021)
     */
    clickLastPage: function () {
      this.$emit("changePage", this.totalPages);
    },

    /**
     * Phương thức xử lý khi thay đổi số bản ghi/trang
     * @author pthieu (31-07-2021)
     */
    selectPageSize: function(newPageSize) {
      this.$emit("changePageSize", newPageSize);
    }
  },
};
</script>

<style>
@import "../../css/layout/paging.css";
</style>