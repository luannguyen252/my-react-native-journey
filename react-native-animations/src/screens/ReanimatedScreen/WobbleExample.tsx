import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { View, Button, StyleSheet } from "react-native";
import React from "react";

const ANGLE = 9;
const TIME = 100;
const EASING = Easing.elastic(1.5);

export default function WobbleExample(): React.ReactElement {
  const rotation = useSharedValue(1);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, style]} />
      <Button
        title="Click Me"
        onPress={() => {
          rotation.value = withSequence(
            // Deviate left to start from -ANGLE
            withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
            // Wobble between -ANGLE and ANGLE 7 times
            withRepeat(
              withTiming(ANGLE, {
                duration: TIME,
                easing: EASING,
              }),
              7,
              true
            ),
            // Go back to 0 at the end
            withTiming(0, { duration: TIME / 2, easing: EASING })
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  box: {
    width: 80,
    height: 80,
    alignSelf: "center",
    margin: 56,
    borderRadius: 16,
    backgroundColor: "#6D28D9",
  },
});
