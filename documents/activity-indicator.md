# React Native ActivityIndicator

## Props

`animating`: true or false

`size`: small, large or number

`color`

`hidesWhenStopped`

## Example

```javascript
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default class ActivityIndicatorDemo extends Component {
  state = { animating: true };

  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          animating: false,
        }),
      6000
    );

  componentDidMount = () => this.closeActivityIndicator();

  render() {
    const animating = this.state.animating;

    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator animating={animating} size="large" color="#ff0000" />
        <ActivityIndicator size="small" color="#44ff00" />
        <ActivityIndicator size="large" color="#rtwrw" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
```
