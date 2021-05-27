import React, { Component } from "react";
import { View, Text } from "react-native";
import VirtualKeyboard from "react-native-virtual-keyboard";

export default class VirtualKeyboardExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>{this.state.text}</Text>
        <VirtualKeyboard
          color="white"
          pressMode="string"
          onPress={(val) => this.changeText(val)}
        />
      </View>
    );
  }

  changeText(newText) {
    this.setState({ text: newText });
  }
}
