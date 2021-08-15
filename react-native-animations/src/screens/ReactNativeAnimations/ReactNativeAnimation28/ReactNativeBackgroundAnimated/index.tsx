import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackgroundAnimation from "./component/BackgroundAnimation";

export default function ReactNativeBackgroundAnimated() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This project was used to study how to lead with Animated.
      </Text>
      <Text style={styles.subTitle}>By - MateuVieira</Text>
      <BackgroundAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009953",
  },
  title: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    lineHeight: 20,
    color: "#fff",
  },
});
