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

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

import AnimatedBarChart from "./AnimatedBarChart";

export default function ReactNativeAnimation54() {
  return (
    // <View style={styles.container}>
    //   <ScrollView
    //     style={styles.scrollViewContainer}
    //     showsVerticalScrollIndicator={false}
    //   >
    //     <SafeAreaView>
    //       <Text style={globalStyles.title}>React Native Animation 54</Text>
    //     </SafeAreaView>
    //   </ScrollView>
    // </View>
    <AnimatedBarChart />
  );
}