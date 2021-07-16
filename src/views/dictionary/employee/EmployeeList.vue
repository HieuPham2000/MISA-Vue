<template>
  <div>
    <BaseToastMessage />
    <TheHeader 
      @toggleMenu="toggleMenu"
    />
    <TheMenu 
      :class="{collapse: collapseMenu}"
    />
    <ThePage
      :class="{expand: collapseMenu}"
      :pageTitle="pageTitle"
      :tableData="tableData"
      :deleteApi="deleteApi"
      :tableColumns="tableColumns"
      @openModal="openModal"
      @reloadTableData="loadTableData"
    />
    <EmployeeDetail
      :isShow="showModal"
      @closeModal="showModal = false"
      @reloadTableData="loadTableData"
      :employeeId="employeeId"
      :employee="employee"
    />
  </div>
</template>

<script>
import TheHeader from "../../../components/layout/TheHeader.vue";
import TheMenu from "../../../components/layout/TheMenu.vue";
import ThePage from "../../../components/layout/ThePage.vue";
import BaseToastMessage from "../../../components/base/BaseToastMessage.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import axios from 'axios';
import { ToastMessage } from '../../../script/base/main';
export default {
  name: "EmployeeList",
  components: {
    TheHeader,
    TheMenu,
    ThePage,
    EmployeeDetail,
    BaseToastMessage
  },
  methods: {
    openModal: function (id) {
      let me = this;
      this.employeeId = id;

      // if(this.employeeId) {
      //   this.getData();
      // } else {
      //   this.getNewEmployeeCode();
      // }
      // setTimeout(() => {
      //    me.showModal = true;
      // }, 200);

      var promise;
      if(this.employeeId) {
        promise = this.getData();
      } else {
        promise = this.getNewEmployeeCode();
      }

      promise.then(() => {me.showModal = true;});
            
    },
    toggleMenu() {
      this.collapseMenu = !this.collapseMenu;
    },
    loadTableData: function () {
      // Gọi api thực hiện lấy dữ liệu
      axios.get(this.tableDataApi).then((res) => {
        this.tableData = res.data;
      });
      ToastMessage.add("success", "Dữ liệu được cập nhật thành công!");
    },
    getData: function () {
      var promise = axios
        .get(`${this.tableDataApi}/${this.employeeId}`)
        .then((res) => {
          this.employee = res.data;
        });
      return promise;
    },
    getNewEmployeeCode: function () {
      var promise = axios
        .get(`${this.tableDataApi}/NewEmployeeCode`)
        .then((res) => {
          this.employee = {EmployeeCode: res.data};
        });
      return promise;
    },
  },
  created() {
    this.loadTableData();
  },
  provide: {
      entityId: "EmployeeId"
  },
  data() {
    return {
      pageTitle: "Danh sách nhân viên",
      collapseMenu: false,
      employeeId: null,
      employee: {},
      newEmployeeCode: null,
      showModal: false,
      tableDataApi: "http://cukcuk.manhnv.net/v1/Employees",
      tableData: [],
      deleteApi: "http://cukcuk.manhnv.net/v1/Employees",
      tableColumns: [
        {
          header: "",
          style: "width: 40px",
        },
        {
          header: "#",
          style: "width: 50px",
        },
        {
          header: "Mã nhân viên",
          fieldName: "EmployeeCode",
          style: "width: 150px",
        },
        {
          header: "Họ và tên",
          fieldName: "FullName",
          style: "width: 200px",
        },
        {
          header: "Giới tính",
          fieldName: "GenderName",
          style: "width: 150px",
        },
        {
          header: "Ngày sinh",
          fieldName: "DateOfBirth",
          filter: "dateDDMMYYYY",
          style: "width: 150px; text-align: center",
        },
        {
          header: "Địa chỉ",
          fieldName: "Address",
          style: "width: 200px",
        },
        {
          header: "Điện thoại",
          fieldName: "PhoneNumber",
          style: "width: 150px",
        },
        {
          header: "Email",
          fieldName: "Email",
          style: "width: 200px",
        },
        {
          header: "Chức vụ",
          fieldName: "PositionName",
          style: "width: 150px",
        },
        {
          header: "Phòng ban",
          fieldName: "DepartmentName",
          style: "width: 150px",
        },
        {
          header: "Mức lương cơ bản",
          fieldName: "Salary",
          filter: "money",
          style: "width: 150px; text-align: right; padding-right: 10px;",
        },
        {
          header: "Tình trạng công việc",
          fieldName: "WorkStatus",
          filter: "work-status",
          style: "width: 200px",
        },
      ],
    };
  },
};
</script>

<style>
@import "../../../assets/font/fontawesome-5.15.1/css/all.min.css";
@import "../../../css/common/main.css";
@import "../../../css/page/employee.css";

</style>
