import React from "react";
import { View, AppRegistry } from "react-native";

// import { LocalImage, RemoteImage, containerStyles } from './src/BasicImage';
// import { ImageStyles1, ImageStyles2, containerStyles } from './src/ImageResizeStyles';
import BackgroundImage, { containerStyles } from "./src/BackgroundImage";

const Demo = () => (
  <View style={containerStyles.container}>
    <BackgroundImage />
  </View>
);

AppRegistry.registerComponent("ImageStyles", () => Demo);
