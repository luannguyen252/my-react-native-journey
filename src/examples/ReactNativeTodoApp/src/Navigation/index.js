import React from 'react';

import {} from 'react-native';

import {Colors} from '../Assets';

import Registration from '../Screens/Registration';

import Home from '../Screens/Home';

import AddEditTask from '../Screens/AddEditTask';

import AllTasks from '../Screens/AllTasks';

import PeriodTasks from '../Screens/PeriodTasks';

import Splash from '../Screens/Splash';

import UserProfile from '../Screens/Profile';

import {createStackNavigator} from '@react-navigation/stack';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'TODO') {
            iconName = focused ? 'calendar-text' : 'calendar-text-outline';
          } else if (route.name === 'Period Tasks') {
            iconName = focused ? 'clipboard-list' : 'clipboard-list-outline';
          } else if (route.name === 'User Profile') {
            iconName = focused ? 'account-circle' : 'account-circle-outline';
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.MainColor,
        inactiveTintColor: Colors.SecondRelativeMainColor,
      }}>
      <Tab.Screen name="TODO" component={TODOStack} />
      <Tab.Screen name="Period Tasks" component={PeriodTasks} />
      <Tab.Screen name="User Profile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const TODOStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AddTask" component={AddEditTask} />
      <Stack.Screen name="AllTasks" component={AllTasks} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
