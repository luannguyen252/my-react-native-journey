import CellNavigation from "../../components/CellNavigation";
import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class ThirdScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Third Screen</Text>
          <CellNavigation
            name="React Native Animatable Fade In Up"
            route="React Native Animatable Fade In Up"
          />
          <CellNavigation
            name="React Native Animatable Slide In Right"
            route="React Native Animatable Slide In Right"
          />
          <CellNavigation
            name="React Native Animatable Looping"
            route="React Native Animatable Looping"
          />
          <CellNavigation name="Tinder Swiping" route="Tinder Swiping" />
          <CellNavigation
            name="React Native Animation"
            route="React Native Animation"
          />
        </SafeAreaView>
      </View>
    );
  }
}
