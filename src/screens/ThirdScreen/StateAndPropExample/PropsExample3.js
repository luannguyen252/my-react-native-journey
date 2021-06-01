import React, { Component } from "react";
import { View, Text } from "react-native";

class Car extends Component {
  render() {
    return <Text>I am a {this.props.brand}!</Text>;
  }
}

class PropsExample3 extends Component {
  render() {
    const carname = "Ford";

    return (
      <View>
        <Text>Who lives in my garage?</Text>
        <Car brand={carname} />
      </View>
    );
  }
}

export default PropsExample3;
