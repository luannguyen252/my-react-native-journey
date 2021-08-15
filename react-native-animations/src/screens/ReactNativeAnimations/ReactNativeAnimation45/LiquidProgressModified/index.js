import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import LiquidProgress from "./LiquidProgress";
import colors from "../../../../assets/styles/colors";

const ANIMATION_DELAY = 500;

export default function LiquidProgressModified() {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <LiquidProgress
        backgroundColor={colors.coolGray900}
        frontWaveColor={colors.purple600}
        backWaveColor={colors.pink600}
        fill={value}
        size={320}
      >
        <Animated.View style={styles.row}>
          <Animatable.Text
            animation="bounceIn"
            delay={ANIMATION_DELAY}
            style={styles.text}
          >
            {(value * 100).toFixed(2)}%
          </Animatable.Text>
        </Animated.View>
      </LiquidProgress>
      <Animatable.View
        animation="bounceIn"
        delay={ANIMATION_DELAY}
        style={styles.buttonLayer}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={() => setValue(Math.random())}
        >
          <Animatable.Text
            animation="bounceIn"
            delay={ANIMATION_DELAY + 250}
            style={styles.buttonText}
          >
            Random Value
          </Animatable.Text>
        </TouchableOpacity>
      </Animatable.View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 48,
    lineHeight: 56,
    fontWeight: "700",
  },
  buttonLayer: {
    flex: 0.25,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.coolGray900,
    height: 56,
    borderRadius: 8,
    paddingLeft: 32,
    paddingRight: 32,
    elevation: 12,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "white",
  },
});
