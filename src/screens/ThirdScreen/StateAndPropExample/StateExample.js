import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class StateExample extends PureComponent {
  constructor() {
    super();

    this.state = {
      name: "Luan Nguyen",
      age: 30,
      job: "Product Designer",
    };
  }

  componentDidMount() {
    console.log("Mounted!");
  }

  render() {
    return (
      <View>
        <Text>
          {this.state.name}, {this.state.age}, {this.state.job}
        </Text>
      </View>
    );
  }
}
