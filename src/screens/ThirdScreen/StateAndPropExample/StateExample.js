import React, { PureComponent } from "react";
import { View, Text, Button } from "react-native";

export default class StateExample extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "Luan Nguyen",
      age: 30,
      job: "Designer",
    };
  }

  changePerson = () => {
    this.setState({
      name: "Steve Jobs",
      age: 40,
      job: "CEO",
    });
  };

  componentDidMount() {
    console.log("Component Did Mount!");
  }

  componentDidUpdate() {
    console.log("Component Did Update!");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount!");
  }

  render() {
    return (
      <View>
        <Text>
          My name is {this.state.name}, {this.state.age} year old, my job is{" "}
          {this.state.job}.
        </Text>
        <Button title="Change Person" onPress={() => this.changePerson()} />
      </View>
    );
  }
}
