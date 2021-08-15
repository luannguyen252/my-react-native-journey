// https://aboutreact.com/react-native-flip-image-horizontally-using-animation/
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
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function FlipCard1() {
  let animateValue = new Animated.Value(0);
  let currentValue = 0;

  animateValue.addListener(({ value }) => {
    currentValue = value;
  });

  const flipAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animateValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animateValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  const setInterpolate = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const rotateYAnimatedStyle = {
    transform: [
      {
        rotateY: setInterpolate,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={[styles.cardContainer, styles.frontCardContainer]}>
        <Text style={styles.cardTitle}>Front Card Title</Text>
        <Text style={styles.cardDescription}>Front Card Description</Text>
      </View>
      <View style={[styles.cardContainer, styles.backCardContainer]}>
        <Text style={styles.cardTitle}>Back Card Title</Text>
        <Text style={styles.cardDescription}>Back Card Description</Text>
      </View> */}
      <Animated.View style={[styles.cardContainer, rotateYAnimatedStyle]}>
        <Text style={styles.cardTitle}>Card Title</Text>
        <Text style={styles.cardDescription}>Card Description</Text>
      </Animated.View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={flipAnimation}
        style={styles.buttonContainer}
      >
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: colors.rose100,
  },
  cardContainer: {
    backgroundColor: colors.rose600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: width - 32,
    height: width / 2,
    backfaceVisibility: "hidden",
  },
  frontCardContainer: {},
  backCardContainer: {},
  cardTitle: {
    color: colors.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardDescription: {
    color: colors.white,
    opacity: 0.8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonContainer: {
    backgroundColor: colors.purple600,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: width - 128,
  },
  buttonText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: colors.white,
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 16,
  },
});
