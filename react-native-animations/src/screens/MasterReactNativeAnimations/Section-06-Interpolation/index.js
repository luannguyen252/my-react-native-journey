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
  PanResponder,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";

// BEGIN: Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  box: {
    backgroundColor: colors.orange600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
// END: Styles

// BEGIN: Numbers And Interpolates on Interpolates
class NumbersAndInterpolatesOnInterpolates extends PureComponent {
  // BEGIN: Khai báo state cho Animated Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state cho Animated Value

  // BEGIN: Tạo function để thực hiện Animation
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 300,
      }).start();
    });
  };
  // END: Tạo function để thực hiện Animation

  render() {
    // BEGIN: Tạo Array cho Animated Interpolate đầu tiên
    const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0],
    });
    // END: Tạo Array cho Animated Interpolate đầu tiên

    // BEGIN: Tạo Array cho Animated Interpolate thứ hai
    const interpolatedInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
    });
    // END: Tạo Array cho Animated Interpolate thứ hai

    // BEGIN: Tạo Array cho Animated Interpolate thứ ba
    const translateXInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 30, 50, 80, 100, 150, 299, 300],
      outputRange: [0, -30, -50, 80, -100, 300, 0, -100],
    });
    // END: Tạo Array cho Animated Interpolate thứ ba

    // BEGIN: Tạo thuộc tính styles apply Animated Interpolate đầu tiên, thứ hai và thứ ba
    const animatedStyles = {
      transform: [
        {
          translateY: animatedInterpolate, // Apply giá trị Animated Interpolate đầu tiên
        },
        {
          translateX: translateXInterpolate, // Apply giá trị Animated Interpolate thứ ba
        },
      ],
      opacity: interpolatedInterpolate, // Apply giá trị Animated Interpolate thứ hai
    };
    // END: Tạo thuộc tính styles apply Animated Interpolate đầu tiên, thứ hai và thứ ba

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Numbers And Interpolates on Interpolates
        </Text>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
// END: Numbers And Interpolates on Interpolates

// BEGIN: Color/Background Interpolate
class ColorBackgroundInterpolate extends PureComponent {
  // BEGIN: Khai báo state cho Animated Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state cho Animated Value

  // BEGIN: Tạo function để thực hiện Animation
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 3,
      duration: 1500,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };
  // END: Tạo function để thực hiện Animation

  render() {
    // BEGIN: Tạo Array cho Animated Interpolate Color
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["rgb(71, 255, 99)", "rgb(255, 99, 71)", "rgb(99, 71, 255)"],
    });
    // END: Tạo Array cho Animated Interpolate Color

    // BEGIN: Tạo Array cho Animated Interpolate Background Color
    const backgroundInterpolate = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 2],
        outputRange: ["rgba(255, 99, 71, 1)", "rgba(255, 99, 71, 0)"],
      }),
    };
    // END: Tạo Array cho Animated Interpolate Background Color

    // BEGIN: Tạo thuộc tính styles apply Animated Interpolate Color
    const animatedStyles = {
      backgroundColor: colorInterpolate,
    };
    // END: Tạo thuộc tính styles apply Animated Interpolate Color

    return (
      <Animated.View style={[styles.container, backgroundInterpolate]}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Color/Background Interpolate
        </Text>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
// END: Color/Background Interpolate

// BEGIN: Rotation
class Rotation extends PureComponent {
  // BEGIN: Khai báo state cho Animated Value
  state = {
    animation: new Animated.Value(0),
  };
  // END: Khai báo state cho Animated Value

  // BEGIN: Tạo function để thực hiện Animation
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };
  // END: Tạo function để thực hiện Animation

  render() {
    // BEGIN: Tạo Array cho Animated Interpolate Transform Rotate
    const xInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
      // outputRange: ["0rad", "6.28319rad"]
    });
    // END: Tạo Array cho Animated Interpolate Transform Rotate

    // BEGIN: Tạo Array cho Animated Interpolate Transform Rotate
    const yInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ["0deg", "0deg", "180deg"],
      // outputRange: ["0rad", "0rad", "3.141595rad"]
    });
    // END: Tạo Array cho Animated Interpolate Transform Rotate

    // BEGIN: Tạo thuộc tính styles apply Animated Interpolate Rotate
    const animatedStyles = {
      transform: [
        {
          rotateX: xInterpolate,
        },
        { rotateY: yInterpolate },
      ],
    };
    // END: Tạo thuộc tính styles apply Animated Interpolate Rotate

    return (
      <Animated.View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Rotation
        </Text>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}
// END: Rotation

// BEGIN: Extrapolate
class Extrapolate extends PureComponent {
  // BEGIN: Khai báo state cho Animated Value
  state = {
    animation: new Animated.ValueXY(0), // Setup giá trị Animated ban đầu là 0
    value: 0, // Bổ sung thêm giá trị ban đầu là 0
  };
  // END: Khai báo state cho Animated Value

  // BEGIN: Tạo React Lifecycle ngay khi khởi tạo Component
  UNSAFE_componentWillMount() {
    // BEGIN: Khởi tạo giá trị Animation Y với Listenser ngay khi tạo Component với việc hiển thị Value
    this.state.animation.y.addListener(({ value }) => {
      this.setState({
        value,
      });
    });
    // END: Khởi tạo giá trị Animation Y với Listenser ngay khi tạo Component với việc hiển thị Value

    // BEGIN: Khởi tạo Gesture Pan Responder
    this._panResponder = PanResponder.create({
      //
      onStartShouldSetPanResponder: () => true,
      //
      onMoveShouldSetPanResponder: () => true,
      //
      onPanResponderGrant: (e, gestureState) => {
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
    // END: Khởi tạo Gesture Pan Responder
  }
  // END: Tạo React Lifecycle ngay khi khởi tạo Component

  render() {
    // BEGIN: Khởi tạo giá trị Height theo Dimensions
    const { height } = Dimensions.get("window");
    // END: Khởi tạo giá trị Height theo Dimensions

    // BEGIN: Khởi tạo giá trị Animated theo interpolate
    var scaleAndFlipOnReverse = this.state.animation.y.interpolate({
      inputRange: [0, height / 3],
      outputRange: [0.1, 1],
      extrapolateLeft: "extend",
      extrapolateRight: "clamp",
      // extrapolate: "identity",
      // extrapolate: "clamp",
    });
    // END: Khởi tạo giá trị Animated theo interpolate

    // BEGIN: Khởi tạo giá trị Styles apply Animated interpolate
    const animatedStyles = {
      transform: [{ scale: scaleAndFlipOnReverse }],
    };
    // END: Khởi tạo giá trị Styles apply Animated interpolate

    return (
      <View style={styles.container} {...this._panResponder.panHandlers}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Extrapolate
        </Text>
        <Animated.View
          style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
        >
          <Text style={[globalStyles.bodyText, { color: "#FFFFFF" }]}>
            {Math.round(this.state.value)}/{Math.round(height / 3)}
          </Text>
        </Animated.View>
      </View>
    );
  }
}
// END: Extrapolate

// BEGIN: Basic Extrapolate
class BasicExtrapolate extends PureComponent {
  // BEGIN: Khai báo state cho Animated Value
  state = {
    animation: new Animated.Value(1), // Setup giá trị Animated ban đầu là 1
  };
  // END: Khai báo state cho Animated Value

  // BEGIN: Tạo Function để thực hiện Animated
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      // toValue: 3,
      toValue: 2, // Thực hiện Animated với giá trị là 2
      duration: 1500, // Thực hiện Animated với thời gian là 1,5 giây
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        // toValue: 0,
        toValue: 1, // Thực hiện Animated với giá trị là 1
        duration: 300, // Thực hiện Animated với thời gian là 1,5 giây
        useNativeDriver: false,
      }).start();
      // this.state.animation.setValue(5);
    });
  };
  // END: Tạo Function để thực hiện Animated

  render() {
    // BEGIN: Khởi tạo giá trị Animated theo interpolate
    // extend: Default
    // clamp: Whatever the end values we've defined are the values they will stay at, never go beyond
    // identity: Takes on the value of the Animated.Value that you're passing in and ignores inputRange/outputRange
    const scaleInterpolate = this.state.animation.interpolate({
      inputRange: [1, 2],
      outputRange: [1, 2],
      extrapolate: "identity",
      // extrapolate: "clamp",
      // extrapolateLeft: "clamp",
      // extrapolateRight: "clamp"
    });
    // END: Khởi tạo giá trị Animated theo interpolate

    // BEGIN: Khởi tạo giá trị Styles apply Animated interpolate
    const animatedStyles = {
      transform: [{ scale: scaleInterpolate }],
    };
    // END: Khởi tạo giá trị Styles apply Animated interpolate

    return (
      <View style={styles.container}>
        <Text style={[globalStyles.subTitle, { paddingBottom: 16 }]}>
          Basic Extrapolate
        </Text>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View
            style={[styles.box, animatedStyles, { width: 120, height: 120 }]}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
// END: Basic Extrapolate

export default class Section06Interpolation extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <SafeAreaView>
            <StatusBar style="auto" />
            <NumbersAndInterpolatesOnInterpolates />
            <ColorBackgroundInterpolate />
            <Rotation />
            <Extrapolate />
            <BasicExtrapolate />
          </SafeAreaView>
        </ScrollView>
      </View>
    );
  }
}
