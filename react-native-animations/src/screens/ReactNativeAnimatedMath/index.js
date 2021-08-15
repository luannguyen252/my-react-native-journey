import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import AnimatedMath from "react-native-animated-math";

export default class ReactNativeAnimatedMath extends React.Component {
  state = {
    angle: new Animated.Value(0),
  };

  componentDidMount() {
    this.animate();
  }

  animate(rotation = 1) {
    Animated.timing(this.state.angle, {
      toValue: rotation * 2 * Math.PI,
      duration: 4000,
      useNativeDriver: true,
    }).start(() => this.animate(rotation + 1));
  }

  render() {
    let { angle } = this.state,
      radius = 130;

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.dot,
            {
              transform: [
                {
                  translateX: Animated.multiply(
                    AnimatedMath.sin(angle),
                    radius
                  ),
                },
                {
                  translateY: Animated.multiply(
                    AnimatedMath.cos(angle),
                    -radius
                  ),
                },
              ],
            },
          ]}
        />
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
  dot: {
    position: "absolute",
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
