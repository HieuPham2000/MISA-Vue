<template>
  <div class="grid grid-content">
    <table id="tablelist-employee" cellspacing="0">
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
      <transition-group tag="tbody" name="table-rows">
        <tr
          v-for="(row, index) in tableData"
          :key="index"
          @click="clickRow(row[entityId])"
          @dblclick="openDetailForm(row[entityId])"
          :class="{selected: selectedRows.indexOf(row[entityId]) > -1}"
        >
          <td :style="tableColumns[0].style">
            <i v-if="selectedRows.indexOf(row[entityId]) > -1" class="fas fa-check-square"></i>
            <i v-else class="far fa-square"></i>
          </td>
          <td :style="tableColumns[1].style">
            {{ index + 1 }}
          </td>
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
import {TOAST_TYPE} from '../../type'
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    entityId: String,
    tableColumns: Array,
    deleteApi: String,
    tableDataApi: String
  },
  data() {
    return {
      tableData: [],
      selectedRows: []
    }
  },
  created() {
    let me = this;
    this.loadTableData();
    eventBus.$on("reloadTableData", function(toast) {
      me.loadTableData(toast);
    })
    eventBus.$on("deleteTableData", function() {
      me.deleteEntities();
    })
  },
  destroyed() {
    let me = this;
    eventBus.$off("reloadTableData", function(toast) {
      me.loadTableData(toast);
    })
    eventBus.$off("deleteTableData", function() {
      me.deleteEntities();
    })
  },
  methods: {
    loadTableData: function (toast = false) {
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
      });
      
    },
     deleteEntities: function() {
      if(this.selectedRows.length == 0) {
        this.$toast(TOAST_TYPE.DANGER, "Chưa chọn bản ghi!");
      }

      let me = this;
      Promise.all(
        this.selectedRows.map((id) => {
          return axios.delete(`${this.deleteApi}/${id}`).then(res => console.log(res));
        })
      )
      .then(() => {
        me.loadTableData();
        me.selectedRows = [];
      })
      .then(() => {
        console.log("Xóa")
        this.$toast(TOAST_TYPE.SUCCESS, "Xóa thành công!");
      })
      .catch(() => {
        this.$toast(TOAST_TYPE.DANGER, "Có lỗi xảy ra trong quá trình xóa!");
      });    
    },
    clickRow: function(id) {
      // console.log($event.target);
      var index = this.selectedRows.indexOf(id);
      if(index == -1) {
        this.selectedRows.push(id);
      } else {
        this.selectedRows.splice(index, 1);
      }
    },
    openDetailForm: function (id) {
      this.selectedRows = [id];
      this.$emit('openDetailForm', id);
    }
  },
  filters: {
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