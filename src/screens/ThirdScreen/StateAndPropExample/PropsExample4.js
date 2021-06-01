import React, { Component } from "react";
import { View, Text } from "react-native";

class Car extends React.Component {
  render() {
    return (
      <Text>
        I am a {this.props.name}, my model is {this.props.model}!
      </Text>
    );
  }
}

class PropsExample4 extends Component {
  render() {
    const carinfo = { name: "Ford", model: "For X" };

    return (
      <View>
        <Text>Who lives in my garage?</Text>
        <Car name={carinfo.name} model={carinfo.model} />
      </View>
    );
  }
}

export default PropsExample4;
