import React, { Component } from "react";
import { SafeAreaView, Animated, Easing, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import styles from "./styles";

class BasicExample1 extends Component {
  render() {
    return (
      <LottieView
        source={require("../../assets/animations/json_pin_jump.json")}
        autoPlay
        loop
        style={styles.lottieView}
      />
    );
  }
}

class BasicExample2 extends Component {
  componentDidMount() {
    this.animation.play();
    // Set a specific startFrame and endFrame with:
    this.animation.play(30, 120);
  }

  render() {
    return (
      <LottieView
        ref={(animation) => {
          this.animation = animation;
        }}
        source={require("../../assets/animations/json_pin_jump.json")}
        autoPlay
        loop
        style={styles.lottieView}
      />
    );
  }
}

class BasicExample3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  render() {
    return (
      <LottieView
        progress={this.state.progress}
        source={require("../../assets/animations/json_pin_jump.json")}
        style={styles.lottieView}
      />
    );
  }
}

class BasicExample4 extends Component {
  render() {
    return (
      <LottieView
        source={require("../../assets/animations/json_pin_jump.json")}
        colorFilters={[
          {
            keypath: "button",
            color: "#F00000",
          },
          {
            keypath: "Sending Loader",
            color: "#F00000",
          },
        ]}
        autoPlay
        loop
        style={styles.lottieView}
      />
    );
  }
}

export default function LottieReactNativeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <BasicExample1 />
        <BasicExample2 />
        <BasicExample3 />
        <BasicExample4 />
      </SafeAreaView>
    </ScrollView>
  );
}
