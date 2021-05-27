import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

import {
  ReanimatedBottomSheetExample1,
  ReanimatedBottomSheetExample2,
  ReanimatedBottomSheetExample3,
  ReanimatedBottomSheetExample4,
  ReanimatedBottomSheetExample5,
  ReanimatedBottomSheetExample6,
  ReanimatedBottomSheetExample7,
  ReanimatedBottomSheetExample8,
  ReanimatedBottomSheetExample9,
  ReactNativeRawBottomSheetExample1,
  ReactNativeRawBottomSheetExample2,
  ReactNativeRawBottomSheetExample3,
} from "./examples/";

export default class BottomSheetScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <ReactNativeRawBottomSheetExample3 />
      </View>
    );
  }
}
