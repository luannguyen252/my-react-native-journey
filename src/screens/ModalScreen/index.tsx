import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

import {
  ReactNativeModalExample1,
  ReactNativeModalExample2,
  ReactNativeModalExample3,
} from "./examples/";

export default class ModalScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <ReactNativeModalExample3 />
        </SafeAreaView>
      </View>
    );
  }
}
