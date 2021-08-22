import React, { Component } from "react";
import PropTypes from "prop-types";
import Animated from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import { runScaleTimer } from "./helpers";

const { Value, event, Clock } = Animated;

export default class TouchableScaleFeedback extends Component {
  gestureState = new Value(-1);

  clock = new Clock();

  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState },
    },
  ]);

  render() {
    const scale = runScaleTimer(
      this.clock,
      this.gestureState,
      this.props.onPress,
      this.props.activeScale,
      this.props.inactiveScale
    );

    return (
      <TapGestureHandler
        maxDurationMs={100000}
        shouldCancelWhenOutside
        onHandlerStateChange={this.onStateChange}
      >
        <Animated.View
          style={[
            {
              transform: [{ scale }],
            },
          ]}
        >
          {this.props.children}
        </Animated.View>
      </TapGestureHandler>
    );
  }
}

TouchableScaleFeedback.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.element,
  activeScale: PropTypes.number,
  inactiveScale: PropTypes.number,
};

TouchableScaleFeedback.defaultProps = {
  onPress: () => {},
  children: <></>,
  activeScale: 0.9,
  inactiveScale: 1,
};
