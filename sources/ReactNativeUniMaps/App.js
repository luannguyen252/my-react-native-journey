import React from 'react';
import { Font, AppLoading } from 'expo';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import MapScreen from './screens/MapScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';

const HomeStack = {
  screen: createStackNavigator({
    home: HomeScreen,
    category: CategoryScreen,
    map: MapScreen
  }),
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="home" size={30} color={tintColor} />
    }
  }
}

const FavoritesStack = {
  screen: createStackNavigator({
    favorites: FavoritesScreen,
    map: MapScreen 
  }),
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="star" size={30} color={tintColor} />
    }
  }
};

const ProfileStack = {
  screen: createStackNavigator({
    profile: ProfileScreen,
    editprofile: EditProfileScreen
  }),
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => {
      return <Icon name="person" size={30} color={tintColor} />
    }
  }
}

const AppNavigator = createSwitchNavigator({
  welcome: WelcomeScreen,
  main: createBottomTabNavigator(
    {
      homeStack: HomeStack,
      favorites: FavoritesStack,
      //profileStack: ProfileStack
    },
    {
      tabBarOptions: {
        showLabel: false
      }
    }
  )
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  state = { fontLoaded: false }

  async componentDidMount() {
    await Font.loadAsync({
      'karla-regular': require('./assets/fonts/Karla-Regular.ttf'),
      'karla-bold': require('./assets/fonts/Karla-Bold.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      this.state.fontLoaded ? (
        <Provider store={store}>
          <PersistGate loading={<AppLoading />} persistor={persistor}>
            <AppContainer />
          </PersistGate>
        </Provider>
      ) : <AppLoading />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
