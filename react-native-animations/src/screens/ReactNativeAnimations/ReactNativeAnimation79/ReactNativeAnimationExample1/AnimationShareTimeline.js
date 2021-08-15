import React from "react";
import { View, Animated } from "react-native";

export default class extends React.Component {
  timeline1 = new Animated.Value(0);

  componentDidMount() {
    Animated.timing(this.timeline1, {
      toValue: 2,
    }).start();
  }

  render() {
    const rotate = this.timeline1.interpolate({
      inputRange: [0, 2],
      outputRange: ["-30deg", "30deg"],
    });

    const translateX = this.timeline1.interpolate({
      inputRange: [0, 2],
      outputRange: [-50, 400],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.View
          style={{
            backgroundColor: "red",
            width: 100,
            height: 100,
            transform: [{ rotate }],
          }}
        />
        <Animated.View
          style={{
            backgroundColor: "red",
            width: 100,
            height: 100,
            marginTop: 200,
            transform: [{ translateX }],
          }}
        />
      </View>
    );
  }
}
