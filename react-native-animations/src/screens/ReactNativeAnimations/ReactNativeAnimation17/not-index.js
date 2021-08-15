import { BlurView } from "expo-blur";
import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
// import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const bgs = ["#6D28D9", "#DB2777", "#DC2626", "#F59E0B"];
const DATA = [
  {
    key: "1",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known.",
    image: "https://image.flaticon.com/icons/png/256/3571/3571572.png",
  },
  {
    key: "2",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known.",
    image: "https://image.flaticon.com/icons/png/256/3571/3571747.png",
  },
  {
    key: "3",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known.",
    image: "https://image.flaticon.com/icons/png/256/3571/3571680.png",
  },
  {
    key: "4",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known.",
    image: "https://image.flaticon.com/icons/png/256/3571/3571603.png",
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 80, flexDirection: "row" }}>
      {DATA.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        // Scale Animated Styles
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });

        // Opacity Animated Styles
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${index}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: colors.white,
              margin: 10,
              opacity,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  // Background Color Animated Styles
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, index) => index * width),
    outputRange: bgs.map((bg) => bg),
  });

  return (
    <Animated.View
      style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
    />
  );
};

const Square = ({ scrollX }) => {
  // Modulo and Divide Animated Styles
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  // Rotate Animated Styles
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  // Translate X Animated Styles
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 56,
        position: "absolute",
        top: -height * 0.64,
        left: -height * 0.32,
        transform: [
          {
            // Apply Rotate Animated Styles
            rotate,
          },
          {
            // Apply Translate X Animated Styles
            translateX,
          },
        ],
      }}
    />
  );
};

export default function ReactNativeAnimation17() {
  // Setup useRef Animated Scroll X is Horizontal
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        // Setup Horizontal Scroll in FlatList
        horizontal
        /**
         * This controls how often the scroll event will be fired while scrolling (as a time interval in ms).
         * A lower number yields better accuracy for code that is tracking the scroll position,
         * but can lead to scroll performance problems due to the volume of information being sent over the bridge.
         * You will not notice a difference between values set between 1-16 as the JS run loop is synced to the screen refresh rate.
         * If you do not need precise scroll position tracking,
         * set this value higher to limit the information being sent across the bridge.
         * The default value is 0, which results in the scroll event being sent only once each time the view is scrolled.
         */
        scrollEventThrottle={32}
        // onScroll Event
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        // Disable Scroll Horizontal Indicator
        showsHorizontalScrollIndicator={false}
        // Setup Pagination
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <View
              key={index}
              style={{
                width,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontSize: 24,
                    lineHeight: 32,
                    fontWeight: "900",
                    color: colors.white,
                    marginBottom: 16,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    lineHeight: 24,
                    fontWeight: "400",
                    opacity: 0.8,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      {/* Setup Carousel Indicator */}
      <Indicator scrollX={scrollX} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
