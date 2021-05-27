import React, { Component } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-looped-carousel";

const { width, height } = Dimensions.get("window");

export default class CarouselArrowExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: { width, height },
    };
  }

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  render() {
    const pages = generatePages(3, this.state.size);
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
        <Carousel
          style={this.state.size}
          leftArrowText={"＜"}
          leftArrowStyle={{ color: "white", fontSize: 22, margin: 20 }}
          rightArrowText={"＞"}
          rightArrowStyle={{ color: "white", fontSize: 22, margin: 20 }}
          pageInfo
          arrows
          isLooped={false}
          autoplay={false}
          onAnimateNextPage={(p) => console.log(p)}
        >
          {pages}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
  },
});

const colors = [
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#795548",
  "#9E9E9E",
  "#607D8B",
];

const generateRandomColorsArray = (length) =>
  Array.from(Array(length)).map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );

const generatePages = (length, size) =>
  generateRandomColorsArray(length).map((color, i) => (
    <View style={[{ backgroundColor: color }, size]} key={i}>
      <Text style={styles.text}>{i}</Text>
    </View>
  ));
