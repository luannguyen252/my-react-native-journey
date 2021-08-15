import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, SafeAreaView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";

export default function ReactNativeAnimatableLooping() {
  return (
    <View
      style={[
        globalStyles.container,
        { justifyContent: "center", alignItems: "center" },
      ]}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <View style={{ flexDirection: "column", justifyContent: "center" }}>
          <Animatable.Text
            animation="slideInDown"
            easing="ease-in-out"
            iterationCount={5}
            direction="alternate"
            style={globalStyles.title}
          >
            Up and down you go
          </Animatable.Text>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{ textAlign: "center", fontSize: 64 }}
          >
            ❤️
          </Animatable.Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
