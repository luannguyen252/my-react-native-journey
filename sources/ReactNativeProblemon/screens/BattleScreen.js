import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
//Components
import Player from "../components/Player";
import ValueInputter from "../components/Player/ValueInputter";
import KeyboardValueInputter from "../components/Player/ValueInputter";
import DiceDisplay from "../components/DiceDisplay";
//Utils
import { damageHealth } from "../util/playerFunctions";
import { showMessage } from "react-native-flash-message";
import {
  functionDatabaseNormal,
  functionDatabaseHard
} from "../util/functionDatabase";

const WIDTH = Dimensions.get("window").width;
const BattleScreen = ({ navigation, screenProps }) => {
  const functionDatabase = screenProps.isHard
    ? functionDatabaseHard
    : functionDatabaseNormal;
  const defaultFuncP1 =
    functionDatabase[Math.ceil(Math.random() * functionDatabase.length - 1)];
  const defaultFuncP2 =
    functionDatabase[Math.ceil(Math.random() * functionDatabase.length - 1)];

  //Game State
  const [gameOver, setGameOver] = useState(false);
  const [isAwaitingInput, setIsAwaitingInput] = useState(true);
  console.log("isAwaitingInput...", isAwaitingInput);
  //Dice State
  const [diceStatusType, setDiceStatusType] = useState(1); //1: (calc, derivative, integrate) 2:(1,2,3,4,5,6)
  const [diceResultType, setDiceResultType] = useState(0);
  const [diceStatusNum, setDiceStatusNum] = useState(2); //1: (calc, derivative, integrate) 2:(1,2,3,4,5,6)
  const [diceResultNum, setDiceResultNum] = useState(0);
  const [isRolling, setIsRolling] = useState(isAwaitingInput);
  const [isCancelled, setIsCancelled] = useState(false);

  //Player State
  const [healthP2, setHealthP2] = useState(100);
  const [funcP2, setFuncP2] = useState(defaultFuncP1);
  const [healthP1, setHealthP1] = useState(100);
  const [funcP1, setFuncP1] = useState(defaultFuncP2);

  // Testing;
  //   useEffect(() => {
  //     damageHealth(healthP1, setHealthP1, 15);
  //     setGameOver(true);
  //   }, []);
  useEffect(() => {
    if (gameOver) {
      navigation.navigate("Title");
    }
    if (diceResultType != 3) {
      setIsCancelled(true);
    } else {
      setIsCancelled(false);
    }
  });

  console.log("Platform: ", Platform.OS);

  return (
    <View style={styles.container}>
      <Player func={funcP2} health={healthP2} index={"P2"} />
      <View style={styles.diceContainer}>
        <DiceDisplay
          isAwaitingInput={isAwaitingInput}
          diceStatus={diceStatusType}
          setDiceStatus={setDiceStatusType}
          setDiceResult={setDiceResultType}
          diceResult={diceResultType}
          setIsAwaitingInput={setIsAwaitingInput}
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          isCancelled={isCancelled}
          setIsCancelled={setIsCancelled}
        />
        <DiceDisplay
          isAwaitingInput={isAwaitingInput}
          diceStatus={diceStatusNum}
          setDiceStatus={setDiceStatusNum}
          setDiceResult={setDiceResultNum}
          diceResult={diceResultNum}
          setIsAwaitingInput={setIsAwaitingInput}
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          isCancelled={isCancelled}
          setIsCancelled={setIsCancelled}
        />
      </View>
      <View>
        <KeyboardValueInputter
          diceResultType={diceResultType}
          diceResultNum={diceResultNum}
          funcP2={funcP2}
          setFuncP2={setFuncP2}
          funcP1={funcP1}
          setFuncP1={setFuncP1}
          healthP1={healthP1}
          healthP2={healthP2}
          setHealthP1={setHealthP1}
          setHealthP2={setHealthP2}
          isAwaitingInput={isAwaitingInput}
          setIsAwaitingInput={setIsAwaitingInput}
          isRolling={isRolling}
          setIsRolling={setIsRolling}
          setGameOver={setGameOver}
        />
        <Player func={funcP1} health={healthP1} index={"P1"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingTop: 10
  },
  diceContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export default BattleScreen;
