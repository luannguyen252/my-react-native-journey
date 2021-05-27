import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InputDisplay = ({ value, setValue }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.input}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    marginBottom: 5,
    height: 30
  },
  input: {
    fontFamily: "pixel",
    fontSize: 10,
    textAlign: "center"
  }
});

export default InputDisplay;
