/* BEGIN: Đầu vào là một số, đầu ra là chèn dấu "." theo đơn vị 000. Ví dụ numberWithCommas(10000) => "10.000" */
export const numberWithCommas = (number) => {
  try {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } catch (error) {
    return number;
  }
};
/* END: Đầu vào là một số, đầu ra là chèn dấu "." theo đơn vị 000. Ví dụ numberWithCommas(10000) => "10.000" */

/* BEGIN: Chuyển đổi tiếng việt sang tiếng việt không dấu. Ví dụ:  removeVietnameseTones("Chuyển tiền qua SĐT")="Chuyen tien qua SDT"*/
export const removeVietnameseTones = (vietnameseText) => {
  try {
    return vietnameseText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  } catch (error) {
    return vietnameseText;
  }
};
/* END: Chuyển đổi tiếng việt sang tiếng việt không dấu. Ví dụ:  removeVietnameseTones("Chuyển tiền qua SĐT")="Chuyen tien qua SDT" */
