import BaseAPI from "@/api/base/base-api";
import BaseAPIConfig from "@/api/base/base-api-config";

/**
 * Lớp cung cấp các phương thức thao tác dữ liệu Employee (Nhân viên)
 */
class EmployeeAPI extends BaseAPI {

  constructor() {
    super();
    this.controller = "api/v1/Employees";
    this.newEmployeeCodeAPI = "NewEmployeeCode"
    this.employeeFilterAPI = "EmployeeFilter"
  }

  /**
   * Phương thức lấy mã nhân viên mới
   * @returns {promise} kết quả thực hiện
   * @author pthieu (28-07-2021)
   */
  getNewEmployeeCode() {
    return BaseAPIConfig.get(`${this.controller}/${this.newEmployeeCodeAPI}`);
  }

  /**
   * Phương thức lấy dữ liệu nhân viên theo các tiêu chí lọc/phân trang
   * @param {Number} pageSize số bản ghi/trang
   * @param {Number} pageIndex offset/index bản ghi đầu tiên của trang 
   * @param {string} departmentId id phòng ban
   * @param {string} positionId id vị trí/chức vụ
   * @param {string} employeeFilter xâu tìm kiếm 
   * @returns {promise} kết quả thực hiện
   * @author pthieu (28-07-2021)
   */
  getEntitiesFilter(pageSize, pageIndex, departmentId = null, positionId = null, employeeFilter = null) {
    var parameters = {
      pageSize,
      pageIndex,
    }
    if(departmentId) {
      parameters.departmentId = departmentId;
    }
    if(positionId) {
      parameters.positionId = positionId;
    }
    if(employeeFilter !== "" && employeeFilter !== undefined && employeeFilter !== null) {
      parameters.employeeFilter = employeeFilter;
    }
    return BaseAPIConfig.get(`${this.controller}/${this.employeeFilterAPI}`, {params: parameters});
  }
}

export default new EmployeeAPI();