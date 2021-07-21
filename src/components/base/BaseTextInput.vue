<template>
  <div class="input-wrapper">
    <input type="text" :placeholder="placeholder" :maxlength="maxlength">
    <div class="btn-clear-text" @click="clearText">
        <img src="@/assets/icon/x.svg" >
    </div> 
  </div>
</template>

<script>

export default {
  props: {
    placeholder: String,
    maxlength: String
  },
  methods: {

  }
}
</script>

<style>
@import '../../css/common/input.css';
</style>