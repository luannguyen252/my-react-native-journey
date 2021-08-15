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

// import LiquidSwipe from "./LiquidSwipe/LiquidSwipe";
import BalloonSlider from "./BalloonSlider";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation19() {
  return (
    <View style={styles.container}>
      {/* <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <Text style={globalStyles.title}>React Native Animation 19</Text>
        </SafeAreaView>
      </ScrollView> */}
      <StatusBar style="auto" />
      <BalloonSlider
        image={require("./BalloonSlider/assets/red-balloon.png")}
        sliderProcessColor={colors.red600}
        sliderBackgroundColor={colors.red100}
      />
      <BalloonSlider
        image={require("./BalloonSlider/assets/purple-balloon.png")}
        sliderProcessColor={colors.purple600}
        sliderBackgroundColor={colors.purple100}
      />
      <BalloonSlider
        image={require("./BalloonSlider/assets/navy-balloon.png")}
        sliderProcessColor={colors.blue700}
        sliderBackgroundColor={colors.blue100}
      />
    </View>
  );
}
