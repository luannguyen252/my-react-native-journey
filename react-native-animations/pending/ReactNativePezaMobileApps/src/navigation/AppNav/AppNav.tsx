import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather as Icon } from '@expo/vector-icons';

import { theme } from '../../components';
import { AppNavParamList } from '../../types/navigation.types';
import HomeNav from '../HomeNav/HomeNav';
import SortNav from '../SortNav/SortNav';
import ProfileNav from '../ProfileNav/ProfileNav';
import FavoritesNav from '../FavoritesNav/FavoritesNav';
import { HomeIcon, CategoryIcon, FavoriteIcon, ProfileIcon } from '../../svg/homeNavIcons';

const AppStack = createBottomTabNavigator<AppNavParamList>();

const AppNav = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppStack.Navigator
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          activeTintColor: theme.colors.primary,
          inactiveTintColor: theme.colors.lightGrey,
          inactiveBackgroundColor: theme.colors.secondary,
          activeBackgroundColor: theme.colors.secondary,
        }}>
        <AppStack.Screen
          name="Home"
          component={HomeNav}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="home" size={24} color={color} />;
            },
          }}
        />
        <AppStack.Screen
          name="Categories"
          component={SortNav}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="search" size={24} color={color} />;
            },
          }}
        />
        <AppStack.Screen
          name="Favorites"
          component={FavoritesNav}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="heart" size={24} color={color} />;
            },
            unmountOnBlur: true,
          }}
        />
        <AppStack.Screen
          name="Profile"
          component={ProfileNav}
          options={{
            tabBarIcon: ({ color }) => {
              return <Icon name="user" size={24} color={color} />;
            },
            unmountOnBlur: true,
          }}
        />
      </AppStack.Navigator>
    </SafeAreaView>
  );
};

export default AppNav;
