import React, { Component, PureComponent } from "react";
import { View, Text, Button } from "react-native";

class Child extends Component {
  render() {
    return (
      <View>
        <Button title="Click Me" onPress={this.props.updateStateProp} />
        <Text>{this.props.myDataProp}</Text>
      </View>
    );
  }
}

export default class ReactEventsExample4 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: "Initial data...",
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    this.setState({ data: "Data updated from the child component..." });
  }

  render() {
    return (
      <View>
        <Child
          myDataProp={this.state.data}
          updateStateProp={() => this.updateState()}
        />
      </View>
    );
  }
}
