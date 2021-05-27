import { createAppContainer, createStackNavigator } from "react-navigation";
import { Platform } from "react-native";
import Home from "../Home";
import Add from "../Add";
import Edit from "../Edit";
import Settings from "../Settings";
import PrivacyPolicy from "../PrivacyPolicy";
import colors from "../../colors";
import strings from "../../strings";

const ios = Platform.OS === "ios" ? true : false;

// don't need navbars if on Android
getNavigationOptions = () => {
  return ios
    ? {
        headerStyle: {
          backgroundColor: colors.white
        },
        headerTintColor: colors.primary
      }
    : {
        headerStyle: {
          backgroundColor: colors.darkDark
        },
        headerTintColor: colors.notQuiteWhite,
        header: null
      };
};

const Navigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerBackTitle: strings.back
    }
  },
  Add: {
    screen: Add,
    navigationOptions: this.getNavigationOptions()
  },
  Edit: {
    screen: Edit,
    navigationOptions: this.getNavigationOptions()
  },
  Settings: {
    screen: Settings,
    navigationOptions: this.getNavigationOptions()
  },
  PrivacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: this.getNavigationOptions()
  }
});

export default (NavContainer = createAppContainer(Navigator));
