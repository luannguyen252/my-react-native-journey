import { usePreventScreenCapture } from "expo-screen-capture";
import React from "react";
import { Text, View } from "react-native";

export default function ScreenCaptureExample() {
  usePreventScreenCapture();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>
        As long as this component is mounted, this screen is unrecordable!
      </Text>
    </View>
  );
}
