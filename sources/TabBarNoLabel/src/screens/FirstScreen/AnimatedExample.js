import React, { useRef, useEffect, useState, Component } from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

// BEGIN: Setup Box Component
const Box = ({
  backgroundColor = "#3cae6f",
  scale = 1,
  opacity = 1,
  translateY = 0,
  size = 48,
  position,
  left,
}) => (
  <Animated.View
    style={[
      {
        backgroundColor,
        transform: [{ scale }, { translateY }],
        opacity: opacity,
        width: size,
        height: size,
        position: position,
        left: left,
      },
    ]}
  />
);
// END: Setup Box Component

// BEGIN: Pulse Animation
function PulseAnimation() {
  const scale = useRef(new Animated.Value(1)).current;

  const activePulse = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={activePulse}>
      <Box scale={scale} />
    </TouchableOpacity>
  );
}
// END: Pulse Animation

// BEGIN: Opacity Animation
function OpacityAnimation() {
  const opacity = useRef(new Animated.Value(1)).current;

  const activeOpacity = () => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={activeOpacity}>
      <Box opacity={opacity} />
    </TouchableOpacity>
  );
}
// END: Opacity Animation

// BEGIN: Position Animation
function PositionAnimation() {
  const translateY = useRef(new Animated.Value(0)).current;

  const activePosition = () => {
    Animated.sequence([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 50,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={activePosition}>
      <Box translateY={translateY} />
    </TouchableOpacity>
  );
}
// END: Position Animation

// BEGIN: Width Height Animation
function WidthHeightAnimation() {
  const size = useRef(new Animated.Value(48)).current;

  const activeSize = () => {
    Animated.sequence([
      Animated.timing(size, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(size, {
        toValue: 48,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={activeSize}>
      <Box size={size} />
    </TouchableOpacity>
  );
}
// END: Width Height Animation

// BEGIN: Absolute Position Animation
function AbsolutePositionAnimation() {
  const absolutePosition = useRef(new Animated.Value(0)).current;

  const activeAbsolute = () => {
    Animated.sequence([
      Animated.timing(absolutePosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(absolutePosition, {
        toValue: 20,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(absolutePosition, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={activeAbsolute}>
      <Box position="relative" left={absolutePosition} />
    </TouchableOpacity>
  );
}
// END: Absolute Position Animation

// BEGIN: Basic Animation
class BasicAnimation extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 2,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  };

  render() {
    const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 300, 0],
    });

    const interpolatedInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 300],
      outputRange: [1, 0.5],
    });

    const translateXInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 30, 50, 80, 100, 150, 299, 300],
      outputRange: [0, -30, -50, -80, -100, 300, 0, -100],
    });

    const animatedStyles = {
      transform: [
        {
          translateY: animatedInterpolate,
        },
        {
          translateX: translateXInterpolate,
        },
      ],
      opacity: interpolatedInterpolate,
    };

    return (
      <TouchableOpacity onPress={this.startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}></Animated.View>
      </TouchableOpacity>
    );
  }
}
// END: Basic Animation

export default function AnimatedExample() {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <PulseAnimation />
        <OpacityAnimation />
        <PositionAnimation />
        <WidthHeightAnimation />
        <AbsolutePositionAnimation />
      </View>
      <View style={{ height: 32 }}></View>
      <BasicAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "tomato",
    width: 48,
    height: 48,
  },
});
