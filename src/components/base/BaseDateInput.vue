<template>
  <div class="input-wrapper">
    <input
      type="date"
      ref="input"
      :value="value | formatDateYYYYMMDD"
      @input="changeInputValue($event.target.value)"
      :max="maxDate"
    />
  </div>
</template>

<script>
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    value: String, // giá trị v-model
  },
  data() {
    return {
      maxDate: null, // giá trị ngày tối đa có thể gán cho input
    }
  },
  created() {
    // set giá trị tối đa = ngày hiện tại
    this.maxDate = this.getMaxDate();
  },

  filters: {
    // Định dạng value thành dạng yyyy-mm-dd
    formatDateYYYYMMDD: function (value) {
      return CommonFunction.formatDateYYYYMMDD(value);
    },
  },
  methods: {
    /**
     * Phương thức thay đổi input value
     * @param {string} value giá trị mới của input
     * @author pthieu (22-07-2021)
     */
    changeInputValue: function (value) {
      this.$emit("input", value);
    },

    /**
     * Phương thức lấy ra giá trị ngày hiện tại
     * @returns {string} date dạng yyyy-mm-dd
     * @author pthieu (22-07-2021)
     */
    getMaxDate: function () {
      // lấy giá trị ngày hiện tại, chuyển dang JSON
      var currentDate = new Date().toJSON();

      // format sang dạng YYYY-MM-DD
      var yyyymmdd = CommonFunction.formatDateYYYYMMDD(currentDate);
      return yyyymmdd;
    },
  },
};
</script>

<style>
@import "../../css/common/input.css";
</style>