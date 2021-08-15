/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import Stack from './navigators/Stack';
import {navigationRef} from './navigators/RootNavigation';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 3000);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack />
    </NavigationContainer>
  );
};

export default App;
