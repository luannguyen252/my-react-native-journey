import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Button({ name, onPress }) {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {},
  buttonText: {},
});
