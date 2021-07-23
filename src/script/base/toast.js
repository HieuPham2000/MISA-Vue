import Vue from 'vue'
 
import BaseToastMessage from '../../components/base/BaseToastMessage.vue'
 

const ToastConstructor = Vue.extend(BaseToastMessage);
 
/**
 * Thêm toast message mới
 * @param {String} type Loại toast
 * @param {String} message Nội dung toast
 * @param {Number} duration Thời gian hiện trước khi biến mất
 * @author pthieu (23-07-2021)
 */
function showToast(type, message, duration = 2500) {
  
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    propsData: {
        type: type,
        message: message,
      }
  })

  const toastContainer = document.querySelector("#toast-msg-container");
  toastContainer.appendChild(toastDom.$el);

  setTimeout(() => {toastContainer.removeChild(toastDom.$el)}, duration)
}

/**
 * Đăng ký $toast
 */
function registryToast() {
  Vue.prototype.$toast = showToast
}
export default registryToast