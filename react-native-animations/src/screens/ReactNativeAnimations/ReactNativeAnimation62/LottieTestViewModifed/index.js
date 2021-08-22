import TouchableScaleFeedback from "../RNTouchableScaleFeedback/TouchableScaleFeedback";
import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import trophy from "./trophy.json";
import bird from "./bird.json";
import LottieAnimation from "lottie-react-native";
import colors from "../../../../assets/styles/colors";

const { width: WIDTH_SCREEN, height: HEIGHT_SCREEN } = Dimensions.get("screen");
const ANIMATIONS = {
  type: "bounceIn",
  delay: 300,
};

export default class LottieTestView extends Component {
  // 1.
  storeAnimationRef1 = (ref) => {
    this.trophyRef = ref;
  };

  animateMe1 = () => {
    this.trophyRef.play();
  };

  // 2.
  storeAnimationRef2 = (ref) => {
    this.birdRef = ref;
  };

  animateMe2 = () => {
    this.birdRef.play();
  };

  render() {
    return (
      <Animatable.View
        animation={ANIMATIONS.type}
        delay={ANIMATIONS.delay}
        style={styles.container}
      >
        <View style={{ alignItems: "center" }}>
          {/* 1. */}
          <LottieAnimation
            ref={this.storeAnimationRef1}
            style={{
              height: 200,
              width: 300,
            }}
            loop={false}
            source={trophy}
          />
          <TouchableScaleFeedback
            activeScale={1.1}
            inactiveScale={0.9}
            style={[styles.square, { backgroundColor: "white" }]}
            onPress={this.animateMe1}
          >
            <Animatable.View
              animation={ANIMATIONS.type}
              delay={ANIMATIONS.delay + 300}
              style={styles.square1}
            >
              <Text style={styles.squareText}>{"Show Trophy"}</Text>
            </Animatable.View>
          </TouchableScaleFeedback>

          {/* 2. */}
          <LottieAnimation
            ref={this.storeAnimationRef2}
            style={{
              height: 300,
              width: 300,
            }}
            loop={false}
            source={bird}
          />
          <TouchableScaleFeedback
            activeScale={1.1}
            inactiveScale={0.9}
            style={[styles.square, { backgroundColor: "white" }]}
            onPress={this.animateMe2}
          >
            <Animatable.View
              animation={ANIMATIONS.type}
              delay={ANIMATIONS.delay + 600}
              style={styles.square2}
            >
              <Text style={styles.squareText}>{"Show Me"}</Text>
            </Animatable.View>
          </TouchableScaleFeedback>
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.coolGray100,
  },
  square1: {
    flexDirection: "column",
    height: WIDTH_SCREEN / 3,
    width: WIDTH_SCREEN / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange600,
    borderRadius: 24,
    shadowColor: colors.orange600,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  square2: {
    flexDirection: "column",
    height: WIDTH_SCREEN / 3,
    width: WIDTH_SCREEN / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.rose600,
    borderRadius: 24,
    shadowColor: colors.rose600,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
  },
  squareText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
