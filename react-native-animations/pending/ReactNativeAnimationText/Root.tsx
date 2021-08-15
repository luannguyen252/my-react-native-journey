import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AnimatedText from "./AnimatedText";

export default function Root() {
  return (
    <View style={styles.container}>
      <AnimatedText duration={900}>
        People have been coming to the wise man, complaining about the same
        problems every time. One day he told them a joke and everyone roared in
        laughter.
      </AnimatedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  }
});
