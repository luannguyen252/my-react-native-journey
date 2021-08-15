import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./src/";
import colors from "../../../../assets/styles/colors";
const DUMB_TEXT =
  "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known. The phrase is commonly used for touch-typing practice, testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text where the use of all letters in the alphabet is desired.";
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    paddingBottom: 16,
    color: colors.coolGray600,
  },
});

export default function ReactNativeScrollViewHeader1() {
  return (
    <Header
      title="React Native Animation"
      barStyle={{ backgroundColor: colors.white }}
      headerStyle={{ backgroundColor: colors.coolGray900 }}
    >
      <View style={{ paddingLeft: 16, paddingRight: 16 }}>
        <Text style={styles.text}>{DUMB_TEXT}</Text>
        <Text style={styles.text}>{DUMB_TEXT}</Text>
        <Text style={styles.text}>{DUMB_TEXT}</Text>
        <Text style={styles.text}>{DUMB_TEXT}</Text>
      </View>
    </Header>
  );
}
