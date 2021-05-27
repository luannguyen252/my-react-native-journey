# React Native State

## Example 1

```javascript
import React, { Component } from "react";
import { Text, View } from "react-native";

export default class App extends Component {
  state = {
    myState:
      "This is a text component, created using state data. It will change or updated on clicking it.",
  };

  updateState = () => this.setState({ myState: "The state is updated" });

  render() {
    return (
      <View>
        <Text onPress={this.updateState}>{this.state.myState}</Text>
      </View>
    );
  }
}
```

## Example 2

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class App extends Component {
  state: {
    password: string,
    isPasswordVisible: boolean,
    toggleText: string,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      password: "",
      isPasswordVisible: true,
      toggleText: "Show",
    };
  }

  handleToggle = () => {
    const { isPasswordVisible } = this.state;
    if (isPasswordVisible) {
      this.setState({ isPasswordVisible: false });
      this.setState({ toggleText: "Hide" });
    } else {
      this.setState({ isPasswordVisible: true });
      this.setState({ toggleText: "Show" });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          secureTextEntry={this.state.isPasswordVisible}
          style={{
            width: 400,
            height: 50,
            backgroundColor: "#a7a6a9",
            color: "white",
            fontSize: 20,
          }}
        />
        <TouchableOpacity onPress={this.handleToggle}>
          <Text style={{ fontSize: 20 }}>{this.state.toggleText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
```
