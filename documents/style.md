# React Native Style

## Example 1

```javascript
import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

export default class ImplementingStyle extends Component {
  render() {
    return (
      <View>
        <Text
          style={{ backgroundColor: "#a7a6a9", color: "yellow", fontSize: 20 }}
        >
          this is inline style
        </Text>
        <Text style={styles.green}>just green</Text>
        <Text style={styles.biggray}>just biggray</Text>
        <Text style={[styles.biggray, styles.green]}>biggray, then green</Text>
        <Text style={[styles.green, styles.biggray]}>green, then biggray</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  biggray: {
    color: "gray",
    fontWeight: "bold",
    fontSize: 30,
  },
  green: {
    color: "green",
  },
});
```

## Example 2

```javascript
// StyleComponent.js
import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

const StyleComponent = (props) => {
  return (
    <View>
      <Text style={styles.myState}>{props.myState}</Text>
    </View>
  );
};

export default StyleComponent;

const styles = StyleSheet.create({
  myState: {
    marginTop: 20,
    textAlign: "center",
    color: "green",
    fontWeight: "bold",
    fontSize: 20,
  },
});

// App.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StyleComponent from "./StyleComponent";

export default class App extends React.Component {
  state = {
    myState: "This is my state, style through external style",
  };

  render() {
    return (
      <View>
        <StyleComponent myState={this.state.myState} />
      </View>
    );
  }
}
```
