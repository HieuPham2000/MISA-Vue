<template>
<div class="grid-container">
  <div class="grid">
    <table id="tablelist-employee" cellspacing="0">
      <!-- Hàng tiêu đề các cột trong bảng -->
      <thead>
        <tr>
          <th
            v-for="(column, index) in tableColumns"
            :key="index"
            :style="column.style"
          >
            {{ column.header }}
          </th>
        </tr>
      </thead>
              
      <!-- Nội dung bảng -->
      <tbody>
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @click="clickRow(row[entityId])"
          @dblclick="openDetailForm(row[entityId])"
          :class="{ selected: selectedRows.indexOf(row[entityId]) > -1 }"
        >
          <!-- ô 1: chứa checkbox -->
          <td :style="tableColumns[0].style">
            <!-- <i
              v-if="selectedRows.indexOf(row[entityId]) > -1"
              class="fas fa-check-square"
            ></i>
            <i v-else class="far fa-square"></i> -->
            <div :class="['checkbox', {checked: isSelected(row[entityId])} ]">
              <i class="fas fa-check"></i>
            </div>
          </td>
          <!-- ô 2: chứa số thứ tự -->
          <td :style="tableColumns[1].style">
            {{ startIndex + index + 1 }}
          </td>
          <!-- Các ô khác -->
          <td
            v-for="(column, index) in tableColumns.slice(2)"
            :key="index"
            :style="column.style"
          >
            {{ row[column.fieldName] | formatData(column.filter) }}
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
  <!-- modal loading -->
  <BaseLoading v-show="isLoading" />
  <!-- thông báo hiển thị khi bảng không có dữ liệu -->
  <div class="notice-empty" v-show="isEmpty">Không có dữ liệu</div>
  </div>
</template>

<style scoped>
@import "../../css/layout/page.css";
@import "../../css/layout/grid.css";
</style>

<script>
import { CommonFunction } from "../../script/common/common";
import BaseLoading from "../base/BaseLoading.vue";
export default {
  components: { BaseLoading },
  props: {
    /**
     * Tên trường id (khóa chính)
     * VD: EmployeeId, CustomerId
     */
    entityId: String,
    /**
     * Danh sách thông tin các cột
     * (tiêu đề, kích thước, style)
     */
    tableColumns: Array,
    /**
     * Danh sách dữ liệu hiển thị
     */
    tableData: Array,
    /**
     * Danh sách các bản ghi/hàng được chọn
     */
    selectedRows: Array,
    /**
     * Cờ xác định trang có đang load dữ liệu không:
     * true - loading, false - không
     */
    isLoading: Boolean,
    /**
     * Chỉ số của bản ghi đầu tiên
     */
    startIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    /**
     * Cờ xác định dữ liệu tableData sau khi load có trống hay không:
     * true - trống | false - không
     */
    isEmpty: function() {
      return !this.isLoading && (this.tableData == undefined || this.tableData == null || this.tableData.length == 0);
    }
  },
  methods: {
    /**
     * Phương thức xử lý sự kiện click chọn bản ghi
     * @param {String} id id/khóa chính của bản ghi
     * @author pthieu (16-07-2021)
     */
    clickRow: function (id) {
      this.$emit("clickRow", id);
    },
    /**
     * Phương thức Xử lý sự kiện dblclick chọn row 
     * => mở form thông tin chi tiết
     * @param {String} id khóa chính
     * @author pthieu (16-07-2021)
     */
    openDetailForm: function (id) {
      // Truyền đi sự kiện (lên component cha) với tham số id
      this.$emit("openDetailForm", id);
    },
   /**
     * Phương thức Kiểm tra 1 bản ghi có đang ở trạng thái selected không
     * @param {String} id khóa chính
     * @return {Boolean} true - đang được selected, false - không
     * @author pthieu (16-07-2021)
     */
    isSelected: function (id) {
      return (this.selectedRows.indexOf(id) > -1);
    },
  },
  filters: {
    /**
     * Định dạng hiển thị dữ liệu
     * @param {*} value giá trị dữ liệu cần định dạng
     * @param {string} filterType kiểu định dạng
     * @returns {*} dữ liệu sau định dạng
     * @author pthieu (14-07-2021)
     */
    formatData: function (value, filterType) {
      switch (filterType) {
        case "dateDDMMYYYY":
          return CommonFunction.formatDateDDMMYYYY(value);
        case "money":
          return CommonFunction.formatMoney(value);
        case "work-status":
          return CommonFunction.formatWorkStatus(value);
        default:
          return value;
      }
    },
  },
};
</script>