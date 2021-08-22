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

import { ReactNativeRingPicker } from "./ReactNativeRingPicker";

export default function ReactNativeAnimation78() {
  return (
    // <View style={styles.container}>
    //   <ScrollView
    //     style={styles.scrollViewContainer}
    //     showsVerticalScrollIndicator={false}
    //   >
    //     <SafeAreaView>
    //       <Text style={globalStyles.title}>React Native Animation 78</Text>
    //     </SafeAreaView>
    //   </ScrollView>
    // </View>
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.coolGray900,
      }}
    >
      <StatusBar barStyle="light-content" />
      <ReactNativeRingPicker
        girthAngle={120}
        iconHideOnTheBackDuration={300}
        styleIconText={{ fontWeight: "bold" }}
      />
    </View>
  );
}
