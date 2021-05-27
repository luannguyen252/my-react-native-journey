import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
//Import Character Components
import HealthIndicator from "./Player/HealthIndicator";

const p1Sprite = require("../../assets/images/p1Sprite.png");
const p2Sprite = require("../../assets/images/p2Sprite.png");

const Player = ({ func, health, index }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          index === "P1"
            ? styles.problemonContainer1
            : styles.problemonContainer2
        }
      >
        <Image
          source={index === "P1" ? p1Sprite : p2Sprite}
          style={index === "P1" ? styles.imageStyle1 : styles.imageStyle2}
        />
        <Text style={index === "P1" ? styles.funcStyle1 : styles.funcStyle2}>
          = {func}
        </Text>
      </View>
      <HealthIndicator health={health} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 20
  },
  problemonContainer1: {
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  problemonContainer2: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  funcStyle1: {
    fontFamily: "pixel",
    fontSize: 12,
    marginTop: 20
  },
  funcStyle2: {
    fontFamily: "pixel",
    fontSize: 12,
    marginTop: 20
  },
  imageStyle1: {
    alignSelf: "center",
    marginRight: 20,
    height: 61,
    width: 71
  },
  imageStyle2: {
    alignSelf: "center",
    marginRight: 20,
    height: 61,
    width: 71
  }
});

export default Player;
