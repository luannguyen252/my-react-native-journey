import 'react-native-gesture-handler';

import React from 'react';

import {StatusBar} from 'react-native';

import {Provider} from 'react-redux';

import initialState from './src/Store/Reducers/initialState';

import configureStore from './src/Store/configureStore';

import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from './src/Navigation/RootNavigation';

import MainStackNavigator from './src/Navigation';

const store = configureStore(initialState);

import {Colors} from './src/Assets';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        backgroundColor={Colors.MainColor}
        barStyle={'light-content'}
      />
      <NavigationContainer ref={navigationRef}>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
