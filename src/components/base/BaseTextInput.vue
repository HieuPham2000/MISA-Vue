<template>
  <div class="input-wrapper">
    <input
      v-if="type === 'text'"
      type="text"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="{
        'border-red': isError && !isComboboxInput,
        'm-combobox__input': isComboboxInput,
      }"
      :title="errorMsg"
      @focus="focusInput"
      @keydown="pressKeyInInput($event)"
      @input="changeInputValue($event.target.value)"
      @blur="validateInput"
    />
    <input
      v-else-if="type === 'number'"
      type="text"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="{ 'border-red': isError }"
      :title="errorMsg"
      @keypress="isNumber($event)"
      @input="changeInputValue($event.target.value)"
      @blur="validateInput"
    />
    <input
      v-else-if="type === 'money'"
      type="text"
      ref="input"
      :value="value | formatMoney"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="['text-align-right', {'border-red': isError }]"
      :title="errorMsg"
      @keypress="isNumber($event)"
      @input="changeInputValue(normalizeMoney($event.target.value))"
      @blur="validateInput"
    />
    <div class="btn-clear-text" @click="clearText" v-show="isShowBtnClearText">
      <img src="@/assets/icon/x.svg" />
    </div>
    <transition name="fade">
      <div
        class="notice"
        v-if="isRequired || format || isComboboxInput"
        v-show="isShowNotice"
      >
        {{ errorMsg }}
      </div>
    </transition>
  </div>
</template>

<script>
import { VALIDATE } from "../../type";
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    maxlength: String,
    isRequired: Boolean,
    isComboboxInput: Boolean,
    comboboxInputItems: Array,
    format: String,
    value: {
      type: [Number, String],
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
  },
  filters: {
    formatMoney: function(value) {
      return CommonFunction.formatMoney(value);
    }
  },
  data() {
    return {
      isShowNotice: false,
      errorMsg: null,
      isError: false,
    };
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  },
  computed: {
    /**
     * Lưu giá trị trạng thái ẩn/hiện của btn clear text
     * @author pthieu (22-07-2021)
     */
    isShowBtnClearText: function () {
      if (this.value == undefined || this.value == null || this.value == "") {
        return false;
      }
      return true;
    },
  },
  watch: {
    value: function () {
      this.validateInput(false);
    },
  },
  methods: {
    /**
   * Loại bỏ dấu phân tách trong giá trị tiền
   * @param {*} value giá trị tiền có dấu phân tách
   * @returns giá trị tiền đã loại bỏ dấu phân tách
   * @author pthieu (22-07-2021)
   */
  normalizeMoney: function(value) {
    return CommonFunction.normalizeMoney(value);
  },
    /**
     * Sự kiện focus (với input nằm trong combobox)
     * @author pthieu (22-07-2021)
     */
    focusInput: function () {
      if (this.isComboboxInput) {
        this.$emit("focus");
      }
    },
    /**
     * Sự kiện keydown (với input nằm trong combobox)
     * @param {event} $event sự kiện kích hoạt
     * @author pthieu (22-07-2021)
     */
    pressKeyInInput: function ($event) {
      if (this.isComboboxInput) {
        this.$emit("keydown", $event);
      }
    },
    /**
     * Thay đổi input value
     * @param {string} value giá trị mới của input
     * @author pthieu (22-07-2021)
     */
    changeInputValue: function (value) {
      this.$emit("input", value);
    },
    /**
     * Xóa text trong ô input
     * @author pthieu (22-07-2021)
     */
    clearText: function () {
      this.changeInputValue("");
      this.$refs.input.focus();
    },
    /**
     * Kiểm tra trường bắt buộc
     * @returns {Boolean} true | false
     * @author pthieu (22-07-2021)
     */
    validateRequired: function () {
      if (!this.isRequired) {
        return true;
      }
      if (
        this.value === "" ||
        this.value === undefined ||
        this.value === null
      ) {
        this.errorMsg = VALIDATE.REQUIRED.NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Kiểm tra dữ liệu nhập vào có đúng định dạng không
     * @returns {Boolean} true | false
     * @author pthieu (22-07-2021)
     */
    validateFormat: function () {
      var format = this.format;
      if (
        !format ||
        this.value == "" ||
        this.value === undefined ||
        this.value === null
      ) {
        return true;
      }

      if (!VALIDATE[format].PATTERN.test(String(this.value).toLowerCase())) {
        this.errorMsg = VALIDATE[format].NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Kiểm tra dữ liệu nhập vào có khớp với option trong combobox không
     * @returns {Boolean} true | false
     * @author pthieu (22-07-2021)
     */
    validateComboboxInput: function () {
      if (
        !this.isComboboxInput ||
        this.value == "" ||
        this.value === undefined ||
        this.value === null
      ) {
        return true;
      }
      var index = this.comboboxInputItems.findIndex((i) => i == this.value);
      if (index == -1) {
        this.errorMsg = VALIDATE.COMBO_BOX.NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Validate dữ liệu khi on input/blur
     * @param {Boolean} showNotice  cờ chỉ định có hiện thị thông báo lỗi hay không (mặc định true)
     * @returns {Boolean} true | false
     * @author pthieu (22-07-2021)
     */
    validateInput: function (showNotice = true) {
      if (
        this.validateRequired() &&
        this.validateFormat() &&
        this.validateComboboxInput()
      ) {
        this.removeInputError();
      } else {
        this.addInputError(showNotice);
      }
      if (this.isComboboxInput) {
        this.$emit("setError", this.isError);
      }
      return !this.isError;
    },
    /**
     * Hiển thị thông báo lỗi
     * @author pthieu (22-07-2021)
     */
    addNoticeError: function () {
      this.isShowNotice = true;
      setTimeout(() => (this.isShowNotice = false), 2000);
    },
    /**
     * Xử lý khi input validate false
     * @param {Boolean} showNotice  cờ chỉ định có hiện thị thông báo lỗi hay không 
     * @author pthieu (22-07-2021)
     */
    addInputError: function (showNotice) {
      this.isError = true;
      if (showNotice) {
        this.addNoticeError();
      }
    },
    /**
     * Xử lý khi input validate true
     * @author pthieu (22-07-2021)
     */
    removeInputError: function () {
      this.isError = false;
      this.errorMsg = null;
    },
    /**
     * Kiểm tra phím vừa ấn có phải phím số hay không
     * @param {event} $event sự kiện kích hoạt
     * @returns {Boolean} true | false
     * @author pthieu ()
     */
    isNumber($event) {
      var charCode = $event.which ? $event.which : $event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $event.preventDefault();
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
@import "../../css/common/input.css";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>