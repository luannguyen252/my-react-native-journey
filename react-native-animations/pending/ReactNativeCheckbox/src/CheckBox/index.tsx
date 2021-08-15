import React, {Component} from 'react';

import {Text, TouchableOpacity, Easing, Animated, Image} from 'react-native';

import check from '../assets/images/check.png';

interface State {
  value?: boolean;
}

interface Props {
  /** Required. Current state of the checkbox */
  value: Boolean;
  /** Required. Callback for click on the checkbox */
  onChangeValue: Function;
  /** Set true to make whole checkbox component container clickable for changing it's value */
  isContainerClickable?: true | false;
  /** Set true for making animations smoothier */
  useNativeDriver?: boolean;
  /** Set background color to the box when it's marked */
  colorActive?: String;
  /** Set background color to the box when it's unmarked */
  colorInactive?: String;
  /** Add style to the label */
  textStyle?: Object;
  /** Add style to the box */
  boxStyle?: Object;
  /** Add style to the container */
  containerStyle?: Object;
  /** Label value */
  label?: String;
  /** Pass custom image for indication as path */
  checkImage?: String;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class CheckBox extends Component<Props> {
  state = {
    value: false,
    animate: false,
    animatedValue: new Animated.Value(0),
  };

  hexToRgb = (hex: String) => {
    var a = hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b,
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x: string) => parseInt(x, 16));
    return `rgb(${a[0]},${a[1]},${a[2]})`;
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    if (state.value === props.value) {
      return null;
    } else {
      if (props.value) {
        return {
          value: true,
          animate: true,
        };
      } else {
        return {
          value: false,
          animate: true,
        };
      }
    }
  }

  animateBackGround = () => {
    Animated.timing(this.state.animatedValue, {
      toValue: 150,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver:
        this.props.useNativeDriver !== undefined
          ? this.props.useNativeDriver
          : false,
    }).start(() => {
      this.state.animatedValue = new Animated.Value(0);
    });
  };

  handleContainerClick = () => {
    if (
      this.props.isContainerClickable !== undefined &&
      this.props.isContainerClickable
    ) {
      this.props.onChangeValue();
    }
  };

  render() {
    let colorActive =
      this.props.colorActive !== undefined ? this.props.colorActive : '#239292';

    let colorInactive =
      this.props.colorInactive !== undefined
        ? this.props.colorInactive
        : '#fff';

    let {textStyle, boxStyle, containerStyle} = this.props;

    textStyle = {color: '#000', ...textStyle};

    boxStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 3,
      width: 20,
      height: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      ...boxStyle,
    };

    containerStyle = {
      flexDirection: 'row',
      ...containerStyle,
    };

    const interpolateCheck = this.state.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        this.hexToRgb(colorInactive).toString(),
        this.hexToRgb(colorActive).toString(),
      ],
    });

    const interpolateUncheck = this.state.animatedValue.interpolate({
      inputRange: [0, 150],
      outputRange: [
        this.hexToRgb(colorActive).toString(),
        this.hexToRgb(colorInactive).toString(),
      ],
    });

    const animatedStyle = {
      backgroundColor: !this.props.value
        ? interpolateCheck
        : interpolateUncheck,
    };

    return (
      <TouchableOpacity
        activeOpacity={
          this.props.isContainerClickable !== undefined ? 1.0 : 0.6
        }
        onPress={() => this.handleContainerClick()}
        style={containerStyle}>
        <AnimatedTouchable
          onPress={() => this.props.onChangeValue()}
          style={[boxStyle, this.state.animate && animatedStyle]}>
          <Image
            style={{backgroundColor: '#00000000'}}
            source={
              this.props.checkImage !== undefined
                ? this.props.checkImage
                : check
            }
          />
        </AnimatedTouchable>
        <Text style={textStyle}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}
