import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "../styles";

export default function SearchHaveData(props) {
  const navigation = useNavigation();

  /* BEGIN: một prop với tên là data truyền vào từ compoent cha dùng SearchHaveData có cấu trúc {dichVuTimThay, danhBaTimThay, thietLapTimThay, troChuyenTimThay, giaoDichMauTimThay} */
  const {
    dichVuTimThay,
    danhBaTimThay,
    thietLapTimThay,
    troChuyenTimThay,
    giaoDichMauTimThay,
  } = props.data;
  const { dontShowSeeMore, tabLabel } = props;
  /* END: một prop với tên là data truyền vào từ compoent cha dùng SearchHaveData có cấu trúc {dichVuTimThay, danhBaTimThay, thietLapTimThay, troChuyenTimThay, giaoDichMauTimThay} */

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"always"} // Cho phép tương tác với component con khi bàn phím đang mở
      keyboardDismissMode="on-drag" // Ẩn keyboard khi cuộn
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 10 }}
    >
      {/* BEGIN: Dịch vụ */}
      {!!dichVuTimThay?.length && (
        <>
          {/* BEGIN: Headline */}
          {tabLabel === "Tất cả" && (
            <View style={styles.headlineContainer}>
              <Text style={globalStyles.subTitle}>Dịch vụ</Text>
              {/* BEGIN: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
              {!dontShowSeeMore && dichVuTimThay.length > 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props?.goToTab(1)}
                >
                  <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                    Xem thêm →
                  </Text>
                </TouchableOpacity>
              )}
              {/* END: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
            </View>
          )}
          {/* END: Headline */}

          <View style={{ paddingBottom: 16 }}>
            {dichVuTimThay?.map((item, index) => {
              if (tabLabel === "Tất cả" && index >= 5) return null;

              return (
                <TouchableOpacity
                  key={index}
                  style={{ paddingBottom: 16 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Details", {
                      paramName: item.route,
                      laKetQuaTuTrangTimKiem: true,
                    })
                  }
                >
                  <Text style={globalStyles.bodyText}>{item.name} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
      {/* END: Dịch vụ */}

      {/* BEGIN: Danh bạ */}
      {!!danhBaTimThay?.length && (
        <>
          {/* BEGIN:  Headline */}
          {tabLabel === "Tất cả" && (
            <View style={styles.headlineContainer}>
              <Text style={globalStyles.subTitle}>Danh bạ</Text>
              {/* BEGIN: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
              {!dontShowSeeMore && danhBaTimThay.length > 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props?.goToTab(2)}
                >
                  <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                    Xem thêm →
                  </Text>
                </TouchableOpacity>
              )}
              {/* END: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
            </View>
          )}
          {/* END:  Headline */}

          <View style={{ paddingBottom: 16 }}>
            {danhBaTimThay?.map((item, index) => {
              if (tabLabel === "Tất cả" && index >= 5) return null;
              return (
                <TouchableOpacity
                  key={index}
                  style={{ paddingBottom: 16 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Details", {
                      paramName: item.route,
                      laKetQuaTuTrangTimKiem: true,
                    })
                  }
                >
                  <Text style={globalStyles.bodyText}>{item.name} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
      {/* END: Danh bạ */}

      {/* BEGIN: Thiết lập */}
      {!!thietLapTimThay?.length && (
        <>
          {/* BEGIN: Headline */}
          {tabLabel === "Tất cả" && (
            <View style={styles.headlineContainer}>
              <Text style={globalStyles.subTitle}>Thiết lập</Text>
              {/* BEGIN: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
              {!dontShowSeeMore && thietLapTimThay.length > 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props?.goToTab(3)}
                >
                  <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                    Xem thêm →
                  </Text>
                </TouchableOpacity>
              )}
              {/* END: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
            </View>
          )}
          {/* END: Headline */}

          <View style={{ paddingBottom: 16 }}>
            {thietLapTimThay?.map((item, index) => {
              if (tabLabel === "Tất cả" && index >= 5) return null;

              return (
                <TouchableOpacity
                  key={index}
                  style={{ paddingBottom: 16 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Details", {
                      paramName: item.route,
                      laKetQuaTuTrangTimKiem: true,
                    })
                  }
                >
                  <Text style={globalStyles.bodyText}>{item.name} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
      {/* END: Thiết lập */}

      {/* BEGIN: Trò chuyện */}
      {!!troChuyenTimThay?.length && (
        <>
          {/* BEGIN: Headline */}
          {tabLabel === "Tất cả" && (
            <View style={styles.headlineContainer}>
              <Text style={globalStyles.subTitle}>Trò chuyện</Text>
              {/* BEGIN: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
              {!dontShowSeeMore && troChuyenTimThay.length > 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props?.goToTab(4)}
                >
                  <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                    Xem thêm →
                  </Text>
                </TouchableOpacity>
              )}
              {/* END: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
            </View>
          )}
          {/* END: Headline */}

          <View style={{ paddingBottom: 16 }}>
            {troChuyenTimThay?.map((item, index) => {
              if (tabLabel === "Tất cả" && index >= 5) return null;

              return (
                <TouchableOpacity
                  key={index}
                  style={{ paddingBottom: 16 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Details", {
                      paramName: item.route,
                      laKetQuaTuTrangTimKiem: true,
                    })
                  }
                >
                  <Text style={globalStyles.bodyText}>{item.name} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
      {/* END: Trò chuyện */}

      {/* BEGIN: Giao dịch mẫu */}
      {!!giaoDichMauTimThay?.length && (
        <>
          {/* BEGIN: Headline */}
          {tabLabel === "Tất cả" && (
            <View style={styles.headlineContainer}>
              <Text style={globalStyles.subTitle}>Giao dịch mẫu</Text>
              {/* BEGIN: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
              {!dontShowSeeMore && giaoDichMauTimThay.length > 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => props?.goToTab(5)}
                >
                  <Text style={[globalStyles.bodyText, { color: "#EE0033" }]}>
                    Xem thêm →
                  </Text>
                </TouchableOpacity>
              )}
              {/* END: Hiển thị Xem thêm nếu kết quả nhiều hơn 5 */}
            </View>
          )}
          {/* END: Headline */}

          <View style={{ paddingBottom: 16 }}>
            {giaoDichMauTimThay?.map((item, index) => {
              if (tabLabel === "Tất cả" && index >= 5) return null;

              return (
                <TouchableOpacity
                  key={index}
                  style={{ paddingBottom: 16 }}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation.navigate("Details", {
                      paramName: item.route,
                      laKetQuaTuTrangTimKiem: true,
                    })
                  }
                >
                  <Text style={globalStyles.bodyText}>{item.name} →</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
      {/* END: Giao dịch mẫu */}
    </ScrollView>
  );
}
