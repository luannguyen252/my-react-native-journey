import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import {
  deleteTatCaTimKiemGanDay,
  deleteTimKiemToMemory,
  getTimKiemGanDayFromMemory,
} from "../async_store";
// Components
import { CellTimKiemGanDay } from "../components/";
// Fetch Local Data
import { deXuatDichVu, thietLapThongMinh } from "../data/";
import styles from "../styles";

export default function SearchDefault() {
  const navigation = useNavigation();
  const [timKiemGanDay, setTimKiemGanDay] = useState([]);

  useEffect(() => {
    /* BEGIN: hàm này bất đồng bộ đọc kết quả tim kiếm gần đây từ bộ nhớ, được sử dụng để đợi và lưu kết quả đọc được từ bộ nhớ để đặt vào state khi đọc xong*/
    async function fetchTimKiemGanDay() {
      const { data } = await getTimKiemGanDayFromMemory();
      setTimKiemGanDay(data);
    }
    /* END: hàm này bất đồng bộ đọc kết quả tim kiếm gần đây từ bộ nhớ, được sử dụng để đợi và lưu kết quả đọc được từ bộ nhớ để đặt vào state*/

    /* BEGIN: Sự kiện focus: Khi màn hình này được focus lại thì chạy một hàm xử lý  */
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTimKiemGanDay();
    });
    /* END: Sự kiện focus  */

    /* BEGIN: Khi được mount lần đầu  */
    fetchTimKiemGanDay();
    /* END: Khi được mount lần đầu  */

    return unsubscribe; // huỷ lắng nghe sự kiện focus khi component bị unmount
  }, [navigation]);

  return (
    <>
      {/* BEGIN: Tìm kiếm gần đây */}
      {timKiemGanDay.length >= 1 && (
        <>
          <View style={styles.headlineWithAction}>
            {/* BEGIN: Headline Title */}
            <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
              Tìm kiếm gần đây
            </Text>
            {/* END: Headline Title */}

            {/* BEGIN: Delete Action */}
            {timKiemGanDay.length >= 2 && (
              <TouchableOpacity
                style={{ paddingBottom: 16 }}
                activeOpacity={0.8}
                onPress={() =>
                  Alert.alert(
                    "Thông báo",
                    "Bạn sẽ xóa tất cả tìm kiếm gần đây chứ?",
                    [
                      {
                        text: "Bỏ qua",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                      },
                      {
                        text: "Xóa",
                        onPress: async () => {
                          const { data, error } =
                            await deleteTatCaTimKiemGanDay();
                          if (!error) {
                            setTimKiemGanDay(data);
                            // data là danh sách sau khi xoá thành công
                          }
                          //nếu quá trình xoá bị lỗi sẽ không làm gì trên UI, đợi người dùng xoá lại
                        },
                        style: "ok",
                      },
                    ]
                  )
                }
              >
                <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                  Xóa tất cả
                </Text>
              </TouchableOpacity>
            )}
            {/* END: Delete Action */}
          </View>

          <View style={{ paddingBottom: 16 }}>
            {timKiemGanDay.map((item, index) => (
              <CellTimKiemGanDay
                key={index}
                name={item.name}
                onPress={() =>
                  navigation.navigate("Details", {
                    paramName: item.route,
                  })
                }
                onDeletePress={async () => {
                  const { data, error } = await deleteTimKiemToMemory(item);
                  if (!error) {
                    setTimKiemGanDay(data);
                    // data là danh sách sau khi xoá thành công
                  }
                  //nếu quá trình xoá bị lỗi sẽ không làm gì trên UI, đợi người dùng xoá lại
                }}
              />
            ))}
          </View>
        </>
      )}
      {/* END: Tìm kiếm gần đây */}

      {/* BEGIN: Đề xuất dịch vụ */}
      <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
        Đề xuất dịch vụ
      </Text>
      <View style={{ paddingBottom: 16 }}>
        {deXuatDichVu.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ paddingBottom: 16 }}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Details", {
                paramName: item.route,
              })
            }
          >
            <Text style={globalStyles.bodyText}>{item.name} →</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* END: Đề xuất dịch vụ */}

      {/* BEGIN: Thiết lập thông minh */}
      <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
        Thiết lập thông minh
      </Text>
      <View style={{ paddingBottom: 16 }}>
        {thietLapThongMinh.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ paddingBottom: 16 }}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Details", {
                paramName: item.route,
              })
            }
          >
            <Text key={index} style={globalStyles.bodyText}>
              {item.name} →
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* END: Thiết lập thông minh */}
    </>
  );
}
