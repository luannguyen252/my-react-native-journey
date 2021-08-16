import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";
// Fetch Local Data
import timKiemGanDay from "./timKiemGanDay.json";
import deXuatDichVu from "./deXuatDichVu.json";
import thietLapThongMinh from "./thietLapThongMinh.json";
// Components
import CellTimKiemGanDay from "./CellTimKiemGanDay";

export default function FirstScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [show, setShow] = useState(true);

  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {/* BEGIN: Search Input */}
          <TextInput
            style={[styles.input, { marginBottom: 16 }]}
            onChangeText={onChangeText}
            value={text}
            placeholder="Chuyển tiền, tiền điện, tiền nước,..."
            placeholderTextColor="#A7A7A7"
          />
          {/* END: Search Input */}
          {!show ? null : (
            <>
              {/* BEGIN: Tìm kiếm gần đây */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* BEGIN: Headline Title */}
                <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
                  Tìm kiếm gần đây
                </Text>
                {/* END: Headline Title */}

                {/* BEGIN: Delete Action */}
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
                          onPress: () => setShow(show === false),
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
                {/* END: Delete Action */}
              </View>
              <View style={{ paddingBottom: 16 }}>
                {timKiemGanDay.map((item, index) => (
                  <CellTimKiemGanDay
                    key={index}
                    name={item.name}
                    route={item.route}
                  />
                ))}
              </View>
              {/* END: Tìm kiếm gần đây */}
            </>
          )}

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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
