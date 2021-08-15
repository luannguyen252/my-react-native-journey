[react-native-iphone-x-helper](https://github.com/ptelad/react-native-iphone-x-helper)

```javascript
import { isIphoneX } from "react-native-iphone-x-helper";

// ...

if (isIphoneX()) {
  // do this...
} else {
  // do that...
}
```

```javascript
import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 60,
    backgroundColor: "transparent",
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      {
        paddingTop: 20,
      }
    ),
  },
});
```

```javascript
import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    height: 60,
    backgroundColor: "transparent",
    paddingTop: getStatusBarHeight(),
  },
});
```

```javascript
import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export default StyleSheet.create({
  totalview: {
    flex: 1,
    backgroundColor: "transparent",
    marginBottom: getBottomSpace(),
  },
});
```
