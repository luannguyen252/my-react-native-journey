import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AppNavParamList } from "../../types";
import HomeNav from "./HomeNav";
import CartNav from "./CartNav";
import AccountNav from "./AccountNav";
import OfferNav from "./OfferNav";
import { Box, Text, theme } from "../components";
import {
  HomeIcon,
  ExploreIcon,
  CartIcon,
  OfferIcon,
  ProfileIcon,
} from "../Svg";
import ExploreNav from "./ExploreNav";
import { useAppContext } from "../context/context";

const AppStack = createBottomTabNavigator<AppNavParamList>();

const AppNav = () => {
  const { cart } = useAppContext();
  return (
    <AppStack.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        labelStyle: {
          fontFamily: "Poppins-Bold",
          fontSize: 10,
        },

        activeTintColor: theme.colors.primary,
        inactiveTintColor: theme.colors.grey,
      }}
    >
      <AppStack.Screen
        name="Home"
        component={HomeNav}
        options={{
          tabBarIcon: ({ color }) => {
            return <HomeIcon color={color} />;
          },
        }}
      />
      <AppStack.Screen
        name="Explore"
        component={ExploreNav}
        options={{
          tabBarIcon: ({ color }) => {
            return <ExploreIcon color={color} />;
          },
        }}
      />
      <AppStack.Screen
        name="Cart"
        component={CartNav}
        options={{
          tabBarIcon: ({ color }) => {
            return (
              <Box>
                <CartIcon color={color} />
                {cart.length > 0 && (
                  <Box
                    style={{
                      position: "absolute",
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      borderColor: theme.colors.white,
                      backgroundColor: theme.colors.red,
                      bottom: 10,
                      left: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Poppins-Bold",
                        fontSize: 11,
                        letterSpacing: 0.5,
                      }}
                      color="white"
                    >
                      {cart.length}
                    </Text>
                  </Box>
                )}
              </Box>
            );
          },
        }}
      />
      <AppStack.Screen
        name="Offer"
        component={OfferNav}
        options={{
          tabBarIcon: ({ color }) => {
            return <OfferIcon color={color} />;
          },
        }}
      />
      <AppStack.Screen
        name="Account"
        component={AccountNav}
        options={{
          tabBarIcon: ({ color }) => {
            return <ProfileIcon color={color} />;
          },
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppNav;
