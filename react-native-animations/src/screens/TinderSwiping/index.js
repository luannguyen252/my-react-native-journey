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
import globalStyles from "../../assets/styles/globalStyles";
import colors from "../../assets/styles/colors";
import styles from "./styles";
import TinderSwipingExample1 from "./TinderSwipingExample1/";
import TinderSwipingExample2Basic from "./TinderSwipingExample2/Basic";
import TinderSwipingExample2Advanced from "./TinderSwipingExample2/Advanced";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function TinderSwiping() {
  return (
    <View style={styles.container}>
      {/* <TinderSwipingExample1 /> */}
      {/* <TinderSwipingExample2Basic /> */}
      <TinderSwipingExample2Advanced />
    </View>
  );
}
