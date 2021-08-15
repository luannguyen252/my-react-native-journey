import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SignIn,
  Auth,
  Onboarding,
  SplashScreen,
  SignUp,
  Favorites,
  Home,
  Messages,
  Profile,
  MessageDetails,
  PropertyManager,
  PropertyDetails,
} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          tabBarIcon: ({tintColor}) => (
            <AntDesign name="home" color="#ccc" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favorites',
          tabBarIcon: ({tintColor}) => (
            <MaterialIcons name="favorite-border" color="#ccc" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          title: 'Messages',
          tabBarIcon: ({tintColor}) => (
            <AntDesign name="message1" color="#ccc" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({tintColor}) => (
            <Ionicons name="md-person-outline" color="#ccc" size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const NavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PropertyManager"
        component={PropertyManager}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PropertyDetails"
        component={PropertyDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="NavStack">
      <Stack.Screen
        name="NavStack"
        component={NavStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabStack"
        component={TabStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
