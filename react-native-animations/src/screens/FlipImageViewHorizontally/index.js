import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import styles from "./styles";

export default function FlipImageViewHorizontally() {
  let animatedValue = new Animated.Value(0);
  let currentValue = 0;

  animatedValue.addListener(({ value }) => {
    currentValue = value;
  });

  const flipAnimation = () => {
    if (currentValue >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: false,
      }).start();
    }
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate }],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Animated.Image
          source={{
            uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/desktop-computer-screen-with-arrow-to-the-left-and-coin-stack.png",
          }}
          style={[rotateYAnimatedStyle, styles.imageStyle]}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={flipAnimation}>
          <Text style={styles.buttonTextStyle}>
            Click Here To Flip The Image
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
