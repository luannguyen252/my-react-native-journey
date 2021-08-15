import { StatusBar } from "expo-status-bar";
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
  // StatusBar,
  Animated,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
import styles from "./styles";

import ReactNativeAnimateSideMenu from "./ReactNativeAnimateSideMenu";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation20() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ReactNativeAnimateSideMenu />
    </View>
  );
}
