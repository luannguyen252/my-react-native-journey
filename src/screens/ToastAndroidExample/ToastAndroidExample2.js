import React, { useState, useEffect } from "react";
import { View, StyleSheet, ToastAndroid, Button } from "react-native";
import Constants from "expo-constants";

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};

export default function ToastAndroidExample2() {
  const [visibleToast, setvisibleToast] = useState(false);

  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = () => {
    setvisibleToast(true);
  };

  return (
    <View style={styles.container}>
      <Toast visible={visibleToast} message="Example" />
      <Button title="Toggle Toast" onPress={() => handleButtonPress()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#888888",
    padding: 8,
  },
});

export default App;
