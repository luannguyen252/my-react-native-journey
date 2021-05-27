import React, { Component } from "react";
import { View } from "react-native";
import SwitchExample from "./SwitchExample";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      switch1Value: false,
    };
  }

  toggleSwitch1 = (value) => {
    this.setState({ switch1Value: value });
    console.log("Switch 1 is: " + value);
  };

  render() {
    return (
      <View>
        <SwitchExample
          toggleSwitch1={this.toggleSwitch1}
          switch1Value={this.state.switch1Value}
        />
      </View>
    );
  }
}
