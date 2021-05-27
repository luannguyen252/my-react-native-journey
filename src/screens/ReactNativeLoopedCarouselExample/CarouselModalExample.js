import React, { Component } from "react";
import { Text, View, Modal, Dimensions } from "react-native";
import propTypes from "prop-types";
import Carousel from "react-native-looped-carousel";
import { Button } from "react-native-elements";

const { width, height } = Dimensions.get("window");

const Page = (props) => (
  <View style={[{ backgroundColor: props.color }, { width, height }]}>
    <Text>{props.i}</Text>
    <Button
      onPress={props.onHide}
      title={"Hide Modal"}
      buttonStyle={{ marginTop: 20 }}
    />
  </View>
);

Page.propTypes = {
  i: propTypes.number,
  onHide: propTypes.func,
  color: propTypes.string,
};

export default class CarouselModalExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      carouselElements: [{ color: "#BADA55" }],
    };
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  addPage = () => {
    this.setState({
      carouselElements: [
        ...this.state.carouselElements,
        { color: "lightblue" },
      ],
    });
  };

  render() {
    return (
      <View style={{ flex: 1, marginTop: 22 }}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
        >
          <Carousel
            delay={2000}
            style={{ flex: 1 }}
            autoplay={false}
            pageInfo
            currentPage={this.state.carouselElements.length - 1}
            onAnimateNextPage={(p) => console.log(p)}
          >
            {this.state.carouselElements.map((el, i) => (
              <Page
                key={i}
                i={i}
                color={el.color}
                onHide={() => this.hideModal()}
              />
            ))}
          </Carousel>
        </Modal>
        <Button
          onPress={() => this.showModal()}
          title={"Show Modal"}
          buttonStyle={{ marginTop: 20 }}
        />
        <Button
          title={"Add Page"}
          onPress={() => {
            this.addPage();
          }}
          buttonStyle={{ marginTop: 20 }}
        />
      </View>
    );
  }
}
