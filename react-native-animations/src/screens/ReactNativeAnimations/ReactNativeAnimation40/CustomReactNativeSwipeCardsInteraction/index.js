import * as Animatable from "react-native-animatable";
import {
  LayoutAnimation,
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
import React, { Component } from "react";
import Constants from "expo-constants";
import colors from "../../../../assets/styles/colors";

var { height, width } = Dimensions.get("screen");

const itemWidth = width * 0.67;
const itemHeight = height / 2 - Constants.statusBarHeight * 1;
const fontSize = 300;
const ANIMATION_DELAY = 500;
const COLORS = ["#7C3AED", "#9333EA", "#C026D3", "#0891B2", "#DB2777"];
const ITEMS = [
  require("../../../../assets/backgrounds/1.jpg"),
  require("../../../../assets/backgrounds/2.jpg"),
  require("../../../../assets/backgrounds/3.jpg"),
  require("../../../../assets/backgrounds/4.jpg"),
  require("../../../../assets/backgrounds/5.jpg"),
  "",
];

export default class CustomReactNativeSwipeCardsInteraction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollX: new Animated.Value(0),
      indicator: new Animated.Value(1),
    };
  }

  componentDidMount() {
    LayoutAnimation.spring();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 20 + height / 2 }}>{this.renderScroll()}</View>
      </View>
    );
  }

  renderScroll() {
    return (
      <Animated.ScrollView
        horizontal={true}
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
        }}
        decelerationRate={0}
        snapToInterval={itemWidth}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                x: this.state.scrollX,
              },
            },
          },
        ])}
      >
        {ITEMS.map((image, i) => {
          return this.renderRow(image, i);
        })}
      </Animated.ScrollView>
    );
  }

  renderRow(image, i) {
    let inputRange = [
      (i - 1) * itemWidth,
      i * itemWidth,
      (i + 1) * itemWidth,
      (i + 2) * itemWidth,
    ];
    let secondRange = [(i - 1) * itemWidth, i * itemWidth, (i + 1) * itemWidth];

    // Ensure that we're leaving space for latest item
    if (image === "") {
      return (
        <View
          key={i}
          style={[styles.emptyItem, { width: width * 0.33 }]}
        ></View>
      );
    }

    return (
      <Animated.View
        key={i}
        style={[
          styles.emptyItem,
          {
            opacity: this.state.scrollX.interpolate({
              inputRange: secondRange,
              outputRange: [0.3, 1, 1],
            }),
            height: this.state.scrollX.interpolate({
              inputRange: secondRange,
              outputRange: [itemHeight * 0.8, itemHeight, itemHeight],
            }),
          },
        ]}
      >
        <ImageBackground
          key={i}
          source={image}
          style={[
            StyleSheet.AbsoluteFill,
            {
              height: itemHeight,
              width: itemWidth,
              opacity: 1,
              resizeMode: "cover",
            },
          ]}
        >
          <View
            style={[
              StyleSheet.AbsoluteFill,
              {
                opacity: 0.4,
                backgroundColor: COLORS[i],
                width: itemWidth,
                height: itemHeight,
              },
            ]}
          ></View>
          <Animated.View
            style={[
              {
                flex: 1,
                position: "relative",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                width: itemWidth,
                height: itemHeight,
                opacity: this.state.scrollX.interpolate({
                  inputRange,
                  outputRange: [0.4, 1, 1, 1],
                }),
                transform: [
                  {
                    scale: this.state.scrollX.interpolate({
                      inputRange,
                      outputRange: [0.5, 1, 1.4, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                right: -itemWidth / 4,
                bottom: -itemHeight / 4,
                width: itemWidth,
                height: itemHeight,
              }}
            >
              <Animatable.Text
                animation="fadeInUp"
                delay={ANIMATION_DELAY + 250}
                style={{
                  fontSize: fontSize,
                  fontWeight: "700",
                  color: "rgba(0, 0, 0, 0.5)",
                }}
              >
                {i + 1}
              </Animatable.Text>
            </View>
          </Animated.View>
        </ImageBackground>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
    width: itemWidth,
    height: itemHeight,
    marginLeft: 16,
    borderRadius: 16,
  },
});
