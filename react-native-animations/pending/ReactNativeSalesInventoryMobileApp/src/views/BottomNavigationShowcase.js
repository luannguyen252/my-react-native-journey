import React from 'react'
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from 'react-native-ui-kitten'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Bar from './Bar'
import Restaurant from './Restaurant'

export const BottomNavigationShowcase = props => {
  const onTabSelect = selectedIndex => {
    const { [index]: selectedRoute } = props.navigation.state.routes
    props.navigation.navigate(selectedRoute.routeName)
  }

  return (
    <BottomNavigation
      //   selectedIndex={props.navigation.state.index}
      onSelect={onTabSelect}
    >
      <BottomNavigationTab title="Bar" />
      <BottomNavigationTab title="Restaurant" />
    </BottomNavigation>
  )
}

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Bar: Bar,
    Restaurant: Restaurant
  },
  {
    initialRouteName: 'Restaurant',
    tabBarComponent: BottomNavigationShowcase
  }
)
