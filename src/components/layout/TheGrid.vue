<template>
  <div class="grid grid-content">
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
      <transition-group tag="tbody" name="table-rows">
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @click="clickRow(row[entityId])"
          @dblclick="openDetailForm(row[entityId])"
          :class="{selected: selectedRows.indexOf(row[entityId]) > -1}"
        >
          <!-- ô 1: chứa checkbox -->
          <td :style="tableColumns[0].style">
            <i v-if="selectedRows.indexOf(row[entityId]) > -1" class="fas fa-check-square"></i>
            <i v-else class="far fa-square"></i>
          </td>
          <!-- ô 2: chứa số thứ tự -->
          <td :style="tableColumns[1].style">
            {{ index + 1 }}
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
      </transition-group>
    </table>
    <TheLoader v-show="isLoading"/>
  </div>
</template>

<style scoped>
@import "../../css/layout/page.css";
@import "../../css/layout/grid.css";
@import "../../css/page/employee.css";

.table-rows-move {
  transition: transform 3s;
}
</style>

<script>

import axios from 'axios';
import eventBus from '../../event-bus'
import {TOAST_TYPE, EMPLOYEE_ACTION} from '../../type'
import {POP_UP_EMPLOYEE} from '../../constant'
import { CommonFunction } from "../../script/common/common";
import TheLoader from './TheLoader.vue';
export default {
  components: { TheLoader },
  props: {
    entityId: String, // tên trường id, VD: EmployeeId
    tableColumns: Array, // danh sách các cột trong bảng (và thông tin đi kèm)
    deleteApi: String, // api dùng khi xóa dữ liệu
    tableDataApi: String  // api dùng để load dữ liệu
  },

  data() {
    return {
      tableData: [], // Mảng dữ liệu nhận được sau khi load api
      selectedRows: [], // Mảng các hàng được click chọn
      dataPopUpDelete: {...POP_UP_EMPLOYEE.DELETE}, // Thông tin về pop up Xóa
      isLoading: false,
    }
  },

  created() {
    // Tiến hành load dữ liệu trong bảng
    this.loadTableData();

    // Lắng nghe các sự kiện truyền qua eventBus
    // Reload dữ liệu (nhấn btn refresh, auto reload sau post, put...)
    
    // eventBus.$on("reloadTableData", function(toast) {
    //   me.loadTableData(toast);
    // })
    eventBus.$on("reloadTableData", this.loadTableData)
    // Lắng nghe sự kiện nhấn btn Xóa 
    eventBus.$on("clickBtnDelete", this.clickBtnDelete );
    // Lắng nghe sự kiện xóa nhân viên
    eventBus.$on(EMPLOYEE_ACTION.DELETE, this.deleteEntities);
  },

  destroyed() {
    // Gỡ bỏ lắng nghe sự kiện
    eventBus.$off("reloadTableData", this.loadTableData);
    eventBus.$off("clickBtnDelete", this.clickBtnDelete);
    eventBus.$off(EMPLOYEE_ACTION.DELETE, this.deleteEntities);
  },

  methods: {
    /**
     * Lấy dữ liệu từ api và lưu vào tableData
     * @param {Boolean} toast chỉ định việc hiện toast message khi load thành công
     * @author pthieu (21-07-2021)
     */
    loadTableData: function (toast = false) {
      this.isLoading = true;
      // Gọi api thực hiện lấy dữ liệu
      axios.get(this.tableDataApi)
      .then((res) => {
        this.tableData = res.data;
        if(toast) {
        this.$toast(TOAST_TYPE.SUCCESS, "Dữ liệu đã được cập nhật!");
      }
      })
      .catch(() => {
        this.$toast(TOAST_TYPE.DANGER, "Có lỗi xảy ra, không thể cập nhật dữ liệu!");
      }).finally(() => {
        setTimeout(() => this.isLoading = false, 1000);
      });
    },

    /**
     * Xử lý custom event "clickBtnDelete" trên eventBus (phát sinh khi nhấn btn Xóa)
     * @author pthieu (21-07-2021)
     */
    clickBtnDelete: function() {
      var len = this.selectedRows.length
      if( len == 0) {
        // TH chưa chọn bản ghi nào => thông báo "Chưa chọn..."
        this.$toast(TOAST_TYPE.DANGER, "Chưa chọn bản ghi!");
      } else {
        // TH đã chọn bản ghi => hiện pop up yêu cầu xác nhận
        this.dataPopUpDelete.content = `Bạn có chắc muốn "Xóa ${len} bản ghi" hay không?`;
        eventBus.$emit("openPopUp", this.dataPopUpDelete);
      }
    },
    /**
     * Lấy dữ liệu từ api và lưu vào tableData
     * @param {Boolean} toast chỉ định việc hiện toast message khi load thành công
     * @author pthieu (21-07-2021)
     */
    deleteEntities: function() {
      var len = this.selectedRows.length;

      Promise.all(
        // Xóa lần lượt tất cả đối tượng được chọn
        this.selectedRows.map((id) => {
          return axios.delete(`${this.deleteApi}/${id}`);
        })
      )
      .then(() => {
        // Thành công
        this.selectedRows = [];
        this.$toast(TOAST_TYPE.SUCCESS, `Xóa thành công ${len} bản ghi!`);
      })
      .catch(() => {
        // Có lỗi
        this.$toast(TOAST_TYPE.DANGER, "Có lỗi xảy ra trong quá trình xóa!");
      }).finally(() => {
        // Luôn load lại dữ liệu
        this.loadTableData();
      });    
    },
    /**
    * Xử lý sự kiện click chọn row
    * @param {String} id trường id tương ứng của dữ liệu trong hàng
    * @author pthieu (16-07-2021)
    */
    clickRow: function(id) {
      // Tìm xem id đã có trong danh sách được chọn chưa
      var index = this.selectedRows.indexOf(id);
      if(index == -1) {
        // Nếu chưa thì thêm vào danh sách được chọn
        this.selectedRows.push(id);
      } else {
        // Nếu đã có thì loại bỏ khỏi danh sách được chọn
        this.selectedRows.splice(index, 1);
      }
    },
    /**
    * Xử lý sự kiện dblclick chọn row => mở form thông tin chi tiết
    * @param {String} id trường id tương ứng của dữ liệu trong hàng
    * @author pthieu (16-07-2021)
    */
    openDetailForm: function (id) {
      this.selectedRows = [id];
      
      // Truyền đi sự kiện (lên component cha) với tham số id
      this.$emit('openDetailForm', id);
    }
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