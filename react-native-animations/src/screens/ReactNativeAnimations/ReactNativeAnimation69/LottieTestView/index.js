import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import trophy from "./trophy.json";
import LottieAnimation from "lottie-react-native";

export default class LottieTestView extends Component {
  storeAnimationRef = (ref) => {
    this.trophyRef = ref;
  };

  animateMe = () => {
    this.trophyRef.play();
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
            <View style={styles.square}>
              <Text style={styles.squareText}>{"Tap Me"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <LottieAnimation
          ref={this.storeAnimationRef}
          style={{ position: "absolute", bottom: 10, height: 200, width: 300 }}
          loop={false}
          source={trophy}
        />
      </SafeAreaView>
    );
  }
}
