import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";

// BEGIN: Khai báo các Path gồm startPath và endPath để vẽ SVG
const startPath = `M45,50a5,5 0 1,0 10,0a5,5 0 1,0 -10,0`;
const endPath = `M20,50a30,30 0 1,0 60,0a30,30 0 1,0 -60,0`;
// END: Khai báo các Path gồm startPath và endPath để vẽ SVG

export default class Section09UsingD3InterpolatePathAndAnimatedToAnimateSVGPaths extends PureComponent {
  // BEGIN: Khai báo giá trị State cho Animated
  state = {
    animation: new Animated.Value(0), // Set giá trị Animated ban đầu là 0
  };
  // END: Khai báo giá trị State cho Animated

  // BEGIN: Khai báo React Lifecycle cho việc sử dụng interpolatePath
  UNSAFE_componentWillMount() {
    const pathInterpolate = interpolatePath(startPath, endPath);

    // Lắng nghe giá trị interpolatePath truyền vào
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
      Animated.delay(1500),
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
