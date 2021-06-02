import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";

export default class ReactEventsExample3 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: "Initial data...",
    };

    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({ data: "Data updated..." });
  }

  render() {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 16 }}>
        <Text>Events Example 3</Text>
        <Button title="Click Me" onPress={() => this.updateState()} />
        <Text>{this.state.data}</Text>
      </View>
    );
  }
}
