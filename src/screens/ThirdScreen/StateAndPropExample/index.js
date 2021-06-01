import React, { PureComponent } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import globalStyles from "../../../assets/styles/globalStyles";
import StateExample from "./StateExample";
import StateArrayExample from "./StateArrayExample";
import PropsExample from "./PropExample";
import PropsExample2 from "./PropsExample2";
import PropsExample3 from "./PropsExample3";
import PropsExample4 from "./PropsExample4";
import PropsExample5 from "./PropsExample5";

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
            <Text style={globalStyles.title}>State Example</Text>
            <StateExample />
            <StateArrayExample />

            <Text style={globalStyles.title}>Props Example</Text>
            <PropsExample
              name="Luan Nguyen"
              age="30"
              job="Digital Product Designer"
            />
            <PropsExample2 />
            <PropsExample3 />
            <PropsExample4 />
            <PropsExample5 />
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}
