import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class Section10AnimatedTechniquesInterruptedAnimation extends PureComponent {
  // BEGIN: Khai báo giá trị Animated ban đầu là Value gồm animation và opacity
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  // END: Khai báo giá trị Animated ban đầu là Value gồm animation và opacity

  // BEGIN: Khai báo hàm chạy Animation với Parallel và Timing + Set Timeout
  startAnimation = () => {
    Animated.parallel(
      [
        Animated.timing(this.state.animation, {
          toValue: 300,
          duration: 1500,
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 1500,
        }),
      ]
      // , { stopTogether: false }
    ).start(({ finished }) => {
      // if (!finished) {
      //   // RESET
      //   setTimeout(() => {
      //     Animated.spring(this.state.animation, {
      //       toValue: 0,
      //     }).start();
      //     Animated.spring(this.state.opacity, {
      //       toValue: 1,
      //     }).start();
      //   }, 0)
      // }
    });

    // Set Timeout với thuộc tính opacity sau 500 milliseconds
    setTimeout(() => {
      this.state.opacity.setValue(1);
    }, 500);
  };
  // END: Khai báo hàm chạy Animation với Parallel và Timing + Set Timeout

  render() {
    // BEGIN: Khai báo giá trị style áp dụng Animated
    const animatedStyles = {
      opacity: this.state.opacity,
      transform: [{ translateY: this.state.animation }],
    };
    // END: Khai báo giá trị style áp dụng Animated

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  },
});
