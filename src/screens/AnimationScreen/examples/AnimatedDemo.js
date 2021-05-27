import React, { useRef } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

const AnimatedDemo = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.fadingText}>Fading View</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {
    padding: 16,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 24,
  },
  buttonRow: {
    flexDirection: "row",
  },
});

export default AnimatedDemo;
