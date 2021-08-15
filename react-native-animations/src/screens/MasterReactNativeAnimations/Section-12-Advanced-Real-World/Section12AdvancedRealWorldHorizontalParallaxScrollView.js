import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Animated,
} from "react-native";

import Moment from "./Moment";

const { width, height } = Dimensions.get("window");

const Images = [
  { image: require("./assets/drink1.jpg"), title: "Vokda Cran" },
  { image: require("./assets/drink2.jpg"), title: "Old Fashion" },
  { image: require("./assets/drink3.jpg"), title: "Mule" },
  { image: require("./assets/drink4.jpg"), title: "Strawberry Daiquiri" },
];

const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    i - 1 * width, // -1 * width // - 414
    i * width, // 0 or width // 0 // When at width we do don't translate
    (i + 1) * width, // 1 * width // 828 // when we swipe past we will translate 150 left on prev picutre
  ];

  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp",
  });
};

const getSeparator = (i) => {
  return (
    <View key={i} style={[styles.separator, { left: (i - 1) * width - 2.5 }]} />
  );
};

export default class Section12AdvancedRealWorldHorizontalParallaxScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animatedScroll: new Animated.Value(0),
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { x: this.state.animatedScroll } },
            },
          ])}
        >
          {Images.map((image, i) => {
            return (
              <Moment
                key={i}
                {...image}
                translateX={getInterpolate(
                  this.state.animatedScroll,
                  i,
                  Images.length
                )}
              />
            );
          })}
          {Array.apply(null, { length: Images.length + 1 }).map((_, i) =>
            getSeparator(i)
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
  },
  separator: {
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 5,
  },
});
