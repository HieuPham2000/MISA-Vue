<template>
  <div class="page" :class="{expand: expand}">
    Tổng quan
  </div>
</template>

<script>
export default {
  props: {
    // cờ trạng thái thu hẹp/mở rộng chiều rộng của page
    // true - mở rộng, fasle - thu hẹp
    expand: Boolean
  }
}
</script>
<style scoped>
@import '../../css/layout/page.css';
</style>