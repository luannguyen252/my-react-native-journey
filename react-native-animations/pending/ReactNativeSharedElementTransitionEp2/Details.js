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
  Button,
} from "react-native";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeSharedElementTransitionEp2Details({
  navigation,
}) {
  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        <Text style={{}}>React Native Shared Element Transition Episode 2</Text>
      </View>
    </View>
  );
}
