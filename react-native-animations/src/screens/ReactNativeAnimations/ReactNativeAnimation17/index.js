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
const ANIMATION_DELAY = 500;
const bgs = ["#6D28D9", "#DB2777", "#DC2626", "#F59E0B"];
const DATA = [
  {
    key: "1",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    image: require("../../../assets/3d-models/3d-model-4.png"),
  },
  {
    key: "2",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    image: require("../../../assets/3d-models/3d-model-5.png"),
  },
  {
    key: "3",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    image: require("../../../assets/3d-models/3d-model-2.png"),
  },
  {
    key: "4",
    title: "The quick brown fox jumps over the lazy dog",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    image: require("../../../assets/3d-models/3d-model-3.png"),
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 48, flexDirection: "row" }}>
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
          <Animatable.View
            animation="bounceIn"
            delay={(ANIMATION_DELAY / 1.75) * index + 1500}
          >
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
          </Animatable.View>
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
    <Animatable.View
      animation="fadeInDown"
      delay={ANIMATION_DELAY + 500}
      style={{
        position: "absolute",
        top: -height * 0.64,
        left: -height * 0.32,
      }}
    >
      <Animated.View
        style={{
          width: height,
          height: height,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 56,
          // position: "absolute",
          // top: -height * 0.64,
          // left: -height * 0.32,
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
    </Animatable.View>
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
        contentContainerStyle={{ paddingBottom: 104 }}
        // Disable Scroll Horizontal Indicator
        showsHorizontalScrollIndicator={false}
        // Setup Pagination
        pagingEnabled
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Animatable.View
                animation="zoomIn"
                delay={ANIMATION_DELAY + 2000}
                easing="ease"
                style={styles.imageContainer}
              >
                <Image source={item.image} style={styles.image} />
              </Animatable.View>
              <Animatable.View
                animation="fadeInUp"
                delay={ANIMATION_DELAY}
                easing="ease"
                style={{ flex: 0.3 }}
              >
                <Animatable.View
                  animation="fadeInUp"
                  easing="ease"
                  delay={ANIMATION_DELAY + 450}
                >
                  <Text style={styles.title}>{item.title}</Text>
                </Animatable.View>
                <Animatable.View
                  animation="fadeInUp"
                  easing="ease"
                  delay={ANIMATION_DELAY + 750}
                >
                  <Text style={styles.description}>{item.description}</Text>
                </Animatable.View>
              </Animatable.View>
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
  itemContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  image: {
    width: width / 1.1,
    height: width / 1.1,
    resizeMode: "contain",
  },
  title: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "900",
    color: colors.white,
    marginBottom: 16,
  },
  description: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    opacity: 0.8,
  },
});
