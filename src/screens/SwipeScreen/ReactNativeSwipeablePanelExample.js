import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SwipeablePanel } from "rn-swipeable-panel";

export default ReactNativeSwipeablePanelExample = () => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <View style={styles.container}>
      <Text>React Native Swipeable Panel Example</Text>
      <Text>To get started, edit App.js</Text>
      <Button title="Click Me" onPress={() => openPanel()} />
      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <Text>Your Content Here</Text>
      </SwipeablePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
});
