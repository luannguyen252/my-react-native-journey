import React from "react";
import { StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { PullDownToSearch } from "./PullDownToSearch";

export default function App() {
  return (
    <PullDownToSearch>
      <StatusBar style="auto" />
      <Text style={styles.text}>Pull Down To Search</Text>
    </PullDownToSearch>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
  },
});
