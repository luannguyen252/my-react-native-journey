import * as Animatable from "react-native-animatable";
import React, { Component } from "react";
import {
  Animated,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

const ANIMATION_DELAY = 300;

class ColumnBar extends Component {
  constructor(props) {
    super(props);

    this._height = new Animated.Value(0);
    this.state = {
      flag: false,
    };
  }

  componentDidMount() {
    this.animateTo(this.props.delay, this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    this.animateTo(nextProps.delay, nextProps.value);
  }

  animateTo = (delay, value) => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this._height, {
        toValue: value,
      }),
    ]).start();
  };

  onMethod = () => {
    this.props.action();
  };

  render() {
    const barStyles = {
      backgroundColor: this.props.flag ? "#E11D48" : "#2563EB",
      height: this._height,
      width: 24,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    };

    return (
      <View style={{}}>
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY}
          style={{
            fontSize: 12,
            lineHeight: 18,
            fontWeight: "700",
            color: this.props.flag ? "#E11D48" : "#2563EB",
            textAlign: "center",
            paddingBottom: 16,
          }}
        >
          {this.props.amount}
        </Animatable.Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPressIn={this.onMethod}
          style={{}}
        >
          <Animated.View style={barStyles} />
        </TouchableOpacity>
        <Animatable.Text
          animation="fadeInUp"
          delay={ANIMATION_DELAY + 150}
          style={{
            fontSize: 12,
            lineHeight: 18,
            fontWeight: "500",
            color: "#111827",
            textAlign: "center",
            paddingTop: 8,
          }}
        >
          {this.props.duration}
        </Animatable.Text>
      </View>
    );
  }
}

export default ColumnBar;
