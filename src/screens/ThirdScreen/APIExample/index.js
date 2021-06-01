import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import FetchDataFromJSON from "./FetchDataFromJSON";
import LocalDataFromJSON from "./LocalDataFromJSON";
import FetchDataAPI from "./FetchDataAPI";
import FetchDataAPI2 from "./FetchDataAPI2";

export default class APIExample extends PureComponent {
  render() {
    return (
      <View style={[globalStyles.container, { backgroundColor: "#F9FAFB" }]}>
        <SafeAreaView>
          <StatusBar style="auto" />
          {/* <FetchDataAPI /> */}
          <FetchDataFromJSON />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 200,
            }}
          >
            <LocalDataFromJSON />
            <FetchDataAPI2 />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
