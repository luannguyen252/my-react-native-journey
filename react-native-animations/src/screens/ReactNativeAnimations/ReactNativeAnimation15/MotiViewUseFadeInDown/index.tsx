import faker from "faker";
import { MotiView, useAnimationState } from "moti";
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
  Pressable,
} from "react-native";
import globalStyles from "../../../../assets/styles/globalStyles";
import colors from "../../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;

const useFadeInDown = () => {
  return useAnimationState({
    from: {
      opacity: 0,
      translateY: -15,
    },
    to: {
      opacity: 1,
      translateY: 0,
    },
  });
};

function Shape() {
  const fadeInDown = useFadeInDown();

  const scaleIn = useAnimationState({
    from: {
      scale: 0.5,
    },
    open: {
      scale: 1,
    },
    big: {
      scale: 1.5,
    },
  });

  const onPress = () => {
    fadeInDown.transitionTo((state) => {
      if (state === "from") {
        return "to";
      } else {
        return "from";
      }
    });

    if (scaleIn.current === "from") {
      scaleIn.transitionTo("open");
    } else if (scaleIn.current === "open") {
      scaleIn.transitionTo("big");
    } else {
      scaleIn.transitionTo("from");
    }
  };

  return (
    <Pressable onPress={onPress}>
      <MotiView delay={300} state={fadeInDown} style={styles.shape} />
      <MotiView
        transition={{
          type: "spring",
        }}
        delay={300}
        state={scaleIn}
        style={[styles.shape, styles.shape2]}
      />
    </Pressable>
  );
}

export default function MotiViewUseFadeInDown() {
  return (
    <MotiView style={styles.container}>
      <Shape />
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "cyan",
  },
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "black",
  },
  shape2: {
    backgroundColor: "hotpink",
    marginTop: 16,
  },
});
