import React from "react";
import { Dimensions, View } from "react-native";
import CustomLottieView from "./CustomLottieView";
import TestView from "./TestView";

const { width: WIDTH_SCREEN } = Dimensions.get("screen");
const jsonArray = [
  require("./animations/json_pin_jump.json"),
  require("./animations/json_twitter_heart.json"),
  require("./animations/json_water_melon.json"),
];

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomLottieView
        sources={jsonArray}
        style={{
          width: WIDTH_SCREEN,
          height: WIDTH_SCREEN,
          position: "absolute",
          zIndex: 1,
        }}
        isRepeatLastJson={false} //Anh thay đổi dòng này để test 2 case anh vừa gọi nha
        LastComponent={<TestView />} //Component được show ra khi chạy hết các json, comment dòng này để ẩn khi phát json
      />
    </View>
  );
}
