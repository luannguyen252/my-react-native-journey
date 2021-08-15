import * as Animatable from "react-native-animatable";
import React from "react";
import { View, StyleSheet } from "react-native";
import AppleCard from "./AppleCard/AppleCard";

const DURATION = 500;

export default function ReactNativeAppleCardViewsAnimation() {
  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={DURATION}>
        <AppleCard
          smallTitle="macOS Big Sur"
          largeTitle="Doing it all,in all new ways."
          footnoteText="macOS Big Sur elevates the most advanced desktop operating system in the world to a new level of power and beauty. Experience Mac to the fullest with a refined new design. Enjoy the biggest Safari update ever. Discover new features for Maps and Messages. And get even more transparency around your privacy."
          source={require("./assets/macos-big-sur.jpg")}
          onPress={() => {}}
        />
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
  },
});
