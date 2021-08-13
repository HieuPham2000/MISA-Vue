export default {
  data() {
    return {
      // chứa dữ liệu về các cột trong grid table 
      // (tiêu đề cột, độ rộng, style khác)
      // dùng trong component EmployeePage
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
          style: "width: 60px",
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
          style: "width: 250px",
        },
        {
          header: "Điện thoại",
          fieldName: "PhoneNumber",
          style: "width: 150px",
        },
        {
          header: "Email",
          fieldName: "Email",
          style: "width: 250px",
        },
        {
          header: "Phòng ban",
          fieldName: "DepartmentName",
          style: "width: 150px",
        },
        {
          header: "Chức vụ",
          fieldName: "PositionName",
          style: "width: 150px",
        },
        {
          header: "Mức lương cơ bản",
          fieldName: "Salary",
          filter: "money",
          style: "width: 150px; text-align: right; padding-right: 20px;",
        },
        {
          header: "Tình trạng công việc",
          fieldName: "WorkStatus",
          filter: "work-status",
          style: "width: 200px",
        },
      ],
    }
  }
}