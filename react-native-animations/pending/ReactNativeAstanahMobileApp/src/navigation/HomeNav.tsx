import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeNavParamList } from "../../types";
import {
  Home,
  Favorites,
  Notifications,
  ProductDetail,
  Categories,
  Sale,
  CategoryDetail,
} from "../screens";

const AuthStack = createStackNavigator<HomeNavParamList>();

const HomeNav = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Favorites" component={Favorites} />
      <AuthStack.Screen name="Notifications" component={Notifications} />
      <AuthStack.Screen name="ProductDetail" component={ProductDetail} />
      <AuthStack.Screen name="CategoryDetail" component={CategoryDetail} />
      <AuthStack.Screen name="Categories" component={Categories} />
      <AuthStack.Screen name="Sale" component={Sale} />
    </AuthStack.Navigator>
  );
};

export default HomeNav;
