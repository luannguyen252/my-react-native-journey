import React from "react";
import { Keyboard, TextInput, StyleSheet, Text } from "react-native";
import { useKeyboard } from "@react-native-community/hooks";

const UseKeyboardHookExample = () => {
  const keyboard = useKeyboard();

  return (
    <React.Fragment>
      <TextInput
        style={styles.input}
        placeholder="Enter your information"
        keyboardType="default"
        autoCorrect="true"
        returnKeyLabel="Done"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
      {keyboard.keyboardShown && (
        <Text style={styles.textStyle}>Keyboard is shown</Text>
      )}
      {!keyboard.keyboardShown && (
        <Text style={styles.textStyle}>Keyboard is hidden</Text>
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 60,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
  },
});

export default UseKeyboardHookExample;
