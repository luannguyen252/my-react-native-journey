import React from 'react';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { CustomerCardDetailsProp } from '../../../types';

import { Box, theme, Text } from '../../components';

const { width, height: wHeight } = Dimensions.get('window');
const height = wHeight - 64;
const CARD_HEIGHT = 190 + 20; // 20 here is the verticalMargin in ChooseCard screen

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 190,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.black,
    opacity: 0.3,
    position: 'absolute',
    bottom: 20,
  },
  circleContainer: {
    flexDirection: 'row',
  },
});

interface CustomerCardProps {
  customerCard: CustomerCardDetailsProp;
  y: Animated.Value;
  index: number;
}

const CustomerCard = ({ customerCard, y, index }: CustomerCardProps) => {
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
  const { cardNumber, cardHolder, date } = customerCard;
  return (
    <Animated.View
      style={[
        styles.container,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      <Box style={{ width: width - 80, top: '35%' }}>
        <Box style={styles.circleContainer}>
          <Box style={styles.circle} />
          <Box style={[styles.circle, { left: 13 }]} />
        </Box>
        <Text variant="h1" color="white">
          {cardNumber}
        </Text>
        <Box style={{ flexDirection: 'row', marginTop: 20 }}>
          <Box>
            <Text variant="b3" color="grey">
              CARD HOLDER
            </Text>
            <Text variant="b3B" color="white">
              {cardHolder}
            </Text>
          </Box>
          <Box style={{ marginLeft: 30 }}>
            <Text variant="b3" color="grey">
              EXP DATE
            </Text>
            <Text variant="b3B" color="white">
              {date}
            </Text>
          </Box>
          <Box style={{ flex: 1 }} />
        </Box>
      </Box>
    </Animated.View>
  );
};

export default CustomerCard;
