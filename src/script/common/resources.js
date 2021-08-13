/**
 * Các câu thông báo
 */
export const RESOURCES = {
  ACTION_FAILED: "Có lỗi xảy ra!",
  DELETE_NO_SELECTED_RECORD: "Chưa chọn bản ghi!",
  DELETE_MANY: {
    CONFIRM: function(number) {
      return `Bạn có chắc muốn "Xóa ${number} bản ghi" hay không?`;
    },
    SUCCESS: function(number) {
      return `Xóa thành công ${number} bản ghi!`;
    },
  },
  LOAD_DATA: {
    SUCCESS: "Dữ liệu đã được cập nhật!",
    FAIL: "Có lỗi xảy ra, không thể cập nhật dữ liệu!",
  },
  GET_DATA: {
    FAIL: "Có lỗi xảy ra, không lấy được dữ liệu!",
  },
  GET_NEW_EMPLOYEE_CODE: {
    FAIL: "Không lấy được mã nhân viên mới!",
  },
  ADD_EMPLOYEE: {
    SUCCESS: "Thêm mới nhân viên thành công!",
    FAIL: "Có lỗi xảy ra, thêm mới thất bại!"
  },
  UPDATE_EMPLOYEE: {
    SUCCESS: "Cập nhật thông tin thành công!",
    FAIL: "Có lỗi xảy ra, cập nhật thất bại!"
  }  
}