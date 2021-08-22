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
// Reanimated
import ReanimatedScreen from "./src/screens/ReanimatedScreen";
// Tinder Swiping
import TinderSwiping from "./src/screens/TinderSwiping";
// Easing Screen
import EasingScreen from "./src/screens/EasingScreen";
// Lottie React Native
import LottieReactNativeScreen from "./src/screens/LottieReactNativeScreen";
// Lottie Animation Redirect Screen
import LottieAnimationRedirectScreen from "./src/screens/SecondScreen/LottieAnimationRedirectScreen/";
// Lottie Animation Sequence
import LottieAnimationSequence from "./src/screens/SecondScreen/LottieAnimationSequence";
// Master React Native Animations
import Section02AnimatingProperties from "./src/screens/MasterReactNativeAnimations/Section-02-Animating-Properties";
import Section03AnimatedValue from "./src/screens/MasterReactNativeAnimations/Section-03-Animated-Value";
import Section04AnimatedFunctions from "./src/screens/MasterReactNativeAnimations/Section-04-Animated-Functions";
import Section04AnimatedFunctionsEvent from "./src/screens/MasterReactNativeAnimations/Section-04-Animated-Functions/Section04AnimatedFunctionsEvent";
import Section05CombiningAnimations from "./src/screens/MasterReactNativeAnimations/Section-05-Combining-Animations";
import Section06Interpolation from "./src/screens/MasterReactNativeAnimations/Section-06-Interpolation";
import Section07NativeAnimations from "./src/screens/MasterReactNativeAnimations/Section-07-Native-Animations";
import Section07NativeAnimationsTimingEvent from "./src/screens/MasterReactNativeAnimations/Section-07-Native-Animations/Section07NativeAnimationsTimingEvent";
import Section08GesturesAndAnimations from "./src/screens/MasterReactNativeAnimations/Section-08-Gestures-and-Animations";
import Section09UnderstandingHowAnimatedWorks from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works";
import Section09UsingAndUnderstandingSetNativeProps from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works/Section09UsingAndUnderstandingSetNativeProps";
import Section09UsingD3InterpolateWithAnimated from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works/Section09UsingD3InterpolateWithAnimated";
import Section09UsingD3InterpolatePathAndAnimatedToAnimateSVGPaths from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works/Section09UsingD3InterpolatePathAndAnimatedToAnimateSVGPaths";
import Section09UsingArtMorphTweenAnimateComplexSVGPaths from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works/Section09UsingArtMorphTweenAnimateComplexSVGPaths";
import Section09UsingFlubberAndAnimatedSVGPathMorphing from "./src/screens/MasterReactNativeAnimations/Section-09-Understanding-How-Animated-Works/Section09UsingFlubberAndAnimatedSVGPathMorphing";
// Section 10 Animated Techniques
import Section10AnimatedTechniques from "./src/screens/MasterReactNativeAnimations/Section-10-Animated-Techniques";
import Section10AnimatedTechniques99Cliff from "./src/screens/MasterReactNativeAnimations/Section-10-Animated-Techniques/Section10AnimatedTechniques99Cliff";
import Section10AnimatedTechniquesAnimateHidden from "./src/screens/MasterReactNativeAnimations/Section-10-Animated-Techniques/Section10AnimatedTechniquesAnimateHidden";
import Section10AnimatedTechniquesInterruptedAnimation from "./src/screens/MasterReactNativeAnimations/Section-10-Animated-Techniques/Section10AnimatedTechniquesInterruptedAnimation";
import Section10AnimatedTechniquesPointerEvents from "./src/screens/MasterReactNativeAnimations/Section-10-Animated-Techniques/Section10AnimatedTechniquesPointerEvents";
// Section 11 Basic Real World
import Section11BasicRealWorld from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World";
import Section11BasicRealWorld4Corners from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorld4Corners";
import Section11BasicRealWorldStaggeredHeads from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldStaggeredHeads";
import Section11BasicRealWorldKittenCards from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldKittenCards";
import Section11BasicRealWorldStaggerFormItemsVisibilityOnMount from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldStaggerFormItemsVisibilityOnMount";
import Section11BasicRealWorldAnimatedProgressBarButton from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldAnimatedProgressBarButton";
import Section11BasicRealWorldDynamicAnimatedNotifications from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldDynamicAnimatedNotifications";
import Section11BasicRealWorldAnimatedQuestionnaireWithProgressBar from "./src/screens/MasterReactNativeAnimations/Section-11-Basic-Real-World/Section11BasicRealWorldAnimatedQuestionnaireWithProgressBar";
// Section 12 Advanced Real World
import Section12AdvancedRealWorld from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World";
import Section12AdvancedRealWorldPhotoGridSharedElement from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldPhotoGridSharedElement";
import Section12AdvancedRealWorldAnimatedColorPicker from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldAnimatedColorPicker";
import Section12AdvancedRealWorldFloatingActionButtonWithMenu from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldFloatingActionButtonWithMenu";
import Section12AdvancedRealWorldApplicationIntroScreen from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldApplicationIntroScreen";
import Section12AdvancedRealWorldEvolvingWriteButton from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldEvolvingWriteButton";
import Section12AdvancedRealWorldSocialCommentModalAnimatedSwipeAway from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldSocialCommentModalAnimatedSwipeAway";
import Section12AdvancedRealWorldHorizontalParallaxScrollView from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldHorizontalParallaxScrollView";
import Section12AdvancedRealWorldTapShowLoveFloatingHearts from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldTapShowLoveFloatingHearts";
import Section12AdvancedRealWorldBouncingHeartShapedLikeButtonOnPress from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldBouncingHeartShapedLikeButtonOnPress";
import Section12AdvancedRealWorldExplodingHeartButton from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldExplodingHeartButton";
import Section12AdvancedRealWorldExpandingNotifyInputWithSuccessMessage from "./src/screens/MasterReactNativeAnimations/Section-12-Advanced-Real-World/Section12AdvancedRealWorldExpandingNotifyInputWithSuccessMessage";
// Handling Gestures Events
import HandlingGesturesEventsPanResponder from "./src/screens/HandlingGesturesEvents/HandlingGesturesEventsPanResponder";
import HandlingGesturesEventsScroll from "./src/screens/HandlingGesturesEvents/HandlingGesturesEventsScroll";
// React Native Animatable
import ReactNativeAnimatableFadeInUp from "./src/screens/ReactNativeAnimatableScreen/ReactNativeAnimatableFadeInUp";
import ReactNativeAnimatableSlideInRight from "./src/screens/ReactNativeAnimatableScreen/ReactNativeAnimatableSlideInRight";
import ReactNativeAnimatableLooping from "./src/screens/ReactNativeAnimatableScreen/ReactNativeAnimatableLooping";
// React Native Touchable Scale Feedback
import ReactNativeTouchableScaleFeedback from "./src/screens/ReactNativeTouchableScaleFeedback";
// React Native Animate Loading Button
import ReactNativeAnimateLoadingButton from "./src/screens/ReactNativeAnimateLoadingButton";
// React Native Swipe Gestures
import ReactNativeSwipeGestures from "./src/screens/ReactNativeSwipeGestures";
// React Native Collapsible Toolbar
import ReactNativeCollapsibleToolbar from "./src/screens/ReactNativeCollapsibleToolbar";
// React Native Blinking Animation
import ReactNativeBlinkingAnimation from "./src/screens/ReactNativeBlinkingAnimation";
// React Native Gesture Flip Card
import ReactNativeGestureFlipCard from "./src/screens/ReactNativeGestureFlipCard";
// React Native Rotate Image
import ReactNativeRotateImage from "./src/screens/ReactNativeRotateImage";
// React Native Animated Ellipsis
import ReactNativeAnimatedEllipsis from "./src/screens/ReactNativeAnimatedEllipsis";
// React Native Flip Image View Horizontally
import FlipImageViewHorizontally from "./src/screens/FlipImageViewHorizontally";
// React Native Basic Animations
import MovingSquare from "./src/screens/ReactNativeBasicAnimations/MovingSquare";
import ColorSquare from "./src/screens/ReactNativeBasicAnimations/ColorSquare";
import RotateSquare from "./src/screens/ReactNativeBasicAnimations/RotateSquare";
import DragSquare from "./src/screens/ReactNativeBasicAnimations/DragSquare";
// React Native Animated Circular Progress
import ReactNativeAnimatedCircularProgress from "./src/screens/ReactNativeAnimatedCircularProgress";
// React Native Animated Swiper
import ReactNativeAnimatedSwiper from "./src/screens/ReactNativeAnimatedSwiper";
// React Native Shared Element
import ReactNativeSharedElementScreen from "./src/screens/ReactNativeSharedElementScreen";
import SharedElementTransitionReactNavigation from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransitionReactNavigation/";
import SharedElementTransitionReactNavigationV5 from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransitionReactNavigationV5/";
import SharedElementTransitionReactNavigationV5Details from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransitionReactNavigationV5/Details";
import SharedElementTransitionReactNavigationDetails from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransitionReactNavigation/Details";
import SharedElementTransition from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransition";
import SharedElementTransitionFadeInRight from "./src/screens/ReactNativeSharedElementScreen/SharedElementTransitionFadeInRight";
// React Native Animations
import ReactNativeAnimation from "./src/screens/ReactNativeAnimations";
import ReactNativeAnimation1 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation1";
import ReactNativeAnimation1Details from "./src/screens/ReactNativeAnimations/ReactNativeAnimation1/Details";
import ReactNativeAnimation2 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation2";
import ReactNativeAnimation2Details from "./src/screens/ReactNativeAnimations/ReactNativeAnimation2/Details";
import ReactNativeAnimation3 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation3";
import ReactNativeAnimation3Details from "./src/screens/ReactNativeAnimations/ReactNativeAnimation3/Details";
import ReactNativeAnimation4 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation4";
import ReactNativeAnimation5 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation5";
import ReactNativeAnimation6 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation6";
import ReactNativeAnimation7 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation7";
import ReactNativeAnimation8 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation8";
import ReactNativeAnimation9 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation9";
import ReactNativeAnimation10 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation10";
import ReactNativeAnimation11 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation11";
import ReactNativeAnimation12 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation12";
import ReactNativeAnimation13 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation13";
import ReactNativeAnimation14 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation14";
import ReactNativeAnimation15 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation15";
import ReactNativeAnimation16 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation16";
import ReactNativeAnimation17 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation17";
import ReactNativeAnimation18 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation18";
import ReactNativeAnimation19 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation19";
import ReactNativeAnimation20 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation20";
import ReactNativeAnimation21 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation21";
import ReactNativeAnimation22 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation22";
import ReactNativeAnimation23 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation23";
import ReactNativeAnimation24 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation24";
import ReactNativeAnimation25 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation25";
import ReactNativeAnimation26 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation26";
import ReactNativeAnimation27 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation27";
import ReactNativeAnimation28 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation28";
import ReactNativeAnimation29 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation29";
import ReactNativeAnimation30 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation30";
import ReactNativeAnimation31 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation31";
import ReactNativeAnimation32 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation32";
import ReactNativeAnimation33 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation33";
import ReactNativeAnimation34 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation34";
import ReactNativeAnimation35 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation35";
import ReactNativeAnimation36 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation36";
import ReactNativeAnimation37 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation37";
import ReactNativeAnimation38 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation38";
import ReactNativeAnimation39 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation39";
import ReactNativeAnimation40 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation40";
import ReactNativeAnimation41 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation41";
import ReactNativeAnimation42 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation42";
import ReactNativeAnimation43 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation43";
import ReactNativeAnimation44 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation44";
import ReactNativeAnimation45 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation45";
import ReactNativeAnimation46 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation46";
import ReactNativeAnimation47 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation47";
import ReactNativeAnimation48 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation48";
import ReactNativeAnimation49 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation49";
import ReactNativeAnimation50 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation50";
import ReactNativeAnimation51 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation51";
import ReactNativeAnimation52 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation52";
import ReactNativeAnimation53 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation53";
import ReactNativeAnimation54 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation54";
import ReactNativeAnimation55 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation55";
import ReactNativeAnimation56 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation56";
import ReactNativeAnimation57 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation57";
import ReactNativeAnimation58 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation58";
import ReactNativeAnimation59 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation59";
import ReactNativeAnimation60 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation60";
import ReactNativeAnimation61 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation61";
import ReactNativeAnimation62 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation62";
import ReactNativeAnimation63 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation63";
import ReactNativeAnimation64 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation64";
import ReactNativeAnimation65 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation65";
import ReactNativeAnimation66 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation66";
import ReactNativeAnimation67 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation67";
import ReactNativeAnimation68 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation68";
import ReactNativeAnimation69 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation69";
import ReactNativeAnimation70 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation70";
import ReactNativeAnimation71 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation71";
import ReactNativeAnimation72 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation72";
import ReactNativeAnimation73 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation73";
import ReactNativeAnimation74 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation74";
import ReactNativeAnimation75 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation75";
import ReactNativeAnimation76 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation76";
import ReactNativeAnimation77 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation77";
import ReactNativeAnimation78 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation78";
import ReactNativeAnimation79 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation79";
import ReactNativeAnimation80 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation80";
import ReactNativeAnimation81 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation81";
import ReactNativeAnimation82 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation82";
import ReactNativeAnimation83 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation83";
import ReactNativeAnimation84 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation84";
import ReactNativeAnimation85 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation85";
import ReactNativeAnimation86 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation86";
import ReactNativeAnimation87 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation87";
import ReactNativeAnimation88 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation88";
import ReactNativeAnimation89 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation89";
import ReactNativeAnimation90 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation90";
import ReactNativeAnimation91 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation91";
import ReactNativeAnimation92 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation92";
import ReactNativeAnimation93 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation93";
import ReactNativeAnimation94 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation94";
import ReactNativeAnimation95 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation95";
import ReactNativeAnimation96 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation96";
import ReactNativeAnimation97 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation97";
import ReactNativeAnimation98 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation98";
import ReactNativeAnimation99 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation99";
import ReactNativeAnimation100 from "./src/screens/ReactNativeAnimations/ReactNativeAnimation100";
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
        <Stack.Screen name="Easing" component={EasingScreen} />
        <Stack.Screen name="Reanimated" component={ReanimatedScreen} />
        <Stack.Screen name="Tinder Swiping" component={TinderSwiping} />
        <Stack.Screen
          name="Lottie React Native"
          component={LottieReactNativeScreen}
        />
        <Stack.Screen
          name="Lottie Animation Sequence"
          component={LottieAnimationSequence}
        />
        <Stack.Screen
          name="Lottie Animation Redirect Screen"
          component={LottieAnimationRedirectScreen}
        />
        {/* BEGIN: Master React Native Animations */}
        <Stack.Screen
          name="Section 02 Animating Properties"
          component={Section02AnimatingProperties}
        />
        <Stack.Screen
          name="Section 03 Animated Value"
          component={Section03AnimatedValue}
        />
        <Stack.Screen
          name="Section 04 Animated Functions"
          component={Section04AnimatedFunctions}
        />
        <Stack.Screen
          name="Section 04 Animated Functions Event"
          component={Section04AnimatedFunctionsEvent}
        />
        <Stack.Screen
          name="Section 05 Combining Animations"
          component={Section05CombiningAnimations}
        />
        <Stack.Screen
          name="Section 06 Interpolation"
          component={Section06Interpolation}
        />
        <Stack.Screen
          name="Section 07 Native Animations"
          component={Section07NativeAnimations}
        />
        <Stack.Screen
          name="Section 07 Native Animations Timing Event"
          component={Section07NativeAnimationsTimingEvent}
        />
        <Stack.Screen
          name="Section 08 Gestures And Animations"
          component={Section08GesturesAndAnimations}
        />
        {/* Section 09 Understanding How Animated Works */}
        <Stack.Screen
          name="Section 09 Understanding How Animated Works"
          component={Section09UnderstandingHowAnimatedWorks}
        />
        <Stack.Screen
          name="Section 09 Using and Understanding setNativeProps"
          component={Section09UsingAndUnderstandingSetNativeProps}
        />
        <Stack.Screen
          name="Section 09 Using D3 Interpolate With Animated"
          component={Section09UsingD3InterpolateWithAnimated}
        />
        <Stack.Screen
          name="Section 09 Using D3 Interpolate Path And Animated To Animate SVG Paths"
          component={
            Section09UsingD3InterpolatePathAndAnimatedToAnimateSVGPaths
          }
        />
        <Stack.Screen
          name="Section 09 Using Art Morph Tween Animate Complex SVG Paths"
          component={Section09UsingArtMorphTweenAnimateComplexSVGPaths}
        />
        <Stack.Screen
          name="Section 09 Using Flubber And Animated SVG Path Morphing"
          component={Section09UsingFlubberAndAnimatedSVGPathMorphing}
        />
        {/* Section 10 Animated Techniques */}
        <Stack.Screen
          name="Section 10 Animated Techniques"
          component={Section10AnimatedTechniques}
        />
        <Stack.Screen
          name="Section 10 Animated Techniques 99 Cliff"
          component={Section10AnimatedTechniques99Cliff}
        />
        <Stack.Screen
          name="Section 10 Animated Techniques Animate Hidden"
          component={Section10AnimatedTechniquesAnimateHidden}
        />
        <Stack.Screen
          name="Section 10 Animated Techniques Interrupted Animation"
          component={Section10AnimatedTechniquesInterruptedAnimation}
        />
        <Stack.Screen
          name="Section 10 Animated Techniques Pointer Events"
          component={Section10AnimatedTechniquesPointerEvents}
        />
        {/* Section 11 Basic Real World */}
        <Stack.Screen
          name="Section 11 Basic Real World"
          component={Section11BasicRealWorld}
        />
        <Stack.Screen
          name="Section 11 Basic Real World 4 Corners"
          component={Section11BasicRealWorld4Corners}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Staggered Heads"
          component={Section11BasicRealWorldStaggeredHeads}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Kitten Cards"
          component={Section11BasicRealWorldKittenCards}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Stagger Form Items Visibility On Mount"
          component={Section11BasicRealWorldStaggerFormItemsVisibilityOnMount}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Animated Progress Bar Button"
          component={Section11BasicRealWorldAnimatedProgressBarButton}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Dynamic Animated Notifications"
          component={Section11BasicRealWorldDynamicAnimatedNotifications}
        />
        <Stack.Screen
          name="Section 11 Basic Real World Animated Questionnaire With Progress Bar"
          component={
            Section11BasicRealWorldAnimatedQuestionnaireWithProgressBar
          }
        />
        {/* Section 12 Advanced Real World */}
        <Stack.Screen
          name="Section 12 Advanced Real World"
          component={Section12AdvancedRealWorld}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Photo Grid Shared Element"
          component={Section12AdvancedRealWorldPhotoGridSharedElement}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Animated Color Picker"
          component={Section12AdvancedRealWorldAnimatedColorPicker}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Floating Action Button With Menu"
          component={Section12AdvancedRealWorldFloatingActionButtonWithMenu}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Application Intro Screen"
          component={Section12AdvancedRealWorldApplicationIntroScreen}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Evolving Write Button"
          component={Section12AdvancedRealWorldEvolvingWriteButton}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Social Comment Modal Animated Swipe Away"
          component={
            Section12AdvancedRealWorldSocialCommentModalAnimatedSwipeAway
          }
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Horizontal Parallax ScrollView"
          component={Section12AdvancedRealWorldHorizontalParallaxScrollView}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Tap Show Love Floating Hearts"
          component={Section12AdvancedRealWorldTapShowLoveFloatingHearts}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Bouncing Heart Shaped Like Button OnPress"
          component={
            Section12AdvancedRealWorldBouncingHeartShapedLikeButtonOnPress
          }
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Exploding Heart Button"
          component={Section12AdvancedRealWorldExplodingHeartButton}
        />
        <Stack.Screen
          name="Section 12 Advanced Real World Expanding Notify Input With Success Message"
          component={
            Section12AdvancedRealWorldExpandingNotifyInputWithSuccessMessage
          }
        />
        {/* Handling Gestures Events */}
        <Stack.Screen
          name="Handling Gestures Events Pan Responder"
          component={HandlingGesturesEventsPanResponder}
        />
        <Stack.Screen
          name="Handling Gestures Events Scroll"
          component={HandlingGesturesEventsScroll}
        />
        {/* React Native Animatable */}
        <Stack.Screen
          name="React Native Animatable Fade In Up"
          component={ReactNativeAnimatableFadeInUp}
        />
        <Stack.Screen
          name="React Native Animatable Slide In Right"
          component={ReactNativeAnimatableSlideInRight}
        />
        <Stack.Screen
          name="React Native Animatable Looping"
          component={ReactNativeAnimatableLooping}
        />
        {/* React Native Touchable Scale Feedback */}
        <Stack.Screen
          name="React Native Touchable Scale Feedback"
          component={ReactNativeTouchableScaleFeedback}
        />
        {/* React Native Animate Loading Button */}
        <Stack.Screen
          name="React Native Animate Loading Button"
          component={ReactNativeAnimateLoadingButton}
        />
        {/* React Native Swipe Gestures */}
        <Stack.Screen
          name="React Native Swipe Gestures"
          component={ReactNativeSwipeGestures}
        />
        {/* React Native Collapsible Toolbar */}
        <Stack.Screen
          name="React Native Collapsible Toolbar"
          component={ReactNativeCollapsibleToolbar}
        />
        {/* React Native Blinking Animation */}
        <Stack.Screen
          name="React Native Blinking Animation"
          component={ReactNativeBlinkingAnimation}
        />
        {/* React Native Gesture Flip Card */}
        <Stack.Screen
          name="React Native Gesture Flip Card"
          component={ReactNativeGestureFlipCard}
        />
        {/* React Native Rotate Image */}
        <Stack.Screen
          name="React Native Rotate Image"
          component={ReactNativeRotateImage}
        />
        {/* React Native Animated Ellipsis */}
        <Stack.Screen
          name="React Native Animated Ellipsis"
          component={ReactNativeAnimatedEllipsis}
        />
        {/* Flip Image View Horizontally */}
        <Stack.Screen
          name="Flip Image View Horizontally"
          component={FlipImageViewHorizontally}
        />
        {/* React Native Basic Animations */}
        <Stack.Screen name="Moving Square" component={MovingSquare} />
        <Stack.Screen name="Color Square" component={ColorSquare} />
        <Stack.Screen name="Rotate Square" component={RotateSquare} />
        <Stack.Screen name="Drag Square" component={DragSquare} />
        {/* React Native Animated Circular Progress */}
        <Stack.Screen
          name="React Native Animated Circular Progress"
          component={ReactNativeAnimatedCircularProgress}
        />
        {/* React Native Animated Swiper */}
        <Stack.Screen
          name="React Native Animated Swiper"
          component={ReactNativeAnimatedSwiper}
        />
        {/* React Native Shared Element */}
        <Stack.Screen
          name="React Native Shared Element"
          component={ReactNativeSharedElementScreen}
        />
        <Stack.Screen
          name="Shared Element Transition React Navigation"
          component={SharedElementTransitionReactNavigation}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Shared Element Transition React Navigation V5"
          component={SharedElementTransitionReactNavigationV5}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="Shared Element Transition React Navigation V5 Details"
          component={SharedElementTransitionReactNavigationV5Details}
        />
        <Stack.Screen
          name="Shared Element Transition React Navigation Details"
          component={SharedElementTransitionReactNavigationDetails}
        />
        <Stack.Screen
          name="Shared Element Transition"
          component={SharedElementTransition}
        />
        <Stack.Screen
          name="Shared Element Transition Fade In Right"
          component={SharedElementTransitionFadeInRight}
        />
        {/* React Native Animations */}
        <Stack.Screen
          name="React Native Animation"
          component={ReactNativeAnimation}
          options={{
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="React Native Animation 1"
          component={ReactNativeAnimation1}
        />
        <Stack.Screen
          name="React Native Animation 1 Details"
          component={ReactNativeAnimation1Details}
        />
        <Stack.Screen
          name="React Native Animation 2"
          component={ReactNativeAnimation2}
        />
        <Stack.Screen
          name="React Native Animation 2 Details"
          component={ReactNativeAnimation2Details}
        />
        <Stack.Screen
          name="React Native Animation 3"
          component={ReactNativeAnimation3}
        />
        <Stack.Screen
          name="React Native Animation 3 Details"
          component={ReactNativeAnimation3Details}
          options={{
            headerTitle: null,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="React Native Animation 4"
          component={ReactNativeAnimation4}
        />
        <Stack.Screen
          name="React Native Animation 5"
          component={ReactNativeAnimation5}
        />
        <Stack.Screen
          name="React Native Animation 6"
          component={ReactNativeAnimation6}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="React Native Animation 7"
          component={ReactNativeAnimation7}
        />
        <Stack.Screen
          name="React Native Animation 8"
          component={ReactNativeAnimation8}
        />
        <Stack.Screen
          name="React Native Animation 9"
          component={ReactNativeAnimation9}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="React Native Animation 10"
          component={ReactNativeAnimation10}
        />
        <Stack.Screen
          name="React Native Animation 11"
          component={ReactNativeAnimation11}
        />
        <Stack.Screen
          name="React Native Animation 12"
          component={ReactNativeAnimation12}
        />
        <Stack.Screen
          name="React Native Animation 13"
          component={ReactNativeAnimation13}
        />
        <Stack.Screen
          name="React Native Animation 14"
          component={ReactNativeAnimation14}
        />
        <Stack.Screen
          name="React Native Animation 15"
          component={ReactNativeAnimation15}
        />
        <Stack.Screen
          name="React Native Animation 16"
          component={ReactNativeAnimation16}
        />
        <Stack.Screen
          name="React Native Animation 17"
          component={ReactNativeAnimation17}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "white",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="React Native Animation 18"
          component={ReactNativeAnimation18}
        />
        <Stack.Screen
          name="React Native Animation 19"
          component={ReactNativeAnimation19}
        />
        <Stack.Screen
          name="React Native Animation 20"
          component={ReactNativeAnimation20}
        />
        <Stack.Screen
          name="React Native Animation 21"
          component={ReactNativeAnimation21}
        />
        <Stack.Screen
          name="React Native Animation 22"
          component={ReactNativeAnimation22}
        />
        <Stack.Screen
          name="React Native Animation 23"
          component={ReactNativeAnimation23}
        />
        <Stack.Screen
          name="React Native Animation 24"
          component={ReactNativeAnimation24}
          options={{
            headerTransparent: false,
          }}
        />
        <Stack.Screen
          name="React Native Animation 25"
          component={ReactNativeAnimation25}
        />
        <Stack.Screen
          name="React Native Animation 26"
          component={ReactNativeAnimation26}
        />
        <Stack.Screen
          name="React Native Animation 27"
          component={ReactNativeAnimation27}
        />
        <Stack.Screen
          name="React Native Animation 28"
          component={ReactNativeAnimation28}
        />
        <Stack.Screen
          name="React Native Animation 29"
          component={ReactNativeAnimation29}
        />
        <Stack.Screen
          name="React Native Animation 30"
          component={ReactNativeAnimation30}
        />
        <Stack.Screen
          name="React Native Animation 31"
          component={ReactNativeAnimation31}
        />
        <Stack.Screen
          name="React Native Animation 32"
          component={ReactNativeAnimation32}
        />
        <Stack.Screen
          name="React Native Animation 33"
          component={ReactNativeAnimation33}
        />
        <Stack.Screen
          name="React Native Animation 34"
          component={ReactNativeAnimation34}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 35"
          component={ReactNativeAnimation35}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "white",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="React Native Animation 36"
          component={ReactNativeAnimation36}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "white",
            },
            headerBackTitleStyle: {
              color: "white",
            },
            headerTintColor: "white",
          }}
        />
        <Stack.Screen
          name="React Native Animation 37"
          component={ReactNativeAnimation37}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 38"
          component={ReactNativeAnimation38}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#9CA3AF",
            },
            headerBackTitleStyle: {
              color: "#9CA3AF",
            },
            headerTintColor: "#9CA3AF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 39"
          component={ReactNativeAnimation39}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#9CA3AF",
            },
            headerBackTitleStyle: {
              color: "#9CA3AF",
            },
            headerTintColor: "#9CA3AF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 40"
          component={ReactNativeAnimation40}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 41"
          component={ReactNativeAnimation41}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 42"
          component={ReactNativeAnimation42}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 43"
          component={ReactNativeAnimation43}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 44"
          component={ReactNativeAnimation44}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 45"
          component={ReactNativeAnimation45}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 46"
          component={ReactNativeAnimation46}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 47"
          component={ReactNativeAnimation47}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 48"
          component={ReactNativeAnimation48}
        />
        <Stack.Screen
          name="React Native Animation 49"
          component={ReactNativeAnimation49}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 50"
          component={ReactNativeAnimation50}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 51"
          component={ReactNativeAnimation51}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 52"
          component={ReactNativeAnimation52}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 53"
          component={ReactNativeAnimation53}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#9CA3AF",
            },
            headerBackTitleStyle: {
              color: "#9CA3AF",
            },
            headerTintColor: "#9CA3AF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 54"
          component={ReactNativeAnimation54}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 55"
          component={ReactNativeAnimation55}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 56"
          component={ReactNativeAnimation56}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 57"
          component={ReactNativeAnimation57}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 58"
          component={ReactNativeAnimation58}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 59"
          component={ReactNativeAnimation59}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 60"
          component={ReactNativeAnimation60}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 61"
          component={ReactNativeAnimation61}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 62"
          component={ReactNativeAnimation62}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#111827",
            },
            headerBackTitleStyle: {
              color: "#111827",
            },
            headerTintColor: "#111827",
          }}
        />
        <Stack.Screen
          name="React Native Animation 63"
          component={ReactNativeAnimation63}
        />
        <Stack.Screen
          name="React Native Animation 64"
          component={ReactNativeAnimation64}
        />
        <Stack.Screen
          name="React Native Animation 65"
          component={ReactNativeAnimation65}
        />
        <Stack.Screen
          name="React Native Animation 66"
          component={ReactNativeAnimation66}
        />
        <Stack.Screen
          name="React Native Animation 67"
          component={ReactNativeAnimation67}
        />
        <Stack.Screen
          name="React Native Animation 68"
          component={ReactNativeAnimation68}
        />
        <Stack.Screen
          name="React Native Animation 69"
          component={ReactNativeAnimation69}
        />
        <Stack.Screen
          name="React Native Animation 70"
          component={ReactNativeAnimation70}
        />
        <Stack.Screen
          name="React Native Animation 71"
          component={ReactNativeAnimation71}
        />
        <Stack.Screen
          name="React Native Animation 72"
          component={ReactNativeAnimation72}
        />
        <Stack.Screen
          name="React Native Animation 73"
          component={ReactNativeAnimation73}
        />
        <Stack.Screen
          name="React Native Animation 74"
          component={ReactNativeAnimation74}
        />
        <Stack.Screen
          name="React Native Animation 75"
          component={ReactNativeAnimation75}
        />
        <Stack.Screen
          name="React Native Animation 76"
          component={ReactNativeAnimation76}
        />
        <Stack.Screen
          name="React Native Animation 77"
          component={ReactNativeAnimation77}
        />
        <Stack.Screen
          name="React Native Animation 78"
          component={ReactNativeAnimation78}
          options={{
            headerShown: true,
            headerTransparent: true,
            headerTitle: null,
            headerBackTitle: null,
            headerTitleStyle: {
              color: "#FFFFFF",
            },
            headerBackTitleStyle: {
              color: "#FFFFFF",
            },
            headerTintColor: "#FFFFFF",
          }}
        />
        <Stack.Screen
          name="React Native Animation 79"
          component={ReactNativeAnimation79}
        />
        <Stack.Screen
          name="React Native Animation 80"
          component={ReactNativeAnimation80}
        />
        <Stack.Screen
          name="React Native Animation 81"
          component={ReactNativeAnimation81}
        />
        <Stack.Screen
          name="React Native Animation 82"
          component={ReactNativeAnimation82}
        />
        <Stack.Screen
          name="React Native Animation 83"
          component={ReactNativeAnimation83}
        />
        <Stack.Screen
          name="React Native Animation 84"
          component={ReactNativeAnimation84}
        />
        <Stack.Screen
          name="React Native Animation 85"
          component={ReactNativeAnimation85}
        />
        <Stack.Screen
          name="React Native Animation 86"
          component={ReactNativeAnimation86}
        />
        <Stack.Screen
          name="React Native Animation 87"
          component={ReactNativeAnimation87}
        />
        <Stack.Screen
          name="React Native Animation 88"
          component={ReactNativeAnimation88}
        />
        <Stack.Screen
          name="React Native Animation 89"
          component={ReactNativeAnimation89}
        />
        <Stack.Screen
          name="React Native Animation 90"
          component={ReactNativeAnimation90}
        />
        <Stack.Screen
          name="React Native Animation 91"
          component={ReactNativeAnimation91}
        />
        <Stack.Screen
          name="React Native Animation 92"
          component={ReactNativeAnimation92}
        />
        <Stack.Screen
          name="React Native Animation 93"
          component={ReactNativeAnimation93}
        />
        <Stack.Screen
          name="React Native Animation 94"
          component={ReactNativeAnimation94}
        />
        <Stack.Screen
          name="React Native Animation 95"
          component={ReactNativeAnimation95}
        />
        <Stack.Screen
          name="React Native Animation 96"
          component={ReactNativeAnimation96}
        />
        <Stack.Screen
          name="React Native Animation 97"
          component={ReactNativeAnimation97}
        />
        <Stack.Screen
          name="React Native Animation 98"
          component={ReactNativeAnimation98}
        />
        <Stack.Screen
          name="React Native Animation 99"
          component={ReactNativeAnimation99}
        />
        <Stack.Screen
          name="React Native Animation 100"
          component={ReactNativeAnimation100}
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
