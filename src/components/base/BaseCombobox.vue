<template>
  <div class="m-combobox" data-name="Department" id="filter-department">
    <input
      class="m-combobox__input"
      type="text"
      placeholder="Chọn/Nhập phòng ban"
    />
    <div class="m-combobox__btn" tabindex="-1">
      <i class="fas fa-chevron-down"></i>
    </div>
    <ul class="m-combobox__dropdown">
      <li class="m-combobox__dropdown__item"><i class="fas fa-check"></i>Tất cả phòng ban</li>
    </ul>
  </div>
</template>

<style>
@import "../../css/common/pop-up.css";
</style>

<script>
export default {
  name: "BaseCombobox",
};
</script>