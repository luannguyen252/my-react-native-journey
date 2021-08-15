# React Navigation Template

> Routing and navigation for Expo and React Native apps.

Offical Website: [React Navigation](https://reactnavigation.org/)

## Installation

```bash
# Install necessery dependencices
expo install @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-svg
```

## Moving Between Screens

```javascript
function App({ navigation }) {
  return (
    <View>
      <Text>Moving Between Screens</Text>
      <Button title="Details" onPress={() => navigation.navigate("Details")} />
    </View>
  );
}
```

## Passing Parameters To Routes

```javascript
function App({ navigation }) {
  return (
    <View>
      <Text>Passing Parameters To Routes</Text>
      <Button
        title="Details"
        onPress={() =>
          navigation.navigate("Details", { paramName: "Hello World!" })
        }
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { paramName } = route.params;

  return (
    <View>
      <Text>{paramName}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
```

## Access The Navigation Prop From Any Component

```javascript
import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}
```

## Articles

- [NavigationActions Reference](https://reactnavigation.org/docs/1.x/navigation-actions)
- [StackNavigator Reference](https://reactnavigation.org/docs/1.x/stack-navigator#screen-navigation-options)
- [TabNavigator Reference](https://reactnavigation.org/docs/1.x/tab-navigator)
