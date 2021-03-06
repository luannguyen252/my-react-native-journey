import React, { Component } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { LoremIpsum } from "../common";
import { DraggableBox } from "../draggable/index";

export default class Example extends Component {
  render() {
    return (
      <View style={styles.scrollView}>
        <DraggableBox boxStyle={{ backgroundColor: "plum" }} />
        <DraggableBox boxStyle={{ backgroundColor: "lightgoldenrodyellow" }} />
        <LoremIpsum />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
