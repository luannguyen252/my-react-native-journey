import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default class NativeBaseExample extends PureComponent {
  render() {
    return (
      <View style={{}}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={{}}>Native Base Example</Text>
        </SafeAreaView>
      </View>
    );
  }
}
