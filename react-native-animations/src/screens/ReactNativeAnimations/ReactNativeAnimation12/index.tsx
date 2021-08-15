import faker from "faker";
import { MotiView } from "moti";
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
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
import styles from "./styles";
import AnimatedFlatlistPicker from "./AnimatedFlatlistPicker";
import ReactNativeBetterTouchable from "./ReactNativeBetterTouchable";
import ReactNativeAnimatedEye from "./ReactNativeAnimatedEye";
import ReactNativeAnimatedBar from "./ReactNativeAnimatedBar";
import ReactNativePhilzCoffee from "./ReactNativePhilzCoffee";
import AnimatedDonutChart from "./AnimatedDonutChart";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation12() {
  return (
    <View style={styles.container}>
      <AnimatedDonutChart />
    </View>
  );
}
