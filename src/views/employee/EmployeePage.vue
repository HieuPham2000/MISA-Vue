<template>
  <div>

    <!-- form thông tin nhân viên chi tiết -->
    <EmployeeDetail
      v-if="showModal"
      :status="status"
      :dataEmployee="dataEmployee"
      :departments="departments"
      :positions="positions"
      @closeModal="closeModal"
      @reloadTableData="loadTableData(true)"
    />

    <!-- nội dung chi tiết của trang -->
    <div class="page" :class="{ expand: expand }">

      <!-- phần header: title, nút thêm nhân viên -->
      <div class="page-header">
        <div class="title">Danh sách nhân viên</div>
        <div class="feature">
          <BaseButton 
            id="btn-open-form"
            classes="m-btn"
            :isDisabled="isLoading"
            @clickBtn="openFormAdd"
          >
            <template v-slot:btn-icon>
              <div class="m-btn-icon icon-add"></div>
            </template>
            <template v-slot:btn-text>
              <div class="btn-text">Thêm nhân viên</div>
            </template>
          </BaseButton>
        </div>
      </div>
      <!-- end header -->

      <!-- phần toolbar: chứa ô search, combobox filter, các nút xóa, refresh -->
      <div class="toolbar">
        <!-- phần toolbar bên trái: chứa ô search, combobox filter -->
        <div class="toolbar-left">
          <!-- ô search -->
          <BaseSearchBox 
            v-model="employeeSearch"
            maxlength="255"
            :isDisabled="isLoading"
          />
          <!-- combobox filter theo phòng ban -->
          <BaseCombobox
            id="filter-department"
            dataId="DepartmentId"
            dataName="DepartmentName"
            v-model="departmentId"
            :comboboxData="departments"
            placeholder="Chọn/Nhập phòng ban"
            :extraItems="[{ DepartmentName: 'Tất cả phòng ban', DepartmentId: null }]"
            :isDisabled="isLoading"
          />
          <!-- combobox filter theo vị trí/chức vụ -->
          <BaseCombobox
            id="filter-position"
            dataId="PositionId"
            dataName="PositionName"
            v-model="positionId"
            :comboboxData="positions"
            placeholder="Chọn/Nhập vị trí"
            :extraItems="[{ PositionName: 'Tất cả vị trí', PositionId: null }]"
            :isDisabled="isLoading"
          />
        </div>

        <!-- phần toolbar bên phải: chứa button xóa, refresh -->
        <div class="toolbar-right">
          <!-- nút xóa nhân viên -->
          <BaseButton 
            id="btn-delete"
            classes="m-second-button"
            :isDisabled="isLoading"
            @clickBtn="clickBtnDelete"
          >
            <template v-slot:btn-icon>
              <i class="far fa-trash-alt"></i>
            </template>
          </BaseButton>
          <!-- nút refresh dữ liệu table -->
          <BaseButton 
            id="btn-refresh"
            classes="m-second-button m-btn-refresh"
            :isDisabled="isLoading"
            @clickBtn="loadTableData(true)"
          />
        </div>
      </div>
      <!-- end toolbar -->

      <!-- phần grid - table -->
      <TheGrid
        :entityId="entityId"
        :tableColumns="tableColumns"
        :startIndex="startRecord"
        :tableData="tableData"
        :selectedRows="selectedRows"
        :isLoading="isLoading"
        @openDetailForm="openFormEdit"
        @clickRow="onClickRow"
      />
      <!-- end grid table-->

      <!-- phần pagination -->
      <ThePagination
        :recordUnit="recordUnit"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :startRecord="startRecord"
        :totalRecords="totalRecords"
        :pageSize="pageSize"
        :pageSizeSelectItems="pageSizeSelectItems"
        @changePage="onChangePage"
        @changePageSize="onChangePageSize"
      />
      <!-- end pagination -->
    </div>
  </div>
</template>

<script>
import gridData from "@/script/page/employee-page";
import eventBus from "@/script/common/event-bus";
import { EMPLOYEE_ACTION, TOAST_TYPE } from "@/script/common/type";
import { POP_UP_EMPLOYEE, PAGE_SIZE_SELECT_ITEMS } from "@/script/common/constant";
import { RESOURCES } from "@/script/common/resources";
import employeeApi from "@/api/components/employee-api";
import positionApi from "@/api/components/position-api";
import departmentApi from "@/api/components/department-api";

import BaseCombobox from "@/components/base/BaseCombobox.vue";
import BaseSearchBox from "@/components/base/BaseSearchBox.vue";
import TheGrid from "@/components/layout/TheGrid.vue";
import ThePagination from "@/components/layout/ThePagination.vue";
import EmployeeDetail from "@/views/employee/EmployeeDetail.vue";
import BaseButton from '../../components/base/BaseButton.vue';

export default {
  components: {
    TheGrid,
    ThePagination,
    BaseButton,
    BaseCombobox,
    BaseSearchBox,
    EmployeeDetail,
  },

  // gridData chứa dữ liệu về các cột trong grid table (tiêu đề cột, độ rộng, style khác)
  mixins: [gridData],

  props: {
    // cờ trạng thái thu hẹp/mở rộng chiều rộng của page
    // true - mở rộng, fasle - thu hẹp
    expand: Boolean,
  },
  data() {
    return {
      // liên quan đến grid table
      // tên trường khóa chính
      entityId: "EmployeeId", 
      // dữ liệu danh sách nhân viên truyền cho table
      tableData: [],
      // mảng chứa id các hàng được click chọn
      selectedRows: [], 

      // liên quan đến form thông tin chi tiết
      // cờ chỉ định ẩn/hiển form 
      showModal: false,
      // dữ liệu nhân viên cụ thể (dùng để binding lên form)
      dataEmployee: {},
      // trạng thái hành động: thêm mới (add), chỉnh sửa (edit)
      status: EMPLOYEE_ACTION.ADD, 

      // liên quan search box
      // giá trị tìm kiếm
      employeeSearch: "",

      // liên quan đến combobox
      // dữ liệu danh sách phòng ban
      departments: [],
      // dữ liệu danh sách vị trí/chức vụ
      positions: [],

      // liên quan đến filter
      // giá trị id phòng ban muốn filter theo
      departmentId: null,
      // giá trị id vị trí/chức vụ muốn filter theo
      positionId: null,

      // liên quan paging
      // đơn vị bản ghi: nhân viên
      recordUnit: "nhân viên",
      // trang hiện tại
      currentPage: 1,
      // tổng số trang
      totalPages: 0,
      // tổng số bản ghi
      totalRecords: 0,
      // số bản ghi/trang
      pageSize: PAGE_SIZE_SELECT_ITEMS[0].id,
      // các options cho selectbox chọn số bản ghi/trang
      pageSizeSelectItems: PAGE_SIZE_SELECT_ITEMS,

      // dữ liệu về pop-up xóa nhân viên 
      dataPopUpDelete: { ...POP_UP_EMPLOYEE.DELETE }, 

      // cờ xác định trạng thái loading dữ liệu của trang
      // true - đang load dữ liệu, false - đã load xong
      isLoading: false,
    };
  },
  created() {
    // Tiến hành load dữ liệu danh sách nhân viên cho table
    this.loadTableData();

    // Load dữ liệu cho các combobox
    this.loadComboboxData();

    // Lắng nghe các sự kiện truyền qua eventBus
    // Lắng nghe sự kiện xóa nhân viên (kích hoạt khi confirm pop-up)
    eventBus.$on(EMPLOYEE_ACTION.DELETE, this.deleteEntities);
  },

  destroyed() {
    // Gỡ bỏ lắng nghe sự kiện
    eventBus.$off(EMPLOYEE_ACTION.DELETE, this.deleteEntities);
  },

  computed: {
    /**
     * Tính ra index của bản ghi đầu tiên (bắt đầu từ 0)
     * VD: ở trang 2, kích thước là 20 bản ghi/trang => bản ghi đầu tiên có index = 20
     */
    startRecord: function() {
      return (this.currentPage - 1)*this.pageSize;
    }
  },

  watch: {
    /**
     * Theo dõi id phòng ban (filter), vị trí/chức vụ (filter), giá trị tìm kiếm (search)
     * Và gọi hàm load để lấy về danh sách nhân viên tương ứng
     * truyền true => trở về trang 1
     */
    departmentId: function() {
      this.loadTableData(true);
    },
    positionId: function() {
      this.loadTableData(true);
    },
    employeeSearch:  function() {
      this.loadTableData(true);
    },

  },
  methods: {
    /**
     * Phương thức mở form thêm nhân viên mới
     * @author pthieu (17-07-2021)
     */
    openFormAdd: function () {
      // set cờ ở trạng thái "thêm mới" (ADD)
      this.status = EMPLOYEE_ACTION.ADD;

      // gọi api lấy mã nhân viên mới tự động
      employeeApi.getNewEmployeeCode()
        .then((res) => {
          // gán dữ liệu lấy được cho EmployeeCode
          // dataEmployee sẽ được truyền cho form để binding dữ liệu
          this.dataEmployee = { EmployeeCode: res.data };
        })
        .catch((err) => {
          console.log(err);
          // this.$toast(TOAST_TYPE.DANGER, RESOURCES.GET_NEW_EMPLOYEE_CODE.FAIL);
        })
        .finally(() => {
          // hiện form
          this.openModal();
        });
    },

    /**
     * Phương thức mở form chỉnh sửa thông tin nhân viên
     * @param {string} employeeId khóa chính
     * @author pthieu (17-07-2021)
     */
    openFormEdit: function (employeeId) {
      // chỉ highlight/selected hàng được chọn để chỉnh sửa
      // bỏ highlight/selected các hàng khác
      this.selectedRows = [employeeId];

      // set cờ ở trạng thái "chỉnh sửa" (EDIT)
      this.status = EMPLOYEE_ACTION.EDIT;
      // gọi api lấy dữ liệu nhân viên theo khóa chính
      employeeApi.getEntityById(employeeId)
        .then((res) => {
          // gán dữ liệu lấy được cho dataEmployee để binding lên form
          this.dataEmployee = res.data;

          // kiểm tra nếu có dữ liệu thì mới mở form
          // ngược lại sẽ báo lỗi và load lại table
          if (this.dataEmployee) {
            this.openModal();
          } else {
            this.$toast( TOAST_TYPE.DANGER, RESOURCES.GET_DATA.FAIL);
            this.loadTableData();
          }
        })
        .catch((error) => {
          console.log(error);
          this.$toast( TOAST_TYPE.DANGER, RESOURCES.GET_DATA.FAIL);
          this.loadTableData();
        });
    },

    /**
     * Phương thức mở form
     * @author pthieu (17-07-2021)
     */
    openModal: function () {
      this.showModal = true;
    },
    /**
     * Phương thức đóng form
     * @author pthieu (17-07-2021)
     */
    closeModal: function () {
      this.showModal = false;
    },

    /**
     * Phương thức load dữ liệu danh sách nhân viên 
     * (kèm theo tiêu chí phân trang, filter, search)
     * @param {Boolean} goToFirstPage 
     * true - trở về trang 1, false (mặc định) - giữ nguyên trang hiện tại
     * @author pthieu (28-07-2021)
     */
    loadTableData: function(goToFirstPage = false) {

      // set cờ trạng thái đang loading dữ liệu
      this.isLoading = true;

      // dựa trên tham số đầu vào
      // true - trở về trang 1, false - giữ nguyên trang hiện tại
      if(goToFirstPage) {
        this.currentPage = 1;
      }

      // gọi api lấy danh sách nhân viên theo các tiêu chí phân trang, lọc, tìm kiếm
      employeeApi.getEntitiesFilter(this.pageSize, this.startRecord, this.departmentId, this.positionId, this.employeeSearch)
      .then((res) => {
       
          if(res.status === 200) {
            this.totalPages = res.data.TotalPages;
            this.totalRecords = res.data.TotalRecords;
            this.tableData = res.data.Data;
          } else {
            this.totalPages = 1;
            this.totalRecords = 0;
            this.tableData = [];
          }
          
        })
      .catch((err) => {
          console.log(err);
        })
      .finally(() => {
        // tắt cờ loading
        // timeout 600ms để có thời gian cho modal loading hiển thị 
        // (TH load dữ liệu quá nhanh, modal vừa xuất hiện lại biến mất ngay => xấu)
        setTimeout(() => (this.isLoading = false), 600);
      });
    },

    /**
     * Phương thức xử lý khi nhấn nút xóa nhân viên
     * @author pthieu (21-07-2021)
     */
    clickBtnDelete: function () {

      // lấy ra số lượng các bản ghi được chọn
      var len = this.selectedRows.length;
      if (len == 0) {
        // TH chưa chọn bản ghi nào => thông báo "Chưa chọn..."
        this.$toast(TOAST_TYPE.DANGER, RESOURCES.DELETE_NO_SELECTED_RECORD);
      } else {
        // TH đã chọn bản ghi => hiện pop up yêu cầu xác nhận
        this.dataPopUpDelete.content = RESOURCES.DELETE_MANY.CONFIRM(len);
        // dùng eventBus để truyền sự kiện hiển thị pop-up
        eventBus.$emit("openPopUp", this.dataPopUpDelete);
      }
    },

    /**
     * Phương thức xóa nhân viên
     * @author pthieu (21-07-2021)
     */
    deleteEntities: function () {
      // lấy ra số lượng các bản ghi được chọn
      var len = this.selectedRows.length;
      Promise.all(
        // Xóa lần lượt
        this.selectedRows.map((employeeId) => employeeApi.deleteEntity(employeeId))
      )
      .then(() => {
        this.selectedRows = [];
        this.$toast(TOAST_TYPE.SUCCESS, RESOURCES.DELETE_MANY.SUCCESS(len));
      })
      .catch(() => {
        this.$toast(TOAST_TYPE.DANGER, RESOURCES.ACTION_FAILED);
      })
      .finally(() => {
        // Luôn load lại dữ liệu
        this.loadTableData();
      });
    },

    /**
     * Phương thức load dữ liệu combobox
     * @author pthieu (28-07-2021)
     */
    loadComboboxData: function() {
      // lấy danh sách phòng ban
      departmentApi.getAllEntities()
        .then((res) => {
          this.departments = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
      // lấy danh sách vị trí/chức vụ
      positionApi.getAllEntities()
        .then((res) => {
          this.positions = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * Phương thức xử lý sự kiện thay đổi trang
     * @param {Number} page trang chuyển đến
     * @author pthieu (31-07-2021)
     */
    onChangePage(page) {
      this.currentPage = page;
      this.loadTableData();
    },

    /**
     * Phương thức xử lý sự kiện thay đổi số bản ghi/trang
     * @param {Number} pageSize số bản ghi/trâng
     * @author pthieu (31-07-2021)
     */
    onChangePageSize(pageSize) {
      this.pageSize = pageSize;
      // về trang đầu + load dữ liệu
      this.loadTableData(true);
    },

    /**
     * Phương thức xử lý sự kiện click chọn bản ghi
     * @param {String} id id/khóa chính của bản ghi
     * @author pthieu (16-07-2021)
     */
    onClickRow: function (id) {
      // Tìm xem id đã có trong danh sách được chọn chưa
      var index = this.selectedRows.indexOf(id);
      if (index == -1) {
        // Nếu chưa thì thêm vào danh sách được chọn
        this.selectedRows.push(id);
      } else {
        // Nếu đã có thì loại bỏ khỏi danh sách được chọn
        this.selectedRows.splice(index, 1);
      }
    },

  },
};
</script>

<style>
@import "../../css/layout/layout.css";
</style>
