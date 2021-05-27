import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import HomeScreen from './screens/HomeScreen';
import BadgeScreen from './screens/BadgeScreen';

const AppNavigator = createStackNavigator({
  home: HomeScreen,
  badge: BadgeScreen
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}