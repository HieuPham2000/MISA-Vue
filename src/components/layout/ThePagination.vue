<template>
  <div class="paging-bar">
    <div class="paging-total">
      Hiển thị <b class="paging-total-detail">1-20/1000</b> nhân viên
    </div>

    <!-- button control page -->
    <div class="paging-button">
      <button
        class="m-btn-ctrl-page m-btn-first-page"
        :disabled="isInFirstPage"
        @click="clickFirstPage"
      ></button>

      <button
        class="m-btn-ctrl-page m-btn-prev-page"
        :disabled="isInFirstPage"
        @click="clickPreviousPage"
      ></button>
      <button
        v-for="page in pages"
        :key="page.name"
        :class="['m-btn-num-page', { active: page.isCurrentPage }]"
        :disabled="page.isCurrentPage"
        @click="clickPage(page.name)"
      >
        {{ page.name }}
      </button>
      <button
        class="m-btn-ctrl-page m-btn-next-page"
        :disabled="isInLastPage"
        @click="clickNextPage"
      ></button>
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
      v-model="pageSize"
      :extraClass="['paging-limit']"
      :showAbove="true"
    >
      <template v-slot:m-selectbox-icon>
        <i class="fas fa-sort"></i>
      </template>
    </BaseSelectBox>
    <!-- end selectbox -->
  </div>
</template>

<script>
import BaseSelectBox from "../base/BaseSelectBox.vue";
import { PAGE_SIZE_SELECT_ITEMS } from "../../constant";
export default {
  components: {
    BaseSelectBox,
  },
  props: {
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
  },
  data() {
    return {
      pageSizeSelectItems: PAGE_SIZE_SELECT_ITEMS,
      pageSize: 20,
    };
  },
  computed: {
    // tính toán trang đầu
    startPage: function () {
      return parseInt((this.currentPage - 1) / this.maxVisiableBtn)*this.maxVisiableBtn + 1;
    },

    // tính toán mảng các btn
    pages: function () {
      var buttons = [];
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

    // Kiểm tra có đang ở trang 1 không
    isInFirstPage: function () {
      return this.currentPage === 1;
    },

    // Kiểm tra có đang ở trang cuối không
    isInLastPage: function () {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    /**
     * Chọn btn về trang đầu
     */
    clickFirstPage: function () {
      this.$emit("changePage", 1);
    },

    /**
     * Chọn btn chuyển đến trang trước
     */
    clickPreviousPage: function () {
      this.$emit("changePage", this.currentPage - 1);
    },

    /**
     * Chọn btn chuyển sang trang được chọn
     */
    clickPage: function (page) {
      this.$emit("changePage", page);
    },

    /**
     * Chọn btn chuyển sang trang kế tiếp
     */
    clickNextPage: function () {
      this.$emit("changePage", this.currentPage + 1);
    },

    /**
     * Chọn btn chuyển đến trang cuối
     */
    clickLastPage: function () {
      this.$emit("changePage", this.totalPages);
    },
  },
};
</script>

<style>
@import "../../css/layout/paging.css";
</style>