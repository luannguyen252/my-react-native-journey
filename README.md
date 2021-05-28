# React Native

> React Native is a JavaScript framework for building cross-platform apps. This guide covers everything you need to know to start developing React Native apps.

[React Native](https://reactnative.dev/)

[React Native Express](https://www.reactnative.express/)

## Tutorials

- [Catalin Miron - Youtube](https://www.youtube.com/channel/UCTcH04SRuyedaSuuQVeAcdg)
- [Catalin Miron - Patreon](https://www.patreon.com/catalinmiron)
- [William Candillon - Youtube](https://www.youtube.com/channel/UC806fwFWpiLQV5y-qifzHnA)
- [React Native Tutorial - Tutorials Point](https://www.tutorialspoint.com/react_native/index.htm)

## Courses

- [Build Delightful Gestures and Animations](https://start-react-native.dev/)

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
