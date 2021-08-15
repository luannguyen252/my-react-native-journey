import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import { MARGIN, SIZE } from "./Config";

const ANIMATION_DELAY = 500;
const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
});
interface TileProps {
  id: string;
  bgColor: string;
  txtColor: string;
  delay: number;
  name: string;
  onLongPress: () => void;
}

const Tile = ({ bgColor, txtColor, delay, name }: TileProps) => {
  return (
    <Animatable.View
      animation="bounceIn"
      delay={ANIMATION_DELAY}
      style={styles.container}
      pointerEvents="none"
    >
      <Animatable.View
        animation="bounceIn"
        delay={ANIMATION_DELAY + delay}
        style={{
          flex: 1,
          margin: MARGIN * 2,
          borderRadius: MARGIN,
          backgroundColor: bgColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animatable.Text
          animation="bounceIn"
          delay={ANIMATION_DELAY + delay}
          style={{
            fontSize: 24,
            lineHeight: 32,
            fontWeight: "700",
            color: txtColor,
          }}
        >
          {name}
        </Animatable.Text>
      </Animatable.View>
    </Animatable.View>
  );
};

export default Tile;
