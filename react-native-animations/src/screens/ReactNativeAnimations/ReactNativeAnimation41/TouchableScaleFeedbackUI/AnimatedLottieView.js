import React from "react";
import LottieView from "lottie-react-native";

export default function AnimatedLottieView({ viewStyle }) {
  return (
    <LottieView
      style={viewStyle}
      source={require("./social-media-marketing.json")}
      autoPlay
      loop
    />
  );
}
