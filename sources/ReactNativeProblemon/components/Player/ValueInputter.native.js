import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import InputDisplay from "./InputDisplay";
import Keyboard from "./Keyboard";
import { checkAnswer } from "../../util/playerFunctions";

const WIDTH = Dimensions.get("window").width;

const KeyboardValueInputter = ({
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

  const submit = () => {
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
  };

  return (
    <View style={styles.container}>
      <InputDisplay value={value} setValue={setValue} />
      <Keyboard value={value} setValue={setValue} submit={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    marginHorizontal: 15,
    padding: 5
  }
});

export default KeyboardValueInputter;
