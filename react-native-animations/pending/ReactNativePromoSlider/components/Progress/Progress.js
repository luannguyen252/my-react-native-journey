/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Animated, View, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { range, SCREEN_WIDTH } from '../../utils';
import styles from './Progress.styles';

const dotAnimation = (xOffset, length) => {
  const steps = range(0, length, 0.5);

  const translateXInput = steps.map((_, index) => index * SCREEN_WIDTH);
  const translateXOutput = steps.map((_, index) => index * 16);

  const scaleXInput = steps.map((_, index) => (index * SCREEN_WIDTH) / 2);
  const scaleXOutput = steps.map((_, index) => (index % 2 === 0 ? 1 : 3.5));

  return {
    transform: [
      {
        translateX: xOffset.interpolate({
          inputRange: translateXInput,
          outputRange: translateXOutput,
        }),
      },
      {
        scaleX: xOffset.interpolate({
          inputRange: scaleXInput,
          outputRange: scaleXOutput,
        }),
      },
    ],
  };
};

/**
 * Progress component
 */
const Progress = ({ slides, progressStyles, dotColor, onDotPress, xOffset }) => (
  <View style={[styles.progress, progressStyles]}>
    <Animated.View style={[styles.activeDot, { backgroundColor: dotColor }, dotAnimation(xOffset, slides.length)]} />
    {slides.map((_, index) => (
      <TouchableWithoutFeedback key={`dot-${index}`} onPress={() => onDotPress(index)}>
        <View style={[styles.dot, { backgroundColor: dotColor }, index !== 0 && { marginLeft: 10 }]} />
      </TouchableWithoutFeedback>
    ))}
  </View>
);

Progress.propTypes = {
  /**
   * Array of slide components
   */
  slides: PropTypes.array.isRequired,
  /**
   * Configure styles for wrapper of progress dots
   */
  progressStyles: PropTypes.object,
  /**
   * Define stationary and active dot color
   */
  dotColor: PropTypes.string,
};

Progress.defaultProps = {
  progressStyles: {},
  dotColor: '#000',
};

export default Progress;
