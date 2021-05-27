# React Native Image

## Static Image Resources

```javascript
<Image source={require("./icon_name.png")} />
```

## Images from Hybrid App's Resources

```javascript
// Xcode asset catalogs
<Image source={{ uri: "icon_name" }} style={{ width: 60, height: 60 }} />
// Android assets folder
<Image source={{uri: 'asset:/icon_name.png'}} style={{width: 60, height: 60}} />
```

## Network Images

```javascript
<Image
  source={{ uri: "https://url_of_image.png" }}
  style={{ width: 60, height: 60 }}
/>
```

## Uri Data Images

```javascript
<Image
  style={{ width: 66, height: 66 }}
  source={{
    uri:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
  }}
/>
```

## Background Image via Nesting

```javascript
    return (
      <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
        <Text>Inside</Text>
      </ImageBackground>
    );
```

## React Native Image Example

```javascript
import React, { Component } from "react";
import {
  StyleSheet,
  AppRegistry,
  Text,
  View,
  Image,
  ImageBackground,
} from "react-native";

export default class DisplayAnImage extends Component {
  render() {
    return (
      <ImageBackground
        source={{
          uri:
            "https://www.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Image source={require("./favicon.png")} />
        <Image
          source={require("/ReactNative/MyReactNativeApp/img/favicon.png")}
        />

        <Image source={require("MyReactNativeApp/img/favicon.png")} />
        <Image
          source={{ uri: "asset:/images/favicon.png" }}
          style={{ width: 60, height: 60 }}
        />
        <Image
          source={{
            uri: "https://www.javatpoint.com/images/logo/jtp_logo.png",
          }}
          style={{ width: "80%", height: 70 }}
        />
        <Image
          style={{ width: 60, height: 60 }}
          source={{
            uri:
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
          }}
        />
      </ImageBackground>
    );
  }
}
```
