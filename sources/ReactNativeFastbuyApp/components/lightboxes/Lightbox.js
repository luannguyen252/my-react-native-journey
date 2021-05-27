import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Lightbox extends Component {

  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  onPress() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  }

  renderLightBox() {
    const { lightboxStyle } = styles;
    const { children } = this.props;
    const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

    return (
      <View style={[{ deviceWidth, deviceHeight }, lightboxStyle]}>
        {children}
      </View>
    );
  }

  render() {
    return (
      <Animated.View style={[styles.containerStyle, { opacity: this.state.opacity }]}>
        {this.renderLightBox()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  lightboxStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
