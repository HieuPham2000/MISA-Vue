<template>
  <div class="modal-container">
    <!-- form thông tin chi tiết-->
    <div class="form-modal">
      <form id="form-employee" autocomplete="off" @submit.prevent>
        <!-- button x -->
        <button 
          type="button" 
          class="form-icon-close" 
          @click="clickBtnClose" 
          tabindex="0"
          :disabled="isProcessing"
        ></button>

        <!-- tiêu đề form -->
        <div class="form-title">Thông tin nhân viên</div>

        <!-- nội dung form -->
        <div class="form-content">

          <!-- phần chọn avatar -->
          <div class="form-content-left">
            <div class="avatar"></div>
            <p class="image-format">
              (Vui lòng chọn ảnh có định dạng<br />.jpg, .jpeg, .png, .gif.)
            </p>
          </div>

          <!-- phần nội dung chi tiết -->
          <div class="form-content-right">
            <!-- phần nội dung 1 -->
            <div class="content-part">
              <div class="part-title">A. Thông tin chung:</div>
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="EmployeeCode">Mã nhân viên (<span class="required-field">*</span>)</label>
                  <BaseTextInput
                    ref="EmployeeCode"
                    v-model="employee.EmployeeCode"
                    placeholder="Nhập mã nhân viên"
                    maxlength="20"
                    :isRequired="true"
                    :autofocus="true"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="FullName">Họ và tên (<span class="required-field">*</span>)</label>
                  <BaseTextInput
                    ref="FullName"
                    v-model="employee.FullName"
                    placeholder="Nhập họ và tên"
                    maxlength="100"
                    :isRequired="true"
                    :isDisabled="isProcessing"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="DateOfBirth">Ngày sinh</label>
                  <BaseDatePickerInput
                    ref="DateOfBirth"
                    v-model="employee.DateOfBirth"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="Gender">Giới tính</label>
                  <BaseCombobox
                    ref="Gender"
                    v-model="employee.Gender"
                    placeholder="Chọn/Nhập giới tính"
                    maxlength="50"
                    id="cbx-gender-form"
                    dataId="id"
                    dataName="text"
                    :comboboxData="fixedDataGender"
                    :isDisabled="isProcessing"
                  />
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityNumber"
                    >Số CMTND/ Căn cước (<span class="required-field">*</span>)</label
                  >
                  <BaseTextInput
                    ref="IdentityNumber"
                    type="number"
                    v-model="employee.IdentityNumber"
                    placeholder="Nhập số CMTND/ Căn cước"
                    maxlength="25"
                    :isRequired="true"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="IdentityDate">Ngày cấp</label>
                  <BaseDatePickerInput
                    ref="IdentityDate"
                    v-model="employee.IdentityDate"
                    :isDisabled="isProcessing"
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
                    maxlength="255"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <!-- <label for="Address">Địa chỉ</label>
                  <BaseTextInput
                    ref="Address"
                    v-model="employee.Address"
                    placeholder="Nhập địa chỉ nơi ở"
                    maxlength="255"
                  /> -->
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="Email">Email (<span class="required-field">*</span>)</label>
                  <BaseTextInput
                    ref="Email"
                    v-model="employee.Email"
                    placeholder="Nhập email"
                    maxlength="100"
                    :isRequired="true"
                    :format="validate.EMAIL.TYPE"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="PhoneNumber">Số điện thoại (<span class="required-field">*</span>)</label>
                  <BaseTextInput
                    ref="PhoneNumber"
                    v-model="employee.PhoneNumber"
                    placeholder="Nhập số điện thoại"
                    maxlength="50"
                    :isRequired="true"
                    :format="validate.PHONE_NUMBER.TYPE"
                    :isDisabled="isProcessing"
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
                    v-model="employee.PositionId"
                    placeholder="Chọn/Nhập vị trí"
                    maxlength="100"
                    id="cbx-position-form"
                    dataId="PositionId"
                    dataName="PositionName"
                    :comboboxData="positions"
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="DepartmentId">Phòng ban</label>
                  <BaseCombobox
                    ref="DepartmentId"
                    v-model="employee.DepartmentId"
                    placeholder="Chọn/Nhập phòng ban"
                    maxlength="255"
                    id="cbx-department-form"
                    dataId="DepartmentId"
                    dataName="DepartmentName"
                    :comboboxData="departments"
                    :isDisabled="isProcessing"
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
                    maxlength="25"
                    :isDisabled="isProcessing"
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
                      :isDisabled="isProcessing"
                    />
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="JoinDate">Ngày gia nhập công ty</label>
                  <BaseDatePickerInput 
                    ref="JoinDate" 
                    v-model="employee.JoinDate" 
                    :isDisabled="isProcessing"
                  />
                </div>
                <div class="form-item">
                  <label for="WorkStatus">Tình trạng công việc</label>
                  <BaseCombobox
                    ref="WorkStatus"
                    v-model="employee.WorkStatus"
                    placeholder="Chọn/Nhập tình trạng công việc"
                    maxlength="255"
                    id="cbx-workstatus-form"
                    dataId="id"
                    dataName="text"
                    :comboboxData="fixedDataWorkStatus"
                    :showAbove="true"
                    :isDisabled="isProcessing"
                  />
                </div>
              </div>
              <!-- end row -->
            </div>
            <!-- end part -->
          </div>
        </div>
        <!-- end form content -->

        <!-- phần form footer -->
        <div class="form-footer">
          <!-- nút hủy -->
          <BaseButton
            classes="m-btn-default m-btn-cancel"
            :isDisabled="isProcessing"
            @clickBtn="clickBtnClose"
          >
            <template v-slot:btn-text>
              Hủy
            </template>
          </BaseButton>
          <!-- nút lưu -->
           <BaseButton
            classes="m-btn m-btn-default"
            :isDisabled="isProcessing"
            @clickBtn="clickBtnSubmit"
          >
            <template v-slot:btn-icon>
              <i class="far fa-save"></i>
            </template>
            <template v-slot:btn-text>
              Lưu
            </template>
          </BaseButton>
        </div>
        <!-- end form footer -->
      </form>
      <BaseLoading :text="loadingText" v-show="isProcessing"/>
    </div>
    <!-- end form modal -->
  </div>
</template>

<script>
import { EMPLOYEE_ACTION, TOAST_TYPE, VALIDATE } from "@/script/common/type";
import { FIXED_DATA_GENDER, FIXED_DATA_WORK_STATUS, POP_UP_EMPLOYEE } from "@/script/common/constant";
import { RESOURCES } from '@/script/common/resources';

import eventBus from "@/script/common/event-bus";
import employeeApi from "@/api/components/employee-api";
import employee from "@/script/page/employee-detail";

import BaseCombobox from "@/components/base/BaseCombobox.vue";
import BaseTextInput from "@/components/base/BaseTextInput.vue";
import BaseDatePickerInput from "@/components/base/BaseDatePickerInput.vue";
import BaseButton from '../../components/base/BaseButton.vue';
import BaseLoading from '../../components/base/BaseLoading.vue';

export default {
  components: { BaseCombobox, BaseTextInput, BaseDatePickerInput, BaseButton, BaseLoading },
  props: {
    // dữ liệu nhân viên 
    dataEmployee: Object,
    // trạng thái: ADD, EDIT
    status: String, 
    // danh sách phòng ban
    departments: Array,
    // danh sách vị trí/chức vụ
    positions: Array,
  },
  // object chứa đầy đủ các trường dữ liệu của nhân viên
  mixins: [employee], 
  data() {
    return {
      // dữ liệu fix cho combobox giới tính, tình trạng công việc
      fixedDataGender: FIXED_DATA_GENDER,
      fixedDataWorkStatus: FIXED_DATA_WORK_STATUS,

      // các hằng mô tả kiểu validate (email, phone number)
      validate: VALIDATE,

      // dữ liệu pop-up
      dataPopUpCloseForm: { ...POP_UP_EMPLOYEE.CLOSE_FORM },
      dataPopUpAddEmployee: { ...POP_UP_EMPLOYEE.ADD },
      dataPopUpEditEmployee: { ...POP_UP_EMPLOYEE.EDIT },

      // biến lưu lại dữ liệu employee
      // dùng để kiểm tra người dùng có thay đổi bất kỳ trường dữ liệu nào không
      oldEmployeeData: null,

      // set trạng thái processing
      isProcessing: false,
      loadingText: "Đang xử lý",
    };
  },
  created() {
    // set giá trị cho object employee 
    // với dữ liệu nhân viên nhận từ prop dataEmployee
    for (var fieldName in this.employee) {
      var value = this.dataEmployee[fieldName];
      if (value != undefined && value != null) {
        this.employee[fieldName] = value;
      }
      // else {
      //   this.employee[fieldName] = null;
      // }
    }

    // Lưu lại giá trị employee
    // Để làm căn cứ kiểm tra xem người dùng có chỉnh sửa dữ liệu không
    this.oldEmployeeData = JSON.parse(JSON.stringify(this.employee));

    // Lắng nghe sự kiện qua eventBus

    // Các sự kiện này được kích hoạt khi confirm pop-up
    eventBus.$on(EMPLOYEE_ACTION.ADD, this.addEmployee);
    eventBus.$on(EMPLOYEE_ACTION.EDIT, this.editEmployee);
    eventBus.$on(EMPLOYEE_ACTION.CLOSE_FORM, this.closeForm);

    eventBus.$on(EMPLOYEE_ACTION.FOCUS_ITEM, this.focusFormItem);
  },
  destroyed() {
    // Hủy bỏ lắng nghe sự kiện
    eventBus.$off(EMPLOYEE_ACTION.ADD, this.addEmployee);
    eventBus.$off(EMPLOYEE_ACTION.EDIT, this.editEmployee);
    eventBus.$off(EMPLOYEE_ACTION.CLOSE_FORM, this.closeForm);
    eventBus.$off(EMPLOYEE_ACTION.FOCUS_ITEM, this.focusFormItem);
  },
  methods: {
    /**
     * Phương thức Kiểm tra người dùng có thay đổi dữ liệu hay không.
     * @returns {Boolean} true - có thay đổi, false - không thay đổi
     * @author pthieu (1-8-2021)
     */
    isChangedData: function() {
      // chú ý kiểm tra theo dạng chuỗi json sẽ xét cả thứ tự các trường
      return JSON.stringify(this.oldEmployeeData) !== JSON.stringify(this.employee)
    },

    /**
     * Phương thức cho phép focus vào 1 item dựa trên ref
     * @param {string} formItemRef giá trị ref
     * @author pthieu (06-08-2021)
     */
    focusFormItem: function(formItemRef) {
      var formItem = this.$refs[formItemRef];
      // Nếu tồn tại formItem
      // và phần tử này có phương thức focusInput
      if (formItem && formItem.focusInput) {
        formItem.focusInput();
      }
    },

    /**
     * Phương thức xử lý khi click nút đóng form.
     * @author pthieu (21-07-2021)
     */
    clickBtnClose: function () {
      // nếu dữ liệu bị thay đổi thì hiện pop-up yêu cầu xác nhận
      if(this.isChangedData() === true) {
        eventBus.$emit("openPopUp", this.dataPopUpCloseForm);
      } 
      // nếu dữ liệu không bị thay đổi thì đóng form luôn
      else {
        this.closeForm();
      }
    },

    /**
     * Phương thức thực hiện đóng form.
     * @author pthieu (16-07-2021)
     */
    closeForm: function () {
      this.$emit("closeModal");
    },

    /**
     * Phương thức xử lý khi click nút submit form.
     * @author pthieu (21-07-2021)
     */
    clickBtnSubmit: function () {

      // thực hiện validate
      // duyệt qua tất cả các input (dựa vào ref)
      for (var name in this.$refs) {
        // lấy ra phần tử dựa trên ref
        var formItem = this.$refs[name];
        // nếu phần tử có phương thức focusInput,
        // có phương thức validateInput + validate thất bại:
        // => focus vào phần tử đó
        if (formItem.validateInput && formItem.focusInput && !formItem.validateInput()) {
          formItem.focusInput();
          return;
        }
      }

      // dựa trên cờ status (ADD, EDIT) để quyết định hành động
      switch (this.status) {
        // TH thêm nhân viên mới
        case EMPLOYEE_ACTION.ADD:
          // hiện pop-up xác nhận
          // eventBus.$emit("openPopUp", this.dataPopUpAddEmployee);
          this.addEmployee();
          break;

        // TH chỉnh sửa thông tin nhân viên
        case EMPLOYEE_ACTION.EDIT:
           // Kiểm tra dữ liệu có bị thay đổi không
           // nếu không => đóng form ngay
          if(this.isChangedData() === false) {
            this.closeForm();
            return;
          }
          // nếu có => hiện pop-up xác nhận
          eventBus.$emit("openPopUp", this.dataPopUpEditEmployee);
          break;
      }
    },

    /**
     * Phương thức hiển thị thông báo lỗi dựa trên response phía server
     * @param {object} error lỗi trả về từ phía server
     * @author pthieu (09-08-2021)
     */
    showServerResponseError(error) {
      console.log(error.response)
      var response = error.response;

      // dựa vào thông tin lỗi trả về để hiện thông báo cho người dùng
      if (response && response.status == 400 && response.data.UserMsg) {
        eventBus.$emit("openPopUp", {...POP_UP_EMPLOYEE.INFO, content: response.data.UserMsg}, response.data.Data);
        // this.$toast(TOAST_TYPE.DANGER, error.response.data.UserMsg);
        // if(response.data.Data) {
        //   this.focusFormItem(response.data.Data);
        // }
      }
    },
    /**
     * Phương thức thực hiện Thêm mới dữ liệu
     * @author pthieu (21-07-2021)
     */
    addEmployee: function () {
      // thiết lập trạng thái đang xử lý
      this.isProcessing = true;

      // gọi api thêm nhân viên mới
      employeeApi.postEntity(this.employee)
        .then(() => {
          // toast msg thông báo thêm mới thành công
          this.$toast(TOAST_TYPE.SUCCESS, RESOURCES.ADD_EMPLOYEE.SUCCESS);
          // đóng form và reload dữ liệu table
          this.$emit("closeModal");
          this.$emit("reloadTableData");
        })
        .catch((error) => {
          // dựa vào thông tin lỗi trả về để hiện thông báo cho người dùng
          this.showServerResponseError(error);
        })
        .finally(() => {
          this.isProcessing = false;
        })
    },

    /**
     * Phương thức thực hiện chỉnh sửa dữ liệu
     * @author pthieu (21-07-2021)
     */
    editEmployee: function () {
      // gán khóa chính
      // this.employee.EmployeeId = this.dataEmployee.EmployeeId;

      // thiết lập trạng thái đang xử lý
      this.isProcessing = true;

      // gọi api cập nhật dữ liệu nhân viên
      // employeeApi.putEntity(this.employee.EmployeeId, this.employee)
      employeeApi.putEntity(this.dataEmployee.EmployeeId, this.employee)
        .then(() => {
          // toast mssg thông báo cập nhật thành công
          this.$toast(TOAST_TYPE.SUCCESS, RESOURCES.UPDATE_EMPLOYEE.SUCCESS);
          // đóng form và reload dữ liệu
          this.$emit("closeModal");
          this.$emit("reloadTableData");
        })
        .catch((error) => {
          // dựa vào thông tin lỗi trả về để hiện thông báo cho người dùng
          this.showServerResponseError(error);
        })
        .finally(() => {
          this.isProcessing = false;
        })
    },
  },
};
</script>

<style scoped>
@import "../../css/page/form-employee.css";
</style>