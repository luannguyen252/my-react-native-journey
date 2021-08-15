import AnimatedSwiper from "./AnimatedSwiper";
import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

export default function ReactNativeAnimatedSwiper() {
  return (
    <View style={styles.container}>
      <AnimatedSwiper
        currentPageRotate={["90deg", "0deg", "-90deg"]}
        nextPageRotate={["-70deg", "0deg", "70deg"]}
        dragOffsetForTransparency={300}
        swipebleWidth={300}
        swipebleHeight={450}
        nextPageAnimationDuration={300}
        containerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "pink",
        }}
      >
        {[
          <View key={1} style={[styles.card, { backgroundColor: "blue" }]}>
            <Text style={styles.text}>Hello</Text>
          </View>,
          <View key={2} style={[styles.card, { backgroundColor: "red" }]}>
            <Text style={styles.text}>React Native</Text>
          </View>,
          <View key={3} style={[styles.card, { backgroundColor: "purple" }]}>
            <Text style={styles.text}>Awesome</Text>
          </View>,
        ]}
      </AnimatedSwiper>
    </View>
  );
}
