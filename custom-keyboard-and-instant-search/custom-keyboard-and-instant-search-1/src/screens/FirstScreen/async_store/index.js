import AsyncStorage from "@react-native-async-storage/async-storage";

//Đọc danh sách "Tìm kiếm gần đây" từ bộ nhớ
export const getTimKiemGanDayFromMemory = async (limit = 5) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@TimKiemGanDay");

    let array = jsonValue === null ? [] : JSON.parse(jsonValue);

    return {
      data: array.splice(0, limit),
      error: false,
    };
  } catch (e) {
    console.error(e);
    return { data: [], error: true };
  }
};

//Cập nhật một tìm kiếm vào danh sách "Tìm kiếm gần dây" và lưu vào bộ nhớ
export const addTimKiemToMemory = async (timKiem, limit = 5) => {
  try {
    /* BEGIN: Đọc danh sách "Tìm kiếm gần đây" từ bộ nhớ  */
    let { data: timKiemGanDay, error } = await getTimKiemGanDayFromMemory();
    if (error) throw "Lỗi khi đọc bộ nhớ";
    /* END: Đọc danh sách "Tìm kiếm gần đây" từ bộ nhớ  */

    /* BEGIN: xoá 1 "tìm kiếm" đã có  */
    const index = timKiemGanDay?.findIndex(
      (element) =>
        element.name === timKiem.name && element.route === timKiem.route
    );

    if (index != -1) {
      timKiemGanDay.splice(index, 1);
    }
    /* END: xoá 1 "tìm kiếm" đã có */

    /* BEGIN: nối "tìm kiếm" mới nhất vào đầu tiên của mảng  */
    timKiemGanDay = [timKiem].concat(timKiemGanDay);
    /* END: nối "tìm kiếm" mới nhất vào đầu tiên của mảng  */

    /* BEGIN: Lưu vào bộ nhớ  */
    await AsyncStorage.setItem("@TimKiemGanDay", JSON.stringify(timKiemGanDay));
    /* END: Lưu vào bộ nhớ  */

    /* BEGIN: Trả về danh sách mới nhất khi thêm thành công  */
    return { data: timKiemGanDay.splice(0, limit), error: false };
    /* END: Trả về danh sách mới nhất khi thêm thành công  */
  } catch (e) {
    console.error(e);
    return { data: [], error: true };
  }
};

//Xoá một tìm kiếm từ danh sách "Tìm kiếm gần dây" và lưu vào bộ nhớ
export const deleteTimKiemToMemory = async (timKiem, limit = 5) => {
  try {
    /* BEGIN: Đọc danh sách "Tìm kiếm gần đây" từ bộ nhớ  */
    let { data: timKiemGanDay, error } = await getTimKiemGanDayFromMemory();
    if (error) throw "Lỗi khi đọc bộ nhớ";

    /* END: Đọc danh sách "Tìm kiếm gần đây" từ bộ nhớ  */

    /* BEGIN: xoá 1 "tìm kiếm" */
    const index = timKiemGanDay?.findIndex(
      (element) =>
        element.name === timKiem.name && element.route === timKiem.route
    );

    if (index != -1) {
      timKiemGanDay.splice(index, 1);
    }
    /* BEGIN: xoá 1 "tìm kiếm" */

    /* BEGIN: Lưu vào bộ nhớ  */
    await AsyncStorage.setItem("@TimKiemGanDay", JSON.stringify(timKiemGanDay));
    /* END: Lưu vào bộ nhớ  */

    /* BEGIN: Trả về danh sách mới nhất khi xoá thành công  */
    return { data: timKiemGanDay.splice(0, limit), error: false };
    /* END: Trả về danh sách mới nhất khi xoá thành công  */
  } catch (e) {
    console.error(e);
    return { data: [], error: true };
  }
};

//Xoá tất cả tìm kiếm từ danh sách "Tìm kiếm gần dây" và lưu vào bộ nhớ
export const deleteTatCaTimKiemGanDay = async () => {
  try {
    /* BEGIN: xoá tất cả danh sách */
    const timKiemGanDay = [];
    /* BEGIN: xoá tất cả danh sách */

    /* BEGIN: Lưu vào bộ nhớ  */
    await AsyncStorage.setItem("@TimKiemGanDay", JSON.stringify(timKiemGanDay));
    /* END: Lưu vào bộ nhớ  */

    /* BEGIN: Trả về danh sách mới nhất khi xoá thành công  */
    return { data: timKiemGanDay, error: false };
    /* END: Trả về danh sách mới nhất khi xoá thành công  */
  } catch (e) {
    console.error(e);
    return { data: [], error: true };
  }
};
