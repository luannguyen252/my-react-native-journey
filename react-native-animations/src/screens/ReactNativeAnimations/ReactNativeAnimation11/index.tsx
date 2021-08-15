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
import AnimatedSentence from "./AnimatedSentence";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

export default function ReactNativeAnimation11() {
  return (
    <View style={styles.container}>
      <AnimatedSentence content="The quick brown fox jumps over the lazy dog is an English-language pangram-a sentence that contains all of the letters of the English alphabet. Owing to its brevity and coherence, it has become widely known. The phrase is commonly used for touch-typing practice, testing typewriters and computer keyboards, displaying examples of fonts, and other applications involving text where the use of all letters in the alphabet is desired." />
    </View>
  );
}
