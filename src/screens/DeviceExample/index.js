// https://docs.expo.io/versions/v41.0.0/sdk/device/
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Device from "expo-device";
import globalStyles from "../../assets/styles/globalStyles";

export default class DeviceExample extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Device Example</Text>
        </SafeAreaView>
      </View>
    );
  }
}
