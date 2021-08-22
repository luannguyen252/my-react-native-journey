import TouchableScaleFeedback from "./TouchableScaleFeedback";
import React from "react";
import { View, Text, Image, LogBox } from "react-native";
import styles from "./styles";
import colors from "../../assets/styles/colors";

LogBox.ignoreAllLogs();

const SUPPORT_BACKGROUND = {
  uri: "https://www.apple.com/v/macos/big-sur/c/images/overview/hero/hero_fallback__fi60jv86taem_large_2x.png",
};

export default function TouchableScaleFeedback() {
  return (
    <View style={styles.container}>
      <View style={[styles.card, { marginBottom: 16 }]}>
        <TouchableScaleFeedback
          activeScale={1.2}
          inactiveScale={0.9}
          onPress={() => {
            console.log("Button Pressed");
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
          <Text style={styles.cardTitle}>MacBook Pro</Text>
        </View>
      </View>

      <TouchableScaleFeedback
        activeScale={0.9}
        inactiveScale={1}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View style={[styles.button, { marginBottom: 16 }]}>
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.orange600 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.purple600 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.green600 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.cyan600 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.pink600 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>

      <TouchableScaleFeedback
        inactiveScale={1}
        activeScale={0.9}
        onPress={() => {
          console.log("Button Pressed");
        }}
      >
        <View
          style={[
            styles.button,
            { marginBottom: 16, backgroundColor: colors.yellow500 },
          ]}
        >
          <Text style={styles.buttonText}>Click Me</Text>
        </View>
      </TouchableScaleFeedback>
    </View>
  );
}
