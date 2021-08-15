// React Native Collapsible Toolbar with Animation
// https://aboutreact.com/react-native-collapsible-toolbar/
import React from "react";
import { SafeAreaView, ScrollView, View, Animated, Text } from "react-native";
import styles from "./styles";

export default function ReactNativeCollapsibleToolbar() {
  const dummyData = [
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
    "The quick brown fox jumps over the lazy dog",
  ];

  let AnimatedHeaderValue = new Animated.Value(0);
  const Header_Maximum_Height = 150; // Max Height of the Header
  const Header_Minimum_Height = 50; // Min Height of the Header

  const animateHeaderBackgroundColor = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: ["#2563EB", "#9333EA"],
    extrapolate: "clamp",
  });

  const animateHeaderHeight = AnimatedHeaderValue.interpolate({
    inputRange: [0, Header_Maximum_Height - Header_Minimum_Height],
    outputRange: [Header_Maximum_Height, Header_Minimum_Height],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.header,
            {
              height: animateHeaderHeight,
              backgroundColor: animateHeaderBackgroundColor,
            },
          ]}
        >
          <Text style={styles.headerText}>
            React Native Collapsible Toolbar with Animation
          </Text>
        </Animated.View>
        <ScrollView
          scrollEventThrottle={16}
          //contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: AnimatedHeaderValue } } }],
            { useNativeDriver: false }
          )}
        >
          {/* Put all your Component here inside the ScrollView */}
          {dummyData.map((item, index) => (
            <Text style={styles.textStyle} key={index}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
