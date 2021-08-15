// @flow
import * as React from "react";
import { ART, Animated } from "react-native";

import AnimatedPath from "./AnimatedPath";
import constants from "./constants";

const AnimatedShape = Animated.createAnimatedComponent(ART.Shape);

type Props = {
  data: Array<Object>,
  arc: Function,
  colors: Array<string>,
  delay?: number,
  duration?: number,
  easing?: Function
};

export default class ARTAnimatedPieShape extends React.PureComponent<Props> {
  _animatedPaths: Array<AnimatedPath<*>>;
  _animations: Array<Object>;
  _easing: Function;
  _delay: number;
  _duration: number;

  constructor(props: Props) {
    super(props);
    const { easing, delay, duration, data } = this.props;

    this._easing = easing || constants.defaultEasing;
    this._delay = delay !== undefined ? delay : constants.defaultDelay;
    this._duration = Math.ceil(
      (duration || constants.defaultDuration) / data.length
    );
    this._initAnimations();
  }

  _initAnimations() {
    const { arc, data } = this.props;

    const animations = data.map((d, i) => ({
      animatedValue: new Animated.Value(d.startAngle),
      config: {
        toValue: d.endAngle,
        delay: i * this._duration
      }
    }));

    this._animations = animations;
    this._animatedPaths = animations.map(
      (animation, i) =>
        new AnimatedPath(animation.animatedValue, value =>
          arc({
            ...data[i],
            endAngle: value
          })
        )
    );
  }

  _timingStart(animatedValue: Animated.Value<*>, config: Object) {
    Animated.timing(animatedValue, {
      easing: this._easing,
      duration: this._duration,
      ...config
    }).start();
  }

  _startAnimation() {
    const start = () => {
      this._animations.forEach(animation => {
        this._timingStart(animation.animatedValue, animation.config);
      });
    };

    if (this._delay) {
      setTimeout(start, this._delay);
    } else {
      start();
    }
  }

  _getFillColor(colors: Array<string>, index: number) {
    return colors[index % colors.length];
  }

  componentDidMount() {
    this._startAnimation();
  }

  render() {
    return this._animatedPaths.map((path, index) => (
      <AnimatedShape
        key={`animatedShape:${index}`}
        d={path}
        fill={this._getFillColor(this.props.colors, index)}
        strokeWidth={1}
      />
    ));
  }
}
