import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function ReactEventsExample5() {
  const [value, onChangeText] = useState("");

  return (
    <View style={{ paddingTop: 16, paddingBottom: 16 }}>
      <Text>Events Example 5</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholder="Enter your component name"
      />
      {value === "" ? null : <Text>Your company name is: {value}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 4,
  },
});
