# React Native Height and Width

## Fixed Dimensions

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class HeightWidth extends Component {
  render() {
    return (
      <View>
        <View style={styles.powderblue} />
        <View style={styles.skyblue} />
        <View style={styles.steelblue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  powderblue: {
    width: 100,
    height: 100,
    backgroundColor: "powderblue",
  },
  skyblue: {
    width: 200,
    height: 200,
    backgroundColor: "skyblue",
  },
  steelblue: {
    height: 300,
    backgroundColor: "steelblue",
  },
});
```

## Flex Dimensions

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class HeightWidth extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.powderblue} />
        <View style={styles.skyblue} />
        <View style={styles.steelblue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  powderblue: {
    flex: 1,
    backgroundColor: "powderblue",
  },
  skyblue: {
    flex: 2,
    backgroundColor: "skyblue",
  },
  steelblue: {
    flex: 3,
    backgroundColor: "steelblue",
  },
});
```
