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
    flex: 1,
  },
  content: {
    backgroundColor: colors.orange600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight,
  },
  content: {
    height: 3000,
  },
});
// END: Styles

export default class Section07NativeAnimationsTimingEvent extends PureComponent {
  // BEGIN: Khai báo state có chứa thuộc tính Animated.Value
  state = {
    animation: new Animated.Value(0), // Set giá trị ban đầu cho Animated là 0
  };
  // END: Khai báo state có chứa thuộc tính Animated.Value

  render() {
    // BEGIN: Khai báo thuộc tính interpolate muốn thực hiện Animated
    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: [1, 0],
    });
    // END: Khai báo thuộc tính interpolate muốn thực hiện Animated

    // BEGIN: Khai báo thuộc tính animatedStyles muốn thực hiện Animated
    const backgroundStyle = {
      backgroundColor: "tomato",
      opacity: opacityInterpolate,
    };
    // END: Khai báo thuộc tính animatedStyles muốn thực hiện Animated

    return (
      <>
        <View style={styles.container}>
          <Animated.ScrollView
            scrollEventThrottle={1}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: this.state.animation,
                    },
                  },
                },
              ],
              { useNativeDriver: true }
            )}
          >
            <Animated.View style={[styles.content, backgroundStyle]} />
          </Animated.ScrollView>
        </View>
      </>
    );
  }
}
