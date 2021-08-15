import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import colors from "../../../../assets/styles/colors";

export default function RollDice() {
  const [firstDieResult, setFirstDieResult] = useState(1);
  const [secondDieResult, setSecondDieResult] = useState(6);

  const firstDice = require(`./1.png`);
  const secondDice = require(`./2.png`);

  function rollDice() {
    setFirstDieResult(Math.floor(Math.random() * 6) + 1);
    setSecondDieResult(Math.floor(Math.random() * 6) + 1);
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 32,
        paddingLeft: 32,
        paddingRight: 32,
        backgroundColor: "white",
      }}
    >
      <View style={{}}>
        <View style={{ flexDirection: "row", margin: 20 }}>
          {/* <Image source={require(`${firstDieResult}.png`)} style={{}} />
          <Image source={require(`${secondDieResult}.png`)} style={{}} /> */}
        </View>
        <Text>{firstDieResult}</Text>
        <Text>{secondDieResult}</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={rollDice}
          style={{
            backgroundColor: colors.coolGray900,
            borderRadius: 8,
            height: 56,
            paddingLeft: 24,
            paddingRight: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              lineHeight: 24,
              fontWeight: "500",
              color: "white",
            }}
          >
            Roll
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
