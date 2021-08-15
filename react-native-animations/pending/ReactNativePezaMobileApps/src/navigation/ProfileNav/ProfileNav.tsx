import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileNavParamList } from '../../types/navigation.types';
import {
  Profile,
  MyListings,
  EditAccount,
  ManageListings,
  NewListingInfo,
  NewListingSpace,
  NewListingImg,
  NewListingFinal,
  ListingSuccess,
  Login,
  Register,
  ForgotPassword,
  About,
  Terms,
  RentalUserTerms,
  ListingsQualityPolicy,
  GoodNeighborPolicy,
  TermsOfUse,
  RespectfulRentingPledge,
} from '../../screens';

const ProfileStack = createStackNavigator<ProfileNavParamList>();

const ProfileNav = () => {
  return (
    <ProfileStack.Navigator headerMode="none">
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="MyListings" component={MyListings} />
      <ProfileStack.Screen name="EditAccount" component={EditAccount} />
      <ProfileStack.Screen name="ManageListings" component={ManageListings} />
      <ProfileStack.Screen name="NewListingInfo" component={NewListingInfo} />
      <ProfileStack.Screen name="NewListingSpace" component={NewListingSpace} />
      <ProfileStack.Screen name="NewListingImg" component={NewListingImg} />
      <ProfileStack.Screen name="NewListingFinal" component={NewListingFinal} />
      <ProfileStack.Screen name="ListingSuccess" component={ListingSuccess} />
      <ProfileStack.Screen name="Login" component={Login} />
      <ProfileStack.Screen name="Register" component={Register} />
      <ProfileStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <ProfileStack.Screen name="About" component={About} />
      <ProfileStack.Screen name="Terms" component={Terms} />
      <ProfileStack.Screen name="RentalUserTerms" component={RentalUserTerms} />
      <ProfileStack.Screen name="ListingsQualityPolicy" component={ListingsQualityPolicy} />
      <ProfileStack.Screen name="GoodNeighborPolicy" component={GoodNeighborPolicy} />
      <ProfileStack.Screen name="TermsOfUse" component={TermsOfUse} />
      <ProfileStack.Screen name="RespectfulRentingPledge" component={RespectfulRentingPledge} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNav;
