import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";
import TextInputAnimatedPlaceholder from "./TextInputAnimatedPlaceholder";

export default function SecondScreen() {
  return (
    <View
      style={[globalStyles.container, { backgroundColor: colors.coolGray50 }]}
    >
      <SafeAreaView>
        <StatusBar style="auto" />
        <Text style={globalStyles.title}>Ưu đãi</Text>

        <TextInputAnimatedPlaceholder />

        <ScrollView
          showsVerticalScrollIndicator={true}
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ paddingBottom: 176 }}
        >
          <Text style={[globalStyles.bodyText, styles.container]}>
            {dumbText}
          </Text>
          <Text style={[globalStyles.bodyText, styles.container]}>
            {dumbText}
          </Text>
          <Text style={[globalStyles.bodyText, styles.container]}>
            {dumbText}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const dumbText =
  "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known. The phrase is commonly used for touch-typing practice, testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text where the use of all letters in the alphabet is desired.";
