import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class AsyncStorageExample extends Component {
  state = {
    name: "",
  };

  componentDidMount = () =>
    AsyncStorage.getItem("name").then((value) =>
      this.setState({ name: value })
    );

  setName = (value) => {
    AsyncStorage.setItem("name", value);
    this.setState({ name: value });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={this.setName}
        />
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  textInput: {
    margin: 5,
    height: 100,
    borderWidth: 1,
    backgroundColor: "#7685ed",
  },
});
