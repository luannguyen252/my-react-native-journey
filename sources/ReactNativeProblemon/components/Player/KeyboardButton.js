import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const KeyboardButton = ({ value, setValue, buttonVal }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setValue(value + buttonVal);
      }}
    >
      <Text style={styles.text}>{buttonVal}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    width: 40,
    height: 40,
    margin: 5
  },
  text: {
    fontFamily: "pixel",
    alignSelf: "center"
  }
});

export default KeyboardButton;
