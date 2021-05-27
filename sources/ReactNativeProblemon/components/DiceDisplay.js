import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";

const DiceDisplay = ({
  isAwaitingInput,
  diceStatus,
  setDiceStatus,
  setDiceResult,
  diceResult,
  setIsAwaitingInput,
  isRolling,
  setIsRolling,
  isCancelled,
  setIsCancelled
}) => {
  const numDiceGif = require("../../assets/images/diceNumGif.gif");

  const numDice1 = require("../../assets/images/d1.png");
  const numDice2 = require("../../assets/images/d2.png");
  const numDice3 = require("../../assets/images/d3.png");
  const numDice4 = require("../../assets/images/d4.png");
  const numDice5 = require("../../assets/images/d5.png");
  const numDice6 = require("../../assets/images/d6.png");
  const diceNums = [numDice1, numDice2, numDice3, numDice4, numDice5, numDice6];
  const typeDiceGif = require("../../assets/images/diceTypeGif.gif");

  const typeDiceIntegrate = require("../../assets/images/dIntegral.png");
  const typeDiceDerive = require("../../assets/images/dDerive.png");
  const typeDiceCalculate = require("../../assets/images/dCalculate.png");
  const diceTypes = [typeDiceDerive, typeDiceIntegrate, typeDiceCalculate];
  const dNull = require("../../assets/images/dNull.png");

  // const [isRolling, setIsRolling] = useState(isAwaitingInput);
  console.log("isRolling...", isRolling);
  const [diceImage, setDiceImage] = useState(numDiceGif);
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    if (isRolling) {
      if (diceStatus == 1) {
        setSubtitle("");
        setDiceImage(typeDiceGif);
      } else {
        if (isCancelled === false) {
          setSubtitle("");
          setDiceImage(numDiceGif);
        } else {
          setSubtitle("");
          setDiceImage(null);
        }
      }
    }
  });
  // if (invisibility === true) {
  //   return null;
  // } else {
  if (isRolling && diceStatus == 1) {
    //Type Dice
    setTimeout(() => {
      const result = Math.ceil(Math.random() * 3);
      setIsRolling(false);
      setDiceResult(result);
      setDiceImage(diceTypes[result - 1]);
      if (result === 1) {
        setSubtitle("Derive");
      } else if (result === 2) {
        setSubtitle("Integrate");
      } else {
        //3
        setSubtitle("Calculate");
      }
      console.log("Type: ", result);
      setIsAwaitingInput(true);
    }, 3000);
  } else if (isRolling && diceStatus == 2) {
    //Number Dice
    setTimeout(() => {
      const result = Math.ceil(Math.random() * 6);
      setIsRolling(false);
      setDiceResult(result);
      setDiceImage(diceNums[result - 1]);
      setSubtitle(result);
      console.log("Number: ", result);
      setIsAwaitingInput(true);
    }, 3500);
  }

  if (isCancelled && diceStatus == 2) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <Image source={diceImage} style={styles.image} />
        <Text style={styles.text}>{subtitle}</Text>
      </View>
    );
  }

  // }
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignSelf: "center",
    height: 69,
    marginBottom: 10
  },
  containerCancelled: {
    height: 69,
    width: 50,
    marginBottom: 10
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  text: {
    alignSelf: "center",
    fontFamily: "pixel"
  }
});

export default DiceDisplay;
