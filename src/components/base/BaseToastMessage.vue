<template>
  <div :class="['toast-msg', classType]" v-show="isShow">
      <div class="toast-msg-icon">
        <i v-if="type == TOAST_TYPE.DANGER" class="fas fa-exclamation-triangle"></i>
        <i v-else-if="type == TOAST_TYPE.WARNING" class="fas fa-exclamation-circle"></i>
        <i v-else-if="type == TOAST_TYPE.SUCCESS" class="fas fa-check"></i>
        <i v-else-if="type == TOAST_TYPE.INFO" class="fas fa-info"></i>
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
import {TOAST_TYPE} from '../../type'
export default {
  props: {
    message: String,
    type: String,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      TOAST_TYPE
    }
  },
  computed: {
    classType: function() {
      return `toast-msg-${this.type}`
    }
  },
  methods: {
    removeToast: function() {
      this.isShow = false;
    }
  }
}
</script>