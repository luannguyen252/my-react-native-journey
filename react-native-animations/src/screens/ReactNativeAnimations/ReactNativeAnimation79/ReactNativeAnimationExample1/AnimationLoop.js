import React from "react";
import { View, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const roadImg = require("./road.png");

export default class extends React.Component {
  timeline1 = new Animated.Value(0);

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.timeline1, {
        toValue: 2,
      })
    ).start();
  }

  render() {
    const translateX = this.timeline1.interpolate({
      inputRange: [0, 2],
      outputRange: [-74, -10],
    });

    return (
      <View style={{ flex: 1 }}>
        <Animated.Image
          source={roadImg}
          style={{
            backgroundColor: "green",
            resizeMode: "contain",
            width: width + 200,
            height: 500,
            transform: [{ translateX }],
          }}
        />
      </View>
    );
  }
}
