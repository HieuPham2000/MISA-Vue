<template>
  <div
    class="m-combobox"
    :class="{ open: isOpen, 'border-red': isError }"
    :id="id"
    @keydown="moveAway($event)"
  >
    <!-- 
      combobox input 
      - Hiển thị giá trị text (và cho phép nhập như ô input bình thường)
      - Khi focus có thể dùng bàn phím để điều khiển: đóng/mở dropdown, di chuyển lên/xuống chọn option
      - Validate khi nhập text không khớp với các option
    -->
    <BaseTextInput
      ref="m-combobox__input"
      class="m-combobox__input"
      v-model="text"
      :placeholder="placeholder"
      :isComboboxInput="true"
      :comboboxInputItems="comboboxInputItems"
      :isDisabled="isDisabled"
      @focus="openDropdown(true)"
      @input="openDropdown"
      @keydown="pressKeyInCombobox($event)"
      @setError="isError = $event"
    />

    <!-- 
      combobox button
      - Điều khiển đóng/mở dropdown
      - Khi focus, có thể điều khiển di chuyển lên/xuống chọn option
     -->
    <button
      type="button"
      class="m-combobox__btn"
      tabindex="-1"
      :disabled="isDisabled"
      @click="toggleDropdown"
      @keydown="pressKeyInCombobox($event)"
    >
      <i class="fas fa-chevron-down"></i>
    </button>

    <!-- 
      Combobox dropdown chứa các options
     -->
    <ul :class="['m-combobox__dropdown', { up: showAbove }]">
      <!-- Dropdown items/options
        - Trạng thái active: khi hover bằng chuột, hoặc khi di chuyển đến bằng bàn phím
        - Trạng thái selected: khi click chuột chọn, hoặc chọn bằng bàn phím
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
import { CommonFunction } from "../../script/common/common";
import BaseTextInput from "./BaseTextInput.vue";
export default {
  components: { BaseTextInput },
  props: {
    id: String, // id gán cho component
    dataName: String, // tên trường text, vd: PositionName
    dataId: String, // tên trường id, vd: PositionId
    comboboxData: Array, // dữ liệu combobox (các options)
    showAbove: Boolean, // cờ xác định dropdown hiển thị xuống dưới hay lên trên (true)
    placeholder: String, // placeholder gán cho compobox input
    extraItems: { // các options đặc biệt không có trong comboboxData (VD: option "Tất cả...")
      type: Array,
      default: () => []
    },
    value: { // giá trị v-model gán cho combobox
      type: [Number, String],
    },
    isDisabled: { // cờ set disable các thẻ input, button (khi trang web loading)
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      comboboxItems: [], // tất cả các options
      showItems: [], // các options khớp với input
      dropdownItems: [], // các options xuất hiện trong dropdown
      isOpen: false, // cờ trạng thái đóng/mở dropdown (set class "open" cho "m-combobox")
      currentItem: 0, // chỉ số của dropdown item đang active hiện tại
      isError: false, // cờ báo lỗi validate
      text: null, // giá trị dữ liệu input
    };
  },
  created() {
    // Load dữ liệu cho combobox (load các options)
    this.loadComboboxData();
  },
  computed: {
    /**
     * Mảng chứa các giá trị text của options
     * dùng để truyền vào combobox-input
     * phục vụ việc validate (kiểm tra text nhập vào có khớp với option của combobox hay không)
     */
    comboboxInputItems: function() {
      return this.comboboxItems.map(i => i[this.dataName]);
    }
  },
  watch: {
    /**
     * Theo dõi giá trị của prop comboboxData.
     * Khi giá trị thay đổi sẽ gọi hàm load options cho combobox.
     * Lý do: comboboxData là dữ liệu lấy từ api (bất đồng bộ).
     * Nên sẽ xảy ra việc parent truyền prop comboboxData trước khi dữ liệu lấy về hoàn tất.
     * Vì vậy cần watch để load lại options.
     */
    comboboxData: function() {
      this.loadComboboxData();
    },

    /**
     * Theo dõi giá trị của biến data: text.
     * Tính lại xem các options khớp với text input.
     * Các options không khớp text input sẽ bị ẩn đi.
     */
    text: function (newText) {
      if(newText == "" || newText == undefined || newText == null) {
        this.dropdownItems = this.comboboxItems;
        this.changeValue(null);
        return;
      }
      var len = newText.length;

      // Loại bỏ dấu Tiếng Việt
      var textNonAccent = CommonFunction.nonAccentVietnamese(newText);

      // filter trên mảng chứa tất cả options (comboboxItems)
      // showItems là mảng chứa các option khớp với input
      this.showItems = this.comboboxItems.filter((item) => {

        // Cắt giá trị text của option theo độ dài text của combobox-input
        // Và loại bỏ dấu Tiếng Việt
        var itemTextSliceNonAccent = CommonFunction.nonAccentVietnamese(
          item[this.dataName].slice(0, len)
        );

        // Kiểm tra xem có khớp nhau không
        return textNonAccent == itemTextSliceNonAccent;
      });

      // gán lại mảng các options xuất hiện trong dropdown
      // các options xuất hiện chính là các options khớp với text input
      this.dropdownItems = this.showItems;

      // this.changeValue(this.getValueByText());

      // Nếu text rỗng => value của combobox bằng null
      // if(newText == "") {
      //   this.changeValue(null);
      // }
    },
  },
  
  mounted() {
    // Xử lý sự kiện click ra ngoài combobox => đóng dropdown
    document.addEventListener("click", this.handleClickOutside);
  },

  destroyed() {
    // Bỏ lắng nghe sự kiện
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    /**
     * Phương thức xử lý đóng combobox khi click ra ngoài
     * @param {event} event sự kiện click
     * @author pthieu (21-07-2021) 
     */
    handleClickOutside: function(event) {
      // kiểm tra element mục tiêu có thuộc combobox hay không
      // Nếu không thuộc => đóng combobox
      if (!this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    },
    
    /**
     * Phương thức xử lý sự kiện tab/shift + tab khỏi combobox
     * => Đóng combobox
     * @param {event} $event sự kiện nhấn phím
     * @author pthieu (21-07-2021)
     */
    moveAway: function($event) {
      // key code của phím tab
      if ($event.keyCode == 9) {
        this.closeDropdown();
      }
    },

    /**
     * Phương thức load các options cho combobox
     * @author pthieu (20-07-2021)
     */
    loadComboboxData: function () {
      
      // comboboxItems chứa tất cả các options
      // bao gồm: dữ liệu từ prop comboboxData
      // và các options khác (từ prop extraItems)
      this.comboboxItems = [...this.extraItems, ...this.comboboxData];

      // this.showItems = this.comboboxItems;

      // Khởi tạo các options hiển thị trong dropdown
      this.dropdownItems = this.comboboxItems;

      // Dựa vào value => gán text tương ứng
      this.setTextByValue();
    },

    /**
     * Phương thức chuyển trạng thái đóng/mở của dropdown
     * @author pthieu (20-07-2021)
     */
    toggleDropdown: function () {

      // kiểm tra trạng thái mở của dropdown
      if (this.isOpen) {
        // nếu đang mở => đóng dropdown
        this.closeDropdown();
      } else {
        // nếu đang đóng => mở dropdown
        // truyền true => hiển thị toàn bộ options (kể cả không khớp text input hiện tại)
        this.openDropdown(true);
      }
    },

    /**
     * Phương thức đóng dropdown
     * @author pthieu (20-07-2021)
     */
    closeDropdown: function() {
      this.isOpen = false;
    },

    /**
     * Phương thức mở dropdown
     * @param {boolean} showAll cờ: 
     * true - hiển thị tất cả options, 
     * false (mặc định) - chỉ hiển thị các options khớp với input
     * @author pthieu (20-07-2021)
     */
    openDropdown: function(showAll = false) {

      // dựa trên cờ showAll 
      // để gán giá trị cho mảng options hiển thị trong dropdown
      if(showAll) {
        this.dropdownItems = this.comboboxItems;
      } else {
        this.dropdownItems = this.showItems;
      }

      // reset chỉ số currentItem
      this.currentItem = 0;

      // mở dropdown
      this.isOpen = true;
    },

    /**
     * Phương thức thay đổi giá trị của value (tham số v-model)
     * emit giá trị cho phía parent
     * @param {*} value giá trị mới của value
     * @author pthieu (20-07-2021)
     */
    changeValue: function(value) {
      this.$emit("input", value);
    },

    /**
     * Phương thức validate giá trị combobox input
     * @returns {Boolean} true - validate thành công, false - thất bại
     * @author pthieu (22-07-2021)
     */
    validateInput: function() {
      return this.$refs["m-combobox__input"].validateInput();
    },

    /**
     * Phương thức set trạng thái focus cho combobox-input
     * @author pthieu (23-07-2021)
     */
    focusInput: function() {
      this.$refs["m-combobox__input"].focusInput();
    },

    /**
     * Phương thức xử lý khi chọn option trong dropdown (click, press enter)
     * @param {String} newText giá trị text mới
     * @param {*} newValue giá trị value (id) mới
     * @author pthieu (20-07-2021)
     */
    selectDropdownItem: function (newText, newValue) {
      // thay đổi text
      this.text = newText;
      // thay đổi value
      this.changeValue(newValue);
      // đóng combobox
      this.closeDropdown();
    },

    /**
     * Phương thức set text khi biết giá trị value
     * @author pthieu (21-07-2021)
     */
    setTextByValue: function() {
      var dataId = this.dataId;
      var value = this.value;

      // tìm item có item[dataId] = value
      var item = this.comboboxItems.find((item) => item[dataId] == value);

      // nếu tìm được
      // gán text
      if (item) {
        this.text =  item[this.dataName];
      }
    },

    /**
     * Phương thức lấy giá trị value khi biết giá trị text
     * @author pthieu (21-07-2021)
     */
    getValueByText: function() {
      var dataName = this.dataName;
      var text = this.text;

      // tìm item có item[dataName] = text
      var item = this.comboboxItems.find((item) => item[dataName] == text);

      // nếu tìm thấy
      // trả về value tương ứng
      if (item) {
        return item[this.dataId];
      }

      // nếu không tìm thấy, trả về null
      return null;
    },

    /**
     * Phương thức xử lý các sự kiện nhấn bàn phím
     * @param {event} $event sự kiện
     * @author pthieu (21-07-2021)
     */
    pressKeyInCombobox: function($event) {
      // Khi dropdown đóng => Nhấn Enter hoặc Alt + Arrow Down để mở
      if ( !this.isOpen && ($event.key == "Enter" || ($event.altKey && $event.keyCode == 40))) {
        // Mở combobox
        // và hiển thị tất cả các options
        this.openDropdown(true);
      } 
      // Alt + Arrow Up để đóng dropdown
      else if ($event.altKey && $event.keyCode == 38) { 

        this.closeDropdown();
      } 
      // Arrow Down để di chuyển xuống item bên dưới
      else if ($event.keyCode == 40) {

        this.currentItem++;
        if (this.currentItem >= this.dropdownItems.length) {
          this.currentItem = 0;
        }

      }
      // Arrow Up để di chuyển lên item bên trên
      else if ($event.keyCode == 38) { 

        this.currentItem--;
        if (this.currentItem < 0) {
          this.currentItem = this.dropdownItems.length - 1;
        }

      } 
      // Enter để chọn item hiện tại (đang active)
      else if ($event.key == "Enter") { 

        // lấy ra option tương ứng với chỉ số currentItem hiện tại
        var item = this.dropdownItems[this.currentItem];

        // xử lý việc chọn option
        this.selectDropdownItem(item[this.dataName], item[this.dataId]);
        
      }
    },
  },
};
</script>