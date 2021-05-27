import React, { Component } from 'react';
import { Animated, StyleSheet, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { configure, tryToSignInSilently } from '../actions';
import i18n from '../i18n';
import colors from '../colors';
import fonts from '../fonts';
import imgAppIcon from '../../assets/images/app-icon.png';

const PULSE = 0.1;
const DURATION = 500;

type Props = {};
class LaunchScreen extends Component<Props> {

  state = {
    animated: new Animated.Value(1 - PULSE)
  }

  componentWillMount() {
    this.props.configure();
    this.props.tryToSignInSilently();
  }

  componentDidMount() {
    this.fadeIn();
  }

  fadeIn() {
    const { animated } = this.state;

    Animated.timing(animated, {
      toValue: 1 + PULSE, duration: DURATION,
    }).start(() => this.fadeOut());
  }

  fadeOut() {
    const { animated } = this.state;

    Animated.timing(animated, {
      toValue: 1 - PULSE, duration: DURATION
    }).start(() => this.fadeIn());
  }

  render() {
    const { animated } = this.state;

    const {
      containerStyle,
      welcomeViewStyle,
      imageStyle,
      titleStyle
    } = styles;

    return (
      <View style={containerStyle}>
        <View style={welcomeViewStyle}>
          <Animated.View style={{ transform: [{ scale: animated }] }}>
            <Image style={imageStyle} source={imgAppIcon} />
          </Animated.View>

          <Text style={titleStyle}>{i18n.t('launch.loading')}</Text>
        </View>
      </View>
    );
  }

}

const margin = 14;
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    margin
  },
  welcomeViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 100,
    width: 100,
    margin
  },
  titleStyle: {
    fontFamily: fonts.regular,
    color: colors.grayDark,
    fontSize: 24,
    margin
  }
});

export default connect(null, { configure, tryToSignInSilently })(LaunchScreen);
