<template>
  <DatePicker
    v-model="dateValue"
    type="date"
    :value-type="valueType"
    :format="displayFormat"
    :disabled-date="isFutureDate"
    :placeholder="displayFormat"
    :monthBeforeYear="true"
    :title-format="displayFormat"
    :lang="lang"
  >
    <template v-slot:header="{ emit }">
      <button class="mx-btn mx-btn-text" @click="emit(new Date())">
        Hôm nay
      </button>
    </template>
    <template v-slot:icon-clear>
      <div class="btn-clear-text"></div>
    </template>
  </DatePicker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/vi";
import { CommonFunction } from "../../script/common/common";
export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      dateValue: this.value,
      lang: {
        monthBeforeYear: true,
      },
    };
  },
  created() {
    this.dateValue = this.value;
  },
  watch: {
    // value: function(newValue) {
    //   this.dateValue = newValue;
    // },
    dateValue: function (newDateValue) {
      this.$emit("input", newDateValue);
    },
  },
  methods: {
    // Định dạng yyyy-mm-dd
    formatDateYYYYMMDD: function (value) {
      return CommonFunction.formatDateYYYYMMDD(value);
    },
    // Kiểm tra xem có phải ngày lớn hơn hiện tại không
    isFutureDate(date) {
      const currentDate = new Date();
      return date > currentDate;
    },
  },
  props: {
    value: String,
    displayFormat: {
      type: String,
      default: "DD-MM-YYYY",
    },
    valueType: {
      type: String,
      default: "YYYY-MM-DD",
    },
  },
};
</script>

<style>
@import "../../css/common/input.css";
.mx-datepicker {
  width: 100%;
  height: 40px;
}

.mx-datepicker-main {
  font-family: "GoogleSans-Regular";
  color: #454545;
}

.mx-input {
  height: 40px;
  color: #000;
  box-shadow: none;
}

  .mx-input:hover {
    border-color: #bbbbbb;
  }

  .mx-input:focus {
    border-color: #019160;
  }

.mx-btn {
  color: #019160;
}
.mx-btn:hover {
  border-color: #2fbe8e;
  color: #2fbe8e;
}

.mx-table-date .today {
  color: #019160;
}

.mx-calendar-content .cell:hover {
  color: #73879c;
  background-color: #ebf9f4;
}

.mx-calendar-content .cell.active {
  color: #ffffff;
  background-color: #019160;
}
</style>