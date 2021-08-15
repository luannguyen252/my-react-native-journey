import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import ParallaxImageHeader from "./ParallaxImageHeader";

const ANIMATION_DELAY = 300;

export default class ReactNativeAnimatedImageHeader extends Component {
  // Generate random color
  _generateRandomColor = () => {
    return "#" + Math.random().toString(16).substr(-6);
  };

  // Render scroll view content
  _renderScrollViewDummyContent() {
    const data = Array.from({ length: 30 });
    return (
      <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY}>
        {data.map((_, i) => (
          <Animatable.View
            animation="fadeInUp"
            delay={ANIMATION_DELAY * i}
            key={i}
            style={[
              styles.row,
              { backgroundColor: this._generateRandomColor() },
            ]}
          />
        ))}
      </Animatable.View>
    );
  }

  render() {
    return (
      <View style={styles.fill}>
        <StatusBar barStyle="light-content" />
        <ParallaxImageHeader
          headerHeight={300}
          headerColor={this._generateRandomColor()}
          imgSrc={require("./headerpicture_3.png")}
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
