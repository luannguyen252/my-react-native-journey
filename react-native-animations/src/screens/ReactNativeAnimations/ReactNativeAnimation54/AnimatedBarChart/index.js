import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { BarChart } from "./BarChart";

let WIDTH = Dimensions.get("window").width;
let HEIGHT = Dimensions.get("window").height;
const ANIMATION_DELAY = 500;

export default class AnimatedBarChart extends Component {
  constructor() {
    super();
    this.state = {
      dataY: [10, 2, 1.2, 4.5, 3],
      labels: ["10k", "2k", "1.2k", "4.5k", "3k"],
    };
  }

  recalculate = () => {
    let values = Array.from(
      { length: 5 },
      () => Math.round(10 * Math.random() * 5) / 10
    );
    this.setState({
      dataY: values,
      labels: values.map((v) => Math.round(v * 10) / 10 + "k"),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <BarChart
          labels={this.state.labels}
          dataY={this.state.dataY}
          color={"#6D28D9"}
          height={HEIGHT * 0.6}
          containerStyles={styles.barChart}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={this.recalculate}>
          <Animatable.View
            animation="bounceIn"
            delay={ANIMATION_DELAY}
            style={styles.button}
          >
            <Animatable.Text
              animation="bounceIn"
              delay={ANIMATION_DELAY + 50}
              style={styles.buttonText}
            >
              Random Value
            </Animatable.Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#111827",
    marginTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    width: WIDTH * 0.4,
    height: 56,
    borderRadius: 56 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    color: "#F9FAFB",
  },
  barChart: {
    backgroundColor: "transparent",
    height: HEIGHT * 0.6,
    width: WIDTH,
    marginTop: 24,
  },
});
