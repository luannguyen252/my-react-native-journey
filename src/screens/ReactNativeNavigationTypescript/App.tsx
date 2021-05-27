import { NavigationContainer } from "@react-navigation/native";
import React, { ReactNode } from "react";
import { StatusBar } from "react-native";
import MainNavigator from "./navigation/Navigator";

const App: () => ReactNode = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <MainNavigator />
    </NavigationContainer>
  );
};

export default App;
