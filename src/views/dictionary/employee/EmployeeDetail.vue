<template>
  <div class="modal-container">
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
                  <label for="EmployeeCode">Mã nhân viên (<span>*</span>)</label>
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
                    @input="employee.DateOfBirth = $event.target.value"
                    class="text-align-center"
                  />
                </div>
                <div class="form-item">
                  <label for="Gender">Giới tính</label>
                   <BaseCombobox
                    id="cbx-gender-form"
                    dataId="id"
                    dataName="text"
                    placeholder="Chọn/Nhập giới tính"
                    :fixedData="fixedDataGender"
                    inputFieldName="Gender"
                    v-model="employee.Gender"
                  />
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
                    v-model="employee.IdentityNumber"
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
                    @input="employee.IdentityDate = $event.target.value"
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
                    v-model="employee.IdentityPlace"
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
                    v-model="employee.Email"
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
                    v-model="employee.PhoneNumber"
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
                  <BaseCombobox
                    id="cbx-position-form"
                    dataId="PositionId"
                    dataName="PositionName"
                    api="http://cukcuk.manhnv.net/v1/Positions"
                    placeholder="Chọn/Nhập vị trí"
                    inputFieldName="PositionId"
                    v-model="employee.PositionId"
                  />
                </div>
                <div class="form-item">
                  <label for="DepartmentId">Phòng ban</label>
                  <BaseCombobox
                    id="cbx-department-form"
                    dataId="DepartmentId"
                    dataName="DepartmentName"
                    api="http://cukcuk.manhnv.net/api/Department"
                    placeholder="Chọn/Nhập phòng ban"
                    inputFieldName="DepartmentId"
                    v-model="employee.DepartmentId"
                  />
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
                    v-model="employee.PersonalTaxCode"
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
                      @input="employee.Salary = normalizeMoney($event.target.value)"
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
                    @input="employee.JoinDate = $event.target.value"
                    name="JoinDate"
                    class="text-align-center"
                  />
                </div>
                <div class="form-item">
                  <label for="WorkStatus">Tình trạng công việc</label>
                  <BaseCombobox
                    id="cbx-workstatus-form"
                    dataId="id"
                    dataName="text"
                    placeholder="Chọn/Nhập tình trạng công việc"
                    :fixedData="fixedDataWorkStatus"
                    inputFieldName="WorkStatus"
                    v-model="employee.WorkStatus"
                  />
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
import BaseCombobox from '../../../components/base/BaseCombobox.vue';
import eventBus from '../../../event-bus';
import { ADD, EDIT } from "../../../script/page/employee-page";
import mixin from "../../../script/page/employee-detail";

export default {
  components: { BaseCombobox },
  props: {
    dataEmployee: Object,
    status: String,
  },
  mixins: [mixin],
  data() {
    return {
      fixedDataGender: [
        {id: 0, text: "Nữ"},
        {id: 1, text: "Nam"},
        {id: 2, text: "Không xác định"}
      ],
      fixedDataWorkStatus: [
        {id: 1, text: "Đã nghỉ việc"},
        {id: 2, text: "Đang thử việc"},
        {id: 3, text: "Đang làm việc"}
      ]
    };
  },
  created() {
    for(var fieldName in this.employee) {
      var value = this.dataEmployee[fieldName];
      if(value) {
        this.employee[fieldName] = value;
      }
    }
  },
  mounted() {
    // this.$nextTick(() => this.$refs.employeeCode.focus());
    this.$refs.employeeCode.focus();
  },
  filters: {
    formatData: function (value, filterType) {
      switch (filterType) {
        case "date":
          return CommonFunction.formatDateYYYYMMDD(value);
        case "money":
          return CommonFunction.formatInputMoney(value);
        default:
          return value;
      }
    },
  },
  methods: {
    clickBtnClose: function () {
      this.$emit("closeModal");
    },

    normalizeMoney: function(value) {
      // console.log("before normalize: " + value)
      value = value.toString().replaceAll(",", "").replaceAll(".", "");
      // value.replaceAll(",", "");
      // value.replaceAll(".", "");
      // console.log("after normalize: " + value)
      return value;
    },
    postData: function () {
      axios({
        method: "POST",
        url: `http://cukcuk.manhnv.net/v1/Employees`,
        data: this.employee,
        contentType: "application/json",
        dataType: "json",
      }).then(() => {
        eventBus.$emit("reloadTableData");
        this.$emit("closeModal");
      });
    },

    putData: function () {
      this.employee.EmployeeId = this.dataEmployee.EmployeeId;
      axios({
        method: "PUT",
        url: `http://cukcuk.manhnv.net/v1/Employees/${this.employee.EmployeeId}`,
        data: this.employee,
        contentType: "application/json",
        dataType: "json",
      }).then(() => {
        eventBus.$emit("reloadTableData");
        this.$emit("closeModal");
      });
    },

    submitForm: function () {
      switch(this.status) {
        case ADD: 
          this.postData(); break;
        case EDIT:
          this.putData(); break;
      }
    },
  },
};
</script>