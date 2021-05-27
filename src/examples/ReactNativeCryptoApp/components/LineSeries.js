import React from 'react';
import Svg, { Path } from 'react-native-svg';
import * as scale from 'd3-scale';
import * as array from 'd3-array';
import * as shape from 'd3-shape';

export default class LineSeries extends React.Component {
  static defaultProps = {
    curve: 'curveLinear',
    contentInset: {},
    fill: 'transparent',
    stroke: '#fff',
    strokeWidth: 2,
  }

  get xScale() {
    const { data } = this.props;
    const {
      width,
      minX = data[0].x,
      maxX = data[data.length - 1].x,
      contentInset: { left = 0, right = 0 },
    } = this.props;
    return scale.scaleLinear()
      .domain([minX, maxX])
      .range([left, width - right]);
  }

  get yScale() {
    const { data } = this.props;
    const {
      height,
      minY = array.min(data, ({ y }) => y),
      maxY = array.max(data, ({ y }) => y),
      contentInset: { top = 0, bottom = 0 },
    } = this.props;
    return scale.scaleLinear()
      .domain([minY, maxY])
      .range([height - bottom, top]);
  }

  get path() {
    const { data, curve } = this.props;
    const line = shape.line()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y))
      .curve(shape[curve])(data);
    return line;
  }

  render() {
    const { width, height, ...svg } = this.props;
    return (
      <Svg width={width} height={height}>
        <Path
          d={this.path}
          width={width}
          height={height}
          {...svg}
        />
      </Svg>
    );
  }
}
