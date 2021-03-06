import * as React from "react";
import { StyleSheet, Animated } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";

const { Value, multiply } = Animated;
const width = 200;
const height = 200;
const radius = width / 2;
const padding = 32;

type ProgressProps = {};

export default class Progress extends React.Component<ProgressProps> {
  animation = new Value(0);
  rotation = new Value(0);

  componentDidMount() {
    Animated.parallel([
      Animated.loop(
        Animated.timing(this.rotation, {
          toValue: 1,
          duration: 30000,
          useNativeDriver: false,
        })
      ),
      Animated.loop(
        Animated.timing(this.animation, {
          toValue: 1,
          duration: 3500,
          useNativeDriver: false,
        })
      ),
    ]).start();
  }

  render() {
    const translation = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 8, 0],
    });

    const negTranslation = Animated.multiply(translation, -1);

    const rotateZ = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const negRotateZ = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-360deg"],
    });

    return (
      <Animated.View style={[styles.container, { transform: [{ rotateZ }] }]}>
        <Animated.View
          style={[
            styles.outerCircle,
            { transform: [{ translateY: translation }] },
          ]}
        />
        <Animated.View
          style={[
            styles.outerCircle,
            { transform: [{ translateY: negTranslation }] },
          ]}
        />
        <Animated.View
          style={[
            styles.outerCircle,
            { transform: [{ translateX: translation }] },
          ]}
        />
        <Animated.View
          style={[
            styles.outerCircle,
            { transform: [{ translateY: negTranslation }] },
          ]}
        />
        <Animated.View
          style={[styles.circle, { transform: [{ translateY: translation }] }]}
        />
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateY: negTranslation }] },
          ]}
        />
        <Animated.View
          style={[styles.circle, { transform: [{ translateX: translation }] }]}
        />
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateY: negTranslation }] },
          ]}
        />
        <Animated.View
          style={[
            styles.buttonContainer,
            { transform: [{ rotateZ: negRotateZ }] },
          ]}
        >
          <Icon name="ios-pause" color="#c2ad89" size={56} />
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width + padding * 2,
    height: height + padding * 2,
  },
  outerCircle: {
    backgroundColor: "#f4efe8",
    width: width + padding,
    height: height + padding,
    borderRadius: (width + padding) / 2,
    position: "absolute",
    top: padding / 2,
    left: padding / 2,
  },
  circle: {
    backgroundColor: "#eae2d5",
    width,
    height,
    borderRadius: radius,
    position: "absolute",
    top: padding,
    left: padding,
  },
  buttonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
