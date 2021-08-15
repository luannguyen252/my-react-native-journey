import AnimatedNumber from "./AnimatedNumber";
import React from "react";
import { View } from "react-native";
import styles from "./styles";

export default function ReactNativeAnimatedNumber() {
  return (
    <View style={styles.container}>
      <AnimatedNumber />
    </View>
  );
}
