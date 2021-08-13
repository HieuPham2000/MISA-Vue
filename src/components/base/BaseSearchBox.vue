<template>
  <div class="input-wrapper">
    <input
      class="icon-search input-search"
      type="text"
      ref="input"
      v-model="searchValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :maxlength="maxlength"
      @change="changeInputValue(searchValue)"
      @keydown="pressKeyInInput($event)"
    />
    <div class="btn-clear-text" @click="clearText" v-show="isShowBtnClearText" tabindex="-1">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Tìm kiếm theo Mã, Tên hoặc Số điện thoại",
    },
    maxlength: String,
    // giá trị v-model ở phía parent
    value: String,
    // trạng thái disabled (khi trang loading)
    isDisabled: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      // giá trị v-model trong component
      searchValue: this.value
    }
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của prop value (giá trị v-model phía parent)
     * Và gán lại chô biến data searchValue (giá trị v-model trong component)
     * Mục đích là để 2 biến này luôn map với nhau
     */
    value: function() {
      this.searchValue = this.value;
    }
  },
  computed: {
    /**
     * Cờ xác định trạng thái ẩn/hiện của btn clear text
     * true - hiện, false - ẩn
     * @author pthieu (22-07-2021)
     */
    isShowBtnClearText: function () {
      if (this.searchValue == undefined || this.searchValue == null || this.searchValue == "") {
        return false;
      }
      return true;
    },

  },
  methods: {
    /**
     * Phương thức thay đổi value (giá trị v-modelvở phía parent)
     * @param {string} newValue giá trị mới của input
     * @author pthieu (31-07-2021)
     */
    changeInputValue: function (newValue) {
      this.$emit("input", newValue);
    },
    /**
     * Phương thức Xóa text trong ô input
     * @author pthieu (31-07-2021)
     */
    clearText: function () {
      // this.searchValue = ""; // nếu dùng dòng này thì không cần watch
      this.changeInputValue("");
    },
    /**
     * Phương thức xử lý Sự kiện keydown
     * @param {event} $event sự kiện kích hoạt
     * @author pthieu (31-07-2021)
     */
    pressKeyInInput: function ($event) {
      if ($event.key == "Enter") {
        this.changeInputValue(this.searchValue);
      }
    },
  }
}
</script>

<style>
@import '../../css/common/input.css';
@import '../../css/layout/toolbar.css';
</style>