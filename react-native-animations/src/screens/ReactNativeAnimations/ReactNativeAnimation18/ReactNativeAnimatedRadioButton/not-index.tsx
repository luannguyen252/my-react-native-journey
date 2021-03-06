import React from "react";
import { StatusBar, SafeAreaView, useColorScheme } from "react-native";
import RadioButton from "./lib/RadioButton";

export default function ReactNativeAnimatedRadioButton() {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <RadioButton
        onPress={(isActive: boolean) => console.log("isActive: ", isActive)}
      />
      <RadioButton
        style={{
          width: 70,
          height: 70,
          marginTop: 32,
          borderRadius: 35,
          borderColor: "#019310",
        }}
        innerBackgroundColor="#019310"
        innerContainerStyle={{ height: 50, width: 50, borderRadius: 25 }}
        onPress={(isActive: boolean) => console.log("isActive: ", isActive)}
      />
      <RadioButton
        style={{
          marginTop: 32,
          borderRadius: 16,
          borderWidth: 3,
          borderColor: "#328da8",
        }}
        isActive={false}
        innerBackgroundColor="#328da8"
        innerContainerStyle={{ height: 35, width: 35, borderRadius: 10 }}
        onPress={(isActive: boolean) => console.log("isActive: ", isActive)}
      />
    </SafeAreaView>
  );
}
