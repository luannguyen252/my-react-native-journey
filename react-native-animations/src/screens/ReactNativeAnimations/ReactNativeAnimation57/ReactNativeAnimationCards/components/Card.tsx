import * as Animatable from "react-native-animatable";
import React, { FunctionComponent } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  id: number;
  name: string;
  color1: string;
  color2: string;
  price: string;
}

export const CARD_HEIGHT = 240;
export const CARD_TITLE = 48;
export const CARD_PADDING = 24;
const ANIMATION_DELAY = 500;

const styles = StyleSheet.create({
  card: {
    height: 240,
    borderRadius: 16,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  name: {
    color: "white",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "900",
  },
  price: {
    color: "white",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
  },
});

const Card: FunctionComponent<Props> = ({
  id,
  color1,
  color2,
  name,
  price,
}) => {
  return (
    <Animatable.View animation="slideInUp" delay={id + ANIMATION_DELAY}>
      <LinearGradient colors={[color1, color2]} style={styles.card}>
        <Animatable.Text
          animation="fadeInUp"
          delay={id * 1.1 + ANIMATION_DELAY}
          style={styles.name}
        >
          {name}
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInUp"
          delay={id * 1.2 + ANIMATION_DELAY}
          style={styles.price}
        >
          {price}
        </Animatable.Text>
      </LinearGradient>
    </Animatable.View>
  );
};

export default Card;
