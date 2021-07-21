<template>
<transition name="slide">
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
</transition>
</template>

<style>
  @import '../../css/common/toast-messenger.css';
  /* .slide-enter-active, .slide-leave-active {
transition: margin-bottom .8s ease-out;
}

.slide-enter, .slide-leave-to {
margin-bottom: -200px;
}

.slide-enter-to, .slide-leave {
margin-bottom: 0px;
} */
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