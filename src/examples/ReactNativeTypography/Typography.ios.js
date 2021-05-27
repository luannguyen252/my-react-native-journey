import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class Typography extends Component {
  render() {
    const { children, iOSTextStyle, style } = this.props;

    return (
      <Text {...this.props} style={[styles[iOSTextStyle], { ...style }]}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  largeTitle: {
    fontSize: 34,
    fontWeight: "400",
    lineHeight: 41,
    letterSpacing: 34 * 11 / 1000,
  },
  title1: {
    fontSize: 28,
    fontWeight: "400",
    lineHeight: 34,
    letterSpacing: 28 * 13 / 1000,
  },
  title2: {
    fontSize: 22,
    fontWeight: "400",
    lineHeight: 28,
    letterSpacing: 22 * 16 / 1000,
  },
  title3: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 25,
    letterSpacing: 20 * 19 / 1000,
  },
  headline: {
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: 17 * -24 / 1000,
  },
  body: {
    fontSize: 17,
    fontWeight: "400",
    lineHeight: 22,
    letterSpacing: 17 * -24 / 1000,
  },
  callout: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    letterSpacing: 16 * -20 / 1000,
  },
  subhead: {
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 15 * -16 / 1000,
  },
  footnote: {
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 18,
    letterSpacing: 13 * -6 / 1000,
  },
  caption1: {
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 12 * 0 / 1000,
  },
  caption2: {
    fontSize: 11,
    fontWeight: "400",
    lineHeight: 13,
    letterSpacing: 11 * 6 / 1000,
  },
});
