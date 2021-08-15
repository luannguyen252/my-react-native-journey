// @flow
import * as React from "react";
import { ART } from "react-native";

const { Shape } = ART;

type Props = {
  data: Array<Object>,
  arc: Function,
  colors: Array<string>
};

export default class ARTPieShape extends React.PureComponent<Props> {
  _paths: Array<string> = [];

  constructor(props: Props) {
    super(props);
    const { data, arc } = this.props;

    this._paths = data.map(d => arc(d));
  }

  _getFillColor(colors: Array<string>, index: number) {
    return colors[index % colors.length];
  }

  render() {
    return this._paths.map((path, index) => (
      <Shape
        key={`shape:${index}`}
        d={path}
        fill={this._getFillColor(this.props.colors, index)}
        strokeWidth={1}
      />
    ));
  }
}
