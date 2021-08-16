import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style";

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.buttonPrimaryContainer}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={styles.buttonPrimaryText}>{title}</Text>
    </TouchableOpacity>
  );
}
