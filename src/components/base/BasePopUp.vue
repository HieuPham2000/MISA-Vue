<template>
<transition name="fade">
  <div id="popup-container" v-show="isShow">
    <div class="popup">
      <div class="popup-icon-close" @click="closePopUp">
        <img src="../../assets/icon/x.svg" />
      </div>
      <div class="popup-title">{{ title }}</div>
      <div class="popup-content">
        <div v-if="type == POPUP_TYPE.DANGER" class="popup-icon">
          <img src="../../assets/icon/alarm.png" />
        </div>
        <div v-else-if="type == POPUP_TYPE.WARNING" class="popup-icon">
          <img src="../../assets/icon/warning.png" />
        </div>
        <div class="popup-text" :inner-html.prop="content | decoContent"></div>
      </div>
      <div class="popup-footer">
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
        <button
          v-if="btnDanger"
          type="button"
          tabindex="0"
          class="m-btn-default m-btn-danger"
          @click="doAction"
        >
          {{ btnDanger }}
        </button>
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
import { POPUP_TYPE } from "../../type";
import eventBus from "../../event-bus";
import {CommonFunction} from '../../script/common/common'
export default {
  created() {
    eventBus.$on("openPopUp", this.openPopUp);
  },
  destroyed() {
    eventBus.$off("openPopUp", this.openPopUp);
  },
  data() {
    return {
      isShow: false,
      POPUP_TYPE: POPUP_TYPE,
      type: null,
      title: "",
      content: "",
      btnCancel: null,
      btnDo: null,
      btnDanger: null,
      actionDo: null
    };
  },
  filters: {
    decoContent: function(content) {
      return CommonFunction.decoString(content);
    }
  },
  methods: {
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
      // this.$emit("showPopUp");
    },
    closePopUp: function () {
      this.isShow = false;
      // this.$emit("hidePopUp");
    },
    doAction: function () {
      eventBus.$emit(this.actionDo);
      this.closePopUp();
    },
  },
};
</script>