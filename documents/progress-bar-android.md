# React Native ProgressBarAndroid

## Props of ProgressBarAndroid

`animating`: bool

`color`: color

`indeterminate`: indeterminateType

`progress`: number

`styleAttr`: enum (Horizontal, Normal (default), Small, Large, Inverse, SmallInverse, and LargeInverse)

`testID`: string

## React Native ProgressBarAndroid Example

```javascript
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ProgressBarAndroid,
  ProgressViewIOS,
} from "react-native";

export default class MyApp extends Component<{}> {
  constructor() {
    super();
    this.state = {
      progressStatus: 0,
    };
  }

  start_Progress = () => {
    this.value = setInterval(() => {
      if (this.state.progressStatus <= 1) {
        this.setState({ progressStatus: this.state.progressStatus + 0.01 });
      }
    }, 100);
  };

  stop_Progress = () => {
    clearInterval(this.value);
  };

  clear_Progress = () => {
    this.setState({ progressStatus: 0.0 });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={{ fontSize: 20, color: "#000" }}>
          Progress Value:{" "}
          {parseFloat((this.state.progressStatus * 100).toFixed(3))} %
        </Text>
        {Platform.OS === "android" ? (
          <ProgressBarAndroid
            styleAttr="Horizontal"
            progress={this.state.progressStatus}
            indeterminate={false}
          />
        ) : (
          <ProgressViewIOS progress={this.state.progressStatus} />
        )}
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPress={this.start_Progress}
        >
          <Text style={styles.textStyle}>Start Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPress={this.stop_Progress}
        >
          <Text style={styles.textStyle}>Stop Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.button}
          onPress={this.clear_Progress}
        >
          <Text style={styles.textStyle}>Reset Progress</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    margin: 20,
  },
  button: {
    width: "100%",
    backgroundColor: "#00BCD4",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  textStyle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
```
