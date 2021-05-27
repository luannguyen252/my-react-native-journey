import React, { Component } from "react";
import { View } from "react-native";
import { CardIOView, CardIOUtilities } from "react-native-awesome-card-io";

export default class ReactNativeAwesomeCardIOExample1 extends Component {
  componentWillMount() {
    CardIOUtilities.preload();
  }

  didScanCard = (card) => {
    alert(`Card ${card} is scanned.`);
  };

  render() {
    return (
      <View>
        <CardIOView didScanCard={this.didScanCard} style={{ flex: 1 }} />
      </View>
    );
  }
}
