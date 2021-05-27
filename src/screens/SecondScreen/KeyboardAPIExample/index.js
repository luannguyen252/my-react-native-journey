import React, { useEffect, useState } from "react";
import { Keyboard, TextInput, StyleSheet, Text } from "react-native";

const KeyboardAPIExample = () => {
  const [didKeyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    //  Don't forget to cleanup with remove listeners
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  return (
    <React.Fragment>
      <TextInput
        style={styles.input}
        placeholder="Enter your information"
        keyboardType="default"
        returnKeyLabel="Done"
        returnKeyType="done"
        onSubmitEditing={Keyboard.dismiss}
      />
      {didKeyboardShow && (
        <Text style={styles.textStyle}>Keyboard is shown</Text>
      )}
      {!didKeyboardShow && (
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

export default KeyboardAPIExample;
