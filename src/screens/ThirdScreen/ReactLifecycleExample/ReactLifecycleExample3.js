import React, { PureComponent } from "react";
import { View, Text } from "react-native";

export default class ReactLifecycleExample3 extends PureComponent {
  render() {
    return (
      <View>
        <Text>Unmounting</Text>
      </View>
    );
  }
}
