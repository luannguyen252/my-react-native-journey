import AnimatedCircularProgress from "./AnimatedCircularProgress";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function ReactNativeAnimatedCircularProgress() {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        backgroundColor="#EF4444"
        color="#FECACA"
        startDeg={45}
        endDeg={120}
        radius={60}
        innerRadius={40}
        duration={1000}
      />
      <AnimatedCircularProgress
        startDeg={45}
        endDeg={120}
        innerRadius={0}
        duration={300}
        style={{ marginTop: 10 }}
      />
    </View>
  );
}
