# React Native Top Tab Navigator (createMaterialTopTabNavigator)

```javascript
// src/screens/index.js
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class HomeScreen extends Component {
  render() {
    return (
      <View>
        <Text>This is Home Screen</Text>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon name={focused ? "ios-home" : "md-home"} color={tintColor} size={25} />
  ),
};

// src/screens/profile.js
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>this is profile screen</Text>
      </View>
    );
  }
}

ProfileScreen.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-person" : "md-person"}
      color={tintColor}
      size={25}
    />
  ),
};

// src/screens/settings.js
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class SettingScreen extends Component {
  render() {
    return (
      <View>
        <Text>this is setting screen</Text>
      </View>
    );
  }
}

SettingScreen.navigationOptions = {
  tabBarIcon: ({ tintColor, focused }) => (
    <Icon
      name={focused ? "ios-settings" : "md-settings"}
      color={tintColor}
      size={25}
    />
  ),
};

// src/lib/router.js
import React from "react";
import {
  createMaterialTopTabNavigator,
  createAppContainer,
} from "react-navigation";
import HomeScreen from "../screens/index";
import ProfileScreen from "../screens/profile";
import SettingScreen from "../screens/settings";

const AppNavigator = createMaterialTopTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: "white",
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "red",
      },
    },
  }
);

export default createAppContainer(AppNavigator);

// src/index.js
import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { createAppContainer } from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";
import AppNavigator from "./lib/router";

const AppIndex = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="red" barStyle="light-content" />
        <View style={styles.header}>
          <Icon name="ios-camera" size={28} color="white" />
          <Icon name="ios-menu" size={28} color="white" />
        </View>
        <AppIndex />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "red",
    paddingHorizontal: 18,
    paddingTop: 5,
  },
});
```
