// Import React Libraries
import * as React from "react";
// Import React Native Libraries
import { StyleSheet, Text } from "react-native";
// Routing & Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// Screens
import FirstScreen from "./src/screens/FirstScreen";
import SecondScreen from "./src/screens/SecondScreen";
import ThirdScreen from "./src/screens/ThirdScreen";
import FourthScreen from "./src/screens/FourthScreen";
import FifthScreen from "./src/screens/FifthScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import CustomKeyboardScreen from "./src/screens/CustomKeyboardScreen";
// Tab Bar Icons
import {
  IconFirst,
  IconSecond,
  IconThird,
  IconFourth,
  IconFifth,
} from "./src/assets/icons/";

// BEGIN: Active and Inactive Color
const activeColor: string = "#EE0033";
const inactiveColor: string = "#A7A7A7";
const labelColor: string = "#FFFFFF";
// END: Active and Inactive Color

// BEGIN: Navigation Bottom Tab
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "First") {
            return focused ? (
              <IconFirst
                backgroundColor={activeColor}
                labelColor={labelColor}
              />
            ) : (
              <IconFirst
                backgroundColor={inactiveColor}
                labelColor={labelColor}
              />
            );
          } else if (route.name === "Second") {
            return focused ? (
              <IconSecond
                backgroundColor={activeColor}
                labelColor={labelColor}
              />
            ) : (
              <IconSecond
                backgroundColor={inactiveColor}
                labelColor={labelColor}
              />
            );
          } else if (route.name === "Third") {
            return focused ? (
              <IconThird
                backgroundColor={activeColor}
                labelColor={labelColor}
              />
            ) : (
              <IconThird
                backgroundColor={inactiveColor}
                labelColor={labelColor}
              />
            );
          } else if (route.name === "Fourth") {
            return focused ? (
              <IconFourth
                backgroundColor={activeColor}
                labelColor={labelColor}
              />
            ) : (
              <IconFourth
                backgroundColor={inactiveColor}
                labelColor={labelColor}
              />
            );
          } else if (route.name === "Fifth") {
            return focused ? (
              <IconFifth
                backgroundColor={activeColor}
                labelColor={labelColor}
              />
            ) : (
              <IconFifth
                backgroundColor={inactiveColor}
                labelColor={labelColor}
              />
            );
          }
        },
        tabBarLabel: ({ focused }) => {
          if (route.name === "First") {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? activeColor : inactiveColor },
                ]}
              >
                First
              </Text>
            );
          } else if (route.name === "Second") {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? activeColor : inactiveColor },
                ]}
              >
                Second
              </Text>
            );
          } else if (route.name === "Third") {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? activeColor : inactiveColor },
                ]}
              >
                Third
              </Text>
            );
          } else if (route.name === "Fourth") {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? activeColor : inactiveColor },
                ]}
              >
                Fourth
              </Text>
            );
          } else if (route.name === "Fifth") {
            return (
              <Text
                style={[
                  styles.tabBarLabel,
                  { color: focused ? activeColor : inactiveColor },
                ]}
              >
                Fifth
              </Text>
            );
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: activeColor,
        inactiveTintColor: inactiveColor,
        style: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 5,
        },
      }}
    >
      <Tab.Screen name="First" component={FirstStackScreen} />
      <Tab.Screen name="Second" component={SecondScreen} />
      <Tab.Screen name="Third" component={ThirdScreen} />
      <Tab.Screen name="Fourth" component={FourthScreen} />
      <Tab.Screen name="Fifth" component={FifthScreen} />
    </Tab.Navigator>
  );
}
// END: Navigation Bottom Tab

// BEGIN: Navigation Stack
const Stack = createStackNavigator();

const FirstStack = createStackNavigator();
const FirstStackScreen = () => (
  <FirstStack.Navigator>
    <FirstStack.Screen
      name="First"
      component={FirstScreen}
      options={{
        headerShown: false,
      }}
    />
  </FirstStack.Navigator>
);
// END: Navigation Stack

// BEGIN: App
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="First"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Custom Keyboard" component={CustomKeyboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// END: App

// BEGIN: Navigation Styles
const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
});
// END: Navigation Styles
