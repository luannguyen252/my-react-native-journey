import * as Animatable from "react-native-animatable";
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../../../assets/styles/colors";

const { height, width } = Dimensions.get("screen");

const DUMB_TEXT =
  "For years, the Octocat has been stuck in the realm of two dimensions—but no more! Now she’s crawling off your laptop and onto your desk as a 5' vinyl figurine.";
const BUTTON_TOP_MARGIN = 20;
const ORIGINAL_BUTTON_WIDTH = width - 100;
const BUTTON_SIZE = 56;
const FROM_X = width / 2 - BUTTON_SIZE / 2;
const TO_X = width - 50; // Điều chỉnh hiển thị X axis dot khi bấm Add to Cart hiển thị ở giỏ hàng
const TO_Y = -6; // Điều chỉnh hiển thị Y axis dot khi bấm Add to Cart hiển thị ở giỏ hàng
const END = { x: TO_X, y: TO_Y };
const CONTROL = { x: FROM_X, y: TO_Y };
const ANIMATION_DELAY = 500;

export default class Curve extends React.Component {
  buttonAnimatedValue = new Animated.Value(1);
  ballAnimatedValue = new Animated.Value(0);
  buttonOpacity = new Animated.Value(1);

  componentDidMount() {
    this.buttonAnimatedValue.addListener(({ value }) => {
      if (value === 0) {
        this.buttonOpacity.setValue(0);

        const toValue = this.ballAnimatedValue.__getValue() > 0 ? 0 : 1;
        Animated.timing(this.ballAnimatedValue, {
          toValue,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      } else {
        this.buttonOpacity.setValue(1);
      }
    });

    this.ballAnimatedValue.addListener(({ value }) => {
      const translateX = this.calcBezier(value, this.START.x, CONTROL.x, END.x);
      const translateY = this.calcBezier(value, this.START.y, CONTROL.y, END.y);
      const scale = this.calcScale(value);

      this.ball.setNativeProps({
        transform: [{ translateX }, { translateY }, { scale }],
      });
    });
  }

  calcScale(value) {
    return 1 - value * 0.7;
  }

  calcBezier(interpolatedTime, p0, p1, p2) {
    return Math.round(
      Math.pow(1 - interpolatedTime, 2) * p0 +
        2 * (1 - interpolatedTime) * interpolatedTime * p1 +
        Math.pow(interpolatedTime, 2) * p2
    );
  }

  render() {
    // Button animated styles with interpolate
    const buttonWidth = this.buttonAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [BUTTON_SIZE, ORIGINAL_BUTTON_WIDTH],
    });

    // Ball animated styles with interpolate
    const ballOpacity = this.buttonOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <Animatable.View
          animation="fadeInDown"
          delay={ANIMATION_DELAY}
          style={{
            alignItems: "flex-end",
            paddingHorizontal: 24,
            backgroundColor: colors.white,
            paddingVertical: 16,
            shadowColor: colors.black,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 5,
          }}
        >
          <Animatable.View animation="fadeInDown" delay={ANIMATION_DELAY + 150}>
            <Feather name="shopping-bag" size={24} color={colors.coolGray900} />
          </Animatable.View>
        </Animatable.View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingVertical: 32,
            paddingHorizontal: 24,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Animatable.View animation="fadeInDown" delay={ANIMATION_DELAY + 250}>
            <Animatable.View
              animation="fadeInDown"
              delay={ANIMATION_DELAY + 350}
            >
              <Image
                resizeMode="contain"
                style={{ height: width / 1.25, width: "100%" }}
                source={require("./assets/octocat-figurine.png")}
              />
            </Animatable.View>

            <Animatable.Text
              animation="fadeInDown"
              delay={ANIMATION_DELAY + 450}
              style={{
                fontSize: 24,
                lineHeight: 32,
                fontWeight: "900",
                color: colors.coolGray900,
                marginBottom: 4,
              }}
            >
              Octocat Figurine
            </Animatable.Text>

            <Animatable.Text
              animation="fadeInDown"
              delay={ANIMATION_DELAY + 550}
              style={{
                fontSize: 24,
                lineHeight: 32,
                fontWeight: "700",
                color: colors.orange600,
              }}
            >
              $15
            </Animatable.Text>

            <Animatable.Text
              animation="fadeInDown"
              delay={ANIMATION_DELAY + 650}
              style={{
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "400",
                marginTop: 16,
                color: colors.coolGray600,
              }}
            >
              {DUMB_TEXT}
            </Animatable.Text>

            <Animatable.View
              animation="fadeInDown"
              delay={ANIMATION_DELAY + 750}
              style={{ marginTop: "25%" }}
            >
              <TouchableOpacity
                ref={(ref) => (this.button = ref)}
                onPress={() => {
                  this.button.measure((x, y, width, height, px, py) => {
                    this._resetBallPosition(py + BUTTON_TOP_MARGIN);
                    Animated.timing(this.buttonAnimatedValue, {
                      toValue: 0,
                      duration: 300,
                    }).start();
                  });
                }}
              >
                <Animated.View
                  style={{
                    width: buttonWidth,
                    backgroundColor: colors.orange600,
                    marginTop: BUTTON_TOP_MARGIN,
                    alignItems: "center",
                    borderRadius: BUTTON_SIZE / 2,
                    alignSelf: "center",
                    height: BUTTON_SIZE,
                    justifyContent: "center",
                    opacity: this.buttonOpacity,
                  }}
                >
                  <Animated.Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      lineHeight: 22,
                      fontWeight: "700",
                      textTransform: "uppercase",
                      opacity: this.buttonAnimatedValue,
                    }}
                  >
                    Add to Cart
                  </Animated.Text>
                </Animated.View>
              </TouchableOpacity>
            </Animatable.View>
          </Animatable.View>
        </ScrollView>

        <Animated.View
          ref={(ref) => (this.ball = ref)}
          style={{
            position: "absolute",
            height: BUTTON_SIZE / 1.25,
            width: BUTTON_SIZE / 1.25,
            borderRadius: BUTTON_SIZE / 2,
            backgroundColor: colors.orange600,
            opacity: ballOpacity,
          }}
        />
      </View>
    );
  }

  _resetBallPosition(y) {
    this.START = { x: FROM_X, y };
    this.ball.setNativeProps({
      transform: [{ translateX: this.START.x }, { translateY: this.START.y }],
    });
  }
}
