import BaseAPI from "@/api/base/base-api";

/**
 * Lớp cung cấp các phương thức thao tác dữ liệu Position (Vị trí/chức vụ)
 */
class PositionAPI extends BaseAPI {

  constructor() {
    super();
    this.controller = "api/v1/positions";
  }

}

export default new PositionAPI();