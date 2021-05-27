import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import globalStyles from "../../assets/styles/globalStyles";

const uri =
  "https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png";

const url = require("./assets/background.jpg");

export default function BlurScreen() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Image style={styles.blurredImage} source={{ uri }} />
        <Image style={styles.blurredBackground} source={url} />
        <BlurView
          intensity={100} // 1 - 100
          tint="default" // light, default or dark
          style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
        >
          <Text style={globalStyles.bodyText}>
            Hello! I am bluring contents underneath
          </Text>
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
    width: 192,
    height: 192,
  },
  blurredBackground: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  nonBlurredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
