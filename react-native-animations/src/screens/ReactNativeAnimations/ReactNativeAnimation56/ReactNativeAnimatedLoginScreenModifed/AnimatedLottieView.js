import React from "react";
import LottieView from "lottie-react-native";

export default function AnimatedLottieView({ lottieStyle }) {
  return (
    <LottieView
      style={lottieStyle}
      source={require("./json_group_working.json")}
      autoPlay
      loop
    />
  );
}
