import Carousel from "react-native-snap-carousel";
import React, { Component } from "react";
import { Text, View, SafeAreaView, StyleSheet } from "react-native";

export default class ReactNativeSnapCarousel1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          description: "Text 1",
          color: "red",
        },
        {
          title: "Item 2",
          description: "Text 2",
          color: "blue",
        },
        {
          title: "Item 3",
          description: "Text 3",
          color: "green",
        },
        {
          title: "Item 4",
          description: "Text 4",
          color: "orange",
        },
        {
          title: "Item 5",
          description: "Text 5",
          color: "purple",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        key={index}
        style={[styles.carouselItemContainer, { backgroundColor: item.color }]}
      >
        <Text style={styles.carouselItemTitle}>{item.title}</Text>
        <Text style={styles.carouselItemDescription}>{item.description}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            layout={"default"}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={300}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  carouselItemContainer: {
    borderRadius: 8,
    padding: 16,
    marginLeft: 25,
    marginRight: 25,
  },
  carouselItemTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  carouselItemDescription: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "400",
    color: "#FFFFFF",
    opacity: 0.7,
  },
});
