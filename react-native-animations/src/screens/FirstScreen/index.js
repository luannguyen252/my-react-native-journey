import CellNavigation from "../../components/CellNavigation";
import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class FirstScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>First Screen</Text>
          <CellNavigation
            name="Section 02 Animating Properties"
            route="Section 02 Animating Properties"
          />
          <CellNavigation
            name="Section 03 Animated Value"
            route="Section 03 Animated Value"
          />
          <CellNavigation
            name="Section 04 Animated Functions"
            route="Section 04 Animated Functions"
          />
          <CellNavigation
            name="Section 05 Combining Animations"
            route="Section 05 Combining Animations"
          />
          <CellNavigation
            name="Section 06 Interpolation"
            route="Section 06 Interpolation"
          />
          <CellNavigation
            name="Section 07 Native Animations"
            route="Section 07 Native Animations"
          />
          <CellNavigation
            name="Section 08 Gestures And Animations"
            route="Section 08 Gestures And Animations"
          />
          <CellNavigation
            name="Section 09 Understanding How Animated Works"
            route="Section 09 Understanding How Animated Works"
          />
          <CellNavigation
            name="Section 10 Animated Techniques"
            route="Section 10 Animated Techniques"
          />
          <CellNavigation
            name="Section 11 Basic Real World"
            route="Section 11 Basic Real World"
          />
          <CellNavigation
            name="Section 12 Advanced Real World"
            route="Section 12 Advanced Real World"
          />
        </SafeAreaView>
      </View>
    );
  }
}
