# React Native ProgressBar With Animated

## React Native ProgressBar with Animated Example

```javascript
import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Animated } from "react-native";

export default class App extends Component {
  state = {
    progressStatus: 0,
  };

  anim = new Animated.Value(0);

  componentDidMount() {
    this.onAnimate();
  }

  onAnimate = () => {
    this.anim.addListener(({ value }) => {
      this.setState({ progressStatus: parseInt(value, 10) });
    });
    Animated.timing(this.anim, {
      toValue: 100,
      duration: 50000,
    }).start();
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.inner, { width: this.state.progressStatus + "%" }]}
        />
        <Animated.Text style={styles.label}>
          {this.state.progressStatus}%
        </Animated.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    padding: 3,
    borderColor: "#FAA",
    borderWidth: 3,
    borderRadius: 30,
    marginTop: 200,
    justifyContent: "center",
  },
  inner: {
    width: "100%",
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
  },
  label: {
    fontSize: 23,
    color: "black",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
  },
});
```
