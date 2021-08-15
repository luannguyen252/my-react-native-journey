import { MotiView } from "moti";
import * as Animatable from "react-native-animatable";
import * as React from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
  SafeAreaViewBase,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
  StyleSheet,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import colors from "../../../assets/styles/colors";
import styles from "./styles";
import Progress from "./Progress";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation5() {
  return (
    <View style={styles.container}>
      <Progress />
    </View>
  );
}
