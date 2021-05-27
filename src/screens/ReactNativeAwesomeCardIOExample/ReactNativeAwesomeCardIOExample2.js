import React, { Component } from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { CardIOModule, CardIOUtilities } from "react-native-awesome-card-io";

export default class ReactNativeAwesomeCardIOExample2 extends Component {
  componentWillMount() {
    if (Platform.OS === "ios") {
      CardIOUtilities.preload();
    }
  }

  scanCard() {
    CardIOModule.scanCard()
      .then((card) => {
        alert(`Card ${card} is scanned.`);
      })
      .catch(() => {
        alert(`Card ${card} is cancelled.`);
      });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.scanCard.bind(this)}>
          <Text>Scan card!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
