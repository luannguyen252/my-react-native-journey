import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  LayoutAnimation,
} from "react-native";
import styles from "./styles";

export default class LayoutAnimationTestView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  animateMe = () => {
    LayoutAnimation.spring();
    this.setState({
      shouldTransform: !this.state.shouldTransform,
    });
  };

  render() {
    const transform = this.state.shouldTransform
      ? { layout: "absolute", top: -50 }
      : {};

    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: "white" }]}
            onPress={this.animateMe}
          >
            <View style={[styles.square, transform]}>
              <Text style={styles.squareText}>{"Tap Me"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
