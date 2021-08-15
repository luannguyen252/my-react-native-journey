import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { deviceWidth } from '../../constants';

import { CardImage } from './styles';

interface Card {
  id: number;
  source: number;
}

export const CARD_ASPECT_RATIO = 1324 / 750;
export const CARD_WIDTH = deviceWidth * 0.9;
export const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

export const cards: Card[] = [
  {
    id: 1,
    source: require('../../../assets/card1.png'),
  },
  {
    id: 2,
    source: require('../../../assets/card2.png'),
  },
  {
    id: 3,
    source: require('../../../assets/card3.png'),
  },
  {
    id: 4,
    source: require('../../../assets/card4.png'),
  },
  {
    id: 5,
    source: require('../../../assets/card5.png'),
  },
];

interface CardProps {
  card: Card;
  style?: StyleProp<ImageStyle>;
}

const Card: React.FC<CardProps> = ({ card, style }) => {
  return (
    <CardImage
      as={Animated.Image}
      style={style}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      source={card.source}
    />
  );
};

export default Card;
