import React from 'react';
import { Animated } from 'react-native';

import { deviceWidth } from '../../../constants';

import { Container, Circle } from './styles';

interface Data {
  color: string;
}

interface CirclesProps {
  scrollX: Animated.Value;
  data: Data[];
}

const Circles: React.FC<CirclesProps> = ({ data, scrollX }) => {
  return (
    <Container>
      {data.map(({ color }, index) => {
        const inputRange = [
          (index - 0.5) * deviceWidth,
          index * deviceWidth,
          (index + 0.5) * deviceWidth,
        ];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0.4, 0],
        });
        return (
          <Circle
            key={index}
            as={Animated.View}
            color={color}
            style={{ opacity, transform: [{ scale }] }}
          />
        );
      })}
    </Container>
  );
};

export default Circles;
