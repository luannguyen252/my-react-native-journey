import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";

export default class DimensionsScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <Text style={globalStyles.bodyText}>Dimensions Screen</Text>
      </View>
    );
  }
}
