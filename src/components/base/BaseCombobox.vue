<template>
  <div class="m-combobox" :class="{open: isOpen}" :id="id" @keydown="moveAway($event)">
    <input type="hidden" :fieldName="inputFieldName" v-model="value">
    <input
      class="m-combobox__input"
      type="text"
      v-model="text"
      :placeholder="placeholder"
      @focus="openDropdown"
      @input="openDropdown"
      @keydown="pressKeyInCombobox($event)"
    />
    <div class="m-combobox__btn" tabindex="-1" @click="toggleDropdown" @keydown="pressKeyInCombobox($event)">
      <i class="fas fa-chevron-down"></i>
    </div>
    <ul class="m-combobox__dropdown">
      <li 
        v-for="(item, index) in showItems" 
        :class="['m-combobox__dropdown__item', {active: currentItem == index, selected: item[dataName] == text}]" 
        :key="index"
        @click="selectDropdownItem(item[dataName], item[dataId])"
      ><i class="fas fa-check"></i>{{item[dataName]}}</li>
    </ul>
  </div>
</template>

<style>
@import "../../css/common/combobox.css";
</style>

<script>
import axios from 'axios';
import {CommonFunction} from '../../script/common/common';
export default {
  props: {
    id: String,
    dataName: String,
    dataId: String,
    api: String,
    placeholder: String,
    extraItems: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fixedData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    inputFieldName: String,
    value: {
      type: [Number, String]
    },
  },
  data() {
    return {
      comboboxItems: [],
      isOpen: false,
      showItems: [],
      text: null,
      currentItem: 0,
      flag: true
    }
  },
  created() {
    let me = this;
    me.loadComboboxData().then(function() {
      // test
      me.showItems = me.comboboxItems;

      me.setTextByValue(); 
    });
  },
  watch: {
    text: function() {
      var len = this.text.length;
      var textNonAccent = CommonFunction.nonAccentVietnamese(this.text);
      this.showItems = this.comboboxItems.filter((item) => {
        var itemTextSliceNonAccent = CommonFunction.nonAccentVietnamese(item[this.dataName].slice(0, len));
        return textNonAccent == itemTextSliceNonAccent;
      })
    }
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
    loadComboboxData: function() {
      return axios.get(this.api)
      .then((res) => { 
        this.comboboxItems =  [...this.extraItems, ...res.data];
      })
      .catch(() => {this.comboboxItems = this.fixedData});
    },
    toggleDropdown: function() {
      this.isOpen = ! this.isOpen;
    },
    closeDropdown: function() {
        this.isOpen = false;
    },
    openDropdown: function() {
      this.currentItem = 0;
      this.isOpen = true;
    },
    changeValue(value) {
      this.$emit("input", value);
    },
    selectDropdownItem: function(text, value) {
      this.text = text;
      this.changeValue(value);
      this.closeDropdown();
    },
    setTextByValue() {
      var len = this.comboboxItems.length;
      for(var i = 0; i < len; ++i) {
        var item = this.comboboxItems[i];
        
        if(item[this.dataId] == this.value) {
          this.text = item[this.dataName];
          break;
        }
      }
    },
    getValueByText() {
      var len = this.comboboxItems.length;
      for(var i = 0; i < len; ++i) {
        var item = this.comboboxItems[i];
        if(item[this.dataName] == this.text) {
          return item[this.dataId];
        }
      }

      return null;
    },
    pressKeyInCombobox($event) {
      if ( ! this.isOpen && ($event.key == "Enter" || ($event.altKey && $event.keyCode == 40)) ){
        this.openDropdown();
      } else if ($event.altKey && $event.keyCode == 38) {
        this.closeDropdown();
      } else if ($event.keyCode == 40) {
        this.currentItem ++;
        if(this.currentItem >= this.showItems.length) {
          this.currentItem = 0;
        }
      } else if ($event.keyCode == 38) {
        this.currentItem --;
        if(this.currentItem < 0) {
          this.currentItem = this.showItems.length - 1;
        }
      } else if ($event.key == "Enter") {
        var item = this.showItems[this.currentItem];
        this.selectDropdownItem(item[this.dataName], item[this.dataId]);
      }
    }
  },

};
</script>