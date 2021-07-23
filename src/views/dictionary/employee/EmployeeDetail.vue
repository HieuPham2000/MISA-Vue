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
                  <label for="EmployeeCode"
                    >Mã nhân viên (<span>*</span>)</label
                  >
                  <BaseTextInput
                    ref="EmployeeCode"
                    v-model="employee.EmployeeCode"
                    placeholder="Nhập mã nhân viên"
                    maxlength="20"
                    :isRequired="true"
                    :autofocus="true"
                  />
                </div>
                <div class="form-item">
                  <label for="FullName">Họ và tên (<span>*</span>)</label>
                  <BaseTextInput
                    ref="FullName"
                    v-model="employee.FullName"
                    placeholder="Nhập họ và tên"
                    maxlength="100"
                    :isRequired="true"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="DateOfBirth">Ngày sinh</label>
                  <BaseDateInput
                    ref="DateOfBirth"
                    v-model="employee.DateOfBirth"
                  />
                </div>
                <div class="form-item">
                  <label for="Gender">Giới tính</label>
                  <BaseCombobox
                    ref="Gender"
                    id="cbx-gender-form"
                    dataId="id"
                    dataName="text"
                    placeholder="Chọn/Nhập giới tính"
                    :fixedData="fixedDataGender"
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
                  <BaseTextInput
                    ref="IdentityNumber"
                    type="number"
                    v-model="employee.IdentityNumber"
                    placeholder="Nhập số CMTND/ Căn cước"
                    maxlength="12"
                    :isRequired="true"
                  />
                </div>
                <div class="form-item">
                  <label for="IdentityDate">Ngày cấp</label>
                  <BaseDateInput
                    ref="IdentityDate"
                    v-model="employee.IdentityDate"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityPlace">Nơi cấp</label>
                  <BaseTextInput
                    ref="IdentityPlace"
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
                  <BaseTextInput
                    ref="Email"
                    v-model="employee.Email"
                    placeholder="Nhập email"
                    maxlength="320"
                    :isRequired="true"
                    :format="validate.EMAIL.TYPE"
                  />
                </div>
                <div class="form-item">
                  <label for="PhoneNumber"
                    >Số điện thoại (<span>*</span>)</label
                  >
                  <BaseTextInput
                    ref="PhoneNumber"
                    v-model="employee.PhoneNumber"
                    placeholder="Nhập số điện thoại"
                    maxlength="30"
                    :isRequired="true"
                    :format="validate.PHONE_NUMBER.TYPE"
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
                    ref="PositionId"
                    id="cbx-position-form"
                    dataId="PositionId"
                    dataName="PositionName"
                    api="http://cukcuk.manhnv.net/v1/Positions"
                    placeholder="Chọn/Nhập vị trí"
                    v-model="employee.PositionId"
                  />
                </div>
                <div class="form-item">
                  <label for="DepartmentId">Phòng ban</label>
                  <BaseCombobox
                    ref="DepartmentId"
                    id="cbx-department-form"
                    dataId="DepartmentId"
                    dataName="DepartmentName"
                    api="http://cukcuk.manhnv.net/api/Department"
                    placeholder="Chọn/Nhập phòng ban"
                    v-model="employee.DepartmentId"
                  />
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="PersonalTaxCode">Mã số thuế</label>
                  <BaseTextInput
                    ref="PersonalTaxCode"
                    type="number"
                    v-model="employee.PersonalTaxCode"
                    placeholder="Nhập mã số thuế"
                    maxlength="13"
                  />
                </div>
                <div class="form-item">
                  <label for="Salary">Mức lương cơ bản</label>
                  <div class="money-input-container">
                    <BaseTextInput
                      ref="Salary"
                      type="money"
                      v-model="employee.Salary"
                      placeholder="Nhập mức lương cơ bản"
                      maxlength="14"
                    />
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="JoinDate">Ngày gia nhập công ty</label>
                  <BaseDateInput ref="JoinDate" v-model="employee.JoinDate" />
                </div>
                <div class="form-item">
                  <label for="WorkStatus">Tình trạng công việc</label>
                  <BaseCombobox
                    ref="WorkStatus"
                    id="cbx-workstatus-form"
                    dataId="id"
                    dataName="text"
                    :showAbove="true"
                    placeholder="Chọn/Nhập tình trạng công việc"
                    :fixedData="fixedDataWorkStatus"
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
            @click="clickBtnClose"
          >
            Hủy
          </button>
          <button
            type="button"
            class="m-btn m-btn-default"
            tabindex="0"
            @click="clickBtnSubmit"
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
import Vue from "vue";
import axios from "axios";
import eventBus from "../../../event-bus";
import mixin from "../../../script/page/employee-detail";
import { EMPLOYEE_ACTION, TOAST_TYPE, VALIDATE } from "../../../type";
import { FIXED_DATA_GENDER, FIXED_DATA_WORK_STATUS, POP_UP_EMPLOYEE } from "../../../constant";
import BaseCombobox from "../../../components/base/BaseCombobox.vue";
import BaseTextInput from "../../../components/base/BaseTextInput.vue";
import BaseDateInput from "../../../components/base/BaseDateInput.vue";

export default {
  components: { BaseCombobox, BaseTextInput, BaseDateInput },
  props: {
    dataEmployee: Object, // dữ liệu employee
    status: String, // trạng thái: ADD, EDIT
  },
  mixins: [mixin], // Object employee
  data() {
    return {
      fixedDataGender: FIXED_DATA_GENDER,
      fixedDataWorkStatus: FIXED_DATA_WORK_STATUS,
      validate: VALIDATE,
      dataPopUpCloseForm: {...POP_UP_EMPLOYEE.CLOSE_FORM},
      dataPopUpAddEmployee: {...POP_UP_EMPLOYEE.ADD},
      dataPopUpEditEmployee: {...POP_UP_EMPLOYEE.EDIT},
    };
  },
  created() {
    // set giá trị cho object employee (data)
    for (var fieldName in this.employee) {
      var value = this.dataEmployee[fieldName];
      if (value != undefined && value != null) {
        this.employee[fieldName] = value;
      }
      // else {
      //   this.employee[fieldName] = null;
      // }
    }

    // Lắng nghe sự kiện qua eventBus
    eventBus.$on(EMPLOYEE_ACTION.ADD, this.postData);
    eventBus.$on(EMPLOYEE_ACTION.EDIT, this.putData);
    eventBus.$on(EMPLOYEE_ACTION.CLOSE_FORM, this.closeForm);
  },
  destroyed() {
    eventBus.$off(EMPLOYEE_ACTION.ADD, this.postData);
    eventBus.$off(EMPLOYEE_ACTION.EDIT, this.putData);
    eventBus.$off(EMPLOYEE_ACTION.CLOSE_FORM, this.closeForm);
  },
  methods: {
    /**
     * Click nút đóng form
     * @author pthieu (21-07-2021)
     */
    clickBtnClose: function () {
      eventBus.$emit("openPopUp", this.dataPopUpCloseForm);
    },

    /**
     * Đóng form
     * @author pthieu (16-07-2021)
     */
    closeForm: function () {
      this.$emit("closeModal");
    },

    /**
     * Click nút submit form
     * @author pthieu (21-07-2021)
     */
    clickBtnSubmit: function () {
      // validate
      for (var name in this.$refs) {
        var formItem = this.$refs[name];
        if (formItem instanceof Vue && !formItem.validateInput()) {
          formItem.focusInput();
          return;
        }
      }

      // dựa trên là cờ status => action
      switch (this.status) {
        // thêm nhân viên mới
        case EMPLOYEE_ACTION.ADD:
          eventBus.$emit("openPopUp", this.dataPopUpAddEmployee);
          break;

        // chỉnh sửa thông tin nhân viên
        case EMPLOYEE_ACTION.EDIT:
          eventBus.$emit("openPopUp", this.dataPopUpEditEmployee);
          break;
      }
    },

    /**
     * Thêm mới dữ liệu
     * @author pthieu (21-07-2021)
     */
    postData: function () {
      axios({
        method: "POST",
        url: `http://cukcuk.manhnv.net/v1/Employees`,
        data: this.employee,
        contentType: "application/json",
        dataType: "json",
      })
        .then(() => {
          this.$toast(TOAST_TYPE.SUCCESS, "Thêm nhân viên thành công!");
        })
        .catch(() => {
          this.$toast(TOAST_TYPE.DANGER, "Có lỗi xảy ra, thêm mới thất bại!");
        })
        .finally(() => {
          this.$emit("closeModal");
          this.$emit("reloadTableData");
        });
    },

    /**
     * Chỉnh sửa dữ liệu
     * @author pthieu (21-07-2021)
     */
    putData: function () {
      this.employee.EmployeeId = this.dataEmployee.EmployeeId;
      axios({
        method: "PUT",
        url: `http://cukcuk.manhnv.net/v1/Employees/${this.employee.EmployeeId}`,
        data: this.employee,
        contentType: "application/json",
        dataType: "json",
      })
        .then(() => {
          this.$toast(TOAST_TYPE.SUCCESS, "Cập nhật thông tin thành công!");
        })
        .catch(() => {
          this.$toast(TOAST_TYPE.DANGER, "Có lỗi xảy ra, cập nhật thất bại!");
        })
        .finally(() => {
          this.$emit("closeModal");
          this.$emit("reloadTableData");
        });
    },
  },
};
</script>