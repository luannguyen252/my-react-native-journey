import LottieView from "lottie-react-native";
import React from "react";
import { View, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

export default function LottieAnimationSequence() {
  state = {
    isShow: false,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        source={require("./json_paydi_hai_qua/json_paydi_hai_qua_1.json")}
        style={{
          width: width,
          height: width,
          position: "absolute",
          zIndex: 1,
        }}
        autoPlay={true}
        loop={true}
        speed={1}
        onAnimationFinish={console.log(`Animation 1 is ${this.state.isShow}`)}
      />

      <LottieView
        source={require("./json_paydi_hai_qua/json_paydi_hai_qua_2.json")}
        style={{
          width: width,
          height: width,
          position: "absolute",
          zIndex: 2,
        }}
        autoPlay={true}
        loop={true}
        speed={1}
        onAnimationFinish={console.log(`Animation 2 is ${this.state.isShow}`)}
      />

      <LottieView
        source={require("./json_paydi_hai_qua/json_paydi_hai_qua_3.json")}
        style={{
          width: width,
          height: width,
          position: "absolute",
          zIndex: 3,
        }}
        autoPlay={true}
        loop={true}
        speed={1}
        onAnimationFinish={console.log(`Animation 3 is ${this.state.isShow}`)}
      />
    </View>
  );
}
