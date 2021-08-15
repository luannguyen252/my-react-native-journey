import React, { useEffect } from "react";
import { Animated, PanResponder } from "react-native";

const timeline = new Animated.ValueXY();
const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: Animated.event([
    null,
    {
      dx: timeline.x,
      dy: timeline.y,
    },
  ]),
  onPanResponderRelease: (e, gesture) => {
    Animated.spring(timeline, { toValue: { x: 0, y: 0 } }).start();
  },
});

export default () => {
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        timeline.getLayout(),
        { height: 50, width: 50, backgroundColor: "red" },
      ]}
    />
  );
};
