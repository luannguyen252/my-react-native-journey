import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home/HomeScreen';
import Example1Screen from './screens/Example1/Example1Screen';
import Example2Screen from './screens/Example2/Example2Screen';
import Example3Screen from './screens/Example3/Example3Screen';
import Example4Screen from './screens/Example4/Example4Screen';

console.disableYellowBox = true;

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Example1" component={Example1Screen} />
          <Stack.Screen name="Example2" component={Example2Screen} />
          <Stack.Screen name="Example3" component={Example3Screen} />
          <Stack.Screen name="Example4" component={Example4Screen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
