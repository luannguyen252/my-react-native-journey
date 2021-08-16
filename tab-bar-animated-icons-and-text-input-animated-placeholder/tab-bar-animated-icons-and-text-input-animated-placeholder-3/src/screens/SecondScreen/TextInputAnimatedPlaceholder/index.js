import React, { useState } from "react";
import { View, TextInput, Image, TouchableOpacity } from "react-native";
import styles from "../styles";

// BEGIN: Khai báo các thông tin trong Input Text Placeholder sẽ hiển thị lần lượt
const textPlaceholders = [
  {
    name: "Nhập từ khóa bạn muốn tìm...",
  },
  {
    name: "Chuyển tiền, tiền điện, tiền nước",
  },
  {
    name: "Ưu đãi, giảm giá",
  },
  {
    name: "Hóa đơn, 3G/4G",
  },
  {
    name: "Nạp tiền",
  },
];
// END: Khai báo các thông tin trong Input Text Placeholder sẽ hiển thị lần lượt

export default function TextInputAnimatedPlaceholder() {
  const [text, setText] = useState(""); // Sử dụng để lấy giá trị từ ô nhập Text và clear giá trị nhập vào

  return (
    <View style={styles.searchInputContainter}>
      {/* BEGIN: Ô nhập Text tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Nhập từ khóa bạn muốn tìm..."
        autoFocus={true}
        value={text}
        onChangeText={(value) => {
          setText(value);
        }}
      />
      {/* END: Ô nhập Text tìm kiếm */}

      {/* BEGIN: Icon Tìm kiếm được đặt ở phía bên trái ô nhập tìm kiếm */}
      <Image
        style={styles.searchInputSearchIcon}
        source={require("./assets/ic_search_32_dark40.png")}
      />
      {/* END: Icon Tìm kiếm được đặt ở phía bên trái ô nhập tìm kiếm */}

      {/* BEGIN: Khi nhập thông tin ở Input tìm kiếm sẽ hiển thị nút Clear ở bên phải, khi bấm vào sẽ Clear giá trị nhập ở Input Tìm kiếm */}
      {text != "" ? (
        <TouchableOpacity
          style={styles.clearInputAction}
          onPress={() => setText("")}
        >
          <Image
            style={styles.clearInputActionIcon}
            source={require("./assets/ic_close_24_dark40.png")}
          />
        </TouchableOpacity>
      ) : null}
      {/* END: Khi nhập thông tin ở Input tìm kiếm sẽ hiển thị nút Clear ở bên phải, khi bấm vào sẽ Clear giá trị nhập ở Input Tìm kiếm */}
    </View>
  );
}
