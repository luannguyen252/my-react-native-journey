import * as Animatable from "react-native-animatable";
import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
const ANIMATION_DELAY = 300;
import { products } from "./Model";

const { width } = Dimensions.get("window");
const SIZE = width / 1.5;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ProductsProps {
  x: Animated.SharedValue<number>;
}

const Products = ({ x }: ProductsProps) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {products.map((product, index) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useAnimatedStyle(() => {
          const translateX = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [width / 2, 0, -width / 2]
          );
          const scale = interpolate(
            x.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.61, 1, 0.61]
          );
          return {
            transform: [{ translateX }, { scale }],
          };
        });

        return (
          <Animated.View key={index} style={[styles.container, style]}>
            <Animatable.View animation="zoomIn" delay={ANIMATION_DELAY + 1050}>
              <Image
                source={product.picture}
                style={{ width: SIZE, height: SIZE * product.aspectRatio }}
              />
            </Animatable.View>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Products;
