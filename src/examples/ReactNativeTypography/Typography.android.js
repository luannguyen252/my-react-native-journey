import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class Typography extends Component {
  render() {
    const { children, androidTextStyle, style } = this.props;

    return (
      <Text {...this.props} style={[styles[androidTextStyle], { ...style }]}>
        {androidTextStyle === "button" ? children.toUpperCase() : children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  display4: {
    fontSize: 112,
    fontWeight: "300",
    lineHeight: 112,
    letterSpacing: -10,
  },
  display3: {
    fontSize: 56,
    fontWeight: "400",
    lineHeight: 56,
    letterSpacing: -5,
  },
  display2: {
    fontSize: 45,
    fontWeight: "400",
    lineHeight: 48,
  },
  display1: {
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 40,
  },
  headline: {
    fontSize: 24,
    fontWeight: "400",
    lineHeight: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    lineHeight: 32,
    letterSpacing: 5,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 10,
  },
  body2: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 10,
  },
  body1: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 10,
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 20,
  },
  button: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 14,
    letterSpacing: 10,
  },
});
