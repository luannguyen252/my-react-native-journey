import CellNavigation from "../../components/CellNavigation";
import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { ScrollView, Text, SafeAreaView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export default class FifthScreen extends PureComponent {
  render() {
    return (
      <ScrollView style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Fifth Screen</Text>
          <CellNavigation
            name="React Native Swipe Gestures"
            route="React Native Swipe Gestures"
          />
          <CellNavigation
            name="Lottie React Native"
            route="Lottie React Native"
          />
          <CellNavigation name="Easing" route="Easing" />
          <CellNavigation
            name="React Native Collapsible Toolbar"
            route="React Native Collapsible Toolbar"
          />
          <CellNavigation
            name="React Native Blinking Animation"
            route="React Native Blinking Animation"
          />
          <CellNavigation
            name="React Native Gesture Flip Card"
            route="React Native Gesture Flip Card"
          />
          <CellNavigation
            name="React Native Rotate Image"
            route="React Native Rotate Image"
          />
          <CellNavigation
            name="React Native Animated Ellipsis"
            route="React Native Animated Ellipsis"
          />
          <CellNavigation
            name="Flip Image View Horizontally"
            route="Flip Image View Horizontally"
          />
          <CellNavigation name="Moving Square" route="Moving Square" />
          <CellNavigation name="Color Square" route="Color Square" />
          <CellNavigation name="Rotate Square" route="Rotate Square" />
          <CellNavigation name="Drag Square" route="Drag Square" />
          <CellNavigation
            name="React Native Animated Circular Progress"
            route="React Native Animated Circular Progress"
          />
          <CellNavigation
            name="React Native Animated Swiper"
            route="React Native Animated Swiper"
          />
          <CellNavigation
            name="React Native Shared Element"
            route="React Native Shared Element"
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
