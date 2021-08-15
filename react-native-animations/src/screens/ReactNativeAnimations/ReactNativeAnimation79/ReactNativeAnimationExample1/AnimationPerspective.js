import React from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";

const timeline = new Animated.ValueXY();
const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (e, g) => {
    Animated.event([
      null,
      {
        dx: timeline.x,
        dy: timeline.y,
      },
    ])(e, g);
  },
  onPanResponderRelease: (e, gesture) => {
    Animated.spring(timeline, { toValue: { x: 0, y: 0 } }).start();
  },
});

export default () => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
          transform: [
            { perspective: 200 },
            { rotateY: "30deg" },
            { rotateX: "30deg" },
          ],
        }}
      />
      <View
        {...panResponder.panHandlers}
        style={{ top: 0, bottom: 0, right: 0, left: 0, position: "absolute" }}
      />
    </View>
  );
};
