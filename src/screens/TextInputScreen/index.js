import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import TextInputExample1 from "./examples/TextInputExample1";
import TextInputExample2 from "./examples/TextInputExample2";

export default class TextInputScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <TextInputExample1 />
        </SafeAreaView>
      </View>
    );
  }
}
