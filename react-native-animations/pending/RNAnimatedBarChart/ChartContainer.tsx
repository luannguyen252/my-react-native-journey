import React, { Component } from "react";
import { StatusBar, Animated, Dimensions, View } from "react-native";
import { scaleBand, scaleLinear, scaleTime } from "d3-scale";
import Color from "color";
import SegmentedControl from "./SegmentedControl";
import AnimatedBarChart from "./AnimatedBarChart";
import Background from "./Background";
import styles from "./styles";

const NUMBER_OF_BARS = 8;
const ANIMATE_DURATION = 460;
const { width, height } = Dimensions.get("window");
const random = () => Number((Math.random() * 100).toFixed(2));

function generateRandomData(length: number) {
  const data = [{ index: 0, value: random() }];

  while (data.length < length) {
    const prevItem = data[data.length - 1];

    data.push({
      index: data.length,
      value: random(),
    });
  }

  return data;
}

type Props = $Exact<{
  width: number,
  height: number,
  graph: Array<{
    color: string,
    data: Array<{ index: number, value: number }>,
  }>,
}>;

class ChartContainer extends Component<Props, Props, any> {
  static defaultProps = {
    width: width - 64,
    height: height / 2,
    graph: [
      { color: "#4EC3EC", data: generateRandomData(NUMBER_OF_BARS) },
      { color: "#7364BD", data: generateRandomData(NUMBER_OF_BARS) },
      { color: "#E63B5F", data: generateRandomData(NUMBER_OF_BARS) },
    ],
  };

  _animatedBgColor = new Animated.Value(0);

  _animatedValue = 0;

  _animteFrame: any;

  _background: any;

  constructor(props: Props) {
    super(props);

    const selectedGraph = 0;
    const { data, color } = this.props.graph[selectedGraph];
    const x = scaleBand()
      .domain(data.map((d) => d.index))
      .rangeRound([0, this.props.width])
      .padding(0.85);
    const y = scaleLinear().domain([100, 0]).range([this.props.height, 0]);

    this.state = {
      selectedGraph,
      x,
      y,
    };

    (this: any)._selectSegmentedData = this._selectSegmentedData.bind(this);
    (this: any)._animateBackgroundColor =
      this._animateBackgroundColor.bind(this);
  }

  componentDidMount() {
    const { color } = this.props.graph[this.state.selectedGraph];
    this._background.setNativeProps({
      style: { backgroundColor: Color(color).darken(0.8).alpha(0.75).hex() },
    });
  }

  _selectSegmentedData(index: number): void {
    this.setState({ selectedGraph: index });
  }

  _animateBackgroundColor(color) {
    if (this._background) {
      this._background.setNativeProps({
        style: {
          backgroundColor: Color(color).darken(0.8).alpha(0.75).hex(),
        },
      });
    }
  }

  render() {
    const graph = this.props.graph;
    const { data, color } = graph[this.state.selectedGraph];

    return (
      <Animated.View style={styles.container}>
        <StatusBar translucent />
        <Background ref={(c) => (this._background = c)} />
        <AnimatedBarChart
          onColorChange={this._animateBackgroundColor}
          animateDuration={ANIMATE_DURATION}
          width={this.props.width}
          height={this.props.height}
          x={this.state.x}
          y={this.state.y}
          data={data}
          color={color}
        />
        <SegmentedControl
          selected={this.state.selectedGraph}
          values={[0, 1, 2]}
          labels={["SALE", "REVENUE", "PROFIT"]}
          onChange={this._selectSegmentedData}
          contentContainerStyle={styles.segmentedControl}
          animateDuration={ANIMATE_DURATION}
          tabWidth={width / 3}
        />
      </Animated.View>
    );
  }
}

export default ChartContainer;
