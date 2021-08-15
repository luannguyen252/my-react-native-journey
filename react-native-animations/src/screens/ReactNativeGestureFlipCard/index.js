import GestureFlipView from "./GestureFlipView";
import React from "react";
import { StyleSheet, View, Text, StatusBar } from "react-native";

export default function ReactNativeGestureFlipCard() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <GestureFlipView width={300} height={500}>
          {renderBack()}
          {renderFront()}
        </GestureFlipView>
      </View>
    </>
  );
}

const renderFront = () => {
  return (
    <View style={styles.frontStyle}>
      <Text style={{ fontSize: 25, color: "#FFFFFF" }}>{"Front"}</Text>
    </View>
  );
};

const renderBack = () => {
  return (
    <View style={styles.backStyle}>
      <Text style={{ fontSize: 25, color: "#FFFFFF" }}>{"Back"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  frontStyle: {
    width: 300,
    height: 500,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  backStyle: {
    width: 300,
    height: 500,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
