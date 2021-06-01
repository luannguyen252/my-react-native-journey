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
import AnimationScreen from "./src/screens/AnimationScreen";
import BlurScreen from "./src/screens/BlurScreen";
import CameraScreen from "./src/screens/CameraScreen";
import GetDataScreen from "./src/screens/GetDataScreen";
import BottomSheetScreen from "./src/screens/BottomSheetScreen";
import ParallaxScreen from "./src/screens/ParallaxScreen";
import ModalScreen from "./src/screens/ModalScreen";
import KeyboardScreen from "./src/screens/KeyboardScreen";
import OverlayScreen from "./src/screens/OverlayScreen";
import ActivityIndicatorScreen from "./src/screens/ActivityIndicatorScreen";
import FlatListScreen from "./src/screens/FlatListScreen";
import SectionListScreen from "./src/screens/SectionListScreen";
import SwitchScreen from "./src/screens/SwitchScreen";
import VirtualizedListScreen from "./src/screens/VirtualizedListScreen";
import TextInputScreen from "./src/screens/TextInputScreen";
import VibrationScreen from "./src/screens/VibrationScreen";
import TransformsScreen from "./src/screens/TransformsScreen";
import ShareScreen from "./src/screens/ShareScreen";
import PlatformColorScreen from "./src/screens/PlatformColorScreen";
import PlatformScreen from "./src/screens/PlatformScreen";
import PixelRatioScreen from "./src/screens/PixelRatioScreen";
import LayoutAnimationScreen from "./src/screens/LayoutAnimationScreen";
// Examples
// import ReactNativePaperExample from "./src/screens/ThirdScreen/ReactNativePaperExample/";
import NativeBaseExample from "./src/screens/FourthScreen/NativeBaseExample";
import EasingExample from "./src/screens/SecondScreen/EasingExample";
import MapViewExample from "./src/screens/SecondScreen/MapViewExample";
import LocationExample from "./src/screens/SecondScreen/LocationExample";
import KeyboardAPIExample from "./src/screens/SecondScreen/KeyboardAPIExample";
import UseKeyboardHookExample from "./src/screens/SecondScreen/UseKeyboardHookExample";
import APIExample from "./src/screens/ThirdScreen/APIExample/";
import StateAndPropExample from "./src/screens/ThirdScreen/StateAndPropExample/";
import ReactLifecycleExample from "./src/screens/ThirdScreen/ReactLifecycleExample/";
// Tab Bar Icons
import {
  IconFirst,
  IconSecond,
  IconThird,
  IconFourth,
  IconFifth,
} from "./src/assets/icons/";

// BEGIN: Active and Inactive Color
const activeColor: string = "#ee0033";
const inactiveColor: string = "#a7a7a7";
const labelColor: string = "#ffffff";
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
        <Stack.Screen name="Animation" component={AnimationScreen} />
        <Stack.Screen name="Blur" component={BlurScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Get Data" component={GetDataScreen} />
        <Stack.Screen name="Bottom Sheet" component={BottomSheetScreen} />
        <Stack.Screen name="Parallax" component={ParallaxScreen} />
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Keyboard" component={KeyboardScreen} />
        <Stack.Screen name="Overlay" component={OverlayScreen} />
        <Stack.Screen
          name="Activity Indicator"
          component={ActivityIndicatorScreen}
        />
        <Stack.Screen name="Flat List" component={FlatListScreen} />
        <Stack.Screen name="Section List" component={SectionListScreen} />
        <Stack.Screen name="Switch" component={SwitchScreen} />
        <Stack.Screen
          name="Virtualized List"
          component={VirtualizedListScreen}
        />
        <Stack.Screen name="Text Input" component={TextInputScreen} />
        <Stack.Screen name="Vibration" component={VibrationScreen} />
        <Stack.Screen name="Transforms" component={TransformsScreen} />
        <Stack.Screen name="Share" component={ShareScreen} />
        <Stack.Screen name="Platform Color" component={PlatformColorScreen} />
        <Stack.Screen name="Platform" component={PlatformScreen} />
        <Stack.Screen name="Pixel Ratio" component={PixelRatioScreen} />
        <Stack.Screen
          name="Layout Animation"
          component={LayoutAnimationScreen}
        />
        {/* Examples */}
        {/* <Stack.Screen
          name="React Native Paper"
          component={ReactNativePaperExample}
        /> */}
        <Stack.Screen name="Native Base" component={NativeBaseExample} />
        <Stack.Screen name="Easing Example" component={EasingExample} />
        <Stack.Screen name="Map View Example" component={MapViewExample} />
        <Stack.Screen name="Location Example" component={LocationExample} />
        <Stack.Screen
          name="Keyboard API Example"
          component={KeyboardAPIExample}
        />
        <Stack.Screen
          name="UseKeyboard Hook Example"
          component={UseKeyboardHookExample}
        />
        <Stack.Screen name="API Example" component={APIExample} />
        <Stack.Screen
          name="State and Prop Example"
          component={StateAndPropExample}
        />
        <Stack.Screen
          name="React Lifecycle Example"
          component={ReactLifecycleExample}
        />
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
