import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  Easing,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";

export default function EasingScreen() {
  // BEGIN: Declare Animate Value
  let opacity = new Animated.Value(0);
  // END: Declare Animate Value

  // BEGIN: Declare Animate Function
  const animate = (easing) => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing,
    }).start();
  };
  // END: Declare Animate Function

  // BEGIN: Declare Animate Interpolate
  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });
  // END: Declare Animate Interpolate

  // BEGIN: Animate Styles
  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size,
    },
  ];
  // END: Animate Styles

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title}>Press rows below to preview the Easing!</Text>

      {/* BEGIN: Animate Styles */}
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
      </View>
      {/* END: Animate Styles */}

      {/* BEGIN: Animate List */}
      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => animate(item.easing)}
            style={styles.listRow}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
      />
      {/* END: Animate List */}
    </View>
  );
}

const SECTIONS = [
  {
    title: "Predefined animations",
    data: [
      { title: "Bounce", easing: Easing.bounce },
      { title: "Ease", easing: Easing.ease },
      { title: "Elastic", easing: Easing.elastic(4) },
    ],
  },
  {
    title: "Standard functions",
    data: [
      { title: "Linear", easing: Easing.linear },
      { title: "Quad", easing: Easing.quad },
      { title: "Cubic", easing: Easing.cubic },
    ],
  },
  {
    title: "Additional functions",
    data: [
      {
        title: "Bezier",
        easing: Easing.bezier(0, 2, 1, -1),
      },
      { title: "Circle", easing: Easing.circle },
      { title: "Sin", easing: Easing.sin },
      { title: "Exp", easing: Easing.exp },
    ],
  },
  {
    title: "Combinations",
    data: [
      {
        title: "In + Bounce",
        easing: Easing.in(Easing.bounce),
      },
      {
        title: "Out + Exp",
        easing: Easing.out(Easing.exp),
      },
      {
        title: "InOut + Elastic",
        easing: Easing.inOut(Easing.elastic(1)),
      },
    ],
  },
];
