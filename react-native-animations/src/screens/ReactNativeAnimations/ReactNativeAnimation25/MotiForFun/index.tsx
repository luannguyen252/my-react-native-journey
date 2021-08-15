import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import AnimatePresence from "./AnimatePresence";
import AnimateHeight from "./AnimateHeight";
import ExitBeforeEnter from "./ExitBeforeEnter";
import Loop from "./Loop";
import AnimatedForm from "./AnimatedForm";

export default function MotiForFun() {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <AnimatedForm />
        <StatusBar style="auto" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
