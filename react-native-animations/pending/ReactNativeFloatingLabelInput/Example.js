import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FloatingLabelInput } from "./index";

export default function ReactNativeFloatingLabelInput() {
  const [cont, setCont] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(!show);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [show]);

  return (
    <View style={{ padding: 50, flex: 1, backgroundColor: "#fff" }}>
      <FloatingLabelInput
        label={"label"}
        isPassword
        togglePassword={show}
        value={cont}
        onChangeText={(value) => setCont(value)}
        customShowPasswordComponent={<Text>Show</Text>}
        customHidePasswordComponent={<Text>Hide</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
