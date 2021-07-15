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
      <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
          <td :style="tableColumns[0].style">
            <i class="far fa-square"></i>
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
      </tbody>
    </table>
  </div>
</template>

<style scoped>
@import "../../css/layout/page.css";
@import "../../css/layout/grid.css";
</style>

<script>
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    tableData: Array,
    tableColumns: Array,
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