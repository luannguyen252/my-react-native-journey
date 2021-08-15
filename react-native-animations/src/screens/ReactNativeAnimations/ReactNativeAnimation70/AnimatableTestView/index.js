import React, { Component } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";

export default class AnimatableTestView extends Component {
  storeSquareRef = (ref) => {
    this.squareRef = ref;
  };

  animateMe = () => {
    this.squareRef.swing(1000);
  };

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: "white" }]}
            onPress={this.animateMe}
          >
            <Animatable.View style={styles.square} ref={this.storeSquareRef}>
              <Text style={styles.squareText}>{"Tap Me"}</Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
