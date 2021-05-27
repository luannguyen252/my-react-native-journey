# React Native AsyncStorage

```javascript
import { AsyncStorage } from "react-native";
```

## Persist Data

```javascript
// 1. AsyncStorage saves the data using setItem()
AsyncStorage.setItem("key", "value");
// 2. Example of persisting the single value
let name = "Michal";
AsyncStorage.setItem("user", name);
// 3. Example of persisting multiple values in an object
let obj = {
  name: "Michal",
  email: "michal@gmail.com",
  city: "New York",
};
AsyncStorage.setItem("user", JSON.stringify(obj));
```

## Fetch Data

```javascript
// 1. AsyncStorage fetches the saved data using getItem()
await AsyncStorage.getItem("key");
// 2. Example to fetch the single value
await AsyncStorage.getItem("user");
// 3. Example to fetch value from an object
let user = await AsyncStorage.getItem("user");
let parsed = JSON.parse(user);
alert(parsed.email);
```

## React Native AsyncStorage Example 1

```javascript
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class App extends Component<Props> {
  saveData() {
    let name = "Michal";
    AsyncStorage.setItem("user", name);
  }

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      alert(user);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.saveData}>
          <Text>Click to save data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.displayData}>
          <Text>Click to display data</Text>
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
    backgroundColor: "#F5FCFF",
  },
});
```

## React Native AsyncStorage Example 2

```javascript
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default class App extends Component<Props> {
  saveData() {
    /*let user = "Michal";*/
    let obj = {
      name: "Michal",
      email: "michal@gmail.com",
      city: "New York",
    };
    /*AsyncStorage.setItem('user',user);*/
    AsyncStorage.setItem("user", JSON.stringify(obj));
  }

  displayData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      let parsed = JSON.parse(user);
      alert(parsed.email);
    } catch (error) {
      alert(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.saveData}>
          <Text>Click to save data</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.displayData}>
          <Text>Click to display data</Text>
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
    backgroundColor: "#F5FCFF",
  },
});
```
