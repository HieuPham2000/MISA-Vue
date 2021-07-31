<template>
  <div
    class="m-combobox"
    :class="{ open: isOpen, 'border-red': isError }"
    :id="id"
    @keydown="moveAway($event)"
  >
    <!-- <input type="hidden" :fieldName="inputFieldName" v-model="value" /> -->
    <!-- combobox input 
      - Đóng/Mở dropdown
      - Điều khiển chọn option bằng bàn phím
      - Validate...
    -->
    <BaseTextInput
      ref="m-combobox__input"
      class="m-combobox__input"
      v-model="text"
      :placeholder="placeholder"
      :isComboboxInput="true"
      :comboboxInputItems="comboboxInputItems"
      @focus="openDropdown(true)"
      @input="openDropdown"
      @keydown="pressKeyInCombobox($event)"
      @setError="isError = $event"
    />
    <!-- combobox button
      - Đóng/mở dropdown
      - Điều khiển dropdown bằng bàn phím
     -->
    <div
      class="m-combobox__btn"
      tabindex="-1"
      @click="toggleDropdown"
      @keydown="pressKeyInCombobox($event)"
    >
      <i class="fas fa-chevron-down"></i>
    </div>
    <!-- Combobox dropdown
      - class "up" => dropdown hiển thị ngược lên trên
      - Chứa các dropdown items
     -->
    <ul :class="['m-combobox__dropdown', { up: showAbove }]">
      <!-- Dropdown items
        - Trạng thái active: khi hover/khi di chuyển đến (bằng bàn phím)
        - Trạng thái selected: khi click/chọn bằng cách nhấn enter khi item đang active
       -->
      <li
        v-for="(item, index) in dropdownItems"
        :class="[
          'm-combobox__dropdown__item',
          { active: currentItem == index, selected: item[dataName] == text },
        ]"
        :key="index"
        @click="selectDropdownItem(item[dataName], item[dataId])"
      >
        <i class="fas fa-check"></i>{{ item[dataName] }}
      </li>
    </ul>
  </div>
</template>

<style>
@import "../../css/common/combobox.css";
</style>

<script>
import axios from "axios";
import { CommonFunction } from "../../script/common/common";
import BaseTextInput from "./BaseTextInput.vue";
export default {
  components: { BaseTextInput },
  props: {
    id: String,
    dataName: String, // tên trường text, vd: PositionName
    dataId: String, // tên trường id, vd: PositionId
    api: String, // api dùng để load dữ liệu
    showAbove: Boolean, // cờ, xác định dropdown hiện thị bình thường hay ngược lên trên
    placeholder: String,
    extraItems: { // mảng các dropdown items mặc định
      type: Array,
      default: function () {
        return [];
      },
    },
    fixedData: { // mảng data (fixed), trong trường hợp không có api
      type: Array,
      default: function () {
        return [];
      },
    },
    value: { // giá trị v-model
      type: [Number, String],
    },
  },
  data() {
    return {
      comboboxItems: [], // dữ liệu dropdown items
      isOpen: false, // cờ trạng thái đóng/mở dropdown (set class "open" cho "m-combobox")
      showItems: [], // các items khớp với input
      text: null, // giá trị dữ liệu input
      currentItem: 0, // chỉ số của dropdown item đang active hiện tại
      isError: false, // cờ báo lỗi validate
      dropdownItems: [] // các item xuất hiện trong dropdown
    };
  },
  created() {
    let me = this;

    // Load dữ liệu (từ api hoặc fixed data)
    me.loadComboboxData().then(function () {
      // khởi tạo, tất cả các item đều được show
      me.showItems = me.comboboxItems;
      // lấy text từ giá trị value ban đầu truyền vào
      me.setTextByValue();
    });
  },
  computed: {
    // Mảng chứa các dropdown item text, dùng để truyền vào input => validate
    comboboxInputItems: function() {
      // console.log("comboboxItems: ");
      // console.log(this.comboboxItems);
      return this.comboboxItems.map(i => i[this.dataName]);
    }
  },
  watch: {
    // Mỗi khi text (giá trị input) thay đổi
    // Tính lại xem các item nào được show (các item không khớp text sẽ bị ẩn đi)
    text: function (newText) {
      var len = this.text.length;
      // Loại bỏ dấu Tiếng Việt
      var textNonAccent = CommonFunction.nonAccentVietnamese(this.text);
      // filter trên mảng chứa tất cả items (comboboxItems)
      this.showItems = this.comboboxItems.filter((item) => {
        var itemTextSliceNonAccent = CommonFunction.nonAccentVietnamese(
          item[this.dataName].slice(0, len)
        );
        return textNonAccent == itemTextSliceNonAccent;
      });

      // test
      this.dropdownItems = this.showItems;

      // this.changeValue(this.getValueByText());
      // Nếu text rống => value gán bằng null
      if(newText == "") {
        this.changeValue(null);
      }
    },
  },
  // Xử lý sự kiện click ra ngoài combobox => đóng dropdown
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    /**
     * Xử lý khi click ra ngoài combobox
     * @param {event} event sự kiện click
     */
    handleClickOutside: function(event) {
      if (!this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    },
    
    /**
     * Xử lý sự kiện tab/shift tab khỏi combobox => ẩn dropdown
     * @param {event} $event sự kiện
     * @author pthieu (21-07-2021)
     */
    moveAway: function($event) {
      // key code của phím tab
      if ($event.keyCode == 9) {
        this.closeDropdown();
      }
    },

    /**
     * Load dữ liệu combobox (từ api hoặc từ fixed data)
     * @returns {Promise} promise
     * @author pthieu (20-07-2021)
     */
    loadComboboxData: function () {
      return axios
        .get(this.api)
        .then((res) => {
          this.comboboxItems = [...this.extraItems, ...res.data];
        })
        .catch(() => {
          this.comboboxItems = this.fixedData;
        });
    },

    /**
     * Chuyển trạng thái đóng/mở của dropdown
     * @author pthieu (20-07-2021)
     */
    toggleDropdown: function () {
      if (this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown(true);
      }
      // this.isOpen = ! this.isOpen;
    },

    /**
     * Đóng dropdown
     * @author pthieu (20-07-2021)
     */
    closeDropdown: function () {
      this.isOpen = false;
    },

    /**
     * Mở dropdown
     * @param {boolean} showAll cờ chỉ định hiển thị tất cả items, 
     * hay chỉ hiển thị các items khớp với input
     * @author pthieu (20-07-2021)
     */
    openDropdown: function(showAll = false) {
      if(showAll) {
        this.dropdownItems = this.comboboxItems;
      } else {
        this.dropdownItems = this.showItems;
      }
      this.currentItem = 0;
      this.isOpen = true;
    },

    /**
     * Thay đổi giá trị của value (tham số v-model)
     * @param {*} value giá trị mới của value
     * @author pthieu (20-07-2021)
     */
    changeValue(value) {
      this.$emit("input", value);
    },

    /**
     * validate giá trị input
     * @author pthieu (22-07-2021)
     */
    validateInput() {
      return this.$refs["m-combobox__input"].validateInput();
    },

    /**
     * Focus (test)
     * @author pthieu (23-07-2021)
     */
    focusInput: function() {
      this.$refs["m-combobox__input"].focusInput();
    },

    /**
     * Chọn item trong dropdown (click, press enter)
     * @param {String} text giá trị text
     * @param {*} value giá trị value (id)
     * @author pthieu (20-07-2021)
     */
    selectDropdownItem: function (text, value) {
      this.text = text;
      this.changeValue(value);
      this.closeDropdown();
    },

    /**
     * Set giá trị text khi biết giá trị value
     * @author pthieu (21-07-2021)
     */
    setTextByValue() {
      var dataId = this.dataId;
      var value = this.value;
      // tìm item có item[dataId] bằng với value
      var item = this.comboboxItems.find((item) => item[dataId] == value);
      if (item) {
        this.text =  item[this.dataName];
      }
      // return null;
    },

    /**
     * Lấy giá trị value khi biết giá trị text
     * @author pthieu (21-07-2021)
     */
    getValueByText() {
      var dataName = this.dataName;
      var text = this.text;
      // tìm item có item[dataName] bằng với text
      var item = this.comboboxItems.find((item) => item[dataName] == text);
      if (item) {
        return item[this.dataId];
      }
      return null;
    },

    /**
     * Xử lý các sự kiện nhấn bàn phím
     * @param {event} $event sự kiện
     * @author pthieu (21-07-2021)
     */
    pressKeyInCombobox($event) {
      // Khi dropdown đóng => Nhấn Enter hoặc Alt + Arrow Down để mở
      if (
        !this.isOpen &&
        ($event.key == "Enter" || ($event.altKey && $event.keyCode == 40))
      ) {
        this.openDropdown(true);
      } else if ($event.altKey && $event.keyCode == 38) { // Alt + Arrow Up để đóng dropdown
        this.closeDropdown();
      } else if ($event.keyCode == 40) { // Arrow Down để di chuyển xuống item bên dưới
        this.currentItem++;
        if (this.currentItem >= this.dropdownItems.length) {
          this.currentItem = 0;
        }
      } else if ($event.keyCode == 38) { // Arrow Up để di chuyển lên item bên trên
        this.currentItem--;
        if (this.currentItem < 0) {
          this.currentItem = this.dropdownItems.length - 1;
        }
      } else if ($event.key == "Enter") { // Enter để chọn item hiện tại (đang active)
        var item = this.dropdownItems[this.currentItem];
        this.selectDropdownItem(item[this.dataName], item[this.dataId]);
      }
    },
  },
};
</script>