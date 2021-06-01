import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class PropsExample extends PureComponent {
  render() {
    return (
      <View>
        <Text>
          My name is {this.props.name}, {this.props.age} year old, my job is{" "}
          {this.props.job}.
        </Text>
      </View>
    );
  }
}
