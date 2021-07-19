<template>
  <div>
     <EmployeeDetail
      v-if="showModal"
      @closeModal="closeModal"
      @reloadTableData="reloadTableData"
      :status="status"
      :dataEmployee="dataEmployee"
    />

    <div class="page" :class="{expand: expand}">
    <!-- page header -->
    <div class="page-header">
      <div class="title">Danh sách nhân viên</div>
      <div class="feature">
        <button class="m-btn" id="btn-open-form" @click="openFormAdd">
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

        <BaseCombobox 
          id="filter-department" 
          dataId="DepartmentId" 
          dataName="DepartmentName" 
          api="http://cukcuk.manhnv.net/api/Department" 
          placeholder="Chọn/Nhập phòng ban"
          :defaultItems="['Tất cả phòng ban']"
        />

        <BaseCombobox 
          id="filter-position" 
          dataId="PositionId" 
          dataName="PositionName" 
          api="http://cukcuk.manhnv.net/v1/Positions" 
          placeholder="Chọn/Nhập vị trí"
          :defaultItems="['Tất cả vị trí']"
        />

      </div>
      <div class="toolbar-right">
        <button type="button" class="m-second-button" id="btn-delete" @click="deleteTableData">
          <i class="far fa-trash-alt"></i>
        </button>
        <button
          type="button"
          class="m-second-button m-btn-refresh"
          id="btn-refresh"
          @click="reloadTableData"
        ></button>
      </div>
    </div>
    <!-- end toolbar -->

    <!-- grid - table list -->
    <TheGrid 
    :entityId="entityId"
    :tableColumns="tableColumns" 
    :tableDataApi="tableDataApi"
    :deleteApi="deleteApi"
    @openDetailForm="openFormEdit" 
    />
    <!-- end table list -->

    <!-- pagination -->
    <ThePagination />
    <!-- end pagination -->
  </div>
  </div>
</template>

<script>
import axios from "axios";
import mixin from "../../../script/page/employee-page";
import { ADD, EDIT } from "../../../script/page/employee-page";

import eventBus from "../../../event-bus"
import BaseCombobox from "../../../components/base/BaseCombobox.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import TheGrid from "../../../components/layout/TheGrid.vue";
import ThePagination from "../../../components/layout/ThePagination.vue";

export default {
  mixins: [mixin],
  props: {
    expand: Boolean,
  },
  components: {
    EmployeeDetail,
    TheGrid,
    ThePagination,
    BaseCombobox,
  },
  methods: {
    openFormAdd: function() {
      let me = this;
      this.status = ADD;
      this.getNewEmployeeCode().then(() => {
        me.openModal();
      })
    },
    openFormEdit: function(id) {
      let me = this;
      this.status = EDIT;
      this.getData(id).then(() => {
        me.openModal();
      })
    },
    openModal: function() {
      this.showModal = true;
    },
    closeModal: function () {
      this.showModal = false;
    },
    getData: function (id) {
      var promise = axios
        .get(`${this.tableDataApi}/${id}`)
        .then((res) => {
          this.dataEmployee = res.data;
        });
      return promise;
    },
    getNewEmployeeCode: function () {
      return axios
        .get(`${this.tableDataApi}/NewEmployeeCode`)
        .then((res) => {
          this.dataEmployee = { EmployeeCode: res.data };
        });
    },
    reloadTableData: function() {
      eventBus.$emit("reloadTableData");
    },
    deleteTableData: function() {
      eventBus.$emit("deleteTableData");
    }
  },
  data() {
    return {
      showModal: false,
      entityId: "EmployeeId",
      dataEmployee: {},
      status: ADD
    };
  },
};
</script>

<style>
@import '../../../css/layout/layout.css';
</style>
