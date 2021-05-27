import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";

export default class EasingScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <Text style={globalStyles.bodyText}>Easing Screen</Text>
      </View>
    );
  }
}
