import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

import Shimmer from "react-native-load-shimmer";

export default function ReactNativeLoadShimmer() {
  const shimmerConfig = {
    startX: -200,
    useNativeDriver: true,
    shimmerColor: "#FFF",
    toValue: Dimensions.get("window").width + 100,
  };

  const containerStyle = {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "white",
    position: "relative",
  };

  const [isShimmering, setIsShimmering] = React.useState(true);
  return (
    <ScrollView style={styles.scrollView}>
      <Shimmer
        shimmerConfig={shimmerConfig}
        containerStyle={containerStyle}
        isShimmering={isShimmering}
      >
        <View
          style={[styles.ghost, { width: 130, height: 24, marginTop: 24 }]}
        />
        <View style={[styles.ghost, { height: 96 }]} />
        <View style={[styles.ghost, { height: 96 }]} />
        <View style={[styles.ghost, { height: 32 }]} />
        <View style={[styles.ghost, { height: 32 }]} />
      </Shimmer>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setIsShimmering(!isShimmering)}
          style={styles.button}
        >
          <Text>Toggle Shimmer</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
  },
  ghost: {
    height: "100%",
    backgroundColor: "#E2E2E2",
    marginBottom: 24,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E2E2",
    width: 150,
    height: 40,
    borderRadius: 20,
  },
});
