<template>
  <div class="input-wrapper">
    <input
      type="date"
      ref="input"
      :value="value | formatDateYYYYMMDD"
      @input="changeInputValue($event.target.value)"
      :max="maxDate"
      class="text-align-center"
    />
  </div>
</template>

<script>
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    value: String,
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maxDate: null,
    }
  },
  created() {
    this.maxDate = this.getMaxDate();
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  },
  filters: {
    formatDateYYYYMMDD: function (value) {
      return CommonFunction.formatDateYYYYMMDD(value);
    },
  },
  methods: {
    /**
     * Thay đổi input value
     * @param {string} value giá trị mới của input
     * @author pthieu (22-07-2021)
     */
    changeInputValue: function (value) {
      this.$emit("input", value);
    },
    /**
     * Lấy ra giá trị ngày hiện tại
     * @returns {string} date dạng yyyy-mm-dd
     * @author pthieu (07-07-2021)
     */
    getMaxDate: function () {
      var date = new Date().toJSON();
      var yyyymmdd = CommonFunction.formatDateYYYYMMDD(date);
      return yyyymmdd;
    },
    /**
     * 
     */
    validateInput() {
      return true;
    }
  },
};
</script>

<style>
@import "../../css/common/input.css";
</style>