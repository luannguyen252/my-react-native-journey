import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PresentationalComponent from "./PresentationalComponent";

export default class App extends Component {
  state = {
    myState: "This is my state",
  };

  render() {
    return (
      <View style={styles.container}>
        <PresentationalComponent myState={this.state.myState} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
