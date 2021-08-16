import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
// Fetch Local Data
import {} from "../data/";

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
  /* END: một prop với tên là data truyền vào từ compoent cha dùng SearchHaveData có cấu trúc {dichVuTimThay, danhBaTimThay, thietLapTimThay, troChuyenTimThay, giaoDichMauTimThay} */

  return (
    <>
      {/* BEGIN: Dịch vụ */}
      {dichVuTimThay.length > 0 && (
        <>
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Dịch vụ
          </Text>
          <View style={{ paddingBottom: 16 }}>
            {dichVuTimThay.map((item, index) => (
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
        </>
      )}
      {/* END: Dịch vụ */}

      {/* BEGIN: Danh bạ */}
      {danhBaTimThay.length > 0 && (
        <>
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Danh bạ
          </Text>
          <View style={{ paddingBottom: 16 }}>
            {danhBaTimThay.map((item, index) => (
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
        </>
      )}
      {/* END: Danh bạ */}

      {/* BEGIN: Thiết lập */}
      {thietLapTimThay.length > 0 && (
        <>
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Thiết lập
          </Text>
          <View style={{ paddingBottom: 16 }}>
            {thietLapTimThay.map((item, index) => (
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
        </>
      )}
      {/* END: Thiết lập */}

      {/* BEGIN: Trò chuyện */}
      {troChuyenTimThay.length > 0 && (
        <>
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Trò chuyện
          </Text>
          <View style={{ paddingBottom: 16 }}>
            {troChuyenTimThay.map((item, index) => (
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
        </>
      )}
      {/* END: Trò chuyện */}

      {/* BEGIN: Giao dịch mẫu */}
      {giaoDichMauTimThay.length > 0 && (
        <>
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Giao dịch mẫu
          </Text>
          <View style={{ paddingBottom: 16 }}>
            {giaoDichMauTimThay.map((item, index) => (
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
        </>
      )}
      {/* END: Giao dịch mẫu */}
    </>
  );
}
