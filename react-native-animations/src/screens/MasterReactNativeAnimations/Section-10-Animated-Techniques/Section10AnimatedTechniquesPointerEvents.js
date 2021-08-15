import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

export default class Section10AnimatedTechniquesPointerEvents extends PureComponent {
  // BEGIN: Khai báo giá trị Animated ban đầu là Value = 0
  state = {
    animation: new Animated.Value(0),
    toggle: true,
  };
  // END: Khai báo giá trị Animated ban đầu là Value = 0

  _pressed = false; // Set giá trị ban đầu toggle = false

  // BEGIN: Khai báo hàm để tác động vào state sử dụng toggle
  handleToggle = () => {
    this.setState((state) => ({
      toggle: !state.toggle,
    }));
  };
  // END: Khai báo hàm để tác động vào state sử dụng toggle

  // BEGIN: Khởi tạo hàm thực thi Animated với timing khi tác động toggle từ hàm handleToggle()
  handlePress = () => {
    const toValue = this._pressed ? 0 : 1;

    Animated.timing(this.state.animation, {
      toValue,
    }).start();

    this._pressed = !this._pressed;
  };
  // END: Khởi tạo hàm thực thi Animated với timing khi tác động toggle từ hàm handleToggle()

  render() {
    // BEGIN: Tạo giá trị animated theo style background color cho object
    const boxStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"],
      }),
    };
    // END: Tạo giá trị animated theo style background color cho object

    return (
      <View style={styles.container}>
        <View>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={[styles.box, boxStyle]} />
          </TouchableWithoutFeedback>
          <View
            style={[StyleSheet.absoluteFill, styles.cover]}
            pointerEvents={this.state.toggle ? "none" : "auto"}
          />
        </View>

        <TouchableOpacity onPress={this.handleToggle}>
          <View>
            <Text>Toggle Pointer Events</Text>
          </View>
        </TouchableOpacity>
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
    width: 100,
    height: 100,
  },
  cover: {
    backgroundColor: "transparent",
  },
});
