<template>
  <div id="popup-container">
    <div class="popup">
      <div class="popup-icon-close" @click="closePopUp">
        <img src="../../assets/icon/x.svg" />
      </div>
      <div class="popup-title">{{ title }}</div>
      <div class="popup-content">
        <div class="popup-icon">
          <img src="" />
        </div>
        <div class="popup-text">{{ content }}</div>
      </div>
      <div class="popup-footer">
        <button
          v-if="btnCancel.have"
          type="button"
          class="m-btn-default m-btn-cancel"
          @click="btnCancel.action"
        >
          {{ btnCancel.name }}
        </button>
        <button
          v-if="btnDanger.have"
          type="button"
          class="m-btn-default m-btn-danger"
          @click="btnDanger.action"
        >
          {{ btnDanger.name }}
        </button>
        <button
          v-if="btnDo.have"
          type="button"
          class="m-btn-default m-btn-do"
          @click="btnDo.action"
        >
          {{ btnDo.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@import "../../css/common/pop-up.css";
</style>

<script>
export default {
  props: {
    title: String,
    content: String,
    btnCancel: {
      have: Boolean,
      name: String,
      action: Function,
    },
    btnDo: {
      have: Boolean,
      name: String,
      action: Function,
    },
    btnDanger: {
      have: Boolean,
      name: String,
      action: Function,
    },
  },
};
</script>