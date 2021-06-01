import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import StateExample from "./StateExample";

export default class StateAndPropExample extends PureComponent {
  render() {
    return (
      <View style={[globalStyles.container, { backgroundColor: "#F9FAFB" }]}>
        <SafeAreaView>
          <StatusBar style="auto" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 200,
            }}
          >
            <Text>State And Prop Example</Text>
            <StateExample />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
