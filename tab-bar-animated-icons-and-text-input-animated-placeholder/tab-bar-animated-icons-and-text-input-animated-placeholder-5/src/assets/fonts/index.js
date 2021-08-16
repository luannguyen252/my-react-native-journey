import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function CustomFont() {
  const [loaded] = useFonts({
    ChivoRegular: require("./chivo-regular.ttf"),
    ChivoBold: require("./chivo-bold.ttf"),
    ChivoBlack: require("./chivo-black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "ChivoRegular", fontSize: 32 }}>
        Chive Regular
      </Text>
      <Text style={{ fontFamily: "ChivoBold", fontSize: 32 }}>Chive Bold</Text>
      <Text style={{ fontFamily: "ChivoBlack", fontSize: 32 }}>
        Chive Black
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
