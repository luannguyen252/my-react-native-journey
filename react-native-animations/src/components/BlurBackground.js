import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Dimensions, View, Image } from "react-native";
import bg from "../assets/images/apple-music-gradation-blur.jpg";

const { width, height } = Dimensions.get("screen");

export default function BlurBackground({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.blurredImage} source={bg} />
        {/* Adjust the tint and intensity */}
        <BlurView
          intensity={100}
          style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
        >
          {children}
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  blurredImage: {
    width: width,
    height: height,
    resizeMode: "cover",
  },
  nonBlurredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
