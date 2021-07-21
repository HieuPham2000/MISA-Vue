<template>
  <div class="page" :class="{expand: expand}">
    Danh sách khách hàng
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
@import '../../../css/layout/page.css';
</style>