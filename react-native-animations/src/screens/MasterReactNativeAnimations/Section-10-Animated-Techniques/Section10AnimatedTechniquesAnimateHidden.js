import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class Section10AnimatedTechniquesAnimateHidden extends PureComponent {
  // BEGIN: Khi báo giá trị Animated Value ban đầu là 1
  state = {
    animation: new Animated.Value(1),
    visible: true,
  };
  // END: Khi báo giá trị Animated Value ban đầu là 1

  // BEGIN: Khai báo hàm chạy Animation với Timing và Set Timeout kèm Spring
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      duration: 1500,
    }).start(({ finished }) => {
      setTimeout(() => {
        if (finished) {
          this.setState({ visible: false });
        } else {
          Animated.spring(this.state.animation, {
            toValue: 1,
          }).start();
        }
      }, 0);
    });
  };
  // END: Khai báo hàm chạy Animation với Timing và Set Timeout kèm Spring

  render() {
    // BEGIN: Khai báo giá trị interpolate với inputRange và outputRange
    const translateYInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [500, 0],
    });
    // END: Khai báo giá trị interpolate với inputRange và outputRange

    // BEGIN: Khai báo giá trị style áp dụng Animated
    const animatedStyles = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: translateYInterpolate,
        },
      ],
    };
    // END: Khai báo giá trị style áp dụng Animated

    return (
      <View style={styles.container}>
        {this.state.visible && (
          <TouchableWithoutFeedback onPress={this.startAnimation}>
            <Animated.View style={[styles.box, animatedStyles]} />
          </TouchableWithoutFeedback>
        )}
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
