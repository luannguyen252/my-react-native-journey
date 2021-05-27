import React, { useEffect } from "react";
import {
  Alert,
  Animated,
  InteractionManager,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\\n" +
    "Shake or press menu button for dev menu",
});

const useMount = (func) => useEffect(() => func(), []);

// You can create a custom interaction/animation and add
// support for InteractionManager
const useCustomInteraction = (timeLocked = 2000) => {
  useMount(() => {
    const handle = InteractionManager.createInteractionHandle();

    setTimeout(
      () => InteractionManager.clearInteractionHandle(handle),
      timeLocked
    );

    return () => InteractionManager.clearInteractionHandle(handle);
  });
};

const Ball = ({ onInteractionIsDone }) => {
  useCustomInteraction();

  // Running a method after the interaction
  useMount(() => {
    InteractionManager.runAfterInteractions(() => onInteractionIsDone());
  });

  return <Animated.View style={[styles.ball]} />;
};

const InteractionManagerExample2 = () => {
  return (
    <View style={styles.container}>
      <Text>{instructions}</Text>
      <Ball onInteractionIsDone={() => Alert.alert("Interaction is done")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  ball: {
    width: 100,
    height: 100,
    backgroundColor: "salmon",
    borderRadius: 100,
  },
});

export default InteractionManagerExample2;
