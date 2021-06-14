import { SharedElement } from "react-native-shared-element";
import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const SPACING = 16;

export default function SharedElementExampleDetails({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SharedElement id={`${item.color}`}>
        <View style={[styles.color, { backgroundColor: item.color }]} />
      </SharedElement>
      <View style={styles.meta}>
        <SharedElement id={`${item.name}`}>
          <Text style={styles.name}>{item.name}</Text>
        </SharedElement>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    padding: SPACING,
  },
  color: {
    width: "100%",
    height: windowHeight / 3,
  },
});
