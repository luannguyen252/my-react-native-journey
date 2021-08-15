import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import AnimatedLottieView from "./AnimatedLottieView";

const { width, height } = Dimensions.get("window");
const ANIMATION_DELAY = 100;
const {
  Value,
  block,
  cond,
  set,
  Clock,
  stopClock,
  startClock,
  clockRunning,
  timing,
  debug,
  interpolate,
  Extrapolate,
} = Animated;

const LoginScreen = () => {
  const [buttonOpacity, setButtonOpacity] = useState(new Value(1));

  const onStateChange = (e) => {
    if (e.nativeEvent.state === State.END) {
      setButtonOpacity(setTiming(new Clock(), 1, 0));
    }
  };

  const onCloseState = (e) => {
    if (e.nativeEvent.state === State.END) {
      setButtonOpacity(setTiming(new Clock(), 0, 1));
    }
  };

  const transform = (f, t) => {
    return interpolate(buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [f, t],
      extrapolate: Extrapolate.CLAMP,
    });
  };

  const setTiming = (clock, value, distance) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 500,
      toValue: new Value(0),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, distance),
        startClock(clock),
      ]),

      timing(clock, state, config),
      cond(state.finished, debug("stop clock", stopClock(clock))),
      state.position,
    ]);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: transform(-height / 3, 0) }],
          backgroundColor: "#111827",
        }}
      >
        <Animated.View
          style={{
            ...styles.lottieView,
            transform: [{ translateY: transform(height / 4.5, 0) }],
          }}
        >
          <AnimatedLottieView lottieStyle={{}} />
        </Animated.View>
      </Animated.View>

      <Animated.View
        style={{
          ...styles.textContainer,
          transform: [{ translateY: transform(-200, 0) }],
          opacity: buttonOpacity,
          paddingTop: 32,
          paddingLeft: 32,
          paddingRight: 32,
        }}
      >
        <Animatable.Text
          animation="fadeInDown"
          delay={ANIMATION_DELAY}
          style={{
            ...styles.textStyle,
            fontSize: 32,
            lineHeight: 40,
            fontWeight: "900",
            color: "white",
            paddingBottom: 8,
            textAlign: "center",
          }}
        >
          Data Analytics
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          delay={ANIMATION_DELAY + 150}
          style={{
            ...styles.textStyle,
            fontSize: 16,
            lineHeight: 24,
            fontWeight: "500",
            color: "white",
            textAlign: "center",
            opacity: 0.6,
          }}
        >
          Data analytics is also used to detect and prevent fraud to improve
          efficiency and reduce risk for financial institutions.
        </Animatable.Text>
      </Animated.View>

      <Animatable.View
        animation="fadeInDown"
        delay={ANIMATION_DELAY + 350}
        style={styles.buttonContainer}
      >
        <Animatable.View animation="fadeInDown" delay={ANIMATION_DELAY + 450}>
          <Animated.View
            style={{
              ...styles.button,
              backgroundColor: "#2563EB",
              opacity: buttonOpacity,
              transform: [{ translateY: transform(100, 1) }],
            }}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              Create an account
            </Text>
          </Animated.View>
        </Animatable.View>

        <Animatable.View animation="fadeInDown" delay={ANIMATION_DELAY + 550}>
          <TapGestureHandler onHandlerStateChange={onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: buttonOpacity,
                transform: [{ translateY: transform(100, 1) }],
              }}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Animated.View>
          </TapGestureHandler>
        </Animatable.View>

        <Animated.View
          style={{
            ...styles.loginContainer,
            ...StyleSheet.absoluteFill,
            zIndex: transform(1, -1),
            opacity: transform(1, 0),
            transform: [{ translateY: transform(0, 100) }],
          }}
        >
          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <Animated.View
              style={{
                ...styles.downArrowContainer,
                transform: [{ rotate: transform(0, 2) }],
              }}
            >
              <Entypo
                name="chevron-small-down"
                size={32}
                color="black"
                style={styles.downArrow}
              />
            </Animated.View>
          </TapGestureHandler>

          <TextInput
            style={styles.inputText}
            placeholderTextColor="#9CA3AF"
            placeholder="Username"
          />

          <TextInput
            style={styles.inputText}
            placeholderTextColor="#9CA3AF"
            placeholder="Password"
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.button,
              backgroundColor: "#111827",
              shadowOffset: { width: 2, height: 2 },
              shadowColor: "black",
              shadowOpacity: 0.2,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 18,
                lineHeight: 24,
                fontWeight: "700",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animatable.View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  lottieView: {
    flex: 1,
    bottom: 16,
    height: null,
    width: null,
  },
  buttonContainer: {
    justifyContent: "center",
    height: height / 3,
    zIndex: 0,
  },
  button: {
    backgroundColor: "white",
    marginTop: 16,
    marginLeft: 32,
    marginRight: 32,
    height: height / 16,
    borderRadius: height / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: width / 23,
    fontWeight: "bold",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width,
    position: "absolute",
    top: 80,
  },
  loginContainer: {
    height: height / 3,
    top: null,
    justifyContent: "center",
  },
  inputText: {
    height: height / 16,
    borderRadius: height / 16,
    borderColor: "#9CA3AF",
    borderWidth: 0.5,
    marginTop: 16,
    marginLeft: 32,
    marginRight: 32,
    paddingLeft: 16,
    zIndex: 1,
  },
  downArrow: {
    height: 32,
    width: 32,
  },
  downArrowContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    position: "absolute",
    top: -15,
    left: width / 2 - 20,
    padding: 3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
