import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StyleSheetExample2 = () => (
  <View style={container}>
    <Text style={text}>React Native</Text>
  </View>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    color: "#000",
  },
});

const lists = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: "#61dafb",
  },
  listItem: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);

export default StyleSheetExample2;
