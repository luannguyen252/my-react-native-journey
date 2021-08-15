import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";
import { MIN_HEADER_HEIGHT, HEADER_DELTA, MAX_HEADER_HEIGHT } from "./Model";

interface HeaderProps {
  artist: string;
  y: Animated.Value<number>;
}

const { interpolate, Extrapolate } = Animated;

export default ({ artist, y }: HeaderProps) => {
  console.log("MAX", MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT, HEADER_DELTA);

  const opacity = interpolate(y, {
    inputRange: [0, HEADER_DELTA - 16],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textOpacity = interpolate(y, {
    inputRange: [HEADER_DELTA - 20, HEADER_DELTA - 8],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textTranslate = interpolate(y, {
    inputRange: [HEADER_DELTA - 20, HEADER_DELTA - 4],
    outputRange: [10, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: textOpacity,
            transform: [
              {
                translateY: textTranslate,
              },
            ],
          },
        ]}
      >
        {artist}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
