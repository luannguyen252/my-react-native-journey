import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import styles from "./styles";

export default class AnimatedTestView extends Component {
  constructor() {
    super();
    this.spinValue = new Animated.Value(0);
  }

  animateMe = () => {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: "white" }]}
            onPress={this.animateMe}
          >
            <Animated.View
              style={[styles.square, { transform: [{ rotate: spin }] }]}
            >
              <Text style={styles.squareText}>{"Tap Me"}</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
