import React from "react";
import { Platform, PlatformColor, StyleSheet, Text, View } from "react-native";

const PlatformColorScreen = () => (
  <View style={styles.container}>
    <Text style={styles.label}>I am a special label color!</Text>
  </View>
);

const styles = StyleSheet.create({
  label: {
    padding: 16,
    ...Platform.select({
      ios: {
        color: PlatformColor("label"),
        backgroundColor: PlatformColor("systemTealColor"),
      },
      android: {
        color: PlatformColor("?android:attr/textColor"),
        backgroundColor: PlatformColor("@android:color/holo_blue_bright"),
      },
      default: { color: "black" },
    }),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlatformColorScreen;
