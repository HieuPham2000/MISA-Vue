<template v-if="isShow">
  <div :class="['toast-msg', classType]">
      <div class="toast-msg-icon">
        <i v-if="type == TYPE.DANGER" class="fas fa-exclamation-triangle"></i>
        <i v-else-if="type == TYPE.WARNING" class="fas fa-exclamation-triangle"></i>
        <i v-else-if="type == TYPE.SUCCESS" class="fas fa-exclamation-triangle"></i>
        <i v-else-if="type == TYPE.INFO" class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="toast-msg-content">{{ message }}</div>
      <div class="toast-msg-close" @click="removeToast">
        <i class="fas fa-times"></i>
      </div>
  </div>
</template>

<style>
  @import '../../css/common/toast-messenger.css';
</style>

<script>
const TYPE = {
  DANGER: "danger",
  WARNING: "warning",
  SUCCESS: "success",
  INFO: "info"
}
export default {
  props: {
    message: String,
    type: String,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classType: function() {
      return `toast-msg-${this.type}`
    }
  },
  mounted() {
    let me = this;
    setTimeout(function() {
      me.isShow = false;
    }, 1500);
  },
  methods: {
    removeToast: function() {
      this.isShow = false;
    }
  }
}
</script>