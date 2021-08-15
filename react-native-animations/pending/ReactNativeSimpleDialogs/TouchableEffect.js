import React, { Component } from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";

const { OS } = Platform;

class TouchableEffect extends Component {
  render() {
    let touchable;

    if (OS === "android") {
      touchable = <TouchableNativeFeedback {...this.props} />;
    } else {
      touchable = <TouchableOpacity {...this.props} />;
    }

    return touchable;
  }
}

if (OS === "android") {
  TouchableEffect.propTypes = { ...TouchableNativeFeedback.propTypes };
} else {
  TouchableEffect.propTypes = { ...TouchableOpacity.propTypes };
}

TouchableEffect.defaultProps = {
  background:
    OS === "android"
      ? TouchableNativeFeedback.SelectableBackground()
      : undefined,
};

export default TouchableEffect;
