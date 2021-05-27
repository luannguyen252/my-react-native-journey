import React, { Component } from "react";
import { View, Text } from "react-native";

export default class HTTPExample extends Component {
  state = {
    data: "",
  };

  componentDidMount = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          data: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <View>
        <Text>{this.state.data.body}</Text>
      </View>
    );
  }
}
