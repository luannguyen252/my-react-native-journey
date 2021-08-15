import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import SwipeCards from "./SwipeCards";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
      >
        <Text>{this.props.text}</Text>
      </View>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }
}

export default class TinderSwipingExample2Basic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [
        { text: "Tomato", backgroundColor: "red" },
        { text: "Aubergine", backgroundColor: "purple" },
        { text: "Courgette", backgroundColor: "green" },
        { text: "Blueberry", backgroundColor: "blue" },
        { text: "Umm...", backgroundColor: "cyan" },
        { text: "orange", backgroundColor: "orange" },
      ],
    };
  }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }

  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 300,
  },
  noMoreCardsText: {
    fontSize: 22,
  },
});
