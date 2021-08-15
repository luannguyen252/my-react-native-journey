import CellNavigation from "../../components/CellNavigation";
import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class SecondScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Second Screen</Text>
          <CellNavigation
            name="Handling Gestures Events Pan Responder"
            route="Handling Gestures Events Pan Responder"
          />
          <CellNavigation
            name="Handling Gestures Events Scroll"
            route="Handling Gestures Events Scroll"
          />
          <CellNavigation
            name="Lottie Animation Sequence"
            route="Lottie Animation Sequence"
          />
          <CellNavigation
            name="Lottie Animation Redirect Screen"
            route="Lottie Animation Redirect Screen"
          />
        </SafeAreaView>
      </View>
    );
  }
}
