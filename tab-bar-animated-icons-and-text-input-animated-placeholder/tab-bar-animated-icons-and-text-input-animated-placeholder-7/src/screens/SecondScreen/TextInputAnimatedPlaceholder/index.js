import React from "react";
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

export default class TextInputAnimatedPlaceholder extends React.Component {
  state = { text: "", textInputFocus: false }; // textInputFocus: trạng thái focus của textinput

  constructor(props) {
    super(props);

    this.newTextPlaceholders = [...textPlaceholders, textPlaceholders[0]];
  }

  // BEGIN: Khởi tạo animationTranslateY
  animationTranslateY = new Animated.Value(0);
  // END: Khởi tạo animationTranslateY

  componentDidMount() {
    this.startMovePlaceHolder(); // END: Khởi chạy khi đã render xong lần đầu tiên
  }

  startMovePlaceHolder = () => {
    let animationSetups = [];
    // BEGIN: thiết lập các hiệu ứng để dịch chuyển theo bội của styles.searchInput.height
    this.newTextPlaceholders?.map((_, index) => {
      animationSetups.push(
        Animated.timing(this.animationTranslateY, {
          toValue: -index * styles.searchInput.height,
          duration: 500,
          useNativeDriver: true,
        })
      );
      //BEGIN: Lần cuối đã được đệm lại thêm textPlaceholders[0] nếu không cần delay
      if (index < this.newTextPlaceholders.length - 1) {
        animationSetups.push(Animated.delay(MOVE_PLACEHOLDER_TIME));
      }
      //END: Lần cuối đã được đệm lại thêm textPlaceholders[0] nếu không cần delay
    });
    // END: thiết lập các hiệu ứng để dịch chuyển theo bội của styles.searchInput.height
    //BEGIN: reset translateY về lại vị trí đầu tiên
    animationSetups.push(
      Animated.timing(this.animationTranslateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      })
    );
    //END: reset translateY về lại vị trí đầu tiên
    //BEGIN: Chuyển đổi sang mảng đối xứng, để lặp lại vòng lặp hiệu ứng theo hướng nguợc lại từ dưới lên, ví dụ: [1,2,3,4,5] => [1,2,3,4,5,4,3,2,1]
    // animationSetups = [
    //   ...animationSetups,
    //   ...[]
    //     .concat(animationSetups.splice(1, animationSetups.length - 2) || [])
    //     .reverse(),
    // ];
    //END: Chuyển đổi sang mảng đối xứng, để lặp lại vòng lặp hiệu ứng theo hướng nguợc lại từ dưới lên, ví dụ: [1,2,3,4,5] => [1,2,3,4,5,4,3,2,1]

    //BEGIN: Lặp lại animation
    this.animationLoop?.reset(); //reset loop về trạng thái đầu tiên
    this.animationLoop = Animated.loop(Animated.sequence(animationSetups));
    this.animationLoop.start();
    //END: Lặp lại animation
  };

  onFocus = () => {
    this.animationLoop?.reset(); //reset loop về trạng thái đầu tiên
    this.setState({ textInputFocus: true });
  };

  onBlur = () => {
    this.startMovePlaceHolder(); //chạy lại hiệu ứng loop về trạng thái đầu tiên
    this.setState({ textInputFocus: false });
  };

  render() {
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
            ref={(ref) => (this.textInputRef = ref)}
            style={[styles.searchInput, styles.textInput]}
            // placeholder={"placeholder"} // không dùng vì chúng ta đang tuỳ chỉnh placeholder
            // autoFocus={true}
            value={this.state.text}
            onChangeText={(value) => {
              this.setState({ text: value });
            }}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />

          {/* BEGIN: Một thành phần (chứa các placeholder theo nhiều dọc) đè lên trên TextInput theo đúng kích thước của TextInput, thành phần này có chiều cao gấp ${textPlaceholders.length} lần chiều cao của TextInput, sẽ dịch chuyển dọc để có được placeholder dịch chuyển  */}
          {this.state.text === "" && (
            <Animated.View
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                paddingLeft: styles.searchInput.paddingLeft + 2, // nhích sang phải để cách con trỏ 2
                transform: this.state.textInputFocus
                  ? []
                  : [{ translateY: this.animationTranslateY }],
              }}
            >
              {this.newTextPlaceholders?.map(({ name }, index) => (
                <TouchableWithoutFeedback
                  key={`placeholder-${index}`}
                  onPress={() => {
                    this.textInputRef?.focus();
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
        {this.state.text != "" ? (
          <TouchableOpacity
            style={styles.clearInputAction}
            onPress={() => {
              this.setState({ text: "" });
            }}
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
}
