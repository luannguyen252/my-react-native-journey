import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
} from "react-native";
import cards from "../utils/Cards";
import Card, { CARD_HEIGHT, CARD_TITLE, CARD_PADDING } from "./Card";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  root: {
    marginTop: 96,
    marginRight: 16,
    marginLeft: 16,
    marginBottom: 16,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    height: height * 2,
  },
});

const Root = () => {
  const animatedY = useRef(new Animated.Value(0)).current;
  animatedY.addListener((x) => console.log(x.value));

  return (
    <SafeAreaView style={styles.root}>
      <View>
        {cards.map((card, index) => {
          const translateUpPositiveCase = (CARD_HEIGHT - CARD_PADDING) * -index;
          const correctedTranslateXUp = translateUpPositiveCase;
          const translateY = animatedY.interpolate({
            // explanation for input/output
            // down means -ve, up means +ve in ScrollView
            // whereas in translate +ve means down
            // -CARD_HEIGHT: when user scrolls max down which is equal to full card height length
            //    output: each card needs to be translated down by it's height * it's index
            // 0: when user has not scrolled at all
            //    output: each card needs to be translated down by a small amount just to reveal its title
            inputRange: [-CARD_HEIGHT, 0, CARD_PADDING * index + 0.1], // to make the calc okay, else top card gets hidden
            outputRange: [
              CARD_HEIGHT * index, // go down
              (CARD_HEIGHT - CARD_TITLE) * -index, // move up by default
              correctedTranslateXUp,
            ],
            extrapolateRight: "clamp",
          });
          return (
            <Animated.View
              key={card.name}
              style={{ transform: [{ translateY }] }}
            >
              <Card {...card} />
            </Animated.View>
          );
        })}
      </View>

      <Animated.ScrollView
        style={StyleSheet.absoluteFillObject}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animatedY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
    </SafeAreaView>
  );
};

export default Root;
