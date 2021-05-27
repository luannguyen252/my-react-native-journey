import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, Overlay } from "react-native-elements";

const OverlayScreen = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View style={{}}>
      <Button title="Open Overlay" onPress={toggleOverlay} />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={{}}>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};

export default OverlayScreen;
