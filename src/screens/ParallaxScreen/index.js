import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

import {
  ReactNativeParallaxScrollViewExample1,
  ReactNativeParallaxScrollViewExample2,
} from "./examples/";

export default class ParallaxScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <ReactNativeParallaxScrollViewExample2 />
      </View>
    );
  }
}
