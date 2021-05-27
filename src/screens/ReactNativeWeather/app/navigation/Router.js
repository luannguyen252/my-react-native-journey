import React, { Component } from "react";
import { AppRegistry, ScrollView, Text, View } from "react-native";
import {
  DrawerItems,
  DrawerNavigator,
  StackNavigator,
  TabNavigator,
} from "react-navigation";
import { HomeScreen } from "../HomeScreen";
import { DetailsScreen1 } from "../DetailsScreen1";
import { DetailsScreen2 } from "../DetailsScreen2";
import { SettingsScreen } from "../SettingsScreen";
import * as css from "../Styles";
import { Icon } from "react-native-elements";
import { Provider } from "react-redux";
import { store } from "../state/Context";

const NavTab = TabNavigator(
  {
    DetailsRoute1: { screen: DetailsScreen1 },
    DetailsRoute2: { screen: DetailsScreen2 },
  },
  {
    lazyLoad: false,
    tabBarPosition: "bottom",
    backBehavior: "none",
    tabBarOptions: css.tabs,
  }
);

const titleAndIcon = (
  <View style={css.header.container}>
    <Icon name="wb-sunny" color={css.colors.text_light} />
    <Text style={css.header.text}>Weather App</Text>
  </View>
);

const NavStack = StackNavigator(
  {
    HomeRoute: { screen: HomeScreen },
    DetailsRoute: { screen: NavTab },
  },
  {
    navigationOptions: {
      headerTitle: titleAndIcon,
      ...css.header,
    },
  }
);

const customDrawerComponent = (props) => (
  <ScrollView
    style={{
      flex: 1,
      backgroundColor: css.drawer.style.backgroundColor,
    }}
  >
    <DrawerItems {...props} />
  </ScrollView>
);

const NavDrawer = DrawerNavigator(
  {
    HomeRoute: {
      screen: NavStack,
      navigationOptions: {
        drawerLabel: "Main App",
        drawerIcon: ({ tintColor }) => (
          <Icon name="wb-sunny" color={tintColor} />
        ),
      },
    },
    SettingsRoute: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerLabel: "Settings",
        drawerIcon: ({ tintColor }) => (
          <Icon name="settings" color={tintColor} />
        ),
      },
    },
  },
  {
    contentComponent: customDrawerComponent,
    drawerPosition: "left",
    contentOptions: css.drawer,
  }
);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavDrawer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("WeatherApp", () => Root);
