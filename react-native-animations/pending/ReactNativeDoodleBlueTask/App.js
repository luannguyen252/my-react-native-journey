/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { TransitionSpecs, HeaderStyleInterpolators ,createStackNavigator} from '@react-navigation/stack';
import Home from './Src/Home/Home'
import Details from './Src/Details/Details'
import ViewAll from "./Src/ViewAll/ViewAll";
import { NavigationContainer } from '@react-navigation/native';
import {Platform} from 'react-native';

console.disableYellowBox = true;



const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={ Platform.OS === 'ios' ? null :  {
    headerShown: false,
    cardOverlayEnabled: true,
    gestureEnabled: true,

    cardStyleInterpolator: ({ current: { progress },layouts }) => {


      
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [layouts.screen.width, 0],
      });
      const opacity = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      });

      return { cardStyle: { opacity,translateX },overlayStyle:{opacity: progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),} };
    },
    gestureEnabled: false,
    cardStyle: {
      backgroundColor: "transparent",
    },

  }}>
        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />
        <Stack.Screen name="Details" component={Details}  options={{headerShown: false}} />
        <Stack.Screen name="ViewAll" component={ViewAll}  options={{headerShown: false}} />

         
         
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
