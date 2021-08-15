import { StatusBar } from "expo-status-bar";
import React, { PureComponent } from "react";
import { View, SafeAreaView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import CellNavigation from "../../components/CellNavigation";

export default class ReactNativeSharedElementScreen extends PureComponent {
  render() {
    return (
      <View style={globalStyles.container}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <CellNavigation
            name="Shared Element Transition React Navigation"
            route="Shared Element Transition React Navigation"
          />
          <CellNavigation
            name="Shared Element Transition React Navigation V5"
            route="Shared Element Transition React Navigation V5"
          />
          <CellNavigation
            name="Shared Element Transition"
            route="Shared Element Transition"
          />
          <CellNavigation
            name="Shared Element Transition Fade In Right"
            route="Shared Element Transition Fade In Right"
          />
        </SafeAreaView>
      </View>
    );
  }
}
