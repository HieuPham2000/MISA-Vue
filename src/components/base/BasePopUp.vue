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

         <!-- Nút thực hiện action (dùng với popup danger) -->
        <button
          v-if="btnDanger"
          type="button"
          tabindex="0"
          class="m-btn-default m-btn-danger"
          @click="doAction"
          :ref="btnCancel ? 'btnDanger' : 'btnFocus'"
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
          :ref="btnCancel ? 'btnDo' : 'btnFocus'"
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
import eventBus from "../../script/common/event-bus";
import { POPUP_TYPE } from "../../script/common/type";
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
      isShow: false, // cờ trạng thái ẩn/hiện pop up
      POPUP_TYPE: POPUP_TYPE, // constant tất cả các kiểu pop up
      type: null, // Kiểu pop up
      title: "", 
      content: "",
      btnCancel: null, // tên btn cancel
      btnDo: null, // tên btn do
      btnDanger: null, // tên btn danger
      actionDo: null, // tên sự kiện kích hoạt action

      param: null,
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
     * Phương thức khởi tạo dữ liệu và hiển thị pop up
     * @param {Object} popupInfo dữ liệu pop up
     * @author pthieu (21-07-2021)
     */
    openPopUp: function (popupInfo, param) {

      // gán giá trị từ tham số đầu vào cho data của pop-up
      this.type = popupInfo.type;
      this.title = popupInfo.title;
      this.content = popupInfo.content;
      this.btnCancel = popupInfo.btnCancel;
      this.btnDo = popupInfo.btnDo;
      this.btnDanger = popupInfo.btnDanger;
      this.actionDo = popupInfo.actionDo;

      this.param = param;

      // hiển thị pop-up
      this.isShow = true;

      // focus vào button có ref là btnFocus
      this.$nextTick(() => this.$refs.btnFocus.focus());
    },

    /**
     * Phương thức đóng pop up
     * @author pthieu (21-07-2021)
     */
    closePopUp: function () {
      this.isShow = false;
    },

    /**
     * Phương thức kích hoạt sự kiện thực hiện action
     * @author pthieu (21-07-2021)
     */
    doAction: function () {
      // nếu có actionDo thì sẽ emit để thực hiện
      if(this.actionDo) {
        eventBus.$emit(this.actionDo, this.param);
      }
      // đóng pop-up
      this.closePopUp();
    },
  },
};
</script>