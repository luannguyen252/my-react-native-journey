// From: https://stackoverflow.com/questions/47911256/react-native-circle-transform-translate-animation
import React, { Component } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";

export default class CircularRotation extends Component {
  constructor() {
    super();
    this.animated = new Animated.Value(0);
    var inputRange = [0, 1];
    var outputRange = ["0deg", "360deg"];
    this.rotate = this.animated.interpolate({ inputRange, outputRange });
    outputRange = ["0deg", "-360deg"];
    this.rotateOpposit = this.animated.interpolate({ inputRange, outputRange });
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    Animated.loop(
      Animated.timing(this.animated, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  }
  render() {
    const transform = [{ rotate: this.rotate }];
    const transform1 = [{ rotate: this.rotateOpposit }];
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.item, { transform }]}>
          <Animated.View style={[styles.dot, { transform: transform1 }]}>
            <Text style={styles.text}>Test</Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    position: "absolute",
    width: 100,
    height: 200,
  },
  dot: {
    width: "100%",
    height: 20,
    backgroundColor: "red",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
