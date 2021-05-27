// 1. expo install expo-haptics
// 2. npx pod-install
import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import globalStyles from "../../assets/styles/globalStyles";

export default class HapticsScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <StatusBar style="auto" />
        <Text style={globalStyles.bodyText}>Haptics Screen</Text>
      </View>
    );
  }
}

// Haptics.selectionAsync()

// Haptics.NotificationFeedbackType.Success
// Haptics.NotificationFeedbackType.Warning
// Haptics.NotificationFeedbackType.Error

// Haptics.ImpactFeedbackStyle.Light
// Haptics.ImpactFeedbackStyle.Medium
// Haptics.ImpactFeedbackStyle.Heavy
