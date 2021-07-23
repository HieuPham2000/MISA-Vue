export const TOAST_TYPE = {
  DANGER: "danger",
  WARNING: "warning",
  SUCCESS: "success",
  INFO: "info"
}
export const POPUP_TYPE = {
  DANGER: "danger",
  WARNING: "warning",
  INFO: "info"
}

export const EMPLOYEE_ACTION = {
  ADD: "ADD_EMPLOYEE",
  EDIT: "EDIT_EMPLOYEE",
  DELETE: "DELETE_EMPLOYEE",
  CLOSE_FORM: "CLOSE_FORM",
}

export const VALIDATE = {
  REQUIRED: {
    TYPE: "REQUIRED",
    NOTICE: "Thông tin không được để trống!",
  },
  EMAIL: {
    TYPE: "EMAIL",
    NOTICE: "Định dạng email không đúng!",
    PATTERN: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  PHONE_NUMBER: {
    TYPE: "PHONE_NUMBER",
    NOTICE: "Định dạng số điện thoại không đúng!",
    PATTERN: /^[+\d]?(?:[\d-.\s()]*)$/
  },
  COMBO_BOX: {
    TYPE: "COMBO_BOX",
    NOTICE: "Giá trị nhập vào không tồn tại!"
  }
}