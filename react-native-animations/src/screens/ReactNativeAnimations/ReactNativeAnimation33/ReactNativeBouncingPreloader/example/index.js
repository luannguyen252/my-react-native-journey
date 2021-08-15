import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import BouncingPreloader from "../index";

const icons = [
  require("./assets/apple.png"),
  require("./assets/avocado.png"),
  require("./assets/banana.png"),
  require("./assets/cherries.png"),
  require("./assets/grapes.png"),
  require("./assets/mango.png"),
  require("./assets/orange.png"),
  require("./assets/pineapple.png"),
  require("./assets/watermelon.png"),
  require("./assets/artichoke.png"),
  require("./assets/bell-pepper.png"),
  require("./assets/cabbage.png"),
  require("./assets/carrot.png"),
  require("./assets/eggplant.png"),
  require("./assets/peas.png"),
  require("./assets/potato.png"),
];

export default class ReactNativeBouncingPreloader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BouncingPreloader
          icons={icons}
          leftDistance={-100}
          rightDistance={-150}
          speed={1000}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
