<template>
  <div class="page" :class="{expand: expand}">
    Cài đặt
  </div>
</template>

<script>
export default {
  props: {
    expand: Boolean
  }
}
</script>
<style scoped>
@import '../css/layout/page.css';
</style>