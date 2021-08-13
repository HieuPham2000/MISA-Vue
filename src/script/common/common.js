import {FIXED_DATA_WORK_STATUS} from './constant'
export class CommonFunction {

  /**
   * Định dạng dữ liệu lấy từ loadData, nếu null hoặc undefined thì trả về ""
   * @param {*} data 
   * @returns {*} data hoặc ""
   * @author pthieu (06-07-2021)
   */
  static formatData(data) {
    if (data == null || data == undefined) {
      return "";
    }
    return data;
  }

  /** 
   * Format dữ liệu ngày tháng theo định dạng dd/mm/yyyy
   * @param {string} date dữ liệu thời gian lấy từ API
   * @returns {string} xâu định dạng ngày tháng dd/mm/yyyy
   * @author pthieu (05-07-2021)
   */
  static formatDateDDMMYYYY(date) {
    if (!date) {
      return '';
    }
    let dateOrigin = new Date(date);

    // lấy ra ngày và format để luôn có 2 chữ số
    let day = dateOrigin.getDate();
    day = day > 9 ? day : `0${day}`;

    // lấy ra tháng và format để luôn có 2 chữ số
    // chú ý: getMonth() thì tháng bắt đầu từ 0
    let month = dateOrigin.getMonth() + 1; 
    month = month > 9 ? month : `0${month}`;

    // lấy ra năm
    let year = dateOrigin.getFullYear();

    // trả về kết quả dạng DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }

  /** 
   * Format dữ liệu ngày tháng theo định dạng yyyy-mm-dd
   * @param {string} date dữ liệu thời gian lấy từ API
   * @returns {string} xâu định dạng ngày tháng yyyy-mm-dd
   * @author pthieu (05-07-2021)
   */
  static formatDateYYYYMMDD(date) {
   
    if (!date) {
      return '';
    }
    let dateOrigin = new Date(date);

    // lấy ra ngày và format để luôn có 2 chữ số
    let day = dateOrigin.getDate();
    day = day > 9 ? day : `0${day}`;

    // lấy ra tháng và format để luôn có 2 chữ số
    // chú ý: getMonth() thì tháng bắt đầu từ 0
    let month = dateOrigin.getMonth() + 1;
    month = month > 9 ? month : `0${month}`;

    // lấy ra năm và format để luôn có 4 chữ số
    let year = dateOrigin.getFullYear();
    if(year < 10) {
      year = `000${year}`;
    } else if(year < 100) {
      year = `00${year}`;
    } else if(year < 1000) {
      year = `0${year}`;
    }

    // trả về kết quả dạng YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  /**
   * Định dạng tiền lương theo dạng xxx.xxx.xxx
   * @param {string} value giá trị tiền
   * @returns {string} xâu định dang xxx.xxx.xxx
   * @author pthieu (06-07-2021)
   */
  static formatMoney(value) {
    if(!value || isNaN(value)) {
      return null;
    }
    // Chú ý: Number(null) => 0
    return Number(value).toLocaleString("it-IT");
  }

  /**
   * Loại bỏ dấu phân tách trong giá trị tiền
   * @param {*} money giá trị tiền có dấu phân tách
   * @returns giá trị tiền đã loại bỏ dấu phân tách
   * @author pthieu (19-07-2021)
   */
  static normalizeMoney(money) {
    if(!money) {
      return null;
    }
    return money.toString().replaceAll(",", "").replaceAll(".", "");
  }

  /**
   * Chuyển giá trị work status dạng số sang xâu mô tả tương ứng
   * @param {number} workStatus 
   * @returns {string} xâu mô tả
   * @author pthieu (06-07-2021)
   */
  static formatWorkStatus(workStatus) {
    var item = FIXED_DATA_WORK_STATUS.find(i => i.id === workStatus);
    if(item) {
      return item.text;
    }
    return "";
  }

  /**
   * Loại bỏ dấu tiếng Việt trong xâu
   * @param {string} str xâu cần loại bỏ dấu tiếng Việt
   * @returns {string} xâu đã loại bỏ bỏ dấu tiếng Việt
   * @author pthieu (08-07-2021)
   */
  static nonAccentVietnamese(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");

    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  /**
   * Thêm thẻ \<strong\> cho thông báo (in đậm văn bản nằm giữa dấu " ")
   * @param {string} msg Nội dung thông báo
   * @returns Xâu đã được chỉnh sửa
   * @author pthieu (08-07-2021)
   */
  static decoString(msg) {
    if(!msg) {
      return msg;
    }
    var first = msg.indexOf('"');
    var last = msg.lastIndexOf('"');
    if(first > -1) {
      msg = `${msg.slice(0, first)}<strong>${msg.slice(first, last + 1)}</strong>${msg.slice(last + 1)}`;
    }
    return msg;
  }
}