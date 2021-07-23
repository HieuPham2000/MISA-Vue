<template>
  <div
    :class="['m-selectbox', ...extraClass, { open: isOpen }]"
    @keydown="moveAway($event)"
  >
  <div class="m-selectbox__main" tabindex="-1" @click="toggleDropdown"
      @keydown="pressKeyInSelectBox($event)">
    <div
      class="m-selectbox__content"
      tabindex="-1"
    >
      {{ text }}
    </div>
    <div
      class="m-selectbox__btn"
      tabindex="-1"
    >
      <slot name="m-selectbox-icon"></slot>
    </div>
  </div>
    <ul :class="['m-selectbox__dropdown', { up: showAbove }]">
      <li
        v-for="(item, index) in selectItems"
        :class="[
          'm-selectbox__dropdown__item',
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
@import "../../css/common/selectbox.css";
</style>

<script>
export default {
  props: {
    extraClass: Array,
    dataName: {
      type: String,
      default: "text",
    },
    dataId: {
      type: String,
      default: "id",
    },
    showAbove: {
      type: Boolean,
      default: false,
    },
    fixedData: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String],
    },
  },
  data() {
    return {
      selectItems: [],
      isOpen: false,
      text: null,
      currentItem: 0,
    };
  },
  created() {
    this.loadSelectBoxData();
    this.text = this.selectItems.find(i => i[this.dataId] == this.value)[this.dataName];
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    handleClickOutside: function(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    moveAway: function($event) {
      if ($event.keyCode == 9) {
        this.closeDropdown();
      }
    },
    loadSelectBoxData: function () {
      this.selectItems = this.fixedData;
    },
    toggleDropdown: function () {
      if(this.isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
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
    selectDropdownItem: function (text, value) {
      this.text = text;
      this.changeValue(value);
      this.closeDropdown();
    },
    pressKeyInSelectBox($event) {
      if (
        !this.isOpen &&
        ($event.key == "Enter" || ($event.altKey && $event.keyCode == 40))
      ) {
        this.openDropdown();
      } else if ($event.altKey && $event.keyCode == 38) {
        this.closeDropdown();
      } else if ($event.keyCode == 40) {
        this.currentItem++;
        if (this.currentItem >= this.selectItems.length) {
          this.currentItem = 0;
        }
      } else if ($event.keyCode == 38) {
        this.currentItem--;
        if (this.currentItem < 0) {
          this.currentItem = this.selectItems.length - 1;
        }
      } else if ($event.key == "Enter") {
        var item = this.selectItems[this.currentItem];
        this.selectDropdownItem(item[this.dataName], item[this.dataId]);
      }
    },
  },
};
</script>