<template>
  <div class="modal-container" v-show="isShow">
    <!-- form modal -->
    <div class="form-modal">
      <form id="form-employee" method="POST" action="#" autocomplete="off">
        <!-- button x -->
        <div class="form-icon-close" @click="clickBtnClose()" tabindex="0">
          <img src="../../../assets/icon/x.svg" />
        </div>
        <!-- end button x -->

        <div class="form-title">Thông tin nhân viên</div>
        <!-- form content -->
        <div class="form-content">
          <!-- avatar -->
          <div class="form-content-left">
            <div class="avatar"></div>
            <p class="image-format">
              (Vui lòng chọn ảnh có định dạng<br />.jpg, .jpeg, .png, .gif.)
            </p>
          </div>
          <!-- end avatar -->

          <div class="form-content-right">
            <!-- part -->
            <div class="content-part">
              <div class="part-title">A. Thông tin chung:</div>
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="EmployeeCode"
                    >Mã nhân viên (<span>*</span>)</label
                  >
                  <input
                    type="text"
                    fieldName="employeeCode"
                    v-model="employee.EmployeeCode"
                    placeholder="Nhập mã nhân viên"
                    maxlength="20"
                    ref="employeeCode"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="FullName">Họ và tên (<span>*</span>)</label>
                  <input
                    type="text"
                    fieldName="fullName"
                    v-model="employee.FullName"
                    placeholder="Nhập họ và tên"
                    maxlength="100"
                    required
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="DateOfBirth">Ngày sinh</label>
                  <input
                    date
                    type="date"
                    fieldName="dateOfBirth"
                    :value="employee.DateOfBirth | formatData('date')"
                  
                    class="text-align-center"
                  />
                </div>
                <div class="form-item">
                  <label for="Gender">Giới tính</label>
                  <div
                    id="cbx-gender-form"
                    class="m-combobox"
                    data-name="Gender"
                  >
                    <input
                      class="m-combobox__input"
                      fieldName="gender"
                      :value="employee.Gender"
                      type="text"
                      placeholder="Chọn/Nhập giới tính"
                      name="Gender"
                      formattype="m-combobox"
                    />
                    <div class="m-combobox__btn" tabindex="-1">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityNumber"
                    >Số CMTND/ Căn cước (<span>*</span>)</label
                  >
                  <input
                    number
                    type="text"
                    fieldName="identityNumber"
                    :value="employee.IdentityNumber"
                    placeholder="Nhập số CMTND/ Căn cước"
                    maxlength="12"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="IdentityDate">Ngày cấp</label>
                  <input
                    date
                    type="date"
                    fieldName="identityDate"
                    :value="employee.IdentityDate | formatData('date')"
                    formattype="yyyy-mm-dd"
                    class="text-align-center"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityPlace">Nơi cấp</label>
                  <input
                    type="text"
                    fieldName="identityPlace"
                    :value="employee.IdentityPlace"
                    placeholder="Nhập nơi cấp"
                    maxlength="100"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="Email">Email (<span>*</span>)</label>
                  <input
                    email
                    type="email"
                    fieldName="email"
                    :value="employee.Email"
                    placeholder="Nhập email"
                    maxlength="320"
                    required
                  />
                </div>
                <div class="form-item">
                  <label for="PhoneNumber"
                    >Số điện thoại (<span>*</span>)</label
                  >
                  <input
                    phone
                    type="tel"
                    fieldName="phoneNumber"
                    :value="employee.PhoneNumber"
                    name="PhoneNumber"
                    placeholder="Nhập số điện thoại"
                    maxlength="30"
                    required
                  />
                </div>
              </div>
              <!-- end row -->
            </div>
            <!-- end part -->

            <!-- part -->
            <div class="content-part">
              <div class="part-title">B. Thông tin công việc:</div>
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="PositionId">Vị trí</label>
                  <!-- <m-combobox id="cbx-position-form" 
                  name="PositionName" placeholder="Chọn/Nhập vị trí" 
                  data-name="Position"></m-combobox> -->
                  <div
                    id="cbx-position-form"
                    class="m-combobox"
                    data-name="Position"
                  >
                    <input
                      class="m-combobox__input"
                      type="text"
                      fieldName="positionId"
                      :value="employee.PositionId"
                      placeholder="Chọn/Nhập vị trí"
                      name="PositionId"
                      formattype="m-combobox"
                    />
                    <div class="m-combobox__btn" tabindex="-1">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
                <div class="form-item">
                  <label for="DepartmentId">Phòng ban</label>
                  <!-- <m-combobox id="cbx-department-form" 
                  name="DepartmentName" placeholder="Chọn/Nhập phòng ban" 
                  data-name="Department"></m-combobox> -->
                  <div
                    id="cbx-department-form"
                    class="m-combobox"
                    data-name="Department"
                  >
                    <input
                      class="m-combobox__input"
                      type="text"
                      fieldName="departmentId"
                      :value="employee.DepartmentId"
                      placeholder="Chọn/Nhập phòng ban"
                      name="DepartmentId"
                      formattype="m-combobox"
                    />
                    <div class="m-combobox__btn" tabindex="-1">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="PersonalTaxCode">Mã số thuế</label>
                  <input
                    number
                    type="text"
                    fieldName="personalTaxCode"
                    :value="employee.PersonalTaxCode"
                    name="PersonalTaxCode"
                    placeholder="Nhập mã số thuế"
                    maxlength="13"
                  />
                </div>
                <div class="form-item">
                  <label for="Salary">Mức lương cơ bản</label>
                  <div class="money-input-container">
                    <input
                      number
                      salary
                      id="salary"
                      type="text"
                      fieldName="salary"
                      :value="employee.Salary | formatData('money')"
                      name="Salary"
                      maxlength="14"
                      class="text-align-right"
                      placeholder="Nhập mức lương cơ bản"
                    />
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="JoinDate">Ngày gia nhập công ty</label>
                  <input
                    date
                    type="date"
                    fieldName="joinDate"
                    :value="employee.JoinDate | formatData('date')"
                    name="JoinDate"
                    class="text-align-center"
                  />
                </div>
                <div class="form-item">
                  <label for="WorkStatus">Tình trạng công việc</label>
                  <!-- <m-combobox id="cbx-workstatus-form" 
                    name="WorkStatus" placeholder="Chọn/Nhập tình trạng công việc" 
                    data-name="WorkStatus"></m-combobox> -->
                  <div
                    id="cbx-workstatus-form"
                    class="m-combobox"
                    data-name="WorkStatus"
                  >
                    <input
                      class="m-combobox__input"
                      type="text"
                      fieldName="workStatus"
                      :value="employee.WorkStatus"
                      placeholder="Chọn/Nhập tình trạng công việc"
                      name="WorkStatus"
                      formattype="m-combobox"
                    />
                    <div class="m-combobox__btn" tabindex="-1">
                      <i class="fas fa-chevron-down"></i>
                    </div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
              </div>
              <!-- end row -->
            </div>
            <!-- end part -->
          </div>
        </div>
        <!-- end form content -->

        <!-- form footer -->
        <div class="form-footer">
          <button
            type="button"
            class="m-btn-default m-btn-cancel"
            tabindex="0"
            @click="clickBtnClose()"
          >
            Hủy
          </button>
          <button
            type="button"
            id="btn-submit"
            class="m-btn m-btn-default"
            tabindex="0"
            @click="submitForm()"
          >
            <i class="far fa-save"></i>
            <div class="btn-text">Lưu</div>
          </button>
        </div>
        <!-- end form footer -->
      </form>
    </div>
    <!-- end form modal -->
  </div>
</template>

<style scoped>
@import "../../../css/page/form-employee.css";
</style>

<script>
import axios from "axios";
import { CommonFunction } from "../../../script/common/common";

export default {
  props: {
    isShow: Boolean,
    employeeId: String,
    employee: Object,
  },
  data() {
    return {
      // employee: {},
      data: {
        createdDate: null, // string (date -> json)
        createdBy: null, // string
        modifiedDate: null, // string (date -> json)
        modifiedBy: null, // string
        // "employeeId": null, // string
        employeeCode: null, // string
        firstName: null, // string
        lastName: null, // string
        fullName: null, // string
        gender: 0, // number
        dateOfBirth: null, // string (date -> json)
        phoneNumber: null, // string
        email: null, // string
        address: null, // string
        identityNumber: null, // string
        identityDate: null, // string (date -> json)
        identityPlace: null,
        joinDate: null, // string (date -> json)
        martialStatus: 0, // number
        educationalBackground: 0, // number
        qualificationId: null, // string
        departmentId: null, // string
        positionId: null, // string
        workStatus: 0, // number
        personalTaxCode: null, // string
        salary: 0, // number
        positionCode: null, // string
        positionName: null, // string
        departmentCode: null, // string
        departmentName: null, // string
        qualificationName: null, // string
      },
    };
  },
  computed: {
    dateOfBirthFormatted: {
      get: function() {
        return CommonFunction.formatDateYYYYMMDD(this.employee.DateOfBirth);
      },
      set: function(newValue) {
        this.employee.DateOfBirth = newValue;
      }
      
    }
  },
  watch: {
    isShow: function () {
      // if(this.isShow) {
      //   console.log("focus: " + this.$refs.employeeCode)
      // }
        this.$nextTick(() => this.$refs.employeeCode.focus())
      }
    },
  filters: {
    formatData: function (value, filterType) {
      switch (filterType) {
        case "date":
          return CommonFunction.formatDateYYYYMMDD(value);
        case "money":
          return CommonFunction.formatMoney(value);
        case "work-status":
          return CommonFunction.formatWorkStatus(value);
        default:
          return value;
      }
    },
  },
  methods: {
    clickBtnClose: function () {
      this.$emit("closeModal");
    },

    postData: function () {
      let me = this;
      var inputs = this.$el.querySelectorAll("input");
      inputs.forEach((item) => {
        var fieldName = item.getAttribute("fieldName");
        var value = item.value;
        me.data[fieldName] = value;
      })
      axios({
      method: "POST",
      url: `http://cukcuk.manhnv.net/v1/Employees`,
      data: this.data,
      contentType: "application/json",
      dataType: "json"
    }).then((res) => {
          console.log(res);
          // this.$emit('reloadTableData');
    });
    },

    putData: function () {
      let me = this;
     
      var inputs = this.$el.querySelectorAll("input");
      inputs.forEach((item) => {
        var fieldName = item.getAttribute("fieldName");
        var value = item.value;
        me.data[fieldName] = value;
      });
       console.log(this.data)
      axios({
      method: "PUT",
      url: `http://cukcuk.manhnv.net/v1/Employees/${this.employeeId}`,
      data: this.data,
      contentType: "application/json",
      dataType: "json"
    }).then((res) => {
          console.log(res);
          this.$emit('reloadTableData');
        });
    },

    submitForm: function() {
      if (this.employeeId) {
        this.putData();
      } else {
        this.postData();
      }
      this.$emit('reloadTableData');
      this.$emit('reloadTableData');
      this.$emit("closeModal");
    },
  },
};
</script>