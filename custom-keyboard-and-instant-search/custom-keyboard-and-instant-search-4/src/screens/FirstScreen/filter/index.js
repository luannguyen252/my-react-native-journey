import { removeVietnameseTones } from "../../../utils/Tool";
import { danhBa, dichVu, giaoDichMau, thietLap, troChuyen } from "../data/";

// Hàm so sánh cho phương thức array.filter
const filterFunc = (text) => (element) => {
  //chuyển tiếng việt có dấu hoặc không dấu => không dấu và chữ không in hoa để so sánh
  const newNameKey = removeVietnameseTones(element?.name || "").toLowerCase();
  const newText = removeVietnameseTones(text || "").toLowerCase();
  return newNameKey.includes(newText);
};

//Tìm kiếm dựa vào text
export const search = (text) => {
  try {
    return {
      dichVuTimThay: dichVu.filter(filterFunc(text)),
      danhBaTimThay: danhBa.filter(filterFunc(text)),
      thietLapTimThay: thietLap.filter(filterFunc(text)),
      troChuyenTimThay: troChuyen.filter(filterFunc(text)),
      giaoDichMauTimThay: giaoDichMau.filter(filterFunc(text)),
    };
  } catch {
    //Nếu lỗi trả về danh sách rỗng
    return {
      dichVuTimThay: [],
      danhBaTimThay: [],
      thietLapTimThay: [],
      troChuyenTimThay: [],
      giaoDichMauTimThay: [],
    };
  }
};
