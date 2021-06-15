# React Native

> React Native is a JavaScript framework for building cross-platform apps. This guide covers everything you need to know to start developing React Native apps.

[React Native](https://reactnative.dev/)

[React Native Express](https://www.reactnative.express/)

## Repo

- [React Native Examples](https://github.com/amandeepmittal/react-native-examples)
- [Shared Element transitions](https://github.com/amandeepmittal/react-native-examples/tree/master/shared-element-transitions)
- [Animated Header View on a Scroll](https://github.com/amandeepmittal/react-native-examples/tree/master/animate-header-on-scroll)
- [Create onBoarding screens](https://github.com/amandeepmittal/react-native-examples/tree/master/onboarding-viewpager)
- [react-native-really-awesome-button](https://github.com/rcaferati/react-native-really-awesome-button)
- [react-native-animated-charts](https://github.com/rainbow-me/react-native-animated-charts)
- [Animate your React Native components](https://github.com/shoutem/animation)
- [react-native-off-canvas-menu](https://github.com/proshoumma/react-native-off-canvas-menu)
- [Animated Tab Bar Component for React Native](https://github.com/10clouds/FluidBottomNavigation-rn)
- [react-native-offline](https://github.com/rgommezz/react-native-offline)

## Tutorials

- [Catalin Miron - Youtube](https://www.youtube.com/channel/UCTcH04SRuyedaSuuQVeAcdg)
- [Catalin Miron - Patreon](https://www.patreon.com/catalinmiron)
- [William Candillon - Youtube](https://www.youtube.com/channel/UC806fwFWpiLQV5y-qifzHnA)
- [React Native Tutorial - Tutorials Point](https://www.tutorialspoint.com/react_native/index.htm)

## Courses

- [Build Delightful Gestures and Animations](https://start-react-native.dev/)

## React Native Library

- [touchable-scale](https://github.com/JonnyBurger/touchable-scale))
- [react-navigation](https://github.com/react-navigation/react-navigation)

## Examples

- [React Native Examples](https://reactnativeexample.com/)

## React Native UI Library

- [RNUILib - UI Components Library for React Native ](https://wix.github.io/react-native-ui-lib/)
- [NativeBase - Essential cross-platform UI components for React Native & Vue Native](https://nativebase.io/)
- [FiraeCommerce - App React Native Codekit](https://codekits.co/fira.html)
- [React Native Elements - Cross Platform React Native UI Toolkit](https://reactnativeelements.com/)

## Installation

```bash
# Install CLI
npm install --global expo-cli
# Create a new project
expo init ReactNativeExpoApp
# Go to project
cd ReactNativeExpoApp
# Start project
expo start
# Login Expo account (optional)
expo login
# Create a new project with TypeScript (optional)
expo init -t expo-template-blank-typescript
# Reset cache
expo r -c
# Remove node_modules
rm -rf node_modules
```

## Storybook

```bash
# Create application
expo init --template tabs taskbox
# Go to application
cd taskbox
# Add Storybook to application
npx -p @storybook/cli sb init --type react_native
# Run Storybook
npm storybook
```

Change `storybook/rn-addons.js` to the following:

```javascript
// storybook/rn-addons.js
import "@storybook/addon-ondevice-actions/register";
```

**React Native Shadow**

```javascript
shadowColor: "#000000",
shadowOffset: {
	width: 0,
	height: 4,
},
shadowOpacity: 0.08,
shadowRadius: 12,
elevation: 5,
```

**React Native Data**

```javascript
const data = [
  {
    name: "Luan Nguyen",
    age: 30,
  },
  {
    name: "Steve Jobs",
    age: 40,
  },
];

export default function App() {
  return (
    <View>
      <View>
        {data.map((item, index) => (
          <Text key={index}>
            {item.name}, {item.age}
          </Text>
        ))}
      </View>
    </View>
  );
}
```

## Examples

```javascript
export default function App() {
  clickMe = () => {
    alert("Hello World!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Native</Text>
      <TouchableOpacity onPress={this.clickMe.bind(this)}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
```

**Function**

```javascript
clickMe = () => {
  var message = ``;

  if (Platform.OS == "ios") {
    message = "Welcome to iOS!";
  } else if (Platform.OS == "android") {
    message = "Welcome to Android!";
  }

  Alert.alert(message);
};
```

```javascript
const getFullName = (firstName, secondName, thirdName) => {
  return firstName + " " + secondName + " " + thirdName;
};

const Cat = () => {
  return <Text>Hello, I am {getFullName("Rum", "Tum", "Tugger")}!</Text>;
};

export default Cat;
```

**State**

```javascript
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

const Cat = (props) => {
  const [isHungry, setIsHungry] = useState(true);

  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
    </View>
  );
};

const Cafe = () => {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
};

export default Cafe;
```

## React Navigation

```bash
# Install necessery dependencices
expo install @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-safe-area-context react-native-screens react-native-svg
```

[React Navigation](https://reactnavigation.org/)

**Moving Between Screens:**

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

**Passing Parameters To Routes:**

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

**Access The Navigation Prop From Any Component:**

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

- [NavigationActions Reference](https://reactnavigation.org/docs/1.x/navigation-actions)
- [StackNavigator Reference](https://reactnavigation.org/docs/1.x/stack-navigator#screen-navigation-options)
- [TabNavigator Reference](https://reactnavigation.org/docs/1.x/tab-navigator)

[Expo project error Could not connect to development server after updating expo SDK](https://stackoverflow.com/questions/58458091/expo-project-error-could-not-connect-to-development-server-after-updating-expo-s)

1. Run `npm install -g expo-cli` to install the latest Expo CLI globally.
2. Close your Expo CLI server if you are using it.
3. Make sure in `app.json` the `sdkVersion` is `33.0.0`
4. Change the `react` dependency in your package.json from `16.5.0` to `16.8.3`
5. Delete your project `node_modules` directory and `package-lock.json` file
6. Run `npm install` or `yarn install` depending on your package manager.
7. Run `expo start -c` to clear your cache and start your application.
