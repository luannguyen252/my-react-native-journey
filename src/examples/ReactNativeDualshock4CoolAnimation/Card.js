import React, { PureComponent } from 'react';
import { Animated, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 25,
    shadowOffset: {
      width: 0,
      height: 15
    },
  },
});

export default class Card extends PureComponent {
  render() {
    const { style, children, ...restProps } = this.props;
    return (
      <Animated.View
        {...restProps}
        style={StyleSheet.flatten([
          styles.container,
          style,
        ])}
      >
        {children}
      </Animated.View>
    ); 
  } 
}