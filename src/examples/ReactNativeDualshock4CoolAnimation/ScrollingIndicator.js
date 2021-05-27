import React, { PureComponent } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { deviceWidth } from './env';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dot: {
    borderRadius: 10 / 2,
    margin: 6,
    backgroundColor: '#fff',
  },
});

export default class ScrollingIndicator extends PureComponent {
  render() {
    const { scrollOffset, total, style } = this.props;
    const dots = [];
    for (let i = 0; i < total; i++) {
      const inputRange = [
        deviceWidth * (i-1),
        deviceWidth * i,
        deviceWidth * (i+1),
      ];
      const size = scrollOffset.interpolate({
        inputRange,
        outputRange: [5, 10, 5],
        extrapolate: 'clamp',
      });
      const opacity = scrollOffset.interpolate({
        inputRange,
        outputRange: [0.5, 1, 0.5],
        extrapolate: 'clamp',
      });
      dots.push((
        <Animated.View
          key={`indicator-${i}`}
          style={StyleSheet.flatten([
            styles.dot,
            { opacity },
            { width: size, height: size },
          ])}
        />
      ));
    }
    return (
      <View style={style}>
        <View style={StyleSheet.flatten(styles.container)}>
          {dots}
        </View>
      </View>
    )
  }
}