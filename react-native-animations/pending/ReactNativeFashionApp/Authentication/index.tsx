import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from '../components/Navigation';

import Onboarding, { assets as OnBoardingAssets } from './Onboarding';
import Welcome, { assets as WelcomeAssets } from './Welcome';
import Login from './Login';

export { default as Onboarding } from './Onboarding';
export { default as Welcome } from './Welcome';

export const assets = [...OnBoardingAssets, ...WelcomeAssets];

const AuthenticationStack = createStackNavigator<Routes>();
export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};
