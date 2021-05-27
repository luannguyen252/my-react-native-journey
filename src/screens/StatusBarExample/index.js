import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

export default class StatusBarExample extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff" }}>
          Notice that the status bar has light text!
        </Text>
        <StatusBar style="light" />
      </View>
    );
  }
}
