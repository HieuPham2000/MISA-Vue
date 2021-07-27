<template>
  <transition name="fade">
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </transition>
</template>
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
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>