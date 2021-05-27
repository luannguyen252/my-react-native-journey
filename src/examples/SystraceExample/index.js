import React from "react";
import { Button, Text, View, StyleSheet, Systrace } from "react-native";

const SystraceExample = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent("event_label");
    Systrace.counterEvent("event_label", 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>
        React Native Systrace API
      </Text>
      <Button
        title="Capture the non-Timed JS events in EasyProfiler"
        onPress={() => enableProfiling()}
      />
      <Button
        title="Stop capturing"
        onPress={() => stopProfiling()}
        color="#FF0000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    margin: 24,
    textAlign: "center",
  },
});

export default SystraceExample;
