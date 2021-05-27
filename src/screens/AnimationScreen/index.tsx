import React, { PureComponent } from "react";
import { View, Animated } from "react-native";
import { StatusBar } from "expo-status-bar";

import styles from "./styles";

import {
  AnimatedDemo,
  AnimatedStyleUpdateExample,
  DragAndSnapExample,
  AnimatedScrollExample,
  ChatHeadsExample,
  ExtrapolationExample,
  LightboxExample,
  MeasureExample,
  ScrollEventExample,
  ScrollToExample,
  ScrollableViewExample,
  SwipeableListExample,
  WobbleExample,
} from "./examples/";

import { LottieExample1, LottieExample2 } from "./lottieExamples/";

export default class AnimationScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.ScrollView contentContainerStyle={{}}>
          <AnimatedDemo />
        </Animated.ScrollView>
      </View>
    );
  }
}
