import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import ParallaxImageHeader from "./ParallaxImageHeader";

export default class ReactNativeAnimatedImageHeader extends Component {
  // Generate random color
  _generateRandomColor = () => {
    return "#" + Math.random().toString(16).substr(-6);
  };

  // Render scroll view content
  _renderScrollViewDummyContent() {
    const data = Array.from({ length: 30 });
    return (
      <View>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.row,
              { backgroundColor: this._generateRandomColor() },
            ]}
          />
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.fill}>
        <StatusBar barStyle="light-content" />
        <ParallaxImageHeader
          headerHeight={300}
          headerColor={this._generateRandomColor()}
          imgSrc={require("./headerpicture_2.png")}
          title="Hello, Luan Nguyen"
        >
          {this._renderScrollViewDummyContent()}
        </ParallaxImageHeader>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 60,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
