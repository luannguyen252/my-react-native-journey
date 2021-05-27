import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").width;

const diceDerive = require("../../assets/images/dDerive.png");
const diceIntegrate = require("../../assets/images/dIntegral.png");
const diceCalculate = require("../../assets/images/dCalculate.png");

const HelpScreen = ({ navigation }) => {
  return (
    // <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.innerContainer}>
      <Text style={styles.header}>How to Play:</Text>
      <View style={styles.section}>
        <Text style={styles.header}>
          Integral: Write the integral of function F(x)
        </Text>
        <Image source={diceIntegrate} style={styles.diceImage} />
        <Text style={styles.text}>Correct Answer: F(x) gets integrated</Text>
        <Text style={styles.text}>Wrong Answer: G(x) gets integrated</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>
          Derivative: Write the derivative of G(x)
        </Text>
        <Image source={diceDerive} style={styles.diceImage} />
        <Text style={styles.text}>Correct Answer: G(x) gets derived</Text>
        <Text style={styles.text}>Wrong Answer: F(x) gets derived</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>
          Calculate: Write the value of F(X) where x is the number dice
        </Text>
        <Text style={styles.text}>
          ex: dice roll = 3, x = 3 ,G(x) = x^2, Ans: 6
        </Text>
        <Image source={diceCalculate} style={styles.diceImage} />
        <Text style={styles.text}>
          Correct Answer: Damage delt to G(x) equal to the correct answer
        </Text>
        <Text style={styles.text}>
          Wrong Answer: Damage delt to F(x) equal to the correct answer
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>You Win When:</Text>
        <Text style={styles.textCentered}>G(x) health bar = 0</Text>
        <Text style={styles.header}> or </Text>
        <Text style={styles.textCentered}>G(x) = 0</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>You Lose When:</Text>
        <Text style={styles.textCentered}>F(x) health bar = 0</Text>
        <Text style={styles.header}> or </Text>
        <Text style={styles.textCentered}>F(x) = 0</Text>
      </View>
      {/* </View> */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.navigate("Title");
        }}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1
  },
  innerContainer: {
    backgroundColor: "#000000",
    alignSelf: "center",
    height: HEIGHT
  },
  section: {
    marginVertical: 5,
    alignSelf: "center"
  },
  header: {
    color: "#ffffff",
    fontFamily: "pixel",
    fontSize: 12,
    alignSelf: "center"
  },
  text: {
    color: "#ffffff",
    fontFamily: "pixel",
    fontSize: 8
  },
  textCentered: {
    color: "#ffffff",
    fontFamily: "pixel",
    fontSize: 8,
    alignSelf: "center"
  },
  diceImage: {
    marginVertical: 10,
    height: 50,
    width: 50,
    alignSelf: "center"
  },
  buttonContainer: {
    borderRadius: 10,
    width: WIDTH,
    paddingVertical: 20,
    backgroundColor: "#000000",
    alignSelf: "center",
    justifyContent: "center"
  },
  buttonText: {
    alignSelf: "center",
    color: "#ffffff",
    fontFamily: "pixel"
  }
});

export default HelpScreen;
