import React from "react";
import { View, Text } from "react-native";
import AnimatedEllipsis from "./AnimatedEllipsis";
import styles from "./styles";

const SPACING = 16;

export default function ReactNativeAnimatedEllipsis() {
  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: SPACING, flexDirection: "column" }}>
        <Text>Loading</Text>
        <AnimatedEllipsis />
      </View>

      <View style={{ paddingBottom: SPACING }}>
        <AnimatedEllipsis numberOfDots={10} />
      </View>

      <View style={{ paddingBottom: SPACING }}>
        <AnimatedEllipsis
          numberOfDots={4}
          animationDelay={150}
          style={{
            color: "red",
            fontSize: 72,
          }}
        />
      </View>

      <View style={{ paddingBottom: SPACING }}>
        <AnimatedEllipsis
          numberOfDots={3}
          minOpacity={0.4}
          animationDelay={200}
          style={{
            color: "#94939B",
            fontSize: 100,
            letterSpacing: -15,
          }}
        />
      </View>
    </View>
  );
}
