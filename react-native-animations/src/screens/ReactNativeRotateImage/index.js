import React from "react";
import {
  SafeAreaView,
  View,
  Animated,
  Easing,
  TouchableHighlight,
  Text,
} from "react-native";
import styles from "./styles";

export default function ReactNativeRotateImage() {
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          transform: [{ rotate: RotateData }],
        }}
        source={{
          uri: "https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png",
        }}
      />
      <TouchableHighlight
        onPress={startImageRotateFunction}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>Start Image Rotate Function</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}
