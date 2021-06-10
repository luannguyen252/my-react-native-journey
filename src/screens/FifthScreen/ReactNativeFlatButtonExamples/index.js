import React, { Component } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "react-native-flat-button";

export default class ReactNativeFlatButtonExamples extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Pre-Defined Buttons
        </Text>

        <Button
          type="primary"
          onPress={() => {
            console.log("Primary Pressed");
            // Alert.alert("Primary Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Primary Button
        </Button>

        <Button
          type="positive"
          onPress={() => {
            console.log("Positive Pressed");
            // Alert.alert("Positive Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Positive Button
        </Button>

        <Button
          type="negative"
          onPress={() => {
            console.log("Negative Pressed");
            // Alert.alert("Negative Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Negative Button
        </Button>

        <Button
          type="neutral"
          onPress={() => {
            console.log("Neutral Pressed");
            // Alert.alert("Neutral Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Neutral Button
        </Button>

        <Button
          type="warn"
          onPress={() => {
            console.log("Warn Pressed");
            // Alert.alert("Warn Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Warn Button
        </Button>

        <Button
          type="info"
          onPress={() => {
            console.log("Info Pressed");
            // Alert.alert("Info Pressed");
          }}
          containerStyle={styles.buttonContainer}
        >
          Info Button
        </Button>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Custom Buttons</Text>

        <Button
          type="custom"
          onPress={() => Alert.alert("Custom Button #1")}
          backgroundColor={"#1abc9c"}
          borderColor={"#16a085"}
          borderRadius={10}
          shadowHeight={5}
          containerStyle={styles.buttonContainer}
          contentStyle={styles.content}
        >
          Custom Button
        </Button>

        <Button
          type="custom"
          onPress={() => Alert.alert("Custom Button #2")}
          backgroundColor={"#9b59b6"}
          borderColor={"#8e44ad"}
          borderRadius={6}
          shadowHeight={8}
          activeOpacity={0.5}
          containerStyle={styles.buttonContainer}
          contentStyle={{ fontSize: 22, fontWeight: "900" }}
        >
          Custom Button
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  buttonContainer: {
    width: 200,
    height: 50,
    marginVertical: 5,
  },
  content: {
    fontSize: 22,
  },
});
