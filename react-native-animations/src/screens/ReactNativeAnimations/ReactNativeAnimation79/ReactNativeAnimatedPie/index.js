// @flow
import * as React from "react";
import { ART } from "react-native";

import * as d3Shape from "d3-shape";

import PieShape from "./PieShape";
import AnimatedPieShape from "./AnimatedPieShape";
import constants from "./constants";

const { Surface, Group } = ART;

type Props = {
  width?: number,
  height?: number,
  outerRadius?: number,
  innerRadius?: number,
  x?: number,
  y?: number,
  series: Array<number | string>,
  colors?: Array<string>,
  delay?: number,
  animate?: boolean,
  duration?: number,
  easing?: Function,
};

export default class ARTPie extends React.PureComponent<Props> {
  _width: number;
  _height: number;
  _outRadius: number;
  _innerRadius: number;
  _x: number;
  _y: number;
  _colors: Array<string>;
  _animate: boolean;
  _arc: Function;
  _data: Array<Object>;

  constructor(props: Props) {
    super(props);
    const { width, height, outerRadius, innerRadius, x, y, animate, colors } =
      this.props;

    this._width = width !== undefined ? width : constants.defaultWidth;
    this._height = height !== undefined ? height : constants.defaultHeight;
    this._outRadius = outerRadius !== undefined ? outerRadius : this._width / 2;
    this._innerRadius =
      innerRadius !== undefined ? innerRadius : constants.defaultInnerRadius;
    this._x = x !== undefined ? x : this._width / 2;
    this._y = y !== undefined ? y : this._height / 2;
    this._animate = animate !== undefined ? !!animate : true;
    this._colors = colors || constants.defaultColors;
    this._initArc();
  }

  _initArc() {
    const { series } = this.props;

    if (series && series.length) {
      this._arc = d3Shape
        .arc()
        .outerRadius(this._outRadius)
        .innerRadius(this._innerRadius);

      this._data = d3Shape.pie().sort(null)(series);
    }
  }

  _getProps() {
    return {
      data: this._data,
      arc: this._arc,
      colors: this._colors,
    };
  }

  render() {
    const { series } = this.props;

    if (!series || !series.length) {
      return null;
    } else {
      return (
        <Surface width={this._width} height={this._height}>
          <Group x={this._x} y={this._y}>
            {this._animate ? (
              <AnimatedPieShape {...this.props} {...this._getProps()} />
            ) : (
              <PieShape {...this._getProps()} />
            )}
          </Group>
        </Surface>
      );
    }
  }
}
