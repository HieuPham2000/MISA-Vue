<template>
  <DatePicker
    v-model="dateValue"
    type="date"
    :value-type="valueType"
    :format="displayFormat"
    :placeholder="displayFormat"
    :title-format="displayFormat"
    :disabled-date="isFutureDate"
    :lang="lang"
  >
    <!-- Thêm nút "Hôm nay" trong datepicker -->
    <template v-slot:header="{ emit }">
      <button class="mx-btn mx-btn-text" @click="emit(new Date())">
        Hôm nay
      </button>
    </template>

    <!-- Custom button clear text -->
    <template v-slot:icon-clear>
      <div class="btn-clear-text"></div>
    </template>

  </DatePicker>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/vi";

export default {
  components: {
    DatePicker,
  },
  props: {
    value: String, // giá trị value v-model
    displayFormat: { // định dạng hiển thị
      type: String,
      default: "DD-MM-YYYY",
    },
    valueType: { // định dạng giá trị thực sự (input - output)
      type: String,
      default: "YYYY-MM-DD",
    },
  },
  data() {
    return {
      // lưu giá trị của datepicker (nội bộ trong component này)
      // map với prop value
      dateValue: this.value, 
      lang: {
        // thiết lập hiển thị tháng trước năm trong datepicker
        monthBeforeYear: true, 
      },
    };
  },

  created() {
    this.dateValue = this.value;
  },

  watch: {
    /**
     * không cần theo dõi value để gán lại cho dateValue
     * vì trừ khi created
     * còn lại, dateValue luôn thay đổi trước, sau đó mới emit để thay đổi value
     */
    // value: function(newValue) {
    //   this.dateValue = newValue;
    // },

    /**
     * Theo dõi dateValue
     * Khi thay đổi, emit để thay đổi giá trị của prop value
     */
    dateValue: function (newDateValue) {
      this.$emit("input", newDateValue);
    },
  },
  methods: {
    
    // Kiểm tra xem có phải ngày lớn hơn hiện tại không
    /**
     * Phương thức kiểm tra giá trị có lớn hơn ngày hiện tại không
     * @param {Date} date giá trị ngày cần kiểm tra
     * @returns {Boolean} true - lớn hơn ngày hiện tại, false - nhỏ hơn
     * @author pthieu (30-07-2021)
     */
    isFutureDate(date) {
      const currentDate = new Date();
      return date > currentDate;
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