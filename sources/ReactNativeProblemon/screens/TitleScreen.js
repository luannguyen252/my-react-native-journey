import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

const WIDTH = Dimensions.get("window").width;

const TitleScreen = ({ navigation, screenProps }) => {
  // const [isHard, setIsHard] = useState(false); //0: Normal, 1: Hard

  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.textTitle}>PROBLEMON</Text> */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          A Game created in 24 hours by Abdulla Mohamed, Maxim Dubakov, and
          Mikolaj Zyzanski
        </Text>
      </View>
      <TouchableOpacity
        style={
          screenProps.isHard == false ? styles.normalDiff : styles.hardDiff
        }
        onPress={() => {
          screenProps.setIsHard(!screenProps.isHard);
        }}
      >
        <Text style={styles.buttonText}>
          {screenProps.isHard == false ? "Normal" : "Hard"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Battle");
        }}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Help");
        }}
      >
        <Text style={styles.buttonText}>How To Play</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "space-evenly"
  },
  textTitle: {
    color: "#000000",
    alignSelf: "center",
    fontFamily: "pixel",
    fontSize: 20,
    margin: 10
  },
  text: {
    color: "#000000",
    alignSelf: "center",
    fontFamily: "pixel",
    fontSize: 10,
    textAlign: "center"
  },
  button: {
    borderRadius: 10,
    width: WIDTH - 200,
    paddingVertical: 20,
    backgroundColor: "#000000",
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonText: {
    alignSelf: "center",
    color: "#ffffff",
    fontFamily: "pixel"
  },
  image: {
    alignSelf: "center",
    marginBottom: 10,
    height: 74,
    width: 222
  },
  normalDiff: {
    justifyContent: "center",
    backgroundColor: "#5a6ee1",
    borderRadius: 10,
    width: WIDTH - 200,
    paddingVertical: 20,
    alignSelf: "center"
  },
  hardDiff: {
    justifyContent: "center",
    backgroundColor: "#ac3231",
    borderRadius: 10,
    width: WIDTH - 200,
    paddingVertical: 20,
    alignSelf: "center"
  }
});

export default TitleScreen;
