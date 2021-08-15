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
  Pressable,
} from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "./styles";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

const Shape = () => {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        type: "timing",
      }}
      style={styles.shape}
    />
  );
};

export default function ReactNativeAnimation4() {
  const [visible, toggle] = React.useReducer((s) => !s, true);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <Pressable onPress={toggle} style={styles.container}>
            {visible && <Shape />}
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
