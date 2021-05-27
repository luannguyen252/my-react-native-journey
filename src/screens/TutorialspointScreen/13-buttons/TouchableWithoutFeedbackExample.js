import React from "react";
import { TouchableWithoutFeedback, StyleSheet, View, Text } from "react-native";

const TouchableWithoutFeedbackExample = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Text style={styles.text}>Button</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default TouchableWithoutFeedbackExample;

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
