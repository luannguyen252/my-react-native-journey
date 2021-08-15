import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import AnimatedForm from "./AnimatedForm";
// import AnimatedForm from "react-native-animated-form";
// import Background from "./bg.jpg";

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

export default class ReactNativeAnimatedForm1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={[StyleSheet.absoluteFill, { width: null, height: null }]}
          source={Background}
        /> */}
        <AnimatedForm delay={100} distance={5}>
          <AnimatedInput
            placeholder="User name"
            underlineColorAndroid="transparent"
            style={styles.text}
          />
          <AnimatedInput
            placeholder="Email"
            underlineColorAndroid="transparent"
            style={styles.text}
          />
          <AnimatedInput
            placeholder="Password"
            underlineColorAndroid="transparent"
            style={styles.text}
          />
          <AnimatedInput
            placeholder="Confirm password"
            underlineColorAndroid="transparent"
            style={styles.text}
          />

          <Animated.View style={styles.buttonView}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff" }}>Register</Text>
            </TouchableOpacity>
          </Animated.View>
        </AnimatedForm>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#919191",
  },
  text: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF",
  },
  buttonView: {
    height: 40,
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
