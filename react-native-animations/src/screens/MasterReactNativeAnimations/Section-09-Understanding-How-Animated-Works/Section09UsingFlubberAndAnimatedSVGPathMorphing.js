import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolate } from "flubber";

// BEGIN: Khai báo các Path gồm startPath và endPath để vẽ SVG
const startPath = `M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z`;
const endPath = `M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z`;
// END: Khai báo các Path gồm startPath và endPath để vẽ SVG

export default class Section09UsingFlubberAndAnimatedSVGPathMorphing extends PureComponent {
  // BEGIN: Khai báo giá trị State cho Animated
  state = {
    animation: new Animated.Value(0), // Set giá trị Animated ban đầu là 0
  };
  // END: Khai báo giá trị State cho Animated

  // BEGIN: Khai báo React Lifecycle cho việc sử dụng interpolatePath
  UNSAFE_componentWillMount() {
    const pathInterpolate = interpolate(startPath, endPath, {
      maxSegmentLength: 1,
    });

    // Lắng nghe giá trị interpolate truyền vào
    this.state.animation.addListener(({ value }) => {
      const path = pathInterpolate(value);
      this._path.setNativeProps({
        d: path,
      });
    });
  }
  // END: Khai báo React Lifecycle cho việc sử dụng interpolatePath

  // BEGIN: Khai báo hàm Press sử dụng Animation
  handlePress = () => {
    // Sử dụng thuộc tính sequence từ thư viện Animated
    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1, // Thực hiện Animated với giá trị là 1
        duration: 500, // Thực hiện Animated với thời gian là 500 milliseconds
        useNativeDriver: false,
      }),
      Animated.delay(1500), // Delay Animated sau đó thực hiện Animated tiếp theo sau 1,5 giây
      Animated.timing(this.state.animation, {
        toValue: 0, // Thực hiện Animated với giá trị là 0
        duration: 500, // Thực hiện Animated với thời gian là 500 milliseconds
        useNativeDriver: false,
      }),
    ]).start();
  };
  // END: Khai báo hàm Press sử dụng Animation

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path
              scale={3}
              d={startPath}
              stroke="black"
              ref={(path) => (this._path = path)}
            />
          </Svg>
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
});
