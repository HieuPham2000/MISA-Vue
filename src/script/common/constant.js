import {POPUP_TYPE, EMPLOYEE_ACTION} from './type'

/**
 * fix dữ liệu cho selectbox nhà hàng
 */
export const RESTAURANT_SELECT_ITEMS = [
  {id: 1, text: "Nhà hàng Biển Đông"},
  {id: 2, text: "Nhà hàng Biển Tây"},
  {id: 3, text: "Nhà hàng Biển Nam"},
  {id: 4, text: "Nhà hàng Biển Bắc"}
];

/**
 * fix dữ liệu cho selectbox số bản ghi/trang
 */
export const PAGE_SIZE_SELECT_ITEMS = [
  {id: 20, text: "20 nhân viên/trang"},
  {id: 30, text: "30 nhân viên/trang"},
  {id: 40, text: "40 nhân viên/trang"},
];

/**
 * fix dữ liệu Giới tính
 */
export const FIXED_DATA_GENDER = [
  {id: 0, text: "Nữ"},
  {id: 1, text: "Nam"},
  {id: 2, text: "Khác"}
];

/**
 * fix dữ liệu trạng thái công việc
 */
export const FIXED_DATA_WORK_STATUS = [
  {id: 0, text: "Đang làm việc"},
  {id: 1, text: "Đang thực tập"},
  {id: 2, text: "Đã nghỉ việc"},
  {id: 3, text: "Đã nghỉ hưu"}
];

/**
 * Dữ liệu pop-up liên quan đến employee
 */
export const POP_UP_EMPLOYEE = {
  INFO: {
    type: POPUP_TYPE.INFO,
    title: "Thông báo",
    content: '',
    btnDo: "Đóng",
    actionDo: EMPLOYEE_ACTION.FOCUS_ITEM,
  },
  CLOSE_FORM: {
    type: POPUP_TYPE.WARNING,
    title: "Đóng biểu mẫu",
    content: 'Bạn có chắc muốn "Đóng biểu mẫu" hay không?',
    btnCancel: "Tiếp tục nhập",
    btnDo: "Đóng",
    actionDo: EMPLOYEE_ACTION.CLOSE_FORM,
  },
  ADD: {
    type: POPUP_TYPE.INFO,
    title: "Thêm nhân viên mới",
    content: 'Bạn có chắc muốn "Thêm nhân viên mới" hay không?',
    btnCancel: "Hủy",
    btnDo: "Thêm",
    actionDo: EMPLOYEE_ACTION.ADD,
  },
  EDIT: {
    type: POPUP_TYPE.INFO,
    title: "Cập nhật thông tin nhân viên",
    content: 'Bạn có chắc muốn "Cập nhật thông tin nhân viên" hay không?',
    btnCancel: "Hủy",
    btnDo: "Cập nhật",
    actionDo: EMPLOYEE_ACTION.EDIT,
  },
  DELETE: { 
    type: POPUP_TYPE.DANGER,
    title: "Xóa bản ghi",
    content: 'Bạn có chắc muốn "Xóa bản ghi" hay không?',
    btnCancel: "Hủy",
    btnDanger: "Xóa",
    actionDo: EMPLOYEE_ACTION.DELETE
  } 
}