import React from "react";
import { View, Text } from "react-native";
import SwitchToggle from "./SwitchToggle";

export default function ReactNativeSwitchToggle() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, lineHeight: 24, fontWeight: "700" }}>
        Basic Style
      </Text>
      <SwitchToggle switchOn={on} onPress={() => off(!on)} />

      <Text style={{ fontSize: 18, lineHeight: 24, fontWeight: "700" }}>
        Custom Color
      </Text>
      <SwitchToggle
        switchOn={on}
        onPress={() => off(!on)}
        circleColorOff="#C4C4C4"
        circleColorOn="#00D9D5"
        backgroundColorOn="#6D6D6D"
        backgroundColorOff="#C4C4C4"
      />

      <Text style={{ fontSize: 18, lineHeight: 24, fontWeight: "700" }}>
        Custom Size
      </Text>
      <SwitchToggle
        switchOn={on}
        onPress={() => off(!on)}
        containerStyle={{
          marginTop: 16,
          width: 106,
          height: 48,
          borderRadius: 25,
          padding: 5,
        }}
        circleStyle={{
          width: 40,
          height: 40,
          borderRadius: 20,
        }}
      />
    </View>
  );
}
