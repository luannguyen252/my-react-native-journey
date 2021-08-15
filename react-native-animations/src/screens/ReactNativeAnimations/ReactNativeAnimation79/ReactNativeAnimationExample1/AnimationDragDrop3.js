import React from "react";
import { Animated, PanResponder } from "react-native";

const timeline = new Animated.ValueXY();
let coordinate = { x: 0, y: 0 };
timeline.addListener((v) => (coordinate = v));

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderGrant: () => {
    timeline.setOffset({ x: coordinate.x, y: coordinate.y });
  },
  onPanResponderMove: (e, g) => {
    if (isHotZone(g)) {
      alert("too far");
      return;
    }
    Animated.event([
      null,
      {
        dx: timeline.x,
        dy: timeline.y,
      },
    ])(e, g);
  },
});

const isHotZone = (gesture) => gesture.moveY > 500;

export default () => (
  <Animated.View
    {...panResponder.panHandlers}
    style={[
      timeline.getLayout(),
      { height: 50, width: 50, backgroundColor: "red" },
    ]}
  />
);
