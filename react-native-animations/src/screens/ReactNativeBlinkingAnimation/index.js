import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, View } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import styles from "./styles";

export default function ReactNativeBlinkingAnimation() {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={[
            globalStyles.title,
            { textAlign: "center", display: showText ? "none" : "flex" },
          ]}
        >
          The quick brown fox jumps over the lazy dog
        </Text>
      </View>
    </SafeAreaView>
  );
}
