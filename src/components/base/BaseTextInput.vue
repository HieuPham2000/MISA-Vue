<template>
  <div class="input-wrapper">
    <!-- input -->
    <!-- input type text -->
    <input
      v-if="type === 'text'"
      type="text"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      spellcheck="false"
      :class="{
        'border-red': isError && !isComboboxInput,
        'm-combobox__input': isComboboxInput,
      }"
      :title="errorMsg"
      :disabled="isDisabled"
      @focus="onFocusCbxInput"
      @keydown="pressKeyInInput($event)"
      @input="changeInputValue($event.target.value)"
      @blur="onBlurInput"
    />
    <!-- input type number -->
    <input
      v-else-if="type === 'number'"
      type="text"
      ref="input"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="{ 'border-red': isError }"
      :title="errorMsg"
      :disabled="isDisabled"
      @paste.prevent
      @keydown="isNumber($event)"
      @input="changeInputValue($event.target.value)"
      @blur="validateInput"
    />
    <!-- input type money -->
    <input
      v-else-if="type === 'money'"
      type="text"
      ref="input"
      :value="value | formatMoney"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :class="['text-align-right', {'border-red': isError }]"
      :title="errorMsg"
      :disabled="isDisabled"
      @paste.prevent
      @keydown="isNumber($event)"
      @input="changeInputValue(normalizeMoney($event.target.value))"
      @blur="validateInput"
    />

    <!-- btn clear text -->
    <button 
    type="button" class="btn-clear-text" @click="clearText" 
    v-show="isShowBtnClearText" tabindex="-1"
    :disabled="isDisabled">
    </button>

    <!-- notice báo lỗi validate -->
    <transition name="fade" :css="animated">
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
import { VALIDATE } from "../../script/common/type";
import { CommonFunction } from "../../script/common/common";
export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    maxlength: {
      type: String,
      default: '255'
    },
    isRequired: Boolean,
    isComboboxInput: Boolean,
    // mảng giá trị (text) của các options combobox
    // dùng để đối chiếu/validate
    comboboxInputItems: Array,
    // kiểu định dạng (vd email, phone number)
    format: String,
    // giá trị v-model (phía parent)
    value: {
      type: [Number, String],
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  filters: {
    /**
     * Định dạng tiền theo dạng xxx.xxx.xxx
     */
    formatMoney: function(value) {
      return CommonFunction.formatMoney(value);
    }
  },
  data() {
    return {
      /**
       * cờ xác định trạng thái ẩn/hiện notice báo lỗi:
       * true - hiện, false - ẩn
       */
      isShowNotice: false,

      /**
       * thông báo lỗi
       */
      errorMsg: null,

      /**
       * cờ xác định trạng thái có lỗi/không có lỗi của input:
       * true - có lỗi, false - không có lỗi
       */
      isError: false,

      /**
       * cờ xác định có sử dụng animate transition không
       */
      animated: true
    };
  },
  mounted() {
    // nếu input được chỉ định autofocus:
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  },
  computed: {
    /**
     * Cờ xác định trạng thái ẩn/hiện của btn clear text:
     * true - hiện, false: ẩn
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
    /**
     * Theo dõi sự thay đổi của prop value
     * Và thực hiện validate (nhưng không hiện notice báo lỗi)
     */
    value: function () {
      this.validateInput(false);
    },
  },
  methods: {
    /**
     * Phương thức Xử lý sự kiện blur input
     * @param {event} $event sự kiện
     * @author pthieu (28-07-2021)
     */
    onBlurInput: function($event) {
      // kiểm tra nếu phần tử vừa focus đến (relatedTarget)
      // nếu không thuộc component này => thực hiện validate
      // vd: với btn clear text, vẫn thuộc component => không thực hiện validate
      if(!this.$el.contains($event.relatedTarget)) {
        this.validateInput();
      }
    },
    /**
     * Phương thức chuẩn hóa giá trị tiền (bỏ tất cả display format)
     * @param {*} value giá trị tiền có dấu phân tách
     * @returns giá trị tiền đã chuẩn hóa
     * @author pthieu (22-07-2021)
     */
    normalizeMoney: function(value) {
      return CommonFunction.normalizeMoney(value);
    },
    /**
     * Phương thức xử lý Sự kiện focus 
     * (với input nằm trong combobox)
     * @author pthieu (22-07-2021)
     */
    onFocusCbxInput: function () {
      if (this.isComboboxInput) {
        this.$emit("focus");
      }
    },
    /**
     * Phương thức xử lý Sự kiện keydown 
     * (với input nằm trong combobox)
     * @param {event} $event sự kiện kích hoạt
     * @author pthieu (22-07-2021)
     */
    pressKeyInInput: function ($event) {
      if (this.isComboboxInput) {
        this.$emit("keydown", $event);
      }
    },
    /**
     * Phương thức Thay đổi input value (giá trị v-model phía parent)
     * @param {string} newValue giá trị mới của input
     * @author pthieu (22-07-2021)
     */
    changeInputValue: function (newValue) {
      this.$emit("input", newValue);
      this.$forceUpdate();
    },
    /**
     * Phương thức Xóa text trong ô input
     * @author pthieu (22-07-2021)
     */
    clearText: function () {
      // this.changeInputValue("");
      this.changeInputValue(null);
      this.$refs.input.focus();
    },
    /**
     * Phương thức Kiểm tra trường bắt buộc
     * @returns {Boolean} true - thỏa mãn | false - không thỏa mãn
     * @author pthieu (22-07-2021)
     */
    validateRequired: function () {

      // nếu đây không phải trường bắt buộc
      // thì không cần kiểm tra
      if (!this.isRequired) {
        return true;
      }
      
      // kiểm tra giá trị
      if (
        this.value === undefined ||
        this.value === null ||
        this.value.toString().trim() === ""
      ) {
        this.errorMsg = VALIDATE.REQUIRED.NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Phương thức Kiểm tra dữ liệu nhập vào có đúng định dạng không
     * @returns {Boolean} true - đúng định dạng | false - sai
     * @author pthieu (22-07-2021)
     */
    validateFormat: function () {
      var format = this.format;
      // kiểm tra xem input này có yêu cầu định dạng không
      // và giá trị phải khác null, undefined, ""
      // nếu không thỏa mãn => true (không cần kiểm tra)
      if (
        !format ||
        this.value == "" ||
        this.value === undefined ||
        this.value === null
      ) {
        return true;
      }

      // sử dụng regex để kiểm tra input có khớp định dạng hay không
      if (!VALIDATE[format].PATTERN.test(String(this.value).toLowerCase())) {
        this.errorMsg = VALIDATE[format].NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Phương thức Kiểm tra input có khớp với option trong combobox không
     * @returns {Boolean} true - khớp | false - không
     * @author pthieu (22-07-2021)
     */
    validateComboboxInput: function () {
      // kiểm tra xem đây có phải input nằm trong combobox không
      // và giá trị phải khác null, undefined, ""
      // nếu không thỏa mãn => true (không cần kiểm tra)
      if (
        !this.isComboboxInput ||
        this.value == "" ||
        this.value === undefined ||
        this.value === null
      ) {
        return true;
      }
      var index = this.comboboxInputItems.findIndex((item) => item == this.value);
      if (index == -1) {
        this.errorMsg = VALIDATE.COMBO_BOX.NOTICE;
        return false;
      }
      return true;
    },
    /**
     * Phương thức Validate dữ liệu khi on input/blur
     * @param {Boolean} showNotice  
     * cờ chỉ định có hiện thị thông báo lỗi hay không: 
     * true (mặc định) - có hiển thị, false - không
     * @returns {Boolean} true - validate thành công | false - thất bại
     * @author pthieu (22-07-2021)
     */
    validateInput: function (showNotice = true) {

      // lần lượt validate trường bắt buộc, định dạng, combobox
      if (
        this.validateRequired() &&
        this.validateFormat() &&
        this.validateComboboxInput()
      ) {
        this.removeInputError();
      } else {
        this.addInputError(showNotice);
      }

      // nếu input này thuộc combobox
      // thì emit để set error cho combobox
      if (this.isComboboxInput) {
        this.$emit("setError", this.isError);
      }

      // có error (isError = true) => validate thất bại (trả về false)
      // không có error (isError = false) => thành công (trả về true)
      return !this.isError;
    },
    /**
     * Phương thức Hiển thị thông báo lỗi
     * @author pthieu (22-07-2021)
     */
    addNoticeError: function () {
      this.isShowNotice = true;
      setTimeout(() => (this.isShowNotice = false), 2000);
    },
    /**
     * Phương thức Xử lý khi input validate false
     * @param {Boolean} showNotice  
     * cờ chỉ định có hiện thị thông báo lỗi hay không: 
     * true - có hiển thị, false - không
     * @author pthieu (22-07-2021)
     */
    addInputError: function (showNotice) {
      // bật cờ sử dụng animate transition 
      this.animated = true;
      // bật cờ trạng thái Lỗi
      this.isError = true;
      if (showNotice) {
        this.addNoticeError();
      }
    },
    /**
     * Phương thức Xử lý khi input validate true
     * @author pthieu (22-07-2021)
     */
    removeInputError: function () {
      // tắt cờ animate transition
      // để ẩn notice ngay lập tức
      this.animated = false;
      // ẩn notice
      this.isShowNotice = false;
      // tắt cờ trạng thái Lỗi
      this.isError = false;
      this.errorMsg = null;
    },
    /**
     * Phương thức Kiểm tra phím vừa ấn có phải phím số hay không
     * @param {event} $event sự kiện kích hoạt
     * @returns {Boolean} true - là số | false - không phải số
     * @author pthieu (22-07-2021)
     */
    isNumber($event) {
      var charCode = $event.which ? $event.which : $event.keyCode;
      // kiểm tra charCode xem có phải phím số hay không
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        $event.preventDefault();
        return false;
      }
      return true;
    },
    
    /**
     * Phương thức thực hiện focus vào ô input
     * @author pthieu (23-07-2021)
     */
    focusInput: function() {
      this.$refs.input.focus();
    },

    /**
     * Phương thức thực hiện focus vào ô input 
     * và select toàn bộ dữ liệu bên trong
     * @author pthieu (23-07-2021)
     */
    focusAndSelectInput: function() {
      this.$refs.input.focus();
      this.$refs.input.select();
    }
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