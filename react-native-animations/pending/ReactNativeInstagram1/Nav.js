import { Navigation } from 'react-native-navigation';
import { iOSColors } from 'react-native-typography';

import { registerScreens } from './screens';
import { iconsMap } from './utils/themes';
import { navBarStyle } from './utils';

import appInit from './utils/appInit';

registerScreens();

export function startLogin() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'instagramApp.LoginScreen',
      navigatorStyle: {
        navBarHidden: true
      },
      navigatorButtons: {}
    }
  });
}

export function startMainApp() {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Feed',
        screen: 'instagramApp.FeedScreen',
        title: 'Feed',
        icon: iconsMap['ios-home'],
        navigatorStyle: navBarStyle
      },
      {
        label: 'Explore',
        screen: 'instagramApp.ExploreScreen',
        title: 'Explore',
        icon: iconsMap['ios-search'],
        navigatorStyle: navBarStyle
      }
    ],
    tabsStyle: {
      // iOS
      tabBarButtonColor: iOSColors.midGray,
      tabBarSelectedButtonColor: iOSColors.black,
      tabBarBackgroundColor: iOSColors.white,
      tabBarHideShadow: false,
      initialTabIndex: 0
    },
    appStyle: {
      // Android
      tabBarBackgroundColor: iOSColors.white,
      tabBarButtonColor: iOSColors.midGray,
      tabBarSelectedButtonColor: iOSColors.black,
      tabBarTranslucent: false,
      tabFontFamily: 'Avenir-Medium'
    }
  });
}

export function init() {
  appInit();
}
