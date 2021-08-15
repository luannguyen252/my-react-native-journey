import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { RootParamList } from "../../types";
import { AuthNav, AppNav } from "../navigation";
import { useAppContext } from "../context/context";

const RootStack = createStackNavigator<RootParamList>();

const RootNav = () => {
  const { isLoggedIn } = useAppContext();
  return (
    // <RootStack.Navigator headerMode="none">
    //   {!isLoggedIn ? (
    //     <RootStack.Screen name="AuthNav" component={AuthNav} />
    //   ) : (
    //     <RootStack.Screen name="AppNav" component={AppNav} />
    //   )}
    // </RootStack.Navigator>

    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="AppNav" component={AppNav} />
    </RootStack.Navigator>
  );
};

export default RootNav;
