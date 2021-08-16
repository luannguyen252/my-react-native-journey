import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
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

// BEGIN: Thay đổi  thời gian để chuyển placeholer (1000 = 1 giây)
const MOVE_PLACEHOLDER_TIME = 2000;
// END: Thay đổi  thời gian để chuyển placeholer (1000 = 1 giây)

export default function TextInputAnimatedPlaceholder() {
  const [text, setText] = useState(""); // Sử dụng để lấy giá trị từ ô nhập Text và clear giá trị nhập vào
  const textInputRef = useRef(null);
  const animationTranslateY = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // BEGIN: Chạy hiệu ứng để dịch chuyển 1 view gồm nhiều view con theo chiều dọc
    if (text === "") {
      let animationSetup = [];

      // BEGIN: thiết lập các hiệu ứng để dịch chuyển theo bội của styles.searchInput.height
      textPlaceholders.map((_, index) => {
        animationSetup.push(
          Animated.timing(animationTranslateY, {
            delay: MOVE_PLACEHOLDER_TIME,
            toValue: -index * styles.searchInput.height,
            duration: 500,
            useNativeDriver: true,
          })
        );
      });
      // END: thiết lập các hiệu ứng để dịch chuyển theo bội của styles.searchInput.height

      //BEGIN: Chuyển đổi sang mảng đối xứng, để lặp lại vòng lặp hiệu ứng theo hướng nguợc lại từ dưới lên, ví dụ: [1,2,3,4,5] => [1,2,3,4,5,4,3,2,1]
      animationSetup = [
        ...animationSetup,
        ...[]
          .concat(animationSetup.splice(1, animationSetup.length - 2) || [])
          .reverse(),
      ];
      //END: Chuyển đổi sang mảng đối xứng, để lặp lại vòng lặp hiệu ứng theo hướng nguợc lại từ dưới lên, ví dụ: [1,2,3,4,5] => [1,2,3,4,5,4,3,2,1]

      //BEGIN: Lặp lại animation
      Animated.loop(Animated.sequence(animationSetup)).start();
      //END: Lặp lại animation
    }
    // END: Chạy hiệu ứng để dịch chuyển 1 view gồm nhiều view con theo chiều dọc
  }, [text]);

  return (
    <View style={styles.searchInputContainter}>
      {/* BEGIN: Ô nhập Text tìm kiếm */}

      <View
        style={{
          //#PIN123 [ANH COMMENT DÒNG TIẾP THEO (overflow: "hidden") CHO DỄ HÌNH DUNG Ý TƯỞNG] ẩn đi các thành phần con tràn khỏi thành phần cha
          overflow: "hidden",
        }}
      >
        <TextInput
          ref={textInputRef}
          style={[styles.searchInput, styles.textInput]}
          // placeholder={"placeholder"} // không dùng vì chúng ta đang tuỳ chỉnh placeholder
          autoFocus={true}
          value={text}
          onChangeText={(value) => {
            setText(value);
          }}
        />

        {/* BEGIN: Một thành phần (chứa các placeholder theo nhiều dọc) đè lên trên TextInput theo đúng kích thước của TextInput, thành phần này có chiều cao gấp ${textPlaceholders.length} lần chiều cao của TextInput, sẽ dịch chuyển dọc để có được placeholder dịch chuyển  */}
        {text === "" && (
          <Animated.View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              paddingLeft: styles.searchInput.paddingLeft + 2, // nhích sang phải để cách con trỏ 2
              transform: [{ translateY: animationTranslateY }],
            }}
          >
            {textPlaceholders.map(({ name }, index) => (
              <TouchableWithoutFeedback
                key={`placeholder-${index}`}
                onPress={() => {
                  textInputRef.current?.focus();
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text style={[styles.textInput, styles.textPlaceholder]}>
                    {name}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </Animated.View>
        )}
        {/* END: Một thành phần (chứa các placeholder theo nhiều dọc) đè lên trên TextInput theo đúng kích thước của TextInput, thành phần này có chiều cao gấp ${textPlaceholders.length} lần chiều cao của TextInput, sẽ dịch chuyển dọc để có được placeholder dịch chuyển  */}
      </View>

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
