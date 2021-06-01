import React, { Component } from "react";
import { View, Text } from "react-native";

class Car extends Component {
  render() {
    return <Text>I am a {this.props.brand}!</Text>;
  }
}

class PropsExample2 extends Component {
  render() {
    return (
      <View>
        <Text>Who lives in my garage?</Text>
        <Car brand="Ford" />
      </View>
    );
  }
}

export default PropsExample2;
