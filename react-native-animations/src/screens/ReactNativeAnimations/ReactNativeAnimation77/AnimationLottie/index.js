import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import colors from "../../../../assets/styles/colors";

export default class AnimationLottie extends Component {
  state = {
    animate: true,
  };

  toggleAnimation() {
    const animate = !this.state.animate;
    animate ? this.animation.play() : this.animation.reset();
    this.setState({ animate });
  }

  render() {
    const { animate } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <LottieView
          source={require("./moon.json")}
          ref={(animation) => {
            this.animation = animation;
          }}
          loop
          autoPlay
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => this.toggleAnimation()}
          activeOpacity={0.8}
          style={{
            backgroundColor: colors.violet600,
            height: 56,
            paddingLeft: 24,
            paddingRight: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 24,
              fontWeight: "500",
              color: colors.white,
            }}
          >
            {animate ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
