// Read more: https://www.w3schools.com/react/react_lifecycle.asp
import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import ReactLifecycleExample1 from "./ReactLifecycleExample1";
import ReactLifecycleExample2 from "./ReactLifecycleExample2";
import ReactLifecycleExample3 from "./ReactLifecycleExample3";

export default class ReactLifecycleExample extends PureComponent {
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
            <Text style={globalStyles.title}>Mounting</Text>
            <ReactLifecycleExample1 />
            <Text style={globalStyles.title}>Updating</Text>
            <ReactLifecycleExample2 />
            <Text style={globalStyles.title}>Unmounting</Text>
            <ReactLifecycleExample3 />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
