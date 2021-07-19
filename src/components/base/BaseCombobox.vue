<template>
  <div class="m-combobox" :class="{open: isOpen}" :id="id" >
    <input type="hidden" :fieldName="inputFieldName" v-model="cbxValue">
    <input
      class="m-combobox__input"
      type="text"
      v-model="text"
      :placeholder="placeholder"
       @focus="openDropdown"
    />
    <div class="m-combobox__btn" tabindex="-1" @click="toggleDropdown">
      <i class="fas fa-chevron-down"></i>
    </div>
    <ul class="m-combobox__dropdown" style="overflow: auto">
      <li 
        class="m-combobox__dropdown__item" 
        v-for="(item, index) in defaultItems" 
        :key="-index"
        @click="selectDropdownItem(item, -1)"
      ><i class="fas fa-check"></i>{{ item }}</li>
      <li 
        class="m-combobox__dropdown__item" 
        v-for="item in comboboxItems" 
        :key="item[dataId]"
        @click="selectDropdownItem(item[dataName], item[dataId])"
      ><i class="fas fa-check"></i>{{ item[dataName] }}</li>
    </ul>
  </div>
</template>

<style>
@import "../../css/common/combobox.css";
</style>

<script>
import axios from 'axios';
export default {
  props: {
    id: String,
    dataName: String,
    dataId: String,
    api: String,
    placeholder: String,
    defaultItems: Array,
    fixedData: Array,
    inputFieldName: String,
    value: {
      type: [Number, String]
    },
  },
  data() {
    return {
      comboboxItems: [],
      isOpen: false,
      cbxValue: this.value,
      text: null,
    }
  },
  created() {
    let me = this;
    me.loadComboboxData().then(function() {
      me.setTextByValue();
    });
  },
  watch: {
    cbxValue: function() {
      this.$emit("input", this.cbxValue);
    }
  },
  methods: {
    loadComboboxData: function() {
      return axios.get(this.api)
      .then((res) => { this.comboboxItems =  res.data;})
      .catch(() => {this.comboboxItems = this.fixedData});
    },
    toggleDropdown: function() {
      this.isOpen = ! this.isOpen;
    },
    closeDropdown: function() {
      this.isOpen = false;
    },
    openDropdown: function() {
      this.isOpen = true;
    },
    selectDropdownItem: function(text, value) {
      this.text = text;
      this.cbxValue = value;
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
    }
  },

};
</script>