import React from "react";
import { Animated, ScrollView, Text } from "react-native";

const MIN_HEADER_HEIGHT = 50;
const MAX_HEADER_HEIGHT = 150;
const timeline = new Animated.Value(0);

export default () => {
  return (
    <>
      <Animated.View
        style={{
          height: timeline.interpolate({
            inputRange: [0, MAX_HEADER_HEIGHT],
            outputRange: [MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT],
            extrapolate: "clamp",
          }),
          backgroundColor: "green",
        }}
      />
      <ScrollView
        bounces={false}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: timeline } } },
        ])}
      >
        {Array(99)
          .fill()
          .map((_, i) => (
            <Text
              style={{
                backgroundColor: "red",
                margin: 5,
                padding: 5,
                color: "white",
              }}
              children={i}
            />
          ))}
      </ScrollView>
    </>
  );
};
