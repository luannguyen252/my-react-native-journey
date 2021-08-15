import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

export default class Section10AnimatedTechniques99Cliff extends PureComponent {
  // BEGIN: Khai báo giá trị Animated ban đầu là ValueXY rỗng
  state = {
    animation: new Animated.ValueXY(),
  };
  // END: Khai báo giá trị Animated ban đầu là ValueXY rỗng

  // BEGIN: Sử dụng Lifecycle tạo giá trị PanResponder khi khởi tạo Component
  componentWillMount() {
    this._panResponder = PanResponder.create({
      //
      onStartShouldSetPanResponder: () => true,
      //
      onMoveShouldSetPanResponder: () => true,
      //
      onPanResponderGrant: () => {
        this.state.animation.extractOffset();
      },
      //
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
    });
  }
  // END: Sử dụng Lifecycle tạo giá trị PanResponder khi khởi tạo Component

  render() {
    // BEGIN: Khởi tạo giá trị Dimension theo Height
    const { height } = Dimensions.get("window");
    // END: Khởi tạo giá trị Dimension theo Height

    // Tạo giá trị inputRange
    const inputRange = [0, height / 2 - 50.01, height / 2 - 50, height];
    // const inputRange =[0, (height / 2) - 50.01, (height / 2), height];

    // BEGIN: Tạo giá trị interpolate theo style background color
    const backgroundColorInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [
        "rgb(99,71,255)",
        "rgb(99,71,255)",
        "rgb(255,0,0)",
        "rgb(255,0,0)",
      ],
    });
    // END: Tạo giá trị interpolate theo style background color

    // BEGIN: Tạo giá trị interpolate theo style flip
    const flipInterpolate = this.state.animation.y.interpolate({
      inputRange,
      outputRange: [1, 1, -1, -1],
    });
    // END: Tạo giá trị interpolate theo style flip

    // BEGIN: Tạo giá trị animated theo style background và scale
    const animatedStyles = {
      backgroundColor: backgroundColorInterpolate,
      transform: [
        ...this.state.animation.getTranslateTransform(),
        { scale: flipInterpolate },
      ],
    };
    // END: Tạo giá trị animated theo style background và scale

    return (
      <View style={styles.container}>
        <View style={[styles.top, styles.center, styles.container]}>
          <Text>Good</Text>
        </View>
        <View style={[styles.center, styles.container]}>
          <Text>Bad</Text>
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={[styles.box, styles.center, animatedStyles]}
        >
          <Text>Box</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: "absolute",
    width: 50,
    height: 50,
    top: 0,
    left: 0,
  },
  top: {
    borderBottomWidth: 1,
    borderBottomColor: "#AAAAAA",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
