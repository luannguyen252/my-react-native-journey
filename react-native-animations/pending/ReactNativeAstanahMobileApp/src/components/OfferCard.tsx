import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageRequireSource,
  Animated,
} from 'react-native';

import { Box, Text } from './Theme';

const { width, height: wHeight } = Dimensions.get('window');
const height = wHeight - 64;
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = 210;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
});

interface OfferCardProps {
  image: ImageRequireSource;
  y: Animated.Value;
  index: number;
}
const AnimatedBox = Animated.createAnimatedComponent(Box);

const OfferCard = ({ image, y, index }: OfferCardProps) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <AnimatedBox
      style={[
        styles.container,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      <Image
        source={image}
        style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      />
    </AnimatedBox>
  );
};

export default OfferCard;
