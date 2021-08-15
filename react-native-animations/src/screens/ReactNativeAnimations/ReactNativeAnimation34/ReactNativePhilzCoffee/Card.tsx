import * as Animatable from "react-native-animatable";
import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Product } from "./Model";
import Button from "./components/Button";
import CardHeader from "./components/CardHeader";
const { width, height } = Dimensions.get("window");
export const CARD_HEIGHT = height / 1.2;
const ANIMATION_DELAY = 300;
const styles = StyleSheet.create({
  container: {
    width,
    height: CARD_HEIGHT,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
    textAlign: "center",
    color: "#432406",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    textAlign: "center",
    color: "#432406",
  },
});

interface CardProps {
  product: Product;
}

const Card = ({
  product: { color1, title, subtitle, bgBtnColor, txtColor },
}: CardProps) => {
  return (
    <Animatable.View
      style={styles.container}
      animation="fadeInUp"
      delay={ANIMATION_DELAY}
    >
      <View
        style={{
          borderRadius: 16,
          margin: 32,
          flex: 1,
          backgroundColor: color1,
          padding: 16,
          justifyContent: "space-between",
          shadowColor: txtColor,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 5,
        }}
      >
        <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY + 250}>
          {/* <CardHeader /> */}
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 450}
            style={[styles.title, { color: txtColor }]}
          >
            {title}
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={ANIMATION_DELAY + 650}
            style={[styles.subtitle, { color: txtColor, opacity: 0.6 }]}
          >
            {subtitle}
          </Animatable.Text>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" delay={ANIMATION_DELAY + 850}>
          <Button label="Try It Now" bgBtnColor={bgBtnColor} name={title} />
        </Animatable.View>
      </View>
    </Animatable.View>
  );
};

export default Card;
