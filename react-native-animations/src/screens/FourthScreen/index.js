import CellNavigation from "../../components/CellNavigation";
import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default class FourthScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <Text style={globalStyles.title}>Fourth Screen</Text>
          <CellNavigation
            name="React Native Touchable Scale Feedback"
            route="React Native Touchable Scale Feedback"
          />
          <CellNavigation
            name="React Native Animate Loading Button"
            route="React Native Animate Loading Button"
          />
        </SafeAreaView>
      </View>
    );
  }
}
