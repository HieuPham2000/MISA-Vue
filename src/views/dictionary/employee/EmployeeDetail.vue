<template>
  <div class="modal-container">
    <!-- form modal -->
    <div class="form-modal">
      <form id="form-employee" method="POST" action="#" autocomplete="off">
        <!-- button x -->
        <div class="form-icon-close">
          <img src="../../../assets/icon/x.svg">
        </div>
        <!-- end button x -->

        <div class="form-title">Thông tin nhân viên</div>
        <!-- form content -->
        <div class="form-content">
          <!-- avatar -->
          <div class="form-content-left">
            <div class="avatar"></div>
            <p class="image-format">(Vui lòng chọn ảnh có định dạng<br>.jpg, .jpeg, .png, .gif.)</p>
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
                  <input type="text" name="EmployeeCode" placeholder="Nhập mã nhân viên" maxlength="20"
                    class="autofocus" autofocus required>
                </div>
                <div class="form-item">
                  <label for="FullName">Họ và tên (<span>*</span>)</label>
                  <input type="text" name="FullName" placeholder="Nhập họ và tên" maxlength="100" required>
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="DateOfBirth">Ngày sinh</label>
                  <input date type="date" name="DateOfBirth" formattype="yyyy-mm-dd" class="text-align-center">
                </div>
                <div class="form-item">
                  <label for="Gender">Giới tính</label>
                  <!-- <m-combobox id="cbx-gender-form" 
                  name="Gender" placeholder="Chọn/Nhập giới tính" 
                  data-name="Gender"></m-combobox> -->
                  <div id="cbx-gender-form" class="m-combobox" data-name="Gender">
                    <input class="m-combobox__input" type="text" placeholder="Chọn/Nhập giới tính" name="Gender" formattype="m-combobox">
                    <div class="m-combobox__btn" tabindex="-1"><i class="fas fa-chevron-down"></i></div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityNumber">Số CMTND/ Căn cước (<span>*</span>)</label>
                  <input number type="text" name="IdentityNumber" placeholder="Nhập số CMTND/ Căn cước" maxlength="12" required>
                </div>
                <div class="form-item">
                  <label for="IdentityDate">Ngày cấp</label>
                  <input date type="date" name="IdentityDate" formattype="yyyy-mm-dd" class="text-align-center">
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="IdentityPlace">Nơi cấp</label>
                  <input type="text" name="IdentityPlace" placeholder="Nhập nơi cấp" maxlength="100">
                </div>
              </div>
              <!-- end row -->

              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="Email">Email (<span>*</span>)</label>
                  <input email type="email" name="Email" placeholder="Nhập email" maxlength="320" required>
                </div>
                <div class="form-item">
                  <label for="PhoneNumber">Số điện thoại (<span>*</span>)</label>
                  <input phone type="tel" name="PhoneNumber" placeholder="Nhập số điện thoại" maxlength="30" required>
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
                  <div id="cbx-position-form" class="m-combobox" data-name="Position">
                    <input class="m-combobox__input" type="text" placeholder="Chọn/Nhập vị trí" name="PositionId" formattype="m-combobox">
                    <div class="m-combobox__btn" tabindex="-1"><i class="fas fa-chevron-down"></i></div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
                <div class="form-item">
                  <label for="DepartmentId">Phòng ban</label>
                  <!-- <m-combobox id="cbx-department-form" 
                  name="DepartmentName" placeholder="Chọn/Nhập phòng ban" 
                  data-name="Department"></m-combobox> -->
                  <div id="cbx-department-form" class="m-combobox" data-name="Department">
                    <input class="m-combobox__input" type="text" placeholder="Chọn/Nhập phòng ban" name="DepartmentId" formattype="m-combobox">
                    <div class="m-combobox__btn" tabindex="-1"><i class="fas fa-chevron-down"></i></div>
                    <ul class="m-combobox__dropdown"></ul>
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="PersonalTaxCode">Mã số thuế</label>
                  <input number type="text" name="PersonalTaxCode" placeholder="Nhập mã số thuế" maxlength="13">
                </div>
                <div class="form-item">
                  <label for="Salary">Mức lương cơ bản</label>
                  <div class="money-input-container">
                    <input number salary id="salary" type="text" name="Salary" maxlength="14" class="text-align-right"
                      placeholder="Nhập mức lương cơ bản" formattype="salary">
                  </div>
                </div>
              </div>
              <!-- end row -->
              <!-- row -->
              <div class="row">
                <div class="form-item">
                  <label for="JoinDate">Ngày gia nhập công ty</label>
                  <input date type="date" name="JoinDate" formattype="yyyy-mm-dd" class="text-align-center">
                </div>
                <div class="form-item">
                  <label for="WorkStatus">Tình trạng công việc</label>
                  <!-- <m-combobox id="cbx-workstatus-form" 
                    name="WorkStatus" placeholder="Chọn/Nhập tình trạng công việc" 
                    data-name="WorkStatus"></m-combobox> -->
                  <div id="cbx-workstatus-form" class="m-combobox" data-name="WorkStatus">
                    <input class="m-combobox__input" type="text" placeholder="Chọn/Nhập tình trạng công việc" name="WorkStatus" formattype="m-combobox">
                    <div class="m-combobox__btn" tabindex="-1"><i class="fas fa-chevron-down"></i></div>
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
          <button type="button" class="m-btn-default m-btn-cancel" tabindex="0">Hủy</button>
          <button type="button" id="btn-submit" class="m-btn m-btn-default" tabindex="0">
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
  @import '../../../css/page/form-employee.css';
</style>

<script>
export default {
  name: "EmployeeDetail"
}
</script>