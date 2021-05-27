import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../assets/styles/globalStyles";

export default class Examples extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Examples</Text>
        </SafeAreaView>
      </View>
    );
  }
}
