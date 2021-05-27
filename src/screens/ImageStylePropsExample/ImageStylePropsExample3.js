import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export function ImageStylePropsExample3() {
  return (
    <View style={styles.container}>
      <Image
        style={{
          borderColor: "red",
          borderWidth: 5,
          height: 100,
          width: 200,
        }}
        source={require("@expo/snack-static/react-native-logo.png")}
      />
      <Text>
        <Text>borderColor & borderWidth</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "vertical",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    textAlign: "center",
  },
});
