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

class PropsExample5 extends Component {
  render() {
    const carinfo = [
      {
        name: "Ford",
        model: "For X",
      },
      {
        name: "Ferrari",
        model: "Fer X",
      },
      {
        name: "Lexus",
        model: "Lex X",
      },
    ];

    return (
      <View>
        <Text>Who lives in my garage?</Text>
        {carinfo.map((item, index) => (
          <Car key={index} name={item.name} model={item.model} />
        ))}
      </View>
    );
  }
}

export default PropsExample5;
