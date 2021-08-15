import React from "react";
import { StyleSheet, View } from "react-native";
import BubbleBoxProvider from "./bubbleBox/BubbleBoxProvider";

const CARDS = [
  {
    cardId: 1,
    backgroundColor: "#a1b9d8",
    indicatorActiveColor: "#0074b7",
    summaryCardImage: require("./assets/card1.png"),
    fullCardImage: require("./assets/card1_focus.png"),
  },
  {
    cardId: 2,
    backgroundColor: "#facb94",
    indicatorActiveColor: "#ff8300",
    summaryCardImage: require("./assets/card2.png"),
    fullCardImage: require("./assets/card2_focus.png"),
  },
  {
    cardId: 3,
    backgroundColor: "#b3efcb",
    indicatorActiveColor: "#18a558",
    summaryCardImage: require("./assets/card3.png"),
    fullCardImage: require("./assets/card3_focus.png"),
  },
];

const ReactNativeBubblePay = () => {
  const cardComponents = CARDS.map(
    ({
      cardId,
      backgroundColor,
      indicatorActiveColor,
      summaryCardImage,
      fullCardImage,
    }) => (
      <BubbleBoxProvider.Item
        key={`card-${cardId}`}
        cardId={cardId}
        backgroundColor={backgroundColor}
        indicatorActiveColor={indicatorActiveColor}
        summaryCardImage={summaryCardImage}
        fullCardImage={fullCardImage}
      />
    )
  );

  return (
    <View style={styles.container}>
      <BubbleBoxProvider>{cardComponents}</BubbleBoxProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f9",
  },
});

export default ReactNativeBubblePay;
