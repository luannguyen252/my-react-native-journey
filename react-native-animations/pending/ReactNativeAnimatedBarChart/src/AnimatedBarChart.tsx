import React, { Component } from "react";
import { Svg, G, Rect } from "react-native-svg";
import { interpolateRgb } from "d3-interpolate";
import extractBrush from "react-native-svg/lib/extract/extractBrush";
import styles from "./styles";

type SetNativeProps = (props: $Exact<{ fill: any, y: string }>) => void;

type Props = {
  onColorChange: (color: string) => void,
  animateDuration: number,
  data: Array<{ index: number, value: number }>,
  color: string,
  width: number,
  height: number,
  x: *,
  y: *,
};

export default class AnimatedBarChart extends Component<void, Props, void> {
  _bars: Array<SetNativeProps> = [];

  _animteFrame: any;

  constructor(props: Props) {
    super(props);

    (this: any)._animate = this._animate.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.data !== nextProps.data) {
      this._animate(this.props, nextProps);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  _animate(prevProps: Props, currentProps: Props): void {
    if (this._animteFrame) {
      cancelAnimationFrame(this._animteFrame);
    }

    const now = Date.now();
    const duration = this.props.animateDuration;
    const diffs = currentProps.data.map(
      (d, i) => d.value - prevProps.data[i].value
    );
    const color = interpolateRgb(prevProps.color, currentProps.color);

    const transitValue = (time) => {
      if (time > now + duration) {
        return;
      }

      const delta = (time - now) / duration;
      const nextColor = color(delta);

      // I know it's not the best way but sorry i'm too lazy
      this.props.onColorChange(nextColor);

      for (let i = 0; i < this._bars.length; i++) {
        const { value } = prevProps.data[i];
        const nextValue = currentProps.y(value + diffs[i] * delta);

        this._bars[i].setNativeProps({
          y: String(nextValue),
          fill: extractBrush(nextColor),
        });
      }

      this._animteFrame = requestAnimationFrame(transitValue);
    };

    this._animteFrame = requestAnimationFrame(transitValue);
  }

  render() {
    const { x, y, data } = this.props;
    const barWidth = x.bandwidth();

    const bars = data.reduce((result, d, i) => {
      result.push([
        <Rect
          ref={(c) => (this._bars[i] = c)}
          key={i}
          x={x(d.index)}
          y={y(d.value)}
          width={barWidth}
          height={this.props.height}
          fill={this.props.color}
        />,
        <Rect
          key={i + data.length}
          x={x(d.index)}
          y={0}
          width={barWidth}
          height={this.props.height}
          fill="rgba(0, 0, 0, 0.2)"
        />,
      ]);

      return result;
    }, []);

    return (
      <Svg width={this.props.width} height={this.props.height}>
        <G x={0} y={0}>
          {bars}
        </G>
      </Svg>
    );
  }
}


