import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  LogBox,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
LogBox.ignoreAllLogs();

// BEGIN: Setup Width and Height Dimensions with Device
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
// END: Setup Width and Height Dimensions with Device

// BEGIN: Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    height: windowHeight * 2,
    backgroundColor: "#FFFFFF",
  },
  content: {
    backgroundColor: colors.orange600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight,
  },
});
// END: Styles

// BEGIN: Event
export default class Section04AnimatedFunctionsEvent extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Set giá trị ban đầu cho Animated là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  render() {
    // BEGIN: Khai báo thuộc tính interpolate muốn thực hiện Animated
    // Thay đổi màu sắc từ 0 đến 300 tương ứng với mã màu được gán ở output range
    const backgroundInterpolate = this.state.animation.interpolate({
      inputRange: [0, 300], // Set input range với 0 và 300
      outputRange: ["rgb(255, 99, 71)", "rgb(99, 71, 255)"], // set out range với các thông tin về color theo định dạng RGB
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const backgroundStyles = {
      backgroundColor: backgroundInterpolate, // Gán giá trị background color là interpolate khai báo ở trên
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <>
        {/* BEGIN: Thực hiện hành động Animated khi thao tác Scrolling, sẽ Call Event đến Scroll View */}
        <ScrollView
          contentContainerStyle={styles.container}
          scrollEventThrottle={16}
          // onScroll={(e) => {
          //   this.state.animation.setValue(e.nativeEvent.contentOffset.y);
          // }}
          // Khi có tác động Scroll trên màn hình thì sẽ call event trong function backgroundInterpolate để thực thi hành động là thay đổi giá trị
          onScroll={Animated.event([
            {
              nativeEvent: {
                // Thay đổi giá trị trong contentOffset theo Y axis, tương ứng với scroll xuống dưới
                contentOffset: {
                  y: this.state.animation,
                },
              },
            },
          ])}
        >
          <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
            Event
          </Text>
          {/* BEGIN: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
          <Animated.View style={[styles.content, backgroundStyles]} />
          {/* END: Gán giá trị của animatedStyles vào thành phần trên UI muốn thực hiện Animated */}
        </ScrollView>
        {/* END: Thực hiện hành động Animated khi thao tác Scrolling, sẽ Call Event đến Scroll View */}
      </>
    );
  }
}
// END: Event
