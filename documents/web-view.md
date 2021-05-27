# React Native WebView

## Props of WebView

`source`

`onLoad`

`originWhitelist`

`html`

`contentInset`

`injectJavaScript`

`onLoadEnd`

`renderError`

`url`

`bounces`

`injectedJavaScript`

`onLoadStart`

`style`

`geolocationEnabled`

`allowFileAccess`

`onError`

`onMessage`

`userAgent`

`scrollEnabled`

`nativeConfig`

## Types of WebView contents

**Display HTML code as a string**

```javascript
<WebView source={{ html: "<h1>Hello javaTpoint</h1>" }} />
```

**Display the internal web page**

```javascript
<WebView source={require("./resources/index.html")} />
```

**Display the remote web page**

```javascript
<WebView source={{ uri: "https://www.javatpoint.com" }} />
```

## React Native WebView Example 1

```javascript
import React, { Component } from "react";
import { View, WebView, StyleSheet } from "react-native";

export default class ActivityIndicatorDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: "https://www.javatpoint.com" }} />
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

## React Native WebView Example 2

```javascript
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default class ActivityIndicatorDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/*<WebView 
                    source={{html: '<h1>Hello javaTpoint</h1>'}} 
                />*/}
        {/*   <WebView 
                    source={require("./resources/index.html")} 
                />*/}
        <WebView source={{ uri: "https://www.javatpoint.com" }} />
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
