import { Modalize } from "react-native-modalize"; // npm install react-native-modalize react-native-gesture-handler
import React, { useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";

// BEGIN: Basic
const Basic = () => {
  const modalizeRef = useRef < Modalize > null;

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <Text>Open the modal</Text>
      </TouchableOpacity>

      <Modalize ref={modalizeRef}>...your content</Modalize>
    </>
  );
};
// END: Basic

export default function ReactNativeModalize() {
  return (
    <View>
      <Basic />
    </View>
  );
}
