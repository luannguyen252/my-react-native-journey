import React from "react";
import { View, TouchableNativeFeedback, Text, StyleSheet } from "react-native";

const TouchableNativeFeedbackExample = () => {
  return (
    <View style={styles.container}>
      <TouchableNativeFeedback>
        <Text style={styles.text}>Button</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

export default TouchableNativeFeedbackExample;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    borderWidth: 1,
    padding: 25,
    borderColor: "black",
    backgroundColor: "red",
  },
});
