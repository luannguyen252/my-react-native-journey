import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SortNavParamList } from '../../types/navigation.types';
import { Sort, SortResult, ListingDetail, ListingDetailsExtra } from '../../screens';

const SortStack = createStackNavigator<SortNavParamList>();

const SortNav = () => {
  return (
    <SortStack.Navigator headerMode="none">
      <SortStack.Screen name="Sort" component={Sort} />
      <SortStack.Screen name="SortResult" component={SortResult} />
      <SortStack.Screen name="ListingDetail" component={ListingDetail} />
      <SortStack.Screen name="ListingDetailExtra" component={ListingDetailsExtra} />
    </SortStack.Navigator>
  );
};

export default SortNav;
