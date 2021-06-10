// https://github.com/browniefed/react-native-ticker
// npm install react-native-ticker
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

import Ticker, { Tick } from "./ticker2";

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const currencies = ["$", "¥", "€"];

const ReactNativeTickerExamples = () => {
  const [state, setState] = useState({
    currency: currencies[getRandom(0, 2)],
    value: getRandom(0, 100000),
  });

  useEffect(() => {
    setInterval(() => {
      setState({
        currency: currencies[getRandom(0, 2)],
        value: getRandom(0, 100000),
      });
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Ticker textStyle={styles.text}>
        <Tick rotateItems={currencies}>{state.currency}</Tick>
        {state.value.toLocaleString()}
      </Ticker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
  },
  text: {
    fontSize: 40,
    color: "#FFFFFF",
  },
});

export default ReactNativeTickerExamples;
