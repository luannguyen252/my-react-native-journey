import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { FavoritesNavParamList } from '../../types/navigation.types';
import { Favorites, ListingDetail, ListingDetailsExtra } from '../../screens';

const FavoritesStack = createStackNavigator<FavoritesNavParamList>();

const FavoritesNav = () => {
  return (
    <FavoritesStack.Navigator headerMode="none">
      <FavoritesStack.Screen name="Favorite" component={Favorites} />
      <FavoritesStack.Screen name="ListingDetail" component={ListingDetail} />
      <FavoritesStack.Screen name="ListingDetailExtra" component={ListingDetailsExtra} />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesNav;
