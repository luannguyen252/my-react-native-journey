import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
//React navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//Screens
import TitleScreen from "./src/screens/TitleScreen";
import BattleScreen from "./src/screens/BattleScreen";
import HelpScreen from "./src/screens/HelpScreen";
import LoadingScreen from "./src/screens/LoadingScreen";
//Flash Message
import FlashMessage from "react-native-flash-message";

//Create Navigator
const navigator = createStackNavigator(
  {
    Title: {
      screen: TitleScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Battle: {
      screen: BattleScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Help: {
      screen: HelpScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Loading: {
      screen: LoadingScreen,
      navigationOptions: {
        headerShown: false
      }
    }
  },
  {
    initialRouteName: "Title",
    options: {
      headerMode: "none"
    }
  }
);
const App = createAppContainer(navigator);
export default () => {
  //Load Fonts
  const [isHard, setIsHard] = useState(false); //0: Normal, 1: Hard
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        pixel: require("./assets/fonts/pixPixelFJVerdana12pt.ttf")
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (fontsLoaded) {
    return (
      <>
        <App screenProps={{ isHard: isHard, setIsHard: setIsHard }} />
        <FlashMessage position="bottom" />
      </>
    );
  } else {
    return <LoadingScreen />;
  }
};
