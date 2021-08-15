import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { OfferNavParamList } from "../../types";
import { Offer, OfferDetail } from "../screens";

const OfferStack = createStackNavigator<OfferNavParamList>();

const OfferNav = () => {
  return (
    <OfferStack.Navigator headerMode="none">
      <OfferStack.Screen name="Offer" component={Offer} />
      <OfferStack.Screen name="OfferDetail" component={OfferDetail} />
    </OfferStack.Navigator>
  );
};

export default OfferNav;
