import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, Platform } from "react-native";
import PropTypes from "prop-types";
import { requireNativeComponent } from "react-native";
import style from "./RNFluidicSlider.style";

class RNFluidicSlider extends Component {
  static propTypes = {
    ...ViewPropTypes,

    min: PropTypes.number,
    max: PropTypes.number,

    initialPosition: PropTypes.number,

    barColor: PropTypes.string,
    bubbleColor: PropTypes.string,
    barTextColor: PropTypes.string,
    bubbleTextColor: PropTypes.string,

    beginTracking: PropTypes.func,
    endTracking: PropTypes.func,
  };

  static defaultProps = {
    min: 0,
    max: 100,

    initialPosition: 0.5,

    barColor: "#6168e7",
    bubbleColor: "#FFFFFF",
    barTextColor: "#FFFFFF",
    bubbleTextColor: "#000000",
  };

  _onChange = (event, position) => {
    if (event.nativeEvent.event === "beginTracking") {
      this.props.beginTracking &&
        this.props.beginTracking(event.nativeEvent.value);
    } else if (event.nativeEvent.event === "endTracking") {
      this.props.endTracking && this.props.endTracking(event.nativeEvent.value);
    }
  };

  render() {
    return (
      <FluidicSlider
        style={style.container}
        onChange={this._onChange}
        {...this.props}
      />
    );
  }
}

const FluidicSlider = requireNativeComponent(
  "RNFluidicSlider",
  RNFluidicSlider,
  {
    nativeOnly: { onChange: true },
  }
);

export { RNFluidicSlider };
