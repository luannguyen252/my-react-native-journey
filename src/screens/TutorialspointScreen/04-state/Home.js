import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Home extends Component {
  state = {
    myState:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit",
  };

  updateState = () => this.setState({ myState: "The state is updated" });

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.updateState}>{this.state.myState}</Text>
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
