import React, { useState } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { checkAnswer } from "../../util/playerFunctions";

const WIDTH = Dimensions.get("window").width;

const ValueInputter = ({
  diceResultType,
  diceResultNum,
  funcP2,
  setFuncP2,
  funcP1,
  setFuncP1,
  healthP1,
  healthP2,
  setHealthP1,
  setHealthP2,
  isAwaitingInput,
  setIsAwaitingInput,
  isRolling,
  setIsRolling,
  setGameOver
}) => {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        autoCorrect={false}
        autoCapitalize={"none"}
        placeholder="Enter Function or Value"
        // placeholderTextColor="#ffffff"
        value={value}
        onChange={text => {
          setValue(text.nativeEvent.text);
        }}
        onSubmitEditing={() => {
          console.log("Submitted", value);
          checkAnswer(
            diceResultType,
            diceResultNum,
            funcP2,
            setFuncP2,
            funcP1,
            setFuncP1,
            healthP1,
            setHealthP1,
            healthP2,
            setHealthP2,
            isAwaitingInput,
            setIsAwaitingInput,
            isRolling,
            setIsRolling,
            setGameOver,
            value
          );
          setValue("");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    marginHorizontal: 15
  },
  input: {
    fontFamily: "pixel",
    fontSize: 12,
    height: 50,
    width: WIDTH - 100
  }
});

export default ValueInputter;
