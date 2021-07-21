<template>
  <div class="input-wrapper">
    <input type="text" :placeholder="placeholder">
    <div class="btn-clear-text">
        <img src="@/assets/icon/x.svg" >
    </div> 
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    maxlength: String
  }
}
</script>

<style>
@import '../../css/common/input.css';
</style>