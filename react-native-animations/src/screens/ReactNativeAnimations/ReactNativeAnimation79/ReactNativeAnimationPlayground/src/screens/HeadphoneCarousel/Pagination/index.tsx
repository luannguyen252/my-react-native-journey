import React from 'react';
import { Animated } from 'react-native';

import { deviceWidth } from '../../../constants';

import { Container, Dot, Indicator, DOT_SIZE, DOT_MARGIN } from './styles';

interface Data {
  key: string;
  color: string;
}

interface PaginationProps {
  scrollX: Animated.Value;
  data: Data[];
}

const Pagination: React.FC<PaginationProps> = ({ data, scrollX }) => {
  const inputRange = [-deviceWidth, 0, deviceWidth];

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-DOT_SIZE + DOT_MARGIN, 0, DOT_SIZE + DOT_MARGIN],
  });

  return (
    <Container>
      <Indicator as={Animated.View} style={{ transform: [{ translateX }] }} />
      {data.map(({ key, color }) => (
        <Dot key={key} color={color} />
      ))}
    </Container>
  );
};

export default Pagination;
