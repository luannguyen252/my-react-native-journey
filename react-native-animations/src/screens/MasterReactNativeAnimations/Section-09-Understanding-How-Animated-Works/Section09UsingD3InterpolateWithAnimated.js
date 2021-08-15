import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import { interpolateNumber, interpolateRgb } from "d3-interpolate";

export default class Section09UsingD3InterpolateWithAnimated extends PureComponent {
  // BEGIN: Khai báo giá trị State cho Animated
  state = {
    animation: new Animated.Value(0), // Set giá trị Animated ban đầu là 0
  };
  // END: Khai báo giá trị State cho Animated

  // BEGIN: Khai báo React Lifecycle cho việc sử dụng interpolateNumber và interpolateRgb
  UNSAFE_componentWillMount() {
    const positionInterpolate = interpolateNumber(0, 200);
    const colorInterpolate = interpolateRgb("rgb(255,99,71)", "rgb(99,71,255)");

    // Lắng nghe giá trị truyền vào từ positionInterpolate và colorInterpolate
    this.state.animation.addListener(({ value }) => {
      const position = positionInterpolate(value); // Nhận giá trị position từ positionInterpolate
      const color = colorInterpolate(value); // Nhận giá trị color từ colorInterpolate

      // Khai báo các giá trị style để triển khai các giá trị từ position và color
      const style = [
        styles.box,
        {
          backgroundColor: color,
          transform: [{ translateY: position }],
        },
      ];
      this._view.setNativeProps({ style }); // Áp dụng setNativeProps passing giá trị cho style
    });
  }
  // END: Khai báo React Lifecycle cho việc sử dụng interpolateNumber và interpolateRgb

  // BEGIN: Khai báo hàm Press sử dụng Animation
  handlePress = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 500,
    }).start();
  };
  // END: Khai báo hàm Press sử dụng Animation

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.box} ref={(view) => (this._view = view)} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: "tomato",
  },
});
