import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Animated,
  Easing,
  Platform,
} from "react-native";

export default class CheckBox extends Component {
  state = { checked: this.props.checked };
  animationScale = new Animated.Value(this.props.checked ? 1 : 0);
  animationLeft = new Animated.Value(this.state.checked ? 0 : -this.props.size);
  animationReveal = new Animated.Value(
    this.state.checked ? this.props.size : 0
  );
  rippleScale = new Animated.Value(0.01);
  rippleOpacity = new Animated.Value(0.1);

  componentDidUpdate(prevProps, prevState) {
    const { animationType, checked } = this.props;

    if (animationType === "scale") this.animateScale(!checked);
    else if (animationType === "left") this.animateLeft(!checked);
    else this.animateReveal(!checked);

    if (checked !== prevProps.checked) this.setState({ checked });
  }

  _onValueChange = () => {
    const { onValueChange, animationType } = this.props;

    onValueChange(!this.state.checked);

    if (animationType === "scale") this.animateScale(this.state.checked);
    else if (animationType === "left") this.animateLeft(this.state.checked);
    else this.animateReveal(this.state.checked);
  };

  animateScale = (checked) => {
    if (checked)
      Animated.timing(this.animationScale, {
        toValue: 0.01,
        duration: 100,
        easing: Easing.bezier(0.0, 0.0, 0.2, 1),
        useNativeDriver: true,
      }).start();
    else {
      Animated.timing(this.animationScale, {
        toValue: 1,
        easing: Easing.elastic(2),
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  animateLeft = (checked) => {
    const { size } = this.props;

    if (checked)
      Animated.timing(this.animationLeft, {
        toValue: -size,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    else
      Animated.timing(this.animationLeft, {
        toValue: 0,
        easing: Easing.elastic(1.2),
        duration: 150,
        useNativeDriver: true,
      }).start();
  };

  animateReveal = (checked) => {
    const { size } = this.props;

    if (checked)
      Animated.timing(this.animationReveal, {
        toValue: 0,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    else
      Animated.timing(this.animationReveal, {
        toValue: size,
        easing: Easing.ease,
        duration: 100,
        useNativeDriver: true,
      }).start();
  };

  _renderTextBtn = (position) => {
    const {
      label,
      touchableLabel,
      checkPosition,
      labelStyle,
      rippleEffect,
      labelContainerStyle,
    } = this.props;

    if (!label || position !== checkPosition) return null;

    return (
      <TouchableOpacity
        onPressIn={rippleEffect && touchableLabel ? this.onPressedIn : () => {}}
        onPress={() => {
          if (touchableLabel) {
            this.setState({ checked: !this.state.checked });
            this._onValueChange(!this.state.checked);
          }
        }}
        activeOpacity={touchableLabel ? 0.7 : 1}
        style={[{ justifyContent: "center", flex: 1 }, labelContainerStyle]}
      >
        {React.isValidElement(label) ? (
          label
        ) : (
          <Text style={[{ padding: 10 }, labelStyle]}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  };

  _renderCheckBtn = () => {
    const {
      size,
      checkedBackgroundColor,
      unCheckedBackgroundColor,
      unCheckedBorderColor,
      checkedBorderColor,
      borderWidth,
      rounded,
      checkBoxRadius,
      checkMarkSize,
      checkMarkColor,
      animationType,
      checkStyle,
      checkboxContainerStyle,
      boxStyle,
      customMarker,
    } = this.props;

    const { checked } = this.state;

    var animate = {};
    if (animationType === "scale")
      animate = { transform: [{ scale: this.animationScale }] };
    else if (animationType === "left")
      animate = { transform: [{ translateX: this.animationLeft }] };

    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ checked: !this.state.checked });
          this._onValueChange(!this.state.checked);
        }}
        activeOpacity={0.7}
        style={[{ padding: 10 }, checkboxContainerStyle]}
      >
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              borderRadius: rounded ? size : checkBoxRadius || size * 0.2,
              borderWidth: borderWidth,
              borderColor: checked ? checkedBorderColor : unCheckedBorderColor,
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              backgroundColor: checked
                ? checkedBackgroundColor
                : unCheckedBackgroundColor,
            },
            boxStyle,
          ]}
        >
          {customMarker ? (
            <Animated.View style={animate}>{customMarker}</Animated.View>
          ) : (
            <Animated.Text
              style={[
                {
                  fontSize: checkMarkSize,
                  lineHeight: size,
                  color: checkMarkColor,
                },
                animate,
                checkStyle,
              ]}
            >
              ✓
            </Animated.Text>
          )}

          {animationType === "reveal" ? (
            <Animated.View
              style={{
                position: "absolute",
                width: size,
                aspectRatio: 1 / 1,
                borderRadius: rounded ? size : size * 0.05,
                backgroundColor: checked
                  ? checkedBackgroundColor
                  : unCheckedBackgroundColor,
                transform: [{ translateX: this.animationReveal }],
              }}
            />
          ) : null}
        </Animated.View>
      </TouchableOpacity>
    );
  };

  onPressedIn = () => {
    Animated.parallel([
      Animated.timing(this.rippleScale, {
        toValue: 1,
        duration: 150,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: Platform.OS === "android",
      }),
      Animated.timing(this.rippleOpacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: Platform.OS === "android",
      }),
    ]).start(() => {
      this.rippleScale.setValue(0.01);
      this.rippleOpacity.setValue(0.1);
    });
  };

  _renderRipple() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          transform: [{ scale: this.rippleScale }],
          opacity: this.rippleOpacity,
          backgroundColor: this.props.rippleColor,
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={[
          { flexDirection: "row", alignItems: "center" },
          this.props.containerStyle,
        ]}
      >
        {this._renderRipple()}
        {this._renderTextBtn("right")}
        {this._renderCheckBtn()}
        {this._renderTextBtn("left")}
      </View>
    );
  }
}

CheckBox.defaultProps = {
  label: "Your label here",
  checked: false,
  touchableLabel: true,
  size: 20,
  checkPosition: "left",
  checkedBackgroundColor: "#22cdf0",
  unCheckedBackgroundColor: "white",
  unCheckedBorderColor: "grey",
  checkedBorderColor: "transparent",
  borderWidth: 1,
  rippleEffect: true,
  rippleColor: "black",
  rounded: false,
  checkMarkSize: 12,
  checkMarkColor: "black",
  animationType: "scale",
};
