import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class ColorSquare extends Component {
  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animatedValue, {
      toValue: 100,
      duration: 3000,
    }).start();
  }

  render() {
    const interpolatedColorAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ["rgba(255,255,255, 1)", "rgba(51,156,177, 1)"],
    });

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, { backgroundColor: interpolatedColorAnimation }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    position: "absolute",
    top: 100,
    left: 100,
    width: 100,
    height: 100,
  },
});
