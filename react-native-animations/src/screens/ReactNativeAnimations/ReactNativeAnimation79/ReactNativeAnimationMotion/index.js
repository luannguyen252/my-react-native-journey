import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import { get, maxBy, floor, random, times } from "lodash";
import LinearGradient from "expo-linear-gradient";
import Styles from "./styles";
import BarChart from "./BarChart";

export default class AnimationMotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barChartHeight: 0,
      items: [
        { value: 400 },
        { value: 70 },
        { value: 600 },
        { value: 50 },
        { value: 30 },
        { value: 500 },
      ],
    };
  }

  componentWillMount() {
    const { height } = Dimensions.get("window");
    this.getBarChartHeight(height);
  }

  getBarChartHeight(height) {
    this.setState({ barChartHeight: height - variables.toolbarHeight - 200 });
  }

  onLayout = ({ nativeEvent }) => {
    const { height } = nativeEvent.layout;
    this.getBarChartHeight(height);
  };

  generateRandom() {
    let items = times(6, (i) => ({ value: random(10, 500) }));
    this.setState({ items });
  }

  renderBar({ value }, index, maxValue) {
    const { barChartHeight } = this.state;
    const valueY = (value * barChartHeight) / maxValue;

    return (
      <BarChart
        key={"barChart" + index}
        height={barChartHeight}
        valueY={floor(valueY, 2)}
        style={{ backgroundColor: "#8AC5F6" }}
        labelTop={<Text style={{ textAlign: "center" }}>{value}</Text>}
        labelBottom={<Text style={Styles.labelBottom}>{index + 1}</Text>}
      >
        <View style={{}}></View>
      </BarChart>
    );
  }

  render() {
    const { items, barChartHeight } = this.state;
    const maxValue = get(maxBy(items, "value"), "value", 1);

    return (
      <LinearGradient colors={["#6441A5", "#2a0845"]} style={{ flex: 1 }}>
        <View style={{}} onLayout={(e) => this.onLayout(e)}>
          <Text style={{}}>Animate it! Easily!</Text>
          <View
            style={[Styles.barChartContainer, { height: barChartHeight + 50 }]}
          >
            {items.map((item, index) => this.renderBar(item, index, maxValue))}
            <View style={Styles.borderLine}></View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}
