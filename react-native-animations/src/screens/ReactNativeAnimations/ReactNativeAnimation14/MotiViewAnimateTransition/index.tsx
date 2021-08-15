import faker from "faker";
import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import React, { useReducer } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Animated,
} from "react-native";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

function Shape() {
  return (
    <MotiView
      from={{
        translateY: -100,
      }}
      animate={{
        translateY: 0,
      }}
      transition={{
        loop: true,
        type: "timing",
        duration: 1500,
        delay: 100,
      }}
      style={styles.shape}
    />
  );
}

export default function MotiViewAnimateTransition() {
  return (
    <MotiView style={styles.container}>
      <Shape />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.violet600,
  },
  scrollViewContainer: {},
  shape: {
    justifyContent: "center",
    height: 200,
    width: 200,
    borderRadius: 16,
    marginRight: 16,
    backgroundColor: colors.white,
  },
});
