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

    <!-- toolbar -->
    <div class="toolbar">
      <!-- toolbar left: search, filter -->
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
          :extraItems="[{DepartmentName: 'Tất cả phòng ban', DepartmentId: null}]"
        />

        <BaseCombobox 
          id="filter-position" 
          dataId="PositionId" 
          dataName="PositionName" 
          api="http://cukcuk.manhnv.net/v1/Positions" 
          placeholder="Chọn/Nhập vị trí"
          :extraItems="[{PositionName: 'Tất cả vị trí', PositionId: null}]"
        />
      </div>

       <!-- toolbar right: button delete, refresh -->
      <div class="toolbar-right">
        <button type="button" class="m-second-button" id="btn-delete" @click="clickBtnDelete">
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
    <ThePagination :currentPage="currentPage" :totalPages="totalPages" @changePage="onChangePage"/>
    <!-- end pagination -->
  </div>
  </div>
</template>

<script>
import axios from "axios";
import mixin from "../../../script/page/employee-page";

import eventBus from "../../../event-bus"
import {EMPLOYEE_ACTION, TOAST_TYPE} from "../../../type"
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

      this.status = EMPLOYEE_ACTION.ADD;

      this.getNewEmployeeCode().then((res) => {
          this.dataEmployee = { EmployeeCode: res.data };
        })
        .catch(() => {
          this.$toast(TOAST_TYPE.DANGER, "Không lấy được mã nhân viên mới!");
        })
        .finally(() => {
          this.openModal();
        });
    },
    openFormEdit: function(id) {
      this.status = EMPLOYEE_ACTION.EDIT;
      this.getData(id).then((res) => {
          this.dataEmployee = res.data;
          if(this.dataEmployee) {
            this.openModal();
          } else {
            this.$toast(TOAST_TYPE.DANGER, "Không lấy được thông tin nhân viên!");
            this.reloadTableData();
          }
          
        }).catch((error) => {
          console.log(error);
        });
    },
    openModal: function() {
      this.showModal = true;
    },
    closeModal: function () {
      this.showModal = false;
    },
    getData: function (id) {
      return axios.get(`${this.tableDataApi}/${id}`);
    },
    getNewEmployeeCode: function () {
      return axios.get(`${this.tableDataApi}/NewEmployeeCode`)
    },
    reloadTableData: function() {
      eventBus.$emit("reloadTableData", true);
    },
    clickBtnDelete: function() {
      eventBus.$emit("clickBtnDelete");
    },
    /**
     * Thay đổi trang
     * @param {Number} page trang chuyển đến
     * 
     * Author: pthieu (31/07/2021)
     */
    onChangePage(page) {
      this.currentPage = page;
    }
  },
  data() {
    return {
      showModal: false,
      entityId: "EmployeeId",
      dataEmployee: {},
      status: EMPLOYEE_ACTION.ADD,
      currentPage: 1,
      totalPages: 10,
    };
  },
};
</script>

<style>
@import '../../../css/layout/layout.css';
</style>
