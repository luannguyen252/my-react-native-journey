import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import { Animated, Text } from "react-native";

let animation;
const ANIMATION_DELAY = 500;

export default class AnimatedBar extends Component {
  constructor(props) {
    super(props);

    this.updateValue();
  }

  updateValue = () => {
    animation = new Animated.Value(
      this.props.prevValue ? this.props.prevValue : 20
    );

    Animated.sequence([
      Animated.delay(Math.round(Math.random() * 400)),
      Animated.timing(animation, {
        toValue: this.props.value,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps != this.props) {
      this.updateValue();
    }
  };

  componentDidMount = () => {};

  render() {
    return (
      <Animated.View
        key={"bar-" + Math.random() * 100}
        style={{
          flex: 1,
          overflowX: "visible",
          backgroundColor: this.props.color,
          marginLeft: this.props.margin + "%",
          marginRight: this.props.margin + "%",
          height: "100%",
          borderRadius: 25,
          alignItems: "center",
          transform: [{ translateY: animation }],
        }}
      >
        <Animatable.Text
          animation="bounceIn"
          delay={ANIMATION_DELAY}
          style={{
            position: "absolute",
            width: 45,
            top: -26,
            fontSize: 16,
            lineHeight: 22,
            fontWeight: "700",
            color: "#111827",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {this.props.label}
        </Animatable.Text>
      </Animated.View>
    );
  }
}
