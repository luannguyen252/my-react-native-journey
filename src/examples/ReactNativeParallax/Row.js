import * as React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { PREVIEW_HEIGHT, ROW_HEIGHT } from './constants';

const styles = StyleSheet.create({
  container: {
    height: ROW_HEIGHT,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PREVIEW_HEIGHT,
    overflow: 'hidden',
    padding: 16,
    justifyContent: 'center',
  },
  previewOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
  },
  title: {
    fontFamily: 'AvenirNextCondensed-DemiBold',
    color: '#ffffff',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default class Row extends React.PureComponent {
  static propTypes = {
    scrollY: PropTypes.any,
    onPress: PropTypes.func,
    index: PropTypes.number,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  };

  renderRow() {
    const { scrollY, image, title, index } = this.props;
    return (
      <Animated.View
        style={[
          styles.preview,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [ROW_HEIGHT * (index-1), ROW_HEIGHT * index],
                  outputRange: [0, -PREVIEW_HEIGHT + ROW_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <Animated.Image
          source={{ uri: image }}
          resizeMode="cover"
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [ROW_HEIGHT * (index-1), ROW_HEIGHT * index],
                    outputRange: [-PREVIEW_HEIGHT / 16, 0],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.previewOverlay,
            {
              opacity: scrollY.interpolate({
                inputRange: [ROW_HEIGHT * (index-1), ROW_HEIGHT * index],
                outputRange: [0.45, 0.1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        />
        <Animated.View
          style={{
            transform: [
              {
                scale: scrollY.interpolate({
                  inputRange: [
                    ROW_HEIGHT * (index-1),
                    ROW_HEIGHT * (index),
                    ROW_HEIGHT * (index+1),
                  ],
                  outputRange: [1, 1.7, 1],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: scrollY.interpolate({
                  inputRange: [
                    ROW_HEIGHT * (index-1),
                    ROW_HEIGHT * (index),
                    ROW_HEIGHT * (index+1),
                  ],
                  outputRange: [-ROW_HEIGHT , 0, -ROW_HEIGHT],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        >
          <Animated.Text style={styles.title}>
            {title}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={onPress}
      >
        {this.renderRow()}
      </TouchableOpacity>
    );
  }
}

