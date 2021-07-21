import Vue from 'vue'
 
import BaseToastMessage from '../../components/base/BaseToastMessage.vue'
 

const ToastConstructor = Vue.extend(BaseToastMessage);
 
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

function registryToast() {
  Vue.prototype.$toast = showToast
}
export default registryToast