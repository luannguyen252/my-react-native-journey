import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ExploreNavParamList } from '../../types';
import { Explore, CategoryDetail, Favorites, Notifications } from '../screens';

const ExploreStack = createStackNavigator<ExploreNavParamList>();

const ExploreNav = () => {
  return (
    <ExploreStack.Navigator headerMode="none">
      <ExploreStack.Screen name="Explore" component={Explore} />
      <ExploreStack.Screen name="CategoryDetail" component={CategoryDetail} />
      <ExploreStack.Screen name="Favorites" component={Favorites} />
      <ExploreStack.Screen name="Notifications" component={Notifications} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNav;
