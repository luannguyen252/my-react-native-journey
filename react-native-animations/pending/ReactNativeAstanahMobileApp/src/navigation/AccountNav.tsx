import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountNavParamList } from '../../types';
import {
  Profile,
  BasicInfo,
  AddressInfo,
  PaymentInfo,
  Password,
  AddAddress,
  AddCard,
} from '../screens';

const AccountStack = createStackNavigator<AccountNavParamList>();

const AcountNav = () => {
  return (
    <AccountStack.Navigator headerMode="none">
      <AccountStack.Screen name="Profile" component={Profile} />
      <AccountStack.Screen name="BasicInfo" component={BasicInfo} />
      <AccountStack.Screen name="AddressInfo" component={AddressInfo} />
      <AccountStack.Screen name="PaymentInfo" component={PaymentInfo} />
      <AccountStack.Screen name="Password" component={Password} />
      <AccountStack.Screen name="AddCard" component={AddCard} />
      <AccountStack.Screen name="AddAddress" component={AddAddress} />
    </AccountStack.Navigator>
  );
};

export default AcountNav;
