import React from "react";
import LottieView from "lottie-react-native";

export default function JSONTabBarKhac() {
  return (
    <LottieView
      source={require("./json_tab_bar_khac.json")}
      autoPlay={false}
      loop={false}
      speed={1}
      style={{ width: 32, height: 32 }}
    />
  );
}
