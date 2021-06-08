import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";

const randomRGB = () => Math.floor(Math.random() * 256);

const getRandomColor = () =>
  "rgb(" + randomRGB() + "," + randomRGB() + "," + randomRGB() + ")";

const ReactNativeTouchOutside = () => {
  const [currentColor, setCurrentColor] = useState(getRandomColor());

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => setCurrentColor(getRandomColor())}
      >
        <View style={[styles.view, { backgroundColor: currentColor }]} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
  },
  view: {
    width: 100,
    height: 100,
  },
});

export default ReactNativeTouchOutside;
