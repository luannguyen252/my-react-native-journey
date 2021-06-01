import React, { PureComponent } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import FetchDataFromJSON from "./FetchDataFromJSON";
import LocalDataFromJSON from "./LocalDataFromJSON";

export default class APIExample extends PureComponent {
  render() {
    return (
      <View style={[globalStyles.container, { backgroundColor: "#F9FAFB" }]}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <FetchDataFromJSON />
          <LocalDataFromJSON />
        </SafeAreaView>
      </View>
    );
  }
}
