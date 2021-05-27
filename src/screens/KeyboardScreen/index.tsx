import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";
import { KeyboardAvoidingExample } from "./examples";

export default class KeyboardScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <KeyboardAvoidingExample />
      </View>
    );
  }
}
