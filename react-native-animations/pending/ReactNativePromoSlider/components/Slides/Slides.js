/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Slides.styles';

/**
 * Slide(s) component
 */
const Slides = ({ slides, withoutClose, onCloseNative, isVisible }) => {
  if (!isVisible) return null;

  return slides.map((item, index, array) => {
    if (!withoutClose && index + 1 === array.length) {
      return (
        <View style={styles.slide} key={`slide-${index}`}>
          <TouchableOpacity onPress={() => onCloseNative()} style={styles.closeButton} activeOpacity={0.25}>
            <Text style={styles.closeIcon}>&times;</Text>
          </TouchableOpacity>
          {item}
        </View>
      );
    }
    return (
      <View style={styles.slide} key={`slide-${index}`}>
        {item}
      </View>
    );
  });
};

export default Slides;

Slides.propTypes = {
  /**
   * Array of slide components
   */
  slides: PropTypes.array.isRequired,
  /**
   * Function which will trigger removal of slider component
   */
  onCloseNative: PropTypes.func,
  /**
   * Boolean which indicates weather or not to show close button
   */
  withoutClose: PropTypes.bool,
  /**
   * Boolean which indicates weather or not slider is visible
   */
  isVisible: PropTypes.bool,
};

Slides.defaultProps = {
  onClose: () => {},
  withoutClose: null,
  isVisible: null,
};
