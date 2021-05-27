# React Native Layout and Flexbox

## Property of Flexbox

`flexDirection`: column, row

`justifyContent`: center, flex-start, flex-end, space-around, space-between

`alignItems`: center, flex-start, flex-end, stretched

## React Native Flex Direction

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class FlexDirectionBasics extends Component {
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
    flexDirection: "row", // Set elements horizontally, try column.
  },
  powderblue: {
    width: 60,
    height: 60,
    backgroundColor: "powderblue",
  },
  skyblue: {
    width: 60,
    height: 60,
    backgroundColor: "skyblue",
  },
  steelblue: {
    width: 60,
    height: 60,
    backgroundColor: "steelblue",
  },
});
```

## React Native Justify Content

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class JustifyContentBasics extends Component {
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
    flexDirection: "column", // Set elements horizontally.
    justifyContent: "center",
  },
  powderblue: {
    width: 60,
    height: 60,
    backgroundColor: "powderblue",
  },
  skyblue: {
    width: 60,
    height: 60,
    backgroundColor: "skyblue",
  },
  steelblue: {
    width: 60,
    height: 60,
    backgroundColor: "steelblue",
  },
});
```

## React Native Align Items

```javascript
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class AlignItemsBasics extends Component {
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
    flexDirection: "column", // Set elements horizontally.
    justifyContent: "center",
    alignItems: "stretch",
  },
  powderblue: {
    width: 60,
    height: 60,
    backgroundColor: "powderblue",
  },
  skyblue: {
    width: 60,
    height: 60,
    backgroundColor: "skyblue",
  },
  steelblue: {
    /*width: 60,*/
    height: 60,
    backgroundColor: "steelblue",
  },
});
```
