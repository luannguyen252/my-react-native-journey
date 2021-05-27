import React from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";

const TouchableHighlightExample = () => {
  return (
    <View style={styles.container}>
      <TouchableHighlight>
        <Text style={styles.text}>Button</Text>
      </TouchableHighlight>
    </View>
  );
};

export default TouchableHighlightExample;

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
