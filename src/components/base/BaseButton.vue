<template>
  <button
    type="button"
    :tabindex="tabindex"
    :class="classes"
    :id="id"
    :disabled="isDisabled"
    @click="clickBtn"
  >
    <slot name="btn-icon"></slot>
    <slot name="btn-text"></slot>
  </button>
</template>

<script>
export default {
  props: {
    id: String,
    classes: String,
    isDisabled: {
      type: Boolean,
      default: false,
      required: false
    },
    tabindex: {
      type: String,
      default: '0',
      required: false
    }
  },
  methods: {
    clickBtn: function() {
      this.$emit("clickBtn");
    }
  }
}
</script>

<style>
@import '../../css/common/button.css';
</style>