import React, { Component } from "react";
import { View, SafeAreaView, Animated, Easing, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import globalStyles from "../../assets/styles/globalStyles";

class BasicExample1 extends Component {
  render() {
    return (
      <LottieView
        source={require("../../assets/animations/json_pin_jump.json")}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
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
        style={{ width: 300, height: 300 }}
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
        style={{ width: 300, height: 300 }}
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
        style={{ width: 300, height: 300 }}
      />
    );
  }
}

export default function LottieReactNativeScreen() {
  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <StatusBar style="auto" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingBottom: 56,
          }}
        >
          <BasicExample1 />
          <BasicExample2 />
          <BasicExample3 />
          <BasicExample4 />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
