import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StyleSheetExample4 = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>1</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    position: "absolute",
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: "red",
  },
  box2: {
    ...StyleSheet.absoluteFill,
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
  box3: {
    position: "absolute",
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: "green",
  },
  text: {
    color: "#FFF",
    fontSize: 80,
  },
});

export default StyleSheetExample4;
