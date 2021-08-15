import React from "react";
import { Dimensions, View } from "react-native";
import AnimationFlatlist from "./src/AnimationFlatlist";

const { width, height } = Dimensions.get("window");

let SampleData = [
  {
    title: "First Wallpaper",
    // image: require("./assets/spiderman.jpg"),
    image: require("../../../../assets/backgrounds/1.jpg"),
    subTitle: "macOS",
  },
  {
    title: "Second Wallpaper",
    subTitle: "macOS",
    // image: require("./assets/deadpool.jpg"),
    image: require("../../../../assets/backgrounds/2.jpg"),
  },
  {
    title: "Third Wallpaper",
    subTitle: "macOS",
    // image: require("./assets/stormtrooper.jpg"),
    image: require("../../../../assets/backgrounds/3.jpg"),
  },
  {
    title: "Fourth Wallpaper",
    subTitle: "macOS",
    // image: require("./assets/toy.jpg"),
    image: require("../../../../assets/backgrounds/4.jpg"),
  },
  {
    title: "Fifth Wallpaper",
    subTitle: "macOS",
    // image: require("./assets/wolverine.jpg"),
    image: require("../../../../assets/backgrounds/5.jpg"),
  },
];

const ITEM_SIZE = width - 120;
const ITEM_HEIGHT = height / 2;

export default class AnimationFlatlistDemo extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimationFlatlist
          data={SampleData}
          height={ITEM_HEIGHT}
          width={ITEM_SIZE}
          title={"macOS Wallpapers"}
          subTitle={"Big Sur"}
          // primaryBackgroundColor="#4528AC"
          // secondaryBackgroundColor="rgb(245, 245, 245)"
          // textPrimaryColor="#fff"
          // textSecondaryColor="#000"
        />
      </View>
    );
  }
}
