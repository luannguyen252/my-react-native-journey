import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import globalStyles from "../../assets/styles/globalStyles";

export default function AnimatedStyleUpdateExample() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  return (
    <View style={globalStyles.container}>
      <Animated.View style={[styles.animatedViewContainer, style]} />
      <Button
        title="Toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animatedViewContainer: {
    width: 120,
    height: 80,
    backgroundColor: "#6D28D9",
    margin: 32,
    borderRadius: 8,
  },
});
