# React Native StatusBar

```javascript
<View>
  <StatusBar backgroundColor="#b3e6ff" barStyle="dark-content" />
</View>
```

```javascript
<View>
  <StatusBar backgroundColor="#b3e6ff" barStyle="dark-content" />
  <View>
    <StatusBar hidden={route.statusBarHidden} />
  </View>
</View>
```

## React Native StatusBar Props

`animated`

`barStyle`

`hidden`

`backgroundColor`

`translucent`

`showHideTransition`

`networkActivityIndicatorVisible`

## React Native StatusBar Methods

`setHidden`

`setNetworkActivityIndicatorVisible`

`setBarStyle`

`setTranslucent`

`setBackgroundColor`

## React Native StatusBar Example 1

```javascript
import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

export default class ActivityIndicatorDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#b3e6ff"
          barStyle="dark-content"
          hidden={false}
          translucent={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## React Native StatusBar Example 2 (Hiding Status Bar, Full Screen)

```javascript
import React, { Component } from "react";
import { View, StyleSheet, StatusBar } from "react-native";

export default class ActivityIndicatorDemo extends Component {
  render() {
    return (
      <View>
        <StatusBar backgroundColor="#b3e6ff" barStyle="light-content" />
        <View>
          <StatusBar hidden={true} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```
