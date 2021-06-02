import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";

export default class ReactEventsExample2 extends PureComponent {
  shoot = (msg) => {
    alert("Alert for: " + msg);
  };

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>Events Example 2</Text>
        <Button
          title="Take the shoot!"
          onPress={() => this.shoot("Hello World!")}
        />
      </View>
    );
  }
}
