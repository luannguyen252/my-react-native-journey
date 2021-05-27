import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import MainScreen from "./src/screens/mainScreen";

const navigator = createStackNavigator(
  {
    Main: MainScreen
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      title: "Soundboard"
    }
  }
);

const App = () => {
  return <MainScreen />;
};

export default App;
