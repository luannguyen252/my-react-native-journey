import faker from "faker";
import { MotiView, AnimatePresence } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
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
  Pressable,
} from "react-native";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

function Shape() {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      style={styles.shape}
    />
  );
}

export default function MotiViewShape() {
  const [visible, toggle] = React.useReducer((s) => !s, true);

  return (
    <Pressable onPress={toggle} style={styles.container}>
      <AnimatePresence>{visible && <Shape />}</AnimatePresence>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#9c1aff",
  },
  scrollViewContainer: {},
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
});
