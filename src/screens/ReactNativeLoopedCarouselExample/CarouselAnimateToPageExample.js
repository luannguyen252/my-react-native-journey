import React, { Component } from "react";
import { Text, View, Dimensions } from "react-native";
import propTypes from "prop-types";
import Carousel from "react-native-looped-carousel";
import { Button } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const Page = (props) => (
  <View style={[{ backgroundColor: props.color }, { width, height }]}>
    <Text>{props.i}</Text>
    <Button
      title={"Add Page"}
      onPress={() => {
        props.onAdd();
      }}
      buttonStyle={{ marginTop: 20 }}
    />
    <Button
      title={"Remove Page"}
      onPress={() => {
        props.onRemove();
      }}
      buttonStyle={{ marginTop: 20 }}
    />
    <Text>Pages length: {props.pages.length}</Text>
    {props.pages.map((_, i) => (
      <Button
        key={i}
        title={`Animate to page ${i}`}
        onPress={() => {
          props.onAnimate(i);
        }}
        buttonStyle={{ marginTop: 20, marginLeft: 40, marginRight: 40 }}
      />
    ))}
  </View>
);

Page.propTypes = {
  i: propTypes.number,
  onHide: propTypes.func,
  color: propTypes.string,
};

export default class CarouselAnimateToPageExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carouselElements: [{ color: "#BADA55" }],
    };
  }

  addPage = () => {
    this.setState({
      carouselElements: [
        ...this.state.carouselElements,
        { color: "lightblue" },
      ],
    });
  };

  removePage = () => {
    const { carouselElements } = this.state;
    const elems = carouselElements.slice(0, carouselElements.length - 1);
    this.setState({
      carouselElements: elems,
    });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 22 }}>
        <Carousel
          ref={(ref) => (this.carousel = ref)}
          leftArrowText={"＜"}
          leftArrowStyle={{ color: "white", fontSize: 22, margin: 20 }}
          rightArrowText={"＞"}
          rightArrowStyle={{ color: "white", fontSize: 22, margin: 20 }}
          delay={2000}
          style={{ flex: 1 }}
          autoplay={false}
          isLooped={false}
          arrows={true}
          pageInfo
          currentPage={this.state.carouselElements.length - 1}
          onAnimateNextPage={(p) => console.log(`onAnimateNextPage ${p}`)}
        >
          {this.state.carouselElements.map((el, i) => (
            <Page
              key={i}
              i={i}
              color={el.color}
              onRemove={() => this.removePage()}
              onAdd={() => this.addPage()}
              onAnimate={(i) => this.carousel.animateToPage(i)}
              pages={this.state.carouselElements}
            />
          ))}
        </Carousel>
      </View>
    );
  }
}
