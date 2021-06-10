import TouchableScaleFeedback from "react-native-touchable-scale-feedback";
import React from "react";
import { View, Text, StyleSheet, Image, LogBox, Alert } from "react-native";

LogBox.ignoreAllLogs();

const SUPPORT_BACKGROUND = {
  uri: "https://www.apple.com/v/macos/big-sur/c/images/overview/hero/hero_fallback__fi60jv86taem_large_2x.png",
};

export default function ReactNativeTouchableScaleFeedbackExamples() {
  return (
    <>
      <TouchableScaleFeedback
        activeScale={0.9}
        inactiveScale={1}
        onPress={() => {
          console.log("Button Pressed");
          // Alert.alert("Button Pressed");
        }}
      >
        <View style={styles.signupButton}>
          <Text style={styles.signupText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
          // Alert.alert("Button Pressed");
        }}
      >
        <View style={styles.signupButton}>
          <Text style={styles.signupText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <View style={styles.card}>
        <TouchableScaleFeedback
          activeScale={1.2}
          inactiveScale={0.9}
          onPress={() => {
            console.log("Button Pressed");
            // Alert.alert("Button Pressed");
          }}
        >
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              resizeMode={"contain"}
              source={SUPPORT_BACKGROUND}
            />
          </View>
        </TouchableScaleFeedback>
        <View pointerEvents={"none"} style={styles.cardAbsView}>
          <Text style={styles.cardTitle}>Click Me</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  signupButton: {
    height: 52,
    borderRadius: 6,
    overflow: "hidden",
    alignItems: "center",
    marginHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#FF403B",
    marginBottom: 16,
  },
  signupText: {
    color: "white",
    fontSize: 20,
  },
  card: {
    width: "80%",
    aspectRatio: 1.5,
    marginTop: 100,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
    backgroundColor: "#FFF8E7",
  },
  cardAbsView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    position: "absolute",
    justifyContent: "flex-end",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageWrapper: {
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: null,
    height: null,
  },
});
