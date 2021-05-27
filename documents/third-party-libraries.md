# Linking and Using Third Party Libraries

```bash
npm install react-native-vector-icons --save
```

## React Native Linking Third Party Library Example

```javascript
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {};

export default class App extends Component<Props> {
  deleteItem = () => {
    Alert.alert("delete icon pressed");
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Adding Ionicons library</Text>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={this.deleteItem}
        >
          <Icon size={30} name="ios-trash" color="red" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    fontSize: 25,
    marginTop: 30,
    textAlign: "center",
  },
  touchableStyle: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 50,
  },
});
```
