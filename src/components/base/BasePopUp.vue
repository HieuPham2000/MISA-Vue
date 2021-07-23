<template>
<transition name="fade">
  <div id="popup-container" v-show="isShow">
    <div class="popup">
      <!-- Btn X close pop up -->
      <div class="popup-icon-close" @click="closePopUp">
        <img src="../../assets/icon/x.svg" />
      </div>

      <!-- Pop up title -->
      <div class="popup-title">{{ title }}</div>

      <!-- Nội dung pop up -->
      <div class="popup-content">
        <!-- Icon -->
        <div v-if="type == POPUP_TYPE.DANGER" class="popup-icon">
          <img src="../../assets/icon/alarm.png" />
        </div>
        <div v-else-if="type == POPUP_TYPE.WARNING" class="popup-icon">
          <img src="../../assets/icon/warning.png" />
        </div>

        <!-- Text -->
        <div class="popup-text" :inner-html.prop="content | decoContent"></div>
      </div>
      <div class="popup-footer">
        <!-- Nút hủy bỏ pop up (quay lại/giữ nguyên trạng thái trước đó) -->
        <button
          v-if="btnCancel"
          type="button"
          tabindex="0"
          class="m-btn-default m-btn-cancel"
          @click="closePopUp"
          ref="btnFocus"
        >
          {{ btnCancel }}
        </button>

         <!-- Nút thực hiện action (important action - dùng với popup danger) -->
        <button
          v-if="btnDanger"
          type="button"
          tabindex="0"
          class="m-btn-default m-btn-danger"
          @click="doAction"
        >
          {{ btnDanger }}
        </button>

         <!-- Nút thực hiện action -->
        <button
          v-if="btnDo"
          type="button"
          tabindex="0"
          class="m-btn-default m-btn-do"
          @click="doAction"
        >
          {{ btnDo }}
        </button>
      </div>
    </div>
  </div>
</transition>
</template>

<style>
@import "../../css/common/pop-up.css";
.fade-enter-active, .face-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .face-leave-to {
  opacity: 0;
}

</style>

<script>
import eventBus from "../../event-bus";
import { POPUP_TYPE } from "../../type";
import {CommonFunction} from '../../script/common/common'
export default {
  created() {
    // Lắng nghe sự kiện mở pop up
    eventBus.$on("openPopUp", this.openPopUp);
  },
  destroyed() {
    // Hủy bỏ
    eventBus.$off("openPopUp", this.openPopUp);
  },
  data() {
    return {
      isShow: false, // cờ trạng thái hiển thị của pop up
      POPUP_TYPE: POPUP_TYPE, // constant tất cả các kiểu pop up
      type: null, // Kiểu pop up
      title: "", 
      content: "",
      btnCancel: null, // tên btn cancel
      btnDo: null,
      btnDanger: null,
      actionDo: null // tên sự kiện kích hoạt action
    };
  },
  filters: {
    // In đậm đoạn văn bản nằm giữa dấu ""
    decoContent: function(content) {
      return CommonFunction.decoString(content);
    }
  },
  methods: {
    /**
     * Thiết lập dữ liệu và mở(hiển thị) pop up
     * @param {Object} propsData object dữ liệu pop up
     * @author pthieu (21-07-2021)
     */
    openPopUp: function (propsData) {
      this.type = propsData.type;
      this.title = propsData.title;
      this.content = propsData.content;
      this.btnCancel = propsData.btnCancel;
      this.btnDo = propsData.btnDo;
      this.btnDanger = propsData.btnDanger;
      this.actionDo = propsData.actionDo;

      this.isShow = true;
      this.$nextTick(() => this.$refs.btnFocus.focus());
    },

    /**
     * Đóng(Ẩn) pop up
     * @author pthieu (21-07-2021)
     */
    closePopUp: function () {
      this.isShow = false;
    },

    /**
     * Kích hoạt sự kiện thực hiện action
     * @author pthieu (21-07-2021)
     */
    doAction: function () {
      eventBus.$emit(this.actionDo);
      this.closePopUp();
    },
  },
};
</script>