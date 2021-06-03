import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CarouselCard from "./CarouselCard";

export default function SampleCarouselExample() {
  return (
    <SafeAreaView style={styles.container}>
      <CarouselCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
});
