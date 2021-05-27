import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import KeyboardButton from "./KeyboardButton";

const deleteIcon = require("../../../assets/images/deleteButton.png");
const enterIcon = require("../../../assets/images/enterButton.png");

const Keyboard = ({ value, setValue, submit }) => {
  return (
    <View style={styles.supremeContainer}>
      <View style={styles.container}>
        <View style={styles.numberContainer}>
          <View style={styles.numberRowContainer}>
            <KeyboardButton value={value} setValue={setValue} buttonVal={"1"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"2"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"3"} />
          </View>
          <View style={styles.numberRowContainer}>
            <KeyboardButton value={value} setValue={setValue} buttonVal={"4"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"5"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"6"} />
          </View>
          <View style={styles.numberRowContainer}>
            <KeyboardButton value={value} setValue={setValue} buttonVal={"7"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"8"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"9"} />
          </View>
          <View style={styles.numberRowContainer}>
            <KeyboardButton value={value} setValue={setValue} buttonVal={"."} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"0"} />
            <KeyboardButton value={value} setValue={setValue} buttonVal={"x"} />
          </View>
        </View>
        <View style={styles.signContainer}>
          <KeyboardButton value={value} setValue={setValue} buttonVal={"+"} />
          <KeyboardButton value={value} setValue={setValue} buttonVal={"-"} />
          <KeyboardButton value={value} setValue={setValue} buttonVal={"/"} />
          <KeyboardButton value={value} setValue={setValue} buttonVal={"^"} />
        </View>
        <View style={styles.utilContainer}>
          <TouchableOpacity
            style={styles.specialContainer}
            onPress={() => {
              setValue(value.slice(0, value.length - 1));
            }}
          >
            <Image source={deleteIcon} style={styles.specialIconStyle} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.specialContainer}
            onPress={() => {
              submit();
              setValue("");
            }}
          >
            <Image source={enterIcon} style={styles.specialIconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  supremeContainer: {
    justifyContent: "center"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#000000",
    borderWidth: 3
  },
  numberContainer: {
    justifyContent: "center"
  },
  numberRowContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  signContainer: {
    justifyContent: "center"
  },
  utilContainer: {
    justifyContent: "center",
    flexDirection: "column"
  },
  specialContainer: {
    justifyContent: "center",
    borderColor: "#000000",
    borderWidth: 3,
    width: 50,
    height: 50,
    margin: 5
  },
  specialText: {
    fontFamily: "pixel",
    alignSelf: "center"
  },
  specialIconStyle: {
    height: 40,
    width: 40,
    alignSelf: "center"
  }
});

export default Keyboard;
