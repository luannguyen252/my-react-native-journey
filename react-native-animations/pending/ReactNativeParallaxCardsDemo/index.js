import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
  Image,
  TouchableHighlight,
  Alert,
  StatusBar,
} from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");
const ANIMATION_DELAY = 500;
const SLIDES = [
  {
    shoeImage: require("./shoe1.png"),
    shoePrice: 120,
    shoeName: "Air Structure 19",
    shoeDescription:
      "From the Flymesh upper to the triple-density foam midsole, the Nike Air Zoom Structure 19 Men’s Running Shoe offers plenty of support and the response you need for a smooth, stable ride that feels ultra fast.",
    shoeCategory: "Men’s Running Shoe",
    shoePhrase: "Air",
    backgroundColor: "#8850FF",
    touchableBackgroundColor: "#CAB1FF",
    gradient: require("./gradient1.png"),
  },
  {
    shoeImage: require("./shoe2.png"),
    shoePrice: 129,
    shoeName: "Air Solstice QS",
    shoeDescription:
      "The Nike Air Solstice draws inspiration from the swoosh's classic running shoes of the 1980's updating the style with premium materials and impressive production quality.",
    shoeCategory: "Men’s Shoe",
    shoePhrase: "Class",
    backgroundColor: "#FFBA00",
    touchableBackgroundColor: "#FFDB79",
    gradient: require("./gradient2.png"),
  },
  {
    shoeImage: require("./shoe3.png"),
    shoePrice: 140,
    shoeName: "Air Huarache Utility",
    shoeDescription:
      "The Nike Air Huarache Utility Men's Shoe toughens up a famous running shoe with a nylon upper, fused mudguard and vibrant detail.",
    shoeCategory: "Men’s Shoe",
    shoePhrase: "Safar",
    backgroundColor: "#4054FF",
    touchableBackgroundColor: "#9EA8FF",
    gradient: require("./gradient3.png"),
  },
];

export default class ReactNativeParallaxCardsDemo extends Component {
  scrollX = new Animated.Value(0);

  expandCard() {
    Alert.alert("Successfully", "Are you want to checkout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Checkout", onPress: () => console.log("OK Pressed") },
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {SLIDES.map((slide, index) => {
          return (
            <Animated.View
              key={index}
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: slide.backgroundColor,
                zIndex: -index,
                opacity: this.scrollX.interpolate({
                  inputRange: [deviceWidth * index, deviceWidth * (index + 1)],
                  outputRange: [1, 0],
                }),
              }}
            />
          );
        })}
        <Animated.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: true }
          )}
        >
          {SLIDES.map((slide, index) => {
            return (
              <Animatable.View
                animation="fadeInUp"
                delay={ANIMATION_DELAY}
                easing="ease"
                key={index}
                style={styles.cardContainer}
              >
                <Animated.View style={styles.card}>
                  <View style={styles.cardTopContainer}>
                    <Image
                      style={styles.gradientImage}
                      source={slide.gradient}
                    />
                    <Animated.View
                      style={[
                        styles.nikeImageContainer,
                        {
                          transform: [
                            {
                              translateX: this.scrollX.interpolate({
                                inputRange: [
                                  deviceWidth * index,
                                  deviceWidth * (index + 1),
                                ],
                                outputRange: [0, -deviceWidth * 0.2],
                              }),
                            },
                          ],
                        },
                      ]}
                    >
                      <Animatable.View
                        animation="fadeInUp"
                        delay={ANIMATION_DELAY + 150}
                        easing="ease"
                      >
                        <Image
                          style={styles.nikeImage}
                          source={require("./nike-logo.png")}
                        />
                      </Animatable.View>
                      <Animatable.Text
                        animation="fadeInUp"
                        delay={ANIMATION_DELAY + 300}
                        easing="ease"
                        style={styles.shoePriceText}
                      >
                        ${slide.shoePrice}
                      </Animatable.Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        marginBottom: 8,
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1),
                              ],
                              outputRange: [0, -deviceWidth * 0.4],
                            }),
                          },
                        ],
                      }}
                    >
                      <Animatable.Text
                        animation="fadeInUp"
                        delay={ANIMATION_DELAY + 450}
                        easing="ease"
                        style={styles.shoeNameText}
                      >
                        {slide.shoeName.toUpperCase()}
                      </Animatable.Text>
                    </Animated.View>
                    <Animated.View
                      style={{
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1),
                              ],
                              outputRange: [0, -deviceWidth * 0.6],
                            }),
                          },
                        ],
                      }}
                    >
                      <Animatable.Text
                        animation="fadeInUp"
                        delay={ANIMATION_DELAY + 600}
                        easing="ease"
                        style={styles.shoeDescriptionText}
                      >
                        {slide.shoeDescription}
                      </Animatable.Text>
                    </Animated.View>
                    <Animatable.Text
                      animation="fadeInLeft"
                      delay={ANIMATION_DELAY + 750}
                      easing="ease"
                      style={styles.shoePhraseText}
                    >
                      {slide.shoePhrase.toUpperCase()}
                    </Animatable.Text>
                    <View />
                  </View>

                  <Animatable.View
                    animation="fadeInUp"
                    delay={ANIMATION_DELAY + 900}
                    easing="ease"
                    style={[
                      styles.buttonContainer,
                      {
                        transform: [
                          {
                            translateX: this.scrollX.interpolate({
                              inputRange: [
                                deviceWidth * index,
                                deviceWidth * (index + 1),
                              ],
                              outputRange: [0, -deviceWidth * 0.2],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <TouchableHighlight
                      underlayColor={slide.touchableBackgroundColor}
                      onPress={() => this.expandCard()}
                      style={[
                        styles.button,
                        { backgroundColor: slide.backgroundColor },
                      ]}
                    >
                      <Text style={[styles.buttonText]}>Add to cart</Text>
                    </TouchableHighlight>
                    <Animatable.Text
                      animation="fadeInUp"
                      delay={ANIMATION_DELAY + 1050}
                      easing="ease"
                      style={styles.shoeCategoryText}
                    >
                      {slide.shoeCategory.toUpperCase()}
                    </Animatable.Text>
                  </Animatable.View>
                </Animated.View>

                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.shoeImageContainer,
                    {
                      transform: [
                        {
                          translateX: this.scrollX.interpolate({
                            inputRange: [
                              deviceWidth * index,
                              deviceWidth * (index + 1),
                            ],
                            outputRange: [0, -deviceWidth * 1],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <Animatable.View
                    animation="fadeInLeft"
                    delay={ANIMATION_DELAY + 1200}
                    easing="ease"
                  >
                    <Image style={styles.shoeImage} source={slide.shoeImage} />
                  </Animatable.View>
                </Animated.View>
              </Animatable.View>
            );
          })}
        </Animated.ScrollView>

        <Animatable.View
          animation="fadeInUp"
          delay={ANIMATION_DELAY + 1350}
          easing="ease"
          style={styles.pageIndicatorContainer}
        >
          <Animatable.View
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 1450}
            easing="ease"
            style={styles.inActivePageIndicator}
          />
          <Animatable.View
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 1550}
            easing="ease"
            style={styles.inActivePageIndicator}
          />
          <Animatable.View
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 1650}
            easing="ease"
            style={styles.inActivePageIndicator}
          />
          <Animated.View
            style={[
              styles.activePageIndicator,
              {
                transform: [
                  {
                    translateX: this.scrollX.interpolate({
                      inputRange: [0, deviceWidth, deviceWidth * 2],
                      outputRange: [0, 24, 48],
                    }),
                  },
                  {
                    scaleX: this.scrollX.interpolate({
                      inputRange: [
                        0,
                        deviceWidth * 0.5,
                        deviceWidth,
                        deviceWidth * 1.5,
                        deviceWidth * 2,
                      ],
                      outputRange: [1, 1.5, 1, 1.5, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: deviceWidth - 64,
    height: deviceHeight * 0.8,
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowRadius: 24,
  },
  cardTopContainer: {
    flex: 3,
    overflow: "hidden",
    padding: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "transparent",
  },
  gradientImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: deviceWidth - 64,
    height: deviceHeight * 0.8,
    resizeMode: "cover",
  },
  nikeImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  nikeImage: {
    width: 40,
    resizeMode: "contain",
  },
  shoePriceText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600",
    letterSpacing: 0.38,
    color: "white",
  },
  shoeNameText: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "white",
  },
  shoeDescriptionText: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.07,
    color: "white",
    opacity: 0.8,
  },
  shoePhraseText: {
    position: "absolute",
    bottom: 0,
    left: -32,
    width: deviceWidth * 2,
    fontSize: deviceWidth / 2,
    fontWeight: "900",
    letterSpacing: 20,
    color: "rgba(0, 0, 0, 0.3)",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "white",
  },
  shoeCategoryText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#94A3B8",
  },
  shoeImageContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  shoeImage: {
    top: 72,
    width: deviceWidth,
    resizeMode: "contain",
  },
  pageIndicatorContainer: {
    position: "absolute",
    bottom: 50,
    width: 64,
    height: 3,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    borderRadius: 1.5,
  },
  inActivePageIndicator: {
    width: 16,
    height: 3,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 1.5,
  },
  activePageIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 16,
    height: 3,
    backgroundColor: "white",
    borderRadius: 1.5,
  },
});
