# React Native View

## Props of View

`onStartShouldSetResponder`

`nativeID`

`onMoveShouldSetResponder`

`onResponderReject`

`accessible`

`style`

`collapsable`

`accessibilityRole`

`accessibilityElementsHidden`

`accessibilityLabel`

`onAccessibilityTap`

`onMoveShouldSetResponderCapture`

`onResponderRelease`

`onStartShouldSetResponderCapture`

`testID`

`importantForAccessibility`

`accessibilityStates`

`accessibilityIgnoresInvertColors`

`accessibilityHint`

`onLayout`

`onResponderGrant`

`onResponderTerminate`

`pointerEvents`

`accessibilityComponentType`

`needsOffscreenAlphaCompositing`

`accessibilityTraits`

`shouldRasterizeIOS`

`hitSlop`

`onMagicTap`

`onResponderMove`

`onResponderTerminationRequest`

`removeClippedSubviews`

`accessibilityLiveRegion`

`renderToHardwareTextureAndroid`

`accessibilityViewIsModal`

## Example

```javascript
import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", flex: 0.3 }} />
        <View style={{ backgroundColor: "red", flex: 0.5 }} />
        <Text style={{ fontSize: 18 }}>View Example</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 100,
    width: "80%",
    backgroundColor: "#5ead97",
  },
});
```
