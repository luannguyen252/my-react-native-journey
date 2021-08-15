import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ticker from "./Ticker";

export default function ReactNativeFlipTicker() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Ticker textStyle={styles.text} duration={250}>
        123.456.789
      </Ticker>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
});
