<template>
  <div class="page">
    <!-- page header -->
    <div class="page-header">
      <div class="title">{{ pageTitle }}</div>
      <div class="feature">
        <button class="m-btn" id="btn-open-form" @click="openModal()">
          <div class="m-btn-icon icon-add"></div>
          <div class="btn-text">Thêm nhân viên</div>
        </button>
      </div>
    </div>
    <!-- end page header -->

    <!-- toolbar: search, filter -->
    <div class="toolbar">
      <div class="toolbar-left">
        <input
          class="icon-search input-search"
          type="text"
          placeholder="Tìm kiếm theo Mã, Tên hoặc Số điện thoại"
        />

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
            <li class="m-combobox__dropdown__item">
              <i class="fas fa-check"></i>Tất cả phòng ban
            </li>
          </ul>
        </div>

        <div class="m-combobox" data-name="Position" id="filter-position">
          <input
            class="m-combobox__input"
            type="text"
            placeholder="Chọn/Nhập vị trí"
          />
          <div class="m-combobox__btn" tabindex="-1">
            <i class="fas fa-chevron-down"></i>
          </div>
          <ul class="m-combobox__dropdown">
            <li class="m-combobox__dropdown__item">
              <i class="fas fa-check"></i>Tất cả vị trí
            </li>
          </ul>
        </div>
      </div>
      <div class="toolbar-right">
        <button type="button" class="m-second-button" id="btn-delete" @click="deleteEntities">
          <i class="far fa-trash-alt"></i>
        </button>
        <button
          type="button"
          class="m-second-button m-btn-refresh"
          id="btn-refresh"
          @click="reload"
        ></button>
      </div>
    </div>
    <!-- end toolbar -->

    <!-- grid - table list -->
    <TheGrid :tableData="tableData" :tableColumns="tableColumns" :selectedRows="selectedRows" @openModal="openModal" @clickRow="clickRow"/>
    <!-- end table list -->

    <!-- pagination -->
    <div class="paging-bar">
      <div class="paging-total">
        Hiển thị <b class="paging-total-detail">1-20/1000</b> nhân viên
      </div>

      <!-- button control page -->
      <div class="paging-number">
        <div class="m-btn-ctrl-page m-btn-first-page"></div>
        <div class="m-btn-ctrl-page m-btn-prev-page"></div>
        <div class="m-btn-num-page active">1</div>
        <div class="m-btn-num-page">2</div>
        <div class="m-btn-num-page">3</div>
        <div class="m-btn-num-page">4</div>
        <div class="m-btn-ctrl-page m-btn-next-page"></div>
        <div class="m-btn-ctrl-page m-btn-last-page"></div>
      </div>
      <!-- end button control page -->

      <!-- selectbox select number of records -->
      <div class="m-selectbox paging-limit">
        <div class="m-selectbox__content" tabindex="-1">20 nhân viên/trang</div>
        <div class="m-selectbox__btn" tabindex="-1">
          <i class="fas fa-sort"></i>
        </div>
        <ul class="m-selectbox__dropdown">
          <li class="m-selectbox__dropdown__item">
            <i class="fas fa-check"></i>10 nhân viên/trang
          </li>
          <li class="m-selectbox__dropdown__item selected">
            <i class="fas fa-check"></i>20 nhân viên/trang
          </li>
          <li class="m-selectbox__dropdown__item">
            <i class="fas fa-check"></i>30 nhân viên/trang
          </li>
        </ul>
      </div>
      <!-- end selectbox -->
    </div>
    <!-- end pagination -->
  </div>
</template>

<style scoped>
@import "../../css/layout/page.css";
@import "../../css/layout/paging.css";
@import "../../css/layout/toolbar.css";
@import "../../css/layout/grid.css";
</style>

<script>
import TheGrid from "./TheGrid.vue";
import axios from "axios";
export default {
  components: { TheGrid },
  name: "ThePage",
  props: {
    pageTitle: String,
    tableData: Array,
    tableColumns: Array,
    deleteApi: String
  },
  data() {
    return {
      selectedRows: [],

    };
  },

  methods: {
    deleteEntities: function() {
      let me = this;
      Promise.all(this.selectedRows.map((id) => {
        return axios.delete(`${this.deleteApi}/${id}`).then(res => console.log(res));
      })).then(() => {
        me.$emit("reloadTableData");
        me.selectedRows = [];
      });
      // setTimeout(function() {
      //   me.$emit("reloadTableData");
      //   me.selectedRows = [];
      // }, 1000);
      
    },
    clickRow: function(id) {
      // console.log($event.target);
      var index = this.selectedRows.indexOf(id);
      if(index == -1) {
        this.selectedRows.push(id);
      } else {
        this.selectedRows.splice(index, 1);
      }
    },

    openModal: function (id) {
      if(id) {
        this.selectedRows = [id];
      }
      this.$emit('openModal', id);
    },
    reload: function() {
      this.$emit('reloadTableData')
    }
  },
};
</script>