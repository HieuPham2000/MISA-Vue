<template>
  <div :class="['toast-msg', classType]" v-show="isShow">
      <!-- icon -->
      <div class="toast-msg-icon">
        <i v-if="type == TOAST_TYPE.DANGER" class="fas fa-exclamation-triangle"></i>
        <i v-else-if="type == TOAST_TYPE.WARNING" class="fas fa-exclamation-circle"></i>
        <i v-else-if="type == TOAST_TYPE.SUCCESS" class="fas fa-check"></i>
        <i v-else-if="type == TOAST_TYPE.INFO" class="fas fa-info"></i>
      </div>
      <!-- nội dung -->
      <div class="toast-msg-content">{{ message }}</div>
      <!-- nút đóng -->
      <div class="toast-msg-close" @click="removeToast">
        <i class="fas fa-times"></i>
      </div>
  </div>
</template>

<style>
  @import '../../css/common/toast-messenger.css';
</style>

<script>
import {TOAST_TYPE} from '../../script/common/type'
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
    /**
     * lấy ra giá trị class, dựa trên type truyền vào
     */
    classType: function() {
      return `toast-msg-${this.type}`
    }
  },
  methods: {
    /**
     * Phương thức ẩn toast msg
     */
    removeToast: function() {
      this.isShow = false;
    }
  }
}
</script>