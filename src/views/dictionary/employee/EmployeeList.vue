<template>
  <div>
    <TheHeader />
    <TheMenu />
    <ThePage :tableDataApi="tableDataApi" :tableColumns="tableColumns" />
  </div>
</template>

<script>
import TheHeader from '../../../components/layout/TheHeader.vue'
import TheMenu from '../../../components/layout/TheMenu.vue'
import ThePage from '../../../components/layout/ThePage.vue'
export default {
  components: {
    TheHeader, TheMenu, ThePage
  },
  data() {
    return{
      tableDataApi: "http://cukcuk.manhnv.net/v1/Employees",
      tableColumns: [
        {
          header: "",
          style: "width: 40px"          
        },
        {
          header: "#",
          style: "width: 50px"          
        },
        {
          header: "Mã nhân viên",
          fieldName: "EmployeeCode",
          style: "width: 150px"          
        },
        {
          header: "Họ và tên",
          fieldName: "FullName",
          style: "width: 200px"          
        },
        {
          header: "Giới tính",
          fieldName: "GenderName",
          style: "width: 150px"          
        },
        {
          header: "Ngày sinh",
          fieldName: "DateOfBirth",
          filter: "dateDDMMYYYY",
          style: "width: 150px; text-align: center"          
        },
        {
          header: "Địa chỉ",
          fieldName: "Address",
          style: "width: 200px"          
        },
        {
          header: "Điện thoại",
          fieldName: "PhoneNumber",
          style: "width: 150px"          
        },
        {
          header: "Email",
          fieldName: "Email",
          style: "width: 200px"          
        },
        {
          header: "Chức vụ",
          fieldName: "PositionName",
          style: "width: 150px"          
        },
        {
          header: "Phòng ban",
          fieldName: "DepartmentName",
          style: "width: 150px"          
        },
        {
          header: "Mức lương cơ bản",
          fieldName: "Salary",
          filter: "money",
          style: "width: 150px; text-align: right; padding-right: 10px;"          
        },
        {
          header: "Tình trạng công việc",
          fieldName: "WorkStatus",
          filter: "work-status",
          style: "width: 200px"          
        },
      ]
    }
  }
}
</script>

<style>
  @import '../../../assets/font/fontawesome-5.15.1/css/all.min.css';
  @import '../../../css/common/main.css';
  @import '../../../css/page/employee.css';
</style>
