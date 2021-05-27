import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";

const UseWindowDimensionsExample = () => {
  const window = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text>{`Window Dimensions: height - ${window.height}, width - ${window.width}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UseWindowDimensionsExample;
