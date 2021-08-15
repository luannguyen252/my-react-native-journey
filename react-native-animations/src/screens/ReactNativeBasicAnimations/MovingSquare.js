import React, { Component } from "react";
import { StyleSheet, View, Animated } from "react-native";

export default class MovingSquare extends Component {
  componentWillMount() {
    this._animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this._animatedValue, {
      toValue: 300,
      duration: 500,
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.box,
            { transform: [{ translateY: this._animatedValue }] },
          ]}
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
    backgroundColor: "red",
    position: "absolute",
    top: 100,
    left: 100,
    width: 100,
    height: 100,
  },
});
