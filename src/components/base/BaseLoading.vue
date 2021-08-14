<template>
  <transition name="fade">
    <div class="loader-container">
      <div class="loader"></div>
      <div class="loader-text">{{ text }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: "Đang tải dữ liệu"
    }
  }
}
</script>
<style scoped>
.fade-enter-active, .face-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .face-leave-to {
  opacity: 0;
}

.loader-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.loader {
  position: absolute;
  top: calc(50% - 24px);
  left: calc(50% - 24px);
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader-text {
  width: 100%;
  position: absolute;
  top: calc(50% + 30px) ;
  text-align: center;
}
.loader-text::after {
  font-size: 13px;
  letter-spacing: 1px;
  content: "";
  animation: load-text 1.2s linear infinite;
}

@keyframes load-text {
  0% {
    content: "\00a0\00a0\00a0";
  }
  33% {
    content: ".\00a0\00a0";
  }
  67% {
    content: "..\00a0"
  }
  100% {
    content: "..."
  }
}
</style>