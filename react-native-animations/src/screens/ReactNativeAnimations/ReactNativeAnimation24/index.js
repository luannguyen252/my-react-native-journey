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
import FlipCard4 from "./FlipCard4";
import ReactNativeTinderFurniture from "./ReactNativeTinderFurniture";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation24() {
  return (
    // <View style={styles.container}>
    //   <ScrollView
    //     style={styles.scrollViewContainer}
    //     showsVerticalScrollIndicator={false}
    //   >
    //     <SafeAreaView>
    //       <Text style={globalStyles.title}>React Native Animation 24</Text>
    //     </SafeAreaView>
    //   </ScrollView>
    // </View>
    <ReactNativeTinderFurniture />
  );
}
