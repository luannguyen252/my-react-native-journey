import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthParamList } from "../../types";
import { Welcome, Register, ForgotPassword } from "../screens";

const AuthStack = createStackNavigator<AuthParamList>();

const AuthNav = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

export default AuthNav;
