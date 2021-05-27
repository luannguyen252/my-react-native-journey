# React Native Configuring Header Bar

## Props of the header bar

`title`

`headerStyle`

`backgroundColor`

`headerTintColor`

`headerTitleStyle`

`fontWeight`

```javascript
static navigationOptions = {
    title: 'HeaderTitle',
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#0ff',
    headerTitleStyle: {
       fontWeight: 'bold',
    },
};
```

## React Native Moving from One Screen to Other Example 1

```javascript
import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    //headerTintColor: '#0ff',
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.push("Profile")}
        />
      </View>
    );
  }
}
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    headerTintColor: "#0ff",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go to Profile... again"
          onPress={() => this.props.navigation.push("Profile")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
```

## Using params in the title

```javascript
// ProfileScreen.js
class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("otherParam", "A Param Header"),
    };
  };
}

// Button.js
<Button
  title="Update the title"
  onPress={() =>
    this.props.navigation.setParams({ otherParam: "Header Updated!" })
  }
/>;
```

```javascript
import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#f4511e",
    },
    //headerTintColor: '#0ff',
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Profile"
          onPress={() => this.props.navigation.push("Profile")}
        />
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("otherParam", "A Param Header"),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile Screen</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: "Header Updated!" })
          }
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: "Home",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
```
