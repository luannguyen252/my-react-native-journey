import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Transition, Transitioning } from "react-native-reanimated";
import colors from "../../../assets/styles/colors";
import data from "./data";

const DURATION = 500;
const { width, height } = Dimensions.get("screen");

const transition = (
  <Transition.Together>
    <Transition.In type="fadeInUp" durationMs={DURATION} />
    <Transition.Change />
    <Transition.Out type="fadeInUp" durationMs={DURATION} />
  </Transition.Together>
);

export default function ReactNativeAnimation7() {
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();

  // BEGIN: Animated
  const [animation, setAnimation] = React.useState(new Animated.Value(0));

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: width,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => startAnimation());

  const animatedStyles = {
    width: animation,
  };
  // END: Animated

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      <StatusBar style="auto" />
      {data.map(({ bg, color, category, subCategories }, index) => {
        return (
          <TouchableOpacity
            key={category}
            onPress={() => {
              ref.current.animateNextTransition();
              setCurrentIndex(index === currentIndex ? null : index);
            }}
            style={styles.cardContainer}
            activeOpacity={0.9}
          >
            <Animatable.View
              animation="fadeInUp"
              delay={(DURATION + 150) * index}
              easing="ease-in-out"
              style={[
                styles.card,
                // animatedStyles,
                {
                  backgroundColor: bg,
                },
              ]}
            >
              <Animatable.Text
                animation="fadeInUp"
                delay={(DURATION + 450) * index}
                easing="ease"
                style={[styles.heading, { color }]}
              >
                {category}
              </Animatable.Text>
              {index === currentIndex && (
                <View style={styles.subCategoriesList}>
                  {subCategories.map((subCategory) => (
                    <Text key={subCategory} style={[styles.body, { color }]}>
                      {subCategory}
                    </Text>
                  ))}
                </View>
              )}
            </Animatable.View>
          </TouchableOpacity>
        );
      })}
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -2,
    textAlign: "center",
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
  subCategoriesList: {
    marginTop: 24,
  },
});
