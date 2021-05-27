import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";

const TouchableOpacityExample = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.text}>Button</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TouchableOpacityExample;

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
