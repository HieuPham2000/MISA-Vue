<template>
  <div
    class="m-combobox"
    :class="{ open: isOpen, 'border-red': isError }"
    :id="id"
    @keydown="moveAway($event)"
  >
    <!-- <input type="hidden" :fieldName="inputFieldName" v-model="value" /> -->
    <BaseTextInput
      ref="m-combobox__input"
      class="m-combobox__input"
      v-model="text"
      :placeholder="placeholder"
      :isComboboxInput="true"
      :comboboxInputItems="comboboxInputItems"
      @focus="openDropdown"
      @input="openDropdown"
      @keydown="pressKeyInCombobox($event)"
      @setError="isError = $event"
    />
    <div
      class="m-combobox__btn"
      tabindex="-1"
      @click="toggleDropdown"
      @keydown="pressKeyInCombobox($event)"
    >
      <i class="fas fa-chevron-down"></i>
    </div>
    <ul :class="['m-combobox__dropdown', { up: showAbove }]">
      <li
        v-for="(item, index) in showItems"
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
    dataName: String,
    dataId: String,
    api: String,
    showAbove: Boolean,
    placeholder: String,
    extraItems: {
      type: Array,
      default: function () {
        return [];
      },
    },
    fixedData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    inputFieldName: String,
    value: {
      type: [Number, String],
    },
  },
  data() {
    return {
      comboboxItems: [],
      isOpen: false,
      showItems: [],
      text: null,
      currentItem: 0,
      isError: false
    };
  },
  created() {
    let me = this;
    me.loadComboboxData().then(function () {
      me.showItems = me.comboboxItems;
      me.setTextByValue();
    });
  },
  computed: {
    comboboxInputItems: function() {
      return this.comboboxItems.map(i => i[this.dataName]);
    }
  },
  watch: {
    text: function (newText) {
      var len = this.text.length;
      var textNonAccent = CommonFunction.nonAccentVietnamese(this.text);
      this.showItems = this.comboboxItems.filter((item) => {
        var itemTextSliceNonAccent = CommonFunction.nonAccentVietnamese(
          item[this.dataName].slice(0, len)
        );
        return textNonAccent == itemTextSliceNonAccent;
      });

      // this.changeValue(this.getValueByText());
      if(newText == "") {
        this.changeValue(null);
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    moveAway($event) {
      if ($event.keyCode == 9) {
        this.closeDropdown();
      }
    },
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
    toggleDropdown: function () {
      if (this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
      // this.isOpen = ! this.isOpen;
    },
    closeDropdown: function () {
      this.isOpen = false;
    },
    openDropdown: function () {
      this.currentItem = 0;
      this.isOpen = true;
    },
    changeValue(value) {
      this.$emit("input", value);
    },
    validateInput() {
      return this.$refs["m-combobox__input"].validateInput();
    },
    selectDropdownItem: function (text, value) {
      this.text = text;
      this.changeValue(value);
      this.closeDropdown();
    },
    setTextByValue() {
      var dataId = this.dataId;
      var value = this.value;
      var item = this.comboboxItems.find((item) => item[dataId] == value);
      if (item) {
        this.text =  item[this.dataName];
      }
      // return null;
    },
    getValueByText() {
      var dataName = this.dataName;
      var text = this.text;
      var item = this.comboboxItems.find((item) => item[dataName] == text);
      if (item) {
        return item[this.dataId];
      }
      return null;
    },
    pressKeyInCombobox($event) {
      if (
        !this.isOpen &&
        ($event.key == "Enter" || ($event.altKey && $event.keyCode == 40))
      ) {
        this.openDropdown();
      } else if ($event.altKey && $event.keyCode == 38) {
        this.closeDropdown();
      } else if ($event.keyCode == 40) {
        this.currentItem++;
        if (this.currentItem >= this.showItems.length) {
          this.currentItem = 0;
        }
      } else if ($event.keyCode == 38) {
        this.currentItem--;
        if (this.currentItem < 0) {
          this.currentItem = this.showItems.length - 1;
        }
      } else if ($event.key == "Enter") {
        var item = this.showItems[this.currentItem];
        this.selectDropdownItem(item[this.dataName], item[this.dataId]);
      }
    },
  },
};
</script>