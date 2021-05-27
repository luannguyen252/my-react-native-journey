import React from "react";
import { Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

export default function AppearanceScreen() {
  return (
    <AppearanceProvider>
      <MyAppearance />
    </AppearanceProvider>
  );
}

function MyAppearance() {
  const colorScheme = useColorScheme();

  const themeStatusBarStyle =
    colorScheme === "light" ? "dark-content" : "light-content";
  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <StatusBar barStyle={themeStatusBarStyle} />
      <Text style={[styles.text, themeTextStyle]}>
        Color scheme: {colorScheme}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lightContainer: {
    backgroundColor: "#D0D0C0",
  },
  darkContainer: {
    backgroundColor: "#242C40",
  },
  lightThemeText: {
    color: "#242C40",
  },
  darkThemeText: {
    color: "#D0D0C0",
  },
});
