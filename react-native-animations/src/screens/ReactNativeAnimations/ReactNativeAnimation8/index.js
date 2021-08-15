import * as Animatable from "react-native-animatable";
import React, { PureComponent } from "react";
import {
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import colors from "../../../assets/styles/colors";

const { width, height } = Dimensions.get("screen");
const DURATION = 500;
const PRODUCT_LIST = [
  {
    image: require("./assets/apple.png"),
    title: "Apple",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    price: "1.5",
    color: colors.red700,
    bg: colors.red100,
  },
  {
    image: require("./assets/green-lemon.png"),
    title: "Green Lemon",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    price: "0.25",
    color: colors.green700,
    bg: colors.green100,
  },
  {
    image: require("./assets/banana.png"),
    title: "Banana",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    price: "0.75",
    color: colors.yellow700,
    bg: colors.yellow100,
  },
  {
    image: require("./assets/blueberry.png"),
    title: "Blueberry",
    description:
      "The quick brown fox jumps over the lazy dog is an English-language pangram—a sentence that contains all of the letters of the English alphabet.",
    price: "1.25",
    color: colors.purple700,
    bg: colors.purple100,
  },
];

export default class ReactNativeAnimation8 extends PureComponent {
  _scrollX = new Animated.Value(0);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Animated.ScrollView
          pagingEnabled
          scrollEventThrottle={16}
          horizontal
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this._scrollX } } }],
            { useNativeDriver: true }
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {PRODUCT_LIST.map((item, i) => this._renderItem(item, i))}
        </Animated.ScrollView>
      </View>
    );
  }

  _renderItem = (item, i) => {
    const inputRange = [
      (i - 2) * width,
      (i - 1) * width,
      i * width,
      (i + 1) * width,
    ];

    const imageScale = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.4, 1, 0.4],
    });

    const imageOpacity = this._scrollX.interpolate({
      inputRange,
      outputRange: [1, 0.2, 1, 0.2],
    });

    return (
      <View
        key={item.id}
        style={[styles.container, styles.item, { backgroundColor: item.bg }]}
      >
        <Animatable.View
          animation="fadeInUp"
          easing="ease"
          delay={DURATION + 50}
        >
          <Animated.Image
            source={item.image}
            style={[
              styles.image,
              {
                transform: [
                  {
                    scale: imageScale,
                  },
                ],
                opacity: imageOpacity,
              },
            ]}
          />
        </Animatable.View>
        <Animated.View
          style={[
            styles.metaContainer,
            {
              opacity: imageOpacity,
            },
          ]}
        >
          <Animatable.View
            animation="fadeInUp"
            easing="ease"
            delay={DURATION + 250}
          >
            <Text style={[styles.title, { color: item.color }]}>
              {item.title}
            </Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            easing="ease"
            delay={DURATION + 350}
          >
            <Text style={[styles.description, { color: item.color }]}>
              {item.description}
            </Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            easing="ease"
            delay={DURATION + 450}
          >
            <Text style={[styles.price, { color: item.color }]}>
              {item.price}$
            </Text>
          </Animatable.View>
        </Animated.View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    width,
    height,
    paddingLeft: 16,
    paddingRight: 16,
  },
  metaContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    opacity: 0.6,
    paddingTop: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 16,
  },
});
